"use client";

import Link from "next/link";
import { ArrowUpRight, Bookmark, Trash2 } from "lucide-react";

import { PromptCard } from "@/components/prompt-card";
import { useSavedItems } from "@/components/providers/saved-items-provider";
import { ResourceCard } from "@/components/resource-card";
import { SaveButton } from "@/components/save-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPrompt } from "@/lib/data/prompts";
import { getResource } from "@/lib/data/resources";
import { getTemplate } from "@/lib/data/templates";

export function SavedList() {
  const { items, ready, clear } = useSavedItems();

  if (!ready) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" aria-hidden>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-48 rounded-xl bg-surface" />
        ))}
      </div>
    );
  }

  if (items.length === 0) return <EmptySaved />;

  const savedResources = items
    .filter((item) => item.kind === "resource")
    .map((item) => getResource(item.id))
    .filter((resource) => resource !== undefined);

  const savedPrompts = items
    .filter((item) => item.kind === "prompt")
    .map((item) => getPrompt(item.id))
    .filter((prompt) => prompt !== undefined);

  const savedTemplates = items
    .filter((item) => item.kind === "template")
    .map((item) => getTemplate(item.id))
    .filter((template) => template !== undefined);

  return (
    <div className="space-y-14">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
          {items.length} saved {items.length === 1 ? "item" : "items"} in this browser
        </p>
        <Button variant="ghost" size="sm" onClick={clear}>
          <Trash2 aria-hidden />
          Remove all
        </Button>
      </div>

      {savedResources.length > 0 && (
        <section>
          <h2 className="display text-xl">Resources</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savedResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>
      )}

      {savedPrompts.length > 0 && (
        <section>
          <h2 className="display text-xl">Prompts</h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {savedPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </section>
      )}

      {savedTemplates.length > 0 && (
        <section>
          <h2 className="display text-xl">Templates</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savedTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <Card key={template.id} className="relative flex flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <SaveButton
                      kind="template"
                      id={template.id}
                      title={template.title}
                      className="relative z-10"
                    />
                  </div>

                  <h3 className="mt-4 font-semibold">
                    <Link
                      href={`/templates/${template.id}`}
                      className="after:absolute after:inset-0 after:content-['']"
                    >
                      {template.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {template.summary}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Open template
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

function EmptySaved() {
  return (
    <div className="rounded-xl border border-dashed border-border p-12 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-surface text-muted-foreground">
        <Bookmark className="size-5" aria-hidden />
      </span>
      <p className="mt-4 font-medium">Nothing saved yet</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
        Use the bookmark button on any resource, prompt, or template and it will show up
        here. Saved items live in this browser, so no account is needed.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link href="/library">Browse the library</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/prompts">Build a prompt</Link>
        </Button>
      </div>
    </div>
  );
}
