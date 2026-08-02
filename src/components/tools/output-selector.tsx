"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { outputFormats, transformations } from "@/lib/tools/tasks";
import { cn } from "@/lib/utils";

interface OutputSelectorProps {
  outputFormatIds: string[];
  transformationIds: string[];
  onToggleFormat: (id: string) => void;
  onToggleTransformation: (id: string) => void;
}

export function OutputSelector({
  outputFormatIds,
  transformationIds,
  onToggleFormat,
  onToggleTransformation,
}: OutputSelectorProps) {
  return (
    <div className="space-y-6">
      <fieldset>
        <legend className="text-sm font-medium">What should it produce?</legend>
        <p className="mt-1 text-xs text-muted-foreground">
          Pick as many as you need. Answer keys come out in a separate block so you can
          withhold them.
        </p>

        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {outputFormats.map((format) => {
            const checked = outputFormatIds.includes(format.id);
            return (
              <label
                key={format.id}
                className={cn(
                  "flex cursor-pointer items-start gap-2.5 rounded-lg border p-3 transition-colors",
                  checked
                    ? "border-accent bg-accent-soft/40"
                    : "border-border hover:border-accent/40 hover:bg-surface",
                )}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => onToggleFormat(format.id)}
                  className="mt-0.5"
                />
                <span>
                  <span className="block text-sm font-medium">{format.name}</span>
                  <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                    {format.description}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-sm font-medium">Transform the questions</legend>
        <p className="mt-1 text-xs text-muted-foreground">
          Optional. These change what the questions demand, not what they are about.
        </p>

        <div className="mt-3 flex flex-wrap gap-2">
          {transformations.map((transformation) => {
            const active = transformationIds.includes(transformation.id);
            return (
              <button
                key={transformation.id}
                type="button"
                aria-pressed={active}
                title={transformation.instruction}
                onClick={() => onToggleTransformation(transformation.id)}
                className={cn(
                  "rounded-md border px-2.5 py-1.5 text-xs transition-colors",
                  active
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border text-muted-foreground hover:border-accent/50 hover:text-foreground",
                )}
              >
                {transformation.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <p className="sr-only" role="status" aria-live="polite">
        {outputFormatIds.length} output{outputFormatIds.length === 1 ? "" : "s"} and{" "}
        {transformationIds.length} transformation
        {transformationIds.length === 1 ? "" : "s"} selected.
      </p>
    </div>
  );
}
