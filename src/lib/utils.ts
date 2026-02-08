import { clsx, type ClassValue } from "clsx";

/**
 * Simple className merge helper.
 * Fără tailwind-merge, fără shadcn.
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}