import type { FaqItem } from "@/lib/types";

export const faqs: FaqItem[] = [
  {
    question: "Is AI safe to use in class?",
    answer: [
      "It depends on what you put in and what you do with what comes out. Using an AI tool on your own prep — drafting practice problems, rubric language, comment stems — carries little risk as long as no student information goes into it and you read every line before it reaches students.",
      "Students using tools directly is a different decision, and it is not only yours. Check that the tool is on your district's approved list, that your students meet the minimum age in its terms, and that families have been informed however your district requires. If any of those three is unclear, ask before you run the lesson.",
      "The risks worth planning for are specific: student privacy, confidently wrong output, and bias in generated examples. Each one has a practical control, and they are covered in the safety and ethics resources here.",
    ],
  },
  {
    question: "How do I avoid plagiarism issues?",
    answer: [
      "Start by removing the ambiguity. Most integrity problems come from students not knowing whether a tool was allowed, not from students deciding to cheat. Put a permission level on every assignment, in the same place each time: not permitted, permitted with disclosure, or required and critiqued.",
      "Then change what the assignment asks for. Tasks anchored in your classroom — a discussion that happened Tuesday, a local situation, a text you annotated together — are hard to outsource, and a generated draft stands out immediately.",
      "Be careful with AI detectors. They produce false positives, and studies have repeatedly found higher false-positive rates for multilingual writers. Do not treat a detector score as evidence. Process artifacts, drafts, and a short conversation about the student's reasoning are more reliable and more fair.",
    ],
  },
  {
    question: "What should I tell students about AI?",
    answer: [
      "Tell them how it works, in one honest sentence: it predicts likely next words from patterns in a huge amount of text, which is why it sounds fluent about everything and is reliable about much less than it sounds.",
      "Tell them what that means for their work: fluency is not accuracy, a confident tone is not evidence, and whoever submits the work is responsible for every claim in it.",
      "Then tell them your rules and the reason behind each one. Students follow rules they understand. A class where the teacher explains that the essay measures reasoning, not typing, has fewer problems than a class with a longer prohibition.",
    ],
  },
  {
    question: "How can AI save time without lowering quality?",
    answer: [
      "The reliable savings come from first drafts of things you are already good at judging: practice sets, comment stems, tiered scaffolds, vocabulary lists, family messages. You can spot a weak version in your subject in seconds, and that instinct is the quality control.",
      "The savings disappear when you use it for work you cannot check quickly. Generating content in an area you do not know well means you are now proofreading a stranger's material, which usually costs more time than writing it yourself.",
      "One practical rule: if reviewing the output takes longer than writing it from scratch would have, stop using it for that task. Keep a short list of what worked. Most teachers end up with four or five uses, not forty.",
    ],
  },
  {
    question: "Does using AI mean I am teaching less?",
    answer: [
      "No. These tools have no idea who is in your room, what happened in third period, or which student needs a different entry point today. They draft; you decide. Every judgment that matters — what to teach, what counts as proficient, who needs what — stays with you.",
      "The honest framing is narrower than the marketing: this can take some of the drafting and formatting off your plate so more of your time goes to the parts of the job that need a person.",
    ],
  },
  {
    question: "What if my school does not have a policy yet?",
    answer: [
      "You can still set a classroom-level policy, and you should. Post a permission level on assignments, tell students what you use it for in your own prep, and keep student data out of outside tools regardless of what any policy says.",
      "If you are in a position to shape school policy, start with agreements rather than a document: what we will not paste, what we tell students, and what we will each try before the next meeting. The policy and leadership resources here include an agenda for that conversation.",
    ],
  },
];
