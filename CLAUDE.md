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

## Warning: Non-standard Next.js version

This project uses **Next.js 16.2.3** and **React 19.2.4** — versions that may differ significantly from your training data. APIs, conventions, and file structure may have breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test runner is configured yet.

## Architecture

This is a **Next.js App Router** project with TypeScript and Tailwind CSS v4.

**Entry points:**
- `src/app/layout.tsx` — root layout; sets up Geist fonts via CSS variables and wraps all pages
- `src/app/page.tsx` — home page (`/` route)
- `src/app/globals.css` — global styles; imports Tailwind v4 via `@import "tailwindcss"` and defines CSS custom properties for background/foreground colors

**Tailwind v4 note:** This project uses Tailwind CSS v4, which configures via `postcss.config.mjs` and `@import "tailwindcss"` in CSS — there is no `tailwind.config.js`. Theme tokens are set with `@theme inline` blocks in CSS, not in a JS config file.

**Routing:** Add new routes as folders under `src/app/`. Each folder needs a `page.tsx` to be a route. Layouts can be nested.

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
