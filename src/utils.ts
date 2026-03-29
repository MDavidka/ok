import { ComponentProps } from './types';

/**
 * Conditionally joins class names together.
 * Useful for Tailwind CSS class manipulation.
 * 
 * @param classes - An array of class names or falsy values
 * @returns A single string of space-separated class names
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Creates a base ComponentProps object.
 * 
 * @param className - Optional CSS class name
 * @returns A ComponentProps object
 */
export function createProps(className?: string): ComponentProps {
  return { className };
}

/**
 * Returns a random item from an array.
 * 
 * @param items - The array to pick from
 * @returns A random item from the array, or undefined if the array is empty
 */
export function getRandomItem<T>(items: T[]): T | undefined {
  if (!Array.isArray(items) || items.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}