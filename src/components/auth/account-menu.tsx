"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bookmark, LogOut, UserRound } from "lucide-react";

import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "?";
}

export function AccountMenu() {
  const { user, ready, logOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Hold the space until the store is read, so the header does not jump.
  if (!ready) return <div className="size-9" aria-hidden />;

  if (!user) {
    const next = encodeURIComponent(pathname);
    return (
      <div className="flex items-center gap-1">
        <Button asChild variant="ghost" size="sm">
          <Link href={`/log-in?next=${next}`}>Log in</Link>
        </Button>
        <Button asChild size="sm" className="hidden sm:inline-flex">
          <Link href={`/sign-up?next=${next}`}>Sign up</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Account menu for ${user.name}`}
          className="rounded-full"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-accent-soft font-mono text-[0.6875rem] font-medium text-accent">
            {initials(user.name)}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-56">
        <DropdownMenuLabel>Signed in</DropdownMenuLabel>
        <div className="px-2 pb-2">
          <p className="truncate text-sm font-medium">{user.name}</p>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>

        <DropdownMenuItem asChild>
          <Link href="/account">
            <UserRound aria-hidden />
            Your account
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/saved">
            <Bookmark aria-hidden />
            Saved items
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={() => {
            logOut();
            router.push("/");
          }}
        >
          <LogOut aria-hidden />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
