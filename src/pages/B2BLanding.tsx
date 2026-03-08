import { useState, useRef } from "react";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Handshake, DollarSign, Users, Globe, CheckCircle, ArrowRight, Upload, X, FileText, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const benefits = [
  { icon: DollarSign, title: "Competitive Commission", desc: "Earn up to 15% commission on every successful enrollment through your agency." },
  { icon: Users, title: "Dedicated Support", desc: "Get a dedicated account manager to help you and your students every step of the way." },
  { icon: Globe, title: "Global Network", desc: "Access 50+ universities across Malaysia, UK, Australia, and Canada." },
  { icon: CheckCircle, title: "Fast Processing", desc: "Average application processing time of just 5 business days." },
];

const commissionTiers = [
  { tier: "Bronze", students: "1-10", rate: "8%", color: "bg-warning/10 text-warning" },
  { tier: "Silver", students: "11-50", rate: "10%", color: "bg-muted text-muted-foreground" },
  { tier: "Gold", students: "51-100", rate: "12%", color: "bg-secondary/10 text-secondary" },
  { tier: "Platinum", students: "100+", rate: "15%", color: "bg-primary/10 text-primary" },
];

interface FileUploadProps {
  label: string;
  accept?: string;
  file: File | null;
  onFileChange: (f: File | null) => void;
  required?: boolean;
}

function FileUploadField({ label, accept = ".pdf,.jpg,.jpeg,.png", file, onFileChange, required }: FileUploadProps) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <Label>{label} {required && <span className="text-destructive">*</span>}</Label>
      <div
        className="mt-1 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-secondary/50 transition-colors"
        onClick={() => ref.current?.click()}
      >
        <input ref={ref} type="file" accept={accept} className="hidden" onChange={(e) => onFileChange(e.target.files?.[0] || null)} />
        {file ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <FileText className="h-4 w-4 text-secondary" />
              <span className="truncate max-w-[200px]">{file.name}</span>
              <span className="text-muted-foreground">({(file.size / 1024).toFixed(0)} KB)</span>
            </div>
            <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={(e) => { e.stopPropagation(); onFileChange(null); }}>
              <X className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div className="text-muted-foreground text-sm">
            <Upload className="h-6 w-6 mx-auto mb-1" />
            Click to upload {label.toLowerCase()}
          </div>
        )}
      </div>
    </div>
  );
}

async function uploadFile(file: File, folder: string): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${folder}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("partner-documents").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("partner-documents").getPublicUrl(path);
  return data.publicUrl;
}

