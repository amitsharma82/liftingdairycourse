# UI Redesign — Neon Glow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the landing page and dashboard to a Neon Glow aesthetic — glassmorphism cards, glowing gradients, rounded corners, new barbell-through-LD logo, and a new dashboard stats strip.

**Architecture:** Purely visual changes — no new routes, no new DB queries. Stats strip data is computed server-side from already-fetched props. Logo SVG is replaced in-place, keeping the same component interface. Global `--radius` token drives rounded corners across all shadcn components.

**Tech Stack:** Next.js 16 App Router · React 19 · Tailwind CSS v4 · shadcn/ui · Clerk auth · Lucide icons

**No test runner is configured** — verification steps use `npm run dev` + browser inspection.

---

## File Map

| File | Action | What changes |
|------|--------|-------------|
| `src/components/logo.tsx` | Modify | Replace SVG with barbell-through-LD mark, keep props interface |
| `src/app/globals.css` | Modify | `--radius: 0.75rem`, add `.glass-card` utility |
| `public/favicon.svg` | Create | Icon-only logo mark for browser tab |
| `src/app/layout.tsx` | Modify | Nav backdrop-blur + bg treatment |
| `src/components/header-auth.tsx` | Modify | Gradient pill primary, glass ghost secondary |
| `src/app/page.tsx` | Modify | Full landing redesign — new sections, new styles |
| `src/app/dashboard/page.tsx` | Modify | Compute & render stats strip |
| `src/app/dashboard/date-nav.tsx` | Modify | Glass buttons, lime date display |
| `src/app/dashboard/workout-feed.tsx` | Modify | Glass cards, pill badges, glow duration |

---

## Task 1: Logo — barbell-through-LD mark

**Files:**
- Modify: `src/components/logo.tsx`

- [ ] **Step 1: Replace the SVG in `src/components/logo.tsx`**

Replace the entire file with:

```tsx
/**
 * LogoMark — barbell bar cutting horizontally through the letters L and D,
 * with lime-coloured glowing plates on each end.
 *
 * Props interface unchanged from previous version so layout.tsx needs no edits.
 */
export function LogoMark({
  size      = 40,
  color     = "#a3e635",
  animated  = false,
  className = "",
}: {
  size?:     number;
  color?:    string;
  animated?: boolean;
  className?: string;
}) {
  // viewBox is 160 × 104
  const h = Math.round(size * (104 / 160));

  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 160 104"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lifting Diary logo"
      className={`${animated ? "logo-mark" : ""} ${className}`.trim()}
    >
      <defs>
        <linearGradient id="ld-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3a3a3a" />
          <stop offset="35%"  stopColor="#bbbbbb" />
          <stop offset="65%"  stopColor="#bbbbbb" />
          <stop offset="100%" stopColor="#333333" />
        </linearGradient>
        <filter id="ld-glow" x="-50%" y="-25%" width="200%" height="150%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Letter L ───────────────────────────────── */}
      <rect x="16" y="10" width="13" height="68" rx="2" fill="currentColor" />
      <rect x="16" y="64" width="42" height="14" rx="2" fill="currentColor" />

      {/* ── Letter D ───────────────────────────────── */}
      <rect x="90" y="10" width="13" height="70" rx="2" fill="currentColor" />
      <path
        d="M103 10 Q147 10 147 52 Q147 94 103 94 L103 80 Q131 80 131 52 Q131 24 103 24 Z"
        fill="currentColor"
      />

      {/* ── Barbell bar cutting through both letters ─ */}
      <rect x="0" y="44" width="160" height="16" rx="3" fill="url(#ld-bar)" opacity="0.92" />

      {/* ── Left plate ─────────────────────────────── */}
      <rect x="0" y="29" width="13" height="46" rx="2" fill={color} filter="url(#ld-glow)" />

      {/* ── Right plate ────────────────────────────── */}
      <rect x="147" y="29" width="13" height="46" rx="2" fill={color} filter="url(#ld-glow)" />
    </svg>
  );
}
```

- [ ] **Step 2: Start dev server and verify logo in nav**

```bash
cd /Users/amsha/Documents/my_vault/liftingdairycourse && npm run dev
```

Open http://localhost:3000. The nav should show the LD barbell mark beside "LIFTING DIARY". The plates should glow lime and pulse (animated prop is true in layout.tsx).

- [ ] **Step 3: Commit**

```bash
cd /Users/amsha/Documents/my_vault/liftingdairycourse
git add src/components/logo.tsx
git commit -m "feat: replace logo with barbell-through-LD mark"
```

---

## Task 2: Global CSS — radius token + glass utility

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Update `--radius` and add glass card utility**

Find the line `--radius: 0rem;` in `globals.css` and change it to `0.75rem`:

```css
--radius: 0.75rem;
```

Then add this utility class block anywhere after the existing keyframes (before `@layer base`):

```css
/* ── Glass card ──────────────────────────────── */
.glass-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(12px);
}
```

- [ ] **Step 2: Verify in browser**

With dev server running, check http://localhost:3000/dashboard — all shadcn `Card`, `Button`, `Popover`, `Badge` components should now have rounded corners.

- [ ] **Step 3: Commit**

```bash
cd /Users/amsha/Documents/my_vault/liftingdairycourse
git add src/app/globals.css
git commit -m "feat: set border-radius token to 0.75rem, add glass-card utility"
```

---

## Task 3: Favicon

**Files:**
- Create: `public/favicon.svg`

