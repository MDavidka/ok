export interface NavItem {
  label: string;
  href: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  navItems: NavItem[];
}

export interface ComponentProps {
  className?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon?: string;
}

export interface ButtonProps extends ComponentProps {
  label: string;
  onClick?: (e: MouseEvent) => void;
  variant?: 'primary' | 'secondary' | 'outline';
  href?: string;
}