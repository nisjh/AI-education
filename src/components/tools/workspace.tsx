"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Wand2 } from "lucide-react";

import { PrivacyNotice, ReviewNotice } from "@/components/notices";
import { usePreferences } from "@/components/providers/preferences-provider";
import { CurriculumToggle } from "@/components/tools/curriculum-toggle";
import { GenerationPreview } from "@/components/tools/generation-preview";
import { HistoryPanel } from "@/components/tools/history-panel";
import { LevelSelector } from "@/components/tools/level-selector";
import { OutputSelector } from "@/components/tools/output-selector";
import { SourcePreview } from "@/components/tools/source-preview";
import { SubjectSelector } from "@/components/tools/subject-selector";
import { UploadArea } from "@/components/tools/upload-area";
import { Button } from "@/components/ui/button";
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
import { useAccountStorage } from "@/hooks/use-account-storage";
import { composeGenerationPrompt, describeGeneration } from "@/lib/tools/composer";
import { DEFAULT_AP, DEFAULT_IB } from "@/lib/tools/curricula";
import { EMPTY_SOURCE, extractFromText } from "@/lib/tools/extraction";
import { getSample } from "@/lib/tools/samples";
import { getToolSubject, subjectMap } from "@/lib/tools/subjects";
import { tasksForFamily } from "@/lib/tools/tasks";
import type {
  ApSettings,
  CurriculumMode,
  ExtractedSource,
  GenerationRequest,
  HistoryEntry,
  IbSettings,
  RefinementId,
} from "@/lib/tools/types";
import { GRADE_BANDS, type GradeBand } from "@/lib/types";
import { cn } from "@/lib/utils";

const HISTORY_KEY = "acrh.tool-history.v1";
const NO_HISTORY: HistoryEntry[] = [];
const HISTORY_LIMIT = 12;
const ANY = "__any__";

const STEPS = [
  { id: "step-source", label: "Upload or paste" },
  { id: "step-curriculum", label: "Choose curriculum" },
  { id: "step-subject", label: "Subject and level" },
  { id: "step-output", label: "Output type" },
  { id: "step-generate", label: "Generate" },
] as const;