- [ ] **Step 1: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 104" fill="none">
  <defs>
    <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3a3a3a"/>
      <stop offset="35%" stop-color="#bbbbbb"/>
      <stop offset="65%" stop-color="#bbbbbb"/>
      <stop offset="100%" stop-color="#333333"/>
    </linearGradient>
  </defs>
  <!-- L -->
  <rect x="16" y="10" width="13" height="68" rx="2" fill="#ffffff"/>
  <rect x="16" y="64" width="42" height="14" rx="2" fill="#ffffff"/>
  <!-- D -->
  <rect x="90" y="10" width="13" height="70" rx="2" fill="#ffffff"/>
  <path d="M103 10 Q147 10 147 52 Q147 94 103 94 L103 80 Q131 80 131 52 Q131 24 103 24 Z" fill="#ffffff"/>
  <!-- Bar -->
  <rect x="0" y="44" width="160" height="16" rx="3" fill="url(#bar)" opacity="0.92"/>
  <!-- Left plate -->
  <rect x="0" y="29" width="13" height="46" rx="2" fill="#a3e635"/>
  <!-- Right plate -->
  <rect x="147" y="29" width="13" height="46" rx="2" fill="#a3e635"/>
</svg>
```

- [ ] **Step 2: Update metadata in `src/app/layout.tsx` to reference favicon.svg**

In `layout.tsx`, find the `export const metadata` block and add `icons`:

```tsx
export const metadata: Metadata = {
  title: "Lifting Diary",
  description: "Log workouts. Follow programs. Hit PRs.",
  icons: { icon: "/favicon.svg" },
};
```

- [ ] **Step 3: Verify**

Browser tab should show the LD logo icon. May need a hard refresh (Cmd+Shift+R).

- [ ] **Step 4: Commit**

```bash
cd /Users/amsha/Documents/my_vault/liftingdairycourse
git add public/favicon.svg src/app/layout.tsx
git commit -m "feat: add SVG favicon with LD barbell mark"
```

---

## Task 4: Nav restyling

**Files:**
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Add backdrop blur and updated bg to the nav `<header>`**

Find the `<header>` element in `layout.tsx`. Replace its `className`:

```tsx
<header className="flex items-center justify-between px-8 md:px-16 py-4 bg-zinc-900/95 backdrop-blur-md sticky top-0 z-50 relative">
```

Everything else in the header stays the same (LogoMark, wordmark span, HeaderAuth, gradient separator div).

- [ ] **Step 2: Verify**

Scroll down on http://localhost:3000 — the nav should stay sticky and blur the content behind it.

- [ ] **Step 3: Commit**

```bash
cd /Users/amsha/Documents/my_vault/liftingdairycourse
git add src/app/layout.tsx
git commit -m "feat: sticky nav with backdrop blur"
```

---

## Task 5: Header auth buttons — glass + gradient pill

**Files:**
- Modify: `src/components/header-auth.tsx`

- [ ] **Step 1: Restyle the sign-in and sign-up links**

Replace the entire file:

```tsx
"use client";

import Link from "next/link";
import { useAuth, UserButton } from "@clerk/nextjs";

export function HeaderAuth() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <div className="w-[148px] h-9" />;

  if (!isSignedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/sign-in"
          className="font-mono text-xs tracking-[0.2em] uppercase px-5 py-2.5 rounded-full border border-white/20 bg-white/[0.04] text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200 backdrop-blur-sm"
        >
          SIGN IN
        </Link>
        <Link
          href="/sign-up"
          className="font-mono text-xs tracking-[0.2em] uppercase px-5 py-2.5 rounded-full font-medium bg-gradient-to-r from-lime-400 to-teal-400 text-zinc-900 hover:from-lime-300 transition-all duration-200"
          style={{ boxShadow: "0 0 18px rgba(163,230,53,0.45), 0 0 36px rgba(163,230,53,0.18)" }}
        >
          START FREE
        </Link>
      </div>
    );
  }

  return (
    <UserButton
      appearance={{ elements: { avatarBox: "w-9 h-9" } }}
    />
  );
}
```

- [ ] **Step 2: Verify**

Sign out (or open incognito). Nav should show glass "SIGN IN" and gradient "START FREE" pill buttons.

- [ ] **Step 3: Commit**

```bash
cd /Users/amsha/Documents/my_vault/liftingdairycourse
git add src/components/header-auth.tsx
git commit -m "feat: glass + gradient pill auth buttons in nav"
```

---

## Task 6: Landing page — full redesign

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Replace `src/app/page.tsx` with the redesigned version**

```tsx
"use client";

import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { BarbellHero }   from "@/components/barbell-hero";
import { RippleButton }  from "@/components/ripple-button";

const LIME   = "#a3e635";
const CYAN   = "#22d3ee";
const ORANGE = "#fb923c";

const FEATURES = [
  {
    num:   "001",
    title: "LOG SESSIONS",
    body:  "Every rep. Every set. Every PR. Track weight, reps, RPE, RIR, and rest time with surgical precision.",
    color: LIME,
  },
  {
    num:   "002",
    title: "BUILD PROGRAMS",
    body:  "Design multi-week training blocks. Schedule sessions by week and day. Never miss a programmed lift.",
    color: CYAN,
  },
  {
    num:   "003",
    title: "TRACK PROGRESS",
    body:  "Your numbers. Your history. Watch the trend line move as you consistently put in the work.",
    color: ORANGE,
  },
];

const MARQUEE = [
  "THE BAR NEVER LIES",
  "ONE MORE REP",
  "DISCIPLINE OVER MOTIVATION",
  "SHOW UP ANYWAY",
  "PR OR TRY AGAIN",
  "PROGRESSIVE OVERLOAD IS THE ONLY LAW",
  "EARN YOUR STRENGTH",
  "CONSISTENCY IS THE SHORTCUT",
  "THE IRON WAITS FOR NO ONE",
  "REST. RECOVER. RETURN.",
];

