import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { universities, courses } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MapPin, Trophy, Download, Users, Globe, CalendarDays, Landmark,
  BookOpen, FlaskConical, Sparkles, ArrowRight, CheckCircle, Building,
  GraduationCap, HelpCircle, Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sectionIds = ["about", "study", "courses", "steps", "faq"] as const;
const sectionLabels = { about: "About", study: "Why Study Here", courses: "Courses & Fees", steps: "How to Apply", faq: "FAQ" };

export default function UniversityDetail() {
  const { universityId } = useParams();
  const uni = universities.find((u) => u.id === Number(universityId));
  const countryName = "Malaysia";
  const uniCourses = courses.filter((c) => c.university_id === Number(universityId));
  const similarUnis = uni ? universities.filter((u) => u.country_id === uni.country_id && u.id !== uni.id).slice(0, 3) : [];
  const { toast } = useToast();
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "", course: "" });

  if (!uni) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <MegaMenu />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Building className="h-16 w-16 text-muted-foreground mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">404 — University Not Found</h1>
            <p className="text-muted-foreground">The university you're looking for doesn't exist.</p>
            <Link to="/universities"><Button>Browse All Universities</Button></Link>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Application Started!", description: "Our counselor will contact you within 24 hours." });
    setLeadForm({ name: "", email: "", phone: "", course: "" });
  };

  const studyIcons = [BookOpen, FlaskConical, Sparkles, Users, Globe, GraduationCap];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MegaMenu />

      {/* HERO */}
      <section className="relative h-[420px] md:h-[480px] overflow-hidden">
        <img src={uni.heroImage || uni.logo_url} alt={uni.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--primary))]/95 via-[hsl(var(--primary))]/60 to-[hsl(var(--primary))]/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 text-center">
            <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-primary-foreground/20">
              <AvatarImage src={uni.logo_url} alt={uni.name} />
              <AvatarFallback className="text-xl font-bold">{uni.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary-foreground mb-2">{uni.name}</h1>
            <div className="flex items-center justify-center gap-3 text-primary-foreground/80 text-sm mb-4">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {uni.city}, Malaysia</span>
              <Badge className="bg-secondary text-secondary-foreground"><Trophy className="h-3 w-3 mr-1" /> #{uni.ranking} World</Badge>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold">Apply Now</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Start Your Application at {uni.name}</DialogTitle></DialogHeader>
                  <form onSubmit={handleLeadSubmit} className="space-y-4 pt-2">
                    <Input placeholder="Full Name" value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} required />
                    <Input type="email" placeholder="Email Address" value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} required />
                    <Input placeholder="Phone Number" value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })} required />
                    <Input placeholder="Desired Course" value={leadForm.course} onChange={(e) => setLeadForm({ ...leadForm, course: e.target.value })} />
                    <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"><Send className="h-4 w-4 mr-2" /> Submit Application</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Download className="h-4 w-4 mr-2" /> Download Prospectus
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Section Nav */}
      <nav className="sticky top-0 z-30 bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 flex items-center gap-1 overflow-x-auto py-2">
          {sectionIds.map((id) => (
            <Button key={id} variant="ghost" size="sm" className="text-xs shrink-0" onClick={() => scrollTo(id)}>
              {sectionLabels[id]}
            </Button>
          ))}
        </div>
      </nav>

      {/* ABOUT */}
      <section id="about" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="lg:w-3/5">
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-4">About {uni.name}</h2>
              <p className="text-muted-foreground leading-relaxed text-base">{uni.aboutText || uni.description}</p>
            </div>
            <div className="lg:w-2/5">
              <div className="grid grid-cols-2 gap-4">
                <Card className="text-center">
                  <CardContent className="p-5">
                    <Users className="h-6 w-6 text-secondary mx-auto mb-2" />
                    <p className="text-xl font-bold text-foreground">{(uni.totalStudents || 10000).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">Total Students</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-5">
                    <Globe className="h-6 w-6 text-secondary mx-auto mb-2" />
                    <p className="text-xl font-bold text-foreground">{uni.internationalRatio || 20}%</p>
                    <p className="text-xs text-muted-foreground">International Ratio</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-5">
                    <CalendarDays className="h-6 w-6 text-secondary mx-auto mb-2" />
                    <p className="text-xl font-bold text-foreground">{uni.established || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">Established</p>
                  </CardContent>
                </Card>
                <Card className="text-center">
                  <CardContent className="p-5">
                    <Landmark className="h-6 w-6 text-secondary mx-auto mb-2" />
                    <p className="text-xl font-bold text-foreground">{uni.campusSize || "N/A"}</p>
                    <p className="text-xs text-muted-foreground">Campus Size</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STUDY REASONS */}
      {uni.studyReasons && uni.studyReasons.length > 0 && (
        <section id="study" className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2 text-center">Why Study at {uni.name}?</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">Discover what makes this university a top choice for international students.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {uni.studyReasons.map((reason, i) => {
                const Icon = studyIcons[i % studyIcons.length];
                return (
                  <Card key={i} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="h-10 w-10 rounded-lg bg-secondary/15 flex items-center justify-center mb-3">
                        <Icon className="h-5 w-5 text-secondary" />
                      </div>
                      <p className="text-sm font-medium text-foreground">{reason}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* COURSES TABLE */}
      <section id="courses" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2">Courses & Fees for International Students</h2>
          <p className="text-muted-foreground mb-8">{uniCourses.length} programs available at {uni.name}</p>
          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Course Name</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Next Intake</TableHead>
                    <TableHead>Tuition/Year</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uniCourses.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>
                        <Link to={`/courses/${c.id}`} className="font-medium text-foreground hover:text-primary transition-colors">{c.title}</Link>
                      </TableCell>
                      <TableCell><Badge variant="outline">{c.degree_level}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{c.duration}</TableCell>
                      <TableCell className="text-muted-foreground">{c.intake_months[0]} 2026</TableCell>
                      <TableCell className="font-semibold text-secondary">${c.tuition_fee.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Link to={`/courses/${c.id}`}>
                          <Button size="sm" variant="outline" className="text-xs">Apply <ArrowRight className="h-3 w-3 ml-1" /></Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                  {uniCourses.length === 0 && (
                    <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No courses listed yet.</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* REGISTRATION STEPS */}
      {uni.registrationSteps && uni.registrationSteps.length > 0 && (
        <section id="steps" className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-2 text-center">Registration Steps at {uni.name}</h2>
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">Follow these simple steps to secure your place.</p>
            <div className="max-w-2xl mx-auto">
              {uni.registrationSteps.map((step, i) => (
                <div key={i} className="flex gap-4 mb-0">
                  <div className="flex flex-col items-center">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                    {i < uni.registrationSteps!.length - 1 && <div className="w-0.5 flex-1 bg-border my-1" />}
                  </div>
                  <div className="pb-8">
                    <p className="text-sm font-medium text-foreground pt-2.5">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {uni.faqs && uni.faqs.length > 0 && (
        <section id="faq" className="py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex items-center gap-2 justify-center mb-8">
              <HelpCircle className="h-6 w-6 text-secondary" />
              <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">Frequently Asked Questions</h2>
            </div>
            <Accordion type="single" collapsible className="space-y-2">
              {uni.faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-semibold hover:no-underline text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-sm leading-relaxed">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      )}

      {/* BOTTOM CTA */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-secondary-foreground mb-3">Register Now & Secure Your Spot!</h2>
          <p className="text-secondary-foreground/80 max-w-xl mx-auto mb-8">Don't miss the upcoming intake. Our expert counselors are ready to guide you step-by-step for free.</p>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-10 h-14">
                Start Your Application
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Apply to {uni.name}</DialogTitle></DialogHeader>
              <form onSubmit={handleLeadSubmit} className="space-y-4 pt-2">
                <Input placeholder="Full Name" value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} required />
                <Input type="email" placeholder="Email Address" value={leadForm.email} onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })} required />
                <Input placeholder="Phone Number" value={leadForm.phone} onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })} required />
                <Input placeholder="Desired Course" value={leadForm.course} onChange={(e) => setLeadForm({ ...leadForm, course: e.target.value })} />
                <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"><Send className="h-4 w-4 mr-2" /> Submit Application</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>

      {/* SIMILAR UNIVERSITIES */}
      {similarUnis.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-8 text-center">Similar Universities in Malaysia</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarUnis.map((su) => (
                  <Link key={su.id} to={`/universities/${su.id}`}>
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="h-36 bg-muted overflow-hidden">
                          <img src={su.heroImage || su.logo_url} alt={su.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-4 space-y-2">
                          <h3 className="font-bold text-sm leading-tight">{su.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" /> {su.city}, Malaysia
                          </div>
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs"><Trophy className="h-3 w-3 mr-1" /> #{su.ranking}</Badge>
                            <span className="text-xs font-semibold text-secondary flex items-center gap-1 group-hover:gap-2 transition-all">
                              Explore <ArrowRight className="h-3 w-3" />
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <PublicFooter />
    </div>
  );
}
