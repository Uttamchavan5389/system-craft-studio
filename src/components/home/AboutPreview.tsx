import { motion } from "framer-motion";
import { RevealSection } from "@/components/ui/RevealSection";
import { GlowButton } from "@/components/ui/GlowButton";
import { Palette, Code, Lightbulb, Rocket } from "lucide-react";

const skills = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive, user-centered interfaces that delight and engage",
  },
  {
    icon: Code,
    title: "Frontend Development",
    description: "Building responsive, performant web applications with modern tech",
  },
  {
    icon: Lightbulb,
    title: "Product Strategy",
    description: "Translating business goals into actionable product roadmaps",
  },
  {
    icon: Rocket,
    title: "Rapid Prototyping",
    description: "From concept to clickable prototype in record time",
  },
];

export const AboutPreview = () => {
  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left side - Text content */}
          <RevealSection>
            <div className="flex flex-col justify-center">
              <span className="mb-4 inline-block w-fit rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                About Me
              </span>
              <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
                Crafting Digital
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  {" "}Experiences
                </span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                I'm Uttam Chavan, a passionate Product Designer and UI/UX Engineer 
                with a focus on creating meaningful digital experiences. I combine 
                design thinking with technical expertise to build products that 
                users love and businesses thrive on.
              </p>
              <p className="mt-4 text-muted-foreground">
                With experience across e-commerce, enterprise platforms, and mobile 
                applications, I bring a holistic approach to every project—from 
                research and strategy to pixel-perfect implementation.
              </p>
              <GlowButton href="/about" variant="outline" className="mt-8 w-fit">
                Learn More About Me
              </GlowButton>
            </div>
          </RevealSection>

          {/* Right side - Skills grid */}
          <RevealSection delay={0.2}>
            <div className="grid gap-4 sm:grid-cols-2">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="relative z-10">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20">
                      <skill.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">
                      {skill.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {skill.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
};