// ── Auth-aware CTA buttons ─────────────────────────────────────────────────────
function CTAButtons() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <div className="mt-10 h-[52px]" />;

  if (isSignedIn) {
    return (
      <div className="mt-10">
        <RippleButton
          onClick={() => { window.location.href = "/dashboard"; }}
          className="rounded-full font-mono text-sm tracking-widest px-8 py-4 font-medium uppercase bg-gradient-to-r from-lime-400 to-teal-400 text-zinc-900 hover:from-lime-300 transition-all"
          style={{ boxShadow: "0 0 28px rgba(163,230,53,0.5), 0 0 56px rgba(163,230,53,0.18)" }}
        >
          OPEN DIARY →
        </RippleButton>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 mt-10 animate-rise-in" style={{ animationDelay: "0.5s" }}>
      <SignUpButton mode="modal" afterSignUpUrl="/onboarding">
        <RippleButton
          variant="primary"
          className="rounded-full font-mono text-sm tracking-widest px-8 py-4 font-medium uppercase cursor-pointer active:scale-95 transition-transform bg-gradient-to-r from-lime-400 to-teal-400 text-zinc-900 hover:from-lime-300"
          style={{ boxShadow: "0 0 28px rgba(163,230,53,0.5), 0 0 56px rgba(163,230,53,0.18)" }}
        >
          START FREE →
        </RippleButton>
      </SignUpButton>
      <SignInButton mode="modal">
        <RippleButton
          variant="ghost"
          className="rounded-full font-mono text-sm tracking-widest px-8 py-4 uppercase cursor-pointer active:scale-95 transition-transform border border-white/20 bg-white/[0.04] backdrop-blur-sm text-white/70 hover:bg-white/10 hover:text-white"
        >
          SIGN IN
        </RippleButton>
      </SignInButton>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="flex flex-col flex-1 grain">

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative flex-1 min-h-[calc(100svh-67px)] flex flex-col justify-center px-8 md:px-16 py-24 overflow-hidden">

        {/* Radial background glows */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 25% 60%, rgba(163,230,53,0.09) 0%, transparent 60%)," +
              "radial-gradient(ellipse 50% 60% at 80% 30%, rgba(34,211,238,0.06) 0%, transparent 55%)",
          }}
        />

        <div className="relative z-10 grid md:grid-cols-2 gap-8 md:gap-0 items-center">

          {/* Text column */}
          <div>
            <div className="flex items-center gap-4 mb-10 animate-fade-in" style={{ animationDelay: "0.05s" }}>
              <span className="font-mono text-xs tracking-[0.5em] text-white/35 uppercase">
                Your Training Companion
              </span>
            </div>

            <h1
              className="font-display leading-[0.88] tracking-wider text-white animate-rise-in"
              style={{
                fontSize:      "clamp(4.5rem, 14vw, 13rem)",
                animationDelay:"0.1s",
                textShadow:    "0 0 80px rgba(163,230,53,0.15)",
              }}
            >
              LIFTING
              <br />
              <span style={{ color: LIME, textShadow: "0 0 40px rgba(163,230,53,0.4)" }}>DIARY</span>
              <span className="cursor-blink" style={{ color: LIME }}>.</span>
            </h1>

            <p
              className="mt-6 font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-white/38 animate-rise-in"
              style={{ animationDelay: "0.3s" }}
            >
              <span style={{ color: LIME }}>LOG WORKOUTS</span>
              <span className="text-white/25 mx-3">/</span>
              <span style={{ color: CYAN }}>FOLLOW PROGRAMS</span>
              <span className="text-white/25 mx-3">/</span>
              <span style={{ color: ORANGE }}>HIT PRS</span>
            </p>

            <CTAButtons />
          </div>

          {/* Barbell + floating stats card */}
          <div className="hidden md:flex flex-col items-center relative">
            {/* Neon glow behind barbell */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 80% 60% at 50% 55%, rgba(163,230,53,0.13) 0%, rgba(34,211,238,0.07) 45%, transparent 70%)",
              }}
            />

            <BarbellHero className="w-full opacity-90 relative z-10" />

            {/* Floating stats card */}
            <div
              className="relative z-10 -mt-2 mx-6 w-full rounded-2xl border border-lime-400/20 bg-background/75 backdrop-blur-xl p-4 flex justify-between items-center gap-4"
              style={{
                boxShadow:
                  "0 0 28px rgba(163,230,53,0.09), 0 0 56px rgba(34,211,238,0.05), inset 0 1px 0 rgba(255,255,255,0.07)",
              }}
            >
              <div className="text-center flex-1">
                <div className="font-display text-xl leading-none" style={{ color: LIME }}>
                  58<span className="text-sm opacity-55">m</span>
                </div>
                <div className="font-mono text-[8px] tracking-[0.25em] text-white/28 mt-1">DURATION</div>
              </div>
              <div className="w-px h-8 bg-white/[0.07]" />
              <div className="text-center flex-1">
                <div className="font-display text-xl leading-none" style={{ color: CYAN }}>15</div>
                <div className="font-mono text-[8px] tracking-[0.25em] text-white/28 mt-1">SETS</div>
              </div>
              <div className="w-px h-8 bg-white/[0.07]" />
              <div className="text-center flex-1">
                <div className="font-display text-xl leading-none" style={{ color: ORANGE }}>
                  4.2<span className="text-sm opacity-55">t</span>
                </div>
                <div className="font-mono text-[8px] tracking-[0.25em] text-white/28 mt-1">VOLUME</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom colour bar */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, ${LIME}, ${CYAN}, ${ORANGE})` }}
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          MARQUEE TICKER
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="overflow-hidden py-3"
        style={{
          background:   "rgba(255,255,255,0.018)",
          borderTop:    "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="marquee-track-left">
          {[...MARQUEE, ...MARQUEE].map((phrase, i) => (
            <span key={i} className="inline-flex items-center shrink-0">
              <span
                className="font-display text-xl tracking-[0.18em] whitespace-nowrap px-8"
                style={{
                  color:   i % 3 === 0 ? LIME : i % 3 === 1 ? CYAN : ORANGE,
                  opacity: 0.55,
                }}
              >
                {phrase}
              </span>
              <span className="text-white/20 font-mono text-sm">⟡</span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-8 md:px-16 py-20 md:py-28">
        <div className="mb-3">
          <span className="font-mono text-xs tracking-[0.4em] text-white/28 uppercase">What you get</span>
        </div>
        <h2
          className="font-display tracking-widest text-white mb-10"
          style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
        >
          Everything you need to train{" "}
          <em className="font-display not-italic" style={{ color: CYAN }}>smarter.</em>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.num}
              className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 hover:border-white/[0.14] transition-colors duration-300"
            >
              {/* Top glow line */}
              <div
                className="absolute inset-x-0 top-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }}
              />
              {/* Top glow orb */}
              <div
                aria-hidden
                className="absolute -top-10 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full blur-2xl"
                style={{ background: f.color, opacity: 0.05 }}
              />

              <span className="font-mono text-xs tracking-[0.3em] mb-3 block" style={{ color: f.color }}>
                {f.num}
              </span>
              <h3
                className="font-display tracking-widest mb-3"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", color: f.color }}
              >
                {f.title}
              </h3>
              <p className="font-mono text-sm leading-7 text-white/38">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          DASHBOARD PREVIEW
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="px-8 md:px-16 py-20 md:py-28 relative overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Cyan radial glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 55% at 50% 50%, rgba(34,211,238,0.05) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <div className="mb-3">
            <span
              className="font-mono text-xs tracking-[0.4em] uppercase"
              style={{ color: `${CYAN}aa` }}
            >
              See it in action
            </span>
          </div>
          <h2
            className="font-display tracking-widest text-white mb-10"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Your diary. Built for{" "}
            <span style={{ color: CYAN }}>athletes.</span>
          </h2>

          {/* Preview card */}
          <div
            className="rounded-2xl border p-6 md:p-8 backdrop-blur-sm"
            style={{
              background:   "rgba(34,211,238,0.04)",
              borderColor:  "rgba(34,211,238,0.16)",
              boxShadow:    "0 0 50px rgba(34,211,238,0.06), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Card header */}
            <div className="flex justify-between items-start mb-5">
              <div>
                <div
                  className="font-display text-2xl tracking-[0.1em]"
                  style={{ color: CYAN, textShadow: `0 0 20px ${CYAN}80` }}
                >
                  DAILY LOG
                </div>
                <div className="font-mono text-xs tracking-[0.3em] text-white/28 mt-1">
                  WEDNESDAY · APR 16, 2026
                </div>
              </div>
              <div
                className="rounded-lg px-3 py-1.5 font-mono text-xs tracking-[0.15em]"
                style={{
                  background:  "rgba(163,230,53,0.1)",
                  border:      "1px solid rgba(163,230,53,0.22)",
                  color:       LIME,
                }}
              >
                + LOG WORKOUT
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[
                { val: "4.2t",  lbl: "VOLUME TODAY", color: LIME   },
                { val: "15",    lbl: "SETS TODAY",   color: CYAN   },
                { val: "12 🔥", lbl: "DAY STREAK",   color: ORANGE },
              ].map((s) => (
                <div
                  key={s.lbl}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3"
                >
                  <div className="font-display text-xl tracking-wide" style={{ color: s.color }}>
                    {s.val}
                  </div>
                  <div className="font-mono text-[9px] tracking-[0.2em] text-white/28 mt-1">{s.lbl}</div>
                </div>
              ))}
            </div>

            {/* Sample workout row */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 flex justify-between items-center">
              <div>
                <div className="font-display tracking-[0.12em] text-white text-lg">PUSH DAY A</div>
                <div className="font-mono text-[9px] tracking-[0.15em] text-white/30 mt-0.5">
                  4 EXERCISES · 15 SETS · 58 MIN
                </div>
              </div>
              <div className="font-display text-lg tracking-wide" style={{ color: LIME }}>
                4,200 KG
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER CTA
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative px-8 md:px-16 py-20 md:py-28 flex flex-col md:flex-row items-start md:items-center justify-between gap-10"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        {/* Lime glow from below */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 50% 110%, rgba(163,230,53,0.07) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10">
          <span className="font-mono text-xs tracking-[0.4em] text-white/28 uppercase block mb-4">
            Ready to start?
          </span>
          <h2
            className="font-display leading-none tracking-widest text-white"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            Load the <span style={{ color: LIME }}>bar.</span>
          </h2>
        </div>

        <SignUpButton mode="modal" afterSignUpUrl="/onboarding">
          <RippleButton
            variant="primary"
            className="relative z-10 rounded-full font-mono text-sm tracking-widest px-12 py-6 font-medium uppercase whitespace-nowrap cursor-pointer active:scale-95 transition-transform bg-gradient-to-r from-lime-400 to-teal-400 text-zinc-900 hover:from-lime-300"
            style={{
              boxShadow:
                "0 0 36px rgba(163,230,53,0.55), 0 0 72px rgba(163,230,53,0.22)",
            }}
          >
            CREATE FREE ACCOUNT →
          </RippleButton>
        </SignUpButton>
      </section>

    </div>
  );
}
```

