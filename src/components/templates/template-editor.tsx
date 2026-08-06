"use client";

import * as React from "react";
import { RotateCcw, Save } from "lucide-react";

import { CopyButton } from "@/components/copy-button";
import { SaveButton } from "@/components/save-button";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SignInPrompt } from "@/components/auth/sign-in-prompt";
import { useAccountStorage } from "@/hooks/use-account-storage";
import { getTemplate } from "@/lib/data/templates";
import { STORAGE_KEYS } from "@/lib/storage";
import type { DocTemplate } from "@/lib/types";

type Drafts = Record<string, Record<string, string>>;

const NO_DRAFTS: Drafts = {};
const NO_VALUES: Record<string, string> = {};

/** Renders the filled template as plain text a teacher can paste anywhere. */
function toPlainText(template: DocTemplate, values: Record<string, string>) {
  const lines: string[] = [template.title, "=".repeat(template.title.length), ""];

  for (const section of template.sections) {
    lines.push(section.heading.toUpperCase(), "");
    for (const field of section.fields) {
      const value = values[field.id]?.trim();
      lines.push(`${field.label}:`);
      lines.push(value && value.length > 0 ? value : `[${field.hint}]`);
      lines.push("");
    }
  }

  lines.push("---", template.footerNote);
  return lines.join("\n");
}

/**
 * Takes an id rather than the template object: templates carry a Lucide icon
 * component, which cannot cross the server/client boundary as a prop.
 */
export function TemplateEditor({ templateId }: { templateId: string }) {
  const template = getTemplate(templateId);

  // Drafts for every template live under one key, so a teacher can move between
  // templates and come back to each one as they left it.
  const [drafts, setDrafts, { persists }] = useAccountStorage<Drafts>(
    STORAGE_KEYS.templateDrafts,
    NO_DRAFTS,
  );
  const values = drafts[templateId] ?? NO_VALUES;

  const setValues = React.useCallback(
    (update: (current: Record<string, string>) => Record<string, string>) => {
      setDrafts((current) => ({
        ...current,
        [templateId]: update(current[templateId] ?? NO_VALUES),
      }));
    },
    [setDrafts, templateId],
  );

  if (!template) return null;

  const filled = template.sections
    .flatMap((section) => section.fields)
    .filter((field) => (values[field.id] ?? "").trim().length > 0).length;
  const total = template.sections.reduce(
    (count, section) => count + section.fields.length,
    0,
  );

  function clearDraft() {
    setValues(() => ({}));
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-10">
      <form className="space-y-10" onSubmit={(event) => event.preventDefault()}>
        {template.sections.map((section) => (
          <fieldset key={section.id}>
            <legend className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
              {section.heading}
            </legend>

            <div className="mt-4 space-y-5">
              {section.fields.map((field) => (
                <div key={field.id} className="space-y-1.5">
                  <Label htmlFor={`${template.id}-${field.id}`}>{field.label}</Label>
                  <p
                    id={`${template.id}-${field.id}-hint`}
                    className="text-xs leading-relaxed text-muted-foreground"
                  >
                    {field.hint}
                  </p>
                  {field.multiline ? (
                    <Textarea
                      id={`${template.id}-${field.id}`}
                      aria-describedby={`${template.id}-${field.id}-hint`}
                      rows={field.rows ?? 3}
                      value={values[field.id] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [field.id]: event.target.value,
                        }))
                      }
                    />
                  ) : (
                    <Input
                      id={`${template.id}-${field.id}`}
                      aria-describedby={`${template.id}-${field.id}-hint`}
                      value={values[field.id] ?? ""}
                      placeholder={field.placeholder}
                      onChange={(event) =>
                        setValues((current) => ({
                          ...current,
                          [field.id]: event.target.value,
                        }))
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </fieldset>
        ))}
      </form>

      <aside className="lg:sticky lg:top-24 lg:h-fit">
        <Card className="p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
              This draft
            </p>
            <span
              className="flex items-center gap-1.5 font-mono text-[0.6875rem] text-muted-foreground"
              aria-live="polite"
            >
              <Save className="size-3.5" aria-hidden />
              {filled}/{total} filled
            </span>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {persists
              ? "Saved to your account as you type, on this browser. Nothing is uploaded."
              : "You can fill this in and copy it right now. Keeping the draft for next time needs an account."}
          </p>

          {!persists && (
            <SignInPrompt
              className="mt-4"
              variant="inline"
              title="Log in to keep this draft"
              detail="Without an account it clears when you leave the page. Copy as text still works."
            />
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <CopyButton
              value={toPlainText(template, values)}
              label="Copy as text"
              variant="default"
            />
            <SaveButton
              kind="template"
              id={template.id}
              title={template.title}
              variant="full"
            />
          </div>

          {filled > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-muted-foreground"
              onClick={clearDraft}
            >
              <RotateCcw aria-hidden />
              Clear this draft
            </Button>
          )}

          <p className="mt-5 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
            {template.footerNote}
          </p>
        </Card>
      </aside>
    </div>
  );
}
