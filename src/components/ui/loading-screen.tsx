import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingScreenProps {
  label?: string;
  sublabel?: string;
  fullScreen?: boolean;
  overlay?: boolean;
  className?: string;
}

export function LoadingScreen({
  label = "Loading...",
  sublabel = "Preparing your experience",
  fullScreen = false,
  overlay = false,
  className,
}: LoadingScreenProps) {
  const containerClass = overlay
    ? "fixed inset-0 z-[90] bg-background/80 backdrop-blur-sm"
    : fullScreen
      ? "min-h-screen"
      : "w-full";

  return (
    <div className={cn(containerClass, "flex items-center justify-center", className)}>
      <div className="relative flex flex-col items-center text-center px-6 py-8">
        <div className="absolute -inset-8 bg-secondary/10 blur-3xl rounded-full animate-pulse" />

        <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-foreground flex items-center justify-center shadow-lg">
          <Sparkles className="h-7 w-7 animate-pulse" />
        </div>

        <h3 className="relative mt-5 text-lg font-semibold text-foreground">{label}</h3>
        <p className="relative mt-1 text-sm text-muted-foreground">{sublabel}</p>

        <div className="relative mt-4 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
          <span className="h-2 w-2 rounded-full bg-secondary animate-bounce [animation-delay:-0.15s]" />
          <span className="h-2 w-2 rounded-full bg-primary animate-bounce" />
        </div>
      </div>
    </div>
  );
}
