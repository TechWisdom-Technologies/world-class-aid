import { useState, useMemo, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search, MapPin, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const ITEMS_PER_PAGE = 9;

export default function Universities() {
  const [universities, setUniversities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
    
    if (!url || !key) {
      setError(`Missing env vars: URL=${!!url}, KEY=${!!key}`);
      setIsLoading(false);
      return;
    }

    fetch(`${url}/rest/v1/universities?select=*&order=ranking.asc`, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        setUniversities(Array.isArray(data) ? data : []);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const cities = useMemo(() => [...new Set(universities.map((u: any) => u.city).filter(Boolean))].sort(), [universities]);

  useEffect(() => { setCurrentPage(1); }, [search, selectedCities]);

  const toggleCity = (city: string) => {
    setSelectedCities((prev) => prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]);
  };

  const filtered = useMemo(() => {
    return universities.filter((u: any) => {
      if (search && !u.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCities.length > 0 && !selectedCities.includes(u.city)) return false;
      return true;
    });
  }, [universities, search, selectedCities]);

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
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Universities in Malaysia</h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">Browse and compare {universities.length}+ partner universities across Malaysia.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {error ? (
          <div className="text-center py-20 text-destructive font-mono text-sm">{error}</div>
        ) : isLoading ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8" ref={gridRef}>
            <aside className="lg:w-1/4 shrink-0 space-y-6">
              <Card>
                <CardContent className="p-5 space-y-6">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Search Universities</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-3 block">City / Region</label>
                    <div className="space-y-2">
                      {cities.map((city: string) => (
                        <label key={city} className="flex items-center gap-2 cursor-pointer text-sm">
                          <Checkbox checked={selectedCities.includes(city)} onCheckedChange={() => toggleCity(city)} />
                          <span>{city}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full" onClick={() => { setSearch(""); setSelectedCities([]); }}>Clear Filters</Button>
                </CardContent>
              </Card>
            </aside>

            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-4">{filtered.length} {filtered.length === 1 ? "university" : "universities"} found</p>
              {paged.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">No universities found. Add some from the admin panel!</div>
              ) : (
                <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                  {paged.map((u: any) => (
                    <Card key={u.id} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="h-32 bg-muted flex items-center justify-center overflow-hidden">
                          {u.logo_url && <img src={u.logo_url} alt={u.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />}
                        </div>
                        <div className="p-4 space-y-2">
                          <h3 className="font-bold text-sm leading-tight line-clamp-2">{u.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />{u.city}, Malaysia
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs font-semibold text-secondary">Rank #{u.ranking}</span>
                            <Link to={`/universities/${u.id}`}>
                              <Button size="sm" variant="outline" className="text-xs h-7">View Details</Button>
                            </Link>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-8">
                  <Button variant="outline" size="sm" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)}>
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">Page <span className="font-semibold text-foreground">{currentPage}</span> of {totalPages}</span>
                  <Button variant="outline" size="sm" disabled={currentPage === totalPages} onClick={() => changePage(currentPage + 1)}>
                    Next <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <PublicFooter />
    </div>
  );
}
