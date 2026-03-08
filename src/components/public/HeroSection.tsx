import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { universities, courses, countries } from "@/data/mockData";

const tabs = ["University", "Course", "Country"];

export function HeroSection() {
  const [activeTab, setActiveTab] = useState("University");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    const q = query.toLowerCase();

    if (activeTab === "University") {
      const uni = universities.find((u) => u.name.toLowerCase().includes(q));
      if (uni) navigate(`/universities/${uni.id}`);
      else navigate(`/universities`);
    } else if (activeTab === "Course") {
      const course = courses.find((c) => c.title.toLowerCase().includes(q));
      if (course) navigate(`/courses/${course.id}`);
      else navigate(`/courses`);
    } else {
      navigate(`/destinations/malaysia`);
    }
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?w=1600&h=900&fit=crop')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/75 to-primary/95" />

      <div className="relative z-10 container mx-auto px-4 text-center text-primary-foreground">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight max-w-4xl mx-auto">
          Expert Guidance For International Students Worldwide
        </h1>
        <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
          Discover top universities, courses, and accommodations with personalized support every step of the way.
        </p>

        <div className="max-w-xl mx-auto bg-background rounded-2xl shadow-2xl overflow-hidden">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "text-secondary border-b-2 border-secondary bg-muted/50"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="p-4 flex gap-2">
            <Input
              placeholder={`Search for a ${activeTab.toLowerCase()}...`}
              className="flex-1"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
