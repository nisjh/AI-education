"use client";

import * as React from "react";
import { RotateCcw, Wand2 } from "lucide-react";

import { CopyButton } from "@/components/copy-button";
import { PromptBlock } from "@/components/prompt-block";
import { usePreferences } from "@/components/providers/preferences-provider";
import { ReviewNotice } from "@/components/notices";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { getPromptType, promptTypes } from "@/lib/data/prompt-types";
import {
  AI_PERMISSION_LEVELS,
  SUPPORT_OPTIONS,
  composePrompt,
  type AiPermissionLevel,
  type PromptRequest,
} from "@/lib/prompt-composer";
import { cn } from "@/lib/utils";
import {
  GRADE_BANDS,
  SUBJECTS,
  type GradeBand,
  type PromptType,
  type Subject,
} from "@/lib/types";

const ANY = "__any__";

export function PromptGenerator() {
  const { preferences, setGradeBand, setSubject } = usePreferences();

  const [promptType, setPromptType] = React.useState<PromptType>("lesson-plan");
  const [objective, setObjective] = React.useState("");
  const [outputFormat, setOutputFormat] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [classContext, setClassContext] = React.useState("");
  const [supports, setSupports] = React.useState<string[]>([]);
  const [permission, setPermission] = React.useState<AiPermissionLevel>(
    AI_PERMISSION_LEVELS[3],
  );

  const meta = getPromptType(promptType);

  // Output formats are specific to the prompt type, so a format left over from a
  // previous choice is ignored rather than carried into the prompt.
  const activeFormat = meta.outputFormats.includes(outputFormat) ? outputFormat : "";

  const request: PromptRequest = {
    promptType,
    gradeBand: preferences.gradeBand,
    subject: preferences.subject,
    objective,
    outputFormat: activeFormat,
    duration,
    classContext,
    supports,
    permission,
  };

  // Composition is pure string work on a handful of fields, so it runs on every
  // keystroke without memoization and the preview stays live.
  const generated = composePrompt(request);

  function reset() {
    setObjective("");
    setOutputFormat("");
    setDuration("");
    setClassContext("");
    setSupports([]);
    setPermission(AI_PERMISSION_LEVELS[3]);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-10">
      <form
        className="space-y-8"
        onSubmit={(event) => event.preventDefault()}
        aria-label="Prompt options"
      >
        <fieldset>
          <legend className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
            What do you need?
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {promptTypes.map((type) => {
              const Icon = type.icon;
              const active = type.id === promptType;

              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setPromptType(type.id)}
                  aria-pressed={active}
                  className={cn(
                    "flex gap-3 rounded-lg border p-3 text-left transition-colors",
                    active
                      ? "border-accent bg-accent-soft/50"
                      : "border-border hover:border-accent/40 hover:bg-surface",
                  )}
                >
                  <Icon
                    className={cn(
                      "mt-0.5 size-4 shrink-0",
                      active ? "text-accent" : "text-muted-foreground",
                    )}
                    aria-hidden
                  />
                  <span>
                    <span className="block text-sm font-medium">{type.name}</span>
                    <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                      {type.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
            Your class
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="gen-grade">Grade level</Label>
              <Select
                value={preferences.gradeBand ?? ANY}
                onValueChange={(value) =>
                  setGradeBand(value === ANY ? null : (value as GradeBand))
                }
              >
                <SelectTrigger id="gen-grade">
                  <SelectValue placeholder="Choose a grade band" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>Leave as a placeholder</SelectItem>
                  {GRADE_BANDS.map((band) => (
                    <SelectItem key={band} value={band}>
                      {band}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="gen-subject">Subject</Label>
              <Select
                value={preferences.subject ?? ANY}
                onValueChange={(value) =>
                  setSubject(value === ANY ? null : (value as Subject))
                }
              >
                <SelectTrigger id="gen-subject">
                  <SelectValue placeholder="Choose a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>Leave as a placeholder</SelectItem>
                  {SUBJECTS.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="gen-objective">Learning objective</Label>
            <Textarea
              id="gen-objective"
              value={objective}
              onChange={(event) => setObjective(event.target.value)}
              placeholder={meta.objectivePlaceholder}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              What students can do by the end. Paste the standard verbatim if you have
              it.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="gen-format">Desired output</Label>
              <Select
                value={activeFormat || ANY}
                onValueChange={(value) => setOutputFormat(value === ANY ? "" : value)}
              >
                <SelectTrigger id="gen-format">
                  <SelectValue placeholder="Choose a format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>Leave as a placeholder</SelectItem>
                  {meta.outputFormats.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="gen-duration">Time available</Label>
              <Input
                id="gen-duration"
                value={duration}
                onChange={(event) => setDuration(event.target.value)}
                placeholder="50-minute period"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="gen-context">Class context</Label>
            <Textarea
              id="gen-context"
              value={classContext}
              onChange={(event) => setClassContext(event.target.value)}
              placeholder="28 students, one set of laptops, we finished the unit on cell transport yesterday."
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              What students did last, materials on hand, anything that constrains this.
              No student names.
            </p>
          </div>
        </fieldset>

        <fieldset>
          <legend className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
            Learner needs to plan for
          </legend>
          <div className="mt-3 space-y-2.5">
            {SUPPORT_OPTIONS.map((option) => {
              const id = `support-${option.replace(/\W+/g, "-").toLowerCase()}`;
              return (
                <div key={option} className="flex items-start gap-2.5">
                  <Checkbox
                    id={id}
                    checked={supports.includes(option)}
                    onCheckedChange={(checked) =>
                      setSupports((current) =>
                        checked
                          ? [...current, option]
                          : current.filter((item) => item !== option),
                      )
                    }
                    className="mt-0.5"
                  />
                  <Label htmlFor={id} className="font-normal leading-relaxed">
                    {option}
                  </Label>
                </div>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="space-y-1.5">
          <legend className="mb-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
            Student AI permission on this task
          </legend>
          <Label htmlFor="gen-permission" className="sr-only">
            Student AI permission level
          </Label>
          <Select
            value={permission}
            onValueChange={(value) => setPermission(value as AiPermissionLevel)}
          >
            <SelectTrigger id="gen-permission">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {AI_PERMISSION_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </fieldset>

        <Button type="button" variant="ghost" size="sm" onClick={reset}>
          <RotateCcw aria-hidden />
          Reset the form
        </Button>
      </form>

      <div className="lg:sticky lg:top-24 lg:h-fit">
        <Card className="overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
            <p className="flex items-center gap-2 text-sm font-medium">
              <Wand2 className="size-4 text-accent" aria-hidden />
              Your prompt
            </p>
            <CopyButton value={generated} label="Copy prompt" />
          </div>

          <PromptBlock
            text={generated}
            className="max-h-[32rem] rounded-none border-0 bg-transparent"
          />

          <p className="border-t border-border bg-surface/50 px-4 py-3 text-xs leading-relaxed text-muted-foreground">
            Highlighted text is a placeholder — fill it in before you paste this into a
            tool, or leave it and answer when the tool asks.
          </p>
        </Card>

        <ReviewNotice className="mt-4" />
      </div>
    </div>
  );
}
