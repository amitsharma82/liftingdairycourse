import { db } from '@/db';
import { workouts } from '@/db/schema';
import { eq, and, gte, lte } from 'drizzle-orm';

export async function getWorkoutsByDate(userId: string, date: string) {
  const start = new Date(`${date}T00:00:00.000Z`);
  const end   = new Date(`${date}T23:59:59.999Z`);

  return db.query.workouts.findMany({
    where: and(
      eq(workouts.userId, userId),
      gte(workouts.startedAt, start),
      lte(workouts.startedAt, end),
    ),
    with: {
      workoutExercises: {
        orderBy: (we, { asc }) => [asc(we.orderIndex)],
        with: {
          exercise: true,
          workoutSets: {
            orderBy: (ws, { asc }) => [asc(ws.setNumber)],
          },
        },
      },
    },
    orderBy: (w, { asc }) => [asc(w.startedAt)],
  });
}

export async function getWorkoutDates(userId: string): Promise<string[]> {
  const rows = await db
    .select({ startedAt: workouts.startedAt })
    .from(workouts)
    .where(eq(workouts.userId, userId));

  const dates = new Set(rows.map(r => r.startedAt.toISOString().slice(0, 10)));
  return [...dates];
}
