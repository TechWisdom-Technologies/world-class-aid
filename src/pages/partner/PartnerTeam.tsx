import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, UserPlus, Shield, Mail } from "lucide-react";
import { toast } from "sonner";

const teamMembers = [
  { id: 1, name: "Ahmad Ibrahim", email: "ahmad@globaledhub.com", role: "Admin" as const, studentsAdded: 42, status: "Active" as const },
  { id: 2, name: "Nurul Amin", email: "nurul@globaledhub.com", role: "Counselor" as const, studentsAdded: 28, status: "Active" as const },
  { id: 3, name: "James Tan", email: "james@globaledhub.com", role: "Counselor" as const, studentsAdded: 35, status: "Active" as const },
  { id: 4, name: "Siti Hajar", email: "siti@globaledhub.com", role: "Counselor" as const, studentsAdded: 19, status: "Active" as const },
  { id: 5, name: "David Lee", email: "david@globaledhub.com", role: "Counselor" as const, studentsAdded: 0, status: "Invited" as const },
];

const roleColors = {
  Admin: "bg-primary/10 text-primary border-primary/20",
  Counselor: "bg-secondary/10 text-secondary border-secondary/20",
};

const statusColors = {
  Active: "bg-success/10 text-success border-success/20",
  Invited: "bg-warning/10 text-warning border-warning/20",
};

export default function PartnerTeam() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleInvite = () => {
    if (!email || !role) return;
    toast.success("Invitation sent!", { description: `An invite has been sent to ${email}.` });
    setInviteOpen(false);
    setEmail("");
    setRole("");
  };

  const totalStudents = teamMembers.reduce((s, m) => s + m.studentsAdded, 0);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold">Team Management</h1>
          <p className="text-muted-foreground text-sm">Manage your agency's staff and permissions</p>
        </div>
        <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
          <DialogTrigger asChild>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 w-full sm:w-auto">
              <UserPlus className="h-4 w-4 mr-2" />Invite Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader><DialogTitle>Invite Team Member</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Email Address</Label>
                <Input type="email" placeholder="colleague@agency.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label>Role & Permissions</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger><SelectValue placeholder="Select role..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin — Full access</SelectItem>
                    <SelectItem value="counselor">Counselor — Student management only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={handleInvite} disabled={!email || !role}>
                <Mail className="h-4 w-4 mr-2" /> Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Card className="animate-fade-in">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Team Members</p>
              <p className="text-2xl font-extrabold">{teamMembers.length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: "80ms" }}>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Admins</p>
              <p className="text-2xl font-extrabold">{teamMembers.filter((m) => m.role === "Admin").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-fade-in" style={{ animationDelay: "160ms" }}>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-success/10 flex items-center justify-center text-success">
              <UserPlus className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Students Added</p>
              <p className="text-2xl font-extrabold">{totalStudents}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Table */}
      <Card>
        <CardHeader><CardTitle>Manage Staff</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-xl border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Students Added</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teamMembers.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell className="text-muted-foreground">{m.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={roleColors[m.role]}>{m.role}</Badge>
                    </TableCell>
                    <TableCell className="font-semibold">{m.studentsAdded}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[m.status]}>{m.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
