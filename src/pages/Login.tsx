import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GraduationCap, ArrowLeft, LogIn, UserPlus, Clock, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [regStatus, setRegStatus] = useState<{ status: string; admin_notes: string } | null>(null);

  // After login attempt, check partner registration status
  const checkPartnerRegistration = async (userEmail: string) => {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/partner_registrations?select=status,admin_notes&email=eq.${encodeURIComponent(userEmail)}&order=created_at.desc&limit=1`,
        { headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` } }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.length > 0) return data[0];
      }
    } catch { /* ignore */ }
    return null;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRegStatus(null);
    const result = await signIn(email, password);
    setLoading(false);
    if (!result.success) {
      // Check if this is a partner with pending/rejected registration
      const reg = await checkPartnerRegistration(email);
      if (reg && (reg.status === "pending" || reg.status === "rejected")) {
        setRegStatus(reg);
      } else {
        toast({ title: "Login failed", description: result.error, variant: "destructive" });
      }
    } else {
      toast({ title: "Welcome back!" });
      navigate(result.redirectTo || "/");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = await signUp(email, password, displayName);
    setLoading(false);
    if (!result.success) {
      toast({ title: "Sign up failed", description: result.error, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: "We sent you a confirmation link to verify your account." });
    }
  };

  return (
    <div className="relative h-screen overflow-hidden bg-slate-50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div className="relative h-full container mx-auto px-4 py-4 md:py-6 flex items-center">
        <div className="mx-auto grid h-full max-h-[900px] w-full max-w-5xl grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl border bg-white shadow-2xl animate-fade-in">
          <div className="hidden lg:block relative">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=1600&fit=crop"
              alt="Students on campus"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/35 to-transparent" />
          </div>

          <div className="p-5 sm:p-7 md:p-8 overflow-hidden">
            <div className="space-y-2 mb-4">
              <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-3 w-3" /> Back to site
              </Link>

              <div className="flex items-center gap-2 mt-3">
                <GraduationCap className="h-7 w-7 text-secondary" />
                <span className="text-2xl font-extrabold">
                  <span className="text-primary">Your</span>
                  <span className="text-secondary">Uni</span>
                </span>
              </div>
            </div>

            {/* Partner registration status alerts */}
            {regStatus?.status === "pending" && (
              <Alert className="border-warning/50 bg-warning/10 mb-4">
                <Clock className="h-4 w-4 text-warning" />
                <AlertTitle className="text-warning">Registration Pending</AlertTitle>
                <AlertDescription className="text-sm">
                  Your partner registration is being reviewed by our team. You'll receive an email once it's approved. Please check back later.
                </AlertDescription>
              </Alert>
            )}
            {regStatus?.status === "rejected" && (
              <Alert variant="destructive" className="mb-4">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Registration Rejected</AlertTitle>
                <AlertDescription className="text-sm">
                  Unfortunately, your partner registration was not approved.
                  {regStatus.admin_notes && (
                    <span className="block mt-1 font-medium">Reason: {regStatus.admin_notes}</span>
                  )}
                  <span className="block mt-1">Please contact support or re-apply at the <Link to="/partner" className="underline font-medium">partner page</Link>.</span>
                </AlertDescription>
              </Alert>
            )}

            <Card className="border-muted shadow-sm">
              <CardContent className="pt-6">
                <Tabs defaultValue="login">
                  <TabsList className="grid w-full grid-cols-2 mb-4 bg-muted/60">
                    <TabsTrigger value="login">Sign In</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                  </TabsList>

                  <TabsContent value="login">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div>
                        <Label>Email</Label>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="mt-1.5 h-11" />
                      </div>
                      <div>
                        <Label>Password</Label>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required className="mt-1.5 h-11" />
                      </div>
                      <Button type="submit" className="w-full h-11 bg-secondary text-secondary-foreground hover:bg-secondary/90" disabled={loading}>
                        <LogIn className="h-4 w-4 mr-2" />
                        {loading ? "Signing in..." : "Sign In"}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="signup">
                    <form onSubmit={handleSignUp} className="space-y-4">
                      <div>
                        <Label>Display Name</Label>
                        <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" className="mt-1.5 h-11" />
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required className="mt-1.5 h-11" />
                      </div>
                      <div>
                        <Label>Password</Label>
                        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6} className="mt-1.5 h-11" />
                      </div>
                      <Button type="submit" className="w-full h-11 bg-secondary text-secondary-foreground hover:bg-secondary/90" disabled={loading}>
                        <UserPlus className="h-4 w-4 mr-2" />
                        {loading ? "Creating account..." : "Create Account"}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
