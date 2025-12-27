import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { RevealSection, StaggerContainer, StaggerItem } from "@/components/ui/RevealSection";
import { GlowCard } from "@/components/ui/GlowCard";
import { ArrowUpRight, ShoppingCart, Database, Bot, Smartphone, CreditCard, Instagram, Calculator, Wrench, Building, Package, Truck, MessageSquare } from "lucide-react";
import heroPtrTechnology from "@/assets/hero-ptr-technology.jpg";
import heroPackerApp from "@/assets/hero-packer-app.jpg";
import heroRiderApp from "@/assets/hero-rider-app.jpg";
import heroFacebookAutomation from "@/assets/hero-facebook-automation.jpg";

const allProjects = [
  {
    slug: "promode-agro-farms",
    title: "Promode Agro Farms",
    category: "E-commerce + ERP + Mobile",
    description: "Full-stack agricultural commerce platform with integrated ERP, inventory management, and mobile logistics for packers and riders.",
    icon: ShoppingCart,
    tags: ["ERP", "E-commerce", "Mobile", "Logistics"],
    featured: true,
    image: null,
  },
  {
    slug: "inventory-erp-system",
    title: "ERP / Inventory Platform",
    category: "Enterprise Platform",
    description: "Comprehensive enterprise resource planning system with real-time inventory tracking, analytics dashboards, and operational controls.",
    icon: Database,
    tags: ["Dashboard", "Analytics", "Inventory", "Operations"],
    featured: true,
    image: null,
  },
  {
    slug: "ai-automation-platform",
    title: "AI Automation Platform",
    category: "AI & Automation",
    description: "Intelligent automation system with AI agents, workflow orchestration, and business process optimization.",
    icon: Bot,
    tags: ["AI Agents", "Automation", "Workflows", "Integration"],
    featured: true,
    image: null,
  },
  {
    slug: "pos-system",
    title: "POS System",
    category: "Point of Sale",
    description: "Fast, intuitive point-of-sale terminal with minimal cognitive load, optimized checkout flows, and admin management.",
    icon: CreditCard,
    tags: ["Checkout", "Terminal", "Retail", "Payments"],
    featured: false,
    image: null,
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
    image: null,
  },
  {
    slug: "instagram-automation",
    title: "Instagram Automation System",
    category: "Social Media Automation",
    description: "Automated Instagram engagement system with scheduled posting, DM automation, and analytics tracking.",
    icon: Instagram,
    tags: ["Social Media", "Automation", "Analytics", "Engagement"],
    featured: false,
    image: null,
  },
  {
    slug: "accounts-tracking",
    title: "Accounts Tracking System",
    category: "Financial Management",
    description: "Comprehensive accounts and financial tracking platform with invoicing, expense management, and reporting.",
    icon: Calculator,
    tags: ["Finance", "Invoicing", "Reports", "Tracking"],
    featured: false,
    image: null,
  },
  {
    slug: "bike-mechanic-platform",
    title: "Hyderabad Bike Mechanic",
    category: "Service Platform",
    description: "On-demand bike repair service platform connecting mechanics with customers, featuring booking and tracking.",
    icon: Wrench,
    tags: ["Marketplace", "Booking", "Service", "Mobile"],
    featured: false,
    image: null,
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
      <section className="relative min-h-screen px-6 pt-32">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <RevealSection>
            <div className="mb-16 text-center">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
              >
                Portfolio
              </motion.span>
              <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                Selected <span className="gradient-text">Work</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                A collection of enterprise systems, AI platforms, and digital products
                I've designed and built — each solving real-world challenges at scale.
              </p>
            </div>
          </RevealSection>

          {/* Filter badges */}
          <RevealSection delay={0.2}>
            <div className="mb-12 flex flex-wrap justify-center gap-3">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    filter === activeFilter
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </RevealSection>
        

          {/* Projects Grid */}
          <StaggerContainer className="grid gap-8 pb-20 md:grid-cols-2 lg:grid-cols-3" staggerDelay={0.1}>
            {filteredProjects.map((project) => (
              <StaggerItem key={project.slug}>
                <Link to={`/projects/${project.slug}`}>
                  <GlowCard className="group h-full p-6">
                    <div className="relative z-10 flex h-full flex-col">
                      {/* Featured badge */}
                      {project.featured && (
                        <span className="absolute -right-2 -top-2 rounded-full bg-gradient-to-r from-primary to-accent px-3 py-1 text-xs font-medium text-primary-foreground">
                          Featured
                        </span>
                      )}

                      {/* Project Image or Icon */}
                      {project.image ? (
                        <div className="mb-6 overflow-hidden rounded-xl">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                      ) : (
                        <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 text-primary transition-transform duration-300 group-hover:scale-110">
                          <project.icon className="h-7 w-7" />
                        </div>
                      )}

                      {/* Category */}
                      <span className="mb-2 text-sm font-medium text-primary">
                        {project.category}
                      </span>

                      {/* Title */}
                      <h3 className="font-heading text-xl font-bold text-foreground transition-colors group-hover:text-primary">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="mt-3 flex-grow text-sm text-muted-foreground">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="mt-6 flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Arrow */}
                      <div className="mt-6 flex items-center gap-2 text-primary">
                        <span className="text-sm font-medium">View Case Study</span>
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </div>
                    </div>
                  </GlowCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </Layout>
  );
};

export default Work;
