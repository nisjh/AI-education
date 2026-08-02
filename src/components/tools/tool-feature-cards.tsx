import Link from "next/link";
import {
  ArrowUpRight,
  FileQuestion,
  Languages,
  Layers,
  ListChecks,
  Sigma,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const CARDS = [
  {
    href: "/tools?curriculum=ib&subject=math",
    icon: Sigma,
    title: "Generate similar math questions from a PDF",
    body: "Keep the concept and format, vary the numbers and contexts, and get worked solutions alongside.",
  },
  {
    href: "/tools?curriculum=ib&subject=english",
    icon: Languages,
    title: "Create IB-style vocabulary examples",
    body: "Sentences where context carries the meaning, plus deliberate misuses for students to correct.",
  },
  {
    href: "/tools?curriculum=ap",
    icon: FileQuestion,
    title: "Turn a worksheet into AP practice",
    body: "Re-cut your existing questions as MCQ, FRQ, or SAQ with point values and scoring notes.",
  },
  {
    href: "/tools?curriculum=ib",
    icon: Layers,
    title: "Differentiate questions by difficulty",
    body: "Three difficulty steps from one set, with the scaffolding named so you know what to remove.",
  },
  {
    href: "/tools?curriculum=ib",
    icon: ListChecks,
    title: "Convert source material into quiz form",
    body: "A timed review set with mark allocation and a separate answer key you can withhold.",
  },
] as const;

export function ToolFeatureCards({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>
      {CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <Card
            key={card.title}
            className="group relative flex flex-col p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_6px_20px_rgba(12,35,64,0.07)]"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Icon className="size-5" aria-hidden />
            </span>

            <h3 className="mt-4 text-base font-semibold leading-snug">
              <Link
                href={card.href}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {card.title}
              </Link>
            </h3>

            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {card.body}
            </p>

            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform duration-200 group-hover:translate-x-0.5">
              Open the tool
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </Card>
        );
      })}
    </div>
  );
}
