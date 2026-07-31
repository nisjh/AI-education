"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bookmark, Menu, Search, X } from "lucide-react";

import { useSavedItems } from "@/components/providers/saved-items-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/library", label: "Resource library" },
  { href: "/prompts", label: "Prompt generator" },
  { href: "/guide", label: "Classroom guide" },
  { href: "/templates", label: "Templates" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { items, ready } = useSavedItems();
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");

  function submitSearch(event: React.FormEvent) {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/library?q=${encodeURIComponent(trimmed)}` : "/library");
    setQuery("");
    setMenuOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Mark />
          <span className="flex flex-col leading-none">
            <span className="display text-[0.95rem] tracking-tight">
              AI Classroom
            </span>
            <span className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground">
              Resource hub
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-surface text-foreground"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <form
          onSubmit={submitSearch}
          role="search"
          className="ml-auto hidden min-w-0 max-w-64 flex-1 md:block"
        >
          <label htmlFor="header-search" className="sr-only">
            Search resources and prompts
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              id="header-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search the library"
              className="h-9 bg-surface pl-9"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className={cn(pathname === "/saved" && "bg-surface")}
          >
            <Link href="/saved">
              <Bookmark aria-hidden />
              <span className="hidden sm:inline">Saved</span>
              {ready && items.length > 0 && (
                <span className="ml-0.5 rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[0.6875rem] text-accent">
                  {items.length}
                </span>
              )}
            </Link>
          </Button>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
          </Button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-nav"
          className="border-t border-border bg-background lg:hidden animate-in slide-in-from-top-2 fade-in-0 duration-200"
        >
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
            <form onSubmit={submitSearch} role="search" className="mb-3 md:hidden">
              <label htmlFor="mobile-search" className="sr-only">
                Search resources and prompts
              </label>
              <div className="relative">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  id="mobile-search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search the library"
                  className="bg-surface pl-9"
                />
              </div>
            </form>
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/saved"
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                >
                  Saved items
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

/** Wordmark: an open book rule over a teal underline, drawn rather than imported. */
function Mark() {
  return (
    <span
      aria-hidden
      className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"
    >
      <svg viewBox="0 0 24 24" className="size-5" fill="none" strokeWidth="1.75">
        <path
          d="M4 5.5h6a2 2 0 0 1 2 2v11a1.6 1.6 0 0 0-1.6-1.6H4z"
          stroke="currentColor"
          strokeLinejoin="round"
        />
        <path
          d="M20 5.5h-6a2 2 0 0 0-2 2v11a1.6 1.6 0 0 1 1.6-1.6H20z"
          stroke="currentColor"
          strokeLinejoin="round"
        />
        <path d="M8.5 20.5h7" stroke="#5ec7bc" strokeLinecap="round" />
      </svg>
    </span>
  );
}
