/**
 * Verdant Aura - Type Definitions
 * 
 * This file contains all shared TypeScript interfaces and type aliases 
 * used throughout the application to ensure type safety and consistency.
 */

export type PlantCategory = 'indoor' | 'outdoor' | 'succulents' | 'rare' | 'seeds';
export type CareLevel = 'easy' | 'moderate' | 'expert';
export type LightRequirement = 'low' | 'indirect' | 'bright' | 'direct';
export type WaterSchedule = 'daily' | 'weekly' | 'bi-weekly' | 'monthly';

/**
 * Represents a plant product in the catalog
 */
export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  price: number;
  description: string;
  category: PlantCategory;
  careLevel: CareLevel;
  light: LightRequirement;
  water: WaterSchedule;
  image: string;
  stock: number;
  isFeatured?: boolean;
  tags: string[];
}

/**
 * Represents an item within the shopping cart
 */
export interface CartItem {
  plantId: string;
  quantity: number;
  // We store a snapshot of the plant data to avoid unnecessary lookups
  // but primarily rely on the ID for state management
  plant: Plant;
}

/**
 * Navigation item for the header and footer
 */
export interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

/**
 * Global site configuration
 */
export interface SiteConfig {
  name: string;
  tagline: string;
  currency: {
    code: string;
    symbol: string;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socials: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
  };
}

/**
 * Mesh Routing Types
 */
export type RoutePath = '/' | '/shop' | '/care' | '/cart' | '/checkout';

export interface Route {
  path: RoutePath;
  component: (container: HTMLElement) => void;
  title: string;
}

/**
 * Application State
 */
export interface AppState {
  currentRoute: RoutePath;
  cart: CartItem[];
  isCartOpen: boolean;
  searchQuery: string;
  activeCategory: PlantCategory | 'all';
}

/**
 * Event Detail Types for Custom Events
 */
export interface CartUpdateDetail {
  itemCount: number;
  totalPrice: number;
}

export interface NavigationDetail {
  path: RoutePath;
}