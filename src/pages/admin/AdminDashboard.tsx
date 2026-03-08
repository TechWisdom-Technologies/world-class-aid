import { universities, courses, b2bPartners, students } from "@/data/mockData";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, BookOpen, Users, Clock } from "lucide-react";

const stats = [
  { label: "Total Universities", value: universities.length, icon: GraduationCap, color: "text-secondary" },
  { label: "Total Courses", value: courses.length, icon: BookOpen, color: "text-success" },
  { label: "B2B Partners", value: b2bPartners.length, icon: Users, color: "text-warning" },
  { label: "Pending Applications", value: students.filter((s) => s.application_status === "Pending").length, icon: Clock, color: "text-destructive" },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-xl bg-muted flex items-center justify-center ${s.color}`}>
                <s.icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="text-3xl font-extrabold">{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
