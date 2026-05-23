export interface Phone {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  imageUrls: string[]; // Array of image URLs for the phone
  storageOptions: string[]; // e.g., ['128GB', '256GB', '512GB']
  colorOptions: string[]; // e.g., ['Black', 'White', 'Blue']
  // Add any other relevant properties like specs, availability, etc.
}

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  mainNav: NavItem[];
  links?: {
    twitter?: string;
    github?: string;
  };
}
[/code]
[file]lib/types.ts[file][usedfor]Contains shared TypeScript interfaces and types used across the application, such as the `Phone` interface for product data, ensuring type safety and consistency.[usedfor]