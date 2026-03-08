import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Wallet, Clock, TrendingUp, Download, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

const payoutHistory = [
  { id: 1, date: "2026-03-01", amount: 2500, student: "Ali Hassan", status: "Paid" as const },
  { id: 2, date: "2026-02-15", amount: 2500, student: "Priya Sharma", status: "Paid" as const },
  { id: 3, date: "2026-02-01", amount: 1500, student: "Chen Wei", status: "Pending" as const },
  { id: 4, date: "2026-01-20", amount: 2000, student: "Rashid Al-Nasser", status: "Paid" as const },
  { id: 5, date: "2026-01-10", amount: 3000, student: "Fatima Zahra", status: "Pending" as const },
  { id: 6, date: "2025-12-15", amount: 2500, student: "Aisha Mohammed", status: "Paid" as const },
];

export default function PartnerWallet() {
  const [payoutOpen, setPayoutOpen] = useState(false);
  const [amount, setAmount] = useState("");

  const walletCards = [
    { label: "Available Balance", value: "$12,500", icon: Wallet, color: "text-success", bg: "bg-success/10" },
    { label: "Pending Clearance", value: "$4,500", icon: Clock, color: "text-warning", bg: "bg-warning/10" },
    { label: "Total Lifetime Earnings", value: "$62,000", icon: TrendingUp, color: "text-secondary", bg: "bg-secondary/10" },
  ];

  const handlePayout = () => {
    toast.success("Payout requested!", { description: `$${amount} payout will be processed within 3-5 business days.` });
    setPayoutOpen(false);
    setAmount("");
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold">Financials & Wallet</h1>
          <p className="text-muted-foreground text-sm">Track your earnings and request payouts</p>
        </div>
        <Dialog open={payoutOpen} onOpenChange={setPayoutOpen}>
          <DialogTrigger asChild>
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <ArrowUpRight className="h-4 w-4 mr-2" />Request Payout
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm">
            <DialogHeader><DialogTitle>Request Payout</DialogTitle></DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="bg-muted/50 rounded-xl p-4 text-center">
                <p className="text-xs text-muted-foreground">Available Balance</p>
                <p className="text-2xl font-extrabold text-success">$12,500</p>
              </div>
              <div>
                <Label>Payout Amount (USD)</Label>
                <Input type="number" placeholder="e.g. 5000" value={amount} onChange={(e) => setAmount(e.target.value)} />
              </div>
              <div>
                <Label>Bank Account</Label>
                <Input disabled value="•••• •••• •••• 4829 (Maybank)" />
              </div>
              <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={handlePayout} disabled={!amount || Number(amount) <= 0}>
                Confirm Payout Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {walletCards.map((c, i) => (
          <Card key={c.label} className="hover:shadow-lg transition-shadow animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-2xl ${c.bg} flex items-center justify-center ${c.color}`}>
                <c.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{c.label}</p>
                <p className="text-2xl font-extrabold">{c.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Payout History */}
      <Card>
        <CardHeader><CardTitle>Payout History</CardTitle></CardHeader>
        <CardContent>
          <div className="rounded-xl border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payoutHistory.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="text-muted-foreground">{new Date(p.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</TableCell>
                    <TableCell className="font-bold">${p.amount.toLocaleString()}</TableCell>
                    <TableCell>{p.student}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={p.status === "Paid" ? "bg-success/10 text-success border-success/20" : "bg-warning/10 text-warning border-warning/20"}>
                        {p.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => toast.success("Invoice downloaded!")}>
                        <Download className="h-3.5 w-3.5" /> Invoice
                      </Button>
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
