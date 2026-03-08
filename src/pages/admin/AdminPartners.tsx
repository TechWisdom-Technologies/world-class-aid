import { b2bPartners } from "@/data/mockData";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";

export default function AdminPartners() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">B2B Partners</h1>
      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Agency Name</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Total Referrals</TableHead>
              <TableHead>Enrolled</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {b2bPartners.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.agency_name}</TableCell>
                <TableCell>{p.contact_person}</TableCell>
                <TableCell><Badge variant="secondary">{p.total_referrals}</Badge></TableCell>
                <TableCell>{p.successful_enrollments}</TableCell>
                <TableCell className="font-semibold">${p.commission_earned.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
