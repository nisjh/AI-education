/**
 * Thin localStorage helpers. Everything in this app works without an account,
 * so saved items and preferences live in the browser until a backend exists.
 */

export const STORAGE_KEYS = {
  saved: "acrh.saved-items.v1",
  preferences: "acrh.preferences.v1",
  templateDrafts: "acrh.template-drafts.v1",
} as const;

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    // Corrupt or unreadable storage should never break the page.
    return fallback;
  }
}

export function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be full or blocked; the session still works in memory.
  }
}
