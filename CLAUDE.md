# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

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
