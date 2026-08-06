"use client";

import * as React from "react";

import { STORAGE_CHANGE_EVENT, writeJson } from "@/lib/storage";

/**
 * localStorage as an external store. Using useSyncExternalStore rather than an
 * effect means the server render and the first client render agree, saved items
 * stay in sync across tabs, and there is no setState-in-effect cascade.
 */

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(STORAGE_CHANGE_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(STORAGE_CHANGE_EVENT, onChange);
  };
}

function readRaw(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    // Storage can be blocked entirely; behave as if nothing was saved.
    return null;
  }
}

function parse<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/**
 * `fallback` must be referentially stable — pass a module-level constant, not an
 * inline literal, or the parsed value will change identity on every render.
 */
export function useLocalStorage<T>(key: string, fallback: T) {
  const raw = React.useSyncExternalStore(
    subscribe,
    () => readRaw(key),
    () => null,
  );

  const value = React.useMemo(() => parse(raw, fallback), [raw, fallback]);

  const setValue = React.useCallback(
    (next: T | ((current: T) => T)) => {
      // Updater functions read from storage, not from a captured render value, so
      // a write is never based on a stale snapshot from another tab.
      const resolved =
        typeof next === "function"
          ? (next as (current: T) => T)(parse(readRaw(key), fallback))
          : next;

      writeJson(key, resolved);
    },
    [key, fallback],
  );

  return [value, setValue] as const;
}

const noopSubscribe = () => () => {};

/** False during SSR and the hydrating render, true afterwards. */
export function useHydrated() {
  return React.useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}
