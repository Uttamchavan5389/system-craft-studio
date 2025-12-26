import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { RevealSection, StaggerContainer, StaggerItem } from "@/components/ui/RevealSection";
import { GlowCard } from "@/components/ui/GlowCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { Code2, Palette, Brain, Layers, Rocket, Target, ArrowRight } from "lucide-react";

const skills = [
  {
    category: "Design",
    items: ["UI/UX Design", "Design Systems", "Wireframing", "Prototyping", "User Research"],
    icon: Palette,
  },
  {
    category: "Development",
    items: ["React/Next.js", "TypeScript", "Tailwind CSS", "Figma", "Framer Motion"],
    icon: Code2,
  },
  {
    category: "Systems",
    items: ["ERP Design", "POS Systems", "Inventory Management", "Workflow Automation", "API Design"],
    icon: Layers,
  },
  {
    category: "AI & Automation",
    items: ["AI Integration", "Voice Agents", "Process Automation", "Data Analytics", "ML Pipelines"],
    icon: Brain,
  },
];

const values = [
  {
    icon: Target,
    title: "Systems Thinking",
    description: "I approach every project with a holistic view, understanding how components interact within the larger ecosystem.",
  },
  {
    icon: Rocket,
    title: "Ship Fast, Ship Right",
    description: "Balancing speed with quality — delivering production-ready solutions that scale without technical debt.",
  },
  {
    icon: Brain,
    title: "AI-First Mindset",
    description: "Leveraging AI and automation to solve complex problems and create intelligent, adaptive systems.",
  },
];

const About = () => {
  return (
    <Layout>
      <section className="relative min-h-screen px-6 pt-32">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <RevealSection>
            <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
                >
                  About Me
                </motion.span>
                <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                  Senior Product Designer
                  <br />
                  <span className="gradient-text">& UI/UX Engineer</span>
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  With 6+ years of experience designing and building enterprise-grade 
                  digital products, I specialize in creating systems that are both 
                  beautiful and functional at scale.
                </p>
                <p className="mt-4 text-muted-foreground">
                  My work spans ERP platforms, POS systems, AI automation tools, and 
                  e-commerce solutions — always with a focus on clarity, usability, 
                  and real-world impact.
                </p>
                <div className="mt-8">
                  <GlowButton href="/contact" variant="primary" size="lg">
                    Let's Connect
                    <ArrowRight className="h-5 w-5" />
                  </GlowButton>
                </div>
              </div>

              {/* Profile visual */}
              <div className="relative">
                <motion.div
                  className="glass-card relative aspect-square overflow-hidden rounded-3xl"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent"
                        animate={{ 
                          boxShadow: [
                            "0 0 40px hsl(180 100% 50% / 0.3)",
                            "0 0 60px hsl(180 100% 50% / 0.5)",
                            "0 0 40px hsl(180 100% 50% / 0.3)",
                          ]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <span className="font-heading text-5xl font-bold text-primary-foreground">
                          UC
                        </span>
                      </motion.div>
                      <h2 className="font-heading text-2xl font-bold text-foreground">
                        Uttam Chavan
                      </h2>
                      <p className="mt-1 text-muted-foreground">
                        Product Designer • UI/UX Engineer
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Floating elements */}
                <motion.div
                  className="absolute -right-4 -top-4 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 p-4 backdrop-blur-xl"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Code2 className="h-8 w-8 text-primary" />
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 p-4 backdrop-blur-xl"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Palette className="h-8 w-8 text-accent" />
                </motion.div>
              </div>
            </div>
          </RevealSection>

          {/* Values */}
          <RevealSection>
            <div className="mb-20">
              <h2 className="mb-12 text-center font-heading text-3xl font-bold text-foreground">
                Design <span className="gradient-text">Philosophy</span>
              </h2>
              <StaggerContainer className="grid gap-8 md:grid-cols-3" staggerDelay={0.15}>
                {values.map((value) => (
                  <StaggerItem key={value.title}>
                    <GlowCard className="h-full p-8 text-center">
                      <div className="relative z-10">
                        <div className="mx-auto mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                          <value.icon className="h-7 w-7" />
                        </div>
                        <h3 className="font-heading text-xl font-bold text-foreground">
                          {value.title}
                        </h3>
                        <p className="mt-3 text-muted-foreground">
                          {value.description}
                        </p>
                      </div>
                    </GlowCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </RevealSection>

          {/* Skills */}
          <RevealSection>
            <div className="pb-20">
              <h2 className="mb-12 text-center font-heading text-3xl font-bold text-foreground">
                Skills & <span className="gradient-text">Expertise</span>
              </h2>
              <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.1}>
                {skills.map((skill) => (
                  <StaggerItem key={skill.category}>
                    <GlowCard className="h-full p-6">
                      <div className="relative z-10">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary">
                          <skill.icon className="h-6 w-6" />
                        </div>
                        <h3 className="mb-4 font-heading text-lg font-bold text-foreground">
                          {skill.category}
                        </h3>
                        <ul className="space-y-2">
                          {skill.items.map((item) => (
                            <li
                              key={item}
                              className="text-sm text-muted-foreground"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </GlowCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </RevealSection>
        </div>
      </section>
    </Layout>
  );
};

export default About;
