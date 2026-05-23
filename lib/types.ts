export interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
}

export interface PhoneProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string; // URL to PNG image
  category: string; // e.g., "Smartphone", "Feature Phone"
  brand: string;
  storage: string; // e.g., "128GB", "256GB"
  color: string;
  inStock: boolean;
  rating?: number; // Optional rating
  reviewsCount?: number; // Optional number of reviews
}

export interface CartItem {
  product: PhoneProduct;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
}