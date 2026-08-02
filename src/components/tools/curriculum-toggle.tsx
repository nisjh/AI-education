"use client";

import { CURRICULUM_BLURB, CURRICULUM_LABEL } from "@/lib/tools/curricula";
import type { CurriculumMode } from "@/lib/tools/types";
import { cn } from "@/lib/utils";

const MODES: CurriculumMode[] = ["ib", "ap"];

interface CurriculumToggleProps {
  value: CurriculumMode;
  onChange: (mode: CurriculumMode) => void;
  /** Compact form for the sticky header; full form for the step. */
  variant?: "tabs" | "cards";
}

export function CurriculumToggle({
  value,
  onChange,
  variant = "cards",
}: CurriculumToggleProps) {
  if (variant === "tabs") {
    return (
      <div
        role="tablist"
        aria-label="Curriculum"
        className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface p-1"
      >
        {MODES.map((mode) => (
          <button
            key={mode}
            role="tab"
            type="button"
            aria-selected={value === mode}
            onClick={() => onChange(mode)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              value === mode
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {CURRICULUM_LABEL[mode]}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div role="tablist" aria-label="Curriculum" className="grid gap-3 sm:grid-cols-2">
      {MODES.map((mode) => (
        <button
          key={mode}
          role="tab"
          type="button"
          aria-selected={value === mode}
          onClick={() => onChange(mode)}
          className={cn(
            "rounded-xl border p-4 text-left transition-colors",
            value === mode
              ? "border-accent bg-accent-soft/50"
              : "border-border hover:border-accent/40 hover:bg-surface",
          )}
        >
          <span className="block font-medium">{CURRICULUM_LABEL[mode]}</span>
          <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
            {CURRICULUM_BLURB[mode]}
          </span>
        </button>
      ))}
    </div>
  );
}
