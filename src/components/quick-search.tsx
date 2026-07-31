"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SUGGESTIONS = [
  "rubric",
  "academic integrity",
  "differentiation",
  "student privacy",
  "discussion questions",
];

export function QuickSearch({ className }: { className?: string }) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");

  function go(value: string) {
    const trimmed = value.trim();
    router.push(trimmed ? `/library?q=${encodeURIComponent(trimmed)}` : "/library");
  }

  return (
    <div className={cn("w-full", className)}>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          go(query);
        }}
        className="flex flex-col gap-2 sm:flex-row"
      >
        <div className="relative flex-1">
          <label htmlFor="quick-search" className="sr-only">
            Search resources and prompts
          </label>
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            id="quick-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search resources, prompts, and templates"
            className="h-12 pl-10 text-base"
          />
        </div>
        <Button type="submit" size="lg" className="sm:w-auto">
          Search
        </Button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
          Try
        </span>
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            onClick={() => go(suggestion)}
            className="rounded-md border border-border bg-background px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
