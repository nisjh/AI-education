import { Suspense } from "react";
import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { SectionHeading } from "@/components/section-heading";
import { ToolFeatureCards } from "@/components/tools/tool-feature-cards";
import { ToolsWorkspace } from "@/components/tools/workspace";

export const metadata: Metadata = {
  title: "Curriculum AI tools",
  description:
    "Upload a worksheet or paste questions, then build curriculum-specific prompts for IB DP/MYP and AP: similar practice problems, vocabulary examples, source analysis, exit tickets, and review sets.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageHeader
        eyebrow="Curriculum AI tools"
        title="Turn what you already teach into more of what you need"
        description="Start from a worksheet, a past paper question, or a passage. Choose IB or AP, your subject and level, and what you want made. You get a prompt built for that exact context — run it in the AI tool your school approves, then mark it up like any other draft."
      />

      <section className="mt-12">
        <h2 className="sr-only">What teachers use this for</h2>
        <ToolFeatureCards />
      </section>

      <section className="mt-16">
        <h2 className="sr-only">Build a generation</h2>
        <Suspense fallback={<WorkspaceSkeleton />}>
          <ToolsWorkspace />
        </Suspense>
      </section>

      <section className="mt-20 border-t border-border pt-10">
        <SectionHeading
          eyebrow="How this works"
          title="Where the material actually comes from"
          className="mb-6"
        />
        <h2 className="sr-only">How this works</h2>

        <div className="grid gap-8 lg:grid-cols-3">
          <div>
            <h3 className="font-semibold">Nothing is generated here</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              This site builds the prompt; your school&apos;s approved AI tool produces
              the material. That keeps you inside whatever data agreement your district
              has already signed, and it means no student work passes through this site.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Files stay in your browser</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Text files are read locally. PDF, Word, and image parsing is not wired up
              in this build, so for those you paste the text yourself — the rest of the
              flow is identical. Nothing you drop here is uploaded anywhere.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">It is a draft, not a question bank</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Generated items drift in difficulty and occasionally produce a distractor
              that is arguably correct. Read the set, cut what does not fit your class,
              and keep the answer keys for yourself.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function WorkspaceSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="space-y-6">
        <div className="h-64 rounded-xl bg-surface" aria-hidden />
        <div className="h-40 rounded-xl bg-surface" aria-hidden />
      </div>
      <div className="h-96 rounded-xl bg-surface" aria-hidden />
      <span className="sr-only">Loading the tools</span>
    </div>
  );
}
