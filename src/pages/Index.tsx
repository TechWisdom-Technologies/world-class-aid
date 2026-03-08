import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { HeroSection } from "@/components/public/HeroSection";
import { ServicesGrid } from "@/components/public/ServicesGrid";
import { StatsBanner } from "@/components/public/StatsBanner";
import { UniversitiesSection } from "@/components/public/UniversitiesSection";
import { AccommodationsSection } from "@/components/public/AccommodationsSection";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { BlogSection } from "@/components/public/BlogSection";
import { IntakeCalendar } from "@/components/public/IntakeCalendar";
import { ResourcesSection } from "@/components/public/ResourcesSection";
import { LeadBanner } from "@/components/public/LeadBanner";
import { AmbassadorChat } from "@/components/public/AmbassadorChat";
import { VideoExpertWidget } from "@/components/public/VideoExpertWidget";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { GraduationCap, Calculator, Globe, Trophy, Calendar, Award } from "lucide-react";

const quickLinks = [
  { icon: Globe, title: "Study in Malaysia", desc: "Your complete Malaysia guide", href: "/destinations/malaysia" },
  { icon: Trophy, title: "Compare Universities", desc: "Side-by-side comparison", href: "/compare" },
  { icon: GraduationCap, title: "Eligibility Test", desc: "Find your best-fit university", href: "/eligibility" },
  { icon: Award, title: "Scholarships", desc: "Find funding opportunities", href: "/scholarships" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <MegaMenu />
      <main>
        <HeroSection />

        {/* Quick Links */}
        <div className="container mx-auto px-4 -mt-8 relative z-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickLinks.map((l, i) => (
              <Link key={l.title} to={l.href}>
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
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
        <IntakeCalendar />
        <UniversitiesSection />
        <AccommodationsSection />
        <ResourcesSection />
        <TestimonialsSection />
        <BlogSection />
      </main>
      <PublicFooter />
      <LeadBanner />
      <AmbassadorChat />
      <VideoExpertWidget />
    </div>
  );
};

export default Index;
