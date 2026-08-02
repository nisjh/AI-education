import type { ApSettings, CurriculumMode, IbSettings } from "@/lib/tools/types";

export const CURRICULUM_LABEL: Record<CurriculumMode, string> = {
  ib: "IB DP / MYP",
  ap: "AP",
};

export const CURRICULUM_BLURB: Record<CurriculumMode, string> = {
  ib: "Inquiry-led wording, command terms, criterion language, and ATL skills.",
  ap: "Exam-style rigor, concise stems, and AP question formats.",
};

/* ---------------------------------------------------------------- IB ----- */

export const IB_SUBJECT_GROUPS = [
  "Group 1: Studies in language and literature",
  "Group 2: Language acquisition",
  "Group 3: Individuals and societies",
  "Group 4: Sciences",
  "Group 5: Mathematics",
  "Group 6: The arts",
  "MYP: Design",
  "MYP: Physical and health education",
] as const;

export const MYP_YEARS = [
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
  "Year 5",
] as const;

export const DP_LEVELS = ["HL", "SL"] as const;

export const IB_PAPERS = [
  "Not paper-specific",
  "Paper 1",
  "Paper 2",
  "Paper 3",
  "Internal assessment practice",
] as const;

/**
 * Command terms as the IB defines them by cognitive demand. The list is
 * deliberately short — these are the ones that show up on most papers.
 */
export const COMMAND_TERMS = [
  { term: "State", level: "Recall" },
  { term: "Outline", level: "Recall" },
  { term: "Describe", level: "Understanding" },
  { term: "Explain", level: "Understanding" },
  { term: "Compare", level: "Analysis" },
  { term: "Analyse", level: "Analysis" },
  { term: "Distinguish", level: "Analysis" },
  { term: "Evaluate", level: "Evaluation" },
  { term: "Discuss", level: "Evaluation" },
  { term: "Justify", level: "Evaluation" },
  { term: "To what extent", level: "Evaluation" },
] as const;

export const ATL_SKILLS = [
  "Thinking skills",
  "Research skills",
  "Communication skills",
  "Social skills",
  "Self-management skills",
] as const;

/**
 * Criterion names differ by subject group; these are the MYP shapes teachers
 * recognise. The UI says explicitly that the wording varies by subject.
 */
export const MYP_CRITERIA = [
  "Not criterion-specific",
  "Criterion A: Knowing and understanding",
  "Criterion B: Inquiring and analysing / Investigating",
  "Criterion C: Communicating / Creating",
  "Criterion D: Thinking critically / Reflecting",
] as const;

export const DEFAULT_IB: IbSettings = {
  programme: "DP",
  mypYear: "Year 4",
  dpLevel: "SL",
  subjectGroup: "Group 4: Sciences",
  paper: "Not paper-specific",
  commandTerms: ["Explain", "Analyse", "Evaluate"],
  atlSkills: ["Thinking skills"],
  criterion: "Not criterion-specific",
};

/* ---------------------------------------------------------------- AP ----- */

export const AP_QUESTION_TYPES = [
  {
    id: "mcq",
    name: "Multiple choice (MCQ)",
    instruction:
      "Write stems in AP multiple-choice style: a short stimulus or scenario, one clearly correct option, and distractors that each represent a specific misunderstanding. Four options, labelled A–D.",
  },
  {
    id: "frq",
    name: "Free response (FRQ)",
    instruction:
      "Write a multi-part free-response question with parts (a), (b), (c). Each part should demand a different skill, and the point value of each part must be stated.",
  },
  {
    id: "saq",
    name: "Short answer (SAQ)",
    instruction:
      "Write short-answer questions with parts (a), (b), (c) that can each be answered in a few sentences. No thesis required.",
  },
  {
    id: "drill",
    name: "Skill drill",
    instruction:
      "Write a focused drill set that practises one AP skill repeatedly, with the skill named at the top and difficulty rising across the set.",
  },
] as const;

export const DEFAULT_AP: ApSettings = {
  course: "AP Biology",
  questionType: "mcq",
};

export function getApQuestionType(id: string) {
  return AP_QUESTION_TYPES.find((type) => type.id === id) ?? AP_QUESTION_TYPES[0];
}
