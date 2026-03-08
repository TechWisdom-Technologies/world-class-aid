import { useState } from "react";
import { b2bPartners, students, universities, courses, referralChartData } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Users, Clock, CheckCircle, DollarSign, UserPlus, ArrowLeft, GraduationCap, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const partner = b2bPartners[0]; // Simulate logged-in partner
const partnerStudents = students.filter((s) => s.referred_by_partner_id === partner.id);

const statusColors: Record<string, string> = {
  Pending: "bg-warning/10 text-warning border-warning/20",
  Processing: "bg-secondary/10 text-secondary border-secondary/20",
  Accepted: "bg-success/10 text-success border-success/20",
  Rejected: "bg-destructive/10 text-destructive border-destructive/20",
};

export default function PartnerDashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { signOut, user } = useAuth();

  const metrics = [
    { label: "Total Students Sent", value: partner.total_referrals, icon: Users, color: "text-secondary" },
    { label: "Applications in Progress", value: partnerStudents.filter((s) => s.application_status === "Processing").length, icon: Clock, color: "text-warning" },
    { label: "Visas Approved / Enrolled", value: partner.successful_enrollments, icon: CheckCircle, color: "text-success" },
    { label: "Estimated Commission", value: `$${partner.commission_earned.toLocaleString()}`, icon: DollarSign, color: "text-secondary" },
  ];

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="text-sm text-primary-foreground/60 hover:text-primary-foreground flex items-center gap-1 mb-2">
                <ArrowLeft className="h-3 w-3" />Back to Site
              </Link>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-secondary" />
                <div>
                  <h1 className="text-2xl font-bold">Welcome back, {partner.agency_name}!</h1>
                  <p className="text-primary-foreground/70 text-sm">Manage your student referrals and track performance</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <UserPlus className="h-4 w-4 mr-2" />Submit New Student Referral
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Submit New Student Referral</DialogTitle></DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div><Label>Student Name</Label><Input placeholder="Full name" /></div>
                    <div><Label>Target University</Label><Input placeholder="University" /></div>
                    <div><Label>Target Course</Label><Input placeholder="Course" /></div>
                    <div><Label>Student Email</Label><Input placeholder="email@example.com" /></div>
                    <div><Label>Student Phone</Label><Input placeholder="+60..." /></div>
                    <Button className="w-full" onClick={() => setDialogOpen(false)}>Submit Referral</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="sm" className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-1" />Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m) => (
            <Card key={m.label}>
              <CardContent className="p-6 flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl bg-muted flex items-center justify-center ${m.color}`}>
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

        {/* Chart */}
        <Card>
          <CardHeader><CardTitle>Student Referrals — Last 6 Months</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={referralChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="referrals" fill="hsl(199, 89%, 48%)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Referral Table */}
        <Card>
          <CardHeader><CardTitle>Your Referred Students</CardTitle></CardHeader>
          <CardContent>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Target Course</TableHead>
                    <TableHead>Target University</TableHead>
                    <TableHead>Status</TableHead>
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
                        <Badge variant="outline" className={statusColors[s.application_status]}>
                          {s.application_status}
                        </Badge>
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
      </div>
    </div>
  );
}
