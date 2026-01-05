import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { GlowCard } from "@/components/ui/GlowCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { RevealSection } from "@/components/ui/RevealSection";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { 
  Mail, 
  User, 
  Calendar, 
  FileText, 
  Download, 
  LogOut, 
  RefreshCw,
  Inbox
} from "lucide-react";
import type { User as SupabaseUser, Session } from "@supabase/supabase-js";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      } else {
        // Check admin role after auth state change
        setTimeout(() => {
          checkAdminRole(session.user.id);
        }, 0);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      } else {
        checkAdminRole(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    try {
      const { data, error } = await supabase.rpc("has_role", {
        _user_id: userId,
        _role: "admin",
      });
      
      if (error) throw error;
      setIsAdmin(data);
      
      if (data) {
        fetchSubmissions();
      } else {
        setIsLoading(false);
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error checking admin role:", error);
      setIsAdmin(false);
      setIsLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch submissions",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const exportToCSV = () => {
    if (submissions.length === 0) {
      toast({
        title: "No data",
        description: "No submissions to export",
        variant: "destructive",
      });
      return;
    }

    const headers = ["Name", "Email", "Subject", "Message", "Submitted At"];
    const csvContent = [
      headers.join(","),
      ...submissions.map((sub) =>
        [
          `"${sub.name.replace(/"/g, '""')}"`,
          `"${sub.email.replace(/"/g, '""')}"`,
          `"${sub.subject.replace(/"/g, '""')}"`,
          `"${sub.message.replace(/"/g, '""')}"`,
          `"${new Date(sub.created_at).toLocaleString()}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `contact-submissions-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    
    toast({
      title: "Exported!",
      description: `${submissions.length} submissions exported to CSV`,
    });
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <RefreshCw className="mx-auto h-8 w-8 animate-spin text-primary" />
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAdmin) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center px-6">
          <GlowCard className="max-w-md p-8 text-center">
            <div className="relative z-10">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <LogOut className="h-8 w-8" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Access Denied
              </h2>
              <p className="mt-2 text-muted-foreground">
                You need admin privileges to access this page.
              </p>
              <GlowButton onClick={handleLogout} variant="primary" className="mt-6">
                <LogOut className="h-4 w-4" />
                Sign Out
              </GlowButton>
            </div>
          </GlowCard>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="min-h-screen px-6 pt-32 pb-16">
        <div className="mx-auto max-w-6xl">
          <RevealSection>
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
                  Contact Submissions
                </h1>
                <p className="mt-2 text-muted-foreground">
                  Logged in as: {user.email}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <GlowButton onClick={fetchSubmissions} variant="secondary" disabled={isLoading}>
                  <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  Refresh
                </GlowButton>
                <GlowButton onClick={exportToCSV} variant="secondary">
                  <Download className="h-4 w-4" />
                  Export CSV
                </GlowButton>
                <GlowButton onClick={handleLogout} variant="primary">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </GlowButton>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <RefreshCw className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : submissions.length === 0 ? (
              <GlowCard className="p-12 text-center">
                <div className="relative z-10">
                  <Inbox className="mx-auto h-16 w-16 text-muted-foreground/50" />
                  <h3 className="mt-4 font-heading text-xl font-bold text-foreground">
                    No Submissions Yet
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    Contact form submissions will appear here.
                  </p>
                </div>
              </GlowCard>
            ) : (
              <div className="grid gap-4">
                {submissions.map((submission, index) => (
                  <motion.div
                    key={submission.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <GlowCard className="p-6">
                      <div className="relative z-10">
                        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <User className="h-5 w-5" />
                            </div>
                            <div>
                              <h3 className="font-heading font-bold text-foreground">
                                {submission.name}
                              </h3>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-3 w-3" />
                                <a href={`mailto:${submission.email}`} className="hover:text-primary">
                                  {submission.email}
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(submission.created_at).toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="mb-3 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="font-medium text-foreground">{submission.subject}</span>
                        </div>
                        
                        <p className="whitespace-pre-wrap text-muted-foreground">
                          {submission.message}
                        </p>
                      </div>
                    </GlowCard>
                  </motion.div>
                ))}
              </div>
            )}
          </RevealSection>
        </div>
      </section>
    </Layout>
  );
};

export default Admin;
