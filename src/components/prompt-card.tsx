"use client";

import * as React from "react";
import { ChevronDown, Lightbulb } from "lucide-react";

import { CopyButton } from "@/components/copy-button";
import { PromptBlock } from "@/components/prompt-block";
import { SaveButton } from "@/components/save-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getPromptType } from "@/lib/data/prompt-types";
import { cn } from "@/lib/utils";
import type { PromptTemplate } from "@/lib/types";

export function PromptCard({
  prompt,
  defaultOpen = false,
}: {
  prompt: PromptTemplate;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const meta = getPromptType(prompt.promptType);
  const Icon = meta.icon;
  const bodyId = `prompt-body-${prompt.id}`;

  return (
    <Card className="flex flex-col">
      <div className="flex items-start justify-between gap-3 p-5 pb-3">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-soft px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-accent">
          <Icon className="size-3.5" aria-hidden />
          {meta.name}
        </span>
        <SaveButton kind="prompt" id={prompt.id} title={prompt.title} />
      </div>

      <div className="px-5 pb-5">
        <h3 className="text-base font-semibold leading-snug">{prompt.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {prompt.summary}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-1.5">
          {prompt.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls={bodyId}
          >
            <ChevronDown
              className={cn("transition-transform duration-200", open && "rotate-180")}
              aria-hidden
            />
            {open ? "Hide prompt" : "Show prompt"}
          </Button>
          <CopyButton value={prompt.template} label="Copy prompt" />
        </div>

        {open && (
          <div id={bodyId} className="mt-4 animate-in fade-in-0 duration-200">
            <PromptBlock text={prompt.template} />

            <div className="mt-4 rounded-lg border border-border bg-surface/60 p-4">
              <p className="eyebrow mb-3">
                <Lightbulb className="size-3.5" aria-hidden />
                Getting a better result
              </p>
              <ul className="space-y-2 text-sm leading-relaxed text-muted-foreground">
                {prompt.tips.map((tip) => (
                  <li key={tip} className="flex gap-2">
                    <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
