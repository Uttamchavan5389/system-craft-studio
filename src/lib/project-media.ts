import heroPromodeAgro from "@/assets/hero-promode-agro.jpg";
import heroErpDashboard from "@/assets/hero-erp-dashboard.jpg";
import heroAiPlatform from "@/assets/hero-ai-platform.jpg";
import heroPosSystem from "@/assets/hero-pos-system.jpg";
import heroPtrTechnology from "@/assets/hero-ptr-technology.jpg";
import heroPackerApp from "@/assets/hero-packer-app.jpg";
import heroRiderApp from "@/assets/hero-rider-app.jpg";
import heroFacebookAutomation from "@/assets/hero-facebook-automation.jpg";
import heroAiVoiceAgent from "@/assets/hero-ai-voice-agent.jpg";
import heroInstagramAutomation from "@/assets/hero-instagram-automation.jpg";
import heroAccountsTracking from "@/assets/hero-accounts-tracking.jpg";
import heroBikeMechanic from "@/assets/hero-bike-mechanic.jpg";

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
  "ptr-technology": {
    hero: {
      src: heroPtrTechnology,
      alt: "PTR Technology enterprise platform dashboard with analytics and data visualizations",
      label: "Hero",
    },
    gallery: [
      {
        src: heroPtrTechnology,
        alt: "PTR Technology corporate platform interface mockup",
        label: "Dashboard",
      },
    ],
  },
  "packer-app": {
    hero: {
      src: heroPackerApp,
      alt: "Packer mobile app for warehouse operations and package management",
      label: "Hero",
    },
    gallery: [
      {
        src: heroPackerApp,
        alt: "Packer app mobile interface with checklist and scan features",
        label: "Mobile App",
      },
    ],
  },
  "rider-app": {
    hero: {
      src: heroRiderApp,
      alt: "Rider delivery app with navigation and route optimization",
      label: "Hero",
    },
    gallery: [
      {
        src: heroRiderApp,
        alt: "Rider app mobile interface with map and delivery tracking",
        label: "Mobile App",
      },
    ],
  },
  "facebook-automation": {
    hero: {
      src: heroFacebookAutomation,
      alt: "Facebook automation platform with AI chatbot and workflow builder",
      label: "Hero",
    },
    gallery: [
      {
        src: heroFacebookAutomation,
        alt: "Facebook messenger automation dashboard with chat nodes",
        label: "Automation Dashboard",
      },
    ],
  },
  "ai-voice-agent": {
    hero: {
      src: heroAiVoiceAgent,
      alt: "AI Voice Agent platform with conversational AI and voice interface",
      label: "Hero",
    },
    gallery: [
      {
        src: heroAiVoiceAgent,
        alt: "AI Voice Agent dashboard with call analytics",
        label: "Voice Dashboard",
      },
    ],
  },
  "instagram-automation": {
    hero: {
      src: heroInstagramAutomation,
      alt: "Instagram automation platform with scheduling and engagement tools",
      label: "Hero",
    },
    gallery: [
      {
        src: heroInstagramAutomation,
        alt: "Instagram automation dashboard with post scheduler",
        label: "Automation Dashboard",
      },
    ],
  },
  "accounts-tracking": {
    hero: {
      src: heroAccountsTracking,
      alt: "Accounts tracking platform with financial dashboard and analytics",
      label: "Hero",
    },
    gallery: [
      {
        src: heroAccountsTracking,
        alt: "Financial tracking dashboard with reports",
        label: "Finance Dashboard",
      },
    ],
  },
  "bike-mechanic-platform": {
    hero: {
      src: heroBikeMechanic,
      alt: "Bike mechanic service platform connecting customers with mechanics",
      label: "Hero",
    },
    gallery: [
      {
        src: heroBikeMechanic,
        alt: "Bike mechanic mobile app with booking interface",
        label: "Mobile App",
      },
    ],
  },
};
