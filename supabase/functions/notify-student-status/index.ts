import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.98.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { student_id, new_status, admin_notes } = await req.json();

    if (!student_id || !new_status) {
      return new Response(JSON.stringify({ error: "Missing student_id or new_status" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get student with partner info
    const { data: student, error: studentError } = await supabase
      .from("students")
      .select("*")
      .eq("id", student_id)
      .single();

    if (studentError || !student) {
      return new Response(JSON.stringify({ error: "Student not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const oldStatus = student.status;

    // Update student status
    const { error: updateError } = await supabase
      .from("students")
      .update({ status: new_status, admin_notes: admin_notes || "" })
      .eq("id", student_id);

    if (updateError) throw updateError;

    // Get partner registration info for email
    const { data: partner } = await supabase
      .from("partner_registrations")
      .select("email, contact_person, agency_name")
      .eq("user_id", student.partner_id)
      .single();

    // Try to send email
    const resendKey = Deno.env.get("RESEND_API_KEY");
    let emailSent = false;

    const statusLabels: Record<string, string> = {
      document_review: "Document Review",
      documents_verified: "Documents Verified",
      applied: "Applied",
      offer_received: "Offer Received",
      visa_processing: "Visa Processing",
      visa_approved: "Visa Approved",
      enrolled: "Enrolled",
      rejected: "Rejected",
    };

    const statusEmojis: Record<string, string> = {
      document_review: "📋",
      documents_verified: "✅",
      applied: "📤",
      offer_received: "🎓",
      visa_processing: "🛂",
      visa_approved: "✈️",
      enrolled: "🎉",
      rejected: "❌",
    };

    if (resendKey && partner) {
      const newLabel = statusLabels[new_status] || new_status;
      const oldLabel = statusLabels[oldStatus] || oldStatus;
      const emoji = statusEmojis[new_status] || "📌";
      const isPositive = !["rejected"].includes(new_status);

      const subject = `${emoji} Student Update: ${student.full_name} — ${newLabel}`;

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #1a1a2e; font-size: 22px; margin-bottom: 4px;">Student Application Update</h1>
            <p style="color: #888; font-size: 13px; margin: 0;">YourUni Partner Portal</p>
          </div>

          <p style="color: #333; font-size: 15px;">Dear <strong>${partner.contact_person}</strong>,</p>

          <p style="color: #555; font-size: 14px; line-height: 1.6;">
            The application status for your student <strong>${student.full_name}</strong> has been updated.
          </p>

          <div style="background-color: #f8f9fa; border-radius: 12px; padding: 20px; margin: 20px 0;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px; width: 140px;">Student Name</td>
                <td style="padding: 8px 0; color: #333; font-size: 14px; font-weight: 600;">${student.full_name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px;">University</td>
                <td style="padding: 8px 0; color: #333; font-size: 14px;">${student.target_university || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px;">Course</td>
                <td style="padding: 8px 0; color: #333; font-size: 14px;">${student.target_course || "N/A"}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px;">Previous Status</td>
                <td style="padding: 8px 0; color: #888; font-size: 14px; text-decoration: line-through;">${oldLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; font-size: 13px;">New Status</td>
                <td style="padding: 8px 0; font-size: 14px;">
                  <span style="background-color: ${isPositive ? "#e8f5e9" : "#fbe9e7"}; color: ${isPositive ? "#2e7d32" : "#c62828"}; padding: 4px 12px; border-radius: 20px; font-weight: 600; font-size: 13px;">
                    ${emoji} ${newLabel}
                  </span>
                </td>
              </tr>
            </table>
          </div>

          ${admin_notes ? `
            <div style="background-color: #fff3e0; border-left: 3px solid #e8a317; padding: 12px 16px; border-radius: 0 8px 8px 0; margin: 16px 0;">
              <p style="color: #333; font-size: 13px; margin: 0;"><strong>Admin Note:</strong> ${admin_notes}</p>
            </div>
          ` : ""}

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://youruni.com/partner-dashboard/students"
              style="background-color: #e8a317; color: #1a1a2e; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; display: inline-block;">
              View in Partner Dashboard
            </a>
          </div>

          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="color: #999; font-size: 11px; text-align: center;">
            YourUni Partner Program — You're receiving this because you manage ${student.full_name}'s application.
          </p>
        </div>
      `;

      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "YourUni <noreply@youruni.com>",
            to: [partner.email],
            subject,
            html: htmlBody,
          }),
        });

        if (emailRes.ok) {
          emailSent = true;
          console.log("Status update email sent to", partner.email);
        } else {
          const errText = await emailRes.text();
          console.error("Resend error:", errText);
        }
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
      }
    } else {
      console.log("RESEND_API_KEY not configured or partner not found, skipping email");
    }

    return new Response(
      JSON.stringify({
        success: true,
        emailSent,
        oldStatus,
        newStatus: new_status,
        message: `Student status updated to ${new_status}${emailSent ? " and email sent" : ""}`,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
