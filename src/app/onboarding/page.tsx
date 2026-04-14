"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { LogoMark } from "@/components/logo";

// ── Palette ─────────────────────────────────────────────────────────────────
const LIME   = "#a3e635";
const CYAN   = "#22d3ee";
const ORANGE = "#fb923c";
const PINK   = "#f472b6"; // rose-400

// ── Types ────────────────────────────────────────────────────────────────────
type Sex      = "MALE" | "FEMALE" | "OTHER";
type Level    = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "ELITE";
type Goal     = "STRENGTH" | "SIZE" | "ENDURANCE" | "FAT_LOSS";
type Units    = "KG" | "LBS";

interface Profile {
  sex:       Sex | null;
  age:       number;
  level:     Level | null;
  goal:      Goal | null;
  frequency: number;
  units:     Units;
}

// ── Step meta ────────────────────────────────────────────────────────────────
const STEPS = [
  {
    id:       1,
    question: "WHO ARE YOU?",
    sub:      "Let's start with the basics.",
    accent:   LIME,
  },
  {
    id:       2,
    question: "HOW OLD ARE YOU?",
    sub:      "Your age helps us calibrate load progressions.",
    accent:   CYAN,
  },
  {
    id:       3,
    question: "WHAT'S YOUR LEVEL?",
    sub:      "Be honest — it only helps you.",
    accent:   CYAN,
  },
  {
    id:       4,
    question: "MAIN GOAL?",
    sub:      "Pick one north star. You can update this anytime.",
    accent:   ORANGE,
  },
  {
    id:       5,
    question: "HOW OFTEN DO YOU TRAIN?",
    sub:      "Average sessions per week.",
    accent:   ORANGE,
  },
  {
    id:       6,
    question: "KG OR LBS?",
    sub:      "Choose your unit of pain.",
    accent:   LIME,
  },
];

