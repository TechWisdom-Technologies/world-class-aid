import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { scholarships, universities, countries } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Award, Calendar, Search } from "lucide-react";
import { useState } from "react";

export default function Scholarships() {
  const [countryFilter, setCountryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const enriched = scholarships.map((s) => {
    const uni = universities.find((u) => u.id === s.university_id);
    const country = uni ? countries.find((c) => c.id === uni.country_id) : null;
    return { ...s, university: uni, country };
  });

  const filtered = enriched.filter((s) => {
    if (countryFilter !== "all" && s.country?.id !== Number(countryFilter)) return false;
    if (typeFilter === "merit" && !s.criteria.toLowerCase().includes("gpa")) return false;
    if (typeFilter === "need" && !s.criteria.toLowerCase().includes("community")) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <MegaMenu />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <Award className="h-12 w-12 mx-auto mb-4 text-secondary" />
            <h1 className="text-4xl font-extrabold mb-3">Scholarship Finder</h1>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">Discover scholarships worth thousands — filter by country, degree level, and type to find your perfect match.</p>
          </div>
        </section>

        {/* Filters */}
        <div className="container mx-auto px-4 -mt-6 relative z-10">
          <Card>
            <CardContent className="p-4 flex flex-wrap gap-4 items-center">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Country" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  {countries.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>{c.flag_icon} {c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="merit">Merit-based</SelectItem>
                  <SelectItem value="need">Need-based</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="container mx-auto px-4 py-10">
          <p className="text-sm text-muted-foreground mb-6">{filtered.length} scholarships found</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => (
              <Card key={s.id} className="hover:shadow-lg transition-shadow animate-fade-in group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className="bg-secondary/10 text-secondary border-secondary/20 text-xs">{s.coverage_amount}</Badge>
                    <Award className="h-5 w-5 text-secondary group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-bold mb-1">{s.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{s.university?.name} • {s.country?.flag_icon} {s.country?.name}</p>
                  <div className="pt-3 border-t">
                    <p className="text-xs text-muted-foreground"><strong>Criteria:</strong> {s.criteria}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-16">No scholarships match your filters. Try broadening your search.</p>
          )}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
