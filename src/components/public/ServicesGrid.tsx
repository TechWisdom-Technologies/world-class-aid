import { MessageSquare, FileCheck, Home, Plane, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const services = [
  { icon: MessageSquare, title: "Free Consultations", description: "Get expert advice on university selection and career pathways at no cost.", color: "from-blue-500/10 to-blue-600/5", iconBg: "bg-blue-500/15", iconColor: "text-blue-600", link: "/eligibility" },
  { icon: FileCheck, title: "Admission & Visa", description: "Complete assistance with applications, documentation, and visa processing.", color: "from-emerald-500/10 to-emerald-600/5", iconBg: "bg-emerald-500/15", iconColor: "text-emerald-600", link: "/visa-guide" },
  { icon: Home, title: "Accommodation", description: "Find safe, affordable housing near your university campus.", color: "from-amber-500/10 to-amber-600/5", iconBg: "bg-secondary/15", iconColor: "text-secondary", link: "/housing" },
  { icon: Plane, title: "Airport Pickup", description: "We'll be there when you land. Comfortable transport to your new home.", color: "from-violet-500/10 to-violet-600/5", iconBg: "bg-violet-500/15", iconColor: "text-violet-600", link: "/pre-departure" },
];

export function ServicesGrid() {
  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-secondary mb-3">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
            Everything You Need,{" "}
            <span className="text-secondary">One Platform</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A seamless journey from choosing your university to settling into your new home in Malaysia.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <Link key={s.title} to={s.link}>
              <Card
                className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-border/40 bg-card/80 backdrop-blur-sm h-full animate-fade-in overflow-hidden relative"
                style={{ animationDelay: `${i * 120}ms` }}
              >
                {/* Gradient accent top */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <CardContent className="p-8 text-center relative">
                  <div className={`mx-auto mb-6 h-16 w-16 rounded-2xl ${s.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <s.icon className={`h-8 w-8 ${s.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.description}</p>
                  <span className="inline-flex items-center text-xs font-semibold text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    Learn More <ArrowRight className="h-3 w-3 ml-1" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
