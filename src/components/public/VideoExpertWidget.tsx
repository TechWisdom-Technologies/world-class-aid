import { useState } from "react";
import { Video, X, Calendar, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export function VideoExpertWidget() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Booking Requested!", description: "We'll send you a Zoom link within 24 hours." });
    setOpen(false);
  };

  return (
    <>
      {/* Floating Video Bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-20 left-6 z-40 group"
        >
          <div className="relative">
            <div className="h-16 w-16 rounded-full overflow-hidden border-3 border-secondary shadow-lg group-hover:scale-110 transition-transform">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop"
                alt="Expert counselor"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-success flex items-center justify-center animate-pulse-soft">
              <Video className="h-2.5 w-2.5 text-success-foreground" />
            </div>
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground text-background text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              Ask an Expert
            </div>
          </div>
        </button>
      )}

      {/* Expanded Form */}
      {open && (
        <div className="fixed bottom-6 left-6 z-50 animate-scale-in">
          <Card className="w-80 shadow-2xl">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <Video className="h-4 w-4 text-secondary" />
                  Book a 1-on-1 Call
                </CardTitle>
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Get free expert advice via Zoom</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input placeholder="Your name" required />
                <Input type="email" placeholder="Email address" required />
                <Input type="tel" placeholder="Phone (optional)" />
                <Textarea placeholder="What would you like to discuss?" className="min-h-[60px]" />
                <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Calendar className="h-4 w-4 mr-2" /> Request a Call
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
