import Link from "next/link";

import { FaqSection } from "@/components/faq-section";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { Hero } from "@/components/home/hero";
import { StartHereCard } from "@/components/home/start-here-card";
import { PromptCard } from "@/components/prompt-card";
import { RecommendedForYou } from "@/components/recommended-for-you";
import { ResourceCard } from "@/components/resource-card";
import { SectionHeading } from "@/components/section-heading";
import { ToolFeatureCards } from "@/components/tools/tool-feature-cards";
import { Button } from "@/components/ui/button";
import { prompts } from "@/lib/data/prompts";
import { featuredResources } from "@/lib/data/resources";

export default function HomePage() {
  return (
    <>
      <Hero />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-6 lg:py-20">
        <section aria-labelledby="responsible-use">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
            <div>
              <p className="eyebrow">The short version</p>
              <h2 id="responsible-use" className="display mt-3 text-2xl sm:text-3xl">
                What responsible use actually looks like
              </h2>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                AI is useful in teaching for a narrower set of jobs than the marketing
                suggests, and genuinely useful for those. It drafts. It rephrases. It
                produces a first version of something you already know how to judge —
                practice items, scaffolds, rubric language, the email you have been
                putting off.
              </p>
              <p>
                It does not know your students, your school, or what happened in third
                period. It states wrong things with the same confidence as right ones.
                So the working arrangement is simple:{" "}
                <span className="font-medium text-foreground">it drafts, you decide</span>
                . Every judgment that affects a student — what counts as proficient, who
                needs a different entry point, what a grade means — stays with the
                teacher.
              </p>
              <p>
                Everything here is built around that arrangement. The prompts ask for
                weaknesses to be flagged rather than smoothed over. The templates leave
                blanks where your specific knowledge belongs. The guidance tells you what
                to check before anything reaches a student.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="browse">
          <SectionHeading
            eyebrow="Browse"
            title="Find what you need by the job you are doing"
            description="Every resource says up front who it is for, how long it takes, and what to check before you use it."
            action={{ href: "/library", label: "All resources" }}
            className="mb-8"
          />
          <h2 id="browse" className="sr-only">
            Browse by category
          </h2>
          <FeaturedCategories />
        </section>

        <section aria-labelledby="curriculum-tools">
          <SectionHeading
            eyebrow="Curriculum AI tools"
            title="Start from the worksheet already on your desk"
            description="Upload or paste your material, pick IB or AP, and get a prompt built for that subject, level, and question format. Similar practice problems, vocabulary examples, source analysis, exit tickets, and review sets."
            action={{ href: "/tools", label: "Open the tools" }}
            className="mb-8"
          />
          <h2 id="curriculum-tools" className="sr-only">
            Curriculum AI tools
          </h2>
          <ToolFeatureCards />
        </section>

        <section aria-labelledby="start-here">
          <h2 id="start-here" className="sr-only">
            Start here
          </h2>
          <StartHereCard />
        </section>

        <section aria-labelledby="recommended">
          <SectionHeading
            eyebrow="Recommended for you"
            title="Sorted for your grade band and subject"
            description="Set it once and the library and prompt generator both use it."
            className="mb-8"
          />
          <h2 id="recommended" className="sr-only">
            Recommended for you
          </h2>
          <RecommendedForYou />
        </section>

        <section aria-labelledby="featured">
          <SectionHeading
            eyebrow="Most used"
            title="Where teachers usually start"
            description="The resources that answer the questions we hear first."
            action={{ href: "/library", label: "Browse the library" }}
            className="mb-8"
          />
          <h2 id="featured" className="sr-only">
            Most used resources
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredResources.slice(0, 6).map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>

        <section aria-labelledby="prompt-library">
          <SectionHeading
            eyebrow="Prompt library"
            title="Prompts written the way teachers plan"
            description="Constraints first, then the ask, then a self-check. Copy one, fill in the highlighted parts, and adapt what comes back."
            action={{ href: "/prompts", label: "Build your own" }}
            className="mb-8"
          />
          <h2 id="prompt-library" className="sr-only">
            Prompt library
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {prompts.slice(0, 4).map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24">
          <SectionHeading
            eyebrow="Common questions"
            title="The questions teachers ask first"
            className="mb-8"
          />
          <h2 id="faq-heading" className="sr-only">
            Frequently asked questions
          </h2>
          <FaqSection />

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline">
              <Link href="/guide">Read the classroom guide</Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/guide#checklist">Safe-use checklist</Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}
