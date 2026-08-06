"use client";

import { History, RotateCcw, Trash2 } from "lucide-react";

import { SignInPrompt } from "@/components/auth/sign-in-prompt";
import { CopyButton } from "@/components/copy-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CURRICULUM_LABEL } from "@/lib/tools/curricula";
import type { HistoryEntry } from "@/lib/tools/types";

interface HistoryPanelProps {
  entries: HistoryEntry[];
  /** False when signed out: history holds for the session only. */
  persists: boolean;
  onRestore: (entry: HistoryEntry) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

function formatWhen(timestamp: number) {
  const minutes = Math.round((Date.now() - timestamp) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} h ago`;
  return new Date(timestamp).toLocaleDateString();
}

export function HistoryPanel({
  entries,
  persists,
  onRestore,
  onRemove,
  onClear,
}: HistoryPanelProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-sm font-medium">
          <History className="size-4 text-accent" aria-hidden />
          Recent generations
        </p>
        {entries.length > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            <Trash2 aria-hidden />
            Clear
          </Button>
        )}
      </div>

      {!persists && (
        <SignInPrompt
          className="mt-4"
          variant="inline"
          title="Log in to keep your history"
          detail="Generating works without an account. This list just empties when you leave."
        />
      )}

      {entries.length === 0 ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {persists
            ? "Prompts you build get kept here against your account, so you can come back to the set you made last period."
            : "Prompts you build in this session show up here."}
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {entries.map((entry) => (
            <li
              key={entry.id}
              className="rounded-lg border border-border p-3 transition-colors hover:border-accent/40"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{entry.title}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {entry.summary}
                  </p>
                  <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-wider text-muted-foreground">
                    {CURRICULUM_LABEL[entry.request.curriculum]} ·{" "}
                    {formatWhen(entry.createdAt)}
                  </p>
                </div>
                <CopyButton
                  value={entry.prompt}
                  iconOnly
                  variant="ghost"
                  label={`Copy prompt for ${entry.title}`}
                />
              </div>

              <div className="mt-2 flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => onRestore(entry)}>
                  <RotateCcw aria-hidden />
                  Load
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground"
                  onClick={() => onRemove(entry.id)}
                  aria-label={`Remove ${entry.title} from history`}
                >
                  Remove
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
