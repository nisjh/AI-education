import type { LucideIcon } from "lucide-react";

import type { GradeBand } from "@/lib/types";

export type CurriculumMode = "ib" | "ap";

/**
 * Subjects behave differently enough that the generator changes shape between
 * them. Family drives which generation tasks and sample outputs are offered.
 */
export type SubjectFamily = "quantitative" | "language" | "humanities";

export interface ToolSubject {
  id: string;
  name: string;
  family: SubjectFamily;
  icon: LucideIcon;
  /** IB subject group this normally sits in, shown as the default. */
  ibGroup: string;
  /** AP courses a teacher of this subject is likely to be running. */
  apCourses: string[];
}

export interface GenerationTask {
  id: string;
  name: string;
  /** One line a teacher would recognise as their actual job. */
  description: string;
  families: SubjectFamily[];
  /** The instruction block this task contributes to the composed prompt. */
  asks: string[];
  /** Sample request text shown as the example on the task card. */
  example: string;
}

export interface OutputFormat {
  id: string;
  name: string;
  description: string;
  /** How the model is told to lay the output out. */
  instruction: string;
}

export interface Transformation {
  id: string;
  name: string;
  instruction: string;
}

export type RefinementId =
  | "harder"
  | "easier"
  | "more-exam-like"
  | "more-inquiry";

export interface Refinement {
  id: RefinementId;
  label: string;
  instruction: string;
}

/** IB-specific settings. */
export interface IbSettings {
  programme: "MYP" | "DP";
  mypYear: "Year 1" | "Year 2" | "Year 3" | "Year 4" | "Year 5";
  dpLevel: "HL" | "SL";
  subjectGroup: string;
  paper: string;
  commandTerms: string[];
  atlSkills: string[];
  criterion: string;
}

/** AP-specific settings. */
export interface ApSettings {
  course: string;
  questionType: string;
}

export interface GenerationRequest {
  curriculum: CurriculumMode;
  subjectId: string;
  gradeBand: GradeBand | null;
  taskId: string;
  outputFormatIds: string[];
  transformationIds: string[];
  refinements: RefinementId[];
  quantity: number;
  objective: string;
  sourceText: string;
  sourceLabel: string;
  ib: IbSettings;
  ap: ApSettings;
}

export interface SampleItem {
  label: string;
  body: string;
}

export interface SampleOutput {
  /** Where this sample came from, stated plainly so nobody mistakes it for live output. */
  caption: string;
  items: SampleItem[];
}

export interface HistoryEntry {
  id: string;
  createdAt: number;
  title: string;
  summary: string;
  prompt: string;
  request: GenerationRequest;
}

export interface ExtractedSource {
  text: string;
  /** File name, or "Pasted text". */
  label: string;
  status: "empty" | "ready" | "needs-paste";
  /** Set when a file type cannot be read in the browser yet. */
  notice?: string;
}
