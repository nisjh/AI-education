import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Check, Clock, GraduationCap, Users } from "lucide-react";

import { ReviewNotice } from "@/components/notices";
import { ResourceCard } from "@/components/resource-card";
import { SaveButton } from "@/components/save-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCategory } from "@/lib/data/categories";
import { getResource, resources } from "@/lib/data/resources";

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

      <div className="mt-6 grid gap-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
        <div>
          <header>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-accent-soft px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-wider text-accent">
              <CategoryIcon className="size-3.5" aria-hidden />
              {category.name}
            </span>

            <h1 className="display mt-4 text-3xl sm:text-4xl">{resource.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {resource.summary}
            </p>

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

          <div className="mt-10 space-y-10">
            {resource.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="display text-xl">{section.heading}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {section.body}
                </p>

                {section.steps && (
                  <ul className="mt-4 space-y-2.5">
                    {section.steps.map((step) => (
                      <li key={step} className="flex gap-3">
                        <Check
                          className="mt-1 size-4 shrink-0 text-accent"
                          aria-hidden
                        />
                        <span className="leading-relaxed text-muted-foreground">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <ReviewNotice className="mt-10">
            <span className="font-medium text-foreground">Before you use this: </span>
            <span className="text-muted-foreground">{resource.reviewNote}</span>
          </ReviewNotice>
        </div>

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-xl border border-border bg-surface/60 p-5">
            <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
              At a glance
            </h2>

            <dl className="mt-4 space-y-4 text-sm">
              <Detail icon={Clock} label="Time required">
                {resource.timeRequired}
              </Detail>
              <Detail icon={Users} label="Audience">
                {resource.audience.join(", ")}
              </Detail>
              <Detail icon={GraduationCap} label="Grade bands">
                {resource.gradeBands.join(" · ")}
              </Detail>
              <div>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                  Subjects
                </dt>
                <dd className="mt-1.5 leading-relaxed">
                  {resource.subjects.join(", ")}
                </dd>
              </div>
              <div>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
                  Use case
                </dt>
                <dd className="mt-1.5">{resource.useCase}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-4 rounded-xl border border-border p-5">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Need a prompt for this? The generator builds one around your grade,
              subject, and objective.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-3">
              <Link href="/prompts">Open the prompt generator</Link>
            </Button>
          </div>
        </aside>
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

function Detail({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </dt>
      <dd className="mt-1.5 leading-relaxed">{children}</dd>
    </div>
  );
}
