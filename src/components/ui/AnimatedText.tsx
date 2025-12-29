// Updated: 2025-12-29
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export const AnimatedText = ({ 
  children, 
  className = "", 
  delay = 0,
  as: Component = "span" 
}: AnimatedTextProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
    >
      <Component className={className}>{children}</Component>
    </motion.div>
  );
};

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

export const GradientText = ({ children, className = "" }: GradientTextProps) => {
  return (
    <span className={`bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export const TypewriterText = ({ text, className = "", delay = 0 }: TypewriterTextProps) => {
  const words = text.split(" ");
  
  return (
    <motion.span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: delay + i * 0.08,
            ease: [0.25, 0.4, 0.25, 1]
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
