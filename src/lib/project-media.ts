import heroPromodeAgro from "@/assets/hero-promode-agro.jpg";
import heroErpDashboard from "@/assets/hero-erp-dashboard.jpg";
import heroAiPlatform from "@/assets/hero-ai-platform.jpg";
import heroPosSystem from "@/assets/hero-pos-system.jpg";

export type ProjectImage = {
  src: string;
  alt: string;
  label?: string;
};

export type ProjectMedia = {
  hero?: ProjectImage;
  gallery?: ProjectImage[];
};

export const projectMedia: Record<string, ProjectMedia> = {
  "promode-agro-farms": {
    hero: {
      src: heroPromodeAgro,
      alt: "Promode Agro Farms case study hero image showing ERP dashboard and mobile logistics app mockups",
      label: "Hero",
    },
    gallery: [
      {
        src: heroPromodeAgro,
        alt: "Promode Agro Farms mockup showing e-commerce storefront and ERP dashboard UI",
        label: "Dashboard + Mobile",
      },
    ],
  },
  "inventory-erp-system": {
    hero: {
      src: heroErpDashboard,
      alt: "ERP and inventory platform case study hero image with analytics dashboard mockup",
      label: "Hero",
    },
    gallery: [
      {
        src: heroErpDashboard,
        alt: "ERP dashboard mockup featuring inventory analytics and operations panels",
        label: "Analytics Dashboard",
      },
    ],
  },
  "ai-automation-platform": {
    hero: {
      src: heroAiPlatform,
      alt: "AI automation platform case study hero image with workflow orchestration interface mockup",
      label: "Hero",
    },
    gallery: [
      {
        src: heroAiPlatform,
        alt: "AI automation workflow builder mockup with nodes and integrations",
        label: "Workflow Builder",
      },
    ],
  },
  "pos-system": {
    hero: {
      src: heroPosSystem,
      alt: "POS system case study hero image showing checkout terminal and admin dashboard mockups",
      label: "Hero",
    },
    gallery: [
      {
        src: heroPosSystem,
        alt: "POS terminal checkout UI mockup and retail dashboard",
        label: "Terminal + Admin",
      },
    ],
  },
};
