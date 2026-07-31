export interface GuidePractice {
  title: string;
  body: string;
}

export interface UseCall {
  situation: string;
  reason: string;
}

export interface PolicyExample {
  level: string;
  name: string;
  useWhen: string;
  studentFacing: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  detail: string;
  group: "Before you start" | "Before students see it" | "Before students use a tool";
}

export const bestPractices: GuidePractice[] = [
  {
    title: "Point it at work you can judge in seconds",
    body: "Use AI where your expertise is the quality control: your subject, your grade band, the kinds of tasks you have written a hundred times. If you cannot tell good from bad at a glance, you are proofreading a stranger's work rather than saving time.",
  },
  {
    title: "Give it constraints before you ask for output",
    body: "Minutes available, materials on hand, what students did yesterday, the range of readers in the room. Most disappointing drafts come from prompts that leave out the constraints every real class has.",
  },
  {
    title: "Read every line before it reaches a student",
    body: "Generated material fails quietly: a distractor that is arguably correct, a simplified passage that dropped the qualifier holding the argument together, an example that only some of your students can see themselves in. None of these announce themselves.",
  },
  {
    title: "Keep student information out",
    body: "No names, no IDs, no IEP contents, no grades, no discipline records. Describe the instructional pattern instead of the person — it gets you the same help with none of the exposure.",
  },
  {
    title: "Tell students what you are doing",
    body: "If you use AI to draft practice sets or comment stems, say so. A class where the teacher is open about their own use has a much easier time asking students to be open about theirs.",
  },
  {
    title: "Keep the judgment calls",
    body: "What to teach, what counts as proficient, who needs a different entry point, when a student needs a conversation instead of a comment. These are the parts of teaching that require knowing the people in the room.",
  },
];

export const whenToUse: UseCall[] = [
  {
    situation: "Drafting practice items, warm-ups, and exit tickets",
    reason: "You can evaluate quality instantly, and the volume is what costs you time.",
  },
  {
    situation: "Building tiered scaffolds for a task you already designed",
    reason: "The standard stays yours; only the runway changes, and you can check it in a read-through.",
  },
  {
    situation: "Turning your success criteria into rubric descriptors",
    reason: "You supply the criteria, so the output is bounded by your standards rather than a generic template.",
  },
  {
    situation: "Getting unstuck on a first draft — an email, a project brief, a letter",
    reason: "A mediocre first draft you rewrite beats a blank page you avoid for three days.",
  },
  {
    situation: "Generating material for students to critique",
    reason: "Errors are the point, so the usual reliability problem becomes the lesson.",
  },
  {
    situation: "Anticipating misconceptions before you teach a topic",
    reason: "Its answers are a starting list you filter with what you have actually seen in your classes.",
  },
];

export const whenNotToUse: UseCall[] = [
  {
    situation: "Anything involving identifiable student information",
    reason: "Consumer AI tools are usually outside your district's data agreements, and student records are legally protected.",
  },
  {
    situation: "Grading decisions and final scores",
    reason: "A score is a professional judgment about a student. It needs a person who knows the class standing behind it.",
  },
  {
    situation: "Facts you cannot verify in your subject area",
    reason: "Fluent, confident, and wrong is the characteristic failure. If you cannot check it, do not hand it out.",
  },
  {
    situation: "Special education documentation and eligibility decisions",
    reason: "These are legal documents with required processes and named people. Follow your district's process, not a chatbot.",
  },
  {
    situation: "Detecting whether a student used AI",
    reason: "Detectors produce false positives, disproportionately for multilingual writers. Use process evidence and a conversation instead.",
  },
  {
    situation: "Counseling, crisis, or safeguarding situations",
    reason: "These need your school's trained staff and its reporting process, immediately and every time.",
  },
];