- [ ] **Step 2: Verify landing page in browser**

Open http://localhost:3000 (signed out). Check:
- Hero: barbell on right, floating stats card below it, gradient pill buttons
- Marquee ticker scrolling
- 3 glassmorphism feature cards with top glow lines
- Dashboard preview section with cyan tint
- Footer CTA with gradient pill button and lime glow

- [ ] **Step 3: Commit**

```bash
cd /Users/amsha/Documents/my_vault/liftingdairycourse
git add src/app/page.tsx
git commit -m "feat: redesign landing page — neon glow aesthetic"
```

---

## Task 7: Dashboard — stats strip

**Files:**
- Modify: `src/app/dashboard/page.tsx`

- [ ] **Step 1: Replace `src/app/dashboard/page.tsx`**

```tsx
import Link           from "next/link";
import { auth }       from "@clerk/nextjs/server";
import { redirect }   from "next/navigation";
import { getWorkoutsByDate, getWorkoutDates } from "@/data/workouts";
import { buttonVariants } from "@/components/ui/button";
import DateNav        from "./date-nav";
import WorkoutFeed    from "./workout-feed";

const LIME   = "#a3e635";
const CYAN   = "#22d3ee";
const ORANGE = "#fb923c";

function parseDateParam(raw?: string): string {
  if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

function getTodayStr(): string {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

/** Count consecutive days ending today that appear in workoutDates */
function computeStreak(workoutDates: string[]): number {
  const dateSet = new Set(workoutDates);
  const today   = new Date();
  const d       = new Date(today);
  let streak    = 0;
  while (true) {
    const str = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (!dateSet.has(str)) break;
    streak++;
    d.setDate(d.getDate() - 1);
  }
  return streak;
}

type WorkoutList = Awaited<ReturnType<typeof getWorkoutsByDate>>;

function computeDayStats(workouts: WorkoutList) {
  let totalSets   = 0;
  let totalVolume = 0;
  for (const w of workouts) {
    for (const we of w.workoutExercises) {
      totalSets += we.workoutSets.length;
      for (const s of we.workoutSets) {
        totalVolume += (parseFloat(s.weightKg ?? "0")) * (s.reps ?? 0);
      }
    }
  }
  return { totalSets, totalVolume };
}

function StatCard({
  value, label, color,
}: {
  value: string; label: string; color: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-4"
    >
      {/* Top colour line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: color, boxShadow: `0 0 10px ${color}` }}
      />
      <div
        className="font-display text-3xl leading-none tracking-wide"
        style={{ color }}
      >
        {value}
      </div>
      <div className="font-mono text-[10px] tracking-[0.25em] text-white/35 mt-2 uppercase">
        {label}
      </div>
    </div>
  );
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const params = await searchParams;
  const date   = parseDateParam(params.date);

  const [workouts, workoutDates] = await Promise.all([
    getWorkoutsByDate(userId, date),
    getWorkoutDates(userId),
  ]);

  const { totalSets, totalVolume } = computeDayStats(workouts);
  const streak = computeStreak(workoutDates);

  const volumeLabel =
    totalVolume >= 1000
      ? `${(totalVolume / 1000).toFixed(1)}t`
      : totalVolume > 0
        ? `${Math.round(totalVolume)} kg`
        : "—";

  return (
    <main
      className="min-h-[calc(100vh-73px)] grain"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(163,230,53,0.07) 0%, transparent 60%), oklch(0.08 0 0)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="relative z-10 mb-8 animate-rise-in" style={{ animationDelay: "0ms" }}>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: LIME, boxShadow: `0 0 10px ${LIME}cc` }}
            />
            <span className="text-xs text-zinc-400 tracking-[0.4em] uppercase font-medium">
              Training Journal
            </span>
          </div>

          <h1
            className="font-display tracking-[0.1em] mb-2 leading-none"
            style={{
              fontSize:   "clamp(3.5rem, 10vw, 7rem)",
              color:      LIME,
              textShadow: "0 0 40px rgba(163,230,53,0.25)",
            }}
          >
            DAILY LOG
          </h1>

          <p className="text-zinc-500 text-sm tracking-widest uppercase mb-0">
            Every rep recorded. Every session counts.
          </p>
        </div>

        {/* ── Stats strip ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3 mb-8 animate-rise-in" style={{ animationDelay: "80ms" }}>
          <StatCard value={volumeLabel}         label="Volume Today" color={LIME}   />
          <StatCard value={String(totalSets)}   label="Sets Today"   color={CYAN}   />
          <StatCard value={`${streak} 🔥`}      label="Day Streak"   color={ORANGE} />
        </div>

        {/* ── Separator ──────────────────────────────────────────────────── */}
        <div className="relative mb-8">
          <div
            className="h-px"
            style={{
              background:
                "linear-gradient(90deg, #a3e635 0%, #22d3ee 40%, rgba(251,146,60,0.4) 70%, transparent 100%)",
            }}
          />
          <div
            className="absolute left-0 top-0 h-px w-24 blur-sm"
            style={{ background: LIME }}
          />
        </div>

        {/* ── Date nav + log button ───────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 mb-10 relative z-10 animate-rise-in" style={{ animationDelay: "120ms" }}>
          <DateNav date={date} workoutDates={workoutDates} />
          <Link
            href={`/dashboard/log?date=${date}`}
            className={
              buttonVariants({ variant: "default" }) +
              " rounded-full tracking-[0.2em] uppercase font-display bg-gradient-to-r from-lime-400 to-teal-400 text-zinc-900 border-0 hover:from-lime-300"
            }
            style={{ boxShadow: "0 0 18px rgba(163,230,53,0.4)" }}
          >
            + LOG WORKOUT
          </Link>
        </div>

        {/* ── Workout feed ───────────────────────────────────────────────── */}
        <WorkoutFeed workouts={workouts} date={date} />

      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify dashboard stats strip**

Open http://localhost:3000/dashboard (signed in). Check:
- Three stat cards appear below the header with coloured top glowing lines
- Volume shows "—" or a value if workouts exist for today
- Streak shows current count
- Rounded corners on all cards (from Task 2 radius change)

- [ ] **Step 3: Commit**

```bash
cd /Users/amsha/Documents/my_vault/liftingdairycourse
git add src/app/dashboard/page.tsx
git commit -m "feat: add stats strip to dashboard (volume, sets, streak)"
```

---

## Task 8: Date nav — glass restyling

**Files:**
- Modify: `src/app/dashboard/date-nav.tsx`

- [ ] **Step 1: Replace `src/app/dashboard/date-nav.tsx`**

```tsx
"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Button }   from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTodayStr(): string {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

