import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formater = new Intl.NumberFormat("en-us", {
  style: "currency",
  currency: "EGP",
  minimumFractionDigits: 0, // No decimal places
  maximumFractionDigits: 0, // No decimal places
});
