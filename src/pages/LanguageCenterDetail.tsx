import { useParams, Link } from "react-router-dom";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { languageCenters } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { CheckCircle, Clock, DollarSign, MapPin, CalendarDays, GraduationCap, Languages, Download } from "lucide-react";

export default function LanguageCenterDetail() {
  const { id } = useParams();
  const lc = languageCenters.find((l) => l.id === Number(id));

  if (!lc) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <MegaMenu />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Languages className="h-16 w-16 text-muted-foreground mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">Program Not Found</h1>
            <Link to="/language-centers"><Button>Browse All Programs</Button></Link>
          </div>
        </div>
        <PublicFooter />
      </div>
    );
  }

  const nextIntake = lc.intakeMonths?.[0] ? `${lc.intakeMonths[0]} 2026` : "TBA";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MegaMenu />

      {/* Hero */}
      <div className="bg-primary text-primary-foreground py-10 md:py-14">
        <div className="container mx-auto px-4">
          <Breadcrumb className="mb-5">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/" className="text-primary-foreground/60 hover:text-primary-foreground">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/language-centers" className="text-primary-foreground/60 hover:text-primary-foreground">Language Centers</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator className="text-primary-foreground/40" />
              <BreadcrumbItem><BreadcrumbPage className="text-primary-foreground">{lc.name}</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-start gap-4">
            <div className="h-14 w-14 rounded-lg bg-primary-foreground/10 flex items-center justify-center shrink-0 hidden sm:flex">
              <Languages className="h-7 w-7 text-secondary" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight">{lc.name}</h1>
              <p className="text-primary-foreground/70 mt-1">{lc.institute}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="secondary" className="bg-secondary/20 text-secondary border-0">
                  <GraduationCap className="h-3 w-3 mr-1" /> {lc.level}
                </Badge>
                <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                  <Clock className="h-3 w-3 mr-1" /> {lc.duration}
                </Badge>
                <Badge variant="outline" className="border-primary-foreground/30 text-primary-foreground">
                  <MapPin className="h-3 w-3 mr-1" /> {lc.city}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left */}
          <div className="flex-1 min-w-0 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-3">About This Program</h2>
              <p className="text-muted-foreground leading-relaxed">{lc.overview}</p>
            </div>

            {lc.curriculum && lc.curriculum.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-foreground mb-4">What You Will Learn</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {lc.curriculum.map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sticky */}
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
                        <p className="text-sm font-semibold text-foreground">MYR {lc.tuitionFee.toLocaleString()}</p>
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
                        <p className="text-sm font-semibold text-foreground">{lc.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-secondary/15 flex items-center justify-center shrink-0">
                        <GraduationCap className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Level</p>
                        <p className="text-sm font-semibold text-foreground">{lc.level}</p>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 space-y-3">
                    <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 h-12 text-base font-bold">Apply Now</Button>
                    <Button variant="outline" className="w-full h-10">
                      <Download className="h-4 w-4 mr-2" /> Download Brochure (PDF)
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
