import { 
  Plant, 
  CartItem, 
  CartUpdateDetail, 
  RoutePath, 
  NavigationDetail 
} from './types';

/**
 * Verdant Aura - Utility Functions
 * 
 * This file provides shared logic for state management, formatting,
 * and navigation to ensure consistency across the application.
 */

const CART_STORAGE_KEY = 'verdant_aura_cart_v1';

/**
 * Formats a numeric value into a currency string based on site locale.
 * Defaults to USD for this implementation.
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

/**
 * Retrieves the current cart state from localStorage.
 * Returns an empty array if no cart exists or if parsing fails.
 */
export const getCart = (): CartItem[] => {
  const stored = localStorage.getItem(CART_STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored) as CartItem[];
  } catch (error) {
    console.error('Verdant Aura: Failed to parse cart data', error);
    return [];
  }
};

/**
 * Persists the cart state to localStorage and notifies the application
 * via a custom 'cart-updated' event.
 */
export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  
  const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + (item.plant.price * item.quantity), 0);

  const detail: CartUpdateDetail = { itemCount, totalPrice };
  
  window.dispatchEvent(new CustomEvent('cart-updated', { detail }));
};

/**
 * Adds a plant to the cart. If the plant already exists, increments quantity.
 */
export const addToCart = (plant: Plant): void => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.plantId === plant.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({
      plantId: plant.id,
      quantity: 1,
      plant: plant
    });
  }

  saveCart(cart);
};

/**
 * Removes a specific plant from the cart entirely.
 */
export const removeFromCart = (plantId: string): void => {
  const cart = getCart().filter(item => item.plantId !== plantId);
  saveCart(cart);
};

/**
 * Updates the quantity of a specific item in the cart.
 * If quantity is 0 or less, the item is removed.
 */
export const updateQuantity = (plantId: string, quantity: number): void => {
  if (quantity <= 0) {
    removeFromCart(plantId);
    return;
  }

  const cart = getCart();
  const item = cart.find(i => i.plantId === plantId);
  
  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
};

/**
 * Calculates the total price of all items in the cart.
 */
export const getCartTotal = (): number => {
  return getCart().reduce((total, item) => total + (item.plant.price * item.quantity), 0);
};

/**
 * Calculates the total number of items (sum of quantities) in the cart.
 */
export const getCartCount = (): number => {
  return getCart().reduce((count, item) => count + item.quantity, 0);
};

/**
 * Triggers a client-side navigation change.
 * Updates the browser history and dispatches a 'navigation-changed' event
 * for the mesh router in main.ts to handle.
 */
export const navigateTo = (path: RoutePath): void => {
  if (window.location.pathname === path) return;
  
  window.history.pushState({}, '', path);
  
  const detail: NavigationDetail = { path };
  window.dispatchEvent(new CustomEvent('navigation-changed', { detail }));
  
  // Scroll to top on navigation
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

/**
 * Simple slugification for URL-friendly strings.
 */
export const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w-]+/g, '')  // Remove all non-word chars
    .replace(/--+/g, '-');    // Replace multiple - with single -
};

/**
 * Debounce helper for performance-heavy operations like search filtering.
 */
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

/**
 * Generates a random ID for temporary session use if needed.
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};