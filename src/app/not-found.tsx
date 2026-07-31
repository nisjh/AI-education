import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="eyebrow">404</p>
      <h1 className="display mt-4 text-3xl sm:text-4xl">
        That page is not in the library
      </h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">
        The link may be out of date, or the resource may have been renamed. The library
        search is the fastest way to find what you were after.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/library">Search the library</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/">Back to the start</Link>
        </Button>
      </div>
    </div>
  );
}
