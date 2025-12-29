// Updated: 2025-12-29
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface GlowButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  external?: boolean;
}

export const GlowButton = ({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
  external = false,
}: GlowButtonProps) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: "bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium",
    outline: "border border-primary/50 text-primary bg-transparent hover:bg-primary/10",
    ghost: "text-foreground hover:text-primary bg-transparent",
  };

  const baseClasses = `
    relative inline-flex items-center justify-center gap-2 
    rounded-xl font-heading tracking-tight
    transition-all duration-300 ease-out
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  const content = (
    <motion.span
      className={baseClasses}
      whileHover={{ 
        scale: 1.05,
        boxShadow: variant === "primary" 
          ? "0 0 40px hsl(180 100% 50% / 0.4), 0 0 80px hsl(280 100% 70% / 0.2)"
          : variant === "outline"
          ? "0 0 30px hsl(180 100% 50% / 0.3)"
          : "none"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return <Link to={href}>{content}</Link>;
  }

  return (
    <button onClick={onClick} className="appearance-none">
      {content}
    </button>
  );
};

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

export const MagneticButton = ({ children, className = "" }: MagneticButtonProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
    >
      <motion.div
        variants={{
          hover: {
            scale: 1.1,
          },
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
