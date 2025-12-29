// Updated: 2025-12-29
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Users, PenTool, CheckCircle, Rocket } from "lucide-react";

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "Deep dive into business goals, user needs, and technical constraints",
    icon: Search,
  },
  {
    number: "02",
    title: "Research",
    description: "User interviews, competitive analysis, and data synthesis",
    icon: Users,
  },
  {
    number: "03",
    title: "Design",
    description: "Wireframes, prototypes, and iterative design exploration",
    icon: PenTool,
  },
  {
    number: "04",
    title: "Validate",
    description: "Usability testing and stakeholder feedback integration",
    icon: CheckCircle,
  },
  {
    number: "05",
    title: "Deliver",
    description: "Design handoff, documentation, and implementation support",
    icon: Rocket,
  },
];

export const ProcessFlow = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {processSteps.map((step, index) => (
          <motion.div
            key={step.number}
            className="glass-card group relative overflow-hidden p-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* Connecting line for desktop */}
            {index < processSteps.length - 1 && (
              <div className="absolute -right-2 top-1/2 hidden h-0.5 w-4 bg-gradient-to-r from-primary/50 to-transparent lg:block" />
            )}
            
            {/* Step number */}
            <motion.span
              className="mb-4 block font-heading text-4xl font-bold text-primary/30"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            >
              {step.number}
            </motion.span>
            
            {/* Icon */}
            <motion.div
              className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20"
              whileHover={{ rotate: 5, scale: 1.1 }}
            >
              <step.icon className="h-5 w-5" />
            </motion.div>
            
            {/* Title */}
            <h3 className="mb-2 font-heading text-lg font-bold text-foreground">
              {step.title}
            </h3>
            
            {/* Description */}
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
            
            {/* Hover glow */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
