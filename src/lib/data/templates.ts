import {
  ClipboardCheck,
  FileSignature,
  MessageSquareQuote,
  NotebookPen,
  SquarePen,
} from "lucide-react";

import type { DocTemplate } from "@/lib/types";

const REVIEW_FOOTER =
  "Draft only. Review every line for accuracy, fit, and your school's policy before using it with students.";

export const templates: DocTemplate[] = [
  {
    id: "lesson-plan-outline",
    title: "Lesson plan outline",
    summary:
      "A single-period plan with the assessment evidence written before the activities.",
    audience: ["Classroom teachers", "New to AI"],
    timeRequired: "15 min",
    icon: NotebookPen,
    tags: ["lesson planning", "backward design", "standards"],
    footerNote: REVIEW_FOOTER,
    sections: [
      {
        id: "frame",
        heading: "Frame",
        fields: [
          {
            id: "course",
            label: "Course and grade",
            hint: "The class this plan is for.",
            placeholder: "7th grade life science, period 3",
          },
          {
            id: "standard",
            label: "Standard",
            hint: "Paste it word for word. Paraphrasing here is where plans drift.",
            placeholder: "MS-LS1-3: Use argument supported by evidence for how the body is a system…",
            multiline: true,
            rows: 3,
          },
          {
            id: "objective",
            label: "Objective",
            hint: "What students can do by the end, in student-facing language.",
            placeholder: "I can explain how two body systems depend on each other, using evidence.",
            multiline: true,
            rows: 2,
          },
        ],
      },
      {
        id: "evidence",
        heading: "Evidence of learning",
        fields: [
          {
            id: "evidence",
            label: "What I collect",
            hint: "Write this before the activities. It is what the lesson is for.",
            placeholder: "Exit ticket: one diagram with two labeled connections and a sentence explaining one.",
            multiline: true,
            rows: 3,
          },
          {
            id: "proficient",
            label: "What proficient looks like",
            hint: "Describe an actual response you would accept.",
            placeholder: "Names both systems, the direction of the dependency, and one consequence if it fails.",
            multiline: true,
            rows: 3,
          },
        ],
      },
      {
        id: "sequence",
        heading: "Sequence",
        fields: [
          {
            id: "opener",
            label: "Opener (5 min)",
            hint: "Surfaces the prior knowledge the rest of the lesson assumes.",
            placeholder: "Show yesterday's diagram with one arrow removed. What is missing and how do you know?",
            multiline: true,
            rows: 2,
          },
          {
            id: "core",
            label: "Core work",
            hint: "The practice that gets students to the evidence above. Note the minutes.",
            placeholder: "12 min modeled example → 15 min pairs build their own → 8 min gallery and revise",
            multiline: true,
            rows: 4,
          },
          {
            id: "close",
            label: "Close",
            hint: "How students hand in the evidence and what you say last.",
            placeholder: "Exit ticket at the door. Name tomorrow's question.",
            multiline: true,
            rows: 2,
          },
        ],
      },
      {
        id: "contingencies",
        heading: "Contingencies",
        fields: [
          {
            id: "misconceptions",
            label: "Likely misconceptions",
            hint: "Two you have actually seen, and your move for each.",
            placeholder: "Students treat the systems as separate → return to the removed-arrow opener.",
            multiline: true,
            rows: 3,
          },
          {
            id: "cut",
            label: "Cut first if short on time",
            hint: "Decide now, not at 9:40.",
            placeholder: "Gallery walk. Keep the pair build and the exit ticket.",
            multiline: true,
            rows: 2,
          },
          {
            id: "ai-use",
            label: "Where AI helped, and what I changed",
            hint: "Your own record. Useful when a colleague asks how you built this.",
            placeholder: "Generated the misconception list; rewrote both moves and cut a third that did not fit my class.",
            multiline: true,
            rows: 2,
          },
        ],
      },
    ],
  },
  {
    id: "ai-assisted-assignment",
    title: "AI-assisted assignment",
    summary:
      "An assignment sheet with the AI permission level and disclosure questions built in.",
    audience: ["Classroom teachers"],
    timeRequired: "20 min",
    icon: SquarePen,
    tags: ["assignment design", "disclosure", "academic integrity"],
    footerNote: REVIEW_FOOTER,
    sections: [
      {
        id: "task",
        heading: "The task",
        fields: [
          {
            id: "title",
            label: "Assignment title",
            hint: "What students will see at the top of the page.",
            placeholder: "Should our city council fund the Oak Street bike lane?",
          },
          {
            id: "prompt",
            label: "The prompt",
            hint: "Anchor it in something specific to this class: a text, a discussion, a local situation.",
            placeholder:
              "Using the two council transcripts we read and Tuesday's debate, take a position and defend it to the council.",
            multiline: true,
            rows: 4,
          },
          {
            id: "audience",
            label: "Audience and purpose",
            hint: "Who is this for, beyond the gradebook?",
            placeholder: "A public comment letter addressed to the council, 400 words.",
            multiline: true,
            rows: 2,
          },
        ],
      },
      {
        id: "ai-policy",
        heading: "AI permission",
        fields: [
          {
            id: "level",
            label: "Permission level",
            hint: "Level 1 not permitted, Level 2 permitted with disclosure, Level 3 required and critiqued.",
            placeholder: "Level 2 — permitted with disclosure",
          },
          {
            id: "why",
            label: "Why this level, in student language",
            hint: "Students follow rules they understand the reason for.",
            placeholder:
              "This assignment measures your reasoning, not your typing. Use tools if they help you think, and tell me how.",
            multiline: true,
            rows: 3,
          },
          {
            id: "disclosure",
            label: "Disclosure questions",
            hint: "Keep it to three. Long honor-code paragraphs get skimmed.",
            placeholder:
              "1) Which tools did you use? 2) What exactly did you ask? 3) What did you change, keep, or throw out, and why?",
            multiline: true,
            rows: 3,
          },
        ],
      },
      {
        id: "assessment",
        heading: "How it is assessed",
        fields: [
          {
            id: "criteria",
            label: "Success criteria",
            hint: "Three or four, each observable in the work.",
            placeholder:
              "Position stated in one sentence; two pieces of evidence from the transcripts; addresses the strongest objection.",
            multiline: true,
            rows: 4,
          },
          {
            id: "process",
            label: "Process evidence collected",
            hint: "The artifact that shows the thinking happened.",
            placeholder: "Annotated transcript pages and a two-minute recorded explanation of your position.",
            multiline: true,
            rows: 2,
          },
        ],
      },
    ],
  },
  {
    id: "rubric-builder",
    title: "Rubric builder",
    summary:
      "Four criteria, four levels, written as observable descriptors instead of adjectives.",
    audience: ["Classroom teachers", "Instructional coaches"],
    timeRequired: "20 min",
    icon: ClipboardCheck,
    tags: ["rubrics", "assessment", "grading"],
    footerNote: REVIEW_FOOTER,
    sections: [
      {
        id: "setup",
        heading: "Setup",
        fields: [
          {
            id: "assignment",
            label: "Assignment",
            hint: "What this rubric scores.",
            placeholder: "Public comment letter, 400 words",
          },
          {
            id: "scale",
            label: "Scale",
            hint: "Use the language your gradebook already uses.",
            placeholder: "Exceeds / Meets / Approaching / Beginning",
          },
        ],
      },
      {
        id: "criteria",
        heading: "Criteria",
        fields: [
          {
            id: "criterion-1",
            label: "Criterion 1",
            hint: "Name it, then describe what Meets and Approaching each look like.",
            placeholder:
              "Position — Meets: states a position in one sentence in the first paragraph. Approaching: position appears but only in the conclusion.",
            multiline: true,
            rows: 4,
          },
          {
            id: "criterion-2",
            label: "Criterion 2",
            hint: "Describe the work, not the student.",
            placeholder:
              "Evidence — Meets: cites two specific passages and explains how each supports the claim.",
            multiline: true,
            rows: 4,
          },
          {
            id: "criterion-3",
            label: "Criterion 3",
            hint: "Avoid 'strong', 'effective', and 'thoughtful' unless you define them here.",
            placeholder:
              "Counterargument — Meets: names the strongest objection and answers it with evidence.",
            multiline: true,
            rows: 4,
          },
          {
            id: "criterion-4",
            label: "Criterion 4 (optional)",
            hint: "Stop at three if the fourth is filler.",
            placeholder: "Conventions — Meets: errors do not interrupt a reader.",
            multiline: true,
            rows: 3,
          },
        ],
      },
      {
        id: "check",
        heading: "Middle-band check",
        fields: [
          {
            id: "check",
            label: "Test against two past samples",
            hint: "Score two pieces you graded differently. Would this rubric separate them?",
            placeholder:
              "Tested on last year's letters from October. The rubric put both at Meets — rewrote the Evidence row.",
            multiline: true,
            rows: 3,
          },
        ],
      },
    ],
  },
  {
    id: "student-reflection",
    title: "Student reflection sheet",
    summary:
      "A post-assignment reflection that asks what students did, not whether they enjoyed it.",
    audience: ["Classroom teachers"],
    timeRequired: "10 min",
    icon: MessageSquareQuote,
    tags: ["reflection", "metacognition", "student voice"],
    footerNote: REVIEW_FOOTER,
    sections: [
      {
        id: "process",
        heading: "What you did",
        fields: [
          {
            id: "steps",
            label: "Walk through your process",
            hint: "For students: what you did first, second, and where you got stuck.",
            placeholder: "I started by rereading the transcript. I got stuck choosing between two positions…",
            multiline: true,
            rows: 4,
          },
          {
            id: "tools",
            label: "Tools you used",
            hint: "For students: list any tool that gave you words or ideas, including AI tools.",
            placeholder: "Spell check, and an AI tool to help me outline. I wrote all the sentences myself.",
            multiline: true,
            rows: 3,
          },
          {
            id: "changed",
            label: "What you changed and why",
            hint: "For students: what you kept, cut, or rewrote from any help you got.",
            placeholder: "The outline had five sections. I cut two because I did not have evidence for them.",
            multiline: true,
            rows: 3,
          },
        ],
      },
      {
        id: "learning",
        heading: "What you learned",
        fields: [
          {
            id: "hardest",
            label: "The hardest part",
            hint: "For students: name the part that took the most thinking.",
            placeholder: "Answering the objection without giving up my own position.",
            multiline: true,
            rows: 2,
          },
          {
            id: "next",
            label: "What you would do differently",
            hint: "For students: one specific thing, not 'try harder'.",
            placeholder: "Pick my position before I start writing instead of deciding halfway through.",
            multiline: true,
            rows: 2,
          },
        ],
      },
    ],
  },
  {
    id: "classroom-ai-agreement",
    title: "Classroom AI agreement",
    summary:
      "A one-page agreement students and teacher sign, written in language students can read.",
    audience: ["Classroom teachers", "School leaders"],
    timeRequired: "25 min",
    icon: FileSignature,
    tags: ["policy", "agreement", "academic integrity", "expectations"],
    footerNote:
      "Check this against your district's academic integrity code before posting. Where they differ, the district's policy governs.",
    sections: [
      {
        id: "shared",
        heading: "What we agree on",
        fields: [
          {
            id: "purpose",
            label: "Why we have this agreement",
            hint: "One or two sentences students would accept as fair.",
            placeholder:
              "We use these tools when they help us learn, and we are honest about it, so grades mean something.",
            multiline: true,
            rows: 3,
          },
          {
            id: "always-ok",
            label: "Always allowed",
            hint: "Be concrete. Vagueness here causes most of the trouble.",
            placeholder:
              "Checking spelling. Asking for a definition. Asking for practice problems. Asking a tool to quiz you.",
            multiline: true,
            rows: 3,
          },
          {
            id: "ask-first",
            label: "Ask first",
            hint: "The gray zone, named out loud.",
            placeholder: "Outlining an essay. Getting feedback on a draft. Translating your own writing.",
            multiline: true,
            rows: 3,
          },
          {
            id: "never",
            label: "Never",
            hint: "Short list, no exceptions.",
            placeholder:
              "Submitting generated text as your own writing. Using a tool during a test. Putting a classmate's work or personal information into a tool.",
            multiline: true,
            rows: 3,
          },
        ],
      },
      {
        id: "teacher",
        heading: "What I agree to",
        fields: [
          {
            id: "teacher-commitments",
            label: "My commitments to you",
            hint: "The agreement has to bind both directions to be believed.",
            placeholder:
              "I will mark the AI level on every assignment. I will never put your name or your work into an outside tool. I will read everything you write.",
            multiline: true,
            rows: 4,
          },
          {
            id: "consequences",
            label: "What happens if the agreement is broken",
            hint: "Match your school's process. Say that honest disclosure is never punished.",
            placeholder:
              "We talk first, and you redo the work. Disclosing that you used a tool is never itself a problem.",
            multiline: true,
            rows: 3,
          },
        ],
      },
    ],
  },
];

export function getTemplate(id: string) {
  return templates.find((template) => template.id === id);
}
