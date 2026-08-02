"use client";

import * as React from "react";
import { ArrowRight, ExternalLink, Sparkles } from "lucide-react";

import { CopyButton } from "@/components/copy-button";
import { PromptBlock } from "@/components/prompt-block";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { refinements } from "@/lib/tools/tasks";
import type { RefinementId, SampleOutput } from "@/lib/tools/types";
import { cn } from "@/lib/utils";

interface GenerationPreviewProps {
  prompt: string;
  sample: SampleOutput;
  active: RefinementId[];
  onRefine: (id: RefinementId) => void;
  ready: boolean;
}

export function GenerationPreview({
  prompt,
  sample,
  active,
  onRefine,
  ready,
}: GenerationPreviewProps) {
  const [tab, setTab] = React.useState("prompt");

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <p className="flex items-center gap-2 text-sm font-medium">
          <Sparkles className="size-4 text-accent" aria-hidden />
          Your generation
        </p>
        <CopyButton value={prompt} label="Copy prompt" />
      </div>

      <div className="p-4">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="prompt">Prompt to run</TabsTrigger>
            <TabsTrigger value="sample">Example result</TabsTrigger>
          </TabsList>

          <TabsContent value="prompt" className="mt-4">
            {!ready && (
              <p className="mb-3 rounded-lg border border-border bg-surface p-3 text-xs leading-relaxed text-muted-foreground">
                Add your source material above and the prompt fills in. Until then it
                keeps a placeholder, so it is still usable — you just paste the material
                when the tool asks.
              </p>
            )}
            <PromptBlock text={prompt} className="max-h-[34rem] overflow-auto" />

            <div className="mt-4 rounded-lg border border-border bg-surface/60 p-4">
              <p className="text-sm font-medium">How to use this</p>
              <ol className="mt-2 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-2">
                  <span aria-hidden className="text-accent">
                    1.
                  </span>
                  Copy the prompt and paste it into the AI tool your school approves.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="text-accent">
                    2.
                  </span>
                  Read the whole result, including the closing list of items the model
                  says it is least sure about.
                </li>
                <li className="flex gap-2">
                  <span aria-hidden className="text-accent">
                    3.
                  </span>
                  Cut or rewrite anything that does not match your class, then use it.
                </li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="sample" className="mt-4">
            <p className="mb-3 flex gap-2 rounded-lg border border-border bg-surface p-3 text-xs leading-relaxed text-muted-foreground">
              <ExternalLink className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
              <span>
                <span className="font-medium text-foreground">
                  This is a worked example, not live output.
                </span>{" "}
                {sample.caption} Nothing is generated on this site — run the prompt in
                your own tool to get material from your source.
              </span>
            </p>

            <div className="space-y-3">
              {sample.items.map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-border bg-surface/40"
                >
                  <div className="flex items-center justify-between gap-2 border-b border-border px-3 py-2">
                    <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </p>
                    <CopyButton
                      value={item.body}
                      iconOnly
                      variant="ghost"
                      label={`Copy ${item.label}`}
                    />
                  </div>
                  <pre className="overflow-x-auto whitespace-pre-wrap break-words px-3 py-3 font-mono text-[0.8125rem] leading-relaxed">
                    {item.body}
                  </pre>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="border-t border-border bg-surface/50 p-4">
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
          Regenerate with
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {refinements.map((refinement) => {
            const isActive = active.includes(refinement.id);
            return (
              <Button
                key={refinement.id}
                type="button"
                variant={isActive ? "secondary" : "outline"}
                size="sm"
                aria-pressed={isActive}
                onClick={() => onRefine(refinement.id)}
                className={cn(isActive && "text-accent")}
              >
                {refinement.label}
                {!isActive && <ArrowRight aria-hidden />}
              </Button>
            );
          })}
        </div>
        <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
          Each one adds an instruction to the prompt. Turn them off to go back.
        </p>
      </div>
    </Card>
  );
}
