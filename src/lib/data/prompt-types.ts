import {
  ClipboardList,
  Hammer,
  Layers,
  MessageSquareQuote,
  NotebookPen,
  PencilRuler,
  SquarePen,
} from "lucide-react";

import type { PromptType, PromptTypeMeta } from "@/lib/types";

export const promptTypes: PromptTypeMeta[] = [
  {
    id: "lesson-plan",
    name: "Lesson plan",
    description: "A full plan draft for one class period, built around your objective.",
    icon: NotebookPen,
    objectivePlaceholder:
      "Students can explain how a bill becomes a law and identify where it can fail.",
    outputFormats: [
      "Full lesson plan",
      "Minute-by-minute agenda",
      "Slide outline",
      "Sub plan",
    ],
  },
  {
    id: "differentiated-activity",
    name: "Differentiated activity",
    description: "One task, three levels of support, same success criteria.",
    icon: Layers,
    objectivePlaceholder:
      "Students can compare two fractions with unlike denominators and justify the comparison.",
    outputFormats: [
      "Three tiered versions",
      "Scaffold menu",
      "Station rotation",
      "Extension tasks",
    ],
  },
  {
    id: "quiz",
    name: "Quiz or check for understanding",
    description: "Items that separate real understanding from a common misconception.",
    icon: ClipboardList,
    objectivePlaceholder:
      "Students can identify the independent variable in a described experiment.",
    outputFormats: [
      "Multiple choice with rationales",
      "Exit ticket",
      "Short answer set",
      "Hinge question",
    ],
  },
  {
    id: "writing-assignment",
    name: "Writing assignment",
    description: "A prompt with an audience, a purpose, and a reason to think.",
    icon: SquarePen,
    objectivePlaceholder:
      "Students can construct an argument using evidence from two competing sources.",
    outputFormats: [
      "Assignment sheet",
      "Prompt options set",
      "Prompt plus rubric",
      "Scaffolded outline",
    ],
  },
  {
    id: "project-based-learning",
    name: "Project-based learning",
    description: "A multi-week project with checkpoints, roles, and a real audience.",
    icon: Hammer,
    objectivePlaceholder:
      "Students can apply linear modeling to a decision that affects our school.",
    outputFormats: [
      "Project overview",
      "Week-by-week plan",
      "Checkpoint schedule",
      "Student-facing brief",
    ],
  },
  {
    id: "feedback-comments",
    name: "Feedback comments",
    description: "Comment stems you finish with a detail from the student's work.",
    icon: PencilRuler,
    objectivePlaceholder:
      "Students can develop a claim with evidence and explain how the evidence supports it.",
    outputFormats: [
      "Comment bank",
      "Strength plus next step",
      "Revision questions",
      "Conference notes",
    ],
  },
  {
    id: "discussion-questions",
    name: "Discussion questions",
    description: "Questions with no single right answer that still require the text.",
    icon: MessageSquareQuote,
    objectivePlaceholder:
      "Students can evaluate whether a narrator's account can be trusted.",
    outputFormats: [
      "Question sequence",
      "Socratic seminar set",
      "Turn-and-talk prompts",
      "Written response options",
    ],
  },
];

export const promptTypeMap = new Map<PromptType, PromptTypeMeta>(
  promptTypes.map((type) => [type.id, type]),
);

export function getPromptType(id: PromptType): PromptTypeMeta {
  const type = promptTypeMap.get(id);
  if (!type) throw new Error(`Unknown prompt type: ${id}`);
  return type;
}
