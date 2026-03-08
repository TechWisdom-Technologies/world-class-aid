import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, ArrowLeft, LogIn, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const result = signIn(email, password);
    setLoading(false);
    if (!result.success) {
      toast({ title: "Login failed", description: result.error, variant: "destructive" });
    } else {
      toast({ title: "Welcome back!" });
      navigate(result.redirectTo || "/");
    }
  };

  const quickLogin = (preset: "admin" | "partner") => {
    const creds = preset === "admin"
      ? { email: "admin@youruni.com", password: "admin123" }
      : { email: "partner@agency.com", password: "partner123" };
    setEmail(creds.email);
    setPassword(creds.password);
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

        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-muted/50 border">
              <Info className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
              <div className="text-xs text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground">Demo Credentials</p>
                <p><strong>Admin:</strong> admin@youruni.com / admin123</p>
                <p><strong>Partner:</strong> partner@agency.com / partner123</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
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

            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-muted-foreground text-center mb-3">Quick Login</p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-xs" onClick={() => quickLogin("admin")}>
                  <Badge variant="outline" className="mr-1.5 bg-primary/10 text-primary text-[10px]">Admin</Badge>
                  Fill Credentials
                </Button>
                <Button variant="outline" size="sm" className="text-xs" onClick={() => quickLogin("partner")}>
                  <Badge variant="outline" className="mr-1.5 bg-secondary/10 text-secondary text-[10px]">Partner</Badge>
                  Fill Credentials
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
