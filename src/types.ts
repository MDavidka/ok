export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  navItems: NavItem[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}