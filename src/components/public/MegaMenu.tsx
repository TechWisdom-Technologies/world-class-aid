import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap, Menu, ChevronDown, LogOut, LayoutDashboard, ShieldCheck, Phone,
  Calculator, RefreshCw, Sparkles, ChevronRight, MapPin, Home, Award, GitCompare,
  BookOpen, FileText, Calendar, Building2, Languages, PenTool,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const cityLinks = [
  { label: "Kuala Lumpur", to: "/destinations/malaysia/kuala-lumpur" },
  { label: "Cyberjaya", to: "/destinations/malaysia/cyberjaya" },
  { label: "Penang", to: "/destinations/malaysia/penang" },
];

const resourceToolsLinks = [
  { label: "AI Eligibility Test", to: "/eligibility", icon: Sparkles },
  { label: "Compare Universities", to: "/compare", icon: GitCompare },
  { label: "Cost Calculator", to: "/tools/calculator", icon: Calculator },
  { label: "GPA Converter", to: "/tools/gpa-converter", icon: RefreshCw },
  { label: "Scholarships", to: "/scholarships", icon: Award },
  { label: "Visa Guide", to: "/visa-guide", icon: FileText },
  { label: "Events & Webinars", to: "/events", icon: Calendar },
  { label: "Blog", to: "/blog", icon: PenTool },
];

