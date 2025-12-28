import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { RevealSection, StaggerContainer, StaggerItem } from "@/components/ui/RevealSection";
import { GlowCard } from "@/components/ui/GlowCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { projectMedia } from "@/lib/project-media";
import { ProcessFlow } from "@/components/ui/ProcessFlow";
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Lightbulb, Target } from "lucide-react";

const projectData: Record<string, {
  title: string;
  category: string;
  overview: string;
  industry: string;
  role: string;
  problem: string[];
  solution: string[];
  process: string[];
  results: string[];
  tools: string[];
}> = {
  "promode-agro-farms": {
    title: "Promode Agro Farms",
    category: "E-commerce + ERP + Mobile",
    overview: "A comprehensive agricultural commerce platform integrating e-commerce, enterprise resource planning, and mobile logistics management for streamlined operations.",
    industry: "Agri-Commerce",
    role: "End-to-end Product Designer & UI/UX Engineer",
    problem: [
      "Fragmented order management across multiple channels",
      "Inventory inaccuracies leading to stock issues",
      "Manual coordination between packers and riders",
      "Poor operational visibility and reporting",
    ],
    solution: [
      "Designed a unified ERP system covering inventory, orders, and logistics",
      "Created mobile apps for packers and riders with real-time updates",
      "Built comprehensive admin dashboard with analytics",
      "Implemented automated workflow orchestration",
    ],
    process: [
      "Extensive user research with farmers and operations staff",
      "Workflow mapping and pain point identification",
      "System-first UX design with scalability in mind",
      "Iterative prototyping and user testing",
    ],
    results: [
      "70% reduction in manual coordination errors",
      "50% faster order processing time",
      "Real-time visibility into all operations",
      "Scalable architecture supporting 10x growth",
    ],
    tools: ["Figma", "React Native", "Node.js", "PostgreSQL", "AWS"],
  },
  "inventory-erp-system": {
    title: "ERP / Inventory Platform",
    category: "Enterprise Platform",
    overview: "Enterprise resource planning system with real-time inventory tracking, analytics dashboards, and operational controls for businesses at scale.",
    industry: "Enterprise Software",
    role: "Lead Product Designer",
    problem: [
      "Complex legacy systems with poor usability",
      "Data silos across departments",
      "Lack of real-time visibility",
      "High training costs for new users",
    ],
    solution: [
      "Intuitive dashboard design with key metrics at a glance",
      "Unified data architecture with real-time sync",
      "Role-based interfaces for different user types",
      "Progressive disclosure for complex operations",
    ],
    process: [
      "Stakeholder interviews and requirements gathering",
      "Information architecture redesign",
      "Component library development",
      "Phased rollout with user feedback loops",
    ],
    results: [
      "40% reduction in user onboarding time",
      "Real-time data accuracy across all modules",
      "Improved decision-making with instant insights",
      "Reduced support tickets by 60%",
    ],
    tools: ["Figma", "React", "TypeScript", "Chart.js", "Tailwind CSS"],
  },
  "ai-automation-platform": {
    title: "AI Automation Platform",
    category: "AI & Automation",
    overview: "Intelligent automation system with AI agents, workflow orchestration, and business process optimization for enterprise efficiency.",
    industry: "AI & Automation",
    role: "Product Designer & UX Engineer",
    problem: [
      "Manual repetitive tasks consuming valuable time",
      "Inconsistent process execution",
      "Difficulty scaling operations",
      "Lack of intelligent decision support",
    ],
    solution: [
      "AI-powered workflow builder with visual interface",
      "Pre-built automation templates for common tasks",
      "Intelligent routing and decision trees",
      "Real-time monitoring and analytics",
    ],
    process: [
      "Analysis of existing manual workflows",
      "AI capability mapping to business needs",
      "User-friendly automation designer",
      "Integration with existing enterprise tools",
    ],
    results: [
      "80% reduction in manual task time",
      "99.9% process consistency",
      "5x faster workflow deployment",
      "Significant cost savings through automation",
    ],
    tools: ["Figma", "React", "Python", "OpenAI", "n8n"],
  },
  "pos-system": {
    title: "POS System",
    category: "Point of Sale",
    overview: "Modern point-of-sale solution designed for speed, simplicity, and seamless customer checkout experiences.",
    industry: "Retail Technology",
    role: "Product Designer",
    problem: [
      "Slow checkout processes frustrating customers",
      "Complex interface requiring extensive training",
      "Limited offline functionality",
      "Poor inventory integration",
    ],
    solution: [
      "Minimal, touch-optimized checkout interface",
      "Quick-access product search and categories",
      "Offline-first architecture with auto-sync",
      "Real-time inventory updates",
    ],
    process: [
      "Observational research at retail locations",
      "Checkout flow optimization",
      "Touch gesture mapping",
      "Performance optimization for speed",
    ],
    results: [
      "45% faster average checkout time",
      "90% reduction in training time",
      "Zero downtime with offline mode",
      "Real-time inventory accuracy",
    ],
    tools: ["Figma", "React", "Electron", "SQLite", "Stripe"],
  },
  "ai-voice-agent": {
    title: "AI Voice Agent",
    category: "AI & Voice",
    overview: "Conversational AI voice agent for automated customer service with natural language understanding.",
    industry: "AI Technology",
    role: "UX Designer & Integration Lead",
    problem: [
      "High volume of repetitive customer queries",
      "Long wait times for support",
      "Inconsistent service quality",
      "24/7 coverage challenges",
    ],
    solution: [
      "Natural language voice interface",
      "Context-aware conversation handling",
      "Seamless handoff to human agents",
      "Multi-language support",
    ],
    process: [
      "Customer conversation analysis",
      "Intent mapping and flow design",
      "Voice UI/UX optimization",
      "Continuous learning integration",
    ],
    results: [
      "60% of queries handled automatically",
      "24/7 customer support availability",
      "85% customer satisfaction rate",
      "Significant support cost reduction",
    ],
    tools: ["Figma", "Dialogflow", "Python", "Twilio", "GCP"],
  },
  "instagram-automation": {
    title: "Instagram Automation",
    category: "Social Media",
    overview: "Automated Instagram engagement and management platform for brands and influencers.",
    industry: "Social Media Marketing",
    role: "Product Designer",
    problem: [
      "Time-consuming manual engagement",
      "Inconsistent posting schedules",
      "Difficulty tracking performance",
      "DM management at scale",
    ],
    solution: [
      "Scheduled posting with optimal timing",
      "Automated engagement workflows",
      "Comprehensive analytics dashboard",
      "Smart DM automation",
    ],
    process: [
      "Social media manager interviews",
      "Workflow automation mapping",
      "Dashboard design with key metrics",
      "Safety-first automation rules",
    ],
    results: [
      "10x increase in engagement efficiency",
      "Consistent brand presence",
      "Data-driven content strategy",
      "Reduced management time by 70%",
    ],
    tools: ["Figma", "React", "Node.js", "Instagram API", "MongoDB"],
  },
  "accounts-tracking": {
    title: "Accounts Tracking",
    category: "Financial Management",
    overview: "Comprehensive financial tracking and management platform for businesses.",
    industry: "FinTech",
    role: "Product Designer",
    problem: [
      "Manual bookkeeping errors",
      "Scattered financial data",
      "Complex reporting requirements",
      "Poor cash flow visibility",
    ],
    solution: [
      "Automated transaction categorization",
      "Unified financial dashboard",
      "One-click report generation",
      "Real-time cash flow tracking",
    ],
    process: [
      "Accountant workflow analysis",
      "Financial data architecture",
      "Report template design",
      "Automation rule builder",
    ],
    results: [
      "90% reduction in manual entry",
      "Real-time financial visibility",
      "Audit-ready reports in seconds",
      "Improved cash flow management",
    ],
    tools: ["Figma", "React", "Python", "PostgreSQL", "Plaid"],
  },
  "bike-mechanic-platform": {
    title: "Hyderabad Bike Mechanic",
    category: "Service Platform",
    overview: "On-demand bike repair service platform connecting mechanics with customers.",
    industry: "Local Services",
    role: "Product Designer",
    problem: [
      "Difficulty finding reliable mechanics",
      "No transparent pricing",
      "Long wait times for service",
      "Poor service tracking",
    ],
    solution: [
      "Easy mechanic discovery and booking",
      "Transparent upfront pricing",
      "Real-time service tracking",
      "Review and rating system",
    ],
    process: [
      "Customer and mechanic research",
      "Booking flow optimization",
      "Pricing model design",
      "Trust and safety features",
    ],
    results: [
      "Average booking in under 2 minutes",
      "95% price accuracy",
      "Real-time tracking adoption",
      "4.8 average service rating",
    ],
    tools: ["Figma", "React Native", "Firebase", "Google Maps", "Stripe"],
  },
  "ptr-technology": {
    title: "PTR Technology",
    category: "Enterprise Platform",
    overview: "Corporate technology platform with advanced analytics, data visualization dashboards, and enterprise-grade infrastructure.",
    industry: "Enterprise Technology",
    role: "Lead Product Designer",
    problem: [
      "Outdated legacy systems hindering productivity",
      "Fragmented data across multiple platforms",
      "Lack of real-time insights for decision making",
      "Poor user adoption of existing tools",
    ],
    solution: [
      "Modern unified dashboard with key metrics",
      "Real-time data visualization and analytics",
      "Intuitive user interface with minimal learning curve",
      "Integrated platform connecting all business units",
    ],
    process: [
      "Stakeholder interviews and requirements gathering",
      "Legacy system audit and modernization planning",
      "User-centered design with iterative prototyping",
      "Phased rollout with continuous feedback",
    ],
    results: [
      "45% increase in user adoption",
      "Real-time visibility across all operations",
      "30% reduction in decision-making time",
      "Unified platform for 500+ employees",
    ],
    tools: ["Figma", "React", "TypeScript", "D3.js", "PostgreSQL"],
  },
  "packer-app": {
    title: "Packer App",
    category: "Mobile Operations",
    overview: "Mobile application for warehouse packers with package management, scanning, and order verification workflows.",
    industry: "Logistics & Operations",
    role: "Product Designer & UX Engineer",
    problem: [
      "Manual package verification causing errors",
      "Paper-based checklists slowing operations",
      "Difficulty tracking packer productivity",
      "Poor communication between warehouse and delivery",
    ],
    solution: [
      "Barcode scanning for instant verification",
      "Digital checklists with real-time sync",
      "Performance dashboards for packers and managers",
      "Seamless integration with rider app",
    ],
    process: [
      "Shadowing packers in warehouse operations",
      "Workflow optimization and bottleneck identification",
      "Mobile-first design for one-handed use",
      "Testing in live warehouse environment",
    ],
    results: [
      "90% reduction in packing errors",
      "2x faster order processing",
      "Real-time productivity tracking",
      "Seamless handoff to delivery riders",
    ],
    tools: ["Figma", "React Native", "Node.js", "PostgreSQL", "Firebase"],
  },
  "rider-app": {
    title: "Rider App",
    category: "Delivery & Logistics",
    overview: "Delivery rider mobile app with route optimization, navigation, order tracking, and real-time delivery status updates.",
    industry: "Logistics & Delivery",
    role: "Product Designer",
    problem: [
      "Inefficient routing causing delays",
      "Poor communication with customers",
      "Difficulty managing multiple deliveries",
      "Lack of real-time tracking for operations team",
    ],
    solution: [
      "AI-powered route optimization",
      "In-app navigation with live traffic updates",
      "Real-time delivery status for customers",
      "Batch delivery management",
    ],
    process: [
      "Rider interviews and ride-alongs",
      "Route optimization algorithm design",
      "Usability testing in real delivery scenarios",
      "Integration with warehouse and customer apps",
    ],
    results: [
      "25% reduction in delivery time",
      "Real-time tracking for all stakeholders",
      "95% on-time delivery rate",
      "Improved rider satisfaction scores",
    ],
    tools: ["Figma", "React Native", "Google Maps API", "Firebase", "Node.js"],
  },
  "facebook-automation": {
    title: "Facebook Automation Agents",
    category: "AI & Automation",
    overview: "AI-powered Facebook messenger automation with chatbots, workflow builder, and intelligent response generation.",
    industry: "Social Media Marketing",
    role: "Product Designer & AI Integration Lead",
    problem: [
      "High volume of repetitive customer inquiries",
      "Slow response times hurting engagement",
      "Manual DM management at scale",
      "Inconsistent brand messaging",
    ],
    solution: [
      "AI chatbot with natural language understanding",
      "Visual workflow builder for automation",
      "Intelligent response suggestions",
      "Unified inbox for all conversations",
    ],
    process: [
      "Analysis of common customer queries",
      "NLU model training and optimization",
      "Workflow builder UX design",
      "Integration with Facebook Graph API",
    ],
    results: [
      "80% of queries handled automatically",
      "5x faster response time",
      "Consistent brand messaging 24/7",
      "60% reduction in support workload",
    ],
    tools: ["Figma", "React", "Python", "OpenAI", "Facebook API"],
  },
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? projectData[slug] : null;
  const media = slug ? projectMedia[slug] : undefined;

  if (!project) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center px-6 pt-32">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-foreground">
              Project Not Found
            </h1>
            <p className="mt-4 text-muted-foreground">
              The project you're looking for doesn't exist.
            </p>
            <GlowButton href="/work" variant="primary" className="mt-8">
              <ArrowLeft className="h-4 w-4" />
              Back to Work
            </GlowButton>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="relative min-h-screen px-6 pt-32">
        <div className="mx-auto max-w-5xl">
          {/* Back button */}
          <RevealSection>
            <Link
              to="/work"
              className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Work
            </Link>
          </RevealSection>

          {/* Header */}
          <RevealSection delay={0.1}>
            <div className="mb-12">
              <span className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                {project.category}
              </span>
              <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl lg:text-6xl">
                {project.title}
              </h1>
              <p className="mt-6 text-xl text-muted-foreground">
                {project.overview}
              </p>
            </div>
          </RevealSection>

          {/* Hero image */}
          {media?.hero && (
            <RevealSection delay={0.15}>
              <GlowCard className="mb-12 p-2">
                <div className="relative z-10 overflow-hidden rounded-2xl">
                  <div className="aspect-[16/9]">
                    <img
                      src={media.hero.src}
                      alt={media.hero.alt}
                      loading="eager"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
                </div>
              </GlowCard>
            </RevealSection>
          )}

          {/* Gallery */}
          <ProjectGallery images={media?.gallery} />

          {/* Project Info */}
          <RevealSection delay={0.2}>
            <GlowCard className="mb-12 p-8">
              <div className="relative z-10 grid gap-6 sm:grid-cols-3">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Industry</h3>
                  <p className="mt-1 font-heading font-semibold text-foreground">
                    {project.industry}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Role</h3>
                  <p className="mt-1 font-heading font-semibold text-foreground">
                    {project.role}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Tools</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlowCard>
          </RevealSection>

          {/* Sections */}
          <StaggerContainer className="space-y-12 pb-20" staggerDelay={0.15}>
            {/* Problem */}
            <StaggerItem>
              <GlowCard className="p-8">
                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                      The Problem
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {project.problem.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-destructive" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </StaggerItem>

            {/* Solution */}
            <StaggerItem>
              <GlowCard className="p-8">
                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Lightbulb className="h-5 w-5" />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                      The Solution
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {project.solution.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </StaggerItem>

            {/* Process Flow Diagram */}
            <StaggerItem>
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <h2 className="font-heading text-2xl font-bold text-foreground">
                    Design Methodology
                  </h2>
                </div>
                <ProcessFlow />
                
                {/* Process Details */}
                <GlowCard className="p-8">
                  <div className="relative z-10">
                    <h3 className="mb-4 font-heading text-lg font-semibold text-foreground">
                      Project-Specific Process
                    </h3>
                    <ul className="space-y-3">
                      {project.process.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-primary">
                            {i + 1}
                          </span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowCard>
              </div>
            </StaggerItem>

            {/* Results */}
            <StaggerItem>
              <GlowCard className="p-8">
                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
                      <Target className="h-5 w-5" />
                    </div>
                    <h2 className="font-heading text-2xl font-bold text-foreground">
                      The Results
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {project.results.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </GlowCard>
            </StaggerItem>
          </StaggerContainer>

          {/* Navigation */}
          <RevealSection>
            <div className="flex justify-between border-t border-border pb-20 pt-12">
              <GlowButton href="/work" variant="outline">
                <ArrowLeft className="h-4 w-4" />
                All Projects
              </GlowButton>
              <GlowButton href="/contact" variant="primary">
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </GlowButton>
            </div>
          </RevealSection>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
