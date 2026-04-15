import type { getWorkoutsByDate } from "@/data/workouts";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge }     from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState({ date }: { date: string }) {
  const isToday = date === getTodayStr();

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="font-display leading-none select-none mb-8 text-primary opacity-5"
        style={{ fontSize: "clamp(6rem, 20vw, 12rem)" }}
        aria-hidden
      >
        REST
      </div>

      <Card className="max-w-sm w-full" style={{ borderTop: "3px solid var(--primary)" }}>
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
      className="animate-rise-in overflow-hidden"
      style={{
        animationDelay: `${index * 100}ms`,
        borderTop:      "3px solid var(--primary)",
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <CardHeader className="border-b border-border pb-4">
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

        <CardAction className="flex flex-col items-end gap-1.5 shrink-0">
          {duration && (
            <span className="font-display tracking-[0.2em] text-2xl leading-none text-primary">
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

      {/* ── Exercise list ───────────────────────────────────────────────── */}
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
    hasWeights ? "1fr" : null,
    "1fr",
    hasDuration ? "1fr" : null,
    hasRpe ? "1fr" : null,
  ].filter(Boolean).join(" ");

  return (
    <div className={`px-6 py-5 ${!isLast ? "border-b border-border" : ""}`}>

      {/* Exercise name + badge */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="font-display text-lg leading-none w-8 shrink-0 text-muted-foreground/40">
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
            className="grid text-[10px] tracking-[0.2em] uppercase text-muted-foreground/50 pb-2"
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
