import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Grid background */}
      <div className="fixed inset-0 grid-background opacity-30" />
      
      {/* Ambient glow effects */}
      <div className="radial-glow fixed -top-[300px] left-1/4 h-[600px] w-[600px] animate-float" />
      <div className="radial-glow-purple fixed -bottom-[200px] right-1/4 h-[500px] w-[500px] animate-float animation-delay-200" />
      
      <Navigation />
      
      <main className="relative">
        {children}
      </main>
      
      <Footer />
    </div>
  );
};
