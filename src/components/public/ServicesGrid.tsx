import { MessageSquare, FileCheck, Home, Plane } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  { icon: MessageSquare, title: "Free Consultations", description: "Get expert advice on university selection and career pathways at no cost." },
  { icon: FileCheck, title: "Admission & Visa", description: "Complete assistance with applications, documentation, and visa processing." },
  { icon: Home, title: "Accommodation", description: "Find safe, affordable housing near your university campus." },
  { icon: Plane, title: "Airport Pickup", description: "We'll be there when you land. Comfortable transport to your new home." },
];

export function ServicesGrid() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Our Services</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Everything you need for a seamless journey to studying in Malaysia
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <Card key={s.title} className="group hover:shadow-lg transition-shadow border-none bg-card">
              <CardContent className="p-8 text-center">
                <div className="mx-auto mb-5 h-14 w-14 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <s.icon className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
