import { db } from "@/db";
import {
  programs,
  programWorkouts,
  programWorkoutExercises,
} from "@/db/schema";
import { eq } from "drizzle-orm";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProgramExerciseInput = {
  exerciseId:   string;
  orderIndex:   number;
  targetSets:   number | null;
  targetReps:   number | null;
  targetWeight: string | null;
  notes:        string | null;
};

export type ProgramWorkoutInput = {
  weekNumber: number;
  dayNumber:  number;
  name:       string;
  notes:      string | null;
  exercises:  ProgramExerciseInput[];
};

export type CreateProgramInput = {
  userId:      string;
  name:        string;
  description: string | null;
  totalWeeks:  number;
  workouts:    ProgramWorkoutInput[];
};

// ─── Service Methods ──────────────────────────────────────────────────────────

/**
 * Creates a full training program with workouts and exercises.
 * Uses a transaction to ensure all-or-nothing creation.
 */
export async function createProgram(input: CreateProgramInput) {
  return await db.transaction(async (tx) => {
    // 1. Create the program header
    const [program] = await tx
      .insert(programs)
      .values({
        userId:      input.userId,
        name:        input.name,
        description: input.description,
        totalWeeks:  input.totalWeeks,
      })
      .returning({ id: programs.id });

    const programId = program.id;

    // 2. Process workouts
    for (const pw of input.workouts) {
      const [workout] = await tx
        .insert(programWorkouts)
        .values({
          programId,
          weekNumber: pw.weekNumber,
          dayNumber:  pw.dayNumber,
          name:       pw.name,
          notes:      pw.notes,
        })
        .returning({ id: programWorkouts.id });

      // 3. Batch insert exercises for this workout
      if (pw.exercises.length > 0) {
        await tx.insert(programWorkoutExercises).values(
          pw.exercises.map((ex) => ({
            programWorkoutId: workout.id,
            ...ex,
          }))
        );
      }
    }

    return { programId };
  });
}

/**
 * Deletes a program and all its dependencies (via cascade).
 */
export async function deleteProgram(programId: string, userId: string) {
  return await db
    .delete(programs)
    .where(eq(programs.id, programId))
    .returning();
}
