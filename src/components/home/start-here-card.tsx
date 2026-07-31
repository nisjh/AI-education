import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

import { Card } from "@/components/ui/card";

const STEPS = [
  {
    href: "/library/how-llms-work",
    title: "Understand what these tools do",
    detail: "Ten minutes on prediction, training data, and why fluent is not accurate.",
  },
  {
    href: "/library/privacy-and-student-data",
    title: "Learn what never goes in a prompt",
    detail: "The short list of student information to keep out, and safer substitutes.",
  },
  {
    href: "/library/first-week-with-ai",
    title: "Try it on your own prep for a week",
    detail: "Five low-risk tasks, one per day, none of them touching student work.",
  },
  {
    href: "/guide#policies",
    title: "Set an expectation for your class",
    detail: "Pick one of three permission levels and post it on your next assignment.",
  },
];

export function StartHereCard() {
  return (
    <Card className="overflow-hidden border-accent/30 bg-accent-soft/40">
      <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-12">
        <div>
          <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Compass className="size-5" aria-hidden />
          </span>
          <h2 className="display mt-4 text-2xl">New to this? Start here.</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Four steps, about an hour total, spread over a week. Nothing in this path
            asks you to use AI with students until you have decided it is worth it.
          </p>
          <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
            You can stop at any step
          </p>
        </div>

        {/* Numbered because these steps are genuinely sequential — each one
            assumes the decision made in the previous one. */}
        <ol className="space-y-1">
          {STEPS.map((step, index) => (
            <li key={step.href}>
              <Link
                href={step.href}
                className="group flex items-start gap-4 rounded-lg p-3 transition-colors hover:bg-background/70"
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-md border border-accent/40 bg-background font-mono text-xs text-accent"
                >
                  {index + 1}
                </span>
                <span className="flex-1">
                  <span className="flex items-center gap-1.5 font-medium">
                    {step.title}
                    <ArrowRight
                      className="size-3.5 text-accent opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {step.detail}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </Card>
  );
}
