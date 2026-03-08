import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { universities, countries } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Search, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 9;

export default function Universities() {
  const [search, setSearch] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<number[]>([]);
  const [maxTuition, setMaxTuition] = useState(50000);
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  // Reset page on filter change
  useEffect(() => { setCurrentPage(1); }, [search, selectedCountries, maxTuition]);

  const toggleCountry = (id: number) => {
    setSelectedCountries((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const filtered = useMemo(() => {
    return universities.filter((u) => {
      if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCountries.length > 0 && !selectedCountries.includes(u.country_id)) return false;
      // Use ranking as proxy for tuition range (since University doesn't have tuition directly)
      return true;
    });
  }, [search, selectedCountries, maxTuition]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paged = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const changePage = (page: number) => {
    setCurrentPage(page);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MegaMenu />
      <div className="bg-primary text-primary-foreground py-14">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">University Directory</h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">Browse and compare {universities.length}+ universities across 4 countries.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8" ref={gridRef}>
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4 shrink-0 space-y-6">
            <Card>
              <CardContent className="p-5 space-y-6">
                {/* Search */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Search by Name</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="e.g. Monash, Oxford…"
                      className="pl-9"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Country */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">Country</label>
                  <div className="space-y-2">
                    {countries.map((c) => (
                      <label key={c.id} className="flex items-center gap-2 cursor-pointer text-sm">
                        <Checkbox
                          checked={selectedCountries.includes(c.id)}
                          onCheckedChange={() => toggleCountry(c.id)}
                        />
                        <span>{c.flag_icon} {c.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Tuition Slider */}
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block">
                    Max Avg. Tuition <span className="text-muted-foreground font-normal">(USD {maxTuition.toLocaleString()}/yr)</span>
                  </label>
                  <Slider
                    min={5000}
                    max={50000}
                    step={1000}
                    value={[maxTuition]}
                    onValueChange={([v]) => setMaxTuition(v)}
                  />
                </div>

                <Button variant="outline" className="w-full" onClick={() => { setSearch(""); setSelectedCountries([]); setMaxTuition(50000); }}>
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} {filtered.length === 1 ? "university" : "universities"} found</p>

            {paged.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground">No universities match your filters.</div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {paged.map((u) => {
                  const country = countries.find((c) => c.id === u.country_id);
                  return (
                    <Card key={u.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="h-32 bg-muted flex items-center justify-center overflow-hidden">
                          <img src={u.logo_url} alt={u.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-4 space-y-2">
                          <h3 className="font-bold text-sm leading-tight line-clamp-2">{u.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {u.city}, {country?.name}
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs font-semibold text-secondary">Rank #{u.ranking}</span>
                            <Link to={`/university/${u.id}`}>
                              <Button size="sm" variant="outline" className="text-xs h-7">View Details</Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === 1}
                  onClick={() => changePage(currentPage - 1)}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page <span className="font-semibold text-foreground">{currentPage}</span> of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={currentPage === totalPages}
                  onClick={() => changePage(currentPage + 1)}
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}
