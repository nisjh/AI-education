import type {
  CurriculumMode,
  SampleOutput,
  SubjectFamily,
} from "@/lib/tools/types";

interface SampleEntry {
  taskId: string;
  family?: SubjectFamily;
  curriculum?: CurriculumMode;
  sample: SampleOutput;
}

/**
 * Worked examples of what a good result looks like. These are written by
 * teachers and stored as fixtures — the app does not call a model, so nothing
 * here is live output. The UI labels them as examples wherever they appear.
 */
const SAMPLES: SampleEntry[] = [
  {
    taskId: "similar-problems",
    family: "quantitative",
    curriculum: "ib",
    sample: {
      caption:
        "Example result for: 10 similar quadratics, DP SL, from a worksheet on the quadratic formula.",
      items: [
        {
          label: "Step 1 — accessible",
          body: `1. Solve x² + 7x + 12 = 0.
2. Solve x² − 5x + 6 = 0.
3. Solve 2x² + 5x − 3 = 0.

Same method as the source set (factorising, then the formula as a check). Integer roots throughout so students can verify by substitution.`,
        },
        {
          label: "Step 2 — standard",
          body: `4. Solve 3x² − 7x + 2 = 0, giving exact values.
5. Solve 2x² + x − 6 = 0.
6. The graph of y = x² + kx + 9 touches the x-axis exactly once. Find the possible values of k.

Item 6 keeps the concept but changes the entry point: students meet the discriminant as a condition rather than as a formula to apply.`,
        },
        {
          label: "Step 3 — stretch",
          body: `7. Solve 4x² − 12x + 9 = 0 and explain what the repeated root tells you about the graph.
8. The equation 2x² + bx + 8 = 0 has no real roots. Find the range of values of b.
9. A rectangle has perimeter 26 cm and area 40 cm². Find its dimensions.
10. Explain why x² + 2x + 5 = 0 has no real solutions, using the discriminant.

Items 9 and 10 connect the method to a context and to reasoning — closest to what Paper 1 asks for at this level.`,
        },
        {
          label: "Model's own flag",
          body: `Least confident about item 9: the numbers work cleanly, but the context adds a step (setting up the equation) that the source set never asked for. If your students have not done that setup this unit, cut it or move it to the stretch task.`,
        },
      ],
    },
  },
  {
    taskId: "similar-problems",
    family: "quantitative",
    curriculum: "ap",
    sample: {
      caption:
        "Example result for: AP Calculus AB, MCQ practice generated from a worksheet on the chain rule.",
      items: [
        {
          label: "Items 1–3",
          body: `1. If f(x) = (3x² + 1)⁵, then f′(x) =
   (A) 5(3x² + 1)⁴
   (B) 30x(3x² + 1)⁴
   (C) 6x(3x² + 1)⁵
   (D) 15x(3x² + 1)⁴

2. If g(x) = sin(4x³), then g′(x) =
   (A) cos(4x³)
   (B) 12x² cos(4x³)
   (C) 12x² sin(4x³)
   (D) −12x² cos(4x³)

3. If h(x) = √(2x + 7), then h′(2) =
   (A) 1/11
   (B) 1/√11
   (C) 2/√11
   (D) 1/(2√11)`,
        },
        {
          label: "Distractor map",
          body: `1(A) forgot the inner derivative — the single most common error on this skill.
1(C) differentiated the inner function but left the outer exponent unchanged.
1(D) used the coefficient 3 instead of the derivative 6x.
2(A) same omission as 1(A), sine version.
2(C) differentiated the outer function incorrectly (kept sine).
3(C) forgot the ½ from the square root.`,
        },
        {
          label: "Point values",
          body: `1 point each, no partial credit, consistent with AP multiple-choice scoring. Suggested timing: 6 minutes for all three, which is slightly generous for a first pass at this skill.`,
        },
      ],
    },
  },
  {
    taskId: "data-analysis",
    family: "quantitative",
    sample: {
      caption:
        "Example result for: 5 data analysis questions from a photosynthesis rate experiment write-up.",
      items: [
        {
          label: "Questions",
          body: `1. Describe the relationship between light intensity and bubble count shown in the results table. [2]
2. The rate levels off above 40 cm from the lamp. Explain what limits the rate at that point. [3]
3. Trial 3 at 20 cm produced 41 bubbles, against 28 and 30 in the other trials. Suggest one reason for this result and state what the class should do with it. [2]
4. The students counted bubbles rather than measuring oxygen volume. Explain one limitation this introduces. [2]
5. Design a modification to this experiment that would test whether temperature is a limiting factor. State the variable you would change and the variables you would control. [3]`,
        },
        {
          label: "Expected responses",
          body: `1. As light intensity increases, bubble count increases; the increase is not proportional across the whole range.
2. Another factor becomes limiting — CO₂ concentration or temperature. Credit any correctly named limiting factor with a mechanism.
3. Anomaly. Likely cause: bubbles missed or double-counted, or the lamp moved. Should be identified as anomalous and excluded from the mean, not silently averaged in.
4. Bubble size varies, so count is a proxy rather than a measure of volume.
5. Independent variable temperature; control light intensity, distance, CO₂ concentration, same plant material, same time interval.`,
        },
        {
          label: "Model's own flag",
          body: `Question 3 depends on your students having met "anomalous result" as a term. If they have not, it becomes a guessing question rather than a reasoning one.`,
        },
      ],
    },
  },
  {
    taskId: "vocab-sentences",
    family: "language",
    curriculum: "ib",
    sample: {
      caption:
        "Example result for: 8 example sentences for a Language B unit on migration vocabulary.",
      items: [
        {
          label: "Words in context",
          body: `displaced — After the flooding, more than two thousand families were displaced from villages along the river, and most were still in temporary housing a year later.

integration — The council measures integration not by how quickly newcomers learn the language, but by whether they join clubs, vote, and stay.

seek — Families who seek asylum must often wait months before they are allowed to work, which is the part of the process most people misunderstand.

livelihood — Her whole livelihood depended on the fishing boat, so when the licence was withdrawn she had to retrain at forty-six.`,
        },
        {
          label: "More words",
          body: `remittance — Each month he sends a remittance home, and that money pays his sister's school fees.

settle — They did not plan to settle here; they came for one season of work and stayed eleven years.

border — The border moved twice during her grandmother's lifetime, though the village never did.

belonging — Belonging, for him, arrived the day a neighbour asked him for directions.`,
        },
        {
          label: "Deliberate errors to correct",
          body: `Ask students to find and fix the misuse in each:

1. "The government displaced a new policy about housing." (displaced ≠ introduced)
2. "She sent a remittance to the shop to buy bread." (a remittance is money sent home, usually across a distance)
3. "He seeks in the city for three years." (seek needs an object; likely intended: has lived / has settled)`,
        },
      ],
    },
  },
  {
    taskId: "vocab-sentences",
    family: "language",
    curriculum: "ap",
    sample: {
      caption:
        "Example result for: AP English Language, rhetorical vocabulary in context.",
      items: [
        {
          label: "Words in context",
          body: `concede — The author concedes that the policy raised costs in its first year, then argues that the comparison is misleading because the baseline year was unusual.

qualify — She does not reject the claim outright; she qualifies it, accepting the trend while disputing the cause.

juxtapose — By juxtaposing the mayor's speech with the maintenance logs, the piece lets the contradiction do the work rather than stating it.

exigence — The exigence is not the fire itself but the report published three weeks later, which is what the writer is actually answering.`,
        },
        {
          label: "Application task",
          body: `For each word, find one place in the passage where the writer does the thing the word names, quote no more than eight words, and explain in one sentence what the move accomplishes.

This is the transfer step: students who can define "qualify" and still cannot spot a qualification in a live text have not learned it yet.`,
        },
      ],
    },
  },
  {
    taskId: "cloze",
    family: "language",
    sample: {
      caption: "Example result for: a cloze exercise built from a source passage.",
      items: [
        {
          label: "Gapped passage",
          body: `The river had been the town's ________ (1) for two centuries, carrying timber down to the coast and bringing back everything the valley could not make for itself. When the railway arrived in 1887, that ________ (2) ended within a decade. What surprised the town was not the loss of the trade but how quickly the river stopped being ________ (3) at all: within a generation, children were told to keep away from it.`,
        },
        {
          label: "Word bank and key",
          body: `Word bank: dependence · lifeline · visible · trade · abandoned

Key: (1) lifeline (2) dependence or trade (3) visible

Both answers are defensible at gap 2 — accept either with a justification, and use the disagreement as the discussion.`,
        },
        {
          label: "Why these gaps",
          body: `Gap 1 tests metaphor recognition, not vocabulary recall.
Gap 2 tests whether students followed the causal chain across two sentences.
Gap 3 is the hardest: it requires reading "stopped being visible" as a claim about attention rather than eyesight. If most of the class misses it, that is your next lesson.`,
        },
      ],
    },
  },
  {
    taskId: "source-analysis",
    family: "humanities",
    curriculum: "ib",
    sample: {
      caption:
        "Example result for: DP History, source analysis questions on a 1961 newspaper editorial.",
      items: [
        {
          label: "Questions",
          body: `1. With reference to its origin, purpose and content, analyse the value and limitations of this source for a historian studying public opinion in 1961. [4]
2. Compare and contrast what this editorial and Source B suggest about government credibility at the time. [6]
3. Using this source and your own knowledge, evaluate the claim that press coverage shaped the outcome more than the policy itself did. [9]`,
        },
        {
          label: "What a strong answer references",
          body: `1. Origin: a named editor writing in a paper with a stated political alignment, two days after the announcement. Value: immediate, unfiltered reaction. Limitation: an editorial argues rather than reports, and one paper's line is not public opinion.
2. Students must name the axis of comparison, not list the sources in turn. The productive axis here is which institution each source treats as trustworthy.
3. "To what extent" reasoning: the strongest answers weigh the two causes against each other rather than describing both.`,
        },
        {
          label: "Command terms used",
          body: `Analyse (analysis), Compare and contrast (analysis), Evaluate (evaluation). Mark allocation follows the usual DP pattern so students meet the demand they will meet on the paper.`,
        },
      ],
    },
  },
  {
    taskId: "short-answer",
    family: "humanities",
    curriculum: "ap",
    sample: {
      caption:
        "Example result for: AP U.S. History short-answer question set from an excerpt.",
      items: [
        {
          label: "SAQ",
          body: `Using the excerpt, answer (a), (b), and (c).

(a) Briefly describe ONE claim the author makes about the causes of the shift described in the excerpt. [1 point]
(b) Briefly explain ONE piece of specific historical evidence from the period 1877–1900 that supports the author's claim. [1 point]
(c) Briefly explain ONE piece of specific historical evidence from the same period that undermines the author's claim. [1 point]`,
        },
        {
          label: "Scoring notes",
          body: `(a) Any accurate restatement of the author's causal claim. Do not award a summary of the excerpt with no causal element.
(b) and (c) require a specific, named piece of evidence — an act, a strike, a decision, a figure. "Industrialisation happened" is not specific enough.
Common shortfall: students explain the evidence but never connect it back to the author's claim. The connection is the point.`,
        },
      ],
    },
  },
  {
    taskId: "discussion",
    curriculum: "ib",
    sample: {
      caption:
        "Example result for: 3 command-term discussion questions from a source excerpt.",
      items: [
        {
          label: "Questions",
          body: `1. Describe the two positions the writer sets against each other in this excerpt. (Entry point — everyone can answer this from the text.)
2. Analyse how the writer's choice of examples shapes which position seems reasonable.
3. To what extent does the evidence in this excerpt support the conclusion drawn in the final paragraph?`,
        },
        {
          label: "Expected responses and follow-ups",
          body: `1. Most students will name the positions but not their strongest form. Follow-up: "State the position you disagree with in the way its own supporters would state it."
2. Expect students to notice the examples are all drawn from one decade. Follow-up: "What example would have made the other position look reasonable?"
3. The productive disagreement is whether the final paragraph goes further than the evidence allows. Follow-up: "Which sentence is the first one the evidence does not cover?"`,
        },
        {
          label: "If discussion stalls",
          body: `Open with: "Which sentence in this excerpt would the writer least want you to question?" It gets students into the text within thirty seconds and every answer is defensible.`,
        },
      ],
    },
  },
  {
    taskId: "concept-check",
    sample: {
      caption: "Example result for: an exit ticket built on the misconception.",
      items: [
        {
          label: "Misconceptions first",
          body: `1. Students treat correlation in the data as evidence of the mechanism.
2. Students apply the method correctly but cannot say what the answer means in context.
3. Students believe the rule only applies in the form it was first shown to them.`,
        },
        {
          label: "Exit ticket",
          body: `Two items, five minutes, hand in at the door.

1. A classmate says the graph proves that the change caused the increase. Is that claim justified by this data? Answer yes or no, then give one sentence of reasoning.

2. Explain, in one sentence, what your answer to question 4 on today's worksheet tells us about the situation it describes.

Item 1 separates students holding misconception 1 from the rest — a "yes" with confident reasoning is the signal. Item 2 catches misconception 2: a correct number with no interpretation is the tell.`,
        },
      ],
    },
  },
  {
    taskId: "review-set",
    sample: {
      caption: "Example result for: a 10-minute review quiz from a worksheet.",
      items: [
        {
          label: "Quiz",
          body: `Review quiz — 10 minutes, 12 marks

1. [2] One-step application of the core method.
2. [2] Same method, unfamiliar context.
3. [3] Two-step problem combining this week's method with last week's.
4. [2] Identify and correct the error in the worked solution shown.
5. [3] Explain, in words, when this method is the wrong tool.

Weighting is deliberate: items 3–5 carry two thirds of the marks because that is where the transfer lives.`,
        },
        {
          label: "Answer key",
          body: `1. Accept any correct application; award 1 mark for method if the arithmetic slips.
2. Same standard as 1. Do not award marks for a correct answer with no visible method.
3. 1 mark per correct step, 1 for the final answer.
4. The error is in the second line — the sign changes without justification. Award 1 for locating it, 1 for the correction.
5. Full marks for any answer that names a condition under which the method fails and explains why.`,
        },
      ],
    },
  },
  {
    taskId: "worked-solutions",
    family: "quantitative",
    sample: {
      caption: "Example result for: worked solutions with the common error marked.",
      items: [
        {
          label: "Worked solution",
          body: `Solve 2x² + 5x − 3 = 0.

Step 1. Identify a = 2, b = 5, c = −3.
Step 2. Discriminant: b² − 4ac = 25 − 4(2)(−3) = 25 + 24 = 49.
   ← Most common error is here: students compute 25 − 24 = 1, losing the sign on c.
   That gives roots x = −1 and x = −1.5, which look plausible enough that nobody checks.
Step 3. √49 = 7.
Step 4. x = (−5 ± 7) / 4.
Step 5. x = 0.5 or x = −3.
Step 6. Check: 2(0.25) + 2.5 − 3 = 0. ✓`,
        },
        {
          label: "Answer key",
          body: `1. x = −3, x = −4
2. x = 2, x = 3
3. x = 0.5, x = −3
4. x = 2, x = 1/3
5. x = 1.5, x = −2
6. k = ±6`,
        },
      ],
    },
  },
];

const GENERIC: SampleOutput = {
  caption:
    "Example of the shape a good result takes. Run the prompt in your own AI tool to get material from your source.",
  items: [
    {
      label: "What a strong result includes",
      body: `- Items that stay on the concept in your source rather than drifting to an adjacent topic.
- A stated difficulty step or mark allocation for each item.
- The expected response, so you can mark quickly.
- A closing note naming the items the model is least confident about, and why.

If what comes back is missing that last part, the prompt was not followed — ask for it again rather than accepting the set as-is.`,
    },
  ],
};

export function getSample(
  taskId: string,
  family: SubjectFamily,
  curriculum: CurriculumMode,
): SampleOutput {
  return (
    SAMPLES.find(
      (entry) =>
        entry.taskId === taskId &&
        entry.family === family &&
        entry.curriculum === curriculum,
    )?.sample ??
    SAMPLES.find(
      (entry) =>
        entry.taskId === taskId &&
        entry.family === family &&
        entry.curriculum === undefined,
    )?.sample ??
    SAMPLES.find(
      (entry) =>
        entry.taskId === taskId &&
        entry.family === undefined &&
        (entry.curriculum === curriculum || entry.curriculum === undefined),
    )?.sample ??
    GENERIC
  );
}
