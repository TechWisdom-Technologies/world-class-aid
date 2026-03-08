import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Loader2, Search, FileText, ExternalLink, Users, Filter } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const SUPABASE_URL = "https://kelwzcacbnrrioophnzh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbHd6Y2FjYm5ycmlvb3BobnpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODU0NzYsImV4cCI6MjA4ODU2MTQ3Nn0.VUCY4HY0LNX4umOfEWh1NmkKKHQ-DYj7VvRCJkeDe_c";

const statusOptions = [
  { value: "document_review", label: "Document Review" },
  { value: "documents_verified", label: "Documents Verified" },
  { value: "applied", label: "Applied" },
  { value: "offer_received", label: "Offer Received" },
  { value: "visa_processing", label: "Visa Processing" },
  { value: "visa_approved", label: "Visa Approved" },
  { value: "enrolled", label: "Enrolled" },
  { value: "rejected", label: "Rejected" },
];

const statusColors: Record<string, string> = {
  document_review: "bg-muted text-muted-foreground",
  documents_verified: "bg-blue-500/10 text-blue-600 border-blue-500/30",
  applied: "bg-secondary/10 text-secondary border-secondary/20",
  offer_received: "bg-warning/10 text-warning border-warning/20",
  visa_processing: "bg-primary/10 text-primary border-primary/20",
  visa_approved: "bg-green-500/10 text-green-600 border-green-500/30",
  enrolled: "bg-green-600/10 text-green-700 border-green-600/30",
  rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

interface Student {
  id: string;
  partner_id: string;
  full_name: string;
  email: string;
  phone: string;
  passport_number: string;
  nationality: string;
  date_of_birth: string | null;
  gender: string;
  previous_institution: string;
  previous_degree: string;
  gpa: number;
  ielts_score: number;
  target_university: string;
  target_course: string;
  intake_month: string;
  degree_level: string;
  status: string;
  admin_notes: string;
  passport_url: string;
  academic_transcript_url: string;
  ielts_certificate_url: string;
  personal_statement_url: string;
  recommendation_letter_url: string;
  other_documents: string[];
  created_at: string;
}

interface Partner {
  id: string;
  agency_name: string;
  contact_person: string;
  email: string;
  user_id: string;
}

export default function AdminStudents() {
  const { session } = useAuth();
  const [students, setStudents] = useState<Student[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Student | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [adminNotes, setAdminNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [filterPartner, setFilterPartner] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchData = async () => {
    if (!session) return;
    const headers = { apikey: SUPABASE_KEY, Authorization: `Bearer ${session.access_token}` };
    try {
      const [studentsRes, partnersRes] = await Promise.all([
        fetch(`${SUPABASE_URL}/rest/v1/students?select=*&order=created_at.desc`, { headers }),
        fetch(`${SUPABASE_URL}/rest/v1/partner_registrations?select=id,agency_name,contact_person,email,user_id&status=eq.approved`, { headers }),
      ]);
      if (studentsRes.ok) setStudents(await studentsRes.json());
      if (partnersRes.ok) setPartners(await partnersRes.json());
    } catch { /* ignore */ } finally { setLoading(false); }
  };

  useEffect(() => { fetchData(); }, [session]);

  const getPartner = (partnerId: string) => partners.find(p => p.user_id === partnerId);

  const openDetail = (s: Student) => {
    setSelected(s);
    setNewStatus(s.status);
    setAdminNotes(s.admin_notes || "");
    setDetailOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selected || !session) return;
    setSaving(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/students?id=eq.${selected.id}`, {
        method: "PATCH",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify({ status: newStatus, admin_notes: adminNotes }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success("Student status updated!");
      setDetailOpen(false);
      fetchData();
    } catch (e: any) {
      toast.error(e.message || "Failed to update");
    } finally { setSaving(false); }
  };

  const filtered = students.filter(s => {
    const matchSearch = s.full_name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase());
    const matchPartner = filterPartner === "all" || s.partner_id === filterPartner;
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchPartner && matchStatus;
  });

  // Group by partner for summary
  const partnerSummary = partners.map(p => ({
    ...p,
    studentCount: students.filter(s => s.partner_id === p.user_id).length,
  })).filter(p => p.studentCount > 0).sort((a, b) => b.studentCount - a.studentCount);

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Student Management</h1>
        <div className="flex gap-2 text-sm">
          <Badge variant="secondary">{students.length} Total Students</Badge>
          <Badge variant="secondary">{partners.length} Partners</Badge>
        </div>
      </div>

      {/* Partner Summary Cards */}
      {partnerSummary.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {partnerSummary.slice(0, 4).map(p => (
            <Card key={p.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => setFilterPartner(filterPartner === p.user_id ? "all" : p.user_id)}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{p.agency_name}</p>
                    <p className="text-xs text-muted-foreground">{p.studentCount} student{p.studentCount > 1 ? "s" : ""}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterPartner} onValueChange={setFilterPartner}>
          <SelectTrigger className="w-[200px]"><Filter className="h-4 w-4 mr-2" /><SelectValue placeholder="All Partners" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Partners</SelectItem>
            {partners.map(p => <SelectItem key={p.user_id} value={p.user_id}>{p.agency_name}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[200px]"><SelectValue placeholder="All Statuses" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            {statusOptions.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {/* Students Table */}
      {filtered.length === 0 ? (
        <Card><CardContent className="p-12 text-center text-muted-foreground">No students found.</CardContent></Card>
      ) : (
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Partner Agency</TableHead>
                <TableHead>University</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Docs</TableHead>
                <TableHead>Added</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(s => {
                const partner = getPartner(s.partner_id);
                const st = statusOptions.find(o => o.value === s.status);
                const docCount = [s.passport_url, s.academic_transcript_url, s.ielts_certificate_url, s.personal_statement_url, s.recommendation_letter_url].filter(Boolean).length;
                return (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.full_name}</TableCell>
                    <TableCell className="text-sm">{partner?.agency_name || "Unknown"}</TableCell>
                    <TableCell className="text-sm">{s.target_university || "—"}</TableCell>
                    <TableCell className="text-sm">{s.target_course || "—"}</TableCell>
                    <TableCell><Badge variant="outline" className={statusColors[s.status] || ""}>{st?.label || s.status}</Badge></TableCell>
                    <TableCell><Badge variant="secondary">{docCount}/5</Badge></TableCell>
                    <TableCell className="text-sm text-muted-foreground">{new Date(s.created_at).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openDetail(s)}><Eye className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Detail Dialog */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Student Details — {selected?.full_name}</DialogTitle></DialogHeader>
          {selected && (
            <div className="space-y-6">
              {/* Partner Info */}
              <div className="p-3 rounded-lg bg-muted/50 border">
                <p className="text-xs text-muted-foreground">Submitted by Partner</p>
                <p className="font-semibold text-sm">{getPartner(selected.partner_id)?.agency_name || "Unknown"} — {getPartner(selected.partner_id)?.contact_person}</p>
              </div>

              {/* Personal Info */}
              <div>
                <h3 className="font-semibold mb-3">Personal Information</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div><Label className="text-muted-foreground text-xs">Email</Label><p className="font-medium text-sm">{selected.email}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Phone</Label><p className="font-medium text-sm">{selected.phone || "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Passport</Label><p className="font-medium text-sm">{selected.passport_number || "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Nationality</Label><p className="font-medium text-sm">{selected.nationality || "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">DOB</Label><p className="font-medium text-sm">{selected.date_of_birth ? new Date(selected.date_of_birth).toLocaleDateString() : "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Gender</Label><p className="font-medium text-sm">{selected.gender || "—"}</p></div>
                </div>
              </div>

              {/* Academic Info */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Academic Background</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label className="text-muted-foreground text-xs">Previous Institution</Label><p className="font-medium text-sm">{selected.previous_institution || "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Previous Degree</Label><p className="font-medium text-sm">{selected.previous_degree || "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">GPA</Label><p className="font-medium text-sm">{selected.gpa || "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">IELTS Score</Label><p className="font-medium text-sm">{selected.ielts_score || "—"}</p></div>
                </div>
              </div>

              {/* Target Program */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Target Program</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div><Label className="text-muted-foreground text-xs">University</Label><p className="font-medium text-sm">{selected.target_university || "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Course</Label><p className="font-medium text-sm">{selected.target_course || "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Intake</Label><p className="font-medium text-sm">{selected.intake_month || "—"}</p></div>
                  <div><Label className="text-muted-foreground text-xs">Degree Level</Label><p className="font-medium text-sm">{selected.degree_level}</p></div>
                </div>
              </div>

              {/* Documents */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-3">Documents</h3>
                <div className="space-y-2">
                  {[
                    { field: "passport_url", label: "Passport Copy" },
                    { field: "academic_transcript_url", label: "Academic Transcript" },
                    { field: "ielts_certificate_url", label: "IELTS Certificate" },
                    { field: "personal_statement_url", label: "Personal Statement" },
                    { field: "recommendation_letter_url", label: "Recommendation Letter" },
                  ].map(doc => {
                    const url = (selected as any)[doc.field];
                    return (
                      <div key={doc.field} className="flex items-center gap-3 p-2 rounded-lg border">
                        <FileText className={`h-4 w-4 ${url ? "text-green-600" : "text-muted-foreground/40"}`} />
                        <span className="text-sm flex-1">{doc.label}</span>
                        {url ? (
                          <a href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                            View <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          <span className="text-xs text-muted-foreground">Not uploaded</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Status Control */}
              <div className="border-t pt-4 space-y-3">
                <h3 className="font-semibold">Update Application Status</h3>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(s => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                  </SelectContent>
                </Select>
                <div>
                  <Label>Admin Notes</Label>
                  <Textarea value={adminNotes} onChange={e => setAdminNotes(e.target.value)} placeholder="Add notes about this application..." rows={3} className="mt-1" />
                </div>
                <Button onClick={handleUpdateStatus} disabled={saving} className="w-full">
                  {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
