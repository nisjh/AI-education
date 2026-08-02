import type { Resource } from "@/lib/types";

/**
 * Sample library content. Every entry is written to be usable as-is by a
 * teacher and to survive being read by a skeptical department head.
 */
export const resources: Resource[] = [
  {
    id: "first-week-with-ai",
    title: "Your first week using AI as a teacher",
    summary:
      "A five-day, low-risk plan for trying AI on your own prep before it ever touches student work.",
    category: "lesson-planning",
    gradeBands: ["K–2", "3–5", "6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    audience: ["Classroom teachers", "New to AI"],
    useCase: "Save prep time",
    timeRequired: "20 min/day",
    tags: ["start here", "prep", "routines", "beginner"],
    featured: true,
    reviewNote:
      "Everything you generate this week stays on your desk. Nothing goes to students until you have read it line by line.",
    sections: [
      {
        heading: "Why start with your own prep",
        note: "Do this on a week you are not also being observed. You are judging the tool, not performing.",
        body: "The fastest way to judge whether a tool helps is to point it at work you already know how to do well. You can spot a weak lesson plan in your own subject in about ten seconds. That instinct is the quality control, and it only works when you are the reader.",
      },
      {
        heading: "The five days",
        note: "Friday is the one most teachers keep doing after the week ends.",
        body: "Each day takes one prep period or less. Stop at any point where the output is worse than what you would have written yourself — that is useful information, not a failure.",
        steps: [
          "Monday: ask for three warm-up questions for a lesson you already taught. Compare them to the ones you used.",
          "Tuesday: paste a passage you assign and ask for four comprehension questions at different difficulty levels.",
          "Wednesday: describe one student profile (no names) and ask for two scaffolds for a task you have planned.",
          "Thursday: draft a rubric for an assignment you have already graded, then check it against the grades you gave.",
          "Friday: write one parent email you have been putting off, then rewrite it in your own voice.",
        ],
        stepKind: "sequence",
      },
      {
        heading: "What to notice",
        body: "Track two things in a note on your phone: where the output saved you real minutes, and where it was confidently wrong. Both lists matter when a colleague asks you whether this is worth their time.",
      },
    ],
  },
  {
    id: "lesson-plan-from-standard",
    title: "Turn a standard into a lesson plan draft",
    summary:
      "A repeatable process for going from a single standard to a plan you can teach, with the parts AI should not write flagged.",
    category: "lesson-planning",
    gradeBands: ["3–5", "6–8", "9–12"],
    subjects: ["All subjects"],
    audience: ["Classroom teachers", "Instructional coaches"],
    useCase: "Plan a lesson",
    timeRequired: "25 min",
    tags: ["standards", "backward design", "planning", "drafting"],
    featured: true,
    reviewNote:
      "AI does not know your class. Pacing, grouping, and which students need which scaffold are yours to set.",
    sections: [
      {
        heading: "Give it the constraints first",
        body: "Most disappointing lesson drafts come from prompts that leave out the constraints a real class has: minutes available, materials on hand, reading level range, and what students did yesterday. Put those in before you ask for anything.",
      },
      {
        heading: "Ask in the order you plan",
        note: "Short on time? Do step 2 alone. Three ways to show mastery changes the lesson more than the other four steps combined.",
        body: "Work backward the way you would on paper. Ask for the assessment evidence first, then the practice, then the opening. Generating the whole plan in one shot produces a document that looks complete and hides the weak middle.",
        steps: [
          "State the standard verbatim and what mastery looks like in your class.",
          "Ask for three ways students could show that mastery in the time you have.",
          "Pick one, then ask for the practice sequence that leads to it.",
          "Ask for a five-minute opener that surfaces the prior knowledge the sequence assumes.",
          "Ask what is most likely to confuse students, then plan for the two you find credible.",
        ],
        stepKind: "sequence",
      },
      {
        heading: "What to rewrite yourself",
        note: "Generated examples skew suburban and American. That is usually the first thing to replace.",
        body: "Rewrite the objective in your own words, replace generic examples with ones from your community or current unit, and cut anything you cannot explain if a student asks why it is there.",
      },
    ],
  },
  {
    id: "differentiation-without-tracking",
    title: "Differentiate a task without lowering the bar",
    summary:
      "How to use AI to build tiered supports for one task while keeping the same standard for every student.",
    category: "lesson-planning",
    gradeBands: ["3–5", "6–8", "9–12"],
    subjects: ["All subjects"],
    audience: ["Classroom teachers", "Instructional coaches"],
    useCase: "Plan a lesson",
    timeRequired: "20 min",
    tags: ["differentiation", "scaffolds", "multilingual learners", "IEP"],
    reviewNote:
      "Never paste IEP contents, diagnoses, or student names into an AI tool. Describe the need in general terms instead.",
    sections: [
      {
        heading: "Same standard, different runway",
        note: "Read the most supported version first. If a student could finish it without doing the thinking the standard names, the tiering has slipped.",
        body: "Tiering goes wrong when the supports quietly change what students are being asked to learn. Anchor every version to the same success criteria, and vary only the runway: sentence frames, worked examples, chunking, vocabulary pre-teaching, or reading level of the source text.",
      },
      {
        heading: "A prompt shape that works",
        body: "Describe the task, the success criteria, and three general learner profiles — for example, a student two grade levels below in reading, a student new to English, and a student who finished early last time. Ask for supports for each that keep the criteria identical.",
        steps: [
          "Paste the task and the success criteria.",
          "Describe learner needs generally, with no identifying details.",
          "Ask for supports that do not reduce the cognitive demand.",
          "Ask it to name which support it would remove first as students gain independence.",
        ],
        stepKind: "sequence",
      },
      {
        heading: "Check before you print",
        body: "Read the scaffolded versions side by side. If one version could be completed without engaging the standard, it is a different assignment and needs rework.",
      },
    ],
  },
  {
    id: "ai-resistant-assignments",
    title: "Redesign an assignment students cannot outsource",
    summary:
      "Six moves that make a task depend on things a chatbot does not have: your classroom, this week, and the student's own thinking.",
    category: "assignment-design",
    gradeBands: ["6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    audience: ["Classroom teachers", "Instructional coaches"],
    useCase: "Design an assignment",
    timeRequired: "30 min",
    tags: ["academic integrity", "assessment design", "authentic tasks"],
    featured: true,
    reviewNote:
      "No task is fully AI-proof. Aim for assignments where using AI badly is obvious and using it well still requires learning.",
    sections: [
      {
        heading: "Six moves",
        note: "If you only do one, make it process evidence. Hardest to fabricate, fastest to check.",
        body: "Each one shifts the work toward evidence a model cannot fabricate. You do not need all six; two are usually enough to change what the assignment measures.",
        steps: [
          "Anchor it in local, recent, or classroom-specific material a model has never seen.",
          "Require process evidence: annotated drafts, a photo of the whiteboard, a two-minute recording.",
          "Ask students to respond to a specific classmate's argument from discussion.",
          "Build in an in-class checkpoint where students explain their reasoning without notes.",
          "Ask for a decision with tradeoffs and a defense, not a summary.",
          "Make the AI part explicit: require a disclosed AI draft plus the student's critique of it.",
        ],
        stepKind: "set",
      },
      {
        heading: "The tradeoff to name out loud",
        body: "These designs take more of your time to assess. Choose two or three assignments per unit to redesign this way and let the rest stay lower stakes rather than trying to fortify everything.",
      },
    ],
  },
  {
    id: "disclosure-statements",
    title: "AI disclosure statements students actually complete",
    summary:
      "A short, three-question disclosure block you can attach to any assignment, with grade-appropriate wording.",
    category: "assignment-design",
    gradeBands: ["6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    audience: ["Classroom teachers"],
    useCase: "Set expectations",
    timeRequired: "10 min",
    tags: ["academic integrity", "disclosure", "routines", "honesty"],
    reviewNote:
      "A disclosure statement is a teaching tool, not a confession. Say plainly that honest disclosure is never penalized.",
    sections: [
      {
        heading: "Three questions",
        note: "Read the disclosures before you grade, not after. They change how you read the work.",
        body: "Long honor-code paragraphs get skimmed. Three concrete questions at the end of the assignment get answered.",
        steps: [
          "Which tools did you use, if any?",
          "What exactly did you ask them to do?",
          "What did you change, keep, or throw out, and why?",
        ],
        stepKind: "sequence",
      },
      {
        heading: "Wording by grade band",
        body: "Younger students need the questions read aloud and modeled once. For grades 3–5, try: 'Did a computer helper give you any words or ideas? Which ones? What did you change?' For high school and early college, keep the three questions verbatim and require a sentence for each.",
      },
      {
        heading: "How to respond to what you read",
        body: "When a student discloses heavy AI use on a task that was supposed to build a skill, treat it as a signal about the assignment's difficulty or clarity first. Ask what made the blank page hard.",
      },
    ],
  },
  {
    id: "reading-level-adaptation",
    title: "Adapt a text for multiple reading levels",
    summary:
      "Produce three versions of a source text without flattening the ideas or introducing errors.",
    category: "assignment-design",
    gradeBands: ["3–5", "6–8", "9–12"],
    subjects: ["English language arts", "Social studies", "Science"],
    audience: ["Classroom teachers"],
    useCase: "Design an assignment",
    timeRequired: "15 min",
    tags: ["reading levels", "multilingual learners", "texts", "access"],
    reviewNote:
      "Simplified versions frequently drop qualifiers and change meaning. Read every version against the original before copying.",
    sections: [
      {
        heading: "Keep the argument, change the load",
        note: "Check the simplified version for 'usually', 'most', and 'some'. Those are the words that quietly disappear.",
        body: "Ask explicitly for the claim and evidence structure to stay identical while sentence length, clause density, and low-frequency vocabulary change. Without that instruction, models tend to summarize, which removes the reasoning students are supposed to analyze.",
      },
      {
        heading: "Copyright and sourcing",
        body: "Only paste text you are permitted to use. Public-domain sources, district-licensed materials, and your own writing are safe starting points. When in doubt, link students to the original and adapt only an excerpt.",
      },
      {
        heading: "A quick accuracy check",
        body: "Pick two factual claims and one causal claim from the original and confirm they survived intact in each version. That three-point check catches most damaging rewrites in under a minute.",
      },
    ],
  },
  {
    id: "rubric-from-criteria",
    title: "Build a rubric from criteria you already trust",
    summary:
      "Start from your existing success criteria so the rubric measures your standards, not a generic template.",
    category: "assessment",
    gradeBands: ["3–5", "6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    audience: ["Classroom teachers", "Instructional coaches"],
    useCase: "Assess learning",
    timeRequired: "20 min",
    tags: ["rubrics", "grading", "success criteria", "feedback"],
    featured: true,
    reviewNote:
      "Generated descriptors drift toward vague adjectives. Replace every 'effective' or 'strong' with something you could point to in a student's work.",
    sections: [
      {
        heading: "Give it your criteria first",
        body: "If you ask for a rubric cold, you get the internet's average rubric. Paste your success criteria, your grade scale, and one example of work you consider proficient, then ask for descriptors that separate the levels.",
      },
      {
        heading: "Test the middle band",
        note: "Use work you graded last year. With this year's you will remember why you scored it that way.",
        body: "Rubrics fail in the middle. Take two pieces of past student work you scored differently and check whether the new descriptors would have produced the same two scores. If not, the language is not discriminating and needs your revision.",
        steps: [
          "Paste your criteria and scale.",
          "Ask for observable descriptors at each level, no evaluative adjectives.",
          "Test against two past samples you scored differently.",
          "Rewrite any row where you would have to guess.",
        ],
        stepKind: "sequence",
      },
    ],
  },
  {
    id: "feedback-that-sounds-like-you",
    title: "Draft feedback comments that still sound like you",
    summary:
      "Use AI for the first pass on comment banks while keeping the specificity that makes feedback land.",
    category: "assessment",
    gradeBands: ["3–5", "6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    audience: ["Classroom teachers"],
    useCase: "Assess learning",
    timeRequired: "15 min",
    tags: ["feedback", "grading", "comment banks", "time saving"],
    reviewNote:
      "Do not paste student work that includes names or identifying details. Strip identifiers or describe the pattern instead.",
    sections: [
      {
        heading: "Comment banks, not comments",
        note: "Build the bank once in August. Selecting and finishing is the part you repeat 140 times.",
        body: "The efficient use is generating a bank of stems for the four or five patterns you see every year, then selecting and finishing each one by hand with a detail from that student's work. The specific detail is the part that changes behavior.",
      },
      {
        heading: "Set the tone explicitly",
        body: "Tell it your grade band, your feedback philosophy, and a two-sentence sample of how you write. Ask for one strength, one specific next step, and one question — a shape students can act on.",
      },
      {
        heading: "Where this goes wrong",
        body: "Feedback that reads as generic teaches students that nobody read their work. If you cannot add a specific detail to a comment, do not send it.",
      },
    ],
  },
  {
    id: "exit-tickets-and-checks",
    title: "Fast checks for understanding you can write in five minutes",
    summary:
      "Exit tickets, hinge questions, and misconception probes generated from the lesson you just taught.",
    category: "assessment",
    gradeBands: ["K–2", "3–5", "6–8", "9–12"],
    subjects: ["All subjects"],
    audience: ["Classroom teachers"],
    useCase: "Assess learning",
    timeRequired: "5 min",
    tags: ["formative assessment", "exit tickets", "misconceptions"],
    reviewNote:
      "Check every distractor. Models often write plausible wrong answers that are actually defensible as correct.",
    sections: [
      {
        heading: "Ask for the misconception, then the question",
        body: "The useful move is asking what students most commonly get wrong about the concept first, then asking for a question that separates students who hold that misconception from students who do not. That sequence produces hinge questions instead of trivia.",
      },
      {
        heading: "Keep them short enough to read",
        body: "Two questions you can scan in the doorway beat six you will never grade. Ask for a maximum of two items and a one-line note on what each response would tell you.",
      },
    ],
  },
  {
    id: "spot-the-error",
    title: "Spot the error: critiquing an AI response as a class",
    summary:
      "A 20-minute activity where students find and correct the mistakes in a generated answer in your subject.",
    category: "classroom-activities",
    gradeBands: ["6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    audience: ["Classroom teachers"],
    useCase: "Run an activity",
    timeRequired: "20 min",
    tags: ["critical thinking", "AI literacy", "discussion", "evaluation"],
    featured: true,
    reviewNote:
      "Generate and vet the flawed response yourself before class so you know exactly what the errors are.",
    sections: [
      {
        heading: "Setup",
        note: "Print it. If students can scroll, half of them will paste the question straight back into a tool.",
        body: "Before class, ask a model a question from your current unit that is just past its reliable range — a multi-step calculation, a claim needing a citation, a comparison of two local policies. Print the response.",
      },
      {
        heading: "Run of the activity",
        body: "Students work in pairs with highlighters and the class resources. The scoring pressure is on evidence, not on finding the most errors.",
        steps: [
          "Pairs mark each claim as verified, unverifiable, or wrong, using the sources on hand.",
          "Each pair posts their single most confident correction with its evidence.",
          "Whole class sorts corrections into factual errors, missing context, and reasoning gaps.",
          "Close by asking what kind of question this tool handled well, and what kind it did not.",
        ],
        stepKind: "sequence",
      },
      {
        heading: "Why it works",
        body: "Students practice the evaluation skill they will need for the rest of their lives, and they see a confident, fluent answer be wrong. That single experience does more than a policy statement.",
      },
    ],
  },
  {
    id: "socratic-partner",
    title: "AI as a Socratic partner for revision",
    summary:
      "A structured protocol where the model only asks questions about student writing and never rewrites it.",
    category: "classroom-activities",
    gradeBands: ["9–12", "Early college"],
    subjects: ["English language arts", "Social studies"],
    audience: ["Classroom teachers"],
    useCase: "Run an activity",
    timeRequired: "30 min",
    tags: ["writing", "revision", "questioning", "student use"],
    reviewNote:
      "Confirm your school permits student accounts on the tool, and that students are old enough under its terms, before running this with a class.",
    sections: [
      {
        heading: "The constraint is the lesson",
        note: "Expect someone to break the questioning-only rule in the first five minutes. That moment is the discussion, not a discipline problem.",
        body: "Students give the model a strict instruction: ask me questions about my draft, one at a time, and do not write any part of it for me. The value comes from students holding that line and noticing when they want to break it.",
      },
      {
        heading: "Protocol",
        body: "Twenty minutes of questioning, ten minutes of silent revision with the tool closed.",
        steps: [
          "Students paste their own draft with names and personal details removed.",
          "They use the questioning-only instruction and answer at least six questions in writing.",
          "Tool closes. Students revise from their own answers, not from any generated text.",
          "Exit ticket: which question changed the draft the most?",
        ],
        stepKind: "sequence",
      },
    ],
  },
  {
    id: "debate-prep-stress-test",
    title: "Stress-test an argument before a class debate",
    summary:
      "Students use AI to generate counterarguments, then research which ones are real and which are hollow.",
    category: "classroom-activities",
    gradeBands: ["9–12", "Early college"],
    subjects: ["Social studies", "English language arts", "Science"],
    audience: ["Classroom teachers"],
    useCase: "Run an activity",
    timeRequired: "40 min",
    tags: ["debate", "argumentation", "research", "critical thinking"],
    reviewNote:
      "Generated counterarguments often cite sources that do not exist. Requiring verification is the point of the activity.",
    sections: [
      {
        heading: "Two rounds",
        body: "Round one is generation, round two is verification. Students quickly discover that the strongest-sounding counterargument is sometimes the one with no source behind it.",
        steps: [
          "Teams state their claim and ask for the five strongest objections to it.",
          "Teams rank the objections by how much they worry them.",
          "Each team must find a real, citable source for their top two objections.",
          "Objections that cannot be sourced get struck, and teams reflect on why they sounded convincing.",
        ],
        stepKind: "sequence",
      },
    ],
  },
  {
    id: "how-llms-work",
    title: "How these tools actually work, explained for students",
    summary:
      "A plain-language explanation of prediction, training data, and hallucination, with a grade-banded script.",
    category: "ai-literacy",
    gradeBands: ["3–5", "6–8", "9–12", "Early college"],
    subjects: ["All subjects", "Computer science"],
    audience: ["Classroom teachers", "New to AI"],
    useCase: "Teach about AI",
    timeRequired: "25 min",
    tags: ["AI literacy", "explanation", "hallucination", "foundations"],
    featured: true,
    reviewNote:
      "Analogies simplify. Say out loud that this is a simplified model of a complicated system, and that no analogy is the whole story.",
    sections: [
      {
        heading: "The one-sentence version",
        note: "You will be asked whether it thinks or is alive. 'Nobody in this room can settle that, and it does not change what you have to check' is a fair answer.",
        body: "These systems predict likely next words based on patterns in an enormous amount of text, which is why they sound fluent about everything and are reliable about much less than they sound.",
      },
      {
        heading: "By grade band",
        body: "Adjust the concreteness, not the honesty. Younger students can hold the idea that a computer is guessing what usually comes next.",
        steps: [
          "Grades 3–5: it is like a very well-read guessing machine. It has seen a lot of writing and guesses what word comes next. Guessing well is not the same as knowing.",
          "Grades 6–8: introduce training data and the idea that the tool has no way to check whether what it produced is true.",
          "Grades 9–12: add hallucination, bias inherited from training data, and why a confident tone is not evidence.",
          "Early college: add the limits of benchmarks and why capability varies sharply by task and domain.",
        ],
        stepKind: "set",
      },
      {
        heading: "What students should take away",
        body: "Fluency is not accuracy. Verification is not optional. And the person submitting the work is responsible for every claim in it.",
      },
    ],
  },
  {
    id: "verify-a-claim",
    title: "Teach students to verify an AI claim in 60 seconds",
    summary:
      "A repeatable verification routine students can use on any generated statement, adapted from lateral reading.",
    category: "ai-literacy",
    gradeBands: ["6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    audience: ["Classroom teachers"],
    useCase: "Teach about AI",
    timeRequired: "15 min",
    tags: ["verification", "media literacy", "research skills", "routines"],
    reviewNote:
      "Model the routine yourself on a claim you have not pre-checked so students see you working through genuine uncertainty.",
    sections: [
      {
        heading: "The routine",
        body: "Short enough to become a habit. Post it near the door and use the same four words every time.",
        steps: [
          "Name it: what exactly is the claim, in one sentence?",
          "Source it: who would know this, and what would they publish?",
          "Check it: find that source, not a page quoting the same claim.",
          "Mark it: verified, contradicted, or could not confirm — all three are acceptable answers.",
        ],
        stepKind: "sequence",
      },
      {
        heading: "Make 'could not confirm' respectable",
        body: "Students default to accepting a claim when verification is hard. Grading the routine rather than the verdict removes that pressure and teaches honest uncertainty.",
      },
    ],
  },
  {
    id: "privacy-and-student-data",
    title: "What never goes into a prompt",
    summary:
      "A concrete list of student information to keep out of AI tools, and safer ways to get the same help.",
    category: "safety-ethics",
    gradeBands: ["K–2", "3–5", "6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    audience: ["Classroom teachers", "School leaders", "Instructional coaches"],
    useCase: "Set expectations",
    timeRequired: "10 min",
    tags: ["privacy", "FERPA", "student data", "safety"],
    featured: true,
    reviewNote:
      "Your district's policy governs. Where this guidance and your district's rules differ, follow your district and ask your privacy officer.",
    sections: [
      {
        heading: "Keep out",
        note: "Screenshots count. A cropped gradebook or a photo of a worksheet with a name on it is the same disclosure as typing it.",
        body: "Assume anything you paste may be stored or reviewed. Student records are protected by law in most districts, and consumer AI tools are usually not covered by your district's data agreements.",
        steps: [
          "Names, initials, student ID numbers, and photos.",
          "IEP or 504 contents, diagnoses, and accommodations tied to a person.",
          "Grades, discipline records, attendance, and counselor notes.",
          "Family contact details, addresses, and immigration or custody information.",
          "Anything you would not read aloud in a staff meeting with the door open.",
        ],
        stepKind: "set",
      },
      {
        heading: "Safer substitutes",
        body: "Describe the pattern instead of the person. 'A sixth grader reading two years below level who disengages during independent work' gets you the same instructional help with none of the risk.",
      },
      {
        heading: "Before students use a tool directly",
        body: "Confirm three things: the tool is on your district's approved list, students meet the minimum age in its terms, and families have been informed in whatever way your district requires.",
      },
    ],
  },
  {
    id: "bias-and-representation",
    title: "Bias in generated material, and what to do about it",
    summary:
      "How stereotype and omission show up in AI-generated examples, and a two-minute audit before you hand anything out.",
    category: "safety-ethics",
    gradeBands: ["K–2", "3–5", "6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    audience: ["Classroom teachers", "Instructional coaches"],
    useCase: "Set expectations",
    timeRequired: "15 min",
    tags: ["bias", "representation", "equity", "review"],
    reviewNote:
      "Bias in generated material is often an absence rather than a slur. Ask who is missing, not only what was said.",
    sections: [
      {
        heading: "Where it shows up",
        note: "Names are the fastest check. Generated examples default to a narrow set, and your students notice before you do.",
        body: "Name choices, occupation defaults, whose history counts as background knowledge, which dialects are marked as errors, and which examples are treated as universal.",
      },
      {
        heading: "The two-minute audit",
        body: "Run it on anything students will read, not on your own planning notes.",
        steps: [
          "Scan names and roles: who is the doctor, who is the helper?",
          "Check whether any group appears only as a problem to be solved.",
          "Ask whether a student in your room would see themselves as a participant or as a subject.",
          "Replace one generic example with something from your community.",
        ],
        stepKind: "sequence",
      },
    ],
  },
  {
    id: "classroom-ai-policy-templates",
    title: "Three classroom AI policies you can adopt this week",
    summary:
      "Ready-to-post policies at three permission levels, with the student-facing wording for each.",
    category: "policy-leadership",
    gradeBands: ["6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    audience: ["Classroom teachers", "School leaders"],
    useCase: "Set expectations",
    timeRequired: "20 min",
    tags: ["policy", "academic integrity", "syllabus", "communication"],
    featured: true,
    reviewNote:
      "Check any policy against your district's existing academic integrity code before posting it. Yours must not contradict it.",
    sections: [
      {
        heading: "Level 1 — Not on this task",
        body: "Post as: 'This assignment measures what you can do without assistance. Do not use AI tools on it. If you are stuck, come see me — that is what the checkpoint is for.' Use for skill-building and baseline work.",
      },
      {
        heading: "Level 2 — Allowed with disclosure",
        body: "Post as: 'You may use AI tools on this assignment. You must say which tool you used, what you asked it, and what you changed. Undisclosed use is a integrity violation; disclosed use is never penalized.' Use for most work.",
      },
      {
        heading: "Level 3 — Required and examined",
        body: "Post as: 'Use an AI tool on this task, then submit the output alongside your critique of it. You are graded on the quality of your critique and revision, not on the generated draft.' Use when evaluation is the skill.",
      },
      {
        heading: "Make the level visible",
        body: "Put the level on every assignment sheet, in the same place each time. Ambiguity, not permissiveness, is what drives most integrity problems.",
      },
    ],
  },
  {
    id: "leading-ai-pd",
    title: "Run a 45-minute AI session for your staff",
    summary:
      "An agenda for department or faculty PD that starts with teacher workload and ends with agreements, not enthusiasm.",
    category: "policy-leadership",
    gradeBands: ["K–2", "3–5", "6–8", "9–12", "Early college"],
    subjects: ["All subjects"],
    audience: ["School leaders", "Instructional coaches"],
    useCase: "Lead a school",
    timeRequired: "45 min",
    tags: ["professional learning", "leadership", "facilitation", "PD"],
    reviewNote:
      "Do not present AI as inevitable or as a solution to staffing. Both framings lose the room and are not true.",
    sections: [
      {
        heading: "Agenda",
        body: "Hands on keys for most of it. Nobody changes practice from a slide deck.",
        steps: [
          "10 min — name one task that eats your week. Pair and share.",
          "15 min — everyone tries one prompt for their own task, live.",
          "10 min — report out on what was useful and what was wrong.",
          "10 min — agree on three shared rules: what we will not paste, what we tell students, what we will try before the next session.",
        ],
        stepKind: "sequence",
      },
      {
        heading: "Facilitation notes",
        note: "Open with a bad output of your own. It buys you the room's trust for the next forty minutes.",
        body: "Expect and welcome skepticism. Ask people who found bad output to present it — that credibility is what makes the useful cases believable. Close with a specific, small commitment rather than a policy.",
      },
      {
        heading: "What to send afterward",
        body: "One page: the three agreements, the district's data rules, and where to find prompts. Not the slides.",
      },
    ],
  },
  {
    id: "family-communication-ai",
    title: "Explain your AI approach to families",
    summary:
      "A short letter template and talking points for back-to-school night that answers the questions families actually ask.",
    category: "policy-leadership",
    gradeBands: ["K–2", "3–5", "6–8", "9–12"],
    subjects: ["All subjects"],
    audience: ["Classroom teachers", "School leaders"],
    useCase: "Set expectations",
    timeRequired: "15 min",
    tags: ["families", "communication", "transparency", "trust"],
    reviewNote:
      "Only promise what you will actually do. A specific, modest commitment builds more trust than a broad reassurance.",
    sections: [
      {
        heading: "The three questions families ask",
        note: "Send it before the first assignment that allows AI, not after. The timing is what makes it reassuring.",
        body: "Is my child's information safe? Will they still learn to write and think? How will you know if they cheated? Answer all three in the first paragraph.",
      },
      {
        heading: "Letter skeleton",
        body: "Keep it to one screen. Say what you use AI for in your own prep, what students may and may not do, what data never leaves the building, and how to reach you with concerns.",
        steps: [
          "What I use it for: drafting practice sets and feedback stems that I then review and revise.",
          "What students may do: use listed tools on assignments marked 'allowed with disclosure'.",
          "What never happens: student names, grades, or records going into an outside tool.",
          "How to raise a concern: reply to this message, and I will call you.",
        ],
        stepKind: "sequence",
      },
    ],
  },
];

export function getResource(id: string) {
  return resources.find((resource) => resource.id === id);
}

export const featuredResources = resources.filter((resource) => resource.featured);
