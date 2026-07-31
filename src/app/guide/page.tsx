import Link from "next/link";
import type { Metadata } from "next";
import { Check, CircleSlash, Copy as CopyIcon } from "lucide-react";

import { CopyButton } from "@/components/copy-button";
import { FaqSection } from "@/components/faq-section";
import { SafetyChecklist } from "@/components/guide/safety-checklist";
import { PrivacyNotice, ReviewNotice } from "@/components/notices";
import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  bestPractices,
  integrityPoints,
  policyExamples,
  whenNotToUse,
  whenToUse,
} from "@/lib/data/guide";

export const metadata: Metadata = {
  title: "AI in the classroom guide",
  description:
    "Best practices, when to use AI and when not to, academic integrity, example classroom policies, and a safe-implementation checklist for teachers.",
};

const SECTIONS = [
  { href: "#practices", label: "Best practices" },
  { href: "#when", label: "When to use it" },
  { href: "#integrity", label: "Academic integrity" },
  { href: "#policies", label: "Example policies" },
  { href: "#checklist", label: "Checklist" },
  { href: "#questions", label: "Questions" },
];

export default function GuidePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageHeader
        eyebrow="Classroom guide"
        title="Using AI with students, without guessing"
        description="What is worth doing, what to avoid, and the specific decisions to make before a tool touches your classroom. Written to be read in twenty minutes and used the same week."
      />

      <nav
        aria-label="On this page"
        className="mt-8 flex flex-wrap gap-2 border-y border-border py-4"
      >
        {SECTIONS.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-md border border-border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
          >
            {section.label}
          </Link>
        ))}
      </nav>

      <div className="mt-16 space-y-20">
        <section id="practices" className="scroll-mt-24">
          <SectionHeading
            eyebrow="Best practices"
            title="Six habits that separate useful from wasteful"
            className="mb-8"
          />
          <h2 className="sr-only">Best practices</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {bestPractices.map((practice) => (
              <Card key={practice.title} className="p-5">
                <h3 className="font-semibold leading-snug">{practice.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {practice.body}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <section id="when" className="scroll-mt-24">
          <SectionHeading
            eyebrow="Judgment calls"
            title="When to use it, and when not to"
            description="The line is not about the tool. It is about whether you can verify the output and whether a person needs to be accountable for the decision."
            className="mb-8"
          />
          <h2 className="sr-only">When to use AI and when not to</h2>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-accent/30 bg-accent-soft/30 p-6">
              <p className="flex items-center gap-2 font-medium">
                <Check className="size-4 text-accent" aria-hidden />
                Reasonable uses
              </p>
              <ul className="mt-4 space-y-4">
                {whenToUse.map((item) => (
                  <li key={item.situation}>
                    <p className="text-sm font-medium">{item.situation}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.reason}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-border bg-surface/60 p-6">
              <p className="flex items-center gap-2 font-medium">
                <CircleSlash className="size-4 text-destructive" aria-hidden />
                Do not use it for
              </p>
              <ul className="mt-4 space-y-4">
                {whenNotToUse.map((item) => (
                  <li key={item.situation}>
                    <p className="text-sm font-medium">{item.situation}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {item.reason}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <ReviewNotice />
            <PrivacyNotice />
          </div>
        </section>

        <section id="integrity" className="scroll-mt-24">
          <SectionHeading
            eyebrow="Academic integrity"
            title="Most problems are clarity problems"
            className="mb-8"
          />
          <h2 className="sr-only">Academic integrity considerations</h2>

          <div className="space-y-5">
            {integrityPoints.map((point) => (
              <div
                key={point.title}
                className="border-l-2 border-accent/40 pl-5 sm:pl-6"
              >
                <h3 className="font-semibold">{point.title}</h3>
                <p className="mt-1.5 max-w-3xl leading-relaxed text-muted-foreground">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="policies" className="scroll-mt-24">
          <SectionHeading
            eyebrow="Example policies"
            title="Three permission levels you can post tomorrow"
            description="Put the level on every assignment sheet, in the same place each time. Copy the student-facing wording as it is or rewrite it in your voice."
            className="mb-8"
          />
          <h2 className="sr-only">Example classroom policies</h2>

          <div className="grid gap-4 lg:grid-cols-3">
            {policyExamples.map((policy) => (
              <Card key={policy.level} className="flex flex-col p-5">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-accent-soft px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-accent">
                    {policy.level}
                  </span>
                  <CopyButton
                    value={policy.studentFacing}
                    iconOnly
                    variant="ghost"
                    label={`Copy ${policy.name} policy`}
                  />
                </div>

                <h3 className="mt-3 font-semibold">{policy.name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Use when: {policy.useWhen}
                </p>

                <blockquote className="mt-4 flex-1 rounded-lg border border-border bg-surface p-4 text-sm leading-relaxed">
                  {policy.studentFacing}
                </blockquote>
              </Card>
            ))}
          </div>

          <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
            <CopyIcon className="size-4 shrink-0" aria-hidden />
            Want a full agreement instead? The{" "}
            <Link
              href="/templates/classroom-ai-agreement"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              classroom AI agreement template
            </Link>{" "}
            covers what students agree to and what you agree to.
          </p>
        </section>

        <section id="checklist" className="scroll-mt-24">
          <SectionHeading
            eyebrow="Before you implement"
            title="Teacher checklist for safe implementation"
            description="Ten checks across three moments. Work through the first group once, and the other two every time you bring something new to students."
            className="mb-8"
          />
          <h2 className="sr-only">Teacher checklist</h2>
          <SafetyChecklist />
        </section>

        <section id="questions" className="scroll-mt-24">
          <SectionHeading
            eyebrow="Common questions"
            title="The questions teachers ask first"
            className="mb-8"
          />
          <h2 className="sr-only">Frequently asked questions</h2>
          <FaqSection />

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/templates">Open the templates</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/library?category=safety-ethics">
                Safety and ethics resources
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
