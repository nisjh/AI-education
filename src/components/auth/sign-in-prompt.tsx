"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Shown where a feature would persist something. It states what an account
 * buys and what still works without one, because "sign in to continue" on a
 * feature that is already working reads as a lie.
 */
export function SignInPrompt({
  title,
  detail,
  variant = "card",
  className,
}: {
  title: string;
  /** What still works right now, without an account. */
  detail: string;
  variant?: "card" | "inline";
  className?: string;
}) {
  const pathname = usePathname();
  const next = encodeURIComponent(pathname);

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-surface/60 p-4",
        variant === "card" && "sm:p-5",
        className,
      )}
    >
      <p className="flex items-center gap-2 text-sm font-medium">
        <Lock className="size-4 shrink-0 text-accent" aria-hidden />
        {title}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{detail}</p>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button asChild size="sm">
          <Link href={`/log-in?next=${next}`}>Log in</Link>
        </Button>
        <Button asChild size="sm" variant="outline">
          <Link href={`/sign-up?next=${next}`}>Create an account</Link>
        </Button>
      </div>
    </div>
  );
}
