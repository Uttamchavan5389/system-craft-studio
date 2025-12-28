import { motion } from "framer-motion";
import { RevealSection } from "@/components/ui/RevealSection";
import { GlowButton } from "@/components/ui/GlowButton";
import { ArrowRight, Zap } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <RevealSection>
          <div className="glass-card relative overflow-hidden p-12 text-center md:p-20">
            {/* Background effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/20 blur-3xl" />

            <div className="relative z-10">
              {/* Icon */}
              <motion.div
                className="mx-auto mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent"
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Zap className="h-8 w-8 text-primary-foreground" />
              </motion.div>

              {/* Heading */}
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                Let's build intelligent systems
                <br />
                <span className="gradient-text">that actually work.</span>
              </h2>

              {/* Description */}
              <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
                Ready to transform your ideas into scalable, production-ready products? 
                Let's collaborate and create something exceptional.
              </p>

              {/* CTA */}
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <GlowButton href="/contact" variant="primary" size="lg">
                  Start a Project
                  <ArrowRight className="h-5 w-5" />
                </GlowButton>
                <GlowButton href="/work" variant="outline" size="lg">
                  Explore Work
                </GlowButton>
              </div>
            </div>
          </div>
        </RevealSection>
      </div>
    </section>
  );
};
