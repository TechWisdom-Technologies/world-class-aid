import { useParams, Link } from "react-router-dom";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { courses, universities, countries } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {
  CheckCircle, Clock, GraduationCap, MapPin, DollarSign,
  CalendarDays, FileText, Download, Briefcase, BookOpen
} from "lucide-react";

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === Number(courseId));
  const uni = course ? universities.find((u) => u.id === course.university_id) : null;
  const country = uni ? countries.find((c) => c.id === uni.country_id) : null;

  if (!course || !uni) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <MegaMenu />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">404 — Course Not Found</h1>
            <p className="text-muted-foreground">The course you're looking for doesn't exist or has been removed.</p>
            <Link to="/courses">
              <Button>Browse All Courses</Button>
            </Link>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const nextIntake = course.intake_months[0] ? `${course.intake_months[0]} 2026` : "TBA";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MegaMenu />

      {/* Hero Banner */}
      <div className="bg-primary text-primary-foreground py-10 md:py-14">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-5">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/courses" className="text-primary-foreground/60 hover:text-primary-foreground">Courses</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem><BreadcrumbPage className="text-primary-foreground">{course.title}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-lg bg-primary-foreground/10 overflow-hidden shrink-0 hidden sm:block">
              <img src={uni.logo_url} alt={uni.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">{course.title}</h1>
              <p className="text-primary-foreground/70 mt-1 text-sm md:text-base">{uni.name}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary" className="bg-secondary/20 text-secondary border-0">
                  <GraduationCap className="h-3 w-3 mr-1" /> {course.degree_level}
                </Badge>
                <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                  <Clock className="h-3 w-3 mr-1" /> {course.duration}
                </Badge>
                <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                  <MapPin className="h-3 w-3 mr-1" /> {uni.city}, {country?.name}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 min-w-0">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0 gap-0">
                <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-5 py-3">Overview</TabsTrigger>
                <TabsTrigger value="curriculum" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-5 py-3">Curriculum</TabsTrigger>
                <TabsTrigger value="careers" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-5 py-3">Career Outcomes</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6 space-y-8">
                {course.overview && (
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-3">About This Program</h2>
                    <p className="text-muted-foreground leading-relaxed">{course.overview}</p>
                  </div>
                )}
                {course.curriculum && course.curriculum.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold text-foreground mb-4">What You Will Learn</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {course.curriculum.flatMap((y) => y.modules).slice(0, 8).map((mod, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="h-4 w-4 text-[hsl(var(--success))] mt-0.5 shrink-0" />
                          <span className="text-sm text-foreground">{mod}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="curriculum" className="mt-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Program Structure</h2>
                {course.curriculum && course.curriculum.length > 0 ? (
                  <Accordion type="multiple" defaultValue={[course.curriculum[0].year]} className="space-y-2">
                    {course.curriculum.map((cy) => (
                      <AccordionItem key={cy.year} value={cy.year} className="border rounded-lg px-4">
                        <AccordionTrigger className="text-sm font-semibold hover:no-underline">{cy.year} Core Modules</AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 pb-2">
                            {cy.modules.map((mod, i) => (
                              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                <FileText className="h-3.5 w-3.5 text-primary shrink-0" />
                                {mod}
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <p className="text-muted-foreground">Curriculum details coming soon.</p>
                )}
              </TabsContent>

              <TabsContent value="careers" className="mt-6">
                <h2 className="text-xl font-bold text-foreground mb-4">Where This Degree Takes You</h2>
                {course.careerOutcomes && course.careerOutcomes.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {course.careerOutcomes.map((role, i) => (
                      <Card key={i} className="hover:shadow-md transition-shadow">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center shrink-0">
                            <Briefcase className="h-4 w-4 text-accent-foreground" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{role}</span>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Career outcomes data coming soon.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sticky Sidebar */}
          <aside className="lg:w-[340px] shrink-0">
            <div className="lg:sticky lg:top-6">
              <Card className="shadow-lg border-2 border-border">
                <CardContent className="p-6 space-y-5">
                  <h3 className="font-bold text-foreground text-lg">Key Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-secondary/15 flex items-center justify-center shrink-0">
                        <DollarSign className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Tuition Fee</p>
                        <p className="text-sm font-semibold text-foreground">USD {course.tuition_fee.toLocaleString()} / year</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-secondary/15 flex items-center justify-center shrink-0">
                        <CalendarDays className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Next Intake</p>
                        <p className="text-sm font-semibold text-foreground">{nextIntake}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-secondary/15 flex items-center justify-center shrink-0">
                        <Clock className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Duration</p>
                        <p className="text-sm font-semibold text-foreground">{course.duration} Full-Time</p>
                      </div>
                    </div>

                    {course.entryRequirements && (
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-secondary/15 flex items-center justify-center shrink-0">
                          <GraduationCap className="h-4 w-4 text-secondary" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Entry Requirements</p>
                          <p className="text-sm font-semibold text-foreground">IELTS {course.entryRequirements.ielts}, Min GPA {course.entryRequirements.gpa}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 space-y-3">
                    <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 text-base font-bold">
                      Apply Now
                    </Button>
                    <Button variant="outline" className="w-full h-10">
                      <Download className="h-4 w-4 mr-2" /> Download Syllabus (PDF)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>

      <PublicFooter />
    </div>
  );
}
