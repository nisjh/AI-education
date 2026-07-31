import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Case-insensitive "does this text contain every word of the query" match. */
export function matchesQuery(query: string, ...haystack: (string | string[])[]) {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;

  const text = haystack.flat().join(" ").toLowerCase();
  return terms.every((term) => text.includes(term));
}

/** Stable, dependency-free id for list keys derived from content. */
export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