export function MegaMenu() {
  const { user, hasRole, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [consultOpen, setConsultOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate("/");
    toast({ title: "Signed out successfully" });
  };

  const handleConsult = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultOpen(false);
    toast({ title: "Request submitted!", description: "A counselor will contact you within 24 hours." });
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <GraduationCap className="h-7 w-7 text-secondary" />
          <span className="text-xl font-extrabold tracking-tight">
            <span className="text-primary">Your</span>
            <span className="text-secondary">Uni</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link to="/">
            <Button variant="ghost" size="sm" className="text-sm font-medium gap-1.5">
              <Home className="h-3.5 w-3.5" /> Home
            </Button>
          </Link>

          {/* Destinations Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium bg-transparent hover:bg-accent">
                  Destinations
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[420px] p-4">
                    <Link
                      to="/destinations/malaysia"
                      className="flex items-center gap-3 rounded-lg p-3 hover:bg-accent transition-colors mb-2"
                    >
                      <span className="text-2xl">🇲🇾</span>
                      <div>
                        <p className="text-sm font-bold text-foreground">Malaysia</p>
                        <p className="text-xs text-muted-foreground">Your gateway to world-class, affordable education</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground ml-auto" />
                    </Link>
                    <div className="border-t pt-2 mt-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">
                        Top Student Cities
                      </p>
                      {cityLinks.map((c) => (
                        <Link
                          key={c.to}
                          to={c.to}
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                        >
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link to="/universities">
            <Button variant="ghost" size="sm" className="text-sm font-medium">Universities</Button>
          </Link>

          <Link to="/courses">
            <Button variant="ghost" size="sm" className="text-sm font-medium">Courses</Button>
          </Link>

          <Link to="/language-centers">
            <Button variant="ghost" size="sm" className="text-sm font-medium gap-1.5">
              <Languages className="h-3.5 w-3.5" /> Language Centers
            </Button>
          </Link>

          {/* Accommodations */}
          <Link to="/housing">
            <Button variant="ghost" size="sm" className="text-sm font-medium gap-1.5">
              <Building2 className="h-3.5 w-3.5" /> Accommodations
            </Button>
          </Link>

          {/* Resources & Tools Dropdown */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium bg-transparent hover:bg-accent">
                  Resources & Tools
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[520px] grid-cols-5 p-4 gap-4">
                    <div className="col-span-2 rounded-lg bg-secondary/10 p-5 flex flex-col justify-between">
                      <div>
                        <Sparkles className="h-8 w-8 text-secondary mb-3" />
                        <p className="font-bold text-base text-foreground leading-tight">AI Eligibility Matcher</p>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                          Find your acceptance chances at top Malaysian universities in 60 seconds.
                        </p>
                      </div>
                      <Link to="/eligibility" className="mt-4 inline-flex items-center text-xs font-semibold text-secondary hover:underline">
                        Try it Now <ChevronRight className="h-3 w-3 ml-0.5" />
                      </Link>
                    </div>
                    <div className="col-span-3 space-y-0.5">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 pb-2">
                        Tools & Resources
                      </p>
                      {resourceToolsLinks.map((item) => (
                        <Link
                          key={item.to}
                          to={item.to}
                          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
                        >
                          <item.icon className="h-4 w-4 text-muted-foreground" />
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-2">
          <Link to="/partner">
            <Button variant="ghost" size="sm" className="text-sm font-medium">For Agencies</Button>
          </Link>

          {!user && (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">Log In</Button>
              </Link>
              <Dialog open={consultOpen} onOpenChange={setConsultOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                    <Phone className="h-3.5 w-3.5 mr-1.5" /> Free Consultation
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Book a Free Consultation</DialogTitle></DialogHeader>
                  <form onSubmit={handleConsult} className="space-y-4 pt-2">
                    <Input placeholder="Your Name" required />
                    <Input type="email" placeholder="Email Address" required />
                    <Input placeholder="Phone Number" required />
                    <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">Submit Request</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </>
          )}
          {user && !hasRole("admin") && !hasRole("partner") && (
            <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5">
              <LogOut className="h-3.5 w-3.5" /> Log Out
            </Button>
          )}
          {hasRole("admin") && (
            <>
              <Link to="/admin">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" /> Admin Panel
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5">
                <LogOut className="h-3.5 w-3.5" /> Log Out
              </Button>
            </>
          )}
          {hasRole("partner") && (
            <>
              <Link to="/partner-dashboard">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <LayoutDashboard className="h-3.5 w-3.5" /> Partner Dashboard
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-1.5">
                <LogOut className="h-3.5 w-3.5" /> Log Out
              </Button>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] p-0">
            <div className="flex flex-col h-full">
              <div className="p-4 border-b">
                <Link to="/" className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-secondary" />
                  <span className="text-lg font-extrabold">
                    <span className="text-primary">Your</span>
                    <span className="text-secondary">Uni</span>
                  </span>
                </Link>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                <MobileNavLink to="/">Home</MobileNavLink>

                {/* Destinations collapsible */}
                <div className="pt-3 pb-1">
                  <Collapsible>
                    <CollapsibleTrigger className="flex w-full items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2 hover:text-foreground transition-colors">
                      Destinations
                      <ChevronDown className="h-3.5 w-3.5" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-0.5">
                      <MobileNavLink to="/destinations/malaysia">
                        <span className="flex items-center gap-2">🇲🇾 Malaysia Overview</span>
                      </MobileNavLink>
                      {cityLinks.map((c) => (
                        <MobileNavLink key={c.to} to={c.to}>
                          <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-muted-foreground" /> {c.label}</span>
                        </MobileNavLink>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                <MobileNavLink to="/universities">Universities</MobileNavLink>
                <MobileNavLink to="/courses">Courses</MobileNavLink>
                <MobileNavLink to="/language-centers">
                  <span className="flex items-center gap-2"><Languages className="h-4 w-4 text-muted-foreground" /> Language Centers</span>
                </MobileNavLink>
                <MobileNavLink to="/housing">
                  <span className="flex items-center gap-2"><Building2 className="h-4 w-4 text-muted-foreground" /> Accommodations</span>
                </MobileNavLink>

                {/* Resources & Tools collapsible */}
                <div className="pt-3 pb-1">
                  <Collapsible>
                    <CollapsibleTrigger className="flex w-full items-center justify-between text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2 hover:text-foreground transition-colors">
                      Resources & Tools
                      <ChevronDown className="h-3.5 w-3.5" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="space-y-0.5">
                      {resourceToolsLinks.map((item) => (
                        <MobileNavLink key={item.to} to={item.to}>
                          <span className="flex items-center gap-2"><item.icon className="h-4 w-4 text-muted-foreground" /> {item.label}</span>
                        </MobileNavLink>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                </div>

                <MobileNavLink to="/partner">For Agencies</MobileNavLink>
              </nav>

              {/* Mobile Auth Footer */}
              <div className="p-4 border-t space-y-2">
                {!user && (
                  <>
                    <SheetClose asChild>
                      <Link to="/login" className="block">
                        <Button variant="outline" className="w-full">Log In</Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/eligibility" className="block">
                        <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">Free Consultation</Button>
                      </Link>
                    </SheetClose>
                  </>
                )}
                {user?.role === "admin" && (
                  <>
                    <SheetClose asChild>
                      <Link to="/admin" className="block">
                        <Button variant="outline" className="w-full gap-1.5"><ShieldCheck className="h-4 w-4" /> Admin Panel</Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full gap-1.5" onClick={handleLogout}><LogOut className="h-4 w-4" /> Log Out</Button>
                    </SheetClose>
                  </>
                )}
                {user?.role === "partner" && (
                  <>
                    <SheetClose asChild>
                      <Link to="/partner-dashboard" className="block">
                        <Button variant="outline" className="w-full gap-1.5"><LayoutDashboard className="h-4 w-4" /> Partner Dashboard</Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full gap-1.5" onClick={handleLogout}><LogOut className="h-4 w-4" /> Log Out</Button>
                    </SheetClose>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MobileNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <SheetClose asChild>
      <Link to={to} className="block rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">
        {children}
      </Link>
    </SheetClose>
  );
}
