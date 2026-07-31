"use client";

import * as React from "react";

import { useHydrated, useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS } from "@/lib/storage";
import type { SavedItem, SavedKind } from "@/lib/types";

const EMPTY: SavedItem[] = [];

interface SavedItemsContextValue {
  items: SavedItem[];
  /** False until the browser store has been read, so the UI can avoid a flash. */
  ready: boolean;
  isSaved: (kind: SavedKind, id: string) => boolean;
  toggle: (kind: SavedKind, id: string) => void;
  remove: (kind: SavedKind, id: string) => void;
  clear: () => void;
  countByKind: (kind: SavedKind) => number;
}

const SavedItemsContext = React.createContext<SavedItemsContextValue | null>(null);

export function SavedItemsProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useLocalStorage<SavedItem[]>(STORAGE_KEYS.saved, EMPTY);
  const ready = useHydrated();

  const value = React.useMemo<SavedItemsContextValue>(
    () => ({
      items,
      ready,
      isSaved: (kind, id) =>
        items.some((item) => item.kind === kind && item.id === id),
      toggle: (kind, id) =>
        setItems((current) =>
          current.some((item) => item.kind === kind && item.id === id)
            ? current.filter((item) => !(item.kind === kind && item.id === id))
            : [{ kind, id, savedAt: Date.now() }, ...current],
        ),
      remove: (kind, id) =>
        setItems((current) =>
          current.filter((item) => !(item.kind === kind && item.id === id)),
        ),
      clear: () => setItems([]),
      countByKind: (kind) => items.filter((item) => item.kind === kind).length,
    }),
    [items, ready, setItems],
  );

  return (
    <SavedItemsContext.Provider value={value}>{children}</SavedItemsContext.Provider>
  );
}

export function useSavedItems() {
  const context = React.useContext(SavedItemsContext);
  if (!context) {
    throw new Error("useSavedItems must be used inside SavedItemsProvider");
  }
  return context;
}
