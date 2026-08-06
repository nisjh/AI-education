import { readJson, removeKey, writeJson } from "@/lib/storage";
import type {
  Account,
  AuthResult,
  Credentials,
  Session,
  SignUpInput,
  StoredAccount,
} from "@/lib/auth/types";

/**
 * Browser-local accounts.
 *
 * This app has no server, so accounts live in this browser. Passwords are
 * stretched with PBKDF2 before storage, which keeps them out of plain sight —
 * but anyone with devtools can read or edit local storage, so THIS IS NOT A
 * SECURITY BOUNDARY. It gates features and makes the flow real. The UI says so
 * on the sign-up page and the account page rather than implying otherwise.
 *
 * Everything below sits behind the `AuthStore` shape so a real backend
 * (Supabase, Firebase, your own API) can replace this one file.
 */

export const AUTH_KEYS = {
  accounts: "acrh.accounts.v1",
  session: "acrh.session.v1",
} as const;

const SESSION_DAYS = 30;
const PBKDF2_ITERATIONS = 100_000;
const MIN_PASSWORD_LENGTH = 8;

function toBase64(bytes: Uint8Array) {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function subtle() {
  const cryptoApi = globalThis.crypto;
  if (!cryptoApi?.subtle) {
    throw new Error(
      "This browser cannot hash passwords here. Accounts need a secure connection (https or localhost).",
    );
  }
  return cryptoApi.subtle;
}

async function derive(password: string, salt: Uint8Array) {
  const key = await subtle().importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const bits = await subtle().deriveBits(
    {
      name: "PBKDF2",
      salt: salt as BufferSource,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    key,
    256,
  );

  return toBase64(new Uint8Array(bits));
}

function newId() {
  return globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : `acc_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function readAccounts() {
  return readJson<StoredAccount[]>(AUTH_KEYS.accounts, []);
}

function writeAccounts(accounts: StoredAccount[]) {
  writeJson(AUTH_KEYS.accounts, accounts);
}

/** Strips password material before anything reaches React state. */
export function toPublicAccount(stored: StoredAccount): Account {
  const { id, email, name, school, createdAt } = stored;
  return { id, email, name, school, createdAt };
}

function normaliseEmail(email: string) {
  return email.trim().toLowerCase();
}

function looksLikeEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function startSession(userId: string): Session {
  const now = Date.now();
  const session: Session = {
    userId,
    createdAt: now,
    expiresAt: now + SESSION_DAYS * 24 * 60 * 60 * 1000,
  };
  writeJson(AUTH_KEYS.session, session);
  return session;
}

export async function signUp(input: SignUpInput): Promise<AuthResult> {
  const name = input.name.trim();
  const email = normaliseEmail(input.email);

  if (name.length === 0) {
    return { ok: false, error: "Add a name so the app knows what to call you.", field: "name" };
  }
  if (!looksLikeEmail(email)) {
    return { ok: false, error: "That email address does not look right.", field: "email" };
  }
  if (input.password.length < MIN_PASSWORD_LENGTH) {
    return {
      ok: false,
      error: `Use at least ${MIN_PASSWORD_LENGTH} characters.`,
      field: "password",
    };
  }

  const accounts = readAccounts();
  if (accounts.some((account) => account.email === email)) {
    return {
      ok: false,
      error: "An account with that email already exists in this browser.",
      field: "email",
    };
  }

  const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
  const stored: StoredAccount = {
    id: newId(),
    email,
    name,
    school: input.school?.trim() ?? "",
    createdAt: Date.now(),
    salt: toBase64(salt),
    hash: await derive(input.password, salt),
  };

  writeAccounts([...accounts, stored]);
  startSession(stored.id);

  return { ok: true, account: toPublicAccount(stored) };
}

export async function logIn(credentials: Credentials): Promise<AuthResult> {
  const email = normaliseEmail(credentials.email);
  const account = readAccounts().find((item) => item.email === email);

  // Same message either way, so the form does not confirm which emails exist.
  const rejection: AuthResult = {
    ok: false,
    error: "That email and password do not match an account in this browser.",
  };

  if (!account) return rejection;

  const salt = Uint8Array.from(atob(account.salt), (character) =>
    character.charCodeAt(0),
  );

  if ((await derive(credentials.password, salt)) !== account.hash) return rejection;

  startSession(account.id);
  return { ok: true, account: toPublicAccount(account) };
}

export function logOut() {
  writeJson(AUTH_KEYS.session, null);
}

export function updateProfile(
  userId: string,
  changes: { name?: string; school?: string },
): AuthResult {
  const accounts = readAccounts();
  const existing = accounts.find((account) => account.id === userId);
  if (!existing) return { ok: false, error: "That account is no longer here." };

  const name = changes.name?.trim() ?? existing.name;
  if (name.length === 0) {
    return { ok: false, error: "A name cannot be empty.", field: "name" };
  }

  const updated: StoredAccount = {
    ...existing,
    name,
    school: changes.school?.trim() ?? existing.school,
  };

  writeAccounts(accounts.map((account) => (account.id === userId ? updated : account)));
  return { ok: true, account: toPublicAccount(updated) };
}

/** Removes the account and every key scoped to it. */
export function deleteAccount(userId: string) {
  writeAccounts(readAccounts().filter((account) => account.id !== userId));
  logOut();

  if (typeof window === "undefined") return;
  const scoped = Object.keys(window.localStorage).filter((key) =>
    key.endsWith(`:${userId}`),
  );
  for (const key of scoped) removeKey(key);
}

export function isExpired(session: Session | null) {
  return !session || session.expiresAt < Date.now();
}
