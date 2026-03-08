import { useState } from "react";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Handshake, DollarSign, Users, Globe, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

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

export default function B2BLanding() {
  const [regOpen, setRegOpen] = useState(false);

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
                <DialogContent className="max-w-md">
                  <DialogHeader><DialogTitle>Register Your Agency</DialogTitle></DialogHeader>
                  <div className="space-y-4 pt-2">
                    <div><Label>Agency Name</Label><Input placeholder="Your company name" /></div>
                    <div><Label>Contact Person</Label><Input placeholder="Full name" /></div>
                    <div><Label>Email</Label><Input type="email" placeholder="email@agency.com" /></div>
                    <div><Label>Country</Label><Input placeholder="Country of operation" /></div>
                    <div><Label>Number of Students (Annual)</Label><Input type="number" placeholder="e.g. 50" /></div>
                    <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={() => { setRegOpen(false); toast.success("Registration submitted! We'll be in touch within 24 hours."); }}>Submit Registration</Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Link to="/partner-dashboard">
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
