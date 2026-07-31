import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Clock } from "lucide-react";

import { PageHeader } from "@/components/page-header";
import { SaveButton } from "@/components/save-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { templates } from "@/lib/data/templates";

export const metadata: Metadata = {
  title: "Templates",
  description:
    "Editable templates for lesson plans, AI-assisted assignments, rubrics, student reflection, and a classroom AI agreement.",
};

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageHeader
        eyebrow="Templates"
        title="Fill these in here, then copy them out"
        description="Each template is editable in the browser and saves as you type. The prompts inside the fields tell you what to write, not what the field is called."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => {
          const Icon = template.icon;
          const fieldCount = template.sections.reduce(
            (count, section) => count + section.fields.length,
            0,
          );

          return (
            <Card
              key={template.id}
              className="group relative flex flex-col p-5 transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_6px_20px_rgba(12,35,64,0.07)]"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="size-5" aria-hidden />
                </span>
                <SaveButton
                  kind="template"
                  id={template.id}
                  title={template.title}
                  className="relative z-10"
                />
              </div>

              <h2 className="mt-4 text-base font-semibold">
                <Link
                  href={`/templates/${template.id}`}
                  className="after:absolute after:inset-0 after:content-['']"
                >
                  {template.title}
                </Link>
              </h2>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {template.summary}
              </p>

              <dl className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[0.6875rem] text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Time required</dt>
                  <Clock className="size-3.5" aria-hidden />
                  <dd>{template.timeRequired}</dd>
                </div>
                <div className="flex items-center gap-1.5">
                  <dt className="sr-only">Fields</dt>
                  <dd>{fieldCount} fields</dd>
                </div>
              </dl>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {template.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline" size="sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform duration-200 group-hover:translate-x-0.5">
                Open template
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
