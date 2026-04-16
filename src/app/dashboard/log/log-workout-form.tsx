"use client";

import { motion }               from "motion/react";
import { useState, useTransition } from "react";
import { useRouter }               from "next/navigation";
import { Button }    from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Shuffle, Flame, Leaf, Info, Clock, AlertTriangle, Search, Plus, X, SlidersHorizontal } from "lucide-react";
import ExerciseBlock  from "./exercise-block";
import { type SetData, emptySet } from "./set-row";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Input }    from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label }    from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { logWorkout } from "@/actions/workouts";
import type { getAllExercises } from "@/data/exercises";
import type { LastSession }    from "@/data/exercises";
import { SESSION_ROUTINES, type RoutineExercise } from "@/lib/session-routines";

type Exercise = Awaited<ReturnType<typeof getAllExercises>>[number];
type SessionType = "push" | "pull" | "legs" | "custom";

type SelectedExercise = {
  exercise: Exercise;
  sets:     SetData[];
};

// ─── Session config ───────────────────────────────────────────────────────────

const SESSION_CONFIG: Record<
  SessionType,
  { label: string; name: string; subtitle: string; muscles: string[]; accent: string; accentBg: string; accentBorder: string }
> = {
  push: {
    label:       "PUSH",
    name:        "Push Day",
    subtitle:    "CHEST · SHOULDERS · TRICEPS",
    muscles:     ["chest", "shoulders", "triceps"],
    accent:      "#22d3ee",
    accentBg:    "rgba(34,211,238,0.06)",
    accentBorder:"rgba(34,211,238,0.3)",
  },
  pull: {
    label:       "PULL",
    name:        "Pull Day",
    subtitle:    "BACK · BICEPS",
    muscles:     ["back", "biceps"],
    accent:      "#a3e635",
    accentBg:    "rgba(163,230,53,0.06)",
    accentBorder:"rgba(163,230,53,0.3)",
  },
  legs: {
    label:       "LEGS",
    name:        "Leg Day",
    subtitle:    "QUADS · HAMSTRINGS · GLUTES",
    muscles:     ["legs", "glutes"],
    accent:      "#fb923c",
    accentBg:    "rgba(251,146,60,0.06)",
    accentBorder:"rgba(251,146,60,0.3)",
  },
  custom: {
    label:       "CUSTOM",
    name:        "Custom Session",
    subtitle:    "YOUR CHOICE OF EXERCISES",
    muscles:     [],
    accent:      "#c084fc",
    accentBg:    "rgba(192,132,252,0.06)",
    accentBorder:"rgba(192,132,252,0.3)",
  },
};

// ─── Combined warm-up / cool-down pools (all session types, deduplicated) ─────

const ALL_WARMUPS: RoutineExercise[] = Object.values(SESSION_ROUTINES)
  .flatMap(r => r.warmup)
  .filter((ex, i, arr) => arr.findIndex(e => e.name === ex.name) === i);

const ALL_COOLDOWNS: RoutineExercise[] = Object.values(SESSION_ROUTINES)
  .flatMap(r => r.stretch)
  .filter((ex, i, arr) => arr.findIndex(e => e.name === ex.name) === i);

const MUSCLE_LABELS: Record<string, string> = {
  chest: "CHEST", back: "BACK", shoulders: "SHOULDERS",
  biceps: "BICEPS", triceps: "TRICEPS", legs: "LEGS",
  glutes: "GLUTES", core: "CORE", full_body: "FULL BODY", other: "OTHER",
};

const EXERCISES_PER_SESSION = 4;

// ─── Time estimation ──────────────────────────────────────────────────────────
const WARMUP_MIN    = 8;   // 4 exercises × ~2 min
const COOLDOWN_MIN  = 8;   // 4 stretches × ~2 min
const REST_BETWEEN  = 2;   // minutes between exercises
const MAX_EXERCISE  = 14;  // per-exercise hard limit (minutes)
const MAX_TOTAL     = 45;  // session hard limit (minutes)

/** Estimate minutes for one exercise based on number of sets.
 *  Per set: ~30s work + 90s intra-set rest. Last set has no trailing rest. */
function estimateExerciseMin(setCount: number): number {
  if (setCount === 0) return 0;
  return Math.round((setCount * 0.5 + (setCount - 1) * 1.5) * 10) / 10;
}

