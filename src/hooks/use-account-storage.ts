"use client";

import * as React from "react";

import { useAuth } from "@/components/providers/auth-provider";
import { useLocalStorage } from "@/hooks/use-local-storage";

/**
 * Storage for the things that belong to a teacher rather than to a browser:
 * bookmarks, template drafts, generation history, checklist progress.
 *
 * Signed in, values persist under a key scoped to the account, so two teachers
 * sharing a laptop never see each other's work. Signed out, the same feature
 * still works for the session but nothing is written — which is exactly what
 * the sign-in prompts on those screens promise.
 */
export function useAccountStorage<T>(key: string, fallback: T) {
  const { user } = useAuth();

  // The hook is called unconditionally with a scoped key; when signed out
  // nothing is ever written to it, so the anonymous key stays empty.
  const [stored, setStored] = useLocalStorage<T>(
    `${key}:${user?.id ?? "anonymous"}`,
    fallback,
  );
  const [inSession, setInSession] = React.useState<T>(fallback);

  const signedIn = Boolean(user);

  return [
    signedIn ? stored : inSession,
    signedIn ? setStored : setInSession,
    { persists: signedIn },
  ] as const;
}
