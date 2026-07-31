import type { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { SavedList } from "@/components/saved/saved-list";

export const metadata: Metadata = {
  title: "Saved items",
  description:
    "Your bookmarked resources, prompts, and templates, stored in this browser without an account.",
};

export default function SavedPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-16">
      <PageHeader
        eyebrow="Saved items"
        title="What you have kept for later"
        description="Bookmarks are stored in this browser only. Nothing is uploaded, and clearing your browser data clears this list."
      />

      <div className="mt-12">
        <SavedList />
      </div>
    </div>
  );
}
