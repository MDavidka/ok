/**
 * Defines common TypeScript interfaces and types used throughout the webshop application.
 * This includes types for products, cart items, user data, and API responses,
 * ensuring type safety and consistency.
 */

/**
 * Represents a single product variant, e.g., a specific color or size.
 */
export interface ProductVariant {
  type: string; // e.g., "color", "size"
  value: string; // e.g., "Red", "Large"
  additionalPrice?: number; // Price adjustment for this variant, if any
}

/**
 * Represents a product in the webshop.
 */
export interface Product {
  _id: string; // Unique identifier for the product (MongoDB _id)
  name: string;
  description: string;
  price: number;
  imageUrl: string; // URL to the main product image
  category: string;
  stock: number;
  rating?: number; // Average rating, e.g., 1-5 stars
  reviewsCount?: number; // Number of reviews
  variants?: ProductVariant[]; // Available product variants
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

/**
 * Represents an item in the user's shopping cart.
 */
export interface CartItem {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  selectedVariant?: ProductVariant; // The specific variant chosen for this cart item
}

/**
 * Represents a user's address information.
 */
export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

/**
 * Represents a user of the webshop.
 */
export interface User {
  _id: string; // Unique identifier for the user
  email: string;
  firstName?: string;
  lastName?: string;
  address?: Address;
  phone?: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

/**
 * Generic API response structure.
 * @template T The type of the data returned in a successful response.
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Defines the structure for site-wide configuration.
 */
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter?: string;
    github?: string;
    // Add other social media or external links as needed
  };
}

/**
 * Defines the structure for a navigation item in the header/footer.
 */
export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}
[/code]
[file]src/types.ts[file][usedfor]Defines common TypeScript interfaces and types used throughout the webshop application. This includes types for products, cart items, user data, and API responses, ensuring type safety and consistency.[usedfor]