import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { RevealSection, StaggerContainer, StaggerItem } from "@/components/ui/RevealSection";
import { GlowCard } from "@/components/ui/GlowCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { SkillsRadar } from "@/components/ui/SkillsRadar";
import { ProficiencyBars } from "@/components/ui/ProficiencyBars";
import { Timeline, TimelineMobile } from "@/components/ui/Timeline";
import { ProcessFlow } from "@/components/ui/ProcessFlow";
import { Code2, Palette, Brain, Layers, Rocket, Target, ArrowRight, Briefcase, Heart, Package } from "lucide-react";

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

const radarSkills = [
  { name: "Product Design", value: 95 },
  { name: "UI/UX Engineering", value: 92 },
  { name: "Design Systems", value: 88 },
  { name: "ERP/POS Systems", value: 90 },
  { name: "AI Automation", value: 85 },
  { name: "Figma/Prototyping", value: 96 },
  { name: "Frontend Dev", value: 78 },
  { name: "User Research", value: 83 },
];

const experienceTimeline = [
  {
    year: "2024 - Present",
    title: "Senior Product Designer",
    company: "Independent Consultant",
    description: "Leading design for enterprise platforms and AI automation systems.",
    type: "work" as const,
  },
  {
    year: "2022 - 2024",
    title: "Lead UI/UX Engineer",
    company: "TechCorp Solutions",
    description: "Designed and shipped 5 enterprise products serving 50K+ users.",
    type: "work" as const,
  },
  {
    year: "2020 - 2022",
    title: "Product Designer",
    company: "StartupX",
    description: "Built design systems and led product redesign initiatives.",
    type: "work" as const,
  },
  {
    year: "2019 - 2020",
    title: "UI/UX Designer",
    company: "DesignStudio",
    description: "Crafted user experiences for mobile and web applications.",
    type: "work" as const,
  },
];

const stats = [
  { icon: Briefcase, value: "5+", label: "Years", sublabel: "Experience" },
  { icon: Package, value: "12+", label: "Products", sublabel: "Shipped" },
  { icon: Heart, value: "25+", label: "Clients", sublabel: "Happy" },
];