function offsetDate(dateStr: string, days: number): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, "0")}-${String(dt.getDate()).padStart(2, "0")}`;
}

function parseDateStr(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function formatDisplay(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return {
    weekday: dt.toLocaleDateString("en-US", { weekday: "long" }).toUpperCase(),
    full:    dt.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function DateNav({
  date,
  workoutDates,
}: {
  date: string;
  workoutDates: string[];
}) {
  const router  = useRouter();
  const today   = getTodayStr();
  const isToday = date === today;
  const { weekday, full } = formatDisplay(date);

  function navigate(d: string) {
    router.push(`/dashboard?date=${d}`);
  }

  function handleCalendarSelect(selected: Date | undefined) {
    if (!selected) return;
    const y = selected.getFullYear();
    const m = String(selected.getMonth() + 1).padStart(2, "0");
    const d = String(selected.getDate()).padStart(2, "0");
    navigate(`${y}-${m}-${d}`);
  }

  const selectedDate    = parseDateStr(date);
  const todayDate       = parseDateStr(today);
  const workoutDateObjs = workoutDates.map(parseDateStr);

  return (
    <div className="flex flex-wrap items-center gap-2">

      {/* ── Previous day ──────────────────────────────────────────── */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(offsetDate(date, -1))}
        aria-label="Previous day"
        className="rounded-xl border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white backdrop-blur-sm"
      >
        <ChevronLeft size={16} />
      </Button>

      {/* ── Date trigger + calendar ───────────────────────────────── */}
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              aria-label="Open calendar"
              className="h-auto px-4 py-2 gap-3 items-center text-left rounded-xl backdrop-blur-sm bg-white/[0.04] hover:bg-white/[0.08]"
              style={{
                border: `1px solid ${isToday ? "rgba(163,230,53,0.25)" : "rgba(255,255,255,0.1)"}`,
              }}
            />
          }
        >
          {/* Today indicator dot */}
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{
              backgroundColor: isToday ? "#a3e635"         : "rgba(255,255,255,0.3)",
              boxShadow:       isToday ? "0 0 8px #a3e635" : "none",
            }}
          />

          {/* Date labels */}
          <span className="flex flex-col gap-0.5">
            <span
              className="font-display tracking-[0.18em] text-lg leading-none"
              style={{ color: isToday ? "#a3e635" : "rgba(255,255,255,0.8)" }}
            >
              {weekday}
            </span>
            <span className="text-[11px] text-zinc-500 tracking-widest leading-none font-mono">
              {full}
            </span>
          </span>

          <CalendarIcon size={14} className="ml-1 text-zinc-500 shrink-0" />
        </PopoverTrigger>

        <PopoverContent align="start" className="p-0 w-auto">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleCalendarSelect}
            disabled={(d) => d > todayDate}
            defaultMonth={selectedDate}
            modifiers={{ workout: workoutDateObjs }}
            modifiersClassNames={{ workout: "day-has-workout" }}
            classNames={{
              caption_label: "font-display tracking-[0.16em] text-sm text-primary",
            }}
          />
        </PopoverContent>
      </Popover>

      {/* ── Next day ──────────────────────────────────────────────── */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => navigate(offsetDate(date, 1))}
        disabled={isToday}
        aria-label="Next day"
        className="rounded-xl border-white/10 bg-white/[0.04] hover:bg-white/[0.08] text-white/60 hover:text-white backdrop-blur-sm"
      >
        <ChevronRight size={16} />
      </Button>

      {/* ── Today shortcut ────────────────────────────────────────── */}
      {!isToday && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(today)}
          className="rounded-xl text-xs uppercase tracking-[0.2em] border-lime-400/25 text-lime-400 bg-lime-400/[0.08] hover:bg-lime-400/[0.15] hover:text-lime-300 backdrop-blur-sm"
        >
          Today
        </Button>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify**

Navigate to http://localhost:3000/dashboard. Date nav buttons should have glass styling with rounded corners. The active date should show a lime glow dot. "Today" shortcut should be lime-tinted.

- [ ] **Step 3: Commit**

```bash
cd /Users/amsha/Documents/my_vault/liftingdairycourse
git add src/app/dashboard/date-nav.tsx
git commit -m "feat: glass-style date nav buttons"
```

---

## Task 9: Workout feed — glass cards, pill badges, glow duration

**Files:**
- Modify: `src/app/dashboard/workout-feed.tsx`

- [ ] **Step 1: Replace `src/app/dashboard/workout-feed.tsx`**

```tsx
import Link                    from "next/link";
import type { getWorkoutsByDate } from "@/data/workouts";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge }          from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator }      from "@/components/ui/separator";

