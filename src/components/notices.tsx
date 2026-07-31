import { AlertTriangle, Lock } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * The two notices that appear throughout the product. They are components, not
 * copy-pasted paragraphs, so the wording stays identical everywhere it appears.
 */

export function ReviewNotice({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed",
        className,
      )}
    >
      <AlertTriangle className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
      <p className="text-muted-foreground">
        {children ?? (
          <>
            <span className="font-medium text-foreground">Review everything.</span>{" "}
            AI-generated material is a draft. Check facts, examples, and reading level
            yourself before it reaches a student — you are responsible for what you hand
            out.
          </>
        )}
      </p>
    </div>
  );
}

export function PrivacyNotice({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed",
        className,
      )}
    >
      <Lock className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
      <p className="text-muted-foreground">
        <span className="font-medium text-foreground">Student privacy.</span> Never put
        student names, ID numbers, grades, IEP contents, or family details into an AI
        tool. Follow your district&apos;s policy on approved tools and student accounts —
        where it differs from anything here, your district governs.
      </p>
    </div>
  );
}
