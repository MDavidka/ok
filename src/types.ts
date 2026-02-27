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