import {
  Atom,
  BookOpen,
  Brain,
  Code2,
  FlaskConical,
  Landmark,
  Languages,
  Leaf,
  LineChart,
  Sigma,
} from "lucide-react";

import type { SubjectFamily, ToolSubject } from "@/lib/tools/types";

export const toolSubjects: ToolSubject[] = [
  {
    id: "math",
    name: "Math",
    family: "quantitative",
    icon: Sigma,
    ibGroup: "Group 5: Mathematics",
    apCourses: [
      "AP Precalculus",
      "AP Calculus AB",
      "AP Calculus BC",
      "AP Statistics",
    ],
  },
  {
    id: "biology",
    name: "Biology",
    family: "quantitative",
    icon: Leaf,
    ibGroup: "Group 4: Sciences",
    apCourses: ["AP Biology", "AP Environmental Science"],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    family: "quantitative",
    icon: FlaskConical,
    ibGroup: "Group 4: Sciences",
    apCourses: ["AP Chemistry"],
  },
  {
    id: "physics",
    name: "Physics",
    family: "quantitative",
    icon: Atom,
    ibGroup: "Group 4: Sciences",
    apCourses: ["AP Physics 1", "AP Physics 2", "AP Physics C: Mechanics"],
  },
  {
    id: "english",
    name: "English",
    family: "language",
    icon: BookOpen,
    ibGroup: "Group 1: Studies in language and literature",
    apCourses: [
      "AP English Language and Composition",
      "AP English Literature and Composition",
    ],
  },
  {
    id: "chinese",
    name: "Chinese",
    family: "language",
    icon: Languages,
    ibGroup: "Group 2: Language acquisition",
    apCourses: ["AP Chinese Language and Culture"],
  },
  {
    id: "korean",
    name: "Korean",
    family: "language",
    icon: Languages,
    ibGroup: "Group 2: Language acquisition",
    apCourses: ["AP Seminar", "AP Research"],
  },
  {
    id: "history",
    name: "History",
    family: "humanities",
    icon: Landmark,
    ibGroup: "Group 3: Individuals and societies",
    apCourses: [
      "AP World History: Modern",
      "AP U.S. History",
      "AP European History",
    ],
  },
  {
    id: "economics",
    name: "Economics",
    family: "humanities",
    icon: LineChart,
    ibGroup: "Group 3: Individuals and societies",
    apCourses: ["AP Macroeconomics", "AP Microeconomics"],
  },
  {
    id: "psychology",
    name: "Psychology",
    family: "humanities",
    icon: Brain,
    ibGroup: "Group 3: Individuals and societies",
    apCourses: ["AP Psychology"],
  },
  {
    id: "computer-science",
    name: "Computer Science",
    family: "quantitative",
    icon: Code2,
    ibGroup: "Group 4: Sciences",
    apCourses: ["AP Computer Science A", "AP Computer Science Principles"],
  },
];

export const subjectMap = new Map(
  toolSubjects.map((subject) => [subject.id, subject]),
);

export function getToolSubject(id: string): ToolSubject {
  const subject = subjectMap.get(id);
  if (!subject) throw new Error(`Unknown subject: ${id}`);
  return subject;
}

export const FAMILY_LABEL: Record<SubjectFamily, string> = {
  quantitative: "Math and sciences",
  language: "Language and literature",
  humanities: "Humanities and social sciences",
};
