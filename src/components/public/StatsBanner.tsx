import { useEffect, useState, useRef } from "react";
import { GraduationCap, BookOpen, Languages, Users } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: 50, suffix: "+", label: "Partner Universities", desc: "Across Malaysia" },
  { icon: BookOpen, value: 500, suffix: "+", label: "Courses Available", desc: "All Degree Levels" },
  { icon: Languages, value: 30, suffix: "+", label: "Language Centers", desc: "English & Malay" },
  { icon: Users, value: 5000, suffix: "+", label: "Students Placed", desc: "From 60+ Countries" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = Math.ceil(target / (duration / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(start);
            }
          }, 16);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <div ref={ref}><span>{count.toLocaleString()}{suffix}</span></div>;
}

export function StatsBanner() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(220,60%,14%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--secondary)/0.08)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center text-primary-foreground text-center animate-fade-in"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="h-14 w-14 rounded-2xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center mb-4 border border-primary-foreground/5">
                <s.icon className="h-7 w-7 text-secondary" />
              </div>
              <div className="text-4xl md:text-5xl font-extrabold tracking-tight mb-1">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <p className="text-base font-semibold text-primary-foreground/90">{s.label}</p>
              <p className="text-xs text-primary-foreground/50 mt-0.5">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
