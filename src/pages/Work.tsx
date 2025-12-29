import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { RevealSection } from "@/components/ui/RevealSection";
import { GlowCard } from "@/components/ui/GlowCard";
import { ArrowUpRight, ShoppingCart, Database, Bot, Smartphone, CreditCard, Instagram, Calculator, Wrench, Building, Package, Truck, MessageSquare } from "lucide-react";
import heroPromodeAgro from "@/assets/hero-promode-agro.jpg";
import heroErpDashboard from "@/assets/hero-erp-dashboard.jpg";
import heroAiPlatform from "@/assets/hero-ai-platform.jpg";
import heroPosSystem from "@/assets/hero-pos-system.jpg";
import heroPtrTechnology from "@/assets/hero-ptr-technology.jpg";
import heroPackerApp from "@/assets/hero-packer-app.jpg";
import heroRiderApp from "@/assets/hero-rider-app.jpg";
import heroFacebookAutomation from "@/assets/hero-facebook-automation.jpg";
import heroAiVoiceAgent from "@/assets/hero-ai-voice-agent.jpg";
import heroInstagramAutomation from "@/assets/hero-instagram-automation.jpg";
import heroAccountsTracking from "@/assets/hero-accounts-tracking.jpg";
import heroBikeMechanic from "@/assets/hero-bike-mechanic.jpg";
const allProjects = [
  {
    slug: "promode-agro-farms",
    title: "Promode Agro Farms",
    category: "E-commerce + ERP + Mobile",
    description: "Full-stack agricultural commerce platform with integrated ERP, inventory management, and mobile logistics for packers and riders.",
    icon: ShoppingCart,
    tags: ["ERP", "E-commerce", "Mobile", "Logistics"],
    featured: true,
    image: heroPromodeAgro,
  },
  {
    slug: "inventory-erp-system",
    title: "ERP / Inventory Platform",
    category: "Enterprise Platform",
    description: "Comprehensive enterprise resource planning system with real-time inventory tracking, analytics dashboards, and operational controls.",
    icon: Database,
    tags: ["Dashboard", "Analytics", "Inventory", "Operations"],
    featured: true,
    image: heroErpDashboard,
  },
  {
    slug: "ai-automation-platform",
    title: "AI Automation Platform",
    category: "AI & Automation",
    description: "Intelligent automation system with AI agents, workflow orchestration, and business process optimization.",
    icon: Bot,
    tags: ["AI Agents", "Automation", "Workflows", "Integration"],
    featured: true,
    image: heroAiPlatform,
  },
  {
    slug: "pos-system",
    title: "POS System",
    category: "Point of Sale",
    description: "Fast, intuitive point-of-sale terminal with minimal cognitive load, optimized checkout flows, and admin management.",
    icon: CreditCard,
    tags: ["Checkout", "Terminal", "Retail", "Payments"],
    featured: false,
    image: heroPosSystem,
  },
  {
    slug: "ptr-technology",
    title: "PTR Technology",
    category: "Enterprise Platform",
    description: "Corporate technology platform with advanced analytics, data visualization dashboards, and enterprise-grade infrastructure.",
    icon: Building,
    tags: ["Enterprise", "Analytics", "Dashboard", "Technology"],
    featured: false,
    image: heroPtrTechnology,
  },
  {
    slug: "packer-app",
    title: "Packer App",
    category: "Mobile Operations",
    description: "Mobile application for warehouse packers with package management, scanning, and order verification workflows.",
    icon: Package,
    tags: ["Mobile", "Operations", "Warehouse", "Logistics"],
    featured: false,
    image: heroPackerApp,
  },
  {
    slug: "rider-app",
    title: "Rider App",
    category: "Delivery & Logistics",
    description: "Delivery rider mobile app with route optimization, navigation, order tracking, and real-time delivery status updates.",
    icon: Truck,
    tags: ["Mobile", "Delivery", "Navigation", "Logistics"],
    featured: false,
    image: heroRiderApp,
  },
  {
    slug: "facebook-automation",
    title: "Facebook Automation Agents",
    category: "AI & Automation",
    description: "AI-powered Facebook messenger automation with chatbots, workflow builder, and intelligent response generation.",
    icon: MessageSquare,
    tags: ["AI", "Automation", "Chatbot", "Social Media"],
    featured: false,
    image: heroFacebookAutomation,
  },
  {
    slug: "ai-voice-agent",
    title: "AI Voice Agent",
    category: "AI & Voice",
    description: "Conversational AI voice agent for customer service automation with natural language understanding and response generation.",
    icon: Smartphone,
    tags: ["Voice AI", "NLU", "Customer Service", "Automation"],
    featured: false,
    image: heroAiVoiceAgent,
  },
  {
    slug: "instagram-automation",
    title: "Instagram Automation System",
    category: "Social Media Automation",
    description: "Automated Instagram engagement system with scheduled posting, DM automation, and analytics tracking.",
    icon: Instagram,
    tags: ["Social Media", "Automation", "Analytics", "Engagement"],
    featured: false,
    image: heroInstagramAutomation,
  },
  {
    slug: "accounts-tracking",
    title: "Accounts Tracking System",
    category: "Financial Management",
    description: "Comprehensive accounts and financial tracking platform with invoicing, expense management, and reporting.",
    icon: Calculator,
    tags: ["Finance", "Invoicing", "Reports", "Tracking"],
    featured: false,
    image: heroAccountsTracking,
  },
  {
    slug: "bike-mechanic-platform",
    title: "Hyderabad Bike Mechanic",
    category: "Service Platform",
    description: "On-demand bike repair service platform connecting mechanics with customers, featuring booking and tracking.",
    icon: Wrench,
    tags: ["Marketplace", "Booking", "Service", "Mobile"],
    featured: false,
    image: heroBikeMechanic,
  },
];

