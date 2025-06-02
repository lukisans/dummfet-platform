import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string | undefined) {
  if (!address || address.length < 10) {
    throw new Error("Invalid wallet address");
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
