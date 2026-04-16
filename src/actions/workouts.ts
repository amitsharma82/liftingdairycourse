"use server";

import { auth }     from "@clerk/nextjs/server";
import { db }       from "@/db";
import {
  workouts,
  workoutExercises,
  workoutSets,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";

// ─── Types ────────────────────────────────────────────────────────────────────

type SetInput = {
  setNumber:  number;
  weightKg:   string | null;
  reps:       number | null;
  rpe:        string | null;
  rir:        number | null;
};

type ExerciseInput = {
  exerciseId:  string;
  orderIndex:  number;
  sets:        SetInput[];
};

type LogWorkoutInput = {
  name:       string;
  startedAt:  Date;
  endedAt:    Date | null;
  notes:      string | null;
  exercises:  ExerciseInput[];
};

// ─── logWorkout ───────────────────────────────────────────────────────────────

export async function logWorkout(
  input: LogWorkoutInput,
): Promise<{ workoutId: string } | { error: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  try {
    // neon-http doesn't support inter-dependent awaits inside db.transaction(),
    // so we use sequential top-level inserts instead.

    // 1. Insert workout
    const [workout] = await db
      .insert(workouts)
      .values({
        userId,
        name:      input.name,
        startedAt: input.startedAt,
        endedAt:   input.endedAt ?? null,
        notes:     input.notes   ?? null,
      })
      .returning({ id: workouts.id });

    const workoutId = workout.id;

    // 2. Insert exercises + sets
    for (const ex of input.exercises) {
      const [we] = await db
        .insert(workoutExercises)
        .values({
          workoutId,
          exerciseId:  ex.exerciseId,
          orderIndex:  ex.orderIndex,
        })
        .returning({ id: workoutExercises.id });

      if (ex.sets.length > 0) {
        await db.insert(workoutSets).values(
          ex.sets.map((s) => ({
            workoutExerciseId: we.id,
            setNumber:         s.setNumber,
            weightKg:          s.weightKg ?? null,
            reps:              s.reps     ?? null,
            rpe:               s.rpe      ?? null,
            rir:               s.rir      ?? null,
          })),
        );
      }
    }

    return { workoutId };
  } catch (err) {
    console.error("[logWorkout]", err);
    return { error: "Failed to save workout" };
  }
}

// ─── deleteWorkout ────────────────────────────────────────────────────────────

export async function deleteWorkout(workoutId: string): Promise<{ error?: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  // Verify ownership before deleting — prevents IDOR
  const [row] = await db
    .select({ id: workouts.id })
    .from(workouts)
    .where(and(eq(workouts.id, workoutId), eq(workouts.userId, userId)));

  if (!row) return { error: "Not found" };

  await db.delete(workouts).where(eq(workouts.id, workoutId));

  return {};
}
