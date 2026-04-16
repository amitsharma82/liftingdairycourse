"use client";

import { motion }               from "motion/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge }     from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Info, Play, RefreshCw } from "lucide-react";
import SetRow, { type SetData, emptySet } from "./set-row";
import type { getAllExercises } from "@/data/exercises";
import type { LastSession }    from "@/data/exercises";
import { EXERCISE_INFO }   from "@/lib/exercise-info";
import { EXERCISE_IMAGES } from "@/lib/exercise-images";

type Exercise = Awaited<ReturnType<typeof getAllExercises>>[number];

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

function relativeDate(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7)  return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function fmtKg(kg: string | null): string {
  if (!kg) return "—";
  const n = parseFloat(kg);
  return Number.isInteger(n) ? `${n}` : n.toFixed(1);
}

export default function ExerciseBlock({
  exercise,
  sets,
  alternatives,
  onSetsChange,
  onRemove,
  onSwap,
  lastSession,
}: {
  exercise:     Exercise;
  sets:         SetData[];
  alternatives: Exercise[];
  onSetsChange: (sets: SetData[]) => void;
  onRemove:     () => void;
  onSwap:       (newExercise: Exercise) => void;
  lastSession:  LastSession | null;
}) {
  const muscleStyle = MUSCLE_STYLE[exercise.muscleGroup] ?? MUSCLE_STYLE.other;
  const muscleLabel = MUSCLE_LABEL[exercise.muscleGroup] ?? "OTHER";

  function addSet() {
    const prev = sets[sets.length - 1];
    onSetsChange([...sets, emptySet(prev?.weightKg)]);
  }

  function removeSet(i: number) {
    onSetsChange(sets.filter((_, idx) => idx !== i));
  }

  function updateSet(i: number, field: keyof SetData, value: string | boolean) {
    onSetsChange(
      sets.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)),
    );
  }

  const info      = EXERCISE_INFO[exercise.name];
  const imgUrl    = EXERCISE_IMAGES[exercise.name];
  const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(exercise.name + " exercise tutorial proper form")}`;

  return (
    <div className="border border-border rounded-sm overflow-hidden">
      {/* ── Exercise header ────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Thumbnail */}
          {imgUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imgUrl}
              alt={exercise.name}
              width={44}
              height={44}
              className="w-11 h-11 rounded-sm object-cover shrink-0 bg-muted"
            />
          )}
          <span
            className="font-display tracking-[0.12em] leading-none"
            style={{ fontSize: "1.05rem" }}
          >
            {exercise.name.toUpperCase()}
          </span>
          <Badge
            variant="outline"
            className={`text-[10px] tracking-[0.18em] uppercase font-medium ${muscleStyle}`}
          >
            {muscleLabel}
          </Badge>

          {/* ── How-to dialog trigger ─────────────────────────────────── */}
          <Dialog>
            <DialogTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="icon-sm"
                  aria-label={`How to do ${exercise.name}`}
                  className="h-7 w-7 text-primary/80 border-primary/40 bg-primary/8 hover:text-primary hover:border-primary hover:bg-primary/20"
                />
              }
            >
              <Info size={13} />
            </DialogTrigger>

            <DialogContent className="sm:max-w-md" showCloseButton>
              <DialogHeader>
                <DialogTitle className="font-display tracking-[0.12em] text-lg leading-none">
                  {exercise.name.toUpperCase()}
                </DialogTitle>
                <div className="pt-1">
                  <Badge
                    variant="outline"
                    className={`text-[10px] tracking-[0.18em] uppercase font-medium ${muscleStyle}`}
                  >
                    {muscleLabel}
                  </Badge>
                </div>
              </DialogHeader>

              {/* Exercise image */}
              {imgUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imgUrl}
                  alt={exercise.name}
                  className="w-full h-44 object-cover rounded-sm bg-muted"
                />
              )}

              {/* Steps */}
              <ol className="space-y-3 py-1">
                {(info?.steps ?? ["No instructions available yet."]).map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="font-display text-primary tabular-nums w-5 shrink-0 mt-px">
                      {i + 1}.
                    </span>
                    <span className="text-sm text-muted-foreground leading-relaxed">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              {/* Tip */}
              {info?.tip && (
                <p className="text-xs text-cyan-400 border border-cyan-400/20 rounded-sm px-3 py-2 bg-cyan-400/5 leading-relaxed">
                  <span className="font-medium uppercase tracking-widest mr-1.5">Tip</span>
                  {info.tip}
                </p>
              )}

              <DialogFooter>
                <a
                  href={youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ variant: "outline", size: "sm" }) +
                    " tracking-[0.15em] text-xs uppercase gap-1.5"}
                >
                  <Play size={11} />
                  Watch Tutorial
                </a>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* ── Right-side actions ────────────────────────────────────── */}
        <div className="flex items-center gap-1 shrink-0">

          {/* Swap exercise */}
          <Dialog>
            <DialogTrigger
              render={
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 text-cyan-400/80 border-cyan-400/40 bg-cyan-400/8 hover:text-cyan-400 hover:border-cyan-400 hover:bg-cyan-400/20"
                  aria-label={`Swap ${exercise.name}`}
                />
              }
            >
              <RefreshCw size={14} />
            </DialogTrigger>

            <DialogContent className="sm:max-w-sm" showCloseButton>
              <DialogHeader>
                <DialogTitle className="font-display tracking-[0.12em] text-base leading-none">
                  SWAP EXERCISE
                </DialogTitle>
                <DialogDescription className="text-xs tracking-widest uppercase text-muted-foreground/60">
                  {exercise.name} → choose a {MUSCLE_LABEL[exercise.muscleGroup] ?? exercise.muscleGroup} alternative
                </DialogDescription>
              </DialogHeader>

              {alternatives.length === 0 ? (
                <p className="text-sm text-muted-foreground py-2">
                  No other {MUSCLE_LABEL[exercise.muscleGroup] ?? exercise.muscleGroup.toLowerCase()} exercises available — all are already in your session.
                </p>
              ) : (
                <div className="space-y-1 max-h-72 overflow-y-auto -mx-1">
                  {alternatives.map(alt => (
                    <DialogClose
                      key={alt.id}
                      onClick={() => onSwap(alt)}
                      render={
                        <Button
                          type="button"
                          variant="ghost"
                          className="w-full justify-start gap-3 px-3 h-auto py-2.5"
                        />
                      }
                    >
                      <span
                        className="font-display tracking-[0.1em] leading-none text-left"
                        style={{ fontSize: "0.9rem" }}
                      >
                        {alt.name.toUpperCase()}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[10px] tracking-[0.15em] uppercase font-medium ml-auto shrink-0 ${MUSCLE_STYLE[alt.muscleGroup] ?? MUSCLE_STYLE.other}`}
                      >
                        {MUSCLE_LABEL[alt.muscleGroup] ?? "OTHER"}
                      </Badge>
                    </DialogClose>
                  ))}
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Remove exercise */}
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="h-8 w-8 text-destructive/70 border-destructive/40 bg-destructive/8 hover:text-destructive hover:border-destructive hover:bg-destructive/20"
            onClick={onRemove}
            aria-label={`Remove ${exercise.name}`}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </div>

      {/* ── Last session reference ────────────────────────────────────── */}
      {lastSession && lastSession.sets.length > 0 && (
        <div className="mx-4 mb-0 mt-0 flex items-center gap-3 px-3 py-2 border border-cyan-400/25 bg-cyan-400/5 border-l-2 border-l-cyan-400/70">
          <span className="text-[9px] text-cyan-400 tracking-[0.3em] uppercase font-medium shrink-0">
            Last
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 flex-1 min-w-0">
            {lastSession.sets.map((s) => (
              <span
                key={s.setNumber}
                className="text-xs font-display text-cyan-300/90 tabular-nums tracking-wide whitespace-nowrap"
              >
                {fmtKg(s.weightKg)}kg × {s.reps ?? "—"}
              </span>
            ))}
          </div>
          <span className="text-[9px] text-cyan-400/55 tracking-widest uppercase shrink-0">
            {relativeDate(lastSession.date)}
          </span>
        </div>
      )}

      {/* ── Sets ──────────────────────────────────────────────────────── */}
      <div className="px-4 py-3 space-y-2">
        {sets.length > 0 && (
          <>
            {/* Column headers */}
            <div className="flex items-center gap-2 mb-1">
              <span className="w-6" />
              <span className="w-20 text-right text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                KG
              </span>
              <span className="w-6" />
              <span className="w-20 text-right text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                REPS
              </span>
            </div>
            <Separator />
          </>
        )}

        {/* ── Staggered set rows (magic 21 pattern) ──────────────────── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden:  {},
            visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
          }}
        >
          {sets.map((set, i) => (
            <motion.div
              key={i}
              variants={{
                hidden:  { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 130, damping: 16 } },
              }}
            >
              <SetRow
                set={set}
                index={i}
                onChange={(field, value) => updateSet(i, field, value)}
                onRemove={() => removeSet(i)}
              />
            </motion.div>
          ))}
        </motion.div>

        {sets.length === 0 && (
          <p className="text-muted-foreground text-xs tracking-widest uppercase py-1">
            No sets — add one below
          </p>
        )}
      </div>

      {/* ── Add set ───────────────────────────────────────────────────── */}
      <div className="px-4 pb-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSet}
          className="w-full tracking-[0.2em] text-xs uppercase text-primary border-primary/30 hover:bg-primary/10 hover:text-primary"
        >
          <Plus size={12} className="mr-1" />
          ADD SET
        </Button>
      </div>
    </div>
  );
}
