"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { usePreferences } from "@/components/providers/preferences-provider";
import { ResourceCard } from "@/components/resource-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { resources } from "@/lib/data/resources";
import { GRADE_BANDS, SUBJECTS } from "@/lib/types";
import type { GradeBand, Resource, Subject } from "@/lib/types";

const ANY = "__any__";

/** Higher score means a closer fit to what the teacher told us. */
function score(resource: Resource, gradeBand: GradeBand | null, subject: Subject | null) {
  let value = 0;

  if (gradeBand && resource.gradeBands.includes(gradeBand)) value += 3;
  if (subject) {
    if (resource.subjects.includes(subject)) value += 3;
    else if (resource.subjects.includes("All subjects")) value += 1;
  }
  if (resource.featured) value += 1;

  return value;
}

export function RecommendedForYou() {
  const { preferences, setGradeBand, setSubject, hasPreferences, ready } =
    usePreferences();

  const recommended = React.useMemo(() => {
    if (!hasPreferences) return [];

    return resources
      .map((resource) => ({
        resource,
        value: score(resource, preferences.gradeBand, preferences.subject),
      }))
      .filter((entry) => entry.value > 0)
      .sort((a, b) => b.value - a.value)
      .slice(0, 3)
      .map((entry) => entry.resource);
  }, [hasPreferences, preferences.gradeBand, preferences.subject]);

  return (
    <div className="space-y-6">
      <Card className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end">
        <div className="flex-1">
          <p className="flex items-center gap-2 font-medium">
            <Sparkles className="size-4 text-accent" aria-hidden />
            Tell us what you teach
          </p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
            We use it to sort what you see. It stays in this browser — no account, no
            server.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 sm:gap-2">
          <div className="space-y-1.5">
            <Label htmlFor="pref-grade" className="text-xs text-muted-foreground">
              Grade band
            </Label>
            <Select
              value={preferences.gradeBand ?? ANY}
              onValueChange={(value) =>
                setGradeBand(value === ANY ? null : (value as GradeBand))
              }
            >
              <SelectTrigger id="pref-grade" className="sm:w-40">
                <SelectValue placeholder="Any grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>Any grade</SelectItem>
                {GRADE_BANDS.map((band) => (
                  <SelectItem key={band} value={band}>
                    {band}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="pref-subject" className="text-xs text-muted-foreground">
              Subject
            </Label>
            <Select
              value={preferences.subject ?? ANY}
              onValueChange={(value) =>
                setSubject(value === ANY ? null : (value as Subject))
              }
            >
              <SelectTrigger id="pref-subject" className="sm:w-52">
                <SelectValue placeholder="Any subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ANY}>Any subject</SelectItem>
                {SUBJECTS.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {ready && hasPreferences && recommended.length > 0 && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommended.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>

          <Button asChild variant="ghost" size="sm">
            <Link
              href={buildLibraryHref(preferences.gradeBand, preferences.subject)}
            >
              See everything for {describe(preferences.gradeBand, preferences.subject)}
              <ArrowRight aria-hidden />
            </Link>
          </Button>
        </>
      )}

      {ready && !hasPreferences && (
        <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          Pick a grade band or subject above and we will put the most relevant
          resources here.
        </p>
      )}
    </div>
  );
}

function buildLibraryHref(gradeBand: GradeBand | null, subject: Subject | null) {
  const params = new URLSearchParams();
  if (gradeBand) params.set("grade", gradeBand);
  if (subject) params.set("subject", subject);
  const query = params.toString();
  return query ? `/library?${query}` : "/library";
}

function describe(gradeBand: GradeBand | null, subject: Subject | null) {
  if (gradeBand && subject) return `${gradeBand} ${subject.toLowerCase()}`;
  if (gradeBand) return gradeBand;
  if (subject) return subject.toLowerCase();
  return "your classroom";
}
