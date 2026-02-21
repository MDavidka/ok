export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  navItems: NavItem[];
  footerText: string;
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

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}