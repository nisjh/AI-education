import Link from "next/link";

import { PrivacyNotice, ReviewNotice } from "@/components/notices";

const COLUMNS = [
  {
    heading: "Find",
    links: [
      { href: "/library", label: "Resource library" },
      { href: "/tools", label: "Curriculum AI tools" },
      { href: "/prompts", label: "Prompt generator" },
      { href: "/templates", label: "Templates" },
      { href: "/saved", label: "Saved items" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { href: "/guide", label: "Classroom guide" },
      { href: "/guide#integrity", label: "Academic integrity" },
      { href: "/guide#policies", label: "Example policies" },
      { href: "/guide#checklist", label: "Safe-use checklist" },
    ],
  },
  {
    heading: "Start",
    links: [
      { href: "/tools?curriculum=ib", label: "IB DP / MYP tools" },
      { href: "/tools?curriculum=ap", label: "AP tools" },
      { href: "/library/first-week-with-ai", label: "Your first week" },
      { href: "/library/privacy-and-student-data", label: "What never goes in a prompt" },
      { href: "/#faq", label: "Common questions" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-surface/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <p className="display text-lg">AI Classroom Resource Hub</p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Practical, reviewed guidance for teachers deciding how AI fits in their
              classroom. Free to use, no account needed.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.heading} aria-label={column.heading}>
              <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
                {column.heading}
              </h2>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-2">
          <ReviewNotice />
          <PrivacyNotice />
        </div>

        <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
          This site offers professional guidance, not legal advice. Your district&apos;s
          policies govern what tools you and your students may use. Sample content is
          provided for demonstration and should be adapted to your context.
        </p>
      </div>
    </footer>
  );
}
