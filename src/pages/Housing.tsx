import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { accommodations, universities } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Home, MapPin, Wifi, Dumbbell } from "lucide-react";
import { useState } from "react";

const roomTypes = ["All", "Apartment", "Hostel", "Studio", "Condominium", "Shared House"];

export default function Housing() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [maxPrice, setMaxPrice] = useState([1200]);
  const [uniFilter, setUniFilter] = useState("all");

  const filtered = accommodations.filter((a) => {
    if (typeFilter !== "All" && a.type !== typeFilter) return false;
    if (a.price_per_month > maxPrice[0]) return false;
    if (uniFilter !== "all" && !a.near_university_ids.includes(Number(uniFilter))) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <MegaMenu />
      <main className="flex-1">
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <Home className="h-12 w-12 mx-auto mb-4 text-secondary" />
            <h1 className="text-4xl font-extrabold mb-3">Student Accommodation</h1>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">Browse verified student housing near your university.</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar Filters */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-5 space-y-5">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Room Type</label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {roomTypes.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Near University</label>
                    <Select value={uniFilter} onValueChange={setUniFilter}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Universities</SelectItem>
                        {universities.map((u) => (
                          <SelectItem key={u.id} value={String(u.id)}>{u.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Max Price: ${maxPrice[0]}/mo</label>
                    <Slider value={maxPrice} onValueChange={setMaxPrice} min={200} max={1500} step={50} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Grid */}
            <div>
              <p className="text-sm text-muted-foreground mb-4">{filtered.length} properties found</p>
              <div className="grid md:grid-cols-2 gap-6">
                {filtered.map((a) => (
                  <Card key={a.id} className="overflow-hidden hover:shadow-lg transition-shadow animate-fade-in group">
                    <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                      <Home className="h-12 w-12 text-muted-foreground/30" />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold">{a.name}</h3>
                        <span className="text-lg font-extrabold text-secondary">${a.price_per_month}<span className="text-xs font-normal text-muted-foreground">/mo</span></span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                        <MapPin className="h-3.5 w-3.5" /> {a.city}
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline">{a.type}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {a.amenities.map((am) => (
                          <Badge key={am} variant="secondary" className="text-xs">{am}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {filtered.length === 0 && <p className="text-center text-muted-foreground py-16">No properties match your filters.</p>}
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
