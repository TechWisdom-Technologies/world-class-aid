import { useState } from "react";
import { b2bPartners, students, universities, courses, referralChartData, funnelData } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Clock, CheckCircle, DollarSign, UserPlus } from "lucide-react";
import { DocumentVault } from "@/components/public/DocumentVault";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react";

const partner = b2bPartners[0];
const partnerStudents = students.filter((s) => s.referred_by_partner_id === partner.id);

const stageColors: Record<string, string> = {
  "Document Review": "bg-muted text-muted-foreground",
  "Applied": "bg-secondary/10 text-secondary border-secondary/20",
  "Offer Letter": "bg-warning/10 text-warning border-warning/20",
  "Visa": "bg-primary/10 text-primary border-primary/20",
  "Done": "bg-success/10 text-success border-success/20",
  "Rejected": "bg-destructive/10 text-destructive border-destructive/20",
};

export default function PartnerOverview() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const metrics = [
    { label: "Total Students Submitted", value: partner.total_sent, icon: Users, color: "text-secondary" },
    { label: "Applications Processing", value: partner.processing, icon: Clock, color: "text-warning" },
    { label: "Successfully Converted", value: partner.converted, icon: CheckCircle, color: "text-success" },
    { label: "Total Commission Earned", value: `$${partner.commission.toLocaleString()}`, icon: DollarSign, color: "text-secondary" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Welcome back, {partner.company_name}!</h1>
          <p className="text-muted-foreground text-sm">Manage your student referrals and track performance</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <UserPlus className="h-4 w-4 mr-2" />Submit New Student
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Submit New Student Referral</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Student Name</Label><Input placeholder="Full name" /></div>
                <div><Label>Student Email</Label><Input placeholder="email@example.com" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Target University</Label><Input placeholder="University" /></div>
                <div><Label>Target Course</Label><Input placeholder="Course" /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label>Academic Score / GPA</Label><Input type="number" placeholder="e.g. 3.5" /></div>
                <div><Label>IELTS Score</Label><Input type="number" step="0.5" placeholder="e.g. 7.0" /></div>
              </div>
              <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={() => setDialogOpen(false)}>Submit Referral</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m, i) => (
          <Card key={m.label} className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-2xl bg-muted flex items-center justify-center ${m.color}`}>
                <m.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{m.label}</p>
                <p className="text-2xl font-extrabold">{m.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Student Referrals — Last 6 Months</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={referralChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                <Bar dataKey="referrals" fill="hsl(38, 92%, 50%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Enrollment Funnel</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {funnelData.map((item) => {
                const maxVal = funnelData[0].value;
                const pct = (item.value / maxVal) * 100;
                return (
                  <div key={item.stage} className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground w-28 text-right">{item.stage}</span>
                    <div className="flex-1 bg-muted rounded-full h-8 overflow-hidden">
                      <div className="h-full rounded-full flex items-center justify-end pr-3 transition-all" style={{ width: `${pct}%`, backgroundColor: item.fill }}>
                        <span className="text-xs font-bold text-primary-foreground">{item.value}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Students + Documents */}
      <Tabs defaultValue="students">
        <TabsList>
          <TabsTrigger value="students"><Users className="h-4 w-4 mr-1.5" /> Student Management</TabsTrigger>
          <TabsTrigger value="documents"><FileText className="h-4 w-4 mr-1.5" /> Document Vault</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <Card>
            <CardHeader><CardTitle>Your Referred Students</CardTitle></CardHeader>
            <CardContent>
              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student Name</TableHead>
                      <TableHead>Desired Course</TableHead>
                      <TableHead>University</TableHead>
                      <TableHead>Stage</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {partnerStudents.map((s) => (
                      <TableRow key={s.id}>
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell>{courses.find((c) => c.id === s.target_course_id)?.title}</TableCell>
                        <TableCell>{universities.find((u) => u.id === s.target_university_id)?.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={stageColors[s.status] || ""}>{s.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="documents">
          <DocumentVault />
        </TabsContent>
      </Tabs>
    </div>
  );
}
