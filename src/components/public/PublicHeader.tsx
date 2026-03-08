import { Link } from "react-router-dom";
import { GraduationCap, Search, Globe, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navLinks = [
  { label: "Universities", href: "/countries" },
  { label: "Eligibility Test", href: "/eligibility" },
  { label: "Cost Calculator", href: "/cost-calculator" },
  { label: "Partner With Us", href: "/b2b" },
];

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <GraduationCap className="h-8 w-8 text-secondary" />
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-primary">Your</span>
            <span className="text-secondary">Uni</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <Link key={l.label} to={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to="/admin">
            <Button variant="outline" size="sm" className="hidden md:inline-flex">Admin</Button>
          </Link>
          <Link to="/partner-dashboard">
            <Button size="sm" className="hidden md:inline-flex bg-secondary text-secondary-foreground hover:bg-secondary/90">Partner Portal</Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          {navLinks.map((l) => (
            <Link key={l.label} to={l.href} className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Link to="/admin"><Button variant="outline" size="sm">Admin</Button></Link>
            <Link to="/partner-dashboard"><Button size="sm" className="bg-secondary text-secondary-foreground">Partner Portal</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}
