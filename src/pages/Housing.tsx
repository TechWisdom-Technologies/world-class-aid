import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { useTableData } from "@/hooks/useSupabaseData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Home, MapPin, Loader2 } from "lucide-react";
import { useState, useMemo } from "react";

const roomTypes = ["All", "Apartment", "Hostel", "Studio", "Condominium", "Shared House"];

export default function Housing() {
  const { data: accommodations = [], isLoading } = useTableData("accommodations");
  const [typeFilter, setTypeFilter] = useState("All");
  const [maxPrice, setMaxPrice] = useState([1200]);

  const filtered = useMemo(() => accommodations.filter((a: any) => {
    if (typeFilter !== "All" && a.type !== typeFilter) return false;
    if (Number(a.price_per_month) > maxPrice[0]) return false;
    return true;
  }), [accommodations, typeFilter, maxPrice]);

  return (
    <div className="min-h-screen flex flex-col">
      <MegaMenu />
      <main className="flex-1">
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4">Accommodations</Badge>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Student Housing in Malaysia</h1>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">Find the perfect place to stay near your university.</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-10">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-1/4 shrink-0">
              <Card>
                <CardContent className="p-5 space-y-6">
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Room Type</label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>{roomTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-2 block">Max Price: RM {maxPrice[0]}/mo</label>
                    <Slider min={200} max={2000} step={50} value={maxPrice} onValueChange={setMaxPrice} />
                  </div>
                </CardContent>
              </Card>
            </aside>

            <div className="flex-1">
              {isLoading ? (
                <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">No accommodations found.</div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filtered.map((a: any) => (
                    <Card key={a.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-5 space-y-3">
                        <div className="flex items-center gap-2">
                          <Home className="h-5 w-5 text-secondary" />
                          <h3 className="font-bold text-sm">{a.name}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3" /> {a.city}
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">{a.type}</Badge>
                          <span className="font-bold text-secondary">RM {Number(a.price_per_month).toLocaleString()}/mo</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
