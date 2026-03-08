import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, ArrowRight, Building2, GraduationCap, FileText, Globe } from "lucide-react";

const hiringCompanies = [
  "Petronas", "Maybank", "CIMB Group", "Grab", "Shopee", "Intel Malaysia",
  "Dell Technologies", "Deloitte", "KPMG", "Accenture", "IBM", "Samsung",
];

const timeline = [
  { icon: GraduationCap, title: "Graduate", desc: "Complete your degree programme", time: "Year 0" },
  { icon: FileText, title: "Apply for Post-Study Work Visa", desc: "Most countries offer 1-3 year post-study work rights", time: "0-3 months" },
  { icon: Briefcase, title: "Secure Employment", desc: "Use university career services and job portals", time: "3-6 months" },
  { icon: Building2, title: "Employer Sponsorship", desc: "Your employer applies for a long-term work permit", time: "6-12 months" },
  { icon: Globe, title: "Permanent Residency", desc: "Some countries allow PR after 2-5 years of work", time: "2-5 years" },
];

const workRights = [
  { country: "🇲🇾 Malaysia", duration: "1 year post-study", detail: "Eligible via Talent Pass or employer sponsorship" },
  { country: "🇬🇧 United Kingdom", duration: "2 years (Graduate Route)", detail: "No sponsorship needed for 2 years" },
  { country: "🇦🇺 Australia", duration: "2-4 years (485 visa)", detail: "Duration depends on qualification level" },
  { country: "🇨🇦 Canada", duration: "Up to 3 years (PGWP)", detail: "Duration matches your programme length" },
];

export default function Careers() {
  return (
    <div className="min-h-screen flex flex-col">
      <MegaMenu />
      <main className="flex-1">
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <Briefcase className="h-12 w-12 mx-auto mb-4 text-secondary" />
            <h1 className="text-4xl font-extrabold mb-3">Post-Study Work & Career Hub</h1>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">Understand your work rights after graduation and kickstart your international career.</p>
          </div>
        </section>

        {/* Work Rights */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-extrabold mb-8 text-center">Post-Study Work Rights by Country</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workRights.map((w) => (
              <Card key={w.country} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <p className="text-2xl mb-2">{w.country}</p>
                  <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">{w.duration}</Badge>
                  <p className="text-sm text-muted-foreground">{w.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <section className="bg-muted py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-extrabold mb-10 text-center">From Student to Professional</h2>
            <div className="max-w-2xl mx-auto">
              {timeline.map((step, i) => (
                <div key={i} className="flex gap-4 animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center border-2 border-secondary">
                      <step.icon className="h-5 w-5 text-secondary" />
                    </div>
                    {i < timeline.length - 1 && <div className="w-0.5 flex-1 bg-border my-1" />}
                  </div>
                  <Card className="mb-4 flex-1">
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-sm">{step.title}</h3>
                        <Badge variant="outline" className="text-xs">{step.time}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hiring Companies */}
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-extrabold mb-8 text-center">Top Hiring Companies in Malaysia</h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {hiringCompanies.map((c) => (
              <Card key={c} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 text-center">
                  <Building2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
                  <p className="text-xs font-semibold">{c}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
