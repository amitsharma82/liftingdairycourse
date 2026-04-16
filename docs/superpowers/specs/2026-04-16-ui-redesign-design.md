# UI Redesign — Neon Glow — Design Spec

**Date:** 2026-04-16  
**Scope:** Landing page (`src/app/page.tsx`) + Dashboard (`src/app/dashboard/`)  
**Status:** Approved by user

---

## 1. Design Direction

**Style:** Neon Glow App — glassmorphism cards, glowing radial gradients, rounded corners, premium fitness-app feel.

**Palette (unchanged):** Lime `#a3e635` · Cyan `#22d3ee` · Orange `#fb923c` · Background near-black `oklch(0.07 0 0)`

**Key visual shifts from current design:**
- Border radius changes from `0rem` to `0.75rem–1.25rem` throughout (`--radius` CSS variable updated in `globals.css`)
- Cards use rgba fill + `backdrop-filter: blur` + subtle border + colour-matched glow shadow
- Primary button becomes a lime→teal gradient pill with glow box-shadow
- Secondary/ghost button becomes frosted glass (rgba bg + blur + border)
- Typography stays monospace/display — no font changes

---

## 2. Logo

**Concept:** "Barbell through LD" — A barbell bar cuts horizontally through the letters **L** and **D**, with lime (#a3e635) glowing plates on each end.

**Implementation:** Replace the SVG inside `src/components/logo.tsx` (file already exists, exports `<LogoMark>`). `layout.tsx` already imports and renders `<LogoMark size={44} color="#a3e635" animated />` alongside the "LIFTING DIARY" wordmark — no import changes needed.

- The new `LogoMark` SVG replaces the current two-circular-plates design with the barbell-through-LD mark
- Keep the same props interface: `size`, `color`, `animated`, `className`
- `animated` prop continues to apply the `logo-mark` CSS class (logo-pulse glow keyframe in globals.css)
- The icon-only mark also serves as the favicon — create `public/favicon.svg` using the same SVG paths

---

## 3. Landing Page

### 3a. Sections (top → bottom)

| # | Section | Status vs current |
|---|---------|-------------------|
| 1 | Nav | Restyled — logo added, gradient pill CTA |
| 2 | Gradient colour bar (lime→cyan→orange, 2px) | Keep |
| 3 | Hero | Restyled — barbell stays, floating stats card added |
| 4 | Marquee ticker | Keep (1 row, coloured phrases) |
| 5 | 3 Feature cards | Restyled — glassmorphism |
| 6 | Dashboard preview section | **New** (replaces Iron Code manifesto + rotating quotes) |
| 7 | Footer CTA | Restyled — gradient pill button, radial glow bg |

**Removed sections:** Iron Code manifesto, rotating motivational quotes (MotivationalFire), stats strip (10K+/200+/FREE), second marquee row.

### 3b. Hero

- **Left column:** eyebrow label · giant "LIFTING DIARY." headline (DIARY in lime) · mono tagline · two CTA buttons
- **Right column:** existing `<BarbellHero />` SVG (unchanged code, same animations) with a neon radial glow behind it · a small frosted-glass floating card below the barbell showing three stats: Duration / Sets / Volume (static sample data — same as current SAMPLE_WORKOUT)
- **Background:** two radial gradients (lime at 25% left, cyan at 80% right) — no grid-bg class

### 3c. Feature Cards

Three cards in a `grid-cols-3` layout. Each card:
- `background: rgba(255,255,255,0.03)`, `border: 1px solid rgba(255,255,255,0.07)`, `border-radius: 1rem`
- Top edge: 1px gradient line `transparent → accent → transparent`
- Top-centre: blurred radial circle in accent colour (decorative glow)
- Content: number label (001/002/003) · exercise name in accent colour · description in muted mono
- No hover expand-underline (replaced by border-color hover transition)

### 3d. Dashboard Preview Section

- Section eyebrow: "SEE IT IN ACTION" in cyan
- Heading: `Your diary. Built for athletes.` (athletes in cyan)
- A large frosted-glass card styled to match the dashboard page aesthetic showing:
  - "DAILY LOG" title + date subtitle
  - Stats row: Volume / Sets / Streak (same static sample data)
  - One workout card row (PUSH DAY A · 4 exercises · 15 sets · 58 min · 4,200 KG)
- Background: subtle cyan radial glow
- This is purely static/decorative — no live data

### 3e. Footer CTA

- Left: eyebrow + large "Load the bar." headline (bar in lime)
- Right: gradient pill button "CREATE FREE ACCOUNT →" with strong lime glow shadow
- Background: lime radial glow from bottom

---

## 4. Dashboard Page

### 4a. Layout (unchanged structure, restyled)

```
Nav (shared layout)
Colour bar
┌─────────────────────────────────────┐
│ • Training Journal                  │  ← eyebrow with glowing dot
│ DAILY LOG                           │  ← lime, glowing text-shadow
│ Every rep recorded...               │  ← muted subtitle
├─────────────────────────────────────┤
│ [Vol today] [Sets today] [Streak🔥] │  ← NEW stats strip
├─────────────────────────────────────┤
│ ‹  WEDNESDAY / Apr 16  ›  + LOG     │  ← date nav (restyled)
├─────────────────────────────────────┤
│ Workout card(s)                     │
└─────────────────────────────────────┘
```

### 4b. Stats Strip (new)

Three glass cards in `grid-cols-3`, each with a 2px coloured top border + glow:
- **Volume today** (lime) — sum of `weightKg × reps` across all today's workouts, formatted as kg
- **Sets today** (cyan) — total set count across today's workouts
- **Day streak** (orange) — count of consecutive days with at least one workout, computed from `workoutDates`

Data source: computed from props already passed to `WorkoutFeed` and the `workoutDates` array already fetched in `DashboardPage`. No new database queries needed. All three stats are computed in `DashboardPage` server component and passed as props to a new `<StatsStrip>` client or server component:
- **Volume**: `workouts.flatMap(w => w.workoutExercises.flatMap(e => e.workoutSets)).reduce((sum, s) => sum + (parseFloat(s.weightKg ?? '0') * (s.reps ?? 0)), 0)`
- **Sets**: `workouts.flatMap(w => w.workoutExercises).reduce((sum, we) => sum + we.workoutSets.length, 0)`
- **Streak**: Starting from today's date string, count how many consecutive days (going backwards) exist in `workoutDates`. Always based on today — not the selected date.

### 4c. Date Nav (restyled only)

- Prev/next chevron buttons: glass style (rgba bg, border, rounded)
- Date display pill: lime border, glowing dot indicator for today, weekday in lime
- "Today" shortcut button: same glass style
- "+ LOG WORKOUT" `<Link>` button: gradient pill, lime glow — rendered adjacent to DateNav in the same flex row (already the case in `dashboard/page.tsx`; restyled only, no structural move)

### 4d. Workout Cards (restyled only)

- Card: `background: rgba(255,255,255,0.03)`, rounded-2xl, no top border stripe (removed)
- Card header bg: `rgba(255,255,255,0.02)`, bottom border subtle
- Duration number: lime colour with `text-shadow` glow
- Volume: cyan colour
- Exercise rows: unchanged structure, restyled
- Muscle group badges: pill shape (`border-radius: 9999px`) with per-colour border + text
- Set table rows: unchanged

### 4e. Empty State (restyled only)

- "REST" watermark stays, same opacity treatment
- Card uses same glassmorphism style as workout cards

---

## 5. Shared / Global Changes

### globals.css

| Change | Current | New |
|--------|---------|-----|
| `--radius` | `0rem` | `0.75rem` |
| No new colour variables needed | — | — |
| Keep all existing keyframes | — | keep |
| Keep `.grain`, `.grid-bg`, marquee, glow helpers | — | keep |

### layout.tsx / Nav

- Add `<Logo />` component to nav (replaces text span)
- Nav background: `rgba(7,7,15,0.97)` + `backdrop-filter: blur(12px)` + `border-bottom`
- Gradient colour bar (2px, lime→cyan→orange) below nav — already exists, keep

### header-auth.tsx

- "SIGN IN" link: glass pill style (border, rgba bg, rounded)
- "START FREE" link: gradient pill (lime→teal) with glow shadow
- Both become `border-radius` pill shape

---

## 6. Constraints

- All interactive elements must use **shadcn/ui** components (`Button`, `Popover`, `Calendar`, `Card`, `Badge`, `Separator`) — layout wrappers and Tailwind classes applied on top
- Tailwind v4 theming only — no new `tailwind.config.js`. Token changes go in `globals.css` `@theme` block
- No new database queries — stats strip uses data already fetched
- Clerk auth components (`SignInButton`, `SignUpButton`, `UserButton`) remain unchanged in behaviour
- Existing animations (`barbell-float`, `plate-pulse-*`, `speed-line`, `marquee-*`, `rise-in`, `fade-in`) all kept
- Motion library already installed — use for entrance animations on stats strip cards (staggered `initial/animate` on mount)

---

## 7. Files to Create / Modify

| File | Action |
|------|--------|
| `src/components/logo.tsx` | **Modify** — replace SVG with barbell-through-LD design, keep props interface |
| `src/app/globals.css` | **Modify** — `--radius: 0.75rem`, any new utility classes |
| `src/app/layout.tsx` | **Modify** — add `<Logo />` to nav |
| `src/components/header-auth.tsx` | **Modify** — restyle auth buttons |
| `src/app/page.tsx` | **Modify** — full landing page redesign |
| `src/app/dashboard/page.tsx` | **Modify** — add stats strip, restyle header |
| `src/app/dashboard/workout-feed.tsx` | **Modify** — restyle cards, badges, empty state |
| `src/app/dashboard/date-nav.tsx` | **Modify** — restyle buttons and date display |
| `public/favicon.svg` | **Create** — SVG favicon using logo icon mark |
