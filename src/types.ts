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

export interface HeroProps {
  name: string;
  title: string;
  description: string;
  image?: string;
}

export interface AboutProps {
  bio: string;
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  link?: string;
  github?: string;
}

export interface ProjectCardProps {
  project: Project;
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => void;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}