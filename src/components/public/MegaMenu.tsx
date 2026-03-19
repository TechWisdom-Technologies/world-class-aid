import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  GraduationCap, Menu, ChevronDown, LogOut, LayoutDashboard, ShieldCheck, Phone,
  Calculator, RefreshCw, Sparkles, ChevronRight, MapPin, Home, Award, GitCompare,
  BookOpen, FileText, Calendar, Building2, Languages, PenTool, User, Wrench, Zap,
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { supabase } from "@/integrations/supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { LeadCaptureModal } from "@/components/public/LeadCaptureModal";

const cityLinks = [
  { label: "Kuala Lumpur", to: "/destinations/malaysia/kuala-lumpur" },
  { label: "Cyberjaya", to: "/destinations/malaysia/cyberjaya" },
  { label: "Penang", to: "/destinations/malaysia/penang" },
];

const resourceToolsLinks = [
  { label: "Blog", to: "/blog", icon: PenTool },
  { label: "Events & Webinars", to: "/events", icon: Calendar },
  { label: "Alumni", to: "/alumni", icon: User },
  { label: "AI Eligibility Test", to: "/eligibility", icon: Sparkles },
  { label: "Compare Universities", to: "/compare", icon: GitCompare },
  { label: "Cost Calculator", to: "/tools/calculator", icon: Calculator },
  { label: "GPA Converter", to: "/tools/gpa-converter", icon: RefreshCw },
  { label: "Scholarships", to: "/scholarships", icon: Award },
  { label: "Visa Guide", to: "/visa-guide", icon: FileText },
];

