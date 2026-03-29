import { ComponentProps } from './types';

/**
 * Merges multiple class names into a single string, filtering out falsy values.
 * Useful for conditionally applying Tailwind CSS classes.
 * 
 * @param classes - An array of class names or falsy values
 * @returns A space-separated string of valid class names
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Helper to create standard component props.
 * 
 * @param className - Optional CSS class name string
 * @returns A ComponentProps object
 */
export function createProps(className?: string): ComponentProps {
  return { className };
}

/**
 * Returns a random item from the provided array.
 * Fits perfectly with the "Randomify" theme!
 * 
 * @param items - An array of items of type T
 * @returns A single random item of type T, or undefined if the array is empty/invalid
 */
export function getRandomItem<T>(items: T[]): T | undefined {
  if (!Array.isArray(items) || items.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}