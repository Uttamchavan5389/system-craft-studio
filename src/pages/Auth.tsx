import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { GlowCard } from "@/components/ui/GlowCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, LogIn, UserPlus, AlertCircle } from "lucide-react";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";

const authSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [backendError, setBackendError] = useState(false);
  const [backendErrorMessage, setBackendErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const clientRef = useRef<SupabaseClient | null>(null);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

    const init = async () => {
      try {
        const urlOk = Boolean(import.meta.env.VITE_SUPABASE_URL);
        const keyOk = Boolean(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

        if (!urlOk || !keyOk) {
          setBackendErrorMessage(
            "Missing backend env vars (VITE_SUPABASE_URL / VITE_SUPABASE_PUBLISHABLE_KEY)."
          );
          setBackendError(true);
          return;
        }

        const { supabase } = await import("@/integrations/supabase/client");
        clientRef.current = supabase;

        const { data } = supabase.auth.onAuthStateChange((_event, session) => {
          if (session?.user) {
            // Defer backend calls to avoid deadlocks in auth callback
            setTimeout(() => {
              (async () => {
                try {
                  await supabase.rpc("bootstrap_admin");
                } catch {
                  // ignore
                }
                navigate("/admin");
              })();
            }, 0);
          }
        });
        subscription = data.subscription;

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session?.user) {
          // If bootstrap fails (e.g., missing function on a different backend), don't block login.
          try {
            await supabase.rpc("bootstrap_admin");
          } catch {
            // ignore
          }
          navigate("/admin");
        }
      } catch (err) {
        setBackendErrorMessage(err instanceof Error ? err.message : String(err));
        console.error("Backend init error:", err);
        setBackendError(true);
      }
    };

    init();

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = authSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors: { email?: string; password?: string } = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
        if (err.path[0] === "password") fieldErrors.password = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (!clientRef.current) {
      toast({ title: "Error", description: "Backend not available", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    const supabase = clientRef.current;

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back!", description: "Successfully logged in." });
      } else {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl },
        });
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "You are now logged in.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (backendError) {
    return (
      <Layout>
        <section className="flex min-h-screen items-center justify-center px-6 pt-24 pb-16">
          <GlowCard className="max-w-md p-8 text-center">
            <div className="relative z-10">
              <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
              <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">
                Backend Unavailable
              </h2>
              <p className="mt-2 text-muted-foreground">
                {backendErrorMessage ??
                  "Authentication requires backend configuration. Please contact the site owner."}
              </p>
              <p className="mt-3 text-xs text-muted-foreground">
                Env status: URL={Boolean(import.meta.env.VITE_SUPABASE_URL) ? "ok" : "missing"},
                KEY={Boolean(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) ? "ok" : "missing"}
              </p>
              <GlowButton href="/" variant="primary" className="mt-6">
                Go Home
              </GlowButton>
            </div>
          </GlowCard>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="flex min-h-screen items-center justify-center px-6 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <GlowCard className="p-8">
            <div className="relative z-10">
              <div className="mb-8 text-center">
                <h1 className="font-heading text-3xl font-bold text-foreground">
                  {isLogin ? "Admin Login" : "Create Account"}
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {isLogin ? "Sign in to access admin panel" : "Register a new account"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>

                <GlowButton type="submit" variant="primary" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    "Loading..."
                  ) : isLogin ? (
                    <>
                      <LogIn className="h-4 w-4" />
                      Sign In
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" />
                      Sign Up
                    </>
                  )}
                </GlowButton>
              </form>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </section>
    </Layout>
  );
};

export default Auth;
