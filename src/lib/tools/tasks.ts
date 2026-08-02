import type {
  GenerationTask,
  OutputFormat,
  Refinement,
  SubjectFamily,
  Transformation,
} from "@/lib/tools/types";

/**
 * What a teacher wants made from the material they just uploaded. Tasks are
 * scoped by subject family because "generate similar practice problems" and
 * "write example sentences for these words" are not the same job.
 */
export const generationTasks: GenerationTask[] = [
  {
    id: "similar-problems",
    name: "Similar practice problems",
    description: "Same concept and format, different numbers and contexts.",
    families: ["quantitative"],
    example: "Generate 10 similar quadratic equations with varying coefficients.",
    asks: [
      "Identify the concept, the solution method, and the question format used in the source material.",
      "Write new problems that keep that concept, method, and format identical while varying the numbers, contexts, and surface details.",
      "Spread the set across three difficulty steps and label each item with its step.",
      "Flag any item where changing the numbers changed the method, and fix it.",
    ],
  },
  {
    id: "data-analysis",
    name: "Data analysis questions",
    description: "Questions built on the data, graph, or experiment in the source.",
    families: ["quantitative", "humanities"],
    example: "Create 5 data analysis questions based on this experiment.",
    asks: [
      "List what the data in the source material actually supports and what it does not.",
      "Write questions that require reading the data rather than recalling the topic.",
      "Include at least one question about a limitation, source of error, or confounding factor.",
      "State the expected response for each question so I can mark quickly.",
    ],
  },
  {
    id: "worked-solutions",
    name: "Worked solutions and answer key",
    description: "Step-by-step solutions with the reasoning made visible.",
    families: ["quantitative"],
    example: "Write worked solutions with the common error shown at each step.",
    asks: [
      "Produce a worked solution for each item, one step per line, with the reasoning stated rather than implied.",
      "Mark the step where students most often go wrong, and say what the wrong answer looks like.",
      "Finish with a compact answer key: item number and final answer only.",
    ],
  },
  {
    id: "vocab-sentences",
    name: "Vocabulary example sentences",
    description: "Sentences that show the word working, not just defined.",
    families: ["language", "humanities"],
    example: "Write 8 example sentences using these vocabulary words.",
    asks: [
      "For each target word, write example sentences where the surrounding context makes the meaning inferable.",
      "Vary sentence structure and register across the set, and keep the contexts age-appropriate for the level given.",
      "For each word, add one sentence that uses it incorrectly, labelled clearly, for students to spot and correct.",
    ],
  },
  {
    id: "cloze",
    name: "Cloze and gap-fill",
    description: "Gapped passages built from the source text.",
    families: ["language"],
    example: "Turn this passage into a cloze exercise with a word bank.",
    asks: [
      "Build a cloze exercise from the source passage, removing words that require comprehension rather than guessing.",
      "Provide the version with gaps, a word bank, and the completed key as three separate blocks.",
      "Say why each removed word was chosen — what it tests.",
    ],
  },
  {
    id: "word-relationships",
    name: "Synonym and antonym tasks",
    description: "Relationship tasks and shades-of-meaning work.",
    families: ["language"],
    example: "Create synonym and antonym tasks for the target vocabulary.",
    asks: [
      "For each target word, give near-synonyms and antonyms, then a task that forces students to choose between them in context.",
      "Include one pair where the near-synonym would be wrong in this context, and ask students to explain why.",
    ],
  },
  {
    id: "writing-prompts",
    name: "Short writing prompts",
    description: "Prompts that require the target vocabulary to be used well.",
    families: ["language", "humanities"],
    example: "Write short prompts that require the target vocabulary.",
    asks: [
      "Write short writing prompts that cannot be answered well without using the target language naturally.",
      "Give each prompt an audience and a purpose.",
      "State the success criteria for a strong response in student-facing language.",
    ],
  },
  {
    id: "short-answer",
    name: "Short-answer questions",
    description: "Questions answerable in a few sentences, anchored in the source.",
    families: ["humanities", "language", "quantitative"],
    example: "Write 6 short-answer questions on this source.",
    asks: [
      "Write short-answer questions that are answerable only by someone who worked through this source material.",
      "For each, give the two responses I should expect most often and what each tells me.",
      "Note which questions would work as an exit ticket.",
    ],
  },
  {
    id: "source-analysis",
    name: "Source analysis questions",
    description: "Origin, purpose, value, limitation — worked on this source.",
    families: ["humanities"],
    example: "Create source analysis questions for this excerpt.",
    asks: [
      "Write questions on the origin, purpose, value, and limitations of the source material.",
      "Include one question that requires students to weigh this source against a second perspective.",
      "State what a strong answer would reference in the source itself.",
    ],
  },
  {
    id: "compare-contrast",
    name: "Compare and contrast",
    description: "Structured comparison with the axis of comparison named.",
    families: ["humanities", "language"],
    example: "Write compare-and-contrast questions with the comparison axis named.",
    asks: [
      "Write comparison questions that name the axis of comparison explicitly rather than asking students to guess it.",
      "Give a comparison frame students can fill in as they read.",
      "Include one question where the similarities matter more than the differences.",
    ],
  },
  {
    id: "discussion",
    name: "Discussion questions",
    description: "Open questions that still require the source.",
    families: ["humanities", "language", "quantitative"],
    example: "Create 3 command-term-based discussion questions for this excerpt.",
    asks: [
      "Write discussion questions with more than one defensible answer, each still requiring evidence from the source material.",
      "For each, give one follow-up that pushes a student past a surface answer.",
      "End with the question to open on if discussion stalls in the first three minutes.",
    ],
  },
  {
    id: "concept-check",
    name: "Concept checks and exit tickets",
    description: "Fast checks that separate understanding from a misconception.",
    families: ["quantitative", "language", "humanities"],
    example: "Create an exit ticket that catches the most common misconception.",
    asks: [
      "Name the misconceptions students most often hold about this material, described as faulty reasoning.",
      "Write concept-check items where a wrong answer identifies which misconception the student holds.",
      "Keep the exit ticket to two items I can read in the doorway, with a note on what each response tells me.",
    ],
  },
  {
    id: "review-set",
    name: "Review set or mini quiz",
    description: "A short set covering the material, weighted to what matters.",
    families: ["quantitative", "language", "humanities"],
    example: "Build a 10-minute review quiz from this worksheet.",
    asks: [
      "Build a review set covering the material, weighted toward what carries the most marks or the most transfer.",
      "State the time it should take and the mark allocation per item.",
      "Include a short answer key.",
    ],
  },
];