const Work = () => {
  const filters = ["All", "ERP", "AI", "Mobile", "E-commerce"] as const;
  type Filter = (typeof filters)[number];

  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return allProjects;

    const matches = (project: (typeof allProjects)[number]) => {
      const haystack = `${project.category} ${project.tags.join(" ")}`.toLowerCase();
      const needle = activeFilter.toLowerCase();
      return haystack.includes(needle);
    };

    return allProjects.filter(matches);
  }, [activeFilter]);

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
                Portfolio
              </motion.span>
              <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
                Selected <span className="gradient-text">Work</span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:mt-6 sm:text-lg">
                A collection of enterprise systems, AI platforms, and digital products
                I've designed and built — each solving real-world challenges at scale.
              </p>
            </div>
          </RevealSection>

          {/* Interactive Filter badges with animated indicator */}
          <RevealSection delay={0.2}>
            <div className="mb-8 flex flex-wrap justify-center gap-2 sm:mb-12 sm:gap-3">
              <LayoutGroup>
                {filters.map((filter) => (
                  <motion.button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className="relative rounded-full px-4 py-1.5 text-xs font-medium transition-colors sm:px-5 sm:py-2 sm:text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {filter === activeFilter && (
                      <motion.div
                        layoutId="activeFilterBg"
                        className="absolute inset-0 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        filter === activeFilter
                          ? "text-primary-foreground"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {filter}
                    </span>
                  </motion.button>
                ))}
              </LayoutGroup>
            </div>
          </RevealSection>

          {/* Projects Grid with animated transitions */}
          <LayoutGroup>
            <motion.div 
              layout
              className="grid gap-4 pb-16 sm:gap-6 md:grid-cols-2 md:gap-8 md:pb-20 lg:grid-cols-3"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.05,
                      layout: { duration: 0.3 }
                    }}
                  >
                    <Link to={`/projects/${project.slug}`}>
                      <GlowCard className="group h-full p-4 sm:p-6">
                        <div className="relative z-10 flex h-full flex-col">
                          {/* Featured badge */}
                          {project.featured && (
                            <motion.span 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute -right-1 -top-1 rounded-full bg-gradient-to-r from-primary to-accent px-2 py-0.5 text-[10px] font-medium text-primary-foreground sm:-right-2 sm:-top-2 sm:px-3 sm:py-1 sm:text-xs"
                            >
                              Featured
                            </motion.span>
                          )}

                          {/* Project Image with hover effect */}
                          <div className="mb-4 overflow-hidden rounded-lg sm:mb-6 sm:rounded-xl">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.4 }}
                            >
                              {project.image ? (
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="h-32 w-full object-cover sm:h-40"
                                />
                              ) : (
                                <div className="flex h-32 w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 sm:h-40">
                                  <project.icon className="h-12 w-12 text-primary/50 sm:h-14 sm:w-14" />
                                </div>
                              )}
                            </motion.div>
                          </div>

                          {/* Category */}
                          <span className="mb-1 text-xs font-medium text-primary sm:mb-2 sm:text-sm">
                            {project.category}
                          </span>

                          {/* Title */}
                          <h3 className="font-heading text-lg font-bold text-foreground transition-colors group-hover:text-primary sm:text-xl">
                            {project.title}
                          </h3>

                          {/* Description */}
                          <p className="mt-2 flex-grow text-xs text-muted-foreground sm:mt-3 sm:text-sm">
                            {project.description}
                          </p>

                          {/* Tags with stagger animation */}
                          <div className="mt-4 flex flex-wrap gap-1.5 sm:mt-6 sm:gap-2">
                            {project.tags.slice(0, 3).map((tag, tagIndex) => (
                              <motion.span
                                key={tag}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: tagIndex * 0.1 }}
                                className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground sm:px-3 sm:py-1 sm:text-xs"
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>

                          {/* Arrow with hover animation */}
                          <motion.div 
                            className="mt-4 flex items-center gap-2 text-primary sm:mt-6"
                            whileHover={{ x: 5 }}
                          >
                            <span className="text-xs font-medium sm:text-sm">View Case Study</span>
                            <motion.div
                              whileHover={{ rotate: 45 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            </motion.div>
                          </motion.div>
                        </div>
                      </GlowCard>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        </div>
      </section>
    </Layout>
  );
};

export default Work;
