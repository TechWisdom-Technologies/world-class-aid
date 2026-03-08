import { PublicHeader } from "@/components/public/PublicHeader";
import { PublicFooter } from "@/components/public/PublicFooter";
import { HeroSection } from "@/components/public/HeroSection";
import { ServicesGrid } from "@/components/public/ServicesGrid";
import { StatsBanner } from "@/components/public/StatsBanner";
import { UniversitiesSection } from "@/components/public/UniversitiesSection";
import { AccommodationsSection } from "@/components/public/AccommodationsSection";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { BlogSection } from "@/components/public/BlogSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <PublicHeader />
      <main>
        <HeroSection />
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
