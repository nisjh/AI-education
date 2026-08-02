import {
  COMMAND_TERMS,
  getApQuestionType,
} from "@/lib/tools/curricula";
import { getToolSubject } from "@/lib/tools/subjects";
import {
  getOutputFormat,
  getRefinement,
  getTask,
  getTransformation,
} from "@/lib/tools/tasks";
import type { GenerationRequest } from "@/lib/tools/types";

const MAX_SOURCE_CHARS = 6000;

function fill(value: string | null | undefined, placeholder: string) {
  const trimmed = value?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : `[${placeholder}]`;
}

/** IB block: command terms, level, paper, ATL, criterion, and the house style. */
function ibBlock(request: GenerationRequest) {
  const { ib } = request;
  const lines: string[] = [];

  if (ib.programme === "MYP") {
    lines.push(`- Programme: IB MYP, ${ib.mypYear}`);
    if (ib.criterion !== "Not criterion-specific") {
      lines.push(
        `- Assessment criterion: ${ib.criterion}. Use the criterion's language in the task wording, and say which strand each item addresses. Criterion wording varies by subject group — if you are unsure of the exact strand wording for this subject, say so rather than inventing it.`,
      );
    }
  } else {
    lines.push(`- Programme: IB Diploma Programme, ${ib.dpLevel}`);
    if (ib.paper !== "Not paper-specific") {
      lines.push(
        `- Target: ${ib.paper} practice. Match that paper's format, timing, and mark allocation conventions.`,
      );
    }
  }

  lines.push(`- Subject group: ${ib.subjectGroup}`);

  if (ib.commandTerms.length > 0) {
    const described = ib.commandTerms
      .map((term) => {
        const entry = COMMAND_TERMS.find((item) => item.term === term);
        return entry ? `${entry.term} (${entry.level.toLowerCase()})` : term;
      })
      .join(", ");
    lines.push(
      `- Command terms to use: ${described}. Use each term with its IB meaning, and make the demand of the question match the term — do not write "evaluate" on a question that only needs recall.`,
    );
  }

  if (ib.atlSkills.length > 0) {
    lines.push(
      `- ATL skills to develop: ${ib.atlSkills.join(", ")}. Say which item develops which skill and how, in one line each.`,
    );
  }

  lines.push(
    "- House style: lead with inquiry, anchor items in conceptual understanding rather than recall, and connect at least one item to a real-world context students would recognise. Where a genuine interdisciplinary link exists, name it; do not manufacture one.",
  );

  return lines.join("\n");
}

/** AP block: course, question type, and exam conventions. */
function apBlock(request: GenerationRequest) {
  const { ap } = request;
  const questionType = getApQuestionType(ap.questionType);

  return [
    `- Course: ${fill(ap.course, "AP COURSE")}`,
    `- Question format: ${questionType.name}. ${questionType.instruction}`,
    "- House style: exam-like rigor and concision. Stems carry no wasted words, the demand is high, and the vocabulary matches what students meet on the exam.",
    "- Include the point value and, for free-response items, the scoring notes a reader would use.",
    "- Do not reproduce released exam questions. These must be original items written in that style.",
  ].join("\n");
}

export function composeGenerationPrompt(request: GenerationRequest): string {
  const subject = getToolSubject(request.subjectId);
  const task = getTask(request.taskId);

  const source = request.sourceText.trim();
  const truncated = source.length > MAX_SOURCE_CHARS;
  const sourceForPrompt = truncated
    ? `${source.slice(0, MAX_SOURCE_CHARS)}\n\n[…source truncated — paste the rest if the tool asks for it]`
    : source;

  const curriculumLabel =
    request.curriculum === "ib" ? "IB (MYP / DP)" : "Advanced Placement (AP)";

  const levelLine =
    request.curriculum === "ib"
      ? ibBlock(request)
      : apBlock(request);

  const asks = task?.asks ?? [
    "Produce material based on the source below, matching its concept and format.",
  ];

  const formats = request.outputFormatIds
    .map((id) => getOutputFormat(id))
    .filter((format) => format !== undefined);

  const changes = request.transformationIds
    .map((id) => getTransformation(id))
    .filter((item) => item !== undefined);

  const applied = request.refinements
    .map((id) => getRefinement(id))
    .filter((item) => item !== undefined);

  const sections: string[] = [];

  sections.push(
    `You are helping an experienced ${subject.name} teacher working in the ${curriculumLabel} curriculum. I will review and revise everything you produce before it reaches students, so tell me where the material is weak rather than presenting all of it as ready.`,
  );

  sections.push(
    [
      "CONTEXT",
      levelLine,
      `- Grade band: ${fill(request.gradeBand, "GRADE BAND")}`,
      `- Learning objective: ${fill(request.objective, "WHAT STUDENTS SHOULD BE ABLE TO DO")}`,
      `- Source material: ${request.sourceLabel || "pasted text"}`,
    ].join("\n"),
  );

  sections.push(
    [
      "SOURCE MATERIAL",
      sourceForPrompt.length > 0
        ? sourceForPrompt
        : "[PASTE THE QUESTIONS, PASSAGE, OR WORKSHEET TEXT HERE]",
    ].join("\n"),
  );

  sections.push(
    [
      `PRODUCE — ${task?.name ?? "material from the source"}, ${request.quantity} item${request.quantity === 1 ? "" : "s"}`,
      ...asks.map((ask, index) => `${index + 1}. ${ask}`),
    ].join("\n"),
  );

  if (formats.length > 0) {
    sections.push(
      [
        "OUTPUT FORMAT",
        ...formats.map((format) => `- ${format.name}: ${format.instruction}`),
      ].join("\n"),
    );
  }

  if (changes.length > 0) {
    sections.push(
      [
        "ADJUSTMENTS",
        ...changes.map((change) => `- ${change.name}: ${change.instruction}`),
      ].join("\n"),
    );
  }

  if (applied.length > 0) {
    sections.push(
      [
        "REGENERATION NOTE",
        ...applied.map((item) => `- ${item.instruction}`),
      ].join("\n"),
    );
  }

  sections.push(
    [
      "RULES",
      "- Stay on the concept in the source material. Do not drift to an adjacent topic because it is easier to write about.",
      "- Do not invent data, quotations, citations, or standards. If the source is too thin to support what I asked for, say so and tell me what is missing.",
      "- Use plain teacher language. No preamble, no encouragement, no summary of what you are about to do.",
      "- Keep everything at the level stated above — not a grade higher or lower.",
    ].join("\n"),
  );

  sections.push(
    [
      "BEFORE YOU FINISH",
      "List the items you are least confident about and say why — wrong difficulty, ambiguous wording, an answer that is arguable, or a concept the source does not actually support.",
    ].join("\n"),
  );

  return sections.join("\n\n");
}

/** Short label for the history panel. */
export function describeGeneration(request: GenerationRequest) {
  const subject = getToolSubject(request.subjectId);
  const task = getTask(request.taskId);
  const level =
    request.curriculum === "ib"
      ? request.ib.programme === "MYP"
        ? `MYP ${request.ib.mypYear}`
        : `DP ${request.ib.dpLevel}`
      : request.ap.course;

  return {
    title: `${task?.name ?? "Generation"} · ${subject.name}`,
    summary: `${level} · ${request.quantity} items · ${request.sourceLabel || "pasted text"}`,
  };
}
