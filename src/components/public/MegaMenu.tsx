import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Menu, ChevronDown, LogOut, LayoutDashboard, ShieldCheck, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const resourceLinks = [
  { label: "Scholarships", to: "/scholarships" },
  { label: "Accommodation", to: "/housing" },
  { label: "Visa Guide", to: "/visa-guide" },
  { label: "Events & Webinars", to: "/events" },
];

export function MegaMenu() {
  const { user, signOut } = useAuth();
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

        {/* Desktop Center Links */}
        <nav className="hidden lg:flex items-center gap-1">
          <Link to="/universities">
            <Button variant="ghost" size="sm" className="text-sm font-medium">Universities</Button>
          </Link>
          <Link to="/courses">
            <Button variant="ghost" size="sm" className="text-sm font-medium">Courses</Button>
          </Link>

          {/* Resources Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-sm font-medium gap-1">
                Resources <ChevronDown className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              {resourceLinks.map((r) => (
                <DropdownMenuItem key={r.to} asChild>
                  <Link to={r.to} className="w-full cursor-pointer">{r.label}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/b2b">
            <Button variant="ghost" size="sm" className="text-sm font-medium">For Agencies</Button>
          </Link>
        </nav>

        {/* Desktop Right Actions */}
        <div className="hidden lg:flex items-center gap-2">
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
          {user?.role === "admin" && (
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
          {user?.role === "partner" && (
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
              {/* Mobile Header */}
              <div className="p-4 border-b">
                <Link to="/" className="flex items-center gap-2">
                  <GraduationCap className="h-6 w-6 text-secondary" />
                  <span className="text-lg font-extrabold">
                    <span className="text-primary">Your</span>
                    <span className="text-secondary">Uni</span>
                  </span>
                </Link>
              </div>

              {/* Mobile Links */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                <MobileNavLink to="/universities">Universities</MobileNavLink>
                <MobileNavLink to="/courses">Courses</MobileNavLink>

                <div className="pt-3 pb-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">Resources</p>
                  {resourceLinks.map((r) => (
                    <MobileNavLink key={r.to} to={r.to}>{r.label}</MobileNavLink>
                  ))}
                </div>

                <div className="pt-3 pb-1">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-2">More</p>
                  <MobileNavLink to="/b2b">For Agencies</MobileNavLink>
                  <MobileNavLink to="/countries">Study Destinations</MobileNavLink>
                  <MobileNavLink to="/cost-calculator">Cost Calculator</MobileNavLink>
                  <MobileNavLink to="/careers">Career Hub</MobileNavLink>
                  <MobileNavLink to="/help">Help Center</MobileNavLink>
                </div>
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
