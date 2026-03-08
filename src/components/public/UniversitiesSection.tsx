import { universities, countries } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function UniversitiesSection() {
  return (
    <section id="universities" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Top Universities</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Explore our partnered universities worldwide
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {universities.slice(0, 6).map((uni) => {
            const country = countries.find((c) => c.id === uni.country_id);
            return (
              <Link key={uni.id} to={`/universities/${uni.id}`}>
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="h-44 overflow-hidden">
                    <img src={uni.logo_url} alt={uni.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-secondary transition-colors">{uni.name}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{uni.city}, {country?.name}</span>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Trophy className="h-3 w-3" />#{uni.ranking}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{uni.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link to="/universities">
            <Button variant="outline" size="lg" className="gap-2">
              View All Universities <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
