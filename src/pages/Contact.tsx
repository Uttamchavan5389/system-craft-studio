import { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { RevealSection } from "@/components/ui/RevealSection";
import { GlowCard } from "@/components/ui/GlowCard";
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@uttamchavan.com",
    href: "mailto:hello@uttamchavan.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, India",
    href: "#",
  },
];

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
];

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("contact_submissions")
        .insert({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        });

      if (error) throw error;

      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });

      // Reset form after delay
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitted(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Layout>
      <section className="relative min-h-screen px-4 pt-24 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <RevealSection>
            <div className="mb-10 text-center sm:mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
              >
                Get in Touch
              </motion.span>
              <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                Let's <span className="gradient-text">Connect</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:mt-6 sm:text-lg">
                Have a project in mind? Let's discuss how we can work together 
                to create something exceptional.
              </p>
            </div>
          </RevealSection>

          <div className="grid gap-8 pb-16 sm:gap-12 sm:pb-20 lg:grid-cols-2">
            {/* Contact Form */}
            <RevealSection delay={0.2}>
              <GlowCard className="p-5 sm:p-8">
                <div className="relative z-10">
                  <h2 className="mb-4 font-heading text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">
                    Send a Message
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground sm:mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground sm:mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-foreground sm:mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-border bg-muted/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
                        placeholder="Project inquiry"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground sm:mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full resize-none rounded-lg border border-border bg-muted/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 sm:rounded-xl sm:px-4 sm:py-3 sm:text-base"
                        placeholder="Tell me about your project..."
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitting || isSubmitted}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-5 py-3 font-heading text-sm font-medium text-primary-foreground transition-all duration-300 disabled:opacity-70 sm:rounded-xl sm:px-6 sm:py-4 sm:text-base"
                      whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
                    >
                      {isSubmitted ? (
                        <>
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                          Message Sent!
                        </>
                      ) : isSubmitting ? (
                        <>
                          <motion.div
                            className="h-4 w-4 rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground sm:h-5 sm:w-5"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </form>
                </div>
              </GlowCard>
            </RevealSection>

            {/* Contact Info */}
            <RevealSection delay={0.4}>
              <div className="space-y-4 sm:space-y-8">
                {/* Contact details */}
                <GlowCard className="p-5 sm:p-8">
                  <div className="relative z-10">
                    <h2 className="mb-4 font-heading text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">
                      Contact Info
                    </h2>
                    <div className="space-y-4 sm:space-y-6">
                      {contactInfo.map((item) => (
                        <a
                          key={item.label}
                          href={item.href}
                          className="group flex items-center gap-3 sm:gap-4"
                        >
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground sm:h-12 sm:w-12 sm:rounded-xl">
                            <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground sm:text-sm">{item.label}</p>
                            <p className="text-sm font-medium text-foreground transition-colors group-hover:text-primary sm:text-base">
                              {item.value}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </GlowCard>

                {/* Social links */}
                <GlowCard className="p-5 sm:p-8">
                  <div className="relative z-10">
                    <h2 className="mb-4 font-heading text-xl font-bold text-foreground sm:mb-6 sm:text-2xl">
                      Follow Me
                    </h2>
                    <div className="flex gap-3 sm:gap-4">
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors hover:border-primary hover:bg-primary/10 hover:text-primary sm:h-12 sm:w-12 sm:rounded-xl"
                          whileHover={{ y: -3, scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </GlowCard>

                {/* Availability */}
                <GlowCard className="p-5 sm:p-8">
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500 sm:h-3 sm:w-3"></span>
                      </span>
                      <span className="text-base font-medium text-foreground sm:text-lg">
                        Available for new projects
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground sm:mt-3 sm:text-base">
                      Currently accepting freelance work and full-time opportunities. 
                      Let's create something amazing together.
                    </p>
                  </div>
                </GlowCard>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
