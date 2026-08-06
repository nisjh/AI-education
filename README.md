# AI Classroom Resource Hub

A resource platform for K–12 and early college teachers, school leaders, and instructional
coaches deciding how AI fits in their classroom. It combines a curriculum library, a prompt
library, and a set of editable planning templates.

The product's working premise, stated everywhere in the copy: **it drafts, you decide.** Every
judgment that affects a student stays with the teacher, and every page says what to check
before generated material reaches one.

## What is in it

| Route | What it does |
| --- | --- |
| `/` | Landing page: hero with live prompt examples, quick search, featured categories, "Start here" path, recommended-for-you, prompt library preview, FAQ |
| `/library` | Filterable grid of resources and prompt templates — search, category, grade band, subject, and tag filters, synced to the URL |
| `/library/[id]` | Full resource with an at-a-glance panel, a review note, and related resources |
| `/tools` | Curriculum AI tools: upload or paste material, choose IB DP/MYP or AP, subject, level, and output, then build a prompt for that exact context. Includes example results and a generation history |
| `/prompts` | Prompt generator plus the full prompt library |
| `/guide` | Best practices, when to use AI and when not to, academic integrity, three example policies, and an interactive safe-use checklist |
| `/templates` | Five editable templates |
| `/templates/[id]` | In-app editor with autosave and copy-as-text |
| `/saved` | Bookmarked resources, prompts, and templates (account) |
| `/sign-up`, `/log-in`, `/account` | Accounts, profile, and account deletion |

## Accounts

Reading and generating never asks who you are. An account is required only for the things that
persist:

| Free | Requires an account |
| --- | --- |
| The whole library, guide, and FAQ | Bookmarks |
| Prompt generator and prompt library | Template drafts |
| Curriculum AI tools, start to finish | Generation history |
| Copying anything; grade/subject preference | Checklist progress |

Gated features still work in-session when signed out — you can bookmark, type into a template,
and build generations. Nothing is written until there is an account to write it against, and each
screen says so rather than blocking the UI.

**This build has no server.** Accounts live in `localStorage`; passwords are stretched with
PBKDF2-SHA256 (100k iterations, per-account salt) via Web Crypto, so they are not stored in plain
text — but anyone with devtools can read or edit local storage, so **this is not a security
boundary**, and accounts do not follow a teacher to another device. The sign-up page says both
things plainly. Do not put anything sensitive behind it.

Swapping in real auth means replacing one file, `src/lib/auth/local-store.ts`, which exports
`signUp`, `logIn`, `logOut`, `updateProfile`, and `deleteAccount`. Nothing else imports storage
directly: components read the session through `useAuth()` and persist through
`useAccountStorage()`, which namespaces every key by account id.

## Stack

- Next.js 16 (App Router) with TypeScript
- Tailwind CSS v4 with CSS-variable design tokens
- shadcn/ui-style components on Radix primitives (`src/components/ui`)
- Lucide icons
- `next-themes` for light/dark/system

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # eslint
```

## Project structure

```
src/
├── app/                      # routes (App Router)
│   ├── library/[id]/         # resource detail
│   ├── prompts/              # prompt generator
│   ├── guide/                # classroom guide
│   ├── templates/[id]/       # template editor
│   └── saved/                # bookmarks
├── components/
│   ├── ui/                   # shadcn/ui-style primitives
│   ├── auth/                 # forms, account menu, gates, account view
│   ├── providers/            # theme, auth, saved items, teacher preferences
│   ├── home/                 # landing page sections
│   ├── library/              # filterable browser
│   ├── prompts/              # generator form
│   ├── tools/                # curriculum tools: upload, selectors, preview, history
│   ├── templates/            # template editor
│   └── guide/                # safe-use checklist
├── hooks/
│   ├── use-local-storage.ts  # localStorage as a useSyncExternalStore source
│   └── use-account-storage.ts # the same, namespaced per account
└── lib/
    ├── auth/                 # account store and types (the swap point)
    ├── data/                 # resources, prompts, templates, categories, guide, FAQ
    ├── tools/                # curriculum data, generation tasks, composer, samples
    │   ├── curricula.ts      # command terms, ATL skills, MYP criteria, AP formats
    │   ├── tasks.ts          # generators, output formats, transformations
    │   ├── composer.ts       # builds the curriculum-specific generation prompt
    │   ├── samples.ts        # worked example outputs (fixtures, not live output)
    │   └── extraction.ts     # text extraction boundary for files
    ├── prompt-composer.ts    # builds a prompt from the generator form
    ├── types.ts              # the data model
    └── utils.ts
```

## Data model

All content is local mock data in `src/lib/data`, typed in `src/lib/types.ts`:

- **`Resource`** — title, summary, category, grade bands, subjects, audience, use case, time
  required, tags, long-form sections, and a `reviewNote` naming what a teacher must check.
- **`PromptTemplate`** — a prompt body using `[BRACKETED CAPS]` placeholders, plus tips.
- **`DocTemplate`** — sections of fields, each with a hint and a realistic placeholder.
- **`Category`**, **`SavedItem`**, **`TeacherPreferences`**, **`FaqItem`**.

To add content, append to the relevant array — the library, filters, tag chips, counts, and
static routes all derive from the data.

### Curriculum tools

The tools area composes prompts; it does not call a model. `composeGenerationPrompt`
assembles the source text, curriculum block (IB command terms, ATL skills, MYP criterion
or DP paper — or AP course and question format), the selected generator's asks, output
formats, transformations, and any regeneration refinements into one prompt the teacher
runs in their own approved tool. The "Example result" tab shows teacher-written fixtures
from `samples.ts`, labelled in the UI as worked examples rather than live output.

File handling lives behind `extraction.ts`. Plain text and markdown are read in the
browser; PDF, DOCX, and images return a `needs-paste` state with a clear notice instead
of fabricated text. Dropping in a real parser or OCR step means changing that one file.

### Adding a backend later

The storage boundary is deliberately narrow. Moving to Supabase or Firebase means reimplementing
`src/lib/auth/local-store.ts` (accounts and sessions) and `src/hooks/use-local-storage.ts`
(everything a teacher saves). No component touches storage or the auth store directly — they go
through `useAuth()`, `useAccountStorage()`, and the providers in `src/components/providers/`.

## Design

Deep blue, teal, white, and soft gray, with tokens defined once in `src/app/globals.css` and
consumed through Tailwind. Type pairs Source Serif 4 (display), IBM Plex Sans (interface), and
IBM Plex Mono (metadata and prompt bodies). The recurring device is the prompt block: mono text
with every placeholder rendered as a teal chip, so a teacher can see at a glance what is still
theirs to fill in.

Accessibility floor: visible focus rings, a skip link, labelled controls, `aria-live` on filter
results, keyboard-operable filters and tabs, and `prefers-reduced-motion` respected.

## Content notes

Sample content is written to be usable as-is but is not legal advice. A district's own policy
governs what teachers and students may use, and the interface says so wherever it matters.
