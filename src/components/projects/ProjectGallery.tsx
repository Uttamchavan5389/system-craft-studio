import { RevealSection } from "@/components/ui/RevealSection";
import { GlowCard } from "@/components/ui/GlowCard";
import type { ProjectImage } from "@/lib/project-media";

export const ProjectGallery = ({ images }: { images?: ProjectImage[] }) => {
  if (!images?.length) return null;

  return (
    <section className="mb-12">
      <RevealSection delay={0.2}>
        <div className="mb-6">
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Visuals
          </h2>
          <p className="mt-2 text-muted-foreground">
            Selected mockups and interface highlights.
          </p>
        </div>
      </RevealSection>

      <div className="grid gap-6 md:grid-cols-2">
        {images.map((img) => (
          <RevealSection key={img.alt} delay={0.25}>
            <GlowCard className="p-2">
              <div className="relative z-10 overflow-hidden rounded-2xl">
                <div className="aspect-[16/9]">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent" />
                {img.label && (
                  <div className="absolute bottom-3 left-3 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                    {img.label}
                  </div>
                )}
              </div>
            </GlowCard>
          </RevealSection>
        ))}
      </div>
    </section>
  );
};
