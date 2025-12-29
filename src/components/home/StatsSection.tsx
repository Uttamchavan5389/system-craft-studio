import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { RevealSection } from "@/components/ui/RevealSection";
import { Building2, Brain, Rocket, Layers } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: 10,
    suffix: "+",
    label: "Enterprise ERP & POS Systems",
    description: "Production-ready platforms",
  },
  {
    icon: Brain,
    value: 5,
    suffix: "+",
    label: "AI Automation Platforms",
    description: "Intelligent workflows",
  },
  {
    icon: Rocket,
    value: 6,
    suffix: "",
    label: "Years Experience",
    description: "Senior-level expertise",
  },
  {
    icon: Layers,
    value: 50,
    suffix: "+",
    label: "Products Shipped",
    description: "Real production products",
  },
];

const AnimatedCounter = ({ value, suffix, isInView }: { value: number; suffix: string; isInView: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span className="gradient-text font-heading text-5xl font-bold md:text-6xl">
      {count}{suffix}
    </span>
  );
};

export const StatsSection = () => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealSection>
          <div className="mb-16 text-center">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-4 inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary"
            >
              Track Record
            </motion.span>
            <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
              Building at Scale
            </h2>
            <p className="mt-4 text-muted-foreground">
              Proven track record in enterprise systems
            </p>
          </div>
        </RevealSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <RevealSection key={stat.label} delay={index * 0.1}>
              <motion.div
                className="glass-card group relative p-8 text-center"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                <div className="relative z-10">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} isInView={isInView} />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground">
                    {stat.label}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
};
