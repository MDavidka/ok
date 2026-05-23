import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines Tailwind CSS classes and handles conflicts.
 * @param inputs - Class values to combine.
 * @returns A single string of combined and de-conflicted class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a number as a currency string.
 * @param amount - The number to format.
 * @param currency - The currency code (e.g., "USD", "EUR").
 * @param locale - The locale string (e.g., "en-US", "de-DE").
 * @returns A formatted currency string.
 */
export function formatCurrency(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);