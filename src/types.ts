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