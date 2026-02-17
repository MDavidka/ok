export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  navItems: NavItem[];
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
  github?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}