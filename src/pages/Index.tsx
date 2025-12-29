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
      <StatsSection />
      <FeaturedProjects />
      <AboutPreview />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
