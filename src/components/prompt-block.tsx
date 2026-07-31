import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * The signature element of the product: prompt text set in mono, with every
 * [PLACEHOLDER] rendered as a chip so a teacher can see at a glance exactly
 * what they still need to fill in before pasting it into a tool.
 */
export function PromptText({ text }: { text: string }) {
  // Built per call: a shared global regex would carry lastIndex between renders.
  const placeholder = /\[([^\][]+)\]/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = placeholder.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    nodes.push(
      <mark
        key={`${match.index}-${match[1]}`}
        className="rounded-[3px] bg-accent-soft px-1 py-px font-medium text-accent"
      >
        {match[1]}
      </mark>,
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return <>{nodes}</>;
}

interface PromptBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  text: string;
}

export function PromptBlock({ text, className, ...props }: PromptBlockProps) {
  return (
    <pre
      className={cn(
        "overflow-x-auto whitespace-pre-wrap break-words rounded-lg border border-border bg-surface p-4",
        "font-mono text-[0.8125rem] leading-relaxed text-foreground",
        className,
      )}
      {...props}
    >
      <PromptText text={text} />
    </pre>
  );
}
