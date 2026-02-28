export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  navItems: NavItem[];
}

export interface ComponentProps {
  className?: string;
}

export interface TimeSlot {
    time: string;
    available: boolean;
}

export interface Project {
    name: string;
    description: string;
    image: string;
    link: string;
}

export interface ProjectsProps extends ComponentProps {
    projects: Project[];
}

export interface Testimonial {
    author: string;
    text: string;
    image: string;
}

export interface TestimonialsProps extends ComponentProps {
    testimonials: Testimonial[];
}

export interface HeroProps extends ComponentProps {
    title: string;
    subtitle: string;
    image?: string;
    ctaText?: string;
    ctaLink?: string;
}

export interface AboutProps extends ComponentProps {
    title: string;
    content: string;
    image?: string;
}

export interface CardProps extends ComponentProps {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

export interface ButtonProps extends ComponentProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export interface PricingTier {
    name: string;
    price: number;
    features: string[];
    ctaText: string;
    ctaLink: string;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export interface FeatureProps extends ComponentProps {
    title: string;
    description: string;
    icon?: string; // e.g., a FontAwesome class or path to an SVG
}

export interface PricingTableProps extends ComponentProps {
    tiers: PricingTier[];
}

export interface BlogPost {
    title: string;
    date: string;
    content: string;
    imageUrl?: string;
}

export interface BlogPostProps extends ComponentProps {
    post: BlogPost;
}