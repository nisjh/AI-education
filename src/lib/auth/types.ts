export interface Account {
  id: string;
  email: string;
  name: string;
  /** Optional — shown on the account page, never required to sign up. */
  school: string;
  createdAt: number;
}

/** What is written to storage: the account plus its password material. */
export interface StoredAccount extends Account {
  salt: string;
  hash: string;
}

export interface Session {
  userId: string;
  createdAt: number;
  expiresAt: number;
}

export interface Credentials {
  email: string;
  password: string;
}

export interface SignUpInput extends Credentials {
  name: string;
  school?: string;
}

/** Every auth call resolves rather than throwing, so forms can render the reason. */
export type AuthResult =
  | { ok: true; account: Account }
  | { ok: false; error: string; field?: "name" | "email" | "password" };