export default function B2BLanding() {
  const [regOpen, setRegOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form state
  const [agencyName, setAgencyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [annualStudents, setAnnualStudents] = useState("");
  const [password, setPassword] = useState("");

  // File state
  const [nidFile, setNidFile] = useState<File | null>(null);
  const [tradeLicenseFile, setTradeLicenseFile] = useState<File | null>(null);
  const [certificateFiles, setCertificateFiles] = useState<File[]>([]);

  const addCertificate = (f: File | null) => {
    if (f) setCertificateFiles((prev) => [...prev, f]);
  };
  const removeCertificate = (idx: number) => {
    setCertificateFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const resetForm = () => {
    setAgencyName(""); setContactPerson(""); setEmail(""); setPhone("");
    setCountry(""); setAnnualStudents(""); setPassword("");
    setNidFile(null); setTradeLicenseFile(null); setCertificateFiles([]);
  };

  const handleSubmit = async () => {
    if (!agencyName || !contactPerson || !email || !password || !nidFile) {
      toast.error("Please fill all required fields and upload NID document.");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: contactPerson } },
      });
      if (authError) throw authError;

      const userId = authData.user?.id;

      // 2. Upload documents
      const nidUrl = await uploadFile(nidFile, "nid");
      const tradeLicenseUrl = tradeLicenseFile ? await uploadFile(tradeLicenseFile, "trade-license") : "";
      const certUrls: string[] = [];
      for (const cf of certificateFiles) {
        certUrls.push(await uploadFile(cf, "certificates"));
      }

      // 3. Insert registration record using REST API (anon key since user just signed up)
      const SUPABASE_URL = "https://kelwzcacbnrrioophnzh.supabase.co";
      const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbHd6Y2FjYm5ycmlvb3BobnpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODU0NzYsImV4cCI6MjA4ODU2MTQ3Nn0.VUCY4HY0LNX4umOfEWh1NmkKKHQ-DYj7VvRCJkeDe_c";

      const token = authData.session?.access_token || SUPABASE_KEY;

      const res = await fetch(`${SUPABASE_URL}/rest/v1/partner_registrations`, {
        method: "POST",
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Prefer": "return=minimal",
        },
        body: JSON.stringify({
          user_id: userId,
          agency_name: agencyName,
          contact_person: contactPerson,
          email,
          phone,
          country,
          annual_students: parseInt(annualStudents) || 0,
          nid_document_url: nidUrl,
          trade_license_url: tradeLicenseUrl,
          certificate_urls: certUrls,
          status: "pending",
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      // Sign out since they need approval
      await supabase.auth.signOut();

      setRegOpen(false);
      resetForm();
      toast.success("Registration submitted! Your application is pending admin approval. We'll notify you via email once approved.");
    } catch (err: any) {
      toast.error(err.message || "Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MegaMenu />
      <main className="flex-1">
        {/* Hero */}
        <div className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <Handshake className="h-16 w-16 mx-auto mb-4 text-secondary" />
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Partner With YourUni</h1>
            <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-8">
              Join our global network of education agencies. Earn competitive commissions while providing world-class university placement services.
            </p>
            <div className="flex gap-3 justify-center">
              <Dialog open={regOpen} onOpenChange={setRegOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    Register as Agency <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader><DialogTitle>Register Your Agency</DialogTitle></DialogHeader>
                  <p className="text-sm text-muted-foreground">Fill in your details and upload required documents. Your registration will be reviewed by our team.</p>
                  <div className="space-y-4 pt-2">
                    <div><Label>Agency Name <span className="text-destructive">*</span></Label><Input value={agencyName} onChange={(e) => setAgencyName(e.target.value)} placeholder="Your company name" /></div>
                    <div><Label>Contact Person <span className="text-destructive">*</span></Label><Input value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} placeholder="Full name" /></div>
                    <div><Label>Email <span className="text-destructive">*</span></Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@agency.com" /></div>
                    <div><Label>Password <span className="text-destructive">*</span></Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password (min 6 chars)" /></div>
                    <div><Label>Phone</Label><Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+880 1XXXXXXXXX" /></div>
                    <div><Label>Country</Label><Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country of operation" /></div>
                    <div><Label>Number of Students (Annual)</Label><Input type="number" value={annualStudents} onChange={(e) => setAnnualStudents(e.target.value)} placeholder="e.g. 50" /></div>

                    <div className="border-t pt-4">
                      <h3 className="font-semibold mb-3">Required Documents</h3>
                      <FileUploadField label="National ID (NID)" file={nidFile} onFileChange={setNidFile} required />
                    </div>

                    <FileUploadField label="Trade License (if any)" file={tradeLicenseFile} onFileChange={setTradeLicenseFile} />

                    <div>
                      <Label>Other Certificates</Label>
                      {certificateFiles.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 mt-1 text-sm bg-muted rounded px-3 py-2">
                          <FileText className="h-4 w-4 text-secondary" />
                          <span className="truncate flex-1">{f.name}</span>
                          <Button type="button" variant="ghost" size="icon" className="h-6 w-6" onClick={() => removeCertificate(i)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                      <FileUploadField
                        label="Add certificate"
                        file={null}
                        onFileChange={addCertificate}
                      />
                    </div>

                    <Button
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      onClick={handleSubmit}
                      disabled={submitting}
                    >
                      {submitting ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</> : "Submit Registration"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      By registering, you agree to our terms. Your account will be activated after admin approval.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Existing Partner Login
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-extrabold text-center mb-10">Why Partner With Us?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <Card key={b.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <b.icon className="h-7 w-7 text-secondary" />
                  </div>
                  <h3 className="font-bold mb-2">{b.title}</h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Commission Tiers */}
        <div className="bg-muted/50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-extrabold text-center mb-10">Commission Structure</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {commissionTiers.map((t) => (
                <Card key={t.tier} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Badge className={`${t.color} mb-3`}>{t.tier}</Badge>
                    <div className="text-3xl font-extrabold text-secondary mb-1">{t.rate}</div>
                    <p className="text-sm text-muted-foreground">{t.students} students/year</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
