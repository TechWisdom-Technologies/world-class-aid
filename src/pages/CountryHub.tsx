import { useParams, Link } from "react-router-dom";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { countries, universities } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Trophy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CountryHub() {
  const { countryId } = useParams();
  const country = countries.find((c) => c.id === Number(countryId));
  const countryUnis = universities.filter((u) => u.country_id === Number(countryId));

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col">
        <MegaMenu />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Country not found.</p>
        </main>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MegaMenu />
      <main className="flex-1">
        <div className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <Link to="/countries">
              <Button variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground mb-4">
                <ArrowLeft className="h-4 w-4 mr-1" /> All Countries
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{country.flag_icon}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-extrabold">Universities in {country.name}</h1>
                <p className="text-primary-foreground/70 mt-1">{countryUnis.length} universities available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {countryUnis.length === 0 ? (
            <p className="text-muted-foreground text-center py-12">No universities listed for this country yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {countryUnis.map((uni) => (
                <Link key={uni.id} to={`/university/${uni.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img src={uni.logo_url} alt={uni.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="font-bold text-lg mb-2 group-hover:text-secondary transition-colors">{uni.name}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                        <MapPin className="h-3.5 w-3.5" /> {uni.city}
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-secondary/30 text-secondary">
                          <Trophy className="h-3 w-3 mr-1" /> #{uni.ranking} World
                        </Badge>
                        <span className="text-xs font-semibold text-muted-foreground">Score: {uni.global_score}/100</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