export function tasksForFamily(family: SubjectFamily) {
  return generationTasks.filter((task) => task.families.includes(family));
}

export function getTask(id: string) {
  return generationTasks.find((task) => task.id === id);
}

/* ------------------------------------------------------------- outputs --- */

export const outputFormats: OutputFormat[] = [
  {
    id: "practice-questions",
    name: "Practice questions",
    description: "The question set on its own.",
    instruction: "A numbered question set, questions only, nothing else attached.",
  },
  {
    id: "answer-key",
    name: "Answer key",
    description: "Answers, separated so it can be withheld.",
    instruction:
      "A separate answer key in its own clearly marked block at the end, so I can withhold it.",
  },
  {
    id: "rubric",
    name: "Rubric",
    description: "Observable descriptors at each level.",
    instruction:
      "A rubric whose descriptors name something observable in the work, with no evaluative adjectives left undefined.",
  },
  {
    id: "vocab-examples",
    name: "Vocabulary examples",
    description: "Words with sentences in context.",
    instruction:
      "A vocabulary table: word, student-friendly meaning, and example sentences in context.",
  },
  {
    id: "quiz",
    name: "Quiz form",
    description: "Ready to give, with marks and timing.",
    instruction:
      "A quiz laid out for handing out: title, timing, mark allocation per question, and space indicated for answers.",
  },
  {
    id: "worksheet",
    name: "Worksheet",
    description: "Instructions, examples, then practice.",
    instruction:
      "A worksheet with student instructions at the top, one worked example, then the practice items.",
  },
  {
    id: "doc-style",
    name: "Doc-style layout",
    description: "Headings and spacing for pasting into Docs.",
    instruction:
      "Plain formatted text with clear headings and spacing that pastes cleanly into a Google Doc or Word file. No markdown symbols.",
  },
  {
    id: "markdown",
    name: "Editable markdown",
    description: "Markdown for editing elsewhere.",
    instruction:
      "Markdown with headings, lists, and tables, ready to paste into an editor.",
  },
];

export function getOutputFormat(id: string) {
  return outputFormats.find((format) => format.id === id);
}

/* ----------------------------------------------------- transformations --- */

export const transformations: Transformation[] = [
  {
    id: "harder",
    name: "Increase difficulty",
    instruction:
      "Raise the demand: more steps, less scaffolding, and at least one item that requires combining two ideas from the source.",
  },
  {
    id: "easier",
    name: "Decrease difficulty",
    instruction:
      "Lower the entry barrier without lowering the standard: shorter stems, one idea per item, and a first item that is deliberately accessible.",
  },
  {
    id: "to-mcq",
    name: "Convert to multiple choice",
    instruction:
      "Convert the items to multiple choice with four options. Every distractor must map to a specific misconception, which you name.",
  },
  {
    id: "to-short-answer",
    name: "Convert to short answer",
    instruction:
      "Convert the items to short answer, each answerable in two to four sentences, with the expected response stated.",
  },
  {
    id: "to-discussion",
    name: "Convert to open discussion",
    instruction:
      "Convert the items to open discussion questions with more than one defensible answer, each still requiring the source.",
  },
  {
    id: "scaffold",
    name: "Add scaffolding and hints",
    instruction:
      "Add a hint to each item that points at the method without giving the answer, plus sentence starters where a written response is expected.",
  },
  {
    id: "inquiry",
    name: "Make it inquiry-based",
    instruction:
      "Reframe the items as inquiry: start from a question worth asking, and require students to decide what evidence would answer it.",
  },
  {
    id: "align-objectives",
    name: "Align to my objective",
    instruction:
      "Tag each item with the part of my stated learning objective it assesses, and drop any item that assesses nothing on that list.",
  },
];

export function getTransformation(id: string) {
  return transformations.find((item) => item.id === id);
}

/* --------------------------------------------------------- refinements --- */

export const refinements: Refinement[] = [
  {
    id: "harder",
    label: "More difficult",
    instruction:
      "Make this noticeably harder than a standard set at this level: more steps, less scaffolding, and less familiar contexts.",
  },
  {
    id: "easier",
    label: "Easier",
    instruction:
      "Make this more accessible: shorter stems, one idea per item, and a clearly achievable first item.",
  },
  {
    id: "more-exam-like",
    label: "More exam-like",
    instruction:
      "Match exam wording and mark allocation exactly as it would appear on a real paper, including the phrasing of the instruction line.",
  },
  {
    id: "more-inquiry",
    label: "More inquiry-based",
    instruction:
      "Lead with a question worth investigating and require students to decide what evidence would settle it.",
  },
];

export function getRefinement(id: string) {
  return refinements.find((item) => item.id === id);
}
