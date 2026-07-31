"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";

import { PromptCard } from "@/components/prompt-card";
import { ResourceCard } from "@/components/resource-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { categories } from "@/lib/data/categories";
import { prompts } from "@/lib/data/prompts";
import { resources } from "@/lib/data/resources";
import { cn, matchesQuery } from "@/lib/utils";
import {
  GRADE_BANDS,
  SUBJECTS,
  type CategoryId,
  type GradeBand,
  type Subject,
} from "@/lib/types";

const ANY = "__any__";
const PROMPT_CATEGORY: CategoryId = "prompt-templates";

/** The tags worth surfacing as browse chips, by how often they appear. */
const TOP_TAGS = (() => {
  const counts = new Map<string, number>();
  for (const item of [...resources, ...prompts]) {
    for (const tag of item.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 14)
    .map(([tag]) => tag);
})();

export function LibraryBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") as CategoryId | null;

  const [query, setQuery] = React.useState(searchParams.get("q") ?? "");
  const [category, setCategory] = React.useState<CategoryId | null>(
    initialCategory && categories.some((item) => item.id === initialCategory)
      ? initialCategory
      : null,
  );
  const [grade, setGrade] = React.useState<GradeBand | null>(
    (searchParams.get("grade") as GradeBand) || null,
  );
  const [subject, setSubject] = React.useState<Subject | null>(
    (searchParams.get("subject") as Subject) || null,
  );
  const [tag, setTag] = React.useState<string | null>(searchParams.get("tag"));
  const [tab, setTab] = React.useState<"resources" | "prompts">(
    initialCategory === PROMPT_CATEGORY ? "prompts" : "resources",
  );
  const [filtersOpen, setFiltersOpen] = React.useState(false);

  // Keep the URL in step with the filters so a filtered view can be shared.
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (category) params.set("category", category);
    if (grade) params.set("grade", grade);
    if (subject) params.set("subject", subject);
    if (tag) params.set("tag", tag);

    const next = params.toString();
    router.replace(next ? `/library?${next}` : "/library", { scroll: false });
  }, [query, category, grade, subject, tag, router]);

  const filteredResources = React.useMemo(
    () =>
      resources.filter((resource) => {
        if (category && resource.category !== category) return false;
        if (grade && !resource.gradeBands.includes(grade)) return false;
        if (
          subject &&
          !resource.subjects.includes(subject) &&
          !resource.subjects.includes("All subjects")
        ) {
          return false;
        }
        if (tag && !resource.tags.includes(tag)) return false;

        return matchesQuery(
          query,
          resource.title,
          resource.summary,
          resource.tags,
          resource.useCase,
          resource.audience,
        );
      }),
    [category, grade, subject, tag, query],
  );

  const filteredPrompts = React.useMemo(
    () =>
      prompts.filter((prompt) => {
        if (category && category !== PROMPT_CATEGORY) return false;
        if (grade && !prompt.gradeBands.includes(grade)) return false;
        if (
          subject &&
          !prompt.subjects.includes(subject) &&
          !prompt.subjects.includes("All subjects")
        ) {
          return false;
        }
        if (tag && !prompt.tags.includes(tag)) return false;

        return matchesQuery(query, prompt.title, prompt.summary, prompt.tags);
      }),
    [category, grade, subject, tag, query],
  );

  const activeFilters = [
    category && {
      label: categories.find((item) => item.id === category)?.name ?? category,
      clear: () => setCategory(null),
    },
    grade && { label: grade, clear: () => setGrade(null) },
    subject && { label: subject, clear: () => setSubject(null) },
    tag && { label: `#${tag}`, clear: () => setTag(null) },
  ].filter(Boolean) as { label: string; clear: () => void }[];

  function clearAll() {
    setQuery("");
    setCategory(null);
    setGrade(null);
    setSubject(null);
    setTag(null);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
      <aside
        className={cn(
          "lg:block",
          filtersOpen ? "block" : "hidden",
        )}
        aria-label="Filters"
      >
        <div className="space-y-6 lg:sticky lg:top-24">
          <div>
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
              Category
            </h2>
            <ul className="mt-3 space-y-0.5">
              <li>
                <FilterButton
                  active={category === null}
                  onClick={() => setCategory(null)}
                >
                  All categories
                </FilterButton>
              </li>
              {categories.map((item) => (
                <li key={item.id}>
                  <FilterButton
                    active={category === item.id}
                    onClick={() => {
                      setCategory(item.id);
                      setTab(item.id === PROMPT_CATEGORY ? "prompts" : "resources");
                    }}
                  >
                    {item.name}
                  </FilterButton>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="filter-grade" className="text-xs text-muted-foreground">
              Grade band
            </Label>
            <Select
              value={grade ?? ANY}
              onValueChange={(value) =>
                setGrade(value === ANY ? null : (value as GradeBand))
              }
            >
              <SelectTrigger id="filter-grade">
                <SelectValue placeholder="Any grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>Any grade</SelectItem>
                {GRADE_BANDS.map((band) => (
                  <SelectItem key={band} value={band}>
                    {band}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="filter-subject" className="text-xs text-muted-foreground">
              Subject
            </Label>
            <Select
              value={subject ?? ANY}
              onValueChange={(value) =>
                setSubject(value === ANY ? null : (value as Subject))
              }
            >
              <SelectTrigger id="filter-subject">
                <SelectValue placeholder="Any subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>Any subject</SelectItem>
                {SUBJECTS.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
              Tags
            </h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {TOP_TAGS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTag(tag === item ? null : item)}
                  aria-pressed={tag === item}
                  className={cn(
                    "rounded-md border px-2 py-1 text-xs transition-colors",
                    tag === item
                      ? "border-accent bg-accent-soft text-accent"
                      : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <label htmlFor="library-search" className="sr-only">
                Search the library
              </label>
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <Input
                id="library-search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search titles, summaries, and tags"
                className="h-11 pl-10"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" aria-hidden />
                </button>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              className="h-11 lg:hidden"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((open) => !open)}
            >
              <SlidersHorizontal aria-hidden />
              Filters
              {activeFilters.length > 0 && (
                <span className="rounded bg-accent-soft px-1.5 font-mono text-[0.6875rem] text-accent">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Tabs
              value={tab}
              onValueChange={(value) => setTab(value as "resources" | "prompts")}
            >
              <TabsList>
                <TabsTrigger value="resources">
                  Resources
                  <span className="font-mono text-xs opacity-70">
                    {filteredResources.length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="prompts">
                  Prompts
                  <span className="font-mono text-xs opacity-70">
                    {filteredPrompts.length}
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {(activeFilters.length > 0 || query) && (
              <Button variant="ghost" size="sm" onClick={clearAll}>
                <X aria-hidden />
                Clear all
              </Button>
            )}
          </div>

          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                <Filter className="size-3.5" aria-hidden />
                Filtering by
              </span>
              {activeFilters.map((filter) => (
                <Badge key={filter.label} variant="accent" className="gap-1 pr-1">
                  {filter.label}
                  <button
                    type="button"
                    onClick={filter.clear}
                    aria-label={`Remove filter ${filter.label}`}
                    className="rounded p-0.5 hover:bg-accent/15"
                  >
                    <X className="size-3" aria-hidden />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8" role="region" aria-live="polite">
          {tab === "resources" ? (
            filteredResources.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            ) : (
              <EmptyState onClear={clearAll} />
            )
          ) : filteredPrompts.length > 0 ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {filteredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <EmptyState onClear={clearAll} />
          )}
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "w-full rounded-md px-3 py-1.5 text-left text-sm transition-colors",
        active
          ? "bg-surface font-medium text-foreground"
          : "text-muted-foreground hover:bg-surface hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function EmptyState({ onClear }: { onClear: () => void }) {
  return (
    <div className="rounded-xl border border-dashed border-border p-12 text-center">
      <p className="font-medium">Nothing matches those filters yet.</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        Try a broader search, or clear a filter. If you were looking for something
        specific and it is not here, it probably belongs in the library — the collection
        grows from what teachers ask for.
      </p>
      <Button variant="outline" size="sm" className="mt-5" onClick={onClear}>
        Clear filters
      </Button>
    </div>
  );
}
