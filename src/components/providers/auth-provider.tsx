"use client";

import * as React from "react";

import { useHydrated, useLocalStorage } from "@/hooks/use-local-storage";
import {
  AUTH_KEYS,
  deleteAccount,
  isExpired,
  logIn,
  logOut,
  signUp,
  toPublicAccount,
  updateProfile,
} from "@/lib/auth/local-store";
import type {
  Account,
  AuthResult,
  Credentials,
  Session,
  SignUpInput,
  StoredAccount,
} from "@/lib/auth/types";

const NO_ACCOUNTS: StoredAccount[] = [];
const NO_SESSION: Session | null = null;

interface AuthContextValue {
  user: Account | null;
  /** False until the browser store has been read; guards render a skeleton. */
  ready: boolean;
  signUp: (input: SignUpInput) => Promise<AuthResult>;
  logIn: (credentials: Credentials) => Promise<AuthResult>;
  logOut: () => void;
  updateProfile: (changes: { name?: string; school?: string }) => AuthResult;
  deleteAccount: () => void;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Both live in the same store the auth functions write to, so a sign-in in
  // one tab lands in every other tab without any extra plumbing.
  const [accounts] = useLocalStorage<StoredAccount[]>(AUTH_KEYS.accounts, NO_ACCOUNTS);
  const [session] = useLocalStorage<Session | null>(AUTH_KEYS.session, NO_SESSION);
  const ready = useHydrated();

  const user = React.useMemo(() => {
    if (isExpired(session)) return null;
    const stored = accounts.find((account) => account.id === session?.userId);
    return stored ? toPublicAccount(stored) : null;
  }, [accounts, session]);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      ready,
      signUp,
      logIn,
      logOut,
      updateProfile: (changes) =>
        user
          ? updateProfile(user.id, changes)
          : { ok: false as const, error: "Sign in first." },
      deleteAccount: () => {
        if (user) deleteAccount(user.id);
      },
    }),
    [user, ready],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
