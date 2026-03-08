import { useParams, Link } from "react-router-dom";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { VirtualTourSection } from "@/components/public/VirtualTourSection";
import { universities, courses, accommodations, scholarships, countries } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MapPin, Trophy, Star, ArrowLeft, GraduationCap, Home, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UniversityDetail() {
  const { universityId } = useParams();
  const uni = universities.find((u) => u.id === Number(universityId));
  const country = uni ? countries.find((c) => c.id === uni.country_id) : null;
  const uniCourses = courses.filter((c) => c.university_id === Number(universityId));
  const nearbyAccom = accommodations.filter((a) => a.near_university_ids.includes(Number(universityId)));
  const uniScholarships = scholarships.filter((s) => s.university_id === Number(universityId));

  if (!uni) {
    return (
      <div className="min-h-screen flex flex-col">
        <MegaMenu />
        <main className="flex-1 flex items-center justify-center"><p className="text-muted-foreground">University not found.</p></main>
        <PublicFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <MegaMenu />
      <main className="flex-1">
        {/* Hero */}
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img src={uni.logo_url} alt={uni.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 container mx-auto">
            <Link to={country ? `/country/${country.id}` : "/countries"}>
              <Button variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground mb-3">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-primary-foreground">{uni.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-primary-foreground/80 text-sm">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {uni.city}, {country?.name}</span>
              <Badge className="bg-secondary text-secondary-foreground"><Trophy className="h-3 w-3 mr-1" /> #{uni.ranking} World</Badge>
              <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-secondary" /> {uni.global_score}/100</span>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <p className="text-muted-foreground mb-8 max-w-3xl text-lg">{uni.description}</p>

          <Tabs defaultValue="courses">
            <TabsList className="mb-6">
              <TabsTrigger value="courses" className="gap-1.5"><GraduationCap className="h-4 w-4" /> Courses ({uniCourses.length})</TabsTrigger>
              <TabsTrigger value="accommodation" className="gap-1.5"><Home className="h-4 w-4" /> Accommodation ({nearbyAccom.length})</TabsTrigger>
              <TabsTrigger value="scholarships" className="gap-1.5"><Award className="h-4 w-4" /> Scholarships ({uniScholarships.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="courses">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Tuition/Year</TableHead>
                        <TableHead>Intakes</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {uniCourses.map((c) => (
                        <TableRow key={c.id}>
                          <TableCell className="font-medium">{c.title}</TableCell>
                          <TableCell><Badge variant="outline">{c.degree_level}</Badge></TableCell>
                          <TableCell>{c.duration}</TableCell>
                          <TableCell className="font-semibold text-secondary">${c.tuition_fee.toLocaleString()}</TableCell>
                          <TableCell>{c.intake_months.join(", ")}</TableCell>
                        </TableRow>
                      ))}
                      {uniCourses.length === 0 && (
                        <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No courses listed yet.</TableCell></TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accommodation">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {nearbyAccom.map((a) => (
                  <Card key={a.id}>
                    <CardHeader>
                      <CardTitle className="text-base">{a.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline">{a.type}</Badge>
                        <span className="text-lg font-bold text-secondary">${a.price_per_month}<span className="text-xs text-muted-foreground font-normal">/mo</span></span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3"><MapPin className="h-3.5 w-3.5" /> {a.city}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {a.amenities.map((am) => (
                          <Badge key={am} variant="secondary" className="text-xs">{am}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {nearbyAccom.length === 0 && <p className="text-muted-foreground col-span-full text-center py-8">No nearby accommodation listed.</p>}
              </div>
            </TabsContent>

            <TabsContent value="scholarships">
              <div className="grid md:grid-cols-2 gap-6">
                {uniScholarships.map((s) => (
                  <Card key={s.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-bold">{s.name}</h3>
                        <Award className="h-5 w-5 text-secondary flex-shrink-0" />
                      </div>
                      <Badge className="bg-secondary/10 text-secondary border-secondary/20 mb-3">{s.coverage_amount}</Badge>
                      <p className="text-sm text-muted-foreground"><strong>Criteria:</strong> {s.criteria}</p>
                    </CardContent>
                  </Card>
                ))}
                {uniScholarships.length === 0 && <p className="text-muted-foreground col-span-full text-center py-8">No scholarships listed.</p>}
              </div>
            </TabsContent>
          </Tabs>

          {/* Virtual Tour */}
          <VirtualTourSection universityName={uni.name} />
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
