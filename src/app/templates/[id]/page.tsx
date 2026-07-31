import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, Clock, Users } from "lucide-react";

import { PrivacyNotice } from "@/components/notices";
import { TemplateEditor } from "@/components/templates/template-editor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTemplate, templates } from "@/lib/data/templates";

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return templates.map((template) => ({ id: template.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const template = getTemplate(id);
  if (!template) return { title: "Template not found" };

  return { title: template.title, description: template.summary };
}

export default async function TemplatePage({ params }: PageProps) {
  const { id } = await params;
  const template = getTemplate(id);
  if (!template) notFound();

  const Icon = template.icon;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <Button asChild variant="ghost" size="sm" className="-ml-3">
        <Link href="/templates">
          <ArrowLeft aria-hidden />
          All templates
        </Link>
      </Button>

      <header className="mt-6 max-w-3xl">
        <span className="flex size-11 items-center justify-center rounded-lg bg-accent-soft text-accent">
          <Icon className="size-5" aria-hidden />
        </span>

        <h1 className="display mt-4 text-3xl sm:text-4xl">{template.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {template.summary}
        </p>

        <dl className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Time required</dt>
            <Clock className="size-3.5" aria-hidden />
            <dd>{template.timeRequired}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Audience</dt>
            <Users className="size-3.5" aria-hidden />
            <dd>{template.audience.join(", ")}</dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {template.tags.map((tag) => (
            <Badge key={tag} variant="outline" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <div className="mt-12">
        <TemplateEditor templateId={template.id} />
      </div>

      <PrivacyNotice className="mt-10 max-w-3xl" />
    </div>
  );
}
