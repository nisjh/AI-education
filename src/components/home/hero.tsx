"use client";

import * as React from "react";
import Link from "next/link";

import { CopyButton } from "@/components/copy-button";
import { PromptText } from "@/components/prompt-block";
import { QuickSearch } from "@/components/quick-search";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The hero shows the product doing its job rather than describing it: a real,
 * well-formed teaching prompt with its placeholders called out. Teachers can
 * copy one straight from the landing page.
 */
const EXAMPLES = [
  {
    id: "plan",
    label: "Plan a lesson",
    text: `You are helping an experienced [GRADE LEVEL] [SUBJECT] teacher plan one [MINUTES]-minute period.

Standard: [PASTE IT VERBATIM]
What students did last class: [PRIOR LESSON]

Give me, in this order: the evidence of learning I collect by the end, the practice sequence that gets students there, a five-minute opener, the two likeliest misconceptions with one move for each, and what to cut if we run short.`,
  },
  {
    id: "rubric",
    label: "Write a rubric",
    text: `Build a rubric for this [GRADE LEVEL] [SUBJECT] assignment: [PASTE THE ASSIGNMENT]

My success criteria: [PASTE THEM]
My scale: [EXCEEDS / MEETS / APPROACHING / BEGINNING]

Every descriptor must name something observable in the work — no "strong" or "effective" unless you define it in the same sentence. Then tell me where a real piece of student work would be ambiguous.`,
  },
  {
    id: "feedback",
    label: "Draft feedback",
    text: `I am giving feedback on [ASSIGNMENT TYPE] in [GRADE LEVEL] [SUBJECT].

Here is how I write to students: [PASTE TWO OF YOUR OWN SENTENCES]

For each of these patterns — [PATTERN 1], [PATTERN 2], [PATTERN 3] — write three comment stems: one thing that worked with a blank for the specific detail, one next step tied to my criteria, one question that makes the student think. Under 45 words each.`,
  },
];

const ROTATION_MS = 9000;

export function Hero() {
  const [active, setActive] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    if (paused) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const timer = setInterval(
      () => setActive((index) => (index + 1) % EXAMPLES.length),
      ROTATION_MS,
    );
    return () => clearInterval(timer);
  }, [paused]);

  const example = EXAMPLES[active];

  return (
    <section className="border-b border-border bg-gradient-to-b from-surface/70 to-background">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-24">
        <div>
          <p className="eyebrow">For K–12 and early college teachers</p>

          <h1 className="display mt-5 text-4xl sm:text-5xl">
            Use AI in your classroom
            <br />
            without handing over your judgment.
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Classroom-ready resources, prompts you can copy, and plain guidance on
            where these tools help and where they do not. Written for teachers who
            want the prep time back and still stand behind everything they hand out.
          </p>

          <div className="mt-8">
            <QuickSearch />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/library/first-week-with-ai">Start here</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/prompts">Build a prompt</Link>
            </Button>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
            <div className="flex items-center gap-2">
              <dt className="sr-only">Account required</dt>
              <dd>No login needed</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Cost</dt>
              <dd>Free for teachers</dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Review policy</dt>
              <dd>Every prompt teacher-reviewed</dd>
            </div>
          </dl>
        </div>

        <div
          className="rounded-xl border border-border bg-card p-1.5 shadow-[0_10px_40px_-16px_rgba(12,35,64,0.35)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
            {EXAMPLES.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                aria-pressed={index === active}
                className={cn(
                  "rounded-md px-2.5 py-1.5 font-mono text-[0.6875rem] uppercase tracking-wider transition-colors",
                  index === active
                    ? "bg-accent-soft text-accent"
                    : "text-muted-foreground hover:bg-surface hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
            <CopyButton
              value={example.text}
              label="Copy"
              className="ml-auto"
              variant="ghost"
            />
          </div>

          <pre
            key={example.id}
            className="max-h-[22rem] overflow-auto whitespace-pre-wrap break-words p-4 font-mono text-[0.8125rem] leading-relaxed animate-in fade-in-0 duration-500"
          >
            <PromptText text={example.text} />
          </pre>

          <p className="border-t border-border px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            Highlighted text is yours to fill in. Read whatever comes back before it
            reaches a student.
          </p>
        </div>
      </div>
    </section>
  );
}
