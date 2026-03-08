import { Outlet, Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { PartnerSidebar } from "@/components/partner/PartnerSidebar";
import { NotificationCenter } from "@/components/partner/NotificationCenter";
import { ArrowLeft, LogOut, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

export default function PartnerLayout() {
  const { signOut, user } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <PartnerSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b px-4 gap-3 bg-primary text-primary-foreground justify-between">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" />
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10">
                  <ArrowLeft className="h-4 w-4 mr-1" />Back to Site
                </Button>
              </Link>
              <div className="hidden sm:flex items-center gap-2 ml-2">
                <GraduationCap className="h-5 w-5 text-secondary" />
                <span className="font-bold text-sm">
                  Your<span className="text-secondary">Uni</span> Partner Portal
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <NotificationCenter />
              <span className="text-xs text-primary-foreground/60 hidden sm:inline">{user?.email}</span>
              <Button variant="ghost" size="sm" className="text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10" onClick={signOut}>
                <LogOut className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </div>
          </header>
          <main className="flex-1 p-6 bg-muted/20 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
