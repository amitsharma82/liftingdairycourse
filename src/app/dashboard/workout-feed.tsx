"use client";

import Link                    from "next/link";
import { motion }              from "motion/react";
import { Timer, Dumbbell, TrendingUp, Flame } from "lucide-react";
import { LogoMark }            from "@/components/logo";
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

type WorkoutList    = Awaited<ReturnType<typeof getWorkoutsByDate>>;
type Workout        = WorkoutList[number];
type WorkoutExercise = Workout["workoutExercises"][number];
type WorkoutSet     = WorkoutExercise["workoutSets"][number];

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

// RPE → heat colour (inline style, not Tailwind so values are dynamic)
function rpeColor(rpe: string | null): string {
  if (!rpe) return "rgba(255,255,255,0.4)";
  const v = parseFloat(rpe);
  if (v <= 6)  return "#a3e635"; // lime  — easy
  if (v <= 7)  return "#86efac"; // green — moderate
  if (v <= 8)  return "#fde047"; // yellow — hard
  if (v <= 9)  return "#fb923c"; // orange — very hard
  return "#f87171";              // red   — maximal
}

// Muscle group → left-border accent hex
const MUSCLE_BORDER: Record<string, string> = {
  chest:     "#22d3ee",
  back:      "#a3e635",
  shoulders: "#fb923c",
  biceps:    "#fb923c",
  triceps:   "#fb923c",
  legs:      "#a3e635",
  glutes:    "#a3e635",
  core:      "#22d3ee",
  full_body: "#a3e635",
  other:     "rgba(255,255,255,0.2)",
};

// Muscle group → Badge accent colour via Tailwind utility classes
const MUSCLE_STYLE: Record<string, string> = {
  chest:     "border-cyan-400/50 text-cyan-400",
  back:      "border-primary/50 text-primary",
  shoulders: "border-orange-400/50 text-orange-400",
  biceps:    "border-orange-400/50 text-orange-400",
  triceps:   "border-orange-400/50 text-orange-400",
  legs:      "border-primary/50 text-primary",
  glutes:    "border-primary/50 text-primary",
  core:      "border-cyan-400/50 text-cyan-400",
  full_body: "border-primary/50 text-primary",
  other:     "border-muted-foreground/40 text-muted-foreground",
};

const MUSCLE_LABEL: Record<string, string> = {
  chest: "CHEST", back: "BACK", shoulders: "SHOULDERS",
  biceps: "BICEPS", triceps: "TRICEPS", legs: "LEGS",
  glutes: "GLUTES", core: "CORE", full_body: "FULL BODY", other: "OTHER",
};

// ─── Main feed ────────────────────────────────────────────────────────────────

