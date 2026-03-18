import { useEffect, useState, useRef } from "react";
import { GraduationCap, BookOpen, Languages, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LiveStats {
  universityCount: number;
  courseCount: number;
  languageCenterCount: number;
  countryCount: number;
}

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const animationRef = useRef<number>();

  useEffect(() => {
    if (animationRef.current) {
      window.cancelAnimationFrame(animationRef.current);
    }

    const startValue = count;
    const diff = target - startValue;
    const duration = 700;
    const startedAt = performance.now();

    const animate = (now: number) => {
      const progress = Math.min(1, (now - startedAt) / duration);
      const nextValue = Math.round(startValue + diff * progress);
      setCount(nextValue);

      if (progress < 1) {
        animationRef.current = window.requestAnimationFrame(animate);
      }
    };

    animationRef.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, [target]);

  return <span>{count.toLocaleString()}{suffix}</span>;
}

export function StatsBanner() {
  const [stats, setStats] = useState<LiveStats>({
    universityCount: 0,
    courseCount: 0,
    languageCenterCount: 0,
    countryCount: 0,
  });

  const loadStats = async () => {
    const [universityRes, courseRes, languageRes, countryRes] = await Promise.all([
      supabase.from("universities").select("id", { count: "exact", head: true }),
      supabase.from("courses").select("id", { count: "exact", head: true }),
      supabase.from("language_centers").select("id", { count: "exact", head: true }),
      supabase.from("countries").select("id", { count: "exact", head: true }),
    ]);

    setStats((prev) => ({
      universityCount: universityRes.count ?? prev.universityCount,
      courseCount: courseRes.count ?? prev.courseCount,
      languageCenterCount: languageRes.count ?? prev.languageCenterCount,
      countryCount: countryRes.count ?? prev.countryCount,
    }));
  };

  useEffect(() => {
    loadStats();

    const channel = supabase
      .channel("homepage-live-stats")
      .on("postgres_changes", { event: "*", schema: "public", table: "universities" }, loadStats)
      .on("postgres_changes", { event: "*", schema: "public", table: "courses" }, loadStats)
      .on("postgres_changes", { event: "*", schema: "public", table: "language_centers" }, loadStats)
      .on("postgres_changes", { event: "*", schema: "public", table: "countries" }, loadStats)
      .subscribe();

    const pollTimer = window.setInterval(loadStats, 30000);

    return () => {
      window.clearInterval(pollTimer);
      supabase.removeChannel(channel);
    };
  }, []);

  const statItems = [
    { icon: GraduationCap, value: stats.universityCount, suffix: "+", label: "Partner Universities", desc: "Live in platform" },
    { icon: BookOpen, value: stats.courseCount, suffix: "+", label: "Courses Available", desc: "Updated in real time" },
    { icon: Languages, value: stats.languageCenterCount, suffix: "+", label: "Language Centers", desc: "English and Malay prep" },
    { icon: Users, value: stats.countryCount, suffix: "+", label: "Countries Supported", desc: "Active destinations" },
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(220,60%,14%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--secondary)/0.08)_0%,transparent_70%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {statItems.map((s, i) => (
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