// ── SelectCard ───────────────────────────────────────────────────────────────
function SelectCard({
  selected,
  accent,
  onClick,
  children,
  className = "",
}: {
  selected: boolean;
  accent: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-left border-2 transition-all duration-200 cursor-pointer ${className}`}
      style={{
        borderColor:   selected ? accent : "rgba(255,255,255,0.12)",
        background:    selected ? `${accent}18` : "rgba(255,255,255,0.02)",
        boxShadow:     selected ? `0 0 28px ${accent}45, inset 0 0 20px ${accent}08` : "none",
        color:         selected ? accent : "rgba(255,255,255,0.7)",
      }}
    >
      {children}
    </button>
  );
}

// ── Stepper ──────────────────────────────────────────────────────────────────
function BigStepper({
  value,
  min,
  max,
  accent,
  suffix = "",
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  accent: string;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center gap-8">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        className="w-16 h-16 border-2 font-display text-4xl text-white/60 disabled:opacity-20 cursor-pointer transition-all"
        style={{ borderColor: "rgba(255,255,255,0.15)" }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = accent)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
      >
        −
      </button>

      <div className="text-center min-w-[12rem]">
        <span
          className="font-display tabular-nums leading-none"
          style={{ fontSize: "clamp(6rem, 14vw, 10rem)", color: accent }}
        >
          {value}
        </span>
        {suffix && (
          <span className="font-mono text-xs tracking-[0.3em] text-white/40 block mt-1">
            {suffix}
          </span>
        )}
      </div>

      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="w-16 h-16 border-2 font-display text-4xl text-white/60 disabled:opacity-20 cursor-pointer transition-all"
        style={{ borderColor: "rgba(255,255,255,0.15)" }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = accent)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)")}
      >
        +
      </button>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function OnboardingPage() {
  const router  = useRouter();
  const { isSignedIn, isLoaded } = useAuth();

  const [step, setStep]     = useState(1);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    sex:       null,
    age:       25,
    level:     null,
    goal:      null,
    frequency: 4,
    units:     "KG",
  });

  // Redirect unauthenticated visitors back to home
  useEffect(() => {
    if (isLoaded && !isSignedIn) router.replace("/");
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="font-mono text-xs text-white/30 tracking-widest animate-pulse">
          LOADING…
        </div>
      </div>
    );
  }

  const current = STEPS[step - 1];
  const accent  = current.accent;
  const total   = STEPS.length;

  const canAdvance = (): boolean => {
    switch (step) {
      case 1: return profile.sex !== null;
      case 2: return profile.age >= 13 && profile.age <= 99;
      case 3: return profile.level !== null;
      case 4: return profile.goal !== null;
      case 5: return profile.frequency >= 1;
      case 6: return true;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (step < total) {
      setStep(s => s + 1);
    } else {
      setSaving(true);
      // TODO: persist `profile` via server action / API route
      // For now we store in localStorage as a placeholder
      if (typeof window !== "undefined") {
        localStorage.setItem("ld_profile", JSON.stringify(profile));
      }
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden grain">

      {/* ── Top bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-8 md:px-16 pt-8 pb-0">
        <div className="flex items-center gap-3">
          <LogoMark size={32} color={accent} />
          <span className="font-display text-lg tracking-[0.2em] text-white/60">LIFTING DIARY</span>
        </div>
        <span className="font-mono text-xs tracking-[0.25em] text-white/30">
          {String(step).padStart(2, "0")}&nbsp;/&nbsp;{String(total).padStart(2, "0")}
        </span>
      </div>

      {/* ── Progress bar ────────────────────────────────────────────── */}
      <div className="mx-8 md:mx-16 mt-6 h-[3px] bg-white/[0.06] overflow-hidden">
        <div
          className="h-full transition-all duration-500 ease-out"
          style={{
            width: `${(step / total) * 100}%`,
            background: `linear-gradient(90deg, ${LIME}, ${CYAN}, ${ORANGE})`,
          }}
        />
      </div>

      {/* ── Main content ────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-16 py-12">
        <div className="max-w-2xl mx-auto w-full">

          {/* Question */}
          <div className="mb-10">
            <h1
              className="font-display leading-none tracking-widest text-white animate-rise-in"
              style={{ fontSize: "clamp(3.2rem, 9vw, 7rem)", animationDuration: "0.4s" }}
            >
              {current.question}
            </h1>
            <p className="font-mono text-sm tracking-[0.2em] mt-3" style={{ color: `${accent}99` }}>
              {current.sub}
            </p>
          </div>

          {/* ── Step 1: Sex ───────────────────────────────────────── */}
          {step === 1 && (
            <div className="grid grid-cols-3 gap-3">
              {(["MALE", "FEMALE", "OTHER"] as Sex[]).map((s) => (
                <SelectCard
                  key={s}
                  selected={profile.sex === s}
                  accent={accent}
                  onClick={() => setProfile(p => ({ ...p, sex: s }))}
                  className="py-10 flex flex-col items-center gap-4"
                >
                  <span className="text-4xl leading-none select-none">
                    {s === "MALE" ? "♂" : s === "FEMALE" ? "♀" : "⚧"}
                  </span>
                  <span className="font-display text-2xl tracking-widest">{s}</span>
                </SelectCard>
              ))}
            </div>
          )}

          {/* ── Step 2: Age ───────────────────────────────────────── */}
          {step === 2 && (
            <BigStepper
              value={profile.age}
              min={13}
              max={99}
              accent={accent}
              suffix="YEARS OLD"
              onChange={age => setProfile(p => ({ ...p, age }))}
            />
          )}

          {/* ── Step 3: Level ─────────────────────────────────────── */}
          {step === 3 && (
            <div className="grid grid-cols-1 gap-3">
              {(
                [
                  { v: "BEGINNER"     as Level, desc: "Under 1 year of consistent structured training." },
                  { v: "INTERMEDIATE" as Level, desc: "1–3 years. You know the lifts, you hit real plateaus." },
                  { v: "ADVANCED"     as Level, desc: "3–6 years. Progress is measured in months." },
                  { v: "ELITE"        as Level, desc: "6+ years. Competing or within striking distance." },
                ]
              ).map(({ v, desc }) => (
                <SelectCard
                  key={v}
                  selected={profile.level === v}
                  accent={accent}
                  onClick={() => setProfile(p => ({ ...p, level: v }))}
                  className="px-8 py-5 flex items-center gap-6"
                >
                  <span className="font-display text-2xl tracking-widest w-40 shrink-0">{v}</span>
                  <span
                    className="font-mono text-xs leading-6"
                    style={{ color: profile.level === v ? `${accent}bb` : "rgba(255,255,255,0.35)" }}
                  >
                    {desc}
                  </span>
                </SelectCard>
              ))}
            </div>
          )}

          {/* ── Step 4: Goal ──────────────────────────────────────── */}
          {step === 4 && (
            <div className="grid grid-cols-2 gap-3">
              {(
                [
                  { v: "STRENGTH"  as Goal, icon: "🏋️", label: "STRENGTH",  desc: "1RMs. Powerlifting. Moving heavy things." },
                  { v: "SIZE"      as Goal, icon: "💪", label: "SIZE",       desc: "Hypertrophy. Building as much muscle as possible." },
                  { v: "ENDURANCE" as Goal, icon: "⚡", label: "ENDURANCE",  desc: "Conditioning. Work capacity. Outlasting everyone." },
                  { v: "FAT_LOSS"  as Goal, icon: "🔥", label: "FAT LOSS",   desc: "Recomposition. Eating at a deficit, keeping muscle." },
                ]
              ).map(({ v, icon, label, desc }) => (
                <SelectCard
                  key={v}
                  selected={profile.goal === v}
                  accent={ORANGE}
                  onClick={() => setProfile(p => ({ ...p, goal: v }))}
                  className="p-7 flex flex-col gap-3"
                >
                  <span className="text-3xl leading-none select-none">{icon}</span>
                  <span className="font-display text-2xl tracking-widest">{label}</span>
                  <span
                    className="font-mono text-xs leading-6"
                    style={{ color: profile.goal === v ? `${ORANGE}bb` : "rgba(255,255,255,0.35)" }}
                  >
                    {desc}
                  </span>
                </SelectCard>
              ))}
            </div>
          )}

          {/* ── Step 5: Frequency ─────────────────────────────────── */}
          {step === 5 && (
            <div className="flex flex-col gap-10">
              <BigStepper
                value={profile.frequency}
                min={1}
                max={7}
                accent={accent}
                suffix="DAYS / WEEK"
                onChange={frequency => setProfile(p => ({ ...p, frequency }))}
              />

              {/* Visual day-of-week bar */}
              <div className="flex gap-2">
                {Array.from({ length: 7 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setProfile(p => ({ ...p, frequency: i + 1 }))}
                    className="flex-1 flex flex-col items-center gap-2 py-3 cursor-pointer group"
                  >
                    <div
                      className="w-full h-1.5 transition-all duration-200"
                      style={{
                        background: i < profile.frequency ? accent : "rgba(255,255,255,0.1)",
                        boxShadow:  i < profile.frequency ? `0 0 8px ${accent}80` : "none",
                      }}
                    />
                    <span
                      className="font-mono text-[10px] tracking-widest transition-colors"
                      style={{ color: i < profile.frequency ? `${accent}cc` : "rgba(255,255,255,0.25)" }}
                    >
                      {["M", "T", "W", "T", "F", "S", "S"][i]}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── Step 6: Units ─────────────────────────────────────── */}
          {step === 6 && (
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  { v: "KG"  as Units, flag: "🌍", sub: "Kilograms — the international standard" },
                  { v: "LBS" as Units, flag: "🦅", sub: "Pounds — for the iron faithful" },
                ]
              ).map(({ v, flag, sub }) => (
                <SelectCard
                  key={v}
                  selected={profile.units === v}
                  accent={LIME}
                  onClick={() => setProfile(p => ({ ...p, units: v }))}
                  className="py-14 flex flex-col items-center gap-4"
                >
                  <span className="text-4xl select-none">{flag}</span>
                  <span className="font-display text-5xl tracking-widest">{v}</span>
                  <span
                    className="font-mono text-xs text-center px-4"
                    style={{ color: profile.units === v ? `${LIME}bb` : "rgba(255,255,255,0.3)" }}
                  >
                    {sub}
                  </span>
                </SelectCard>
              ))}
            </div>
          )}

          {/* ── Navigation ──────────────────────────────────────────── */}
          <div className="flex items-center justify-between mt-12">

            {/* Back */}
            {step > 1 ? (
              <button
                onClick={() => setStep(s => s - 1)}
                className="font-mono text-xs tracking-widest text-white/30 hover:text-white/70 transition-colors cursor-pointer"
              >
                ← BACK
              </button>
            ) : (
              <div />
            )}

            {/* Continue / Finish */}
            <button
              onClick={handleNext}
              disabled={!canAdvance() || saving}
              className="font-mono text-sm tracking-widest px-10 py-4 transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
              style={
                canAdvance() && !saving
                  ? {
                      background:  accent,
                      color:       "#111",
                      border:      "none",
                      boxShadow:   `0 0 28px ${accent}55, 0 0 56px ${accent}20`,
                      fontWeight:  500,
                    }
                  : {
                      background:  "transparent",
                      color:       "rgba(255,255,255,0.2)",
                      border:      "2px solid rgba(255,255,255,0.1)",
                      boxShadow:   "none",
                    }
              }
            >
              {saving
                ? "SAVING…"
                : step === total
                ? "ENTER THE DIARY →"
                : "CONTINUE →"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Bottom step dots ────────────────────────────────────────── */}
      <div className="flex justify-center gap-2 pb-8">
        {STEPS.map((s) => (
          <div
            key={s.id}
            className="transition-all duration-300"
            style={{
              width:      step === s.id ? "24px" : "6px",
              height:     "6px",
              background: step >= s.id ? accent : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>

    </div>
  );
}
