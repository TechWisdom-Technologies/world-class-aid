import { useEffect, useState } from "react";
import { GraduationCap, BookOpen, Languages } from "lucide-react";

const stats = [
  { icon: GraduationCap, value: 50, suffix: "+", label: "Universities" },
  { icon: BookOpen, value: 500, suffix: "+", label: "Courses" },
  { icon: Languages, value: 30, suffix: "+", label: "English Centers" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
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
    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}{suffix}</span>;
}

export function StatsBanner() {
  return (
    <section className="bg-secondary py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center text-secondary-foreground">
              <s.icon className="h-10 w-10 mb-3 opacity-90" />
              <div className="text-4xl font-extrabold">
                <AnimatedCounter target={s.value} suffix={s.suffix} />
              </div>
              <p className="text-lg font-medium opacity-90 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
