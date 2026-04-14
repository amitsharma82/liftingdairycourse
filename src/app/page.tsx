"use client";

import { SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { BarbellHero }        from "@/components/barbell-hero";
import { RippleButton }       from "@/components/ripple-button";
import { useState, useEffect, useCallback } from "react";

const LIME   = "#a3e635";
const CYAN   = "#22d3ee";
const ORANGE = "#fb923c";

// ── Sample workout data ────────────────────────────────────────────────────────
const SAMPLE_WORKOUT = [
  { name: "SQUAT",          sets: "5×5",  weight: "100 KG", rpe: "8.0" },
  { name: "BENCH PRESS",    sets: "4×8",  weight: "80 KG",  rpe: "7.5" },
  { name: "OVERHEAD PRESS", sets: "3×10", weight: "55 KG",  rpe: "7.0" },
  { name: "DEADLIFT",       sets: "3×5",  weight: "120 KG", rpe: "9.0" },
];

// ── Feature cards ──────────────────────────────────────────────────────────────
const FEATURES = [
  {
    num:   "001",
    title: "LOG SESSIONS",
    body:  "Every rep. Every set. Every PR. Track weight, reps, RPE, RIR, and rest time with surgical precision.",
    color: LIME,
    label: "CAPTURE",
  },
  {
    num:   "002",
    title: "BUILD PROGRAMS",
    body:  "Design multi-week training blocks. Schedule sessions by week and day. Never miss a programmed lift.",
    color: CYAN,
    label: "STRUCTURE",
  },
  {
    num:   "003",
    title: "TRACK PROGRESS",
    body:  "Your numbers. Your history. Watch the trend line move as you consistently put in the work.",
    color: ORANGE,
    label: "ADVANCE",
  },
];

// ── Motivational quotes ────────────────────────────────────────────────────────
const DURATION_MS = 5500; // how long each quote is visible

const QUOTES = [
  {
    text:  "THE ONLY BAD WORKOUT IS THE ONE THAT DIDN'T HAPPEN.",
    attr:  "— UNKNOWN",
    color: LIME,
  },
  {
    text:  "THE IRON IS THE BEST ANTIDEPRESSANT I HAVE EVER FOUND.",
    attr:  "— HENRY ROLLINS",
    color: CYAN,
  },
  {
    text:  "CHAMPIONS ARE MADE IN THE MOMENTS THEY DON'T WANT TO TRAIN.",
    attr:  "— UNKNOWN",
    color: ORANGE,
  },
  {
    text:  "PAIN IS TEMPORARY. QUITTING LASTS FOREVER.",
    attr:  "— LANCE ARMSTRONG",
    color: LIME,
  },
  {
    text:  "IF IT DOESN'T CHALLENGE YOU, IT DOESN'T CHANGE YOU.",
    attr:  "— FRED DEVITO",
    color: CYAN,
  },
  {
    text:  "THE BODY ACHIEVES WHAT THE MIND BELIEVES.",
    attr:  "— UNKNOWN",
    color: ORANGE,
  },
  {
    text:  "YOUR ONLY COMPETITION IS WHO YOU WERE YESTERDAY.",
    attr:  "— UNKNOWN",
    color: LIME,
  },
  {
    text:  "YOU REGRET THE SESSIONS YOU SKIP. YOU NEVER REGRET THE ONES YOU DID.",
    attr:  "— UNKNOWN",
    color: CYAN,
  },
  {
    text:  "STRENGTH IS NOT GIVEN. IT IS BUILT, REP BY REP.",
    attr:  "— UNKNOWN",
    color: ORANGE,
  },
  {
    text:  "EVERY REP IS A VOTE FOR THE PERSON YOU ARE BECOMING.",
    attr:  "— JAMES CLEAR",
    color: LIME,
  },
  {
    text:  "THE GYM IS OPEN. THE QUESTION IS WHETHER YOU ARE.",
    attr:  "— UNKNOWN",
    color: CYAN,
  },
  {
    text:  "DO SOMETHING TODAY YOUR FUTURE SELF WILL THANK YOU FOR.",
    attr:  "— SEAN PATRICK FLANERY",
    color: ORANGE,
  },
];

// ── MotivationalFire component ─────────────────────────────────────────────────
function MotivationalFire() {
  const [index,   setIndex]   = useState(0);
  const [phase,   setPhase]   = useState<"entering" | "visible" | "leaving">("entering");
  const [progKey, setProgKey] = useState(0); // key reset triggers CSS animation restart

  const advance = useCallback(() => {
    setPhase("leaving");
    setTimeout(() => {
      setIndex(i => (i + 1) % QUOTES.length);
      setPhase("entering");
      setProgKey(k => k + 1);
      // after a tick, switch to "visible" so the entering animation finishes first
      setTimeout(() => setPhase("visible"), 50);
    }, 380);
  }, []);

  // Auto-advance on interval
  useEffect(() => {
    const id = setTimeout(advance, DURATION_MS);
    return () => clearTimeout(id);
  }, [index, advance]);

  const q = QUOTES[index];

  const phaseClass =
    phase === "entering" ? "quote-entering" :
    phase === "leaving"  ? "quote-leaving"  : "";

  return (
    <section
      className="relative overflow-hidden px-8 md:px-16 py-14 md:py-20"
      style={{
        borderTop:    "1px solid rgba(255,255,255,0.07)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        background:   `radial-gradient(ellipse 80% 120% at 50% 100%, ${q.color}08, transparent 70%)`,
        transition:   "background 0.8s ease",
      }}
    >
      {/* Section label */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-[0.3em]" style={{ color: q.color }}>
            DAILY FIRE
          </span>
          <div
            className="h-px"
            style={{ width: 80, background: `linear-gradient(90deg, ${q.color}, transparent)` }}
          />
        </div>

        {/* Quote counter */}
        <span className="font-mono text-[10px] tracking-widest text-white/30">
          {String(index + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(QUOTES.length).padStart(2, "0")}
        </span>
      </div>

      {/* Quote body — fixed min-height so the page doesn't reflow */}
      <div className="min-h-[14rem] md:min-h-[10rem] flex flex-col justify-center">
        <div className={phaseClass}>
          {/* Opening quotation mark */}
          <span
            className="font-display leading-none select-none block mb-2"
            style={{ fontSize: "5rem", color: q.color, lineHeight: 0.7, opacity: 0.5 }}
            aria-hidden
          >
            &#8220;
          </span>

          {/* Quote text */}
          <blockquote
            className="font-display tracking-wider leading-tight text-white"
            style={{ fontSize: "clamp(1.8rem, 4.5vw, 3.8rem)" }}
          >
            {q.text}
          </blockquote>

          {/* Attribution */}
          <p
            className="font-mono text-xs tracking-[0.25em] mt-5"
            style={{ color: `${q.color}cc` }}
          >
            {q.attr}
          </p>
        </div>
      </div>

      {/* Progress bar + next button */}
      <div className="flex items-center gap-6 mt-10">
        {/* Progress bar — resets via key change */}
        <div className="flex-1 h-[2px] bg-white/10 overflow-hidden">
          <div
            key={progKey}
            className="h-full origin-left"
            style={{
              background:       q.color,
              animation:        `progress-sweep ${DURATION_MS}ms linear both`,
              boxShadow:        `0 0 8px ${q.color}80`,
            }}
          />
        </div>

        {/* Manual next */}
        <button
          onClick={advance}
          className="font-mono text-[10px] tracking-[0.25em] uppercase flex items-center gap-2 transition-opacity cursor-pointer hover:opacity-100 opacity-50"
          style={{ color: q.color }}
        >
          NEXT <span className="text-xs">→</span>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-1.5 mt-5">
        {QUOTES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              if (i === index) return;
              setPhase("leaving");
              setTimeout(() => {
                setIndex(i);
                setPhase("entering");
                setProgKey(k => k + 1);
                setTimeout(() => setPhase("visible"), 50);
              }, 380);
            }}
            className="transition-all duration-300 cursor-pointer"
            style={{
              width:      i === index ? "20px" : "6px",
              height:     "4px",
              background: i === index ? q.color : "rgba(255,255,255,0.18)",
              boxShadow:  i === index ? `0 0 8px ${q.color}90` : "none",
            }}
            aria-label={`Quote ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ── Marquee rows ──────────────────────────────────────────────────────────────
// Content is duplicated inside the component for seamless CSS loop
const MARQUEE_TOP = [
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
const MARQUEE_BOTTOM = [
  "WEAK SPOTS BECOME STRENGTHS",
  "ADD WEIGHT. ADD REPS. REPEAT.",
  "TRAIN HEAVY. TRAIN SMART.",
  "THE HARDEST REP IS THE LAST ONE",
  "YOUR FUTURE SELF IS WATCHING",
  "ONE THOUSAND SESSIONS",
  "LOAD THE BAR",
  "NO SKIPPED SESSIONS",
  "THE BODY ADAPTS TO WHAT YOU DEMAND",
  "EARN EVERY KILO",
];

// ── Iron Code manifesto ────────────────────────────────────────────────────────
const IRON_CODE = [
  {
    num:   "I",
    color: LIME,
    head:  "THE BAR DOES NOT LIE.",
    body:  "You can't cheat physics. The weight either moves or it doesn't. Load it honestly. Lift it honestly. Own every kilo.",
  },
  {
    num:   "II",
    color: CYAN,
    head:  "ONE SESSION CHANGES NOTHING. ONE THOUSAND CHANGE EVERYTHING.",
    body:  "Motivation gets you started. Showing up on the bad days is what builds a body. Stack sessions, not excuses.",
  },
  {
    num:   "III",
    color: ORANGE,
    head:  "PROGRESSIVE OVERLOAD IS THE ONLY TRUTH.",
    body:  "Add weight. Add reps. Add time under tension. If nothing changes, nothing changes. The principle is non-negotiable.",
  },
  {
    num:   "IV",
    color: LIME,
    head:  "YOUR BODY ADAPTS TO WHAT YOU DEMAND.",
    body:  "Demand more and it gets stronger. Demand less and it shrinks. The stimulus you provide today writes the body you have tomorrow.",
  },
  {
    num:   "V",
    color: CYAN,
    head:  "THE HARDEST REP IS THE ONE AFTER YOU WANTED TO STOP.",
    body:  "That rep is where growth actually lives. Everything before it was just the warm-up.",
  },
];

// ── Stats strip ────────────────────────────────────────────────────────────────
const STATS = [
  { value: "10K+", label: "WORKOUTS LOGGED",    color: LIME   },
  { value: "200+", label: "EXERCISES IN LIBRARY", color: CYAN  },
  { value: "FREE", label: "TO START TODAY",     color: ORANGE },
];

// ── Hero CTA buttons (auth-aware) ──────────────────────────────────────────────
function CTAButtons() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <div className="mt-12 h-[52px]" />;

  if (isSignedIn) {
    return (
      <div className="mt-12">
        <RippleButton
          onClick={() => { window.location.href = "/dashboard"; }}
          className="font-mono text-sm tracking-widest px-8 py-4 bg-lime-400 text-zinc-900 font-medium uppercase"
          style={{ boxShadow: "0 0 28px rgba(163,230,53,0.5), 0 0 56px rgba(163,230,53,0.18)" }}
        >
          OPEN DIARY →
        </RippleButton>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-4 mt-12 animate-rise-in" style={{ animationDelay: "0.5s" }}>
      <SignUpButton mode="modal" afterSignUpUrl="/onboarding">
        <RippleButton
          variant="primary"
          className="font-mono text-sm tracking-widest px-8 py-4 bg-lime-400 text-zinc-900 font-medium uppercase cursor-pointer active:scale-95 transition-transform"
          style={{ boxShadow: "0 0 28px rgba(163,230,53,0.5), 0 0 56px rgba(163,230,53,0.18)" }}
        >
          START FREE →
        </RippleButton>
      </SignUpButton>

      <SignInButton mode="modal">
        <RippleButton
          variant="ghost"
          className="font-mono text-sm tracking-widest px-8 py-4 border-2 border-white/70 text-white uppercase cursor-pointer active:scale-95 transition-transform hover:bg-white hover:text-zinc-900"
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
          HERO — two-column: text left, barbell right
      ══════════════════════════════════════════════════════════════ */}
      <section className="relative flex-1 min-h-[calc(100svh-67px)] flex flex-col justify-center px-8 md:px-16 py-24 overflow-hidden grid-bg">

        {/* Coloured radial glow — adds warmth behind the headline */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 28% 55%, " +
              "rgba(163,230,53,0.06) 0%, " +
              "rgba(34,211,238,0.04) 50%, " +
              "transparent 100%)",
          }}
        />

        {/* Text content */}
        <div className="relative z-10 max-w-[600px]">

          {/* Section marker */}
          <div
            className="flex items-center gap-4 mb-10 animate-fade-in"
            style={{ animationDelay: "0.05s" }}
          >
            <span className="font-mono text-xs tracking-[0.3em] font-medium" style={{ color: LIME }}>
              01
            </span>
            <div
              className="h-px animate-slide-right"
              style={{
                width: 180,
                background: `linear-gradient(90deg, ${LIME}, transparent)`,
                animationDelay: "0.15s",
              }}
            />
          </div>

          {/* Giant headline */}
          <h1
            className="font-display leading-[0.88] tracking-wider text-white animate-rise-in"
            style={{ fontSize: "clamp(4.5rem, 14vw, 13rem)", animationDelay: "0.1s" }}
          >
            LIFTING
            <br />
            DIARY
            <span className="cursor-blink" style={{ color: LIME }}>.</span>
          </h1>

          {/* Rainbow tagline */}
          <p
            className="mt-8 font-mono text-xs md:text-sm tracking-[0.25em] uppercase animate-rise-in"
            style={{ animationDelay: "0.3s" }}
          >
            <span style={{ color: LIME }}>LOG WORKOUTS</span>
            <span className="text-white/35 mx-3">/</span>
            <span style={{ color: CYAN }}>FOLLOW PROGRAMS</span>
            <span className="text-white/35 mx-3">/</span>
            <span style={{ color: ORANGE }}>HIT PRs</span>
          </p>

          <CTAButtons />
        </div>

        {/* ── Animated barbell — right side ──────────────────────── */}
        <div
          className="hidden md:flex absolute right-0 top-0 bottom-0 items-center w-[54%] overflow-hidden pr-[2%]"
          aria-hidden
        >
          <BarbellHero className="w-full opacity-90" />
        </div>

        {/* Bottom gradient rule */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, ${LIME}, ${CYAN}, ${ORANGE})` }}
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════
          DAILY FIRE — rotating motivational quote
      ══════════════════════════════════════════════════════════════ */}
      <MotivationalFire />

      {/* ══════════════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="grid grid-cols-3 divide-x"
        style={{
          borderTop:    "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          divideColor:  "rgba(255,255,255,0.06)",
        }}
      >
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="px-8 md:px-16 py-8 flex flex-col gap-1"
            style={{
              animation:      `stat-rise 0.5s ease both`,
              animationDelay: `${0.1 + i * 0.12}s`,
              borderRight:    i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none",
            }}
          >
            <span
              className="font-display text-3xl md:text-5xl tracking-widest"
              style={{ color: s.color }}
            >
              {s.value}
            </span>
            <span className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-white/40 uppercase">
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════
          MARQUEE TICKER — scrolling motivational phrases
      ══════════════════════════════════════════════════════════════ */}
      <div
        className="overflow-hidden py-4 flex flex-col gap-3"
        style={{
          background:   "rgba(255,255,255,0.018)",
          borderTop:    "1px solid rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Row 1 — scrolls left */}
        <div className="overflow-hidden">
          <div className="marquee-track-left">
            {[...MARQUEE_TOP, ...MARQUEE_TOP].map((phrase, i) => (
              <span key={i} className="inline-flex items-center gap-0 shrink-0">
                <span
                  className="font-display text-xl tracking-[0.18em] whitespace-nowrap px-8"
                  style={{ color: i % 3 === 0 ? LIME : i % 3 === 1 ? CYAN : ORANGE }}
                >
                  {phrase}
                </span>
                <span className="text-white/20 font-mono text-sm">⟡</span>
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — scrolls right, slightly slower */}
        <div className="overflow-hidden">
          <div className="marquee-track-right">
            {[...MARQUEE_BOTTOM, ...MARQUEE_BOTTOM].map((phrase, i) => (
              <span key={i} className="inline-flex items-center gap-0 shrink-0">
                <span
                  className="font-display text-xl tracking-[0.18em] whitespace-nowrap px-8 opacity-70"
                  style={{ color: i % 3 === 0 ? ORANGE : i % 3 === 1 ? LIME : CYAN }}
                >
                  {phrase}
                </span>
                <span className="text-white/15 font-mono text-sm">◆</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          FEATURES — 3 colour-coded cards
      ══════════════════════════════════════════════════════════════ */}
      <section className="px-8 md:px-16 py-20 md:py-28">

        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-xs tracking-[0.3em]" style={{ color: CYAN }}>02</span>
          <div className="h-px" style={{ width: 180, background: `linear-gradient(90deg, ${CYAN}, transparent)` }} />
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-white/40">WHAT IT DOES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
          {FEATURES.map((f) => (
            <div
              key={f.num}
              className="bg-background p-10 flex flex-col gap-5 group hover:bg-white/[0.025] transition-colors relative overflow-hidden"
            >
              {/* Coloured top bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: f.color }} />

              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest font-medium" style={{ color: f.color }}>
                  {f.num}
                </span>
                <span
                  className="font-mono text-[10px] tracking-[0.2em] px-2 py-0.5 border"
                  style={{ color: f.color, borderColor: `${f.color}40` }}
                >
                  {f.label}
                </span>
              </div>

              <h3 className="font-display text-3xl md:text-4xl tracking-widest text-white">
                {f.title}
              </h3>

              <p className="font-mono text-sm leading-7 text-white/50">{f.body}</p>

              {/* Expand-on-hover coloured underline */}
              <div
                className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
                style={{ background: f.color }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          IRON CODE — motivational manifesto
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="px-8 md:px-16 py-20 md:py-28 relative overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        {/* Background: subtle diagonal stripe texture */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(" +
              "135deg, " +
              "rgba(255,255,255,0.012) 0px, " +
              "rgba(255,255,255,0.012) 1px, " +
              "transparent 1px, " +
              "transparent 40px" +
              ")",
          }}
        />

        <div className="relative z-10 max-w-4xl">

          {/* Section header */}
          <div className="flex items-center gap-4 mb-4">
            <span className="font-mono text-xs tracking-[0.3em]" style={{ color: LIME }}>05</span>
            <div className="h-px" style={{ width: 180, background: `linear-gradient(90deg, ${LIME}, transparent)` }} />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-white/40">THE IRON CODE</span>
          </div>

          {/* Big heading */}
          <h2
            className="font-display leading-none tracking-widest mb-16"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)", color: "rgba(255,255,255,0.92)" }}
          >
            LIFT BY<br />
            <span style={{ color: LIME }}>THESE</span>{" "}
            <span style={{ color: CYAN }}>LAWS.</span>
          </h2>

          {/* Declarations */}
          <div className="flex flex-col">
            {IRON_CODE.map((item, i) => (
              <div
                key={item.num}
                className="group grid grid-cols-[auto_1fr] gap-8 md:gap-16 py-10 border-t border-white/[0.07] hover:border-white/20 transition-colors duration-300"
                style={{
                  animation:      "declaration-in 0.5s ease both",
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                {/* Roman numeral */}
                <div className="flex flex-col items-start gap-1 pt-1 min-w-[3rem]">
                  <span
                    className="font-display text-4xl md:text-5xl leading-none tracking-widest"
                    style={{ color: item.color }}
                  >
                    {item.num}
                  </span>
                  {/* Animated accent bar under numeral */}
                  <div
                    className="h-[2px] w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: item.color }}
                  />
                </div>

                {/* Declaration text */}
                <div className="flex flex-col gap-3">
                  <h3
                    className="font-display text-2xl md:text-3xl tracking-widest leading-tight text-white"
                  >
                    {item.head}
                  </h3>
                  <p className="font-mono text-sm leading-7 text-white/50 max-w-xl">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}

            {/* Final border */}
            <div className="border-t border-white/[0.07]" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SAMPLE WORKOUT LOG
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="px-8 md:px-16 py-20 md:py-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex items-center gap-4 mb-14">
          <span className="font-mono text-xs tracking-[0.3em]" style={{ color: ORANGE }}>03</span>
          <div className="h-px" style={{ width: 180, background: `linear-gradient(90deg, ${ORANGE}, transparent)` }} />
          <span className="font-mono text-xs tracking-[0.25em] uppercase text-white/40">SAMPLE LOG</span>
        </div>

        <div className="max-w-3xl">
          <div className="flex flex-wrap justify-between items-baseline gap-4 mb-8">
            <h2 className="font-display text-4xl md:text-5xl tracking-widest text-white">PUSH DAY A</h2>
            <div className="flex gap-6 font-mono text-xs text-white/40 tracking-widest">
              <span>2026-04-14</span>
              <span>58 MIN</span>
            </div>
          </div>

          <div style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            {/* Header row */}
            <div
              className="hidden sm:grid grid-cols-[1fr_80px_96px_64px] gap-4 px-6 py-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
            >
              <span className="font-mono text-xs tracking-[0.2em] text-white/40 uppercase">EXERCISE</span>
              <span className="font-mono text-xs tracking-[0.2em] text-right uppercase" style={{ color: `${LIME}99` }}>SETS</span>
              <span className="font-mono text-xs tracking-[0.2em] text-right uppercase" style={{ color: `${LIME}99` }}>WEIGHT</span>
              <span className="font-mono text-xs tracking-[0.2em] text-right uppercase" style={{ color: `${ORANGE}99` }}>RPE</span>
            </div>

            {SAMPLE_WORKOUT.map((ex, i) => (
              <div
                key={ex.name}
                className="grid grid-cols-1 sm:grid-cols-[1fr_80px_96px_64px] gap-2 sm:gap-4 px-6 py-5 hover:bg-white/[0.025] transition-colors"
                style={{ borderBottom: i < SAMPLE_WORKOUT.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none" }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs tabular-nums" style={{ color: CYAN }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-sm tracking-wide text-white">{ex.name}</span>
                </div>
                <div className="flex sm:justify-end items-center gap-2">
                  <span className="sm:hidden font-mono text-xs text-white/40">SETS</span>
                  <span className="font-mono text-sm tabular-nums text-white/70">{ex.sets}</span>
                </div>
                <div className="flex sm:justify-end items-center gap-2">
                  <span className="sm:hidden font-mono text-xs text-white/40">WEIGHT</span>
                  <span className="font-mono text-sm tabular-nums font-medium" style={{ color: LIME }}>{ex.weight}</span>
                </div>
                <div className="flex sm:justify-end items-center gap-2">
                  <span className="sm:hidden font-mono text-xs text-white/40">RPE</span>
                  <span className="font-mono text-sm tabular-nums" style={{ color: ORANGE }}>{ex.rpe}</span>
                </div>
              </div>
            ))}

            <div
              className="px-6 py-3 flex justify-between items-center"
              style={{ borderTop: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
            >
              <span className="font-mono text-xs text-white/40 tracking-widest">4 EXERCISES · 15 SETS TOTAL</span>
              <span className="font-mono text-xs tracking-widest font-medium" style={{ color: LIME }}>COMPLETED ✓</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER CTA
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="relative px-8 md:px-16 py-20 md:py-28 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 bg-zinc-900/60"
      >
        {/* Top gradient rule */}
        <div
          aria-hidden
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg, ${LIME}, ${CYAN}, ${ORANGE})` }}
        />

        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="font-mono text-xs tracking-[0.3em]" style={{ color: LIME }}>04</span>
            <div className="h-px" style={{ width: 120, background: `linear-gradient(90deg, ${LIME}, transparent)` }} />
          </div>
          <h2
            className="font-display leading-none tracking-widest text-white mb-4"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}
          >
            READY TO LIFT?
          </h2>
          <p className="font-mono text-sm text-white/50 tracking-[0.25em] uppercase">
            START LOGGING. STOP GUESSING.
          </p>
        </div>

        {/* Glowing ripple mega-button */}
        <SignUpButton mode="modal" afterSignUpUrl="/onboarding">
          <RippleButton
            variant="primary"
            className="font-mono text-sm tracking-widest px-12 py-6 bg-lime-400 text-zinc-900 font-medium uppercase whitespace-nowrap cursor-pointer active:scale-95 transition-transform hover:bg-lime-300"
            style={{
              boxShadow:
                "0 0 32px rgba(163,230,53,0.6), 0 0 64px rgba(163,230,53,0.25), 0 0 96px rgba(163,230,53,0.1)",
            }}
          >
            CREATE FREE ACCOUNT →
          </RippleButton>
        </SignUpButton>
      </section>

    </div>
  );
}
