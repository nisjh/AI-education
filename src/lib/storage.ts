/**
 * Thin localStorage helpers. Everything in this app works without an account,
 * so preferences live in the browser; anything belonging to a teacher is
 * written under an account-scoped key (see `useAccountStorage`).
 */

export const STORAGE_KEYS = {
  saved: "acrh.saved-items.v1",
  preferences: "acrh.preferences.v1",
  templateDrafts: "acrh.template-drafts.v1",
} as const;

/**
 * Fired after any write so `useLocalStorage` re-reads. Writes that go around
 * the hook — signing in, signing out, deleting an account — must notify too,
 * or the header keeps rendering the previous session until a reload.
 */
export const STORAGE_CHANGE_EVENT = "acrh:local-storage";

export function notifyStorageChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(STORAGE_CHANGE_EVENT));
}

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

  notifyStorageChange();
}

export function removeKey(key: string) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(key);
  } catch {
    // Nothing useful to do if storage refuses the delete.
  }

  notifyStorageChange();
}
