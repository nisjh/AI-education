import Link from "next/link";
import { Check, Info } from "lucide-react";

/** What an account is actually for, next to what never needs one. */
const WITH_ACCOUNT = [
  "Bookmarks across resources, prompts, and templates",
  "Template drafts saved as you type",
  "Your generation history in the curriculum tools",
  "Checklist progress in the classroom guide",
];

const WITHOUT_ACCOUNT = [
  "The full resource library and classroom guide",
  "The prompt generator and every prompt template",
  "The curriculum AI tools, start to finish",
  "Copying anything on the site",
];

export function AuthPageFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-16">
        <div>{children}</div>

        <div className="lg:pt-4">
          <p className="eyebrow">Accounts here</p>

          <h2 className="display mt-3 text-xl">
            Most of this site never asks who you are
          </h2>

          <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:gap-10">
            <section>
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground">
                No account needed
              </h3>
              <ul className="mt-3 space-y-2">
                {WITHOUT_ACCOUNT.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-border" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h3 className="font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-accent">
                What an account keeps
              </h3>
              <ul className="mt-3 space-y-2">
                {WITH_ACCOUNT.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground"
                  >
                    <Check className="mt-1 size-3.5 shrink-0 text-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Said plainly here rather than buried: this build has no server. */}
          <div className="mt-8 flex gap-3 rounded-lg border border-border bg-surface/60 p-4 text-sm leading-relaxed">
            <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            <div className="text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">
                  Accounts live in this browser.
                </span>{" "}
                This build has no server, so signing up creates an account on this
                device only — it will not follow you to another computer, and it is not
                a security boundary. Treat it as a way to keep your own work separate,
                not as somewhere to put anything sensitive.
              </p>
              <p className="mt-2">
                Never store student names, grades, or records here, the same as
                anywhere else. See{" "}
                <Link
                  href="/library/privacy-and-student-data"
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  what never goes into a prompt
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AuthFormSkeleton() {
  return (
    <div className="h-96 rounded-xl border border-border bg-surface/50" aria-hidden />
  );
}
