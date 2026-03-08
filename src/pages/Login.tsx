import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { GraduationCap, ArrowLeft, LogIn, UserPlus, Clock, XCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SUPABASE_URL = "https://kelwzcacbnrrioophnzh.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtlbHd6Y2FjYm5ycmlvb3BobnpoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI5ODU0NzYsImV4cCI6MjA4ODU2MTQ3Nn0.VUCY4HY0LNX4umOfEWh1NmkKKHQ-DYj7VvRCJkeDe_c";

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
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md space-y-6 animate-fade-in">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-3 w-3" /> Back to site
          </Link>
          <div className="flex items-center justify-center gap-2">
            <GraduationCap className="h-8 w-8 text-secondary" />
            <span className="text-2xl font-extrabold">
              <span className="text-primary">Your</span>
              <span className="text-secondary">Uni</span>
            </span>
          </div>
          <p className="text-muted-foreground text-sm">Sign in to access your dashboard</p>
        </div>

        {/* Partner registration status alerts */}
        {regStatus?.status === "pending" && (
          <Alert className="border-warning/50 bg-warning/10">
            <Clock className="h-4 w-4 text-warning" />
            <AlertTitle className="text-warning">Registration Pending</AlertTitle>
            <AlertDescription className="text-sm">
              Your partner registration is being reviewed by our team. You'll receive an email once it's approved. Please check back later.
            </AlertDescription>
          </Alert>
        )}
        {regStatus?.status === "rejected" && (
          <Alert variant="destructive">
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

        <Card>
          <CardContent className="pt-6">
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
                  </div>
                  <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" disabled={loading}>
                    <LogIn className="h-4 w-4 mr-2" />
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div>
                    <Label>Display Name</Label>
                    <Input value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Your name" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                  </div>
                  <div>
                    <Label>Password</Label>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters" required minLength={6} />
                  </div>
                  <Button type="submit" className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90" disabled={loading}>
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
  );
}
