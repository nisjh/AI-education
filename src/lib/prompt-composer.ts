import { getPromptType } from "@/lib/data/prompt-types";
import type { GradeBand, PromptType, Subject } from "@/lib/types";

export const AI_PERMISSION_LEVELS = [
  "Level 1 — students may not use AI on this",
  "Level 2 — students may use AI with disclosure",
  "Level 3 — students must use AI and critique it",
  "Not applicable — this is for my own prep",
] as const;
export type AiPermissionLevel = (typeof AI_PERMISSION_LEVELS)[number];

export interface PromptRequest {
  promptType: PromptType;
  gradeBand: GradeBand | null;
  subject: Subject | null;
  objective: string;
  outputFormat: string;
  duration: string;
  classContext: string;
  supports: string[];
  permission: AiPermissionLevel;
}

export const SUPPORT_OPTIONS = [
  "Students reading below grade level",
  "Multilingual learners",
  "Students who need extension work",
  "Students with limited device access",
  "Large class, limited teacher circulation time",
] as const;

/** Falls back to a bracketed placeholder so an unfinished form still copies well. */
function fill(value: string | null | undefined, placeholder: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : `[${placeholder}]`;
}

const SHARED_RULES = [
  "Use plain teacher language. No slogans, no marketing tone, no filler.",
  "Do not invent statistics, quotations, standards, or sources. If you are unsure, say so instead of smoothing over it.",
  "Do not assume materials, technology, or time beyond what I listed.",
];

interface Body {
  /** Numbered asks, in the order a teacher would actually work through them. */
  asks: string[];
  /** Extra constraint lines specific to this prompt type. */
  rules?: string[];
  /** A final self-check the model must answer. */
  selfCheck: string;
}

function bodyFor(request: PromptRequest, gradeLabel: string): Body {
  switch (request.promptType) {
    case "lesson-plan":
      return {
        asks: [
          "The evidence of learning I should collect by the end, and what a proficient response looks like.",
          "The practice sequence that gets students there, with approximate minutes for each part.",
          "A short opener that surfaces the prior knowledge the sequence assumes.",
          "The two misconceptions most likely to appear, and one specific teaching move for each.",
          "What to cut first if the period runs short.",
        ],
        selfCheck:
          "Name any part of this plan that would not survive contact with a real class, and say why.",
      };

    case "differentiated-activity":
      return {
        asks: [
          "Three versions of the task at different levels of support, with identical success criteria.",
          "For each version, the specific support you added (sentence frames, worked example, chunking, vocabulary, visual).",
          "The first support I should remove from each version as students gain independence.",
          "A short note on how to run all three in the same room without singling anyone out.",
        ],
        rules: [
          "Do not lower the cognitive demand in any version. Change the runway, not the destination.",
          "Do not ask me for student names or diagnoses, and do not include any.",
        ],
        selfCheck:
          "Is there any version here a student could complete without engaging the objective? If so, fix it and tell me what you changed.",
      };

    case "quiz":
      return {
        asks: [
          `The four most common misconceptions ${gradeLabel} students hold about this, described as faulty reasoning rather than wrong answers.`,
          "Items where each incorrect option maps to one of those misconceptions.",
          "For each item: which misconception each distractor detects, what a student choosing it probably believes, and the reteaching move I should make.",
          "Which single item is the best hinge question — the one whose answers would most change what I do next.",
        ],
        rules: [
          "No trick questions and no 'all of the above'.",
          "Every distractor must be genuinely wrong, not arguable.",
        ],
        selfCheck:
          "Review your own distractors and flag any that a careful student could defend as correct.",
      };

    case "writing-assignment":
      return {
        asks: [
          "The assignment prompt, written to students, with a real audience and a purpose beyond showing me the reading got done.",
          "The specific thing from our class the task requires students to use — name it explicitly.",
          "Three or four success criteria, each observable in the finished work.",
          "One process artifact students submit alongside the writing (annotated draft, planning notes, or a two-minute recorded explanation).",
        ],
        rules: [
          "Ask for a position with tradeoffs, not a summary.",
          "State the AI permission level in student-facing language, exactly as I gave it.",
        ],
        selfCheck:
          "Tell me what a student could produce with a chatbot alone, and which requirement above would expose it.",
      };

    case "project-based-learning":
      return {
        asks: [
          "A driving question a student would find genuinely open, phrased in student language.",
          "The final product and who it is actually for.",
          "A week-by-week plan with one checkpoint per week and what I collect at each.",
          "Team roles that each carry real work, with a note on preventing one student from doing everything.",
          "The three most likely ways this project stalls, and the checkpoint that catches each one.",
        ],
        rules: [
          "Do not propose materials, software, partnerships, or field trips I did not list.",
        ],
        selfCheck:
          "Give me an honest scope check: what should I cut if this is too ambitious for the time available?",
      };

    case "feedback-comments":
      return {
        asks: [
          "The three or four response patterns you would expect on this task at this level.",
          "For each pattern, three comment stems shaped as: one thing that worked (leave a blank for the specific detail), one specific next step tied to the criteria, one question that makes the student do the thinking.",
          "A short list of phrases to avoid in this context, based on what would read as generic to these students.",
        ],
        rules: [
          "Keep each comment under 45 words.",
          "Do not use 'great job', 'nice work', or 'consider adding more detail'.",
          "Leave blanks where a student-specific detail belongs. Do not invent the detail.",
        ],
        selfCheck:
          "Which of these comments would a student most likely ignore, and how would you rewrite it?",
      };

    case "discussion-questions":
      return {
        asks: [
          "A question sequence that builds: text-based, then interpretive, then evaluative with the criteria for judgment made explicit.",
          "For each question, the two responses I should expect most often.",
          "For each question, one follow-up that pushes a student past a surface answer.",
          "One move for re-entering a student who has been silent.",
          "The single question to open with if discussion stalls in the first three minutes.",
        ],
        rules: [
          "Do not write questions with one right answer that merely sound open.",
          "Do not use 'how does this make you feel' as an evaluative question.",
        ],
        selfCheck:
          "Which question would you cut if we only had time for half of them, and why?",
      };
  }
}

