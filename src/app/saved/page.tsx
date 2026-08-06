import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { SavedList } from "@/components/saved/saved-list";

export const metadata: Metadata = {
  title: "Saved items",
  description:
    "Your bookmarked resources, prompts, and templates.",
};

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageHeader
        eyebrow="Saved items"
        title="What you have kept for later"
        description="Bookmarks are kept against your account on this browser. Nothing is uploaded, and clearing your browser data clears them."
      />

      <div className="mt-12">
        <SavedList />
      </div>
    </div>
  );
}
