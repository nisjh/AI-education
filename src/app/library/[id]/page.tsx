import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { MarginNote } from "@/components/margin-note";
import { ResourceCard } from "@/components/resource-card";
import { SaveButton } from "@/components/save-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/lib/data/categories";
import { getResource, resources } from "@/lib/data/resources";
import type { Resource, ResourceSection } from "@/lib/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return resources.map((resource) => ({ id: resource.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const resource = getResource(id);
  if (!resource) return { title: "Resource not found" };

  return { title: resource.title, description: resource.summary };
}

export default async function ResourcePage({ params }: PageProps) {
  const { id } = await params;
  const resource = getResource(id);
  if (!resource) notFound();

  const category = getCategory(resource.category);
  const CategoryIcon = category.icon;

  const related = resources
    .filter(
      (item) =>
        item.id !== resource.id &&
        (item.category === resource.category ||
          item.tags.some((tag) => resource.tags.includes(tag))),
    )
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link href={`/library?category=${resource.category}`}>
          <ArrowLeft aria-hidden />
          {category.name}
        </Link>
      </Button>

      <header className="mt-6 max-w-3xl">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-soft px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-accent">
          <CategoryIcon className="size-3.5" aria-hidden />
          {category.name}
        </span>

        <h1 className="display mt-4 text-3xl sm:text-4xl">{resource.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {resource.summary}
        </p>

        <SpecStrip resource={resource} className="mt-7" />

        <div className="mt-6 flex flex-wrap items-center gap-2">
          <SaveButton
            kind="resource"
            id={resource.id}
            title={resource.title}
            variant="full"
          />
          {resource.tags.map((tag) => (
            <Link key={tag} href={`/library?tag=${encodeURIComponent(tag)}`}>
              <Badge variant="outline" className="hover:border-accent/50">
                {tag}
              </Badge>
            </Link>
          ))}
        </div>
      </header>

      {/* Each section is a grid row so its margin note sits beside it, and folds
          in underneath on narrow screens where there is no margin to hang in. */}
      <div className="mt-14 space-y-12 lg:space-y-14">
        <Row
          note={
            <div className="space-y-5">
              <MarginNote kicker="Check before you use this" tone="flag">
                {resource.reviewNote}
              </MarginNote>
              {resource.sections[0].note && (
                <MarginNote kicker="Teacher's note">
                  {resource.sections[0].note}
                </MarginNote>
              )}
            </div>
          }
        >
          <Section section={resource.sections[0]} />
        </Row>

        {resource.sections.slice(1).map((section) => (
          <Row
            key={section.heading}
            note={
              section.note ? (
                <MarginNote kicker="Teacher's note">{section.note}</MarginNote>
              ) : null
            }
          >
            <Section section={section} />
          </Row>
        ))}
      </div>

      <div className="mt-16 max-w-3xl border-t border-border pt-8">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Need a prompt for this? The generator builds one around your grade,
          subject, and objective, with the parts you still have to fill in marked.
        </p>
        <Button asChild variant="outline" size="sm" className="mt-4">
          <Link href="/prompts">
            Open the prompt generator
            <ArrowUpRight aria-hidden />
          </Link>
        </Button>
      </div>

      {related.length > 0 && (
        <section className="mt-16 border-t border-border pt-10">
          <h2 className="display text-xl">Related resources</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ResourceCard key={item.id} resource={item} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

/** Prose column plus its margin. Notes hang right at lg and above. */
function Row({
  children,
  note,
}: {
  children: React.ReactNode;
  note: React.ReactNode;
}) {
  return (
    <div className="lg:grid lg:grid-cols-[minmax(0,42rem)_minmax(0,1fr)] lg:gap-12">
      <div className="max-w-3xl">{children}</div>
      {note && <div className="mt-5 lg:mt-1.5">{note}</div>}
    </div>
  );
}

function Section({ section }: { section: ResourceSection }) {
  return (
    <section>
      <h2 className="display text-xl">{section.heading}</h2>
      <p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p>
      {section.steps && <Steps section={section} />}
    </section>
  );
}

/**
 * Sequences are numbered because the order is the instruction. Sets get a
 * hairline, because numbering a menu of options implies an order that is not
 * there.
 */
function Steps({ section }: { section: ResourceSection }) {
  const steps = section.steps ?? [];

  if (section.stepKind === "sequence") {
    return (
      <ol className="mt-5 space-y-3">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-3.5">
            <span
              aria-hidden
              className="w-4 shrink-0 pt-1 text-right font-mono text-xs text-accent"
            >
              {index + 1}
            </span>
            <span className="leading-relaxed text-muted-foreground">{step}</span>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ul className="mt-5 space-y-3">
      {steps.map((step) => (
        <li key={step} className="flex gap-3.5">
          <span
            aria-hidden
            className="mt-3 h-px w-3.5 shrink-0 bg-accent/60"
          />
          <span className="leading-relaxed text-muted-foreground">{step}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * The facts a teacher checks before reading: time, audience, grades, subjects,
 * use case. Same mono language as the spec strip on every library card, so the
 * card and the article agree with each other.
 */
function SpecStrip({
  resource,
  className,
}: {
  resource: Resource;
  className?: string;
}) {
  const entries: [string, string][] = [
    ["Time", resource.timeRequired],
    ["Audience", resource.audience.join(", ")],
    ["Grades", resource.gradeBands.join(" · ")],
    ["Subjects", resource.subjects.join(", ")],
    ["Use case", resource.useCase],
  ];

  return (
    <dl
      className={`grid gap-x-8 gap-y-4 border-y border-border py-4 sm:grid-cols-2 lg:grid-cols-3 ${className ?? ""}`}
    >
      {entries.map(([term, value]) => (
        <div key={term}>
          <dt className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
            {term}
          </dt>
          <dd className="mt-1 text-sm leading-snug">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
