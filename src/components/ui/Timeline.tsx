// Updated: 2025-12-29
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  description: string;
  type: "work" | "education";
}

interface TimelineProps {
  items: TimelineItem[];
}

export const Timeline = ({ items }: TimelineProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="relative">
      {/* Center line */}
      <motion.div
        className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-primary via-accent to-primary/30"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />

      <div className="space-y-12">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          
          return (
            <motion.div
              key={index}
              className={`relative flex items-center ${isLeft ? "flex-row" : "flex-row-reverse"}`}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Content */}
              <div className={`w-5/12 ${isLeft ? "pr-8 text-right" : "pl-8 text-left"}`}>
                <motion.div
                  className="glass-card p-6"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="mb-2 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                    {item.year}
                  </span>
                  <h3 className="font-heading text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {item.company}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              </div>

              {/* Center icon */}
              <div className="absolute left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center">
                <motion.div
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.3 }}
                  whileHover={{ scale: 1.2 }}
                >
                  {item.type === "work" ? (
                    <Briefcase className="h-5 w-5 text-primary" />
                  ) : (
                    <GraduationCap className="h-5 w-5 text-primary" />
                  )}
                </motion.div>
              </div>

              {/* Empty space for the other side */}
              <div className="w-5/12" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// Mobile-friendly version
export const TimelineMobile = ({ items }: TimelineProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative pl-8">
      {/* Left line */}
      <motion.div
        className="absolute left-3 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-primary/30"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
      />

      <div className="space-y-8">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          >
            {/* Icon */}
            <motion.div
              className="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background"
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
            >
              {item.type === "work" ? (
                <Briefcase className="h-4 w-4 text-primary" />
              ) : (
                <GraduationCap className="h-4 w-4 text-primary" />
              )}
            </motion.div>

            {/* Content */}
            <motion.div
              className="glass-card ml-4 p-5"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <span className="mb-2 inline-block rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                {item.year}
              </span>
              <h3 className="font-heading text-lg font-bold text-foreground">
                {item.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">
                {item.company}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
