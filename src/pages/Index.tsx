import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { AboutPreview } from "@/components/home/AboutPreview";
import { CTASection } from "@/components/home/CTASection";
import { Testimonials } from "@/components/ui/Testimonials";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <div className="space-y-0">
        <StatsSection />
        <FeaturedProjects />
        <AboutPreview />
        <Testimonials />
        <CTASection />
      </div>
    </Layout>
  );
};

export default Index;
