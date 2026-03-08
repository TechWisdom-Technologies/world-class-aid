import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { HeroSection } from "@/components/public/HeroSection";
import { ServicesGrid } from "@/components/public/ServicesGrid";
import { StatsBanner } from "@/components/public/StatsBanner";
import { UniversitiesSection } from "@/components/public/UniversitiesSection";
import { AccommodationsSection } from "@/components/public/AccommodationsSection";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { BlogSection } from "@/components/public/BlogSection";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { GraduationCap, Calculator, Handshake, Globe } from "lucide-react";

const quickLinks = [
  { icon: Globe, title: "Explore Countries", desc: "Browse universities by country", href: "/countries" },
  { icon: GraduationCap, title: "Eligibility Test", desc: "Find your best-fit university", href: "/eligibility" },
  { icon: Calculator, title: "Cost Calculator", desc: "Estimate living expenses", href: "/cost-calculator" },
  { icon: Handshake, title: "Become a Partner", desc: "Join our B2B network", href: "/b2b" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <PublicHeader />
      <main>
        <HeroSection />

        {/* Quick Links */}
        <div className="container mx-auto px-4 -mt-8 relative z-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((l) => (
              <Link key={l.title} to={l.href}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                  <CardContent className="p-5 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                      <l.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm">{l.title}</h3>
                      <p className="text-xs text-muted-foreground">{l.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <ServicesGrid />
        <StatsBanner />
        <UniversitiesSection />
        <AccommodationsSection />
        <TestimonialsSection />
        <BlogSection />
      </main>
      <PublicFooter />
    </div>
  );
};

export default Index;
