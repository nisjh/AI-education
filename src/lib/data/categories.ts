import {
  BookOpen,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Landmark,
  PenLine,
  ShieldCheck,
  Users,
} from "lucide-react";

import type { Category, CategoryId } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "lesson-planning",
    name: "Lesson planning",
    description:
      "Draft plans, warm-ups, and pacing you can adapt to your class in one sitting.",
    icon: BookOpen,
  },
  {
    id: "assignment-design",
    name: "Assignment design",
    description:
      "Build tasks that stay meaningful when students have AI on their phones.",
    icon: PenLine,
  },
  {
    id: "assessment",
    name: "Rubrics and assessment",
    description:
      "Write rubrics, exit tickets, and feedback you still control the standards for.",
    icon: ClipboardCheck,
  },
  {
    id: "classroom-activities",
    name: "Classroom activities",
    description:
      "Structured activities where students work with, or against, an AI response.",
    icon: Users,
  },
  {
    id: "ai-literacy",
    name: "Student AI literacy",
    description:
      "Teach how these tools work, where they fail, and how to check their claims.",
    icon: GraduationCap,
  },
  {
    id: "safety-ethics",
    name: "Safety and ethics",
    description:
      "Student privacy, bias, disclosure, and the limits of what belongs in a prompt.",
    icon: ShieldCheck,
  },
  {
    id: "policy-leadership",
    name: "Policy and leadership",
    description:
      "Department and school-level guidance, family communication, and PD planning.",
    icon: Landmark,
  },
  {
    id: "prompt-templates",
    name: "Prompt templates",
    description:
      "Copy-ready prompts with placeholders for your grade, subject, and objective.",
    icon: FileText,
  },
];

export const categoryMap = new Map<CategoryId, Category>(
  categories.map((category) => [category.id, category]),
);

export function getCategory(id: CategoryId): Category {
  const category = categoryMap.get(id);
  if (!category) throw new Error(`Unknown category: ${id}`);
  return category;
}
