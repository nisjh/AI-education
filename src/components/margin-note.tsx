import { cn } from "@/lib/utils";

/**
 * The teacher's mark in the margin of the draft.
 *
 * This site's argument is that AI drafts and the teacher decides, so the
 * teacher's judgment gets the margin — the place a teacher actually writes on
 * a handout. Notes hang beside the passage they qualify at wide widths and
 * fold in underneath it on narrow ones, always carrying the same hairline.
 *
 * Distinct from the boxed notices in `notices.tsx`: those are the site
 * speaking about policy, this is a teacher speaking about the work.
 */
export function MarginNote({
  kicker,
  children,
  tone = "default",
  className,
}: {
  /** Names the kind of note, e.g. "check before you use this". */
  kicker: string;
  children: React.ReactNode;
  /** "flag" is for the review note that must be read before the content. */
  tone?: "default" | "flag";
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "border-l-2 pl-4 text-sm leading-relaxed",
        tone === "flag" ? "border-accent" : "border-border",
        className,
      )}
    >
      <p
        className={cn(
          "font-mono text-[0.6875rem] uppercase tracking-[0.12em]",
          tone === "flag" ? "text-accent" : "text-muted-foreground",
        )}
      >
        {kicker}
      </p>
      <div className="mt-2 text-muted-foreground">{children}</div>
    </aside>
  );
}
