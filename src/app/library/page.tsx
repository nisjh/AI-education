import { Suspense } from "react";
import type { Metadata } from "next";

import { LibraryBrowser } from "@/components/library/library-browser";
import { PageHeader } from "@/components/page-header";

export const metadata: Metadata = {
  title: "Resource library",
  description:
    "Filterable classroom resources and prompt templates by category, grade band, subject, and use case.",
};

export default function LibraryPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageHeader
        eyebrow="Resource library"
        title="Everything, filtered down to what you teach"
        description="Resources and prompt templates for K–12 and early college. Each one says who it is for, how long it takes, and what to check before you use it."
      />

      <div className="mt-12">
        <Suspense fallback={<LibrarySkeleton />}>
          <LibraryBrowser />
        </Suspense>
      </div>
    </div>
  );
}

function LibrarySkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-10">
      <div className="hidden h-96 rounded-xl bg-surface lg:block" aria-hidden />
      <div className="space-y-4">
        <div className="h-11 rounded-md bg-surface" aria-hidden />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="h-56 rounded-xl bg-surface" aria-hidden />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading the library</span>
    </div>
  );
}