/** Total estimated session time in minutes. */
function estimateTotalMin(exerciseSets: number[]): number {
  const mainTime = exerciseSets.reduce((sum, n) => sum + estimateExerciseMin(n), 0);
  const restTime = Math.max(0, exerciseSets.length - 1) * REST_BETWEEN;
  return WARMUP_MIN + mainTime + restTime + COOLDOWN_MIN;
}

// ─── Session time summary bar ─────────────────────────────────────────────────

function SessionTimeSummary({ selected }: { selected: { sets: SetData[] }[] }) {
  const setCounts  = selected.map(s => s.sets.length);
  const total      = estimateTotalMin(setCounts);
  const isOver     = total > MAX_TOTAL;
  const isWarning  = total > MAX_TOTAL * 0.9 && !isOver;
  const color      = isOver ? "#ef4444" : isWarning ? "#fb923c" : "#a3e635";

  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-sm border text-xs"
      style={{ borderColor: `${color}40`, background: `${color}08` }}
    >
      <Clock size={13} style={{ color, flexShrink: 0 }} />
      <div className="flex items-baseline gap-1.5 flex-1 flex-wrap">
        <span className="font-display tracking-[0.15em]" style={{ color, fontSize: "0.85rem" }}>
          ~{Math.round(total)} MIN
        </span>
        <span className="text-muted-foreground tracking-[0.1em]">
          {WARMUP_MIN}m warm-up
          {setCounts.map((n, i) => (
            <span key={i}> · {estimateExerciseMin(n)}m ex{i + 1}</span>
          ))}
          {setCounts.length > 1 && (
            <span> · {(setCounts.length - 1) * REST_BETWEEN}m rest</span>
          )}
          · {COOLDOWN_MIN}m cool-down
        </span>
      </div>
      {(isOver || isWarning) && (
        <div className="flex items-center gap-1 shrink-0" style={{ color }}>
          <AlertTriangle size={12} />
          <span className="tracking-[0.1em]">
            {isOver ? `OVER ${MAX_TOTAL} MIN` : "NEAR LIMIT"}
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function pickRandom<T>(arr: T[], n: number): T[] {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

/**
 * Picks EXERCISES_PER_SESSION exercises from pool, strongly preferring ones
 * NOT in recentIds. Falls back to recent ones only if the fresh pool is too small.
 */
function pickFresh(pool: Exercise[], recentIds: string[]): Exercise[] {
  const fresh    = pool.filter(e => !recentIds.includes(e.id));
  const recent   = pool.filter(e =>  recentIds.includes(e.id));
  const n        = EXERCISES_PER_SESSION;

  if (fresh.length >= n) return pickRandom(fresh, n);
  // Not enough fresh — fill the rest from recent
  return [...pickRandom(fresh, fresh.length), ...pickRandom(recent, n - fresh.length)];
}

// ─── Custom session builder ───────────────────────────────────────────────────

function RoutineCheckbox({
  ex,
  checked,
  onToggle,
  accent,
}: {
  ex: RoutineExercise;
  checked: boolean;
  onToggle: () => void;
  accent: string;
}) {
  return (
    <label
      className="flex items-start gap-3 px-3 py-2.5 rounded-sm border cursor-pointer transition-colors"
      style={{
        borderColor: checked ? `${accent}60` : "rgba(255,255,255,0.07)",
        background:  checked ? `${accent}08` : "transparent",
      }}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onToggle}
        className="mt-0.5 shrink-0"
        style={checked ? { borderColor: accent, backgroundColor: accent } : undefined}
      />
      <div className="min-w-0">
        <span
          className="font-display tracking-[0.1em] leading-none block"
          style={{ fontSize: "0.8rem", color: checked ? accent : "inherit" }}
        >
          {ex.name.toUpperCase()}
        </span>
        <span className="text-[10px] text-muted-foreground tracking-[0.12em] mt-0.5 block">
          {ex.reps}
        </span>
      </div>
    </label>
  );
}

function CustomSessionBuilder({
  exercises,
  onStart,
  onBack,
}: {
  exercises: Exercise[];
  onStart: (params: {
    name:     string;
    mainExercises: SelectedExercise[];
    warmup:   RoutineExercise[];
    cooldown: RoutineExercise[];
  }) => void;
  onBack: () => void;
}) {
  const ACCENT = "#c084fc";

  const [sessionName,   setSessionName]   = useState("Custom Session");
  const [query,         setQuery]         = useState("");
  const [muscleFilter,  setMuscleFilter]  = useState<string | null>(null);
  const [picked,        setPicked]        = useState<SelectedExercise[]>([]);
  const [warmup,        setWarmup]        = useState<RoutineExercise[]>([]);
  const [cooldown,      setCooldown]      = useState<RoutineExercise[]>([]);
  const [showWarmup,    setShowWarmup]    = useState(false);
  const [showCooldown,  setShowCooldown]  = useState(false);
  const [error,         setError]         = useState<string | null>(null);

  const pickedIds = new Set(picked.map(p => p.exercise.id));
  const muscleGroups = [...new Set(exercises.map(e => e.muscleGroup))].sort();

  const filtered = exercises.filter(ex => {
    if (pickedIds.has(ex.id)) return false;
    if (muscleFilter && ex.muscleGroup !== muscleFilter) return false;
    if (query && !ex.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  function addExercise(ex: Exercise) {
    setPicked(prev => [...prev, { exercise: ex, sets: [emptySet()] }]);
  }

  function removeExercise(id: string) {
    setPicked(prev => prev.filter(p => p.exercise.id !== id));
  }

  function toggleWarmup(ex: RoutineExercise) {
    setWarmup(prev =>
      prev.find(e => e.name === ex.name)
        ? prev.filter(e => e.name !== ex.name)
        : [...prev, ex],
    );
  }

  function toggleCooldown(ex: RoutineExercise) {
    setCooldown(prev =>
      prev.find(e => e.name === ex.name)
        ? prev.filter(e => e.name !== ex.name)
        : [...prev, ex],
    );
  }

  function handleStart() {
    if (picked.length === 0) {
      setError("Add at least one exercise to continue.");
      return;
    }
    setError(null);
    onStart({ name: sessionName || "Custom Session", mainExercises: picked, warmup, cooldown });
  }

  return (
    <div className="space-y-6 animate-rise-in">

      {/* ── Back ──────────────────────────────────────────────────────── */}
      <Button
        type="button" variant="ghost" size="sm"
        onClick={onBack}
        className="text-muted-foreground tracking-[0.15em] text-xs uppercase -ml-2"
      >
        <ChevronLeft size={14} className="mr-1" />
        Change session
      </Button>

      {/* ── Header ────────────────────────────────────────────────────── */}
      <div>
        <h2
          className="font-display tracking-[0.15em] leading-none"
          style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)", color: ACCENT }}
        >
          CUSTOM DAY
        </h2>
        <p className="text-[10px] tracking-[0.25em] text-muted-foreground mt-1">
          BUILD YOUR OWN SESSION
        </p>
      </div>

      {/* ── Session name ──────────────────────────────────────────────── */}
      <div className="space-y-1.5">
        <Label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
          Session Name
        </Label>
        <Input
          value={sessionName}
          onChange={e => setSessionName(e.target.value)}
          placeholder="e.g. Full Body, Upper, Arms..."
          className="font-mono text-sm tracking-wide"
        />
      </div>

      <Separator />

      {/* ── Warm-Up picker ────────────────────────────────────────────── */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setShowWarmup(v => !v)}
          className="flex items-center gap-2 w-full text-left group"
        >
          <Flame size={14} style={{ color: "#fb923c" }} />
          <span
            className="font-display tracking-[0.2em] text-xs"
            style={{ color: "#fb923c" }}
          >
            WARM-UP
          </span>
          <span className="text-[10px] text-muted-foreground tracking-widest ml-1">
            {warmup.length > 0 ? `${warmup.length} selected` : "optional"}
          </span>
          <span className="ml-auto text-muted-foreground text-xs">
            {showWarmup ? "▲" : "▼"}
          </span>
        </button>

        {showWarmup && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ALL_WARMUPS.map(ex => (
              <RoutineCheckbox
                key={ex.name}
                ex={ex}
                checked={!!warmup.find(e => e.name === ex.name)}
                onToggle={() => toggleWarmup(ex)}
                accent="#fb923c"
              />
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* ── Exercise picker ───────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span style={{ fontSize: "0.85rem" }}>⚡</span>
          <span
            className="font-display tracking-[0.2em] text-xs"
            style={{ color: ACCENT }}
          >
            EXERCISES
          </span>
          {picked.length > 0 && (
            <span className="text-[10px] text-muted-foreground tracking-widest ml-1">
              {picked.length} added
            </span>
          )}
        </div>

        {/* Selected exercises */}
        {picked.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {picked.map(p => (
              <div
                key={p.exercise.id}
                className="flex items-center gap-1.5 text-[11px] font-mono tracking-wide px-2.5 py-1.5 rounded-sm border"
                style={{ borderColor: `${ACCENT}50`, background: `${ACCENT}08`, color: ACCENT }}
              >
                {p.exercise.name}
                <button
                  type="button"
                  onClick={() => removeExercise(p.exercise.id)}
                  className="opacity-60 hover:opacity-100 transition-opacity"
                  aria-label={`Remove ${p.exercise.name}`}
                >
                  <X size={11} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="relative">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search exercises..."
            className="pl-8 font-mono text-sm"
          />
        </div>

        {/* Muscle group filter */}
        <div className="flex flex-wrap gap-1.5">
          <Button
            type="button"
            size="sm"
            variant={muscleFilter === null ? "default" : "outline"}
            onClick={() => setMuscleFilter(null)}
            className="h-6 px-2 text-[10px] tracking-[0.15em] uppercase"
          >
            ALL
          </Button>
          {muscleGroups.map(mg => (
            <Button
              key={mg}
              type="button"
              size="sm"
              variant={muscleFilter === mg ? "default" : "outline"}
              onClick={() => setMuscleFilter(muscleFilter === mg ? null : mg)}
              className="h-6 px-2 text-[10px] tracking-[0.15em] uppercase"
            >
              {MUSCLE_LABELS[mg] ?? mg.toUpperCase()}
            </Button>
          ))}
        </div>

        {/* Exercise list */}
        <ScrollArea className="h-64 rounded-sm border border-border">
          <div className="p-2 space-y-1">
            {filtered.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-6 tracking-wider">
                No exercises match your search.
              </p>
            )}
            {filtered.map(ex => (
              <div
                key={ex.id}
                className="flex items-center justify-between px-3 py-2 rounded-sm hover:bg-muted/40 transition-colors group"
              >
                <div className="min-w-0">
                  <span className="text-sm font-mono tracking-wide truncate block">
                    {ex.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground tracking-[0.15em] uppercase">
                    {MUSCLE_LABELS[ex.muscleGroup] ?? ex.muscleGroup}
                  </span>
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => addExercise(ex)}
                  className="h-7 w-7 p-0 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ borderColor: `${ACCENT}50`, color: ACCENT }}
                >
                  <Plus size={13} />
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Separator />

      {/* ── Cool-Down picker ──────────────────────────────────────────── */}
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => setShowCooldown(v => !v)}
          className="flex items-center gap-2 w-full text-left group"
        >
          <Leaf size={14} style={{ color: "#22d3ee" }} />
          <span
            className="font-display tracking-[0.2em] text-xs"
            style={{ color: "#22d3ee" }}
          >
            COOL-DOWN
          </span>
          <span className="text-[10px] text-muted-foreground tracking-widest ml-1">
            {cooldown.length > 0 ? `${cooldown.length} selected` : "optional"}
          </span>
          <span className="ml-auto text-muted-foreground text-xs">
            {showCooldown ? "▲" : "▼"}
          </span>
        </button>

        {showCooldown && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ALL_COOLDOWNS.map(ex => (
              <RoutineCheckbox
                key={ex.name}
                ex={ex}
                checked={!!cooldown.find(e => e.name === ex.name)}
                onToggle={() => toggleCooldown(ex)}
                accent="#22d3ee"
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Error ────────────────────────────────────────────────────── */}
      {error && (
        <p className="text-destructive text-sm tracking-wide border border-destructive/30 rounded-sm px-4 py-3">
          {error}
        </p>
      )}

      {/* ── Build button ──────────────────────────────────────────────── */}
      <div className="pb-6">
        <Button
          type="button"
          onClick={handleStart}
          className="w-full font-display tracking-[0.2em] uppercase"
          style={{ fontSize: "1rem" }}
        >
          <SlidersHorizontal size={15} className="mr-2" />
          START CUSTOM SESSION
        </Button>
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

// ─── Phase header ─────────────────────────────────────────────────────────────

function PhaseHeader({
  icon,
  label,
  subtitle,
  accent,
}: {
  icon:     React.ReactNode;
  label:    string;
  subtitle: string;
  accent:   string;
}) {
  return (
    <div className="flex items-center gap-3 py-1">
      <span style={{ color: accent }}>{icon}</span>
      <div>
        <span
          className="font-display tracking-[0.2em] leading-none"
          style={{ fontSize: "0.75rem", color: accent }}
        >
          {label}
        </span>
        <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground ml-3">
          {subtitle}
        </span>
      </div>
      <div className="flex-1 h-px ml-2" style={{ background: `${accent}30` }} />
    </div>
  );
}

// ─── Image with fallback ──────────────────────────────────────────────────────
// Always renders a fixed-size box. Shows the photo when it loads; shows a
// styled placeholder when it fails, so every exercise always has an image area.

function ExerciseImage({
  src,
  alt,
  accent,
  accentBg,
  accentBorder,
  className,
  fallbackClassName,
}: {
  src:              string;
  alt:              string;
  accent:           string;
  accentBg:         string;
  accentBorder:     string;
  className:        string;       // applied to the <img>
  fallbackClassName:string;       // applied to the fallback <div>
}) {
  const [failed, setFailed] = useState(false);
  const initials = alt
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  if (failed) {
    return (
      <div
        className={`${fallbackClassName} flex flex-col items-center justify-center gap-1 rounded-sm border`}
        style={{ borderColor: accentBorder, background: accentBg }}
      >
        <span className="font-display text-xs font-bold" style={{ color: accent }}>
          {initials}
        </span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={`${className} object-cover rounded-sm bg-muted`}
      onError={() => setFailed(true)}
    />
  );
}

// ─── Single warm-up / stretch card ────────────────────────────────────────────

function RoutineCard({
  exercise,
  accent,
  accentBg,
  accentBorder,
  index,
}: {
  exercise:     RoutineExercise;
  accent:       string;
  accentBg:     string;
  accentBorder: string;
  index:        number;
}) {
  return (
    <Dialog>
      <div
        className="flex gap-4 px-4 py-3 border rounded-[2px]"
        style={{ borderColor: accentBorder, background: accentBg }}
      >
        {/* Index */}
        <span
          className="font-display tabular-nums text-sm leading-none shrink-0 mt-0.5 w-5 text-right"
          style={{ color: accent }}
        >
          {index + 1}
        </span>

        {/* Middle: name + reps + cue */}
        <div className="flex-1 min-w-0 space-y-0.5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
            <span
              className="font-display tracking-[0.1em] leading-none"
              style={{ fontSize: "0.9rem", color: accent }}
            >
              {exercise.name.toUpperCase()}
            </span>
            <span
              className="text-[10px] tracking-[0.18em] uppercase font-medium border px-1.5 py-0.5 rounded-[2px]"
              style={{ color: accent, borderColor: accentBorder }}
            >
              {exercise.reps}
            </span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {exercise.cue}
          </p>
        </div>

        {/* Right: thumbnail + info button — always rendered */}
        <div className="flex items-start gap-2 shrink-0">
          <ExerciseImage
            src={exercise.image}
            alt={exercise.name}
            accent={accent}
            accentBg={accentBg}
            accentBorder={accentBorder}
            className="w-12 h-12"
            fallbackClassName="w-12 h-12"
          />
          <DialogTrigger
            render={
              <button
                type="button"
                aria-label={`How to do ${exercise.name}`}
                className="h-7 w-7 flex items-center justify-center rounded-sm border transition-colors hover:opacity-80"
                style={{
                  borderColor: accentBorder,
                  color:       accent,
                  background:  accentBg,
                }}
              />
            }
          >
            <Info size={13} />
          </DialogTrigger>
        </div>
      </div>

      {/* ── Info dialog ─────────────────────────────────────────────────── */}
      <DialogContent className="sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle className="font-display tracking-[0.12em] text-lg leading-none">
            {exercise.name.toUpperCase()}
          </DialogTitle>
          <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground pt-0.5">
            {exercise.reps}
          </p>
        </DialogHeader>

        {/* Exercise image — full width, always shown */}
        <ExerciseImage
          src={exercise.image}
          alt={exercise.name}
          accent={accent}
          accentBg={accentBg}
          accentBorder={accentBorder}
          className="w-full h-52"
          fallbackClassName="w-full h-52"
        />

        {/* Step-by-step instructions */}
        <ol className="space-y-3 py-1">
          {exercise.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span
                className="font-display tabular-nums w-5 shrink-0 mt-px text-sm"
                style={{ color: accent }}
              >
                {i + 1}.
              </span>
              <span className="text-sm text-muted-foreground leading-relaxed">
                {step}
              </span>
            </li>
          ))}
        </ol>

        {/* Coaching cue highlight */}
        <p
          className="text-xs border rounded-sm px-3 py-2 leading-relaxed"
          style={{ color: accent, borderColor: accentBorder, background: accentBg }}
        >
          <span className="font-medium uppercase tracking-widest mr-1.5">Cue</span>
          {exercise.cue}
        </p>
      </DialogContent>
    </Dialog>
  );
}

export default function LogWorkoutForm({
  date,
  exercises,
  recentlyUsedIds,
  lastSessions,
}: {
  date:             string;
  exercises:        Exercise[];
  recentlyUsedIds:  Record<SessionType, string[]>;
  lastSessions:     Record<string, LastSession>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [sessionType,      setSessionType]      = useState<SessionType | null>(null);
  const [selected,         setSelected]         = useState<SelectedExercise[]>([]);
  const [error,            setError]            = useState<string | null>(null);
  const [showCustomBuilder,setShowCustomBuilder] = useState(false);
  const [customWarmup,     setCustomWarmup]      = useState<RoutineExercise[]>([]);
  const [customCooldown,   setCustomCooldown]    = useState<RoutineExercise[]>([]);
  const [customSessionName,setCustomSessionName] = useState("Custom Session");

  // ── Session type selection ──────────────────────────────────────────────────
  function handleTypeSelect(type: SessionType) {
    if (type === "custom") {
      setSessionType("custom");
      setShowCustomBuilder(true);
      setError(null);
      return;
    }
    const pool = exercises.filter(e =>
      SESSION_CONFIG[type].muscles.includes(e.muscleGroup),
    );
    const picked = pickFresh(pool, recentlyUsedIds[type] ?? []);
    setSelected(picked.map(ex => ({ exercise: ex, sets: [emptySet()] })));
    setSessionType(type);
    setShowCustomBuilder(false);
    setError(null);
  }

  function handleShuffle() {
    if (!sessionType || sessionType === "custom") return;
    const pool = exercises.filter(e =>
      SESSION_CONFIG[sessionType].muscles.includes(e.muscleGroup),
    );
    const picked = pickFresh(pool, recentlyUsedIds[sessionType] ?? []);
    setSelected(picked.map(ex => ({ exercise: ex, sets: [emptySet()] })));
    setError(null);
  }

  function handleCustomStart(params: {
    name: string;
    mainExercises: SelectedExercise[];
    warmup: RoutineExercise[];
    cooldown: RoutineExercise[];
  }) {
    setCustomSessionName(params.name);
    setCustomWarmup(params.warmup);
    setCustomCooldown(params.cooldown);
    setSelected(params.mainExercises);
    setShowCustomBuilder(false);
    setError(null);
  }

  // ── Sets management ─────────────────────────────────────────────────────────
  function updateSets(index: number, sets: SetData[]) {
    setSelected(prev =>
      prev.map((item, i) => (i === index ? { ...item, sets } : item)),
    );
  }

  function removeExercise(index: number) {
    setSelected(prev => prev.filter((_, i) => i !== index));
  }

  function swapExercise(index: number, newExercise: Exercise) {
    setSelected(prev =>
      prev.map((item, i) =>
        i === index ? { exercise: newExercise, sets: [emptySet()] } : item,
      ),
    );
  }

  /** Exercises from the same muscle group not already in the current session. */
  function getAlternatives(exerciseId: string, muscleGroup: string): Exercise[] {
    const currentIds = new Set(selected.map(s => s.exercise.id));
    return exercises
      .filter(e =>
        e.muscleGroup === muscleGroup &&
        e.id !== exerciseId &&
        !currentIds.has(e.id),
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  // ── Save ────────────────────────────────────────────────────────────────────
  function validate(): string | null {
    if (!sessionType)           return "Choose a session type.";
    if (selected.length === 0)  return "No exercises — try shuffling again.";
    for (const { exercise, sets } of selected) {
      if (sets.length === 0)
        return `${exercise.name} has no sets — add one or remove the exercise.`;
      for (const set of sets) {
        if (!set.reps.trim())
          return `All sets need a reps value (${exercise.name}).`;
      }
    }
    return null;
  }

  function handleSave() {
    const err = validate();
    if (err) { setError(err); return; }
    setError(null);

    const sessionName = sessionType === "custom"
      ? customSessionName
      : SESSION_CONFIG[sessionType!].name;

    startTransition(async () => {
      const result = await logWorkout({
        name:      sessionName,
        startedAt: new Date(`${date}T09:00:00.000Z`),
        endedAt:   null,
        notes:     null,
        exercises: selected.map((item, i) => ({
          exerciseId: item.exercise.id,
          orderIndex: i,
          sets: item.sets.map((s, si) => ({
            setNumber: si + 1,
            weightKg:  s.weightKg.trim() || null,
            reps:      s.reps.trim() ? parseInt(s.reps, 10) : null,
            rpe:       s.rpe.trim()  || null,
            rir:       null,
          })),
        })),
      });

      if ("error" in result) {
        setError(result.error);
        return;
      }

      router.push(`/dashboard?date=${date}`);
    });
  }

  // ── Render: step 1 — type selection ─────────────────────────────────────────
  if (!sessionType) {
    return (
      <div className="space-y-8 animate-rise-in" style={{ animationDelay: "100ms" }}>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => router.push(`/dashboard?date=${date}`)}
          className="text-muted-foreground tracking-[0.15em] text-xs uppercase -ml-2"
        >
          <ChevronLeft size={14} className="mr-1" />
          Back to journal
        </Button>

        <div>
          <p className="text-xs text-muted-foreground tracking-[0.3em] uppercase mb-6">
            Choose your session
          </p>

          {/* ── Staggered session cards ─────────────────────────────────── */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden:  {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
            }}
          >
            {(["push", "pull", "legs", "custom"] as const).map((type) => {
              const cfg = SESSION_CONFIG[type];
              return (
                <motion.div
                  key={type}
                  variants={{
                    hidden:  { opacity: 0, y: 20, scale: 0.96 },
                    visible: { opacity: 1, y: 0,  scale: 1, transition: { type: "spring", stiffness: 110, damping: 14 } },
                  }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => handleTypeSelect(type)}
                    className="w-full h-auto flex-col gap-3 py-10 border rounded-sm relative overflow-hidden"
                    style={{
                      borderColor: cfg.accentBorder,
                      background:  cfg.accentBg,
                    }}
                  >
                    {/* Animated top accent line */}
                    <motion.span
                      className="absolute top-0 left-0 right-0 h-[2px] origin-left"
                      style={{ background: cfg.accent, boxShadow: `0 0 8px ${cfg.accent}80` }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.7, delay: 0.2, ease: [0.43, 0.13, 0.23, 0.96] }}
                    />
                    <span
                      className="font-display tracking-[0.2em] leading-none"
                      style={{ fontSize: "clamp(2rem, 6vw, 3rem)", color: cfg.accent }}
                    >
                      {cfg.label}
                    </span>
                    <span className="text-[10px] tracking-[0.25em] text-muted-foreground">
                      {cfg.subtitle}
                    </span>
                    <span className="text-[10px] tracking-widest" style={{ color: cfg.accent, opacity: 0.6 }}>
                      {type === "custom" ? "FULL EXERCISE BANK" : `45 MIN · ${EXERCISES_PER_SESSION} EXERCISES`}
                    </span>
                  </Button>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Render: custom builder ───────────────────────────────────────────────────
  if (sessionType === "custom" && showCustomBuilder) {
    return (
      <CustomSessionBuilder
        exercises={exercises}
        onStart={handleCustomStart}
        onBack={() => { setSessionType(null); setShowCustomBuilder(false); }}
      />
    );
  }

  // ── Render: step 2 — exercises + set logging ─────────────────────────────────
  const cfg     = SESSION_CONFIG[sessionType];
  const routine = sessionType === "custom"
    ? { warmup: customWarmup, stretch: customCooldown }
    : SESSION_ROUTINES[sessionType];

  return (
    <div className="space-y-6 animate-rise-in" style={{ animationDelay: "0ms" }}>

      {/* ── Sub-header ───────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => {
              if (sessionType === "custom") {
                setShowCustomBuilder(true);
              } else {
                setSessionType(null);
              }
            }}
            className="text-muted-foreground tracking-[0.15em] text-xs uppercase -ml-2 mb-2"
          >
            <ChevronLeft size={14} className="mr-1" />
            {sessionType === "custom" ? "Edit session" : "Change session"}
          </Button>
          <h2
            className="font-display tracking-[0.15em] leading-none"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: cfg.accent }}
          >
            {sessionType === "custom" ? customSessionName.toUpperCase() : `${cfg.label} DAY`}
          </h2>
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mt-1">
            {cfg.subtitle}
          </p>
        </div>

        {sessionType !== "custom" && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleShuffle}
            className="tracking-[0.15em] text-xs uppercase shrink-0"
            style={{ borderColor: cfg.accentBorder, color: cfg.accent }}
          >
            <Shuffle size={12} className="mr-1.5" />
            Shuffle
          </Button>
        )}
      </div>

      <Separator />

      {/* ── Phase 1: Warm-Up (hidden if no exercises selected) ──────────── */}
      {routine.warmup.length > 0 && (
        <>
          <div className="space-y-3">
            <PhaseHeader
              icon={<Flame size={14} />}
              label="WARM-UP"
              subtitle="Dynamic mobility — prime joints before loading"
              accent="#fb923c"
            />
            {routine.warmup.map((ex, i) => (
              <RoutineCard
                key={ex.name}
                exercise={ex}
                index={i}
                accent="#fb923c"
                accentBg="rgba(251,146,60,0.05)"
                accentBorder="rgba(251,146,60,0.25)"
              />
            ))}
          </div>
          <Separator />
        </>
      )}

      {/* ── Phase 2: Main Training ───────────────────────────────────────── */}
      <div className="space-y-3">
        <PhaseHeader
          icon={<span style={{ fontSize: "0.85rem" }}>⚡</span>}
          label="TRAINING"
          subtitle="Log sets · beat your last session"
          accent={cfg.accent}
        />

        {/* ── Session time summary ─────────────────────────────────────── */}
        <SessionTimeSummary selected={selected} />

        {/* ── Staggered exercise blocks (magic 21 pattern) ───────────────── */}
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden:  {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
          }}
        >
          {selected.map((item, i) => (
            <motion.div
              key={item.exercise.id}
              variants={{
                hidden:  { opacity: 0, y: 18 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 14 } },
              }}
            >
              <ExerciseBlock
                exercise={item.exercise}
                sets={item.sets}
                alternatives={getAlternatives(item.exercise.id, item.exercise.muscleGroup)}
                onSetsChange={(sets) => updateSets(i, sets)}
                onRemove={() => removeExercise(i)}
                onSwap={(newEx) => swapExercise(i, newEx)}
                lastSession={lastSessions[item.exercise.id] ?? null}
                estimatedMinutes={estimateExerciseMin(item.sets.length)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <Separator />

      {/* ── Phase 3: Cool-Down (hidden if none selected) ─────────────────── */}
      {routine.stretch.length > 0 && (
        <>
          <div className="space-y-3">
            <PhaseHeader
              icon={<Leaf size={14} />}
              label="COOL-DOWN"
              subtitle="Static stretches — hold each position, breathe"
              accent="#22d3ee"
            />
            {routine.stretch.map((ex, i) => (
              <RoutineCard
                key={ex.name}
                exercise={ex}
                index={i}
                accent="#22d3ee"
                accentBg="rgba(34,211,238,0.05)"
                accentBorder="rgba(34,211,238,0.25)"
              />
            ))}
          </div>
          <Separator />
        </>
      )}

      {/* ── Error ────────────────────────────────────────────────────────── */}
      {error && (
        <p className="text-destructive text-sm tracking-wide border border-destructive/30 rounded-sm px-4 py-3">
          {error}
        </p>
      )}

      {/* ── Save ─────────────────────────────────────────────────────────── */}
      <div className="flex gap-3 pb-12">
        <Button
          type="button"
          onClick={handleSave}
          disabled={isPending}
          className="flex-1 font-display tracking-[0.2em] uppercase btn-shine"
          style={{ fontSize: "1rem" }}
        >
          {isPending ? "SAVING…" : "SAVE WORKOUT"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push(`/dashboard?date=${date}`)}
          disabled={isPending}
          className="tracking-[0.15em] text-xs uppercase"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
