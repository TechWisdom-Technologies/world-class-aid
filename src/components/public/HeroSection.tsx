import { useState, useEffect } from "react";
import { Search, ArrowRight, Sparkles, Star, ChevronRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { universities, courses } from "@/data/mockData";
import { LeadCaptureModal } from "@/components/public/LeadCaptureModal";

const tabs = ["University", "Course", "Country"];

const trustPoints = [
  "50+ Partner Universities",
  "98% Visa Success Rate",
  "24/7 Student Support",
];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState("University");
  const [query, setQuery] = useState("");
  const [leadOpen, setLeadOpen] = useState(false);
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = () => {
    if (!query.trim()) return;
    const q = query.toLowerCase();
    if (activeTab === "University") {
      const uni = universities.find((u) => u.name.toLowerCase().includes(q));
      navigate(uni ? `/universities/${uni.id}` : "/universities");
    } else if (activeTab === "Course") {
      const course = courses.find((c) => c.title.toLowerCase().includes(q));
      navigate(course ? `/courses/${course.id}` : "/courses");
    } else {
      navigate("/destinations/malaysia");
    }
  };

  return (
    <section className="relative min-h-[680px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=900&fit=crop')",
        }}
      />
      {/* Multi-layer gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-[hsl(var(--primary)/0.95)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--secondary)/0.15)_0%,transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,hsl(var(--secondary)/0.1)_0%,transparent_50%)]" />

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-secondary/5 blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-[pulse_8s_ease-in-out_infinite_1s]" />

      <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
        {/* Trust badge */}
        <div
          className={`inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 px-4 py-2 mb-8 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <Sparkles className="h-4 w-4 text-secondary" />
          <span className="text-sm font-medium text-primary-foreground/90">#1 Platform for International Students in Malaysia</span>
          <Star className="h-3.5 w-3.5 text-secondary fill-secondary" />
        </div>

        {/* Heading */}
        <h1
          className={`text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 leading-[1.1] max-w-5xl mx-auto transition-all duration-700 delay-150 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Your Journey to{" "}
          <span className="relative inline-block">
            <span className="relative z-10 text-secondary">World-Class</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-secondary/20 rounded-sm -skew-x-3" />
          </span>{" "}
          Education Starts Here
        </h1>

        <p
          className={`text-lg md:text-xl text-primary-foreground/70 mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Discover top universities, courses, and accommodations with personalized support every step of the way.
        </p>

        {/* Search card */}
        <div
          className={`max-w-2xl mx-auto transition-all duration-700 delay-[450ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="bg-background/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_60px_-12px_hsl(var(--foreground)/0.25)] border border-border/30 overflow-hidden">
            <div className="flex border-b border-border/50">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3.5 text-sm font-semibold transition-all duration-200 relative ${
                    activeTab === tab
                      ? "text-secondary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-secondary rounded-full" />
                  )}
                </button>
              ))}
            </div>
            <div className="p-4 flex gap-3">
              <Input
                placeholder={`Search for a ${activeTab.toLowerCase()}...`}
                className="flex-1 h-12 text-base border-border/50 focus-visible:ring-secondary/30"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Button
                className="h-12 px-6 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold shadow-md hover:shadow-lg transition-all"
                onClick={handleSearch}
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Trust points */}
        <div
          className={`flex flex-wrap items-center justify-center gap-6 mt-10 transition-all duration-700 delay-[600ms] ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {trustPoints.map((point) => (
            <div key={point} className="flex items-center gap-2 text-primary-foreground/60">
              <div className="h-1.5 w-1.5 rounded-full bg-secondary" />
              <span className="text-sm font-medium">{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 80V40C240 10 480 0 720 20C960 40 1200 60 1440 40V80H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
}
