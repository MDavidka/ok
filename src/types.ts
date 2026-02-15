export interface SiteConfig {
  title: string;
  description: string;
  author: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'appetizer' | 'main' | 'dessert' | 'drink';
}

export interface Reservation {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  message?: string;
}

export interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
}