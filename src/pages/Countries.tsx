import { Link } from "react-router-dom";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { countries, universities } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Countries() {
  return (
    <div className="min-h-screen flex flex-col">
      <MegaMenu />
      <main className="flex-1">
        <div className="intro-surface py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-3">Explore by Country</h1>
            <p className="text-primary-foreground/70 max-w-xl mx-auto">Choose a country to discover top universities and programs available for international students.</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {countries.map((c) => {
              const uniCount = universities.filter((u) => u.country_id === c.id).length;
              return (
                <Link key={c.id} to={`/country/${c.id}`}>
                  <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center p-8">
                    <CardContent className="p-0">
                      <span className="text-6xl block mb-4">{c.flag_icon}</span>
                      <h3 className="font-bold text-lg mb-1">{c.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{uniCount} {uniCount === 1 ? "university" : "universities"}</p>
                      <span className="text-secondary text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                        Explore <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
