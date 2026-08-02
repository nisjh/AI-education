import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { getCategory } from "@/lib/data/categories";
import { resources } from "@/lib/data/resources";
import type { CategoryId } from "@/lib/types";

const FEATURED: CategoryId[] = [
  "lesson-planning",
  "assignment-design",
  "classroom-activities",
  "safety-ethics",
  "policy-leadership",
];

export function FeaturedCategories() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURED.map((id) => {
        const category = getCategory(id);
        const Icon = category.icon;
        const count = resources.filter((resource) => resource.category === id).length;

        return (
          <Card
            key={id}
            className="group relative flex flex-col p-5 transition-[border-color,box-shadow,transform] duration-200 hover:border-accent/40 hover:shadow-[0_6px_20px_rgba(12,35,64,0.07)]"
          >
            <span className="flex size-10 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Icon className="size-5" aria-hidden />
            </span>

            <h3 className="mt-4 text-base font-semibold">
              <Link
                href={`/library?category=${id}`}
                className="after:absolute after:inset-0 after:content-['']"
              >
                {category.name}
              </Link>
            </h3>

            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {category.description}
            </p>

            <span className="mt-4 flex items-center justify-between font-mono text-[0.6875rem] uppercase tracking-wider text-muted-foreground">
              {count} {count === 1 ? "resource" : "resources"}
              <ArrowUpRight
                className="size-4 text-primary transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden
              />
            </span>
          </Card>
        );
      })}

      <Card className="flex flex-col justify-between gap-4 border-dashed bg-surface/50 p-5">
        <div>
          <h3 className="text-base font-semibold">Everything else</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Rubrics and assessment, student AI literacy, and the full prompt library.
          </p>
        </div>
        <Link
          href="/library"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
        >
          Browse all {resources.length} resources
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </Card>
    </div>
  );
}
