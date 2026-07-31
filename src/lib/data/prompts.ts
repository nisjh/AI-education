import type { PromptTemplate } from "@/lib/types";

/**
 * The prompt library. Placeholders are [BRACKETED CAPS] so they are easy to
 * scan and impossible to miss when a teacher pastes one into a tool.
 */
export const prompts: PromptTemplate[] = [
  {
    id: "lesson-plan-standards-aligned",
    title: "Standards-aligned lesson plan draft",
    summary:
      "Produces a plan with the assessment written before the activities, so the lesson stays pointed at the standard.",
    promptType: "lesson-plan",
    gradeBands: ["3–5", "6–8", "9–12"],
    subjects: ["All subjects"],
    tags: ["standards", "backward design", "planning"],
    template: `You are helping an experienced [GRADE LEVEL] [SUBJECT] teacher plan one class period. Do not write anything you cannot justify against the objective.

Context:
- Standard: [PASTE THE STANDARD VERBATIM]
- Learning objective: [WHAT STUDENTS SHOULD BE ABLE TO DO BY THE END]
- Class length: [MINUTES]
- What students did last class: [PRIOR LESSON]
- Materials available: [MATERIALS, TECH, TEXTS]
- Range in the room: [READING LEVELS, LANGUAGE NEEDS, ANYTHING RELEVANT — NO STUDENT NAMES]

Produce, in this order:
1. The evidence of learning I should collect by the end of the period, and what a proficient response looks like.
2. The practice sequence that gets students there, with approximate minutes for each part.
3. A five-minute opener that surfaces the prior knowledge the sequence assumes.
4. The two misconceptions most likely to appear, and one specific move for each.
5. What to cut first if the period runs short.

Rules:
- Use plain teacher language. No slogans, no filler.
- Do not invent statistics, quotations, or sources.
- Flag anything you are unsure about instead of smoothing over it.`,
    tips: [
      "Paste the standard word for word. Paraphrasing it is the single most common cause of an off-target plan.",
      "Tell it what you did last class — that constraint alone removes most of the generic opener suggestions.",
      "Ask for the cut list. It is the part you will actually use at 9:40 when a fire drill eats ten minutes.",
    ],
  },
  {
    id: "lesson-plan-sub-day",
    title: "Sub plan that holds the thread",
    summary:
      "A plan a substitute can run without your context, that still connects to the unit.",
    promptType: "lesson-plan",
    gradeBands: ["3–5", "6–8", "9–12"],
    subjects: ["All subjects"],
    tags: ["sub plan", "absence", "logistics"],
    template: `Write a substitute plan for a [GRADE LEVEL] [SUBJECT] class of about [CLASS SIZE] students, [MINUTES] minutes long.

The substitute has no background in this subject. Students are in the middle of a unit on [UNIT TOPIC], and the last thing they did was [PRIOR LESSON].

The plan must:
- Be fully self-contained: every direction the sub reads aloud is written out.
- Require no prep beyond photocopying one page.
- Keep students working on [SKILL OR CONTENT] rather than filler.
- Include a simple, collectable product so I can see who did the work.
- Include what to do if students finish early, and what to do if they refuse.

Also write a three-sentence note to me summarizing what I should check when I return.`,
    tips: [
      "Say the sub has no background in the subject — otherwise the directions assume too much.",
      "Ask for the 'if students refuse' branch. Most generated sub plans quietly assume compliance.",
    ],
  },
  {
    id: "differentiated-three-tier",
    title: "Three tiers, one standard",
    summary:
      "Scaffolds a single task for different levels of support without changing what is being assessed.",
    promptType: "differentiated-activity",
    gradeBands: ["3–5", "6–8", "9–12"],
    subjects: ["All subjects"],
    tags: ["differentiation", "scaffolds", "access", "multilingual learners"],
    template: `I teach [GRADE LEVEL] [SUBJECT]. Here is a task my students are about to do:

[PASTE THE TASK]

Success criteria (these must stay identical across every version):
[PASTE YOUR SUCCESS CRITERIA]

Create three versions of this task for these general learner profiles. Use no student names or identifying details:
- A student reading roughly two years below grade level.
- A student who is new to English and literate in their home language.
- A student who finished the last task early and correctly.

For each version:
- Keep the cognitive demand and the success criteria the same. Change only the support.
- Say exactly what support you added (sentence frames, worked example, chunking, vocabulary, visual).
- Name the first support I should remove as the student gains independence.

Then tell me: is there any version here that a student could complete without engaging the standard? If so, fix it.`,
    tips: [
      "Never paste IEP text or a diagnosis. General profiles get you the same instructional help with none of the risk.",
      "The final self-check question is the highest-value line in this prompt. Keep it.",
    ],
  },
  {
    id: "quiz-misconception-first",
    title: "Quiz items built from misconceptions",
    summary:
      "Asks for the common wrong thinking first, then writes items that detect it.",
    promptType: "quiz",
    gradeBands: ["3–5", "6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    tags: ["formative assessment", "misconceptions", "quiz", "hinge questions"],
    template: `Topic: [TOPIC]
Grade: [GRADE LEVEL]
Subject: [SUBJECT]
Objective: [WHAT STUDENTS SHOULD BE ABLE TO DO]

Step 1: List the four most common misconceptions students at this level hold about this topic. Be specific about the faulty reasoning, not just the wrong answer.

Step 2: Write [NUMBER] multiple-choice items where each incorrect option maps to one of those misconceptions. For every item, tell me:
- which misconception each distractor detects
- what a student choosing it probably believes
- the reteaching move I should make in response

Step 3: Mark which single item is the best hinge question — the one whose answers would most change what I do next.

Constraints: no trick questions, no "all of the above", and every distractor must be genuinely wrong rather than arguable.`,
    tips: [
      "Read every distractor. Models regularly write a 'wrong' option that a careful student could defend.",
      "The reteaching move column is what makes this worth running instead of writing four items yourself.",
    ],
  },
  {
    id: "writing-assignment-authentic",
    title: "Writing assignment with a real audience",
    summary:
      "Builds a prompt anchored in your class and community, which makes outsourced drafts obvious.",
    promptType: "writing-assignment",
    gradeBands: ["6–8", "9–12", "Early college"],
    subjects: ["English language arts", "Social studies", "Science"],
    tags: ["writing", "authentic task", "academic integrity"],
    template: `Design a writing assignment for [GRADE LEVEL] [SUBJECT].

Objective: [WHAT STUDENTS SHOULD BE ABLE TO DO]
Length: [WORD COUNT OR PAGES]
Time available: [CLASS PERIODS OR DAYS]
What we have read or done together: [TEXTS, LABS, DISCUSSIONS, LOCAL CONTEXT]

Requirements:
- The prompt must require students to use something specific from our class: a text we read, a discussion that happened, or a local situation. Name it explicitly.
- Give students a real audience and a purpose beyond "show the teacher you did the reading".
- Ask for a position with tradeoffs, not a summary.
- Include one process artifact students must submit (annotated draft, planning notes, or a two-minute explanation).
- State the AI permission level clearly in student-facing language: [NOT PERMITTED / PERMITTED WITH DISCLOSURE / REQUIRED AND CRITIQUED].

Also list: what a student could produce with a chatbot alone, and which requirement above would expose it.`,
    tips: [
      "The last line is the test. If nothing on your requirement list would expose an outsourced draft, the assignment needs another anchor.",
      "Name the specific text or discussion. 'Use evidence from class' is not specific enough to matter.",
    ],
  },
  {
    id: "pbl-unit-frame",
    title: "Project brief with checkpoints",
    summary:
      "A multi-week project scoped to what your calendar and materials can actually support.",
    promptType: "project-based-learning",
    gradeBands: ["6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    tags: ["PBL", "projects", "planning", "checkpoints"],
    template: `Design a [NUMBER]-week project for [GRADE LEVEL] [SUBJECT].

Driving standard or objective: [PASTE IT]
Class time available per week: [MINUTES]
Materials and tech we actually have: [LIST]
Class size: [NUMBER]
Real audience or stakeholder, if any: [WHO SEES THE FINAL WORK]

Produce:
1. A driving question a student would find genuinely open, phrased in student language.
2. The final product and who it is for.
3. A week-by-week plan with one checkpoint per week and what I collect at each.
4. Team roles that each carry real work, with a note on how to prevent one student doing everything.
5. The three most likely ways this project stalls, and the checkpoint that catches each one.
6. An honest scope check: what should I cut if this is too ambitious for the time listed?

Do not propose materials, software, or field trips I did not list.`,
    tips: [
      "The scope check is the useful part. First drafts of projects are almost always a week too long.",
      "Listing your real materials prevents the plan from assuming a 3D printer and a partnership with a local university.",
    ],
  },
  {
    id: "feedback-comment-bank",
    title: "Feedback stems in your voice",
    summary:
      "Generates a bank of stems for recurring patterns that you finish with student-specific detail.",
    promptType: "feedback-comments",
    gradeBands: ["3–5", "6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    tags: ["feedback", "grading", "comment bank", "time saving"],
    template: `I am giving feedback on [ASSIGNMENT TYPE] in [GRADE LEVEL] [SUBJECT].

The success criteria are:
[PASTE CRITERIA]

Here is how I write to students — match this tone, plainly, without exclamation points or praise inflation:
[PASTE TWO SENTENCES OF YOUR OWN FEEDBACK]

These are the patterns I see most often in this assignment:
1. [PATTERN, E.G. CLAIM WITH NO EVIDENCE]
2. [PATTERN]
3. [PATTERN]

For each pattern, write three comment stems in this shape:
- One thing the student did that worked (leave a blank for me to fill in the specific detail).
- One specific next step tied to the criteria.
- One question that makes the student do the thinking.

Keep each comment under 45 words. Do not use "great job", "nice work", or "consider adding more detail".`,
    tips: [
      "Paste two sentences of your own feedback. It is the difference between comments that sound like you and comments that sound like a website.",
      "Leave the blanks. A comment with no specific detail teaches students that nobody read their work.",
    ],
  },
  {
    id: "discussion-questions-sequence",
    title: "Discussion questions that build",
    summary:
      "A sequence that moves from text-based to interpretive to evaluative, with anticipated responses.",
    promptType: "discussion-questions",
    gradeBands: ["6–8", "9–12", "Early college"],
    subjects: ["English language arts", "Social studies", "Science", "Arts"],
    tags: ["discussion", "questioning", "seminar", "participation"],
    template: `We are discussing [TEXT, TOPIC, OR CASE] in [GRADE LEVEL] [SUBJECT]. We have [MINUTES] minutes.

Write a sequence of [NUMBER] questions that builds in this order:
1. Text-based: answerable only by someone who did the reading, with a locatable answer.
2. Interpretive: more than one defensible answer, all requiring evidence from the text.
3. Evaluative: asks students to judge, with the criteria for judgment made explicit.

For each question, include:
- the two responses I should expect most often
- one follow-up that pushes a student past a surface answer
- one move for re-entering a student who has been silent

End with the single question I should open with if the discussion stalls in the first three minutes.

Do not write questions with a single right answer that sound open. Do not use "how does this make you feel" as an evaluative question.`,
    tips: [
      "The expected-responses column lets you prepare follow-ups instead of improvising them.",
      "Cut any question you would not be interested in hearing twenty-eight answers to.",
    ],
  },
  {
    id: "rubric-from-your-criteria",
    title: "Rubric from criteria you already use",
    summary:
      "Turns your success criteria into observable descriptors, then pressure-tests the middle band.",
    promptType: "feedback-comments",
    gradeBands: ["3–5", "6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    tags: ["rubrics", "assessment", "grading", "criteria"],
    template: `Build a rubric for this assignment in [GRADE LEVEL] [SUBJECT]:

[PASTE THE ASSIGNMENT]

My success criteria:
[PASTE THEM]

My scale: [E.G. 4 / 3 / 2 / 1, OR EXCEEDS / MEETS / APPROACHING / BEGINNING]

Requirements:
- Every descriptor must describe something observable in the work. No evaluative adjectives like "strong", "effective", or "thoughtful" unless you define them in the same sentence.
- Descriptors must differ by what the student did, not by how much they did.
- Keep it to one page and no more than [NUMBER] rows.
- Write it in language a [GRADE LEVEL] student could read and use before submitting.

Then, for the two middle levels, tell me the clearest signal that separates them, and where you think a real piece of work would be ambiguous.`,
    tips: [
      "Test the draft on two past pieces you scored differently. If it would give them the same score, the middle band is not discriminating.",
      "The 'where would this be ambiguous' answer tells you which row to rewrite yourself.",
    ],
  },
  {
    id: "activity-spot-the-error",
    title: "Generate a flawed response on purpose",
    summary:
      "Creates the material for a critique activity, with an answer key of the planted errors.",
    promptType: "differentiated-activity",
    gradeBands: ["6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    tags: ["AI literacy", "critical thinking", "activity", "evaluation"],
    template: `I am running a "find the errors" activity with [GRADE LEVEL] [SUBJECT] students on the topic of [TOPIC].

Write a response to this question that a student might plausibly submit, at roughly [WORD COUNT] words:
[QUESTION]

The response should read fluently and confidently, and contain exactly [NUMBER] problems drawn from these kinds:
- a factual error
- a claim presented without support that needs it
- a reasoning gap where the conclusion does not follow
- missing context that changes the meaning

Then, separately and clearly labeled ANSWER KEY, list each planted problem, where it appears, and what a correct version would say.

Make the errors findable by a student who did the reading, not by a specialist.`,
    tips: [
      "Vet the answer key yourself before class. Occasionally the unplanted parts are wrong too.",
      "Print the response without the key. Students should not be able to scroll down.",
    ],
  },
  {
    id: "parent-message-draft",
    title: "Family message about a student's progress",
    summary:
      "A first draft you finish in your own voice, with no student information sent to the tool.",
    promptType: "feedback-comments",
    gradeBands: ["K–2", "3–5", "6–8", "9–12"],
    subjects: ["All subjects"],
    tags: ["families", "communication", "time saving"],
    template: `Draft a short message from a teacher to a family. Use placeholders — I will fill in every specific detail myself.

Grade: [GRADE LEVEL]
Subject: [SUBJECT]
Purpose: [CELEBRATING PROGRESS / RAISING A CONCERN / REQUESTING A MEETING]
The pattern I want to describe, in general terms: [E.G. STRONG PARTICIPATION BUT INCOMPLETE HOMEWORK]
Tone: warm, direct, not alarming
Length: under 150 words

Include:
- One specific thing to praise, with a blank for me to fill in the detail.
- The concern stated once, plainly, without softening it into vagueness.
- One concrete thing the family can do this week.
- An offer to talk, with a blank for my availability.

Use [STUDENT] as the placeholder throughout. Do not ask me for the student's name.`,
    tips: [
      "The prompt is written so no student information ever enters the tool. Keep it that way.",
      "Read it aloud before sending. Families can tell when a message was not written by the person who signed it.",
    ],
  },
  {
    id: "unit-vocabulary-support",
    title: "Vocabulary support for a unit",
    summary:
      "Student-friendly definitions, examples, and non-examples for the terms that actually block access.",
    promptType: "differentiated-activity",
    gradeBands: ["3–5", "6–8", "9–12"],
    subjects: ["Science", "Social studies", "Mathematics", "English language arts"],
    tags: ["vocabulary", "multilingual learners", "access", "unit prep"],
    template: `Unit: [UNIT TOPIC]
Grade: [GRADE LEVEL]
Subject: [SUBJECT]
Terms: [PASTE YOUR TERM LIST]

For each term, give me:
- A definition a [GRADE LEVEL] student could understand, without using another term from this list.
- One example and one non-example from a context these students would recognize.
- The everyday meaning of the word if it differs from the academic one, and why that trips students up.

Then sort the list into: terms students must know to access the unit at all, and terms they will pick up along the way. I want to pre-teach only the first group.

Do not include a term that is not on my list.`,
    tips: [
      "The sort at the end saves more time than the definitions. Pre-teaching everything is why vocabulary time overruns.",
      "The everyday-meaning column catches the terms that confuse multilingual learners most.",
    ],
  },
];

export function getPrompt(id: string) {
  return prompts.find((prompt) => prompt.id === id);
}
