// Updated: 2025-12-29
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Skill {
  name: string;
  value: number;
}

interface ProficiencyBarsProps {
  skills: Skill[];
}

export const ProficiencyBars = ({ skills }: ProficiencyBarsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="space-y-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{skill.name}</span>
            <span className="text-sm font-bold text-primary">{skill.value}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted/50">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={isInView ? { width: `${skill.value}%` } : {}}
              transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
};
