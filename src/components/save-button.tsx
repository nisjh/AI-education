"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";

import { useSavedItems } from "@/components/providers/saved-items-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SavedKind } from "@/lib/types";

interface SaveButtonProps {
  kind: SavedKind;
  id: string;
  /** Used in the accessible label, e.g. "Save Rubric builder". */
  title: string;
  variant?: "icon" | "full";
  className?: string;
}

export function SaveButton({
  kind,
  id,
  title,
  variant = "icon",
  className,
}: SaveButtonProps) {
  const { isSaved, toggle, ready } = useSavedItems();
  const saved = ready && isSaved(kind, id);
  const Icon = saved ? BookmarkCheck : Bookmark;

  if (variant === "full") {
    return (
      <Button
        type="button"
        variant={saved ? "secondary" : "outline"}
        size="sm"
        onClick={() => toggle(kind, id)}
        aria-pressed={saved}
        className={cn(saved && "text-accent", className)}
      >
        <Icon aria-hidden />
        {saved ? "Saved" : "Save"}
      </Button>
    );
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      onClick={() => toggle(kind, id)}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
      title={saved ? "Remove from saved" : "Save for later"}
      className={cn("shrink-0", saved ? "text-accent" : "text-muted-foreground", className)}
    >
      <Icon aria-hidden />
    </Button>
  );
}
