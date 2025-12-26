import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "mixed";
}

export const GlowCard = ({ 
  children, 
  className = "",
  glowColor = "mixed"
}: GlowCardProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const glowGradients = {
    cyan: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), hsl(180 100% 50% / 0.15), transparent 40%)",
    purple: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), hsl(280 100% 70% / 0.15), transparent 40%)",
    mixed: "radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), hsl(180 100% 50% / 0.1), hsl(280 100% 70% / 0.1), transparent 40%)",
  };

  return (
    <motion.div
      className={`glass-card group relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      style={{
        "--mouse-x": `${mousePosition.x}px`,
        "--mouse-y": `${mousePosition.y}px`,
      } as React.CSSProperties}
    >
      {/* Glow effect on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: glowGradients[glowColor],
        }}
      />
      
      {/* Border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, hsl(180 100% 50% / 0.3), hsl(280 100% 70% / 0.3))`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "xor",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {children}
    </motion.div>
  );
};

interface HoverScaleCardProps {
  children: ReactNode;
  className?: string;
}

export const HoverScaleCard = ({ children, className = "" }: HoverScaleCardProps) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};
