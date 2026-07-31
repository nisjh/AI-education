import type { LucideIcon } from "lucide-react";

export const GRADE_BANDS = [
  "K–2",
  "3–5",
  "6–8",
  "9–12",
  "Early college",
] as const;
export type GradeBand = (typeof GRADE_BANDS)[number];

export const SUBJECTS = [
  "English language arts",
  "Mathematics",
  "Science",
  "Social studies",
  "World languages",
  "Arts",
  "Computer science",
  "Career and technical education",
  "All subjects",
] as const;
export type Subject = (typeof SUBJECTS)[number];

export const AUDIENCES = [
  "Classroom teachers",
  "Instructional coaches",
  "School leaders",
  "New to AI",
] as const;
export type Audience = (typeof AUDIENCES)[number];

export const CATEGORY_IDS = [
  "lesson-planning",
  "assignment-design",
  "assessment",
  "classroom-activities",
  "ai-literacy",
  "safety-ethics",
  "policy-leadership",
  "prompt-templates",
] as const;
export type CategoryId = (typeof CATEGORY_IDS)[number];

export interface Category {
  id: CategoryId;
  name: string;
  /** One plain sentence describing what a teacher finds here. */
  description: string;
  icon: LucideIcon;
  /** Tailwind classes for the category chip, tuned for both themes. */
  accentClass: string;
}

export type UseCase =
  | "Plan a lesson"
  | "Design an assignment"
  | "Assess learning"
  | "Run an activity"
  | "Teach about AI"
  | "Set expectations"
  | "Lead a school"
  | "Save prep time";

export interface ResourceSection {
  heading: string;
  body: string;
  /** Optional ordered steps rendered as a checklist. */
  steps?: string[];
}

export interface Resource {
  id: string;
  title: string;
  summary: string;
  category: CategoryId;
  gradeBands: GradeBand[];
  subjects: Subject[];
  audience: Audience[];
  useCase: UseCase;
  /** Realistic prep estimate, e.g. "15 min". */
  timeRequired: string;
  tags: string[];
  featured?: boolean;
  /** Longer read shown on the resource detail page. */
  sections: ResourceSection[];
  /** What a teacher should double-check before using AI output from this. */
  reviewNote: string;
}

export const PROMPT_TYPES = [
  "lesson-plan",
  "differentiated-activity",
  "quiz",
  "writing-assignment",
  "project-based-learning",
  "feedback-comments",
  "discussion-questions",
] as const;
export type PromptType = (typeof PROMPT_TYPES)[number];

export interface PromptTypeMeta {
  id: PromptType;
  name: string;
  description: string;
  icon: LucideIcon;
  /** Placeholder copy for the learning objective field, per prompt type. */
  objectivePlaceholder: string;
  /** Output formats that make sense for this prompt type. */
  outputFormats: string[];
}

export interface PromptTemplate {
  id: string;
  title: string;
  summary: string;
  promptType: PromptType;
  gradeBands: GradeBand[];
  subjects: Subject[];
  tags: string[];
  /** The prompt body. Placeholders use [BRACKETED CAPS]. */
  template: string;
  /** Short, concrete notes on getting a better result. */
  tips: string[];
}

export interface TemplateField {
  id: string;
  label: string;
  /** Guidance shown under the label — what to write, not what the field is. */
  hint: string;
  placeholder: string;
  /** Rendered as a textarea when true. */
  multiline?: boolean;
  rows?: number;
}

export interface TemplateSection {
  id: string;
  heading: string;
  fields: TemplateField[];
}

export interface DocTemplate {
  id: string;
  title: string;
  summary: string;
  audience: Audience[];
  timeRequired: string;
  icon: LucideIcon;
  tags: string[];
  sections: TemplateSection[];
  /** Line printed at the bottom of every exported copy. */
  footerNote: string;
}

export type SavedKind = "resource" | "prompt" | "template";

export interface SavedItem {
  kind: SavedKind;
  id: string;
  savedAt: number;
}

export interface TeacherPreferences {
  gradeBand: GradeBand | null;
  subject: Subject | null;
}

export interface FaqItem {
  question: string;
  answer: string[];
}
