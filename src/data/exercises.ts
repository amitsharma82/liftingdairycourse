import { db }       from '@/db';
import { exercises, workouts, workoutExercises, workoutSets } from '@/db/schema';
import { eq, or, isNull, asc, and, inArray, desc } from 'drizzle-orm';

export type LastSession = {
  /** ISO date string — safe to pass to client components */
  date: string;
  sets: { setNumber: number; weightKg: string | null; reps: number | null }[];
};

export async function getAllExercises(userId: string) {
  return db
    .select()
    .from(exercises)
    .where(
      or(
        isNull(exercises.createdBy),
        eq(exercises.createdBy, userId),
      ),
    )
    .orderBy(asc(exercises.muscleGroup), asc(exercises.name));
}

/**
 * Returns the exercise IDs the user did in their most recent workout that
 * contained any exercise from the given muscle groups. Used to avoid
 * repeating the same exercises session-over-session.
 */
export async function getRecentlyUsedExerciseIds(
  userId: string,
  muscleGroups: string[],
): Promise<string[]> {
  // Find the most recent workout that contained exercises from these muscles
  const [recent] = await db
    .select({ workoutId: workouts.id })
    .from(workouts)
    .innerJoin(workoutExercises, eq(workoutExercises.workoutId, workouts.id))
    .innerJoin(exercises, eq(exercises.id, workoutExercises.exerciseId))
    .where(and(
      eq(workouts.userId, userId),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      inArray(exercises.muscleGroup, muscleGroups as any[]),
    ))
    .orderBy(desc(workouts.startedAt))
    .limit(1);

  if (!recent) return [];

  // Return all exercise IDs logged in that workout
  const rows = await db
    .select({ exerciseId: workoutExercises.exerciseId })
    .from(workoutExercises)
    .where(eq(workoutExercises.workoutId, recent.workoutId));

  return rows.map(r => r.exerciseId);
}

/**
 * For each exercise ID, returns the sets from the most recent session
 * the user performed it. Used to show "last time" reference while logging.
 */
export async function getLastSetsForExercises(
  userId: string,
  exerciseIds: string[],
): Promise<Record<string, LastSession>> {
  if (exerciseIds.length === 0) return {};

  // Find all workoutExercise rows for these exercises, ordered newest first
  const rows = await db
    .select({
      exerciseId:        workoutExercises.exerciseId,
      workoutExerciseId: workoutExercises.id,
      startedAt:         workouts.startedAt,
    })
    .from(workoutExercises)
    .innerJoin(workouts, eq(workouts.id, workoutExercises.workoutId))
    .where(and(
      eq(workouts.userId, userId),
      inArray(workoutExercises.exerciseId, exerciseIds),
    ))
    .orderBy(desc(workouts.startedAt));

  // Keep only the most recent workoutExercise per exercise
  const mostRecent = new Map<string, { workoutExerciseId: string; startedAt: Date }>();
  for (const row of rows) {
    if (!mostRecent.has(row.exerciseId)) {
      mostRecent.set(row.exerciseId, {
        workoutExerciseId: row.workoutExerciseId,
        startedAt:         row.startedAt,
      });
    }
  }

  if (mostRecent.size === 0) return {};

  // Fetch all sets for those workoutExercise IDs in one query
  const weIds = [...mostRecent.values()].map(v => v.workoutExerciseId);
  const sets  = await db
    .select({
      workoutExerciseId: workoutSets.workoutExerciseId,
      setNumber:         workoutSets.setNumber,
      weightKg:          workoutSets.weightKg,
      reps:              workoutSets.reps,
    })
    .from(workoutSets)
    .where(inArray(workoutSets.workoutExerciseId, weIds))
    .orderBy(asc(workoutSets.setNumber));

  // Build the result map
  const result: Record<string, LastSession> = {};
  for (const [exerciseId, { workoutExerciseId, startedAt }] of mostRecent) {
    result[exerciseId] = {
      date: startedAt.toISOString(),
      sets: sets
        .filter(s => s.workoutExerciseId === workoutExerciseId)
        .map(s => ({ setNumber: s.setNumber, weightKg: s.weightKg, reps: s.reps })),
    };
  }
  return result;
}
