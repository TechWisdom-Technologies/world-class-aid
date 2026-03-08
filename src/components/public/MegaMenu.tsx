import { Link } from "react-router-dom";
import { GraduationCap, Search, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useState } from "react";
import { countries } from "@/data/mockData";
import { cn } from "@/lib/utils";

const destinations = countries.map((c) => ({
  flag: c.flag_icon,
  name: c.name,
  href: `/country/${c.id}`,
  desc: `Explore universities in ${c.name}`,
}));

const degrees = [
  { title: "Foundation", href: "/countries", desc: "Pre-university pathways" },
  { title: "Bachelor's", href: "/countries", desc: "Undergraduate degrees" },
  { title: "Master's", href: "/countries", desc: "Postgraduate programmes" },
  { title: "PhD", href: "/countries", desc: "Doctoral research" },
];

const topMajors = [
  "Computer Science", "Business", "Engineering", "Medicine", "Hospitality", "Pharmacy",
];

const services = [
  { title: "Admission Help", href: "/eligibility", desc: "Get matched with the right university" },
  { title: "Visa Processing", href: "/visa-guide", desc: "Step-by-step visa guidance" },
  { title: "Airport Pickup", href: "/countries", desc: "Arrive stress-free" },
  { title: "Accommodation", href: "/housing", desc: "Find your perfect home" },
];

const resourceLinks = [
  { title: "Scholarship Finder", href: "/scholarships" },
  { title: "Events & Webinars", href: "/events" },
  { title: "Student Blog", href: "/" },
  { title: "Cost Calculator", href: "/cost-calculator" },
  { title: "Visa Guide", href: "/visa-guide" },
  { title: "Career Hub", href: "/careers" },
];

export function MegaMenu() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <GraduationCap className="h-8 w-8 text-secondary" />
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-primary">Your</span>
            <span className="text-secondary">Uni</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {/* Study Destinations */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium">Study Destinations</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-1 p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Choose a Country</p>
                  {destinations.map((d) => (
                    <Link key={d.name} to={d.href}>
                      <NavigationMenuLink className={cn("block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent")}>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{d.flag}</span>
                          <div>
                            <div className="text-sm font-semibold">{d.name}</div>
                            <p className="text-xs text-muted-foreground">{d.desc}</p>
                          </div>
                        </div>
                      </NavigationMenuLink>
                    </Link>
                  ))}
                  <Link to="/countries" className="mt-2 text-xs font-medium text-secondary hover:underline px-3">
                    View all destinations →
                  </Link>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Degrees & Courses */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium">Degrees & Courses</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[500px] grid-cols-2 gap-4 p-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Degree Levels</p>
                    {degrees.map((d) => (
                      <Link key={d.title} to={d.href}>
                        <NavigationMenuLink className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent">
                          <div className="text-sm font-semibold">{d.title}</div>
                          <p className="text-xs text-muted-foreground">{d.desc}</p>
                        </NavigationMenuLink>
                      </Link>
                    ))}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Top Majors</p>
                    <div className="flex flex-wrap gap-2">
                      {topMajors.map((m) => (
                        <Link key={m} to="/countries" className="inline-block rounded-full border px-3 py-1.5 text-xs font-medium hover:bg-accent transition-colors">
                          {m}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Our Services */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium">Our Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[400px] gap-1 p-4">
                  {services.map((s) => (
                    <Link key={s.title} to={s.href}>
                      <NavigationMenuLink className="block select-none rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent">
                        <div className="text-sm font-semibold">{s.title}</div>
                        <p className="text-xs text-muted-foreground">{s.desc}</p>
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Resources */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-sm font-medium">Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[280px] gap-1 p-4">
                  {resourceLinks.map((r) => (
                    <Link key={r.title} to={r.href}>
                      <NavigationMenuLink className="block select-none rounded-lg px-3 py-2.5 text-sm font-medium no-underline outline-none transition-colors hover:bg-accent">
                        {r.title}
                      </NavigationMenuLink>
                    </Link>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={() => setSearchOpen(!searchOpen)}>
            <Search className="h-4 w-4" />
          </Button>
          <Link to="/login">
            <Button variant="outline" size="sm" className="hidden lg:inline-flex">Log In</Button>
          </Link>
          <Link to="/eligibility">
            <Button size="sm" className="hidden lg:inline-flex bg-secondary text-secondary-foreground hover:bg-secondary/90">Apply Now</Button>
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="hidden lg:block border-t bg-background animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                autoFocus
                className="w-full rounded-xl border bg-muted/50 pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-secondary/50"
                placeholder="Search universities, courses, or countries..."
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t bg-background p-4 space-y-4 animate-fade-in max-h-[80vh] overflow-y-auto">
          <MobileSection title="Study Destinations">
            {destinations.map((d) => (
              <Link key={d.name} to={d.href} className="flex items-center gap-2 py-2 text-sm" onClick={() => setMobileOpen(false)}>
                <span>{d.flag}</span> {d.name}
              </Link>
            ))}
          </MobileSection>
          <MobileSection title="Degrees">
            {degrees.map((d) => (
              <Link key={d.title} to={d.href} className="block py-2 text-sm" onClick={() => setMobileOpen(false)}>{d.title}</Link>
            ))}
          </MobileSection>
          <MobileSection title="Services">
            {services.map((s) => (
              <Link key={s.title} to={s.href} className="block py-2 text-sm" onClick={() => setMobileOpen(false)}>{s.title}</Link>
            ))}
          </MobileSection>
          <MobileSection title="Resources">
            {resourceLinks.map((r) => (
              <Link key={r.title} to={r.href} className="block py-2 text-sm" onClick={() => setMobileOpen(false)}>{r.title}</Link>
            ))}
          </MobileSection>
          <div className="flex gap-2 pt-2 border-t">
            <Link to="/login" onClick={() => setMobileOpen(false)}><Button variant="outline" size="sm">Log In</Button></Link>
            <Link to="/eligibility" onClick={() => setMobileOpen(false)}><Button size="sm" className="bg-secondary text-secondary-foreground">Apply Now</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b pb-2">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full py-2 text-sm font-semibold">
        {title}
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="pl-2">{children}</div>}
    </div>
  );
}