export function composePrompt(request: PromptRequest): string {
  const meta = getPromptType(request.promptType);
  const gradeLabel = fill(request.gradeBand, "GRADE LEVEL");
  const subjectLabel = fill(request.subject, "SUBJECT");
  const objective = fill(request.objective, "LEARNING OBJECTIVE — WHAT STUDENTS CAN DO BY THE END");
  const format = fill(request.outputFormat, "DESIRED OUTPUT FORMAT");
  const duration = fill(request.duration, "TIME AVAILABLE");
  const context = fill(
    request.classContext,
    "WHAT STUDENTS DID LAST, MATERIALS ON HAND, ANYTHING ELSE THAT CONSTRAINS THIS",
  );

  const body = bodyFor(request, gradeLabel);

  const supportLines =
    request.supports.length > 0
      ? request.supports.map((support) => `- ${support}`).join("\n")
      : "- [ANY LEARNER NEEDS I SHOULD PLAN FOR — DESCRIBE GENERALLY, NO STUDENT NAMES]";

  const rules = [...(body.rules ?? []), ...SHARED_RULES];

  return `You are helping an experienced ${gradeLabel} ${subjectLabel} teacher. I will review and revise everything you produce before it reaches students, so be direct about weaknesses rather than confident about everything.

TASK
Produce: ${meta.name.toLowerCase()} — ${format}.

CONTEXT
- Learning objective: ${objective}
- Time available: ${duration}
- Class context: ${context}
- Learner needs to plan for:
${supportLines}
- AI permission for students on this task: ${request.permission}

PRODUCE, IN THIS ORDER
${body.asks.map((ask, index) => `${index + 1}. ${ask}`).join("\n")}

RULES
${rules.map((rule) => `- ${rule}`).join("\n")}

BEFORE YOU FINISH
${body.selfCheck}`;
}

/** Short label used for the copy confirmation and saved-prompt titles. */
export function describeRequest(request: PromptRequest) {
  const meta = getPromptType(request.promptType);
  const parts = [meta.name];
  if (request.gradeBand) parts.push(request.gradeBand);
  if (request.subject) parts.push(request.subject);
  return parts.join(" · ");
}
