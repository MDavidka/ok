import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines Tailwind CSS classes and other class strings, merging them intelligently.
 * This utility helps in conditionally applying and merging Tailwind classes without conflicts.
 *
 * @param inputs - A list of class values (strings, objects, arrays) to be combined.
 * @returns A single string of merged and optimized CSS classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
[/code]
[file]lib/utils.ts[/file][usedfor]utility functions[/usedfor]