export interface SiteConfig {
  title: string;
  description: string;
  author: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export interface WelcomeMessageProps {
  name: string;
  title: string;
  description: string;
}