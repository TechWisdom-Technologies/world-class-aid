import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { useTableData } from "@/hooks/useSupabaseData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Loader2 } from "lucide-react";

export default function Scholarships() {
  const { data: scholarships = [], isLoading: loadingS } = useTableData("scholarships");
  const { data: universities = [] } = useTableData("universities");

  return (
    <div className="min-h-screen flex flex-col">
      <MegaMenu />
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">Scholarships</Badge>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">Scholarship Opportunities</h1>
          <p className="text-primary-foreground/70 max-w-xl mx-auto">Explore merit-based and need-based scholarships across Malaysian universities.</p>
        </div>
      </section>

      <main className="flex-1 container mx-auto px-4 py-10">
        {loadingS ? (
          <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
        ) : scholarships.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No scholarships yet. Add some from the admin panel!</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {scholarships.map((s: any) => {
              const uni = universities.find((u: any) => u.id === s.university_id);
              return (
                <Card key={s.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-secondary" />
                      <h3 className="font-bold">{s.name}</h3>
                    </div>
                    {uni && <p className="text-sm text-muted-foreground">{uni.name}</p>}
                    <Badge variant="secondary">{s.coverage_amount}</Badge>
                    <p className="text-sm text-muted-foreground">{s.criteria}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </main>
      <PublicFooter />
    </div>
  );
}
