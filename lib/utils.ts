import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
[/code]
[file]lib/utils.ts[file][usedfor]Provides utility functions, most notably the `cn` helper, which combines `clsx` and `tailwind-merge` for conditionally joining Tailwind CSS classes with intelligent merging.[usedfor]