export default function WorkoutFeed({
  workouts,
  date,
}: {
  workouts: WorkoutList;
  date: string;
}) {
  if (workouts.length === 0) return <EmptyState date={date} />;

  return (
    <div className="space-y-6">
      {workouts.map((workout, i) => (
        <WorkoutCard key={workout.id} workout={workout} index={i} />
      ))}

      {/* ── Log another session for this day ───────────────────────────── */}
      <div className="flex justify-center pt-2">
        <Link
          href={`/dashboard/log?date=${date}`}
          className={buttonVariants({ variant: "outline", size: "sm" }) +
            " tracking-[0.2em] text-xs uppercase text-primary border-primary/30 hover:bg-primary/10 hover:text-primary btn-shine"}
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
    <div className="flex flex-col items-center justify-center py-24 text-center relative overflow-hidden">

      {/* ── LogoMark watermark ─────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.04, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
      >
        <LogoMark size={340} color="#a3e635" />
      </motion.div>

      {/* ── Headline ───────────────────────────────────────────────────── */}
      <motion.p
        className="font-mono text-xs tracking-[0.4em] uppercase text-primary mb-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {isToday ? "TODAY" : date}
      </motion.p>

      <motion.h2
        className="font-display leading-none tracking-widest text-foreground mb-3"
        style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {isToday ? "NO LIFTS YET" : "NO SESSION"}
      </motion.h2>

      <motion.p
        className="font-mono text-sm text-muted-foreground tracking-widest uppercase mb-10 max-w-xs"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {isToday
          ? "The iron doesn't care what you felt like."
          : "No workout was recorded on this date."}
      </motion.p>

      {/* ── CTA ────────────────────────────────────────────────────────── */}
      {isToday && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href={`/dashboard/log?date=${date}`}
            className="inline-flex items-center gap-2 font-display tracking-[0.25em] text-sm uppercase px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 transition-all btn-shine"
            style={{ boxShadow: "0 0 24px rgba(163,230,53,0.35), 0 0 48px rgba(163,230,53,0.12)" }}
          >
            <Flame className="w-4 h-4" />
            LOG WORKOUT
          </Link>
        </motion.div>
      )}

      {isToday && (
        <motion.p
          className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground/50 uppercase mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Champions show up anyway.
        </motion.p>
      )}
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
      className="animate-rise-in overflow-hidden relative"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* ── Animated top progress bar (magic 21 pattern) ───────────────── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[3px] origin-left"
        style={{
          background: "linear-gradient(90deg, #a3e635, #22d3ee 60%, rgba(251,146,60,0.6))",
          boxShadow: "0 0 10px rgba(163,230,53,0.6), 0 0 20px rgba(163,230,53,0.25)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.1, delay: index * 0.1, ease: [0.43, 0.13, 0.23, 0.96] }}
      />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <CardHeader className="border-b border-border pb-4 pt-5">
        <CardTitle className="font-display leading-none tracking-[0.1em] text-foreground"
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)" }}
        >
          {workout.name.toUpperCase()}
        </CardTitle>

        {workout.notes && (
          <CardDescription className="text-sm tracking-wide mt-1">
            {workout.notes}
          </CardDescription>
        )}

        <CardAction className="flex flex-col items-end gap-2 shrink-0">
          {/* ── Icon stat pills (magic 21 pattern) ─────────────────────── */}
          {duration && (
            <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-primary border border-primary/20">
              <Timer className="h-3 w-3" />
              <span className="font-display tracking-[0.15em]">{duration}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground border border-border">
            <Dumbbell className="h-3 w-3" />
            <span className="tracking-widest">{workout.workoutExercises.length} EX · {totalSets} SETS</span>
          </div>
          {totalVolume > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-cyan-400 border border-cyan-400/20">
              <TrendingUp className="h-3 w-3" />
              <span className="tracking-widest">{Math.round(totalVolume).toLocaleString()} KG</span>
            </div>
          )}
        </CardAction>
      </CardHeader>

      {/* ── Exercise list (staggered, magic 21 pattern) ────────────────── */}
      <CardContent className="px-0 py-0">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden:  {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
          }}
        >
          {workout.workoutExercises.map((we, i) => (
            <motion.div
              key={we.id}
              variants={{
                hidden:  { opacity: 0, y: 14 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 14 } },
              }}
            >
              <ExerciseRow
                workoutExercise={we}
                index={i}
                isLast={i === workout.workoutExercises.length - 1}
              />
            </motion.div>
          ))}
        </motion.div>
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
  const muscleStyle  = MUSCLE_STYLE[exercise.muscleGroup] ?? MUSCLE_STYLE.other;
  const muscleLabel  = MUSCLE_LABEL[exercise.muscleGroup] ?? "OTHER";
  const borderColor  = MUSCLE_BORDER[exercise.muscleGroup] ?? MUSCLE_BORDER.other;
  const hasWeights   = workoutSets.some(s => s.weightKg);
  const hasDuration  = workoutSets.some(s => s.durationSeconds);
  const hasRpe       = workoutSets.some(s => s.rpe);

  const gridCols = [
    "2rem",
    hasWeights ? "1fr" : null,
    "1fr",
    hasDuration ? "1fr" : null,
    hasRpe ? "1fr" : null,
  ].filter(Boolean).join(" ");

  return (
    <div
      className={`relative px-6 py-5 pl-9 ${!isLast ? "border-b border-border" : ""}`}
      style={{ borderLeft: `3px solid ${borderColor}` }}
    >

      {/* Exercise name + badge */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="font-display text-lg leading-none w-8 shrink-0 text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="font-display tracking-[0.12em] leading-none text-foreground"
          style={{ fontSize: "1.1rem" }}
        >
          {exercise.name.toUpperCase()}
        </span>
        <Badge
          variant="outline"
          className={`tracking-[0.18em] text-[10px] font-medium uppercase ${muscleStyle}`}
        >
          {muscleLabel}
        </Badge>
      </div>

      {/* Set table */}
      {workoutSets.length > 0 ? (
        <div className="ml-11 space-y-0">
          {/* Column headers */}
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

          {/* Set rows */}
          {workoutSets.map((set: WorkoutSet) => (
            <div
              key={set.id}
              className="grid items-center py-2 border-b border-border/50 last:border-0"
              style={{ gridTemplateColumns: gridCols }}
            >
              <span className="text-sm tabular-nums text-muted-foreground">
                {set.setNumber}
              </span>
              {hasWeights && (
                <span className="text-right tabular-nums font-display tracking-wide text-primary"
                  style={{ fontSize: "1.2rem" }}
                >
                  {formatWeight(set.weightKg)}
                </span>
              )}
              <span className="text-right tabular-nums font-display tracking-wide text-foreground"
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
                <span
                  className="text-right tabular-nums text-sm font-mono font-medium"
                  style={{ color: rpeColor(set.rpe) }}
                >
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
