import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RevealSection, StaggerContainer, StaggerItem } from "@/components/ui/RevealSection";
import { GlowCard } from "@/components/ui/GlowCard";
import { ArrowUpRight, ShoppingCart, Database, Bot } from "lucide-react";

const projects = [
  {
    slug: "promode-agro-farms",
    title: "Promode Agro Farms",
    category: "E-commerce + ERP + Mobile",
    description: "Full-stack agricultural commerce platform with integrated ERP, inventory management, and mobile logistics.",
    icon: ShoppingCart,
    tags: ["ERP", "E-commerce", "Mobile", "Logistics"],
    color: "cyan",
  },
  {
    slug: "inventory-erp-system",
    title: "Inventory / ERP System",
    category: "Enterprise Platform",
    description: "Comprehensive enterprise resource planning system with real-time inventory tracking and operational analytics.",
    icon: Database,
    tags: ["Dashboard", "Analytics", "Inventory", "Operations"],
    color: "purple",
  },
  {
    slug: "ai-automation-platform",
    title: "AI Automation Platform",
    category: "AI & Automation",
    description: "Intelligent automation system with AI agents, workflow orchestration, and business process optimization.",
    icon: Bot,
    tags: ["AI Agents", "Automation", "Workflows", "Integration"],
    color: "mixed",
  },
];

export const FeaturedProjects = () => {
  return (
    <section className="relative pt-24 pb-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-6">
        <RevealSection>
          <div className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                Featured <span className="gradient-text">Projects</span>
              </h2>
              <p className="mt-4 max-w-xl text-muted-foreground">
                Selected work showcasing enterprise systems, AI automation, and 
                product design expertise.
              </p>
            </div>
            <Link
              to="/work"
              className="group flex items-center gap-2 font-medium text-primary transition-colors hover:text-accent"
            >
              View all work
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </RevealSection>

        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.15}>
          {projects.map((project) => (
            <StaggerItem key={project.slug}>
              <Link to={`/projects/${project.slug}`}>
                <GlowCard 
                  className="group h-full p-6" 
                  glowColor={project.color as "cyan" | "purple" | "mixed"}
                >
                  <div className="relative z-10 flex h-full flex-col">
                    {/* Icon */}
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary transition-transform duration-300 group-hover:scale-110">
                      <project.icon className="h-7 w-7" />
                    </div>

                    {/* Category */}
                    <span className="mb-2 text-sm font-medium text-primary">
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-heading text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 flex-grow text-muted-foreground">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <motion.div
                      className="mt-6 flex items-center gap-2 text-primary"
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                    >
                      <span className="text-sm font-medium">View Project</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </motion.div>
                  </div>
                </GlowCard>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
