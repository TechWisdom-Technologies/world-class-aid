import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Bell, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface ReminderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  universityName: string;
  intakeLabel: string;
  deadlineDate: string;
}

export function ReminderModal({ open, onOpenChange, universityName, intakeLabel, deadlineDate }: ReminderModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({ full_name: "", email: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("intake_reminders" as any).insert({
      ...form,
      university_name: universityName,
      intake_label: intakeLabel,
      deadline_date: deadlineDate,
      active: true,
    });
    setLoading(false);
    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setSuccess(true);
    toast.success("Reminder set! You'll receive weekly updates.");
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSuccess(false);
      setForm({ full_name: "", email: "" });
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-sm">
        {success ? (
          <div className="py-8 text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-secondary/15 flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-secondary" />
            </div>
            <DialogTitle className="text-xl">Reminder Set!</DialogTitle>
            <p className="text-muted-foreground text-sm">We'll send you weekly email reminders about the <strong>{universityName}</strong> {intakeLabel} deadline.</p>
            <Button onClick={handleClose} className="mt-2">Done</Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2"><Bell className="h-5 w-5 text-secondary" /> Set Deadline Reminder</DialogTitle>
              <DialogDescription>Get weekly email reminders for {universityName} — {intakeLabel} intake (deadline: {deadlineDate}).</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="rem-name">Your Name</Label>
                <Input id="rem-name" placeholder="Your name" value={form.full_name} onChange={(e) => setForm((f) => ({ ...f, full_name: e.target.value }))} maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rem-email">Email *</Label>
                <Input id="rem-email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required maxLength={255} />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-11 font-bold">
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Bell className="h-4 w-4 mr-2" />}
                Set Weekly Reminder
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
