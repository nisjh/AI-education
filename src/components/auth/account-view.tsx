"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, LogOut } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { useSavedItems } from "@/components/providers/saved-items-provider";
import { SignInPrompt } from "@/components/auth/sign-in-prompt";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Account, AuthResult } from "@/lib/auth/types";

export function AccountView() {
  const { user, ready, logOut, updateProfile, deleteAccount } = useAuth();
  const { items } = useSavedItems();
  const router = useRouter();

  const [confirmingDelete, setConfirmingDelete] = React.useState(false);

  if (!ready) {
    return <div className="h-64 rounded-xl bg-surface" aria-hidden />;
  }

  if (!user) {
    return (
      <SignInPrompt
        title="Log in to see your account"
        detail="There is nothing to show here until you have one. The rest of the site works without it."
      />
    );
  }

  const counts = {
    resource: items.filter((item) => item.kind === "resource").length,
    prompt: items.filter((item) => item.kind === "prompt").length,
    template: items.filter((item) => item.kind === "template").length,
  };

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h2 className="display text-lg">Your details</h2>
        {/* Keyed by account id so the fields re-initialise if the account changes. */}
        <ProfileForm key={user.id} user={user} onSave={updateProfile} />
      </Card>

      <Card className="p-6">
        <h2 className="display text-lg">What this account is keeping</h2>
        <dl className="mt-5 grid gap-5 sm:grid-cols-3">
          {[
            ["Resources", counts.resource],
            ["Prompts", counts.prompt],
            ["Templates", counts.template],
          ].map(([label, count]) => (
            <div key={label as string}>
              <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                {label}
              </dt>
              <dd className="mt-1 text-2xl">{count}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
          Template drafts, generation history, and checklist progress are also kept
          against this account, on this browser.
        </p>
        <Button asChild variant="outline" size="sm" className="mt-4">
          <Link href="/saved">See saved items</Link>
        </Button>
      </Card>

      <Card className="p-6">
        <h2 className="display text-lg">Leaving</h2>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              logOut();
              router.push("/");
            }}
          >
            <LogOut aria-hidden />
            Log out
          </Button>
          <p className="text-sm text-muted-foreground">
            Your saved work stays and comes back when you log in again.
          </p>
        </div>

        <div className="mt-6 border-t border-border pt-5">
          {confirmingDelete ? (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed">
                <span className="font-medium">
                  Deleting removes the account and everything saved under it
                </span>{" "}
                — bookmarks, drafts, history, and checklist progress. It cannot be
                undone.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  onClick={() => {
                    deleteAccount();
                    router.push("/");
                  }}
                >
                  Delete it permanently
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setConfirmingDelete(false)}
                >
                  Keep my account
                </Button>
              </div>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={() => setConfirmingDelete(true)}
            >
              Delete this account
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}

function ProfileForm({
  user,
  onSave,
}: {
  user: Account;
  onSave: (changes: { name?: string; school?: string }) => AuthResult;
}) {
  const [name, setName] = React.useState(user.name);
  const [school, setSchool] = React.useState(user.school);
  const [saved, setSaved] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const result = onSave({ name, school });
    setError(result.ok ? null : result.error);
    setSaved(result.ok);
  }

  return (
    <form onSubmit={submit} className="mt-5 max-w-md space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="account-name">Name</Label>
        <Input
          id="account-name"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            setSaved(false);
          }}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="account-school">School or district</Label>
        <Input
          id="account-school"
          value={school}
          placeholder="Optional"
          onChange={(event) => {
            setSchool(event.target.value);
            setSaved(false);
          }}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="account-email">Email</Label>
        <Input id="account-email" value={user.email} disabled readOnly />
        <p className="text-xs text-muted-foreground">
          Changing the email on an account is not built yet.
        </p>
      </div>

      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" size="sm">
          Save changes
        </Button>
        {saved && (
          <span role="status" className="flex items-center gap-1.5 text-sm text-accent">
            <Check className="size-4" aria-hidden />
            Saved
          </span>
        )}
      </div>
    </form>
  );
}

export function AccountPageHeader() {
  return (
    <PageHeader
      eyebrow="Your account"
      title="What this browser is keeping for you"
      description="Your details, what is saved against them, and how to clear it out."
    />
  );
}
