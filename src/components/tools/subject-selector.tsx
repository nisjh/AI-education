"use client";

import { toolSubjects } from "@/lib/tools/subjects";
import { cn } from "@/lib/utils";

interface SubjectSelectorProps {
  value: string;
  onChange: (subjectId: string) => void;
}

export function SubjectSelector({ value, onChange }: SubjectSelectorProps) {
  return (
    <fieldset>
      <legend className="sr-only">Subject</legend>
      <div className="flex flex-wrap gap-2">
        {toolSubjects.map((subject) => {
          const Icon = subject.icon;
          const active = subject.id === value;

          return (
            <button
              key={subject.id}
              type="button"
              onClick={() => onChange(subject.id)}
              aria-pressed={active}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors",
                active
                  ? "border-accent bg-accent-soft/60 font-medium text-foreground"
                  : "border-border text-muted-foreground hover:border-accent/40 hover:text-foreground",
              )}
            >
              <Icon
                className={cn("size-4", active ? "text-accent" : "opacity-70")}
                aria-hidden
              />
              {subject.name}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
