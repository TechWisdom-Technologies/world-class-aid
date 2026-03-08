import { Link } from "react-router-dom";
import { GraduationCap, Search, Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navLinks = [
  { label: "Universities", href: "#universities" },
  { label: "Courses", href: "#courses" },
  { label: "Language Centers", href: "#language" },
  { label: "About", href: "#about" },
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
            <a key={l.label} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Globe className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Search className="h-4 w-4" />
          </Button>
          <Link to="/admin">
            <Button variant="outline" size="sm" className="hidden md:inline-flex">Admin</Button>
          </Link>
          <Link to="/partner-dashboard">
            <Button size="sm" className="hidden md:inline-flex">Partner Portal</Button>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="block text-sm font-medium text-muted-foreground" onClick={() => setMobileOpen(false)}>
              {l.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <Link to="/admin"><Button variant="outline" size="sm">Admin</Button></Link>
            <Link to="/partner-dashboard"><Button size="sm">Partner Portal</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}
