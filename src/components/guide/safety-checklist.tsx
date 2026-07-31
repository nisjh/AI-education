"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { checklist } from "@/lib/data/guide";

const STORAGE_KEY = "acrh.checklist.v1";
const NONE_CHECKED: string[] = [];

const GROUPS = [
  "Before you start",
  "Before students see it",
  "Before students use a tool",
] as const;

export function SafetyChecklist() {
  const [checked, setChecked] = useLocalStorage<string[]>(STORAGE_KEY, NONE_CHECKED);

  const done = checked.length;
  const total = checklist.length;

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="font-medium">Teacher checklist</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Your progress stays in this browser. Nothing is sent anywhere.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="font-mono text-sm text-muted-foreground"
            aria-live="polite"
          >
            {done} of {total}
          </span>
          {done > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setChecked([])}>
              <RotateCcw aria-hidden />
              Reset
            </Button>
          )}
        </div>
      </div>

      <div
        className="mt-4 h-1 overflow-hidden rounded-full bg-surface-strong"
        role="progressbar"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Checklist progress"
      >
        <div
          className="h-full rounded-full bg-accent transition-[width] duration-300"
          style={{ width: `${total === 0 ? 0 : (done / total) * 100}%` }}
        />
      </div>

      <div className="mt-8 space-y-8">
        {GROUPS.map((group) => (
          <fieldset key={group}>
            <legend className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
              {group}
            </legend>
            <ul className="mt-3 space-y-3">
              {checklist
                .filter((item) => item.group === group)
                .map((item) => (
                  <li key={item.id} className="flex items-start gap-3">
                    <Checkbox
                      id={`check-${item.id}`}
                      checked={checked.includes(item.id)}
                      onCheckedChange={(value) =>
                        setChecked((current) =>
                          value
                            ? [...current, item.id]
                            : current.filter((id) => id !== item.id),
                        )
                      }
                      className="mt-1"
                    />
                    <div>
                      <label
                        htmlFor={`check-${item.id}`}
                        className="text-sm font-medium leading-relaxed"
                      >
                        {item.label}
                      </label>
                      <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </fieldset>
        ))}
      </div>
    </Card>
  );
}
