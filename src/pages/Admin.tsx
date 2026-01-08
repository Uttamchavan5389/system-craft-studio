import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { GlowCard } from "@/components/ui/GlowCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { RevealSection } from "@/components/ui/RevealSection";
import { useToast } from "@/hooks/use-toast";
import {
  Mail,
  User,
  Calendar,
  FileText,
  Download,
  LogOut,
  RefreshCw,
  Inbox,
  AlertCircle,
  Settings,
  Save,
  MailCheck,
} from "lucide-react";
import type { User as SupabaseUser, Session, SupabaseClient } from "@supabase/supabase-js";
import { getBackendClient } from "@/lib/backendClient";

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface NotificationSettings {
  enabled: boolean;
  recipient_email: string;
  cc_emails: string[];
}

const Admin = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [backendError, setBackendError] = useState(false);
  const [backendErrorMessage, setBackendErrorMessage] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [notifSettings, setNotifSettings] = useState<NotificationSettings>({
    enabled: true,
    recipient_email: "",
    cc_emails: [],
  });
  const [ccInput, setCcInput] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const clientRef = useRef<SupabaseClient | null>(null);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | null = null;

    const init = async () => {
      try {
        const supabase = getBackendClient();
        clientRef.current = supabase;

        const { data } = supabase.auth.onAuthStateChange((event, session) => {
          setSession(session);
          setUser(session?.user ?? null);

          if (!session?.user) {
            navigate("/auth");
          } else {
            setTimeout(() => {
              checkAdminRole(session.user.id);
            }, 0);
          }
        });
        subscription = data.subscription;

        const {
          data: { session },
        } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user ?? null);

        if (!session?.user) {
          navigate("/auth");
        } else {
          checkAdminRole(session.user.id);
        }
      } catch (err) {
        setBackendErrorMessage(err instanceof Error ? err.message : String(err));
        console.error("Backend init error:", err);
        setBackendError(true);
        setIsLoading(false);
      }
    };

    init();

    return () => {
      subscription?.unsubscribe();
    };
  }, [navigate]);

  const checkAdminRole = async (userId: string) => {
    if (!clientRef.current) return;
    
    try {
      const { data, error } = await clientRef.current.rpc("has_role", {
        _user_id: userId,
        _role: "admin",
      });
      
      if (error) throw error;
      setIsAdmin(data);
      
      if (data) {
        fetchSubmissions();
        fetchNotificationSettings();
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
    if (!clientRef.current) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await clientRef.current
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

  const fetchNotificationSettings = async () => {
    if (!clientRef.current) return;
    try {
      const { data, error } = await clientRef.current
        .from("contact_notification_settings")
        .select("enabled, recipient_email, cc_emails")
        .eq("id", "default")
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setNotifSettings({
          enabled: data.enabled,
          recipient_email: data.recipient_email,
          cc_emails: data.cc_emails ?? [],
        });
        setCcInput((data.cc_emails ?? []).join(", "));
      }
    } catch (error: any) {
      console.error("Failed to fetch notification settings:", error);
    }
  };

  const saveNotificationSettings = async () => {
    if (!clientRef.current) return;
    setSavingSettings(true);
    try {
      const ccArray = ccInput
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e.length > 0 && e.includes("@"));

      const { error } = await clientRef.current
        .from("contact_notification_settings")
        .upsert({
          id: "default",
          enabled: notifSettings.enabled,
          recipient_email: notifSettings.recipient_email,
          cc_emails: ccArray,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      setNotifSettings((prev) => ({ ...prev, cc_emails: ccArray }));
      toast({ title: "Saved", description: "Notification settings updated." });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setSavingSettings(false);
    }
  };

  const handleLogout = async () => {
    if (clientRef.current) {
      await clientRef.current.auth.signOut();
    }
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

  if (backendError) {
    return (
      <Layout>
        <section className="flex min-h-screen items-center justify-center px-6">
          <GlowCard className="max-w-md p-8 text-center">
            <div className="relative z-10">
              <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
              <h2 className="mt-4 font-heading text-2xl font-bold text-foreground">
                Backend Unavailable
              </h2>
              <p className="mt-2 text-muted-foreground">
                {backendErrorMessage ??
                  "Admin panel requires backend configuration. Please contact the site owner."}
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
                <GlowButton onClick={() => setShowSettings(!showSettings)} variant="secondary">
                  <Settings className="h-4 w-4" />
                  Email Settings
                </GlowButton>
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

          {/* Notification Settings Panel */}
          {showSettings && (
            <RevealSection delay={0.05}>
              <GlowCard className="mb-6 p-6">
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center gap-3">
                    <MailCheck className="h-5 w-5 text-primary" />
                    <h2 className="font-heading text-lg font-bold text-foreground">Email Notification Settings</h2>
                  </div>

                  {/* Enable toggle */}
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setNotifSettings((p) => ({ ...p, enabled: !p.enabled }))}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        notifSettings.enabled ? "bg-primary" : "bg-muted"
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition-transform ${
                          notifSettings.enabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                    <span className="text-sm text-foreground">
                      {notifSettings.enabled ? "Notifications enabled" : "Notifications disabled"}
                    </span>
                  </div>

                  {/* Recipient email */}
                  <div>
                    <label htmlFor="recipient" className="mb-1.5 block text-sm font-medium text-foreground">
                      Primary recipient email
                    </label>
                    <input
                      id="recipient"
                      type="email"
                      value={notifSettings.recipient_email}
                      onChange={(e) => setNotifSettings((p) => ({ ...p, recipient_email: e.target.value }))}
                      className="w-full max-w-md rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="u1976739@gmail.com"
                    />
                  </div>

                  {/* CC emails */}
                  <div>
                    <label htmlFor="ccEmails" className="mb-1.5 block text-sm font-medium text-foreground">
                      CC emails (comma-separated)
                    </label>
                    <input
                      id="ccEmails"
                      type="text"
                      value={ccInput}
                      onChange={(e) => setCcInput(e.target.value)}
                      className="w-full max-w-md rounded-lg border border-border bg-muted/50 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="uttam.ux.design@gmail.com, other@example.com"
                    />
                  </div>

                  <GlowButton onClick={saveNotificationSettings} variant="primary" disabled={savingSettings}>
                    <Save className="h-4 w-4" />
                    {savingSettings ? "Saving..." : "Save Settings"}
                  </GlowButton>
                </div>
              </GlowCard>
            </RevealSection>
          )}

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
