import { useState } from "react";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { events, universities } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Clock, Users, Video, BookOpen, Presentation } from "lucide-react";
import { toast } from "sonner";

const typeIcons: Record<string, typeof Video> = {
  "Open Day": Video,
  Workshop: BookOpen,
  Webinar: Presentation,
  "Info Session": Users,
};

const typeColors: Record<string, string> = {
  "Open Day": "bg-secondary/10 text-secondary",
  Workshop: "bg-success/10 text-success",
  Webinar: "bg-primary/10 text-primary",
  "Info Session": "bg-warning/10 text-warning",
};

export default function Events() {
  const [regEvent, setRegEvent] = useState<typeof events[0] | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");

  const handleRegister = () => {
    if (!name || !email) return;
    toast.success("Registration confirmed!", {
      description: `You're registered for "${regEvent?.title}". Check your email for details.`,
    });
    setRegEvent(null);
    setName("");
    setEmail("");
    setLevel("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1 bg-muted/30">
        <div className="bg-primary text-primary-foreground py-12 text-center">
          <Calendar className="h-12 w-12 mx-auto mb-3 text-secondary" />
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Events & Webinars</h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">Join our virtual open days, workshops, and webinars to learn more about studying abroad</p>
        </div>

        <div className="container mx-auto px-4 py-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, i) => {
              const Icon = typeIcons[event.type] || Calendar;
              const eventUnis = event.university_ids.map((id) => universities.find((u) => u.id === id)).filter(Boolean);
              return (
                <Card key={event.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in overflow-hidden" style={{ animationDelay: `${i * 80}ms` }}>
                  <div className="h-2 bg-gradient-to-r from-primary to-secondary" />
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant="outline" className={typeColors[event.type]}>
                        <Icon className="h-3 w-3 mr-1" /> {event.type}
                      </Badge>
                      <Badge variant="outline" className="text-muted-foreground">
                        <Users className="h-3 w-3 mr-1" /> {event.spots_left} spots
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-secondary transition-colors">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{event.description}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 text-secondary" />
                        {new Date(event.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3.5 w-3.5 text-secondary" /> {event.time}
                      </div>
                    </div>

                    {eventUnis.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {eventUnis.map((u) => (
                          <Badge key={u!.id} variant="secondary" className="text-xs">{u!.name}</Badge>
                        ))}
                      </div>
                    )}

                    <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors" onClick={() => setRegEvent(event)}>
                      Register for Free
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Registration Modal */}
        <Dialog open={!!regEvent} onOpenChange={(o) => !o && setRegEvent(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Register for Event</DialogTitle>
            </DialogHeader>
            {regEvent && (
              <div className="space-y-4 pt-2">
                <div className="bg-muted/50 rounded-xl p-4">
                  <h3 className="font-bold text-sm">{regEvent.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(regEvent.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })} • {regEvent.time}
                  </p>
                </div>
                <div>
                  <Label>Full Name</Label>
                  <Input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                  <Label>Desired Study Level</Label>
                  <Select value={level} onValueChange={setLevel}>
                    <SelectTrigger><SelectValue placeholder="Select level..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diploma">Diploma</SelectItem>
                      <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                      <SelectItem value="master">Master's Degree</SelectItem>
                      <SelectItem value="phd">PhD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" onClick={handleRegister} disabled={!name || !email}>
                  Confirm Registration
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </main>
      <PublicFooter />
    </div>
  );
}
