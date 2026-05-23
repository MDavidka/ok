/**
 * @file lib/types.ts
 * @description Defines core data structures for the phone shop, such as `Product`, `CartItem`, and `Category` interfaces, ensuring type safety across the application.
 */

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string; // URL to product image (PNG format)
  category: string; // References Category.name
  brand: string;
  stock: number;
  features: string[]; // e.g., ["6.1-inch display", "12MP camera"]
  status?: 'new' | 'sale' | 'default' | 'out-of-stock'; // For badges
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  // Add more user-related fields as needed, e.g., address, orders
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string; // Optional image for category display
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string; // e.g., lucide icon name
  items?: NavItem[]; // For sub-menus
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter?: string;
    github?: string;
  };
  mainNav: NavItem[];
  mobileNav: NavItem[];
}
[/code]
[file]lib/types.ts[/file][usedfor]shared TypeScript interfaces[/usedfor]