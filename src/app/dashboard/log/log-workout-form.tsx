"use client";

import { useState, useTransition } from "react";
import { useRouter }               from "next/navigation";
import { Button }    from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, Shuffle, Flame, Leaf, Info } from "lucide-react";
import ExerciseBlock  from "./exercise-block";
import { type SetData, emptySet } from "./set-row";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { logWorkout } from "@/actions/workouts";
import type { getAllExercises } from "@/data/exercises";
import type { LastSession }    from "@/data/exercises";
import { SESSION_ROUTINES, type RoutineExercise } from "@/lib/session-routines";

type Exercise = Awaited<ReturnType<typeof getAllExercises>>[number];
type SessionType = "push" | "pull" | "legs";

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
};

const EXERCISES_PER_SESSION = 4;

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

  const [sessionType, setSessionType] = useState<SessionType | null>(null);
  const [selected,    setSelected]    = useState<SelectedExercise[]>([]);
  const [error,       setError]       = useState<string | null>(null);

  // ── Session type selection ──────────────────────────────────────────────────
  function handleTypeSelect(type: SessionType) {
    const pool = exercises.filter(e =>
      SESSION_CONFIG[type].muscles.includes(e.muscleGroup),
    );
    const picked = pickFresh(pool, recentlyUsedIds[type]);
    setSelected(picked.map(ex => ({ exercise: ex, sets: [emptySet()] })));
    setSessionType(type);
    setError(null);
  }

  function handleShuffle() {
    if (!sessionType) return;
    const pool = exercises.filter(e =>
      SESSION_CONFIG[sessionType].muscles.includes(e.muscleGroup),
    );
    const picked = pickFresh(pool, recentlyUsedIds[sessionType]);
    setSelected(picked.map(ex => ({ exercise: ex, sets: [emptySet()] })));
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

    const config = SESSION_CONFIG[sessionType!];

    startTransition(async () => {
      const result = await logWorkout({
        name:      config.name,
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(["push", "pull", "legs"] as const).map((type) => {
              const cfg = SESSION_CONFIG[type];
              return (
                <Button
                  key={type}
                  type="button"
                  variant="outline"
                  onClick={() => handleTypeSelect(type)}
                  className="h-auto flex-col gap-3 py-10 border rounded-sm"
                  style={{
                    borderColor:     cfg.accentBorder,
                    background:      cfg.accentBg,
                  }}
                >
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
                    45 MIN · {EXERCISES_PER_SESSION} EXERCISES
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Render: step 2 — exercises + set logging ─────────────────────────────────
  const cfg     = SESSION_CONFIG[sessionType];
  const routine = SESSION_ROUTINES[sessionType];

  return (
    <div className="space-y-6 animate-rise-in" style={{ animationDelay: "0ms" }}>

      {/* ── Sub-header ───────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setSessionType(null)}
            className="text-muted-foreground tracking-[0.15em] text-xs uppercase -ml-2 mb-2"
          >
            <ChevronLeft size={14} className="mr-1" />
            Change session
          </Button>
          <h2
            className="font-display tracking-[0.15em] leading-none"
            style={{ fontSize: "clamp(1.8rem, 5vw, 2.8rem)", color: cfg.accent }}
          >
            {cfg.label} DAY
          </h2>
          <p className="text-[10px] tracking-[0.25em] text-muted-foreground mt-1">
            {cfg.subtitle}
          </p>
        </div>

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
      </div>

      <Separator />

      {/* ── Phase 1: Warm-Up ─────────────────────────────────────────────── */}
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

      {/* ── Phase 2: Main Training ───────────────────────────────────────── */}
      <div className="space-y-3">
        <PhaseHeader
          icon={<span style={{ fontSize: "0.85rem" }}>⚡</span>}
          label="TRAINING"
          subtitle="Log sets · beat your last session"
          accent={cfg.accent}
        />
        <div className="space-y-4">
          {selected.map((item, i) => (
            <ExerciseBlock
              key={item.exercise.id}
              exercise={item.exercise}
              sets={item.sets}
              alternatives={getAlternatives(item.exercise.id, item.exercise.muscleGroup)}
              onSetsChange={(sets) => updateSets(i, sets)}
              onRemove={() => removeExercise(i)}
              onSwap={(newEx) => swapExercise(i, newEx)}
              lastSession={lastSessions[item.exercise.id] ?? null}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* ── Phase 3: Cool-Down / Stretching ─────────────────────────────── */}
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
          className="flex-1 font-display tracking-[0.2em] uppercase"
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
