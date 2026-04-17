# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## CRITICAL: Always Read `/docs` First

**Before writing or modifying any code, you MUST read the relevant file(s) in the `/docs` directory.**

The `/docs` directory contains the authoritative coding standards for this project. Generating code without consulting it first is a violation of project rules.

| Task type | Docs file to read first |
|-----------|------------------------|
| Any UI / frontend work | `docs/ui.md` |
| Any data fetching, database queries, or `/data` helpers | `docs/data-fetching.md` |

If no docs file exists for the area you are working in, proceed with care and flag the gap to the user.

## Warning: Non-standard Next.js version.

This project uses **Next.js 16.2.3** and **React 19.2.4** — versions that may differ significantly from your training data. APIs, conventions, and file structure may have breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm run seed     # Seed the database (runs src/db/seed.ts via tsx)
```

No test runner is configured yet.

## Architecture

This is a **Next.js App Router** project with TypeScript, Tailwind CSS v4, Drizzle ORM on Neon (serverless Postgres), and Clerk for authentication.

**Entry points:**
- `src/app/layout.tsx` — root layout; sets up Geist fonts via CSS variables
- `src/app/page.tsx` — public home/landing page
- `src/app/onboarding/page.tsx` — first-time user setup (profile, goals, activity level)
- `src/app/dashboard/page.tsx` — main authenticated view; date-filtered workout feed
- `src/app/globals.css` — global styles; imports Tailwind v4 via `@import "tailwindcss"` and defines CSS custom properties

**Tailwind v4 note:** No `tailwind.config.js`. Theme tokens live in `@theme inline` blocks in CSS. Configure via `postcss.config.mjs`.

**Routing:** Add new routes as folders under `src/app/`. Each folder needs a `page.tsx`.

### Auth — Clerk

Auth is handled by `@clerk/nextjs`. There is **no `middleware.ts`** — each protected page does its own redirect:

```ts
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const { userId } = await auth();
if (!userId) redirect('/sign-in');
```

`userId` must always come from `auth()` on the server — never from URL params or request bodies.

### Database — Drizzle ORM + Neon

- Schema: `src/db/schema.ts`
- Connection: `src/db/index.ts` — uses `drizzle-orm/neon-http` via `DATABASE_URL` env var
- **Neon-http limitation:** `db.transaction()` does not support inter-dependent awaits inside a single transaction callback. Use sequential top-level inserts instead (see `src/actions/workouts.ts::logWorkout` for the established pattern).

**Schema tables:** `userProfiles`, `exercises`, `programs`, `programWorkouts`, `programWorkoutExercises`, `workouts`, `workoutExercises`, `workoutSets`

**Key schema conventions:**
- `exercises.createdBy` — `NULL` means a global/system exercise; a Clerk user ID means user-created
- `workouts.programWorkoutId` — `NULL` means an ad-hoc session; non-null means the user is following a program slot

**Enums defined in schema:** `category` (strength/cardio/bodyweight/olympic/stretching), `muscle_group`, `gender`, `fitness_goal`, `activity_level`

### Data Layer

**All data fetching must happen in Server Components via helpers in `src/data/`.** Never fetch in Client Components, Route Handlers, or Server Actions. See `docs/data-fetching.md` for the full rule.

- `src/data/exercises.ts` — `getAllExercises`, `getRecentlyUsedExerciseIds`, `getLastSetsForExercises`
- `src/data/workouts.ts` — `getWorkoutsByDate`, `getWorkoutDates`
- `src/actions/workouts.ts` — `"use server"` mutations: `logWorkout`, `deleteWorkout`

**Note:** `src/app/api/workouts/route.ts` and `src/app/api/workout-dates/route.ts` exist but are legacy. Per `docs/data-fetching.md`, do not add new API route-based fetching — use Server Components + `/data` helpers instead.

### UI Layer

All interactive UI must use **shadcn/ui** components from `src/components/ui/`. Do not create custom interactive components or use other libraries. Add new shadcn components via `npx shadcn@latest add <component-name>`. Do not edit files in `src/components/ui/` manually. See `docs/ui.md` for the full rule.

Non-shadcn components in `src/components/` are layout/decorative only (no interactivity): `barbell-hero.tsx`, `logo.tsx`, `header-auth.tsx`, `ripple-button.tsx`, `animated-exercise-image.tsx`.

Key UI libraries in use: `lucide-react` (icons), `motion` (animations), `react-day-picker` (calendar), `date-fns` (date utilities), `@base-ui/react` (base primitives).

`src/lib/utils.ts` exports `cn()` (clsx + tailwind-merge) — use this for all conditional className composition.

### Static Data

`src/lib/session-routines.ts` exports `SESSION_ROUTINES` — a static record keyed by `"push" | "pull" | "legs"`, each with `warmup` and `stretch` arrays of `RoutineExercise` objects (name, reps, cue, image URL, steps). These are shown in the workout logging flow as warm-up/cool-down guidance.

### Dashboard Flow

The dashboard (`src/app/dashboard/`) is the core feature area:
- `date-nav.tsx` — client component for navigating workout dates (prev/next day, calendar popover)
- `workout-feed.tsx` — displays logged workouts for a selected date
- `log/page.tsx` — workout logging page
- `log/log-workout-form.tsx` — main form orchestrating exercise and set entry
- `log/exercise-block.tsx` — per-exercise UI within the log form
- `log/exercise-search.tsx` — exercise search/select UI
- `log/set-row.tsx` — individual set entry row (weight, reps, RPE, RIR)

<!-- code-review-graph MCP tools -->
## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool | Use when |
|------|----------|
| `detect_changes` | Reviewing code changes — gives risk-scored analysis |
| `get_review_context` | Need source snippets for review — token-efficient |
| `get_impact_radius` | Understanding blast radius of a change |
| `get_affected_flows` | Finding which execution paths are impacted |
| `query_graph` | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes` | Finding functions/classes by name or keyword |
| `get_architecture_overview` | Understanding high-level codebase structure |
| `refactor_tool` | Planning renames, finding dead code |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.