// ─── Types ────────────────────────────────────────────────────────────────────

type WorkoutList     = Awaited<ReturnType<typeof getWorkoutsByDate>>;
type Workout         = WorkoutList[number];
type WorkoutExercise = Workout["workoutExercises"][number];
type WorkoutSet      = WorkoutExercise["workoutSets"][number];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getTodayStr(): string {
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

function formatDuration(start: Date, end: Date): string {
  const mins = Math.round((end.getTime() - start.getTime()) / 60_000);
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h ${mins % 60}m`;
}

function formatWeight(kg: string | null): string {
  if (!kg) return "—";
  const n = parseFloat(kg);
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}

function fmtDuration(secs: number | null): string {
  if (!secs) return "—";
  if (secs < 60) return `${secs}s`;
  return `${Math.floor(secs / 60)}m${secs % 60 > 0 ? `${secs % 60}s` : ""}`;
}

const MUSCLE_STYLE: Record<string, string> = {
  chest:     "border-cyan-400/40   text-cyan-400",
  back:      "border-primary/40    text-primary",
  shoulders: "border-orange-400/40 text-orange-400",
  biceps:    "border-orange-400/40 text-orange-400",
  triceps:   "border-orange-400/40 text-orange-400",
  legs:      "border-primary/40    text-primary",
  glutes:    "border-primary/40    text-primary",
  core:      "border-cyan-400/40   text-cyan-400",
  full_body: "border-primary/40    text-primary",
  other:     "border-zinc-600/60   text-zinc-400",
};

const MUSCLE_LABEL: Record<string, string> = {
  chest: "CHEST", back: "BACK", shoulders: "SHOULDERS",
  biceps: "BICEPS", triceps: "TRICEPS", legs: "LEGS",
  glutes: "GLUTES", core: "CORE", full_body: "FULL BODY", other: "OTHER",
};

// ─── Feed ─────────────────────────────────────────────────────────────────────

export default function WorkoutFeed({
  workouts,
  date,
}: {
  workouts: WorkoutList;
  date: string;
}) {
  if (workouts.length === 0) return <EmptyState date={date} />;

  return (
    <div className="space-y-5">
      {workouts.map((workout, i) => (
        <WorkoutCard key={workout.id} workout={workout} index={i} />
      ))}

      <div className="flex justify-center pt-2">
        <Link
          href={`/dashboard/log?date=${date}`}
          className={
            buttonVariants({ variant: "outline", size: "sm" }) +
            " rounded-full tracking-[0.2em] text-xs uppercase text-primary border-primary/30 hover:bg-primary/10 hover:text-primary"
          }
        >
          + LOG ANOTHER SESSION
        </Link>
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ date }: { date: string }) {
  const isToday = date === getTodayStr();

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="font-display leading-none select-none mb-8 text-primary opacity-[0.04]"
        style={{ fontSize: "clamp(6rem, 20vw, 12rem)" }}
        aria-hidden
      >
        REST
      </div>

      <Card
        className="max-w-sm w-full border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
        style={{ borderTop: "2px solid var(--primary)" }}
      >
        <CardHeader>
          <CardTitle className="font-display tracking-[0.15em] text-2xl text-primary">
            {isToday ? "REST DAY" : "NO SESSION"}
          </CardTitle>
          <CardDescription>
            {isToday
              ? "The iron doesn't care what you felt like."
              : "No workout was recorded on this date."}
          </CardDescription>
        </CardHeader>
        {isToday && (
          <CardContent>
            <p className="text-muted-foreground/60 text-xs tracking-widest uppercase">
              Champions are made in the sessions they show up anyway.
            </p>
          </CardContent>
        )}
      </Card>
    </div>
  );
}

// ─── Workout card ─────────────────────────────────────────────────────────────

function WorkoutCard({ workout, index }: { workout: Workout; index: number }) {
  const duration = workout.endedAt
    ? formatDuration(workout.startedAt, workout.endedAt)
    : null;

  const totalSets   = workout.workoutExercises.reduce((a, we) => a + we.workoutSets.length, 0);
  const totalVolume = workout.workoutExercises.reduce((a, we) =>
    a + we.workoutSets.reduce((s, set) => {
      const w = set.weightKg ? parseFloat(set.weightKg) : 0;
      return s + w * (set.reps ?? 0);
    }, 0), 0);

  return (
    <Card
      className="animate-rise-in overflow-hidden border-white/[0.08] bg-white/[0.03] backdrop-blur-sm"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <CardHeader className="border-b border-white/[0.05] pb-4 bg-white/[0.02]">
        <CardTitle
          className="font-display leading-none tracking-[0.1em] text-foreground"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
        >
          {workout.name.toUpperCase()}
        </CardTitle>

        {workout.notes && (
          <CardDescription className="text-sm tracking-wide mt-1">
            {workout.notes}
          </CardDescription>
        )}

        <CardAction className="flex flex-col items-end gap-1.5 shrink-0">
          {duration && (
            <span
              className="font-display tracking-[0.2em] text-2xl leading-none"
              style={{ color: "#a3e635", textShadow: "0 0 20px rgba(163,230,53,0.4)" }}
            >
              {duration}
            </span>
          )}
          <span className="text-sm text-muted-foreground tracking-widest">
            {workout.workoutExercises.length} ex &middot; {totalSets} sets
          </span>
          {totalVolume > 0 && (
            <span className="text-xs font-medium tracking-widest text-cyan-400">
              {Math.round(totalVolume).toLocaleString()} KG VOL
            </span>
          )}
        </CardAction>
      </CardHeader>

      {/* ── Exercise list ───────────────────────────────────────────── */}
      <CardContent className="px-0 py-0">
        {workout.workoutExercises.map((we, i) => (
          <ExerciseRow
            key={we.id}
            workoutExercise={we}
            index={i}
            isLast={i === workout.workoutExercises.length - 1}
          />
        ))}
      </CardContent>
    </Card>
  );
}

// ─── Exercise row ─────────────────────────────────────────────────────────────

function ExerciseRow({
  workoutExercise,
  index,
  isLast,
}: {
  workoutExercise: WorkoutExercise;
  index: number;
  isLast: boolean;
}) {
  const { exercise, workoutSets } = workoutExercise;
  const muscleStyle = MUSCLE_STYLE[exercise.muscleGroup] ?? MUSCLE_STYLE.other;
  const muscleLabel = MUSCLE_LABEL[exercise.muscleGroup] ?? "OTHER";
  const hasWeights  = workoutSets.some(s => s.weightKg);
  const hasDuration = workoutSets.some(s => s.durationSeconds);
  const hasRpe      = workoutSets.some(s => s.rpe);

  const gridCols = [
    "2rem",
    hasWeights  ? "1fr" : null,
    "1fr",
    hasDuration ? "1fr" : null,
    hasRpe      ? "1fr" : null,
  ].filter(Boolean).join(" ");

  return (
    <div className={`px-6 py-5 ${!isLast ? "border-b border-white/[0.04]" : ""}`}>

      {/* Exercise name + badge */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="font-display text-lg leading-none w-8 shrink-0 text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="font-display tracking-[0.12em] leading-none text-foreground"
          style={{ fontSize: "1.1rem" }}
        >
          {exercise.name.toUpperCase()}
        </span>
        {/* Pill badge */}
        <Badge
          variant="outline"
          className={`rounded-full tracking-[0.18em] text-[10px] font-medium uppercase ${muscleStyle}`}
        >
          {muscleLabel}
        </Badge>
      </div>

      {/* Set table */}
      {workoutSets.length > 0 ? (
        <div className="ml-11 space-y-0">
          <div
            className="grid text-[10px] tracking-[0.2em] uppercase text-muted-foreground pb-2"
            style={{ gridTemplateColumns: gridCols }}
          >
            <span>#</span>
            {hasWeights  && <span className="text-right">KG</span>}
            <span className="text-right">REPS</span>
            {hasDuration && <span className="text-right">TIME</span>}
            {hasRpe      && <span className="text-right">RPE</span>}
          </div>

          <Separator />

          {workoutSets.map((set: WorkoutSet) => (
            <div
              key={set.id}
              className="grid items-center py-2 border-b border-white/[0.04] last:border-0"
              style={{ gridTemplateColumns: gridCols }}
            >
              <span className="text-sm tabular-nums text-muted-foreground">
                {set.setNumber}
              </span>
              {hasWeights && (
                <span
                  className="text-right tabular-nums font-display tracking-wide"
                  style={{ color: "#a3e635", fontSize: "1.2rem" }}
                >
                  {formatWeight(set.weightKg)}
                </span>
              )}
              <span
                className="text-right tabular-nums font-display tracking-wide text-foreground"
                style={{ fontSize: "1.2rem" }}
              >
                {set.reps ?? "—"}
              </span>
              {hasDuration && (
                <span className="text-right tabular-nums text-sm text-cyan-400">
                  {fmtDuration(set.durationSeconds)}
                </span>
              )}
              {hasRpe && (
                <span className="text-right tabular-nums text-sm text-orange-400">
                  {set.rpe ? parseFloat(set.rpe).toFixed(1) : "—"}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="ml-11 text-muted-foreground text-sm tracking-wide">No sets logged</p>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify workout cards**

Navigate to a date with workouts logged. Check:
- Cards have glass styling (semi-transparent bg, rounded corners)
- Duration shows in lime with glow
- Muscle group badges are pill-shaped with per-colour border + text
- Volume shows in cyan
- Exercise rows unchanged functionally

- [ ] **Step 3: Commit**

```bash
cd /Users/amsha/Documents/my_vault/liftingdairycourse
git add src/app/dashboard/workout-feed.tsx
git commit -m "feat: glass workout cards, pill muscle badges, glow duration"
```

---

## Done — final check

- [ ] **Full walkthrough**

1. Open http://localhost:3000 (signed out):
   - Logo C in nav ✓
   - Gradient pill auth buttons ✓
   - Hero: barbell + floating stats card ✓
   - Marquee ticker ✓
   - Glassmorphism feature cards ✓
   - Dashboard preview section ✓
   - Footer CTA with glow ✓

2. Sign in and open http://localhost:3000/dashboard:
   - Logo C in nav ✓
   - Stats strip: volume / sets / streak ✓
   - Glass date nav buttons ✓
   - Glass workout cards with lime glow duration ✓
   - Pill muscle badges ✓

3. Run `npm run build` to verify no TypeScript errors:

```bash
cd /Users/amsha/Documents/my_vault/liftingdairycourse && npm run build
```

Expected: build completes with no errors.
