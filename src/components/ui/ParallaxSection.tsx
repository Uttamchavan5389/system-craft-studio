// Updated: 2025-12-29
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  direction?: "up" | "down";
  className?: string;
  offset?: number;
}

/**
 * Parallax section component using Framer Motion scroll animations
 * Provides smooth parallax effects based on scroll position
 */
export const ParallaxSection = ({
  children,
  speed = 0.5,
  direction = "up",
  className = "",
  offset = 0,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up" ? [offset, -offset * speed] : [-offset * speed, offset]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxBackgroundProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Parallax background element that moves slower than foreground
 */
export const ParallaxBackground = ({
  children,
  speed = 0.3,
  className = "",
}: ParallaxBackgroundProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200 * speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxTextProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

/**
 * Parallax text that moves at different speed
 */
export const ParallaxText = ({
  children,
  speed = 0.2,
  className = "",
}: ParallaxTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);

  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

