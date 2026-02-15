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
  github?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}