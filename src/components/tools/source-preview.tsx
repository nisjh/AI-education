"use client";

import { Info, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ExtractedSource } from "@/lib/tools/types";

interface SourcePreviewProps {
  source: ExtractedSource;
  onChange: (text: string) => void;
  onClear: () => void;
}

export function SourcePreview({ source, onChange, onClear }: SourcePreviewProps) {
  const words = source.text.trim() ? source.text.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <Label htmlFor="source-text">Source material</Label>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Edit anything that came through wrong. Remove student names and any
            identifying details before you generate.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[0.6875rem] text-muted-foreground">
            {words} {words === 1 ? "word" : "words"}
          </span>
          {source.text.length > 0 && (
            <Button variant="ghost" size="sm" onClick={onClear}>
              <Trash2 aria-hidden />
              Clear
            </Button>
          )}
        </div>
      </div>

      {source.notice && (
        <p className="flex gap-2 rounded-lg border border-border bg-surface p-3 text-xs leading-relaxed text-muted-foreground">
          <Info className="mt-0.5 size-3.5 shrink-0 text-accent" aria-hidden />
          <span>{source.notice}</span>
        </p>
      )}

      <Textarea
        id="source-text"
        value={source.text}
        onChange={(event) => onChange(event.target.value)}
        rows={12}
        placeholder={
          "Paste the questions, passage, or worksheet text here.\n\nExample:\n1. Solve x² + 6x + 8 = 0 by factorising.\n2. Solve x² − 3x − 10 = 0 by factorising."
        }
        className="font-mono text-[0.8125rem] leading-relaxed"
      />

      {source.label && source.text.trim().length > 0 && (
        <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
          Source: {source.label}
        </p>
      )}
    </div>
  );
}