export function MegaMenu() {
  const { user, hasRole, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const [leadOpen, setLeadOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const pathname = location.pathname;

  const isRouteActive = (route: string) => {
    if (route === "/") return pathname === "/";
    return pathname === route || pathname.startsWith(`${route}/`);
  };

  const toolsRoots = [
    "/blog",
    "/events",
    "/alumni",
    "/eligibility",
    "/compare",
    "/tools",
    "/scholarships",
    "/visa-guide",
  ];

  const destinationsActive = isRouteActive("/destinations");
  const toolsActive = toolsRoots.some((route) => isRouteActive(route));

  const handleLogout = () => {
    signOut();
    navigate("/");
    toast({ title: "Signed out successfully" });
  };

  useEffect(() => {
    const loadAvatar = async () => {
      if (!user) {
        setAvatarUrl("");
        return;
      }

      const directAvatar = (user.user_metadata?.avatar_url as string | undefined) || "";
      if (directAvatar) {
        setAvatarUrl(directAvatar);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("avatar_url")
        .eq("user_id", user.id)
        .single();

      setAvatarUrl(data?.avatar_url || "");
    };

    loadAvatar();
  }, [user?.id]);

  const userInitial = user?.email?.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top accent line */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-primary" />

      <div className="bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-[0_1px_3px_0_hsl(var(--foreground)/0.04)]">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-6">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center group-hover:shadow-md transition-shadow">
              <GraduationCap className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="text-lg font-extrabold tracking-tight">
              <span className="text-foreground">Your</span>
              <span className="text-secondary">Uni</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.25">
            <NavItem to="/" icon={Home}>Home</NavItem>

            {/* Destinations Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(
                    "h-9 text-sm font-medium bg-transparent hover:bg-accent/60 data-[state=open]:bg-accent/60 rounded-lg px-2.5 transition-colors gap-1",
                    destinationsActive && "text-foreground bg-secondary/30 border border-secondary/60 shadow-sm",
                  )}>
                    <MapPin className="h-3.5 w-3.5" /> Destinations
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[360px] max-w-[calc(100vw-3rem)] p-5 overflow-x-auto">
                      <Link
                        to="/destinations/malaysia"
                        className="flex items-center gap-4 rounded-xl p-4 hover:bg-accent/60 transition-all group"
                      >
                        <span className="text-3xl">🇲🇾</span>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Malaysia</p>
                          <p className="text-xs text-muted-foreground mt-0.5">Your gateway to world-class, affordable education</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                      <div className="border-t border-border/50 pt-3 mt-3">
                        <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest px-4 mb-2">
                          Top Student Cities
                        </p>
                        <div className="grid grid-cols-1 gap-0.5">
                          {cityLinks.map((c) => (
                            <Link
                              key={c.to}
                              to={c.to}
                              className="flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium text-foreground hover:bg-accent/60 transition-colors"
                            >
                              <MapPin className="h-4 w-4 text-secondary" />
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <NavItem to="/universities" icon={GraduationCap}>Universities</NavItem>
            <NavItem to="/courses" icon={BookOpen}>Courses</NavItem>
            <NavItem to="/language-centers" icon={Languages}>Language</NavItem>
            <NavItem to="/housing" icon={Building2}>Housing</NavItem>

            {/* Resources & Tools Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={cn(
                    "h-9 text-sm font-medium bg-transparent hover:bg-accent/60 data-[state=open]:bg-accent/60 rounded-lg px-2.5 transition-colors gap-1",
                    toolsActive && "text-foreground bg-secondary/30 border border-secondary/60 shadow-sm",
                  )}>
                    <Wrench className="h-3.5 w-3.5" /> Tools
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[360px] max-w-[calc(100vw-3rem)] p-5 overflow-x-auto">
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-widest px-3 pb-3 mb-2">
                        Tools & Resources
                      </p>
                      <div className="space-y-0.5">
                        {resourceToolsLinks.map((item) => (
                          <Link
                            key={item.to}
                            to={item.to}
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent/60 transition-colors group"
                          >
                            <div className="h-7 w-7 rounded-md bg-muted/80 flex items-center justify-center group-hover:bg-secondary/15 transition-colors">
                              <item.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-secondary transition-colors" />
                            </div>
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
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/partner">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-9 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg gap-1.5 px-2.5 transition-colors",
                  isRouteActive("/partner") && "text-foreground bg-secondary/30 border border-secondary/60 shadow-sm hover:bg-secondary/35",
                )}
              >
                <Zap className="h-3.5 w-3.5" /> Partnership
              </Button>
            </Link>

            {!user && (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="rounded-lg border-border/60 font-medium text-sm h-9">
                    Log In
                  </Button>
                </Link>
                <Button
                  size="sm"
                  className="rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-sm font-semibold text-sm h-9 gap-1.5"
                  onClick={() => setLeadOpen(true)}
                >
                  <Phone className="h-3.5 w-3.5" /> Consult
                </Button>
              </>
            )}

            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0 hover:ring-2 hover:ring-secondary/30 transition-all">
                    <Avatar className="h-9 w-9 border-2 border-secondary/30">
                      <AvatarImage src={avatarUrl} alt={user?.email || "User avatar"} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm font-bold">
                        {userInitial}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2.5">
                    <p className="text-sm font-semibold text-foreground truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {hasRole("admin") ? "Administrator" : hasRole("partner") ? "Partner" : "Student"}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  {hasRole("admin") && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                        <ShieldCheck className="h-4 w-4" /> Admin Panel
                      </Link>
                    </DropdownMenuItem>
                  )}
                  {hasRole("partner") && (
                    <DropdownMenuItem asChild>
                      <Link to="/partner-dashboard" className="flex items-center gap-2 cursor-pointer">
                        <LayoutDashboard className="h-4 w-4" /> Partner Dashboard
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile Hamburger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-lg hover:bg-accent/60">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] p-0 border-l-0 shadow-2xl">
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="p-5 border-b border-border/50 flex items-center justify-between">
                  <Link to="/" className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                      <GraduationCap className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-extrabold">
                      <span className="text-foreground">Your</span>
                      <span className="text-secondary">Uni</span>
                    </span>
                  </Link>
                </div>

                {/* Mobile User Card */}
                {user && (
                  <div className="px-5 py-4 bg-muted/30 border-b border-border/50">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-secondary/30">
                        <AvatarImage src={avatarUrl} alt={user?.email || "User avatar"} />
                        <AvatarFallback className="bg-primary text-primary-foreground font-bold">{userInitial}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate">{user.email}</p>
                        <p className="text-xs text-muted-foreground">
                          {hasRole("admin") ? "Administrator" : hasRole("partner") ? "Partner" : "Student"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Nav */}
                <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                  <MobileNavLink to="/" icon={Home}>Home</MobileNavLink>

                  <Collapsible>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent/60 transition-colors">
                      <span className="flex items-center gap-2.5">
                        <MapPin className="h-4 w-4 text-muted-foreground" /> Destinations
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-0.5 mt-0.5">
                      <MobileNavLink to="/destinations/malaysia">🇲🇾 Malaysia Overview</MobileNavLink>
                      {cityLinks.map((c) => (
                        <MobileNavLink key={c.to} to={c.to}>{c.label}</MobileNavLink>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  <MobileNavLink to="/universities" icon={GraduationCap}>Universities</MobileNavLink>
                  <MobileNavLink to="/courses" icon={BookOpen}>Courses</MobileNavLink>
                  <MobileNavLink to="/language-centers" icon={Languages}>Language Centers</MobileNavLink>
                  <MobileNavLink to="/housing" icon={Building2}>Accommodations</MobileNavLink>

                  <Collapsible>
                    <CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent/60 transition-colors">
                      <span className="flex items-center gap-2.5">
                        <Sparkles className="h-4 w-4 text-muted-foreground" /> Resources & Tools
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pl-4 space-y-0.5 mt-0.5">
                      {resourceToolsLinks.map((item) => (
                        <MobileNavLink key={item.to} to={item.to} icon={item.icon}>{item.label}</MobileNavLink>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="h-px bg-border/50 my-2" />
                  <MobileNavLink to="/partner">Partnership</MobileNavLink>
                </nav>

                {/* Mobile Auth Footer */}
                <div className="p-4 border-t border-border/50 bg-muted/20 space-y-2">
                  {!user && (
                    <>
                      <SheetClose asChild>
                        <Link to="/login" className="block">
                          <Button variant="outline" className="w-full rounded-lg font-medium">Log In</Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Button
                          className="w-full rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold shadow-sm"
                          onClick={() => setLeadOpen(true)}
                        >
                          <Phone className="h-4 w-4 mr-1.5" /> Free Consultation
                        </Button>
                      </SheetClose>
                    </>
                  )}
                  {hasRole("admin") && (
                    <SheetClose asChild>
                      <Link to="/admin" className="block">
                        <Button variant="outline" className="w-full rounded-lg gap-1.5 font-medium"><ShieldCheck className="h-4 w-4" /> Admin Panel</Button>
                      </Link>
                    </SheetClose>
                  )}
                  {hasRole("partner") && (
                    <SheetClose asChild>
                      <Link to="/partner-dashboard" className="block">
                        <Button variant="outline" className="w-full rounded-lg gap-1.5 font-medium"><LayoutDashboard className="h-4 w-4" /> Dashboard</Button>
                      </Link>
                    </SheetClose>
                  )}
                  {user && (
                    <SheetClose asChild>
                      <Button variant="ghost" className="w-full rounded-lg gap-1.5 text-destructive hover:text-destructive font-medium" onClick={handleLogout}>
                        <LogOut className="h-4 w-4" /> Sign Out
                      </Button>
                    </SheetClose>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <LeadCaptureModal
        open={leadOpen}
        onOpenChange={setLeadOpen}
        source="mega_menu_free_consult"
      />
    </header>
  );
}

function NavItem({ to, children, icon: Icon }: { to: string; children: React.ReactNode; icon?: React.ElementType }) {
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <Link to={to}>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "h-9 text-sm font-medium rounded-lg hover:bg-accent/60 gap-1.5 px-2.5 transition-colors",
          isActive && "text-foreground bg-secondary/30 border border-secondary/60 shadow-sm hover:bg-secondary/35",
        )}
      >
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {children}
      </Button>
    </Link>
  );
}

function MobileNavLink({ to, children, icon: Icon }: { to: string; children: React.ReactNode; icon?: React.ElementType }) {
  const location = useLocation();
  const pathname = location.pathname;
  const isActive = to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <SheetClose asChild>
      <Link
        to={to}
        className={cn(
          "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent/60 transition-colors",
          isActive && "text-foreground bg-secondary/30 border border-secondary/60 shadow-sm",
        )}
      >
        {Icon && <Icon className={cn("h-4 w-4 text-muted-foreground", isActive && "text-foreground")} />}
        {children}
      </Link>
    </SheetClose>
  );
}
