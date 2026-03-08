import { useParams, Link } from "react-router-dom";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { universities } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Trophy, ArrowRight, Building, GraduationCap } from "lucide-react";

const cityData: Record<string, { name: string; tagline: string; image: string; description: string }> = {
  "kuala-lumpur": {
    name: "Kuala Lumpur",
    tagline: "Malaysia's vibrant capital and education powerhouse",
    image: "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1400&h=600&fit=crop",
    description:
      "Kuala Lumpur is the cultural and economic heart of Malaysia, home to iconic landmarks like the Petronas Twin Towers. The city hosts some of the country's most prestigious universities and offers an unmatched urban student experience with affordable living, world-class transit (LRT/MRT), and a thriving food scene.",
  },
  cyberjaya: {
    name: "Cyberjaya",
    tagline: "Malaysia's Silicon Valley — built for tech students",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1400&h=600&fit=crop",
    description:
      "Cyberjaya is Malaysia's flagship tech city, purpose-built as part of the Multimedia Super Corridor initiative. It hosts leading tech universities like MMU and APU, and is surrounded by 900+ multinational tech companies — giving students direct access to internships and graduate employment.",
  },
  penang: {
    name: "Penang",
    tagline: "Heritage charm meets modern education",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1400&h=600&fit=crop",
    description:
      "Penang, a UNESCO World Heritage Site, offers a unique blend of colonial architecture, street art, and cutting-edge engineering campuses. Known for its lower cost of living compared to KL, Penang is home to USM — one of Malaysia's top research universities — and a booming electronics manufacturing sector.",
  },
};

export default function CityHub() {
  const { citySlug } = useParams<{ citySlug: string }>();
  const city = cityData[citySlug || ""];

  if (!city) {
    return (
      <div className="min-h-screen flex flex-col">
        <MegaMenu />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-extrabold text-foreground">City Not Found</h1>
            <Link to="/destinations/malaysia">
              <Button variant="outline">Back to Malaysia Hub</Button>
            </Link>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const cityUnis = universities.filter(
    (u) => u.city.toLowerCase().replace(/\s+/g, "-") === citySlug || u.city.toLowerCase() === city.name.toLowerCase()
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MegaMenu />

      {/* Hero */}
      <section className="relative h-[360px] md:h-[420px] overflow-hidden">
        <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/90 via-[hsl(var(--primary))]/50 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-10">
            <Badge className="bg-secondary/20 text-secondary-foreground mb-3">
              <MapPin className="h-3 w-3 mr-1" /> Malaysia
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-2">
              Study in {city.name}
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-xl">{city.tagline}</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl font-extrabold text-foreground mb-4">About {city.name}</h2>
          <p className="text-muted-foreground leading-relaxed">{city.description}</p>
        </div>
      </section>

      {/* Universities */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-extrabold text-foreground">Universities in {city.name}</h2>
              <p className="text-muted-foreground mt-1">{cityUnis.length} institutions</p>
            </div>
            <Link to="/universities">
              <Button variant="outline" size="sm" className="gap-1">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>

          {cityUnis.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <GraduationCap className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-foreground mb-1">More universities coming soon</h3>
                <p className="text-sm text-muted-foreground">We're adding more partner institutions in {city.name}.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cityUnis.map((uni) => (
                <Link key={uni.id} to={`/universities/${uni.id}`}>
                  <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full">
                    <div className="h-36 overflow-hidden bg-muted">
                      <img src={uni.heroImage || uni.logo_url} alt={uni.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <CardContent className="p-5 space-y-2">
                      <h3 className="font-bold text-sm leading-tight group-hover:text-secondary transition-colors">{uni.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {uni.city}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <Badge variant="outline" className="text-xs border-secondary/30 text-secondary">
                          <Trophy className="h-3 w-3 mr-1" /> #{uni.ranking}
                        </Badge>
                        <span className="text-xs font-semibold text-secondary flex items-center gap-1">
                          Explore <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-extrabold text-secondary-foreground mb-3">
            Ready to study in {city.name}?
          </h2>
          <p className="text-secondary-foreground/80 max-w-md mx-auto mb-6">
            Get free guidance from our expert counselors.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/destinations/malaysia">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
                <Building className="h-4 w-4 mr-2" /> Explore Malaysia
              </Button>
            </Link>
            <Link to="/universities">
              <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 font-bold">
                Browse All Universities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
