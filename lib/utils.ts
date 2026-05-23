import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
[/code]
[file]lib/utils.ts[/file]
[usedfor]utility[/usedfor]