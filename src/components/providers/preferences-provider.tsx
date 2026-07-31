"use client";

import * as React from "react";

import { useHydrated, useLocalStorage } from "@/hooks/use-local-storage";
import { STORAGE_KEYS } from "@/lib/storage";
import type { GradeBand, Subject, TeacherPreferences } from "@/lib/types";

const DEFAULT_PREFERENCES: TeacherPreferences = {
  gradeBand: null,
  subject: null,
};

interface PreferencesContextValue {
  preferences: TeacherPreferences;
  ready: boolean;
  setGradeBand: (gradeBand: GradeBand | null) => void;
  setSubject: (subject: Subject | null) => void;
  reset: () => void;
  /** True once the teacher has told us anything we can recommend from. */
  hasPreferences: boolean;
}

const PreferencesContext = React.createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useLocalStorage<TeacherPreferences>(
    STORAGE_KEYS.preferences,
    DEFAULT_PREFERENCES,
  );
  const ready = useHydrated();

  const value = React.useMemo<PreferencesContextValue>(
    () => ({
      preferences,
      ready,
      setGradeBand: (gradeBand) =>
        setPreferences((current) => ({ ...current, gradeBand })),
      setSubject: (subject) => setPreferences((current) => ({ ...current, subject })),
      reset: () => setPreferences(DEFAULT_PREFERENCES),
      hasPreferences: Boolean(preferences.gradeBand ?? preferences.subject),
    }),
    [preferences, ready, setPreferences],
  );

  return (
    <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = React.useContext(PreferencesContext);
  if (!context) {
    throw new Error("usePreferences must be used inside PreferencesProvider");
  }
  return context;
}