export function ToolsWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { preferences, setGradeBand } = usePreferences();

  const initialCurriculum: CurriculumMode =
    searchParams.get("curriculum") === "ap" ? "ap" : "ib";
  const requestedSubject = searchParams.get("subject");
  const initialSubject = subjectMap.has(requestedSubject ?? "")
    ? (requestedSubject as string)
    : "math";

  const [curriculum, setCurriculum] = React.useState<CurriculumMode>(initialCurriculum);
  const [source, setSource] = React.useState<ExtractedSource>(EMPTY_SOURCE);
  const [subjectId, setSubjectId] = React.useState(initialSubject);
  const [taskId, setTaskId] = React.useState("similar-problems");
  const [outputFormatIds, setOutputFormatIds] = React.useState<string[]>([
    "practice-questions",
    "answer-key",
  ]);
  const [transformationIds, setTransformationIds] = React.useState<string[]>([]);
  const [refinementIds, setRefinementIds] = React.useState<RefinementId[]>([]);
  const [quantity, setQuantity] = React.useState(8);
  const [objective, setObjective] = React.useState("");
  const [ib, setIb] = React.useState<IbSettings>(() => ({
    ...DEFAULT_IB,
    subjectGroup: getToolSubject(initialSubject).ibGroup,
  }));
  const [ap, setAp] = React.useState<ApSettings>(() => ({
    ...DEFAULT_AP,
    course: getToolSubject(initialSubject).apCourses[0] ?? DEFAULT_AP.course,
  }));

  const [history, setHistory, { persists: historyPersists }] =
    useAccountStorage<HistoryEntry[]>(HISTORY_KEY, NO_HISTORY);

  const subject = getToolSubject(subjectId);
  const availableTasks = tasksForFamily(subject.family);
  // Derived rather than corrected in an effect: switching subject can invalidate
  // the chosen task, so fall back to the first task the new family supports.
  const activeTaskId = availableTasks.some((task) => task.id === taskId)
    ? taskId
    : availableTasks[0].id;

  const request: GenerationRequest = {
    curriculum,
    subjectId,
    gradeBand: preferences.gradeBand,
    taskId: activeTaskId,
    outputFormatIds,
    transformationIds,
    refinements: refinementIds,
    quantity,
    objective,
    sourceText: source.text,
    sourceLabel: source.label,
    ib,
    ap,
  };

  const prompt = composeGenerationPrompt(request);
  const sample = getSample(activeTaskId, subject.family, curriculum);
  const sourceReady = source.text.trim().length > 0;

  function changeCurriculum(mode: CurriculumMode) {
    setCurriculum(mode);
    const params = new URLSearchParams(searchParams.toString());
    params.set("curriculum", mode);
    router.replace(`/tools?${params.toString()}`, { scroll: false });
  }

  function changeSubject(nextId: string) {
    setSubjectId(nextId);
    const next = getToolSubject(nextId);
    // Subject group and AP course follow the subject until the teacher overrides them.
    setIb((current) => ({ ...current, subjectGroup: next.ibGroup }));
    setAp((current) => ({ ...current, course: next.apCourses[0] ?? current.course }));
  }

  function toggle<T>(list: T[], value: T) {
    return list.includes(value)
      ? list.filter((item) => item !== value)
      : [...list, value];
  }

  function generate() {
    const { title, summary } = describeGeneration(request);
    const entry: HistoryEntry = {
      id:
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : String(Date.now()),
      createdAt: Date.now(),
      title,
      summary,
      prompt,
      request,
    };

    setHistory((current) => [entry, ...current].slice(0, HISTORY_LIMIT));
    document
      .getElementById("generation-output")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function restore(entry: HistoryEntry) {
    const restored = entry.request;
    setCurriculum(restored.curriculum);
    setSubjectId(restored.subjectId);
    setTaskId(restored.taskId);
    setOutputFormatIds(restored.outputFormatIds);
    setTransformationIds(restored.transformationIds);
    setRefinementIds(restored.refinements);
    setQuantity(restored.quantity);
    setObjective(restored.objective);
    setIb(restored.ib);
    setAp(restored.ap);
    setSource({
      text: restored.sourceText,
      label: restored.sourceLabel,
      status: restored.sourceText.trim() ? "ready" : "empty",
    });
    document
      .getElementById("step-source")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_28rem]">
      <div className="space-y-12">
        <Step id="step-source" number={1} title="Upload or paste your material">
          <p className="text-sm leading-relaxed text-muted-foreground">
            A worksheet, a past paper question, a passage, or a vocabulary list.
            Everything stays in your browser.
          </p>

          <div className="mt-5 space-y-5">
            <UploadArea
              onExtracted={(next) =>
                setSource((current) =>
                  // A file we cannot read yet must not wipe text already pasted.
                  next.text.trim().length === 0 && current.text.trim().length > 0
                    ? { ...current, notice: next.notice }
                    : next,
                )
              }
            />
            <SourcePreview
              source={source}
              onChange={(text) =>
                setSource((current) => ({
                  ...extractFromText(text),
                  label: current.label || "Pasted text",
                  notice: current.notice,
                }))
              }
              onClear={() => setSource(EMPTY_SOURCE)}
            />
          </div>
        </Step>

        <Step id="step-curriculum" number={2} title="Choose the curriculum">
          <CurriculumToggle value={curriculum} onChange={changeCurriculum} />
        </Step>

        <Step id="step-subject" number={3} title="Choose subject and level">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium">Subject</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Changes which generators are offered and how questions are worded.
              </p>
              <div className="mt-3">
                <SubjectSelector value={subjectId} onChange={changeSubject} />
              </div>
            </div>

            <LevelSelector
              curriculum={curriculum}
              subjectId={subjectId}
              ib={ib}
              ap={ap}
              onIbChange={(next) => setIb((current) => ({ ...current, ...next }))}
              onApChange={(next) => setAp((current) => ({ ...current, ...next }))}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="tool-grade">Grade band</Label>
                <Select
                  value={preferences.gradeBand ?? ANY}
                  onValueChange={(value) =>
                    setGradeBand(value === ANY ? null : (value as GradeBand))
                  }
                >
                  <SelectTrigger id="tool-grade">
                    <SelectValue placeholder="Any grade" />
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
                <Label htmlFor="tool-quantity">How many items</Label>
                <Input
                  id="tool-quantity"
                  type="number"
                  min={1}
                  max={30}
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(
                      Math.min(30, Math.max(1, Number(event.target.value) || 1)),
                    )
                  }
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="tool-objective">Learning objective</Label>
              <Textarea
                id="tool-objective"
                rows={2}
                value={objective}
                onChange={(event) => setObjective(event.target.value)}
                placeholder="Students can use the discriminant to determine the number of real roots."
              />
              <p className="text-xs text-muted-foreground">
                Optional, but it is what keeps the generated items on target.
              </p>
            </div>
          </div>
        </Step>

        <Step id="step-output" number={4} title="Choose what to generate">
          <div className="space-y-6">
            <fieldset>
              <legend className="text-sm font-medium">
                Generator for {subject.name.toLowerCase()}
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {availableTasks.map((task) => {
                  const active = task.id === activeTaskId;
                  return (
                    <button
                      key={task.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setTaskId(task.id)}
                      className={cn(
                        "rounded-lg border p-3 text-left transition-colors",
                        active
                          ? "border-accent bg-accent-soft/50"
                          : "border-border hover:border-accent/40 hover:bg-surface",
                      )}
                    >
                      <span className="block text-sm font-medium">{task.name}</span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                        {task.description}
                      </span>
                      <span className="mt-2 block font-mono text-[0.6875rem] leading-relaxed text-accent">
                        {task.example}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <OutputSelector
              outputFormatIds={outputFormatIds}
              transformationIds={transformationIds}
              onToggleFormat={(id) =>
                setOutputFormatIds((current) => toggle(current, id))
              }
              onToggleTransformation={(id) =>
                setTransformationIds((current) => toggle(current, id))
              }
            />
          </div>
        </Step>

        <Step id="step-generate" number={5} title="Generate">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={generate} disabled={!sourceReady}>
              <Wand2 aria-hidden />
              Generate
            </Button>
            <p className="text-sm text-muted-foreground">
              {sourceReady
                ? "Builds your prompt and saves it to your history."
                : "Add source material in step 1 first."}
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            <ReviewNotice>
              <span className="font-medium text-foreground">
                Review every question before you use it.
              </span>{" "}
              <span className="text-muted-foreground">
                Generated items drift in difficulty, and a distractor that looks wrong is
                sometimes defensible. These are drafts for you to mark up, not a set to
                hand out unread — and not answers to share with students.
              </span>
            </ReviewNotice>
            <PrivacyNotice />
          </div>
        </Step>
      </div>

      <div className="space-y-4 lg:sticky lg:top-24 lg:h-fit">
        <nav aria-label="Steps" className="hidden lg:block">
          <ol className="space-y-1">
            {STEPS.map((step, index) => (
              <li key={step.id}>
                <a
                  href={`#${step.id}`}
                  className="flex items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                >
                  <span
                    aria-hidden
                    className="flex size-5 items-center justify-center rounded border border-border font-mono text-[0.625rem]"
                  >
                    {index + 1}
                  </span>
                  {step.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div id="generation-output" className="scroll-mt-24">
          <GenerationPreview
            prompt={prompt}
            sample={sample}
            active={refinementIds}
            ready={sourceReady}
            onRefine={(id) => setRefinementIds((current) => toggle(current, id))}
          />
        </div>

        <HistoryPanel
          persists={historyPersists}
          entries={history}
          onRestore={restore}
          onRemove={(id) =>
            setHistory((current) => current.filter((entry) => entry.id !== id))
          }
          onClear={() => setHistory([])}
        />
      </div>
    </div>
  );
}

function Step({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24">
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <span
          aria-hidden
          className="flex size-7 shrink-0 items-center justify-center rounded-md bg-accent-soft font-mono text-xs text-accent"
        >
          {number}
        </span>
        <h2 id={`${id}-heading`} className="display text-xl">
          {title}
        </h2>
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}
