export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  url: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string; // e.g., a Tailwind class for an icon
}

export interface PricingPlan {
  name: string;
  price: number;
  currency: string;
  features: string[];
  isRecommended?: boolean;
  buttonText: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}