import { Link, useLocation } from "react-router-dom";
import { MegaMenu } from "@/components/public/MegaMenu";
import { PublicFooter } from "@/components/public/PublicFooter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Construction, ArrowLeft } from "lucide-react";

export default function ComingSoon() {
  const { pathname } = useLocation();
  const title = pathname
    .split("/")
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, " ")
    ?.replace(/\b\w/g, (c) => c.toUpperCase()) || "Page";

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <MegaMenu />
      <div className="flex-1 flex items-center justify-center py-20">
        <div className="text-center space-y-5 max-w-md px-4">
          <div className="h-16 w-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto">
            <Construction className="h-8 w-8 text-secondary" />
          </div>
          <h1 className="text-3xl font-extrabold text-foreground">{title}</h1>
          <Badge className="bg-secondary/10 text-secondary text-sm px-4 py-1">Coming Soon</Badge>
          <p className="text-muted-foreground">
            We're building something great. This feature will be available shortly.
          </p>
          <Link to="/">
            <Button variant="outline" className="gap-2 mt-4">
              <ArrowLeft className="h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}
