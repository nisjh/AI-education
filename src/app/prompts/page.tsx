import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { PromptCard } from "@/components/prompt-card";
import { PromptGenerator } from "@/components/prompts/prompt-generator";
import { SectionHeading } from "@/components/section-heading";
import { prompts } from "@/lib/data/prompts";

export const metadata: Metadata = {
  title: "Prompt generator",
  description:
    "Build a classroom prompt for lesson plans, differentiated activities, quizzes, writing assignments, projects, feedback, and discussion questions.",
};

export default function PromptsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageHeader
        eyebrow="Prompt generator"
        title="Build a prompt that already knows your constraints"
        description="Choose what you need and fill in as much as you want. Anything you leave blank stays a highlighted placeholder, so the prompt is still usable — you just answer it later."
      />

      <div className="mt-12">
        <PromptGenerator />
      </div>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Prompt library"
          title="Or start from one teachers already use"
          description="Twelve prompts written for specific classroom jobs, each with notes on getting a better result."
          action={{ href: "/library?category=prompt-templates", label: "See all in library" }}
          className="mb-8"
        />
        <h2 className="sr-only">Prompt library</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {prompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </section>
    </div>
  );
}
