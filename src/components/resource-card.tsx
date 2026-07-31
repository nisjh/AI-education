import Link from "next/link";
import { ArrowUpRight, Clock, Users } from "lucide-react";

import { SaveButton } from "@/components/save-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getCategory } from "@/lib/data/categories";
import { cn } from "@/lib/utils";
import type { Resource } from "@/lib/types";

export function ResourceCard({
  resource,
  className,
}: {
  resource: Resource;
  className?: string;
}) {
  const category = getCategory(resource.category);
  const Icon = category.icon;

  return (
    <Card
      className={cn(
        "group relative flex flex-col transition-[border-color,box-shadow,transform] duration-200",
        "hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-[0_6px_20px_rgba(12,35,64,0.07)]",
        "focus-within:border-accent/60",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3 p-5 pb-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-wider",
            category.accentClass,
          )}
        >
          <Icon className="size-3.5" aria-hidden />
          {category.name}
        </span>
        {/* Sits above the card-wide link overlay so it stays clickable. */}
        <SaveButton
          kind="resource"
          id={resource.id}
          title={resource.title}
          className="relative z-10"
        />
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5">
        <h3 className="text-base font-semibold leading-snug">
          <Link
            href={`/library/${resource.id}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {resource.title}
          </Link>
        </h3>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {resource.summary}
        </p>

        {/* Spec strip: the same three facts on every card, in the same order. */}
        <dl className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono text-[0.6875rem] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Time required</dt>
            <Clock className="size-3.5" aria-hidden />
            <dd>{resource.timeRequired}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Audience</dt>
            <Users className="size-3.5" aria-hidden />
            <dd>{resource.audience.join(", ")}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <dt className="sr-only">Grade bands</dt>
            <dd>{formatGradeBands(resource)}</dd>
          </div>
        </dl>

        <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-1">
          {resource.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" size="sm">
              {tag}
            </Badge>
          ))}
        </div>

        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform duration-200 group-hover:translate-x-0.5">
          Read it
          <ArrowUpRight className="size-4" aria-hidden />
        </span>
      </div>
    </Card>
  );
}

function formatGradeBands(resource: Resource) {
  if (resource.gradeBands.length >= 5) return "All grades";
  return resource.gradeBands.join(" · ");
}