const About = () => {
  return (
    <Layout>
      <section className="relative min-h-screen px-4 pt-24 sm:px-6 sm:pt-32">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <RevealSection>
            <div className="mb-8 text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-primary"
              >
                // ABOUT ME
              </motion.span>
              <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                The Designer Behind
              </h1>
            </div>
          </RevealSection>

          {/* Profile Card + Bio */}
          <RevealSection>
            <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
              {/* Profile Card */}
              <div className="relative mx-auto w-full max-w-sm lg:mx-0">
                <motion.div
                  className="glass-card relative overflow-hidden rounded-3xl p-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                  <div className="relative z-10 text-center">
                    <motion.div
                      className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-muted/50 to-muted/30"
                      animate={{ 
                        boxShadow: [
                          "0 0 30px hsl(180 100% 50% / 0.2)",
                          "0 0 50px hsl(180 100% 50% / 0.3)",
                          "0 0 30px hsl(180 100% 50% / 0.2)",
                        ]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <svg className="h-12 w-12 text-muted-foreground" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </motion.div>
                    <h2 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                      Uttam Chavan
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Product Designer & UI/UX Engineer
                    </p>
                  </div>
                  
                  {/* Decorative circles */}
                  <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full border border-primary/20" />
                  <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full border border-accent/20" />
                </motion.div>
              </div>

              {/* Bio Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                    Building Systems That <span className="gradient-text">Scale</span>
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    With over 5 years of experience in product design and UI/UX
                    engineering, I specialize in creating enterprise-grade digital systems
                    that solve real business problems.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    My work spans ERP platforms, point-of-sale systems, AI automation
                    tools, and mobile applications. I believe in design that's not just
                    beautiful, but fundamentally functional and scalable.
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    I approach every project with a systems-thinking mindset,
                    considering not just the user interface, but the entire ecosystem of
                    users, data flows, and business processes.
                  </p>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap gap-8 pt-4">
                  {stats.map((stat) => (
                    <motion.div
                      key={stat.label}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <stat.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="font-heading text-xl font-bold text-primary">{stat.value}</span>
                          <span className="text-sm font-medium text-foreground">{stat.label}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{stat.sublabel}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Skills Section */}
          <RevealSection>
            <div className="mb-16">
              <div className="mb-8 text-center">
                <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-primary">
                  // SKILLS
                </span>
                <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  Technical Expertise
                </h2>
              </div>
              
              <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
                {/* Radar Chart */}
                <div className="flex justify-center">
                  <div className="glass-card p-4 sm:p-8">
                    <h3 className="mb-4 text-center font-heading text-lg font-semibold text-foreground">
                      Skills Radar
                    </h3>
                    <SkillsRadar 
                      skills={radarSkills.slice(0, 8).map(s => ({ name: s.name, value: s.value }))} 
                      size={280} 
                    />
                  </div>
                </div>
                
                {/* Proficiency Bars */}
                <div className="glass-card p-4 sm:p-8">
                  <h3 className="mb-6 font-heading text-lg font-semibold text-foreground">
                    Proficiency Levels
                  </h3>
                  <ProficiencyBars skills={radarSkills} />
                </div>
              </div>
            </div>
          </RevealSection>

          {/* Experience Timeline */}
          <RevealSection>
            <div className="mb-16">
              <div className="mb-8 text-center">
                <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-primary">
                  // EXPERIENCE
                </span>
                <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  Career Timeline
                </h2>
              </div>
              {/* Desktop Timeline */}
              <div className="hidden md:block">
                <Timeline items={experienceTimeline} />
              </div>
              {/* Mobile Timeline */}
              <div className="md:hidden">
                <TimelineMobile items={experienceTimeline} />
              </div>
            </div>
          </RevealSection>

          {/* Process Flow */}
          <RevealSection>
            <div className="mb-16">
              <div className="mb-8 text-center">
                <span className="mb-2 block text-xs font-medium uppercase tracking-widest text-primary">
                  // MY PROCESS
                </span>
                <h2 className="font-heading text-2xl font-bold text-foreground sm:text-3xl">
                  How I Work
                </h2>
              </div>
              <ProcessFlow />
            </div>
          </RevealSection>

          {/* Values */}
          <RevealSection>
            <div className="mb-16">
              <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Design <span className="gradient-text">Philosophy</span>
              </h2>
              <StaggerContainer className="grid gap-6 sm:grid-cols-2 md:grid-cols-3" staggerDelay={0.15}>
                {values.map((value) => (
                  <StaggerItem key={value.title}>
                    <GlowCard className="h-full p-6 text-center sm:p-8">
                      <div className="relative z-10">
                        <div className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary sm:mb-6 sm:h-14 sm:w-14">
                          <value.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                        </div>
                        <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                          {value.title}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground sm:mt-3">
                          {value.description}
                        </p>
                      </div>
                    </GlowCard>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </RevealSection>

          {/* Skills Cards */}
          <RevealSection>
            <div className="pb-16 sm:pb-20">
              <h2 className="mb-8 text-center font-heading text-2xl font-bold text-foreground sm:text-3xl">
                Skills & <span className="gradient-text">Expertise</span>
              </h2>
              <StaggerContainer className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4" staggerDelay={0.1}>
                {skills.map((skill) => (
                  <StaggerItem key={skill.category}>
                    <GlowCard className="h-full p-4 sm:p-6">
                      <div className="relative z-10">
                        <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary sm:mb-4 sm:h-12 sm:w-12">
                          <skill.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                        </div>
                        <h3 className="mb-3 font-heading text-base font-bold text-foreground sm:mb-4 sm:text-lg">
                          {skill.category}
                        </h3>
                        <ul className="space-y-1.5 sm:space-y-2">
                          {skill.items.map((item) => (
                            <li
                              key={item}
                              className="text-xs text-muted-foreground sm:text-sm"
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

          {/* CTA */}
          <RevealSection>
            <div className="pb-16 text-center sm:pb-20">
              <GlowButton href="/contact" variant="primary" size="lg">
                Let's Work Together
                <ArrowRight className="h-5 w-5" />
              </GlowButton>
            </div>
          </RevealSection>
        </div>
      </section>
    </Layout>
  );
};

export default About;