export const integrityPoints: GuidePractice[] = [
  {
    title: "Ambiguity causes more problems than permissiveness",
    body: "Students who do not know whether a tool was allowed will guess, and half of them will guess wrong. Put a permission level on every assignment, in the same spot on the page each time.",
  },
  {
    title: "Disclosure has to be safe to be honest",
    body: "If disclosing AI use costs points, students stop disclosing and you lose your only window into what is happening. State plainly that honest disclosure is never penalized, and hold to it.",
  },
  {
    title: "Do not rely on AI detectors",
    body: "They return false positives, and the error rate is higher for multilingual writers. A detector score is not evidence. Drafts, annotations, in-class checkpoints, and a two-minute conversation about the student's reasoning are.",
  },
  {
    title: "Treat heavy undisclosed use as information about the task",
    body: "When a student outsources a whole assignment, ask what made the blank page hard before you decide what it means. Often the answer changes the assignment, not the student.",
  },
  {
    title: "Say what is being measured",
    body: "'This one measures what you can do without help' is a sentence students accept. 'AI is banned' invites negotiation about what counts as AI.",
  },
];

export const policyExamples: PolicyExample[] = [
  {
    level: "Level 1",
    name: "Not on this task",
    useWhen: "Skill-building work, baseline assessments, anything where the struggle is the point.",
    studentFacing:
      "This assignment measures what you can do without assistance, so do not use AI tools on it. If you get stuck, come see me — that is what the checkpoint is for.",
  },
  {
    level: "Level 2",
    name: "Allowed with disclosure",
    useWhen: "Most day-to-day work, drafting, studying, and practice.",
    studentFacing:
      "You may use AI tools on this assignment. Tell me which tool you used, what you asked it, and what you changed. Undisclosed use is an integrity violation. Disclosed use is never penalized.",
  },
  {
    level: "Level 3",
    name: "Required and examined",
    useWhen: "When evaluating AI output is itself the skill being taught.",
    studentFacing:
      "Use an AI tool on this task, then turn in its output along with your critique of it. You are graded on your critique and revision, not on the generated draft.",
  },
];

export const checklist: ChecklistItem[] = [
  {
    id: "district-policy",
    group: "Before you start",
    label: "I have read my district's AI and data policy",
    detail: "Where this site's guidance and your district's rules differ, your district governs.",
  },
  {
    id: "approved-tools",
    group: "Before you start",
    label: "I know which tools are approved here",
    detail: "Approved for staff use and approved for student use are often different lists.",
  },
  {
    id: "data-rule",
    group: "Before you start",
    label: "I have a personal rule for what never goes in a prompt",
    detail: "Names, IDs, IEP contents, grades, discipline records, family details.",
  },
  {
    id: "read-through",
    group: "Before students see it",
    label: "I read every line of the generated material",
    detail: "Check facts, check distractors, check that simplified text kept the argument intact.",
  },
  {
    id: "bias-audit",
    group: "Before students see it",
    label: "I ran the two-minute bias audit",
    detail: "Who is the expert, who is the problem, and would a student in my room see themselves here?",
  },
  {
    id: "objective-check",
    group: "Before students see it",
    label: "The material still targets my objective",
    detail: "Generated plans drift. Reread the objective and cut anything that does not serve it.",
  },
  {
    id: "permission-level",
    group: "Before students use a tool",
    label: "The assignment states its AI permission level",
    detail: "Same place on the page, every assignment.",
  },
  {
    id: "age-terms",
    group: "Before students use a tool",
    label: "Students meet the tool's minimum age and it is district-approved",
    detail: "Check the terms, not the marketing page.",
  },
  {
    id: "families-informed",
    group: "Before students use a tool",
    label: "Families have been informed as my district requires",
    detail: "A short note before the first lesson prevents most difficult conversations later.",
  },
  {
    id: "no-account-alternative",
    group: "Before students use a tool",
    label: "There is a path for students who cannot or will not use the tool",
    detail: "Opt-outs are legitimate. Plan the alternative before someone has to ask for it.",
  },
];
