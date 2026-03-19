import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { countries, universities } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LeadCaptureModal } from "@/components/public/LeadCaptureModal";
import {
  MapPin, Trophy, ArrowRight, Landmark, Banknote, Languages, Users,
  DollarSign, Globe, Laptop, Plane, Shield, Award, GraduationCap,
  Clock, FlaskConical, Building, Heart, Briefcase, Sun, Lightbulb,
  Mountain, Cpu, Home, UtensilsCrossed, Bus, FileText, Phone,
  BookOpen, Handshake
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  DollarSign, Globe, Laptop, Plane, Shield, Award, GraduationCap,
  Clock, FlaskConical, Building, Heart, Briefcase, Sun, Lightbulb,
  Mountain, Trophy, Cpu, MapPin, Languages, Handshake,
};

export default function CountryHub() {
  const { countryId } = useParams();
  const country = countries.find((c) => c.id === Number(countryId));
  const countryUnis = universities.filter((u) => u.country_id === Number(countryId));
  const [leadOpen, setLeadOpen] = useState(false);

  if (!country) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <MegaMenu />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Globe className="h-16 w-16 text-muted-foreground mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">404 — Country Not Found</h1>
            <p className="text-muted-foreground">The country you're looking for doesn't exist.</p>
            <Link to="/countries"><Button>Browse All Countries</Button></Link>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const quickFacts = [
    { icon: Landmark, label: "Capital", value: country.capital || "N/A" },
    { icon: Banknote, label: "Currency", value: country.currency || "N/A" },
    { icon: Languages, label: "Language", value: country.language || "N/A" },
    { icon: Users, label: "Population", value: country.population || "N/A" },
  ];

  const costItems = country.costOfLiving ? [
    { icon: Home, label: "Housing", value: country.costOfLiving.housing, pct: 60 },
    { icon: UtensilsCrossed, label: "Food & Groceries", value: country.costOfLiving.food, pct: 40 },
    { icon: Bus, label: "Transport", value: country.costOfLiving.transport, pct: 20 },
  ] : [];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MegaMenu />

      {/* HERO */}
      <section className="relative h-[400px] md:h-[480px] overflow-hidden">
        <img
          src={country.bannerImage || "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=1400&h=600&fit=crop"}
          alt={`Study in ${country.name}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/95 via-[hsl(var(--primary))]/50 to-[hsl(var(--primary))]/20" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div>
            <span className="text-6xl mb-4 block">{country.flag_icon}</span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-3">
              Study in {country.name}
            </h1>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto">
              Your gateway to world-class education and unforgettable experiences.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Facts Floating Card */}
      <div className="container mx-auto px-4 -mt-12 relative z-10">
        <Card className="shadow-xl border-2">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {quickFacts.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-secondary/15 flex items-center justify-center shrink-0">
                    <f.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{f.label}</p>
                    <p className="text-sm font-bold text-foreground">{f.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* WHY STUDY */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Why Study in {country.name}?</h2>
          <div className="flex flex-col lg:flex-row gap-10 mt-6">
            <div className="lg:w-1/2">
              <p className="text-muted-foreground leading-relaxed text-base">{country.aboutText}</p>
            </div>
            <div className="lg:w-1/2">
              <div className="grid sm:grid-cols-2 gap-4">
                {(country.reasonsToStudy || []).map((r, i) => {
                  const Icon = iconMap[r.iconName] || BookOpen;
                  return (
                    <Card key={i} className="hover:shadow-md transition-shadow animate-fade-in" style={{ animationDelay: `${i * 80}ms` }}>
                      <CardContent className="p-5">
                        <div className="h-9 w-9 rounded-lg bg-secondary/15 flex items-center justify-center mb-3">
                          <Icon className="h-4.5 w-4.5 text-secondary" />
                        </div>
                        <h3 className="text-sm font-bold text-foreground mb-1">{r.title}</h3>
                        <p className="text-xs text-muted-foreground leading-relaxed">{r.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TOP UNIVERSITIES */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Top Universities in {country.name}</h2>
              <p className="text-muted-foreground mt-1">{countryUnis.length} partner universities</p>
            </div>
            <Link to="/universities">
              <Button variant="outline" size="sm" className="hidden md:inline-flex gap-1">
                View All <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
          {countryUnis.length === 0 ? (
            <Card className="py-16 text-center">
              <CardContent>
                <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">More universities coming soon…</p>
                <p className="text-xs text-muted-foreground mt-1">We're actively onboarding new partner institutions in {country.name}.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {countryUnis.map((uni) => (
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
                        <span className="text-xs font-semibold text-secondary flex items-center gap-1 group-hover:gap-2 transition-all">
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

      {/* LIVING COSTS */}
      {costItems.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Cost of Living in {country.name}</h2>
            <p className="text-muted-foreground mb-8">Estimated monthly expenses for international students.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {costItems.map((c) => (
                <Card key={c.label}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-lg bg-secondary/15 flex items-center justify-center">
                        <c.icon className="h-5 w-5 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{c.label}</p>
                        <p className="text-sm font-bold text-foreground">{c.value}</p>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full bg-secondary transition-all duration-700" style={{ width: `${c.pct}%` }} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Button
              variant="outline"
              onClick={() => toast({ title: "Cost Calculator", description: "Full cost calculator launching soon!" })}
            >
              Open Cost Calculator
            </Button>
          </div>
        </section>
      )}

      {/* VISA & POST-STUDY */}
      {country.postStudyWorkRights && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-10 items-center">
              <div className="lg:w-1/2">
                <div className="rounded-2xl overflow-hidden bg-muted aspect-video">
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c476?w=800&h=500&fit=crop"
                    alt="Graduates"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="lg:w-1/2 space-y-4">
                <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Visa & Post-Study Work Rights</h2>
                <p className="text-muted-foreground leading-relaxed">{country.postStudyWorkRights}</p>
                <div className="flex items-start gap-3 pt-2">
                  <FileText className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Need help with your visa application?</p>
                    <p className="text-xs text-muted-foreground">Our team provides free step-by-step visa guidance for all students.</p>
                  </div>
                </div>
                <Link to="/visa-guide">
                  <Button variant="outline" size="sm" className="mt-2 gap-1">
                    Read Full Visa Guide <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM CTA */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-secondary-foreground mb-3">
            Ready to Start Your Journey in {country.name}?
          </h2>
          <p className="text-secondary-foreground/80 max-w-xl mx-auto mb-8">
            Our expert counselors will guide you from application to arrival — completely free of charge.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-13 px-8" onClick={() => setLeadOpen(true)}>
              <Phone className="h-4 w-4 mr-2" /> Book a Free Consultation
            </Button>
            <Link to="/courses">
              <Button size="lg" variant="outline" className="border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 font-bold h-13 px-8">
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <LeadCaptureModal
        open={leadOpen}
        onOpenChange={setLeadOpen}
        defaultUniversity={country.name}
        source={`country_hub_${country.id}_cta`}
      />

      <PublicFooter />
    </div>
  );
}
