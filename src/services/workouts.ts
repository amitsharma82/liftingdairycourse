import { db } from "@/db";
import {
  workouts,
  workoutExercises,
  workoutSets,
} from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { z } from "zod";

// ─── Schemas ──────────────────────────────────────────────────────────────────

export const SetInputSchema = z.object({
  setNumber:  z.number(),
  weightKg:   z.string().nullable(),
  reps:       z.number().nullable(),
  rpe:        z.string().nullable(),
  rir:        z.number().nullable(),
});

export const ExerciseInputSchema = z.object({
  exerciseId:  z.string().uuid(),
  orderIndex:  z.number(),
  sets:        z.array(SetInputSchema),
});

export const CreateWorkoutSchema = z.object({
  userId:     z.string(),
  name:       z.string().min(1, "Session name is required"),
  startedAt:  z.date(),
  endedAt:    z.date().nullable(),
  notes:      z.string().nullable(),
  exercises:  z.array(ExerciseInputSchema).min(1, "At least one exercise is required"),
});

// ─── Types ────────────────────────────────────────────────────────────────────

export type SetInput = z.infer<typeof SetInputSchema>;
export type ExerciseInput = z.infer<typeof ExerciseInputSchema>;
export type CreateWorkoutInput = z.infer<typeof CreateWorkoutSchema>;

// ─── Service Methods ──────────────────────────────────────────────────────────

/**
 * Creates a workout session with all associated exercises and sets.
 * Uses a transaction to ensure atomicity.
 */
export async function createWorkout(rawInput: CreateWorkoutInput) {
  // Validate input at runtime
  const input = CreateWorkoutSchema.parse(rawInput);

  return await db.transaction(async (tx) => {
    // 1. Insert workout
    const [workout] = await tx
      .insert(workouts)
      .values({
        userId:    input.userId,
        name:      input.name,
        startedAt: input.startedAt,
        endedAt:   input.endedAt,
        notes:     input.notes,
      })
      .returning({ id: workouts.id });

    const workoutId = workout.id;

    // 2. Insert exercises in batch if any exist
    if (input.exercises.length > 0) {
      const exerciseRows = await tx
        .insert(workoutExercises)
        .values(
          input.exercises.map((ex) => ({
            workoutId,
            exerciseId:  ex.exerciseId,
            orderIndex:  ex.orderIndex,
          }))
        )
        .returning({ id: workoutExercises.id });

      // 3. Collect and batch insert all sets
      const setValues = input.exercises.flatMap((ex, i) =>
        ex.sets.map((s) => ({
          workoutExerciseId: exerciseRows[i].id,
          setNumber:         s.setNumber,
          weightKg:          s.weightKg,
          reps:              s.reps,
          rpe:               s.rpe,
          rir:               s.rir,
        }))
      );

      if (setValues.length > 0) {
        await tx.insert(workoutSets).values(setValues);
      }
    }

    return { workoutId };
  });
}

/**
 * Deletes a workout session. Ownership check is performed here.
 */
export async function deleteWorkout(workoutId: string, userId: string) {
  const [row] = await db
    .select({ id: workouts.id })
    .from(workouts)
    .where(and(eq(workouts.id, workoutId), eq(workouts.userId, userId)));

  if (!row) {
    throw new Error("Workout not found or unauthorized");
  }

  await db.delete(workouts).where(eq(workouts.id, workoutId));
  return { success: true };
}
