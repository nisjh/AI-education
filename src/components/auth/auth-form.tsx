"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, Loader2 } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { AuthResult } from "@/lib/auth/types";
import { cn } from "@/lib/utils";

type Mode = "log-in" | "sign-up";

const COPY = {
  "log-in": {
    heading: "Log in",
    lede: "Your saved items, drafts, and history come back with you.",
    action: "Log in",
    pending: "Checking…",
    switchText: "New here?",
    switchLabel: "Create an account",
    switchHref: "/sign-up",
  },
  "sign-up": {
    heading: "Create an account",
    lede: "An account keeps your bookmarks, template drafts, and generation history. Everything else on the site works without one.",
    action: "Create account",
    pending: "Creating…",
    switchText: "Already have one?",
    switchLabel: "Log in",
    switchHref: "/log-in",
  },
} as const;

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { logIn, signUp, user, ready } = useAuth();

  const [name, setName] = React.useState("");
  const [school, setSchool] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pending, setPending] = React.useState(false);
  const [result, setResult] = React.useState<AuthResult | null>(null);

  const copy = COPY[mode];
  const next = searchParams.get("next") || "/saved";

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setResult(null);

    const outcome =
      mode === "sign-up"
        ? await signUp({ name, email, password, school })
        : await logIn({ email, password });

    setResult(outcome);
    setPending(false);

    if (outcome.ok) router.push(next);
  }

  if (ready && user) {
    return (
      <Card className="p-6">
        <p className="font-medium">You are already logged in as {user.name}.</p>
        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
          Signed in on this browser as {user.email}.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link href="/account">Go to your account</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/saved">See saved items</Link>
          </Button>
        </div>
      </Card>
    );
  }

  const fieldError = (field: string) =>
    result && !result.ok && result.field === field ? result.error : null;

  return (
    <Card className="p-6 sm:p-7">
      <h1 className="display text-2xl">{copy.heading}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.lede}</p>

      <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
        {mode === "sign-up" && (
          <>
            <Field
              id="auth-name"
              label="Your name"
              value={name}
              onChange={setName}
              autoComplete="name"
              placeholder="Ms. Okafor"
              error={fieldError("name")}
              required
            />
            <Field
              id="auth-school"
              label="School or district"
              hint="Optional. Shown only to you."
              value={school}
              onChange={setSchool}
              autoComplete="organization"
              placeholder="Riverside Middle School"
            />
          </>
        )}

        <Field
          id="auth-email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
          placeholder="you@school.edu"
          error={fieldError("email")}
          required
        />

        <Field
          id="auth-password"
          label="Password"
          type="password"
          hint={mode === "sign-up" ? "At least 8 characters." : undefined}
          value={password}
          onChange={setPassword}
          autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
          error={fieldError("password")}
          required
        />

        {result && !result.ok && !result.field && (
          <p
            role="alert"
            className="flex gap-2 rounded-md border border-destructive/40 bg-destructive/5 p-3 text-sm leading-relaxed text-destructive"
          >
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            {result.error}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={pending}>
          {pending && <Loader2 className="animate-spin" aria-hidden />}
          {pending ? copy.pending : copy.action}
        </Button>
      </form>

      <p className="mt-5 text-sm text-muted-foreground">
        {copy.switchText}{" "}
        <Link
          href={`${copy.switchHref}?next=${encodeURIComponent(next)}`}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {copy.switchLabel}
        </Link>
      </p>
    </Card>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  value,
  onChange,
  type = "text",
  ...props
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string | null;
  value: string;
  onChange: (value: string) => void;
  type?: string;
} & Omit<React.ComponentProps<"input">, "onChange" | "value" | "type" | "id">) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy || undefined}
        className={cn(error && "border-destructive")}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} role="alert" className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
