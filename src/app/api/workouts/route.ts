import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import {
  workouts,
  workoutExercises,
  workoutSets,
  exercises,
} from "@/db/schema";
import { eq, and, gte, lt, asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ workouts: [] }, { status: 401 });

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const [year, month, day] = date.split("-").map(Number);
  const dateStart = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  const dateEnd   = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999));

  try {
    const rows = await db
      .select({
        workoutId:        workouts.id,
        workoutName:      workouts.name,
        workoutStartedAt: workouts.startedAt,
        workoutEndedAt:   workouts.endedAt,
        workoutNotes:     workouts.notes,
        weId:             workoutExercises.id,
        weOrder:          workoutExercises.orderIndex,
        exName:           exercises.name,
        exCategory:       exercises.category,
        exMuscleGroup:    exercises.muscleGroup,
        setId:            workoutSets.id,
        setNumber:        workoutSets.setNumber,
        setWeightKg:      workoutSets.weightKg,
        setReps:          workoutSets.reps,
        setDuration:      workoutSets.durationSeconds,
        setRpe:           workoutSets.rpe,
        setRir:           workoutSets.rir,
        setRest:          workoutSets.restSeconds,
      })
      .from(workouts)
      .leftJoin(workoutExercises, eq(workoutExercises.workoutId, workouts.id))
      .leftJoin(exercises, eq(exercises.id, workoutExercises.exerciseId))
      .leftJoin(workoutSets, eq(workoutSets.workoutExerciseId, workoutExercises.id))
      .where(
        and(
          eq(workouts.userId, userId),
          gte(workouts.startedAt, dateStart),
          lt(workouts.startedAt, dateEnd)
        )
      )
      .orderBy(
        asc(workouts.startedAt),
        asc(workoutExercises.orderIndex),
        asc(workoutSets.setNumber)
      );

    // ── Group rows into nested structure ──────────────────────────────────────

    type SetRow = {
      id: string; setNumber: number; weightKg: string | null;
      reps: number | null; durationSeconds: number | null;
      rpe: string | null; rir: number | null; restSeconds: number | null;
    };
    type ExRow = {
      id: string; name: string; category: string;
      muscleGroup: string; sets: SetRow[];
    };
    type WorkoutRow = {
      id: string; name: string; startedAt: string; endedAt: string | null;
      notes: string | null; exercises: ExRow[];
    };

    const wMap = new Map<string, { data: WorkoutRow; exMap: Map<string, ExRow> }>();

    for (const r of rows) {
      if (!wMap.has(r.workoutId)) {
        wMap.set(r.workoutId, {
          data: {
            id:        r.workoutId,
            name:      r.workoutName,
            startedAt: r.workoutStartedAt.toISOString(),
            endedAt:   r.workoutEndedAt?.toISOString() ?? null,
            notes:     r.workoutNotes,
            exercises: [],
          },
          exMap: new Map(),
        });
      }

      const entry = wMap.get(r.workoutId)!;

      if (r.weId) {
        if (!entry.exMap.has(r.weId)) {
          const ex: ExRow = {
            id:          r.weId,
            name:        r.exName ?? "Unknown",
            category:    r.exCategory ?? "strength",
            muscleGroup: r.exMuscleGroup ?? "other",
            sets:        [],
          };
          entry.exMap.set(r.weId, ex);
          entry.data.exercises.push(ex);
        }

        const ex = entry.exMap.get(r.weId)!;
        if (r.setId) {
          ex.sets.push({
            id:              r.setId,
            setNumber:       r.setNumber!,
            weightKg:        r.setWeightKg,
            reps:            r.setReps,
            durationSeconds: r.setDuration,
            rpe:             r.setRpe,
            rir:             r.setRir,
            restSeconds:     r.setRest,
          });
        }
      }
    }

    const result: WorkoutRow[] = Array.from(wMap.values()).map(e => e.data);
    return NextResponse.json({ workouts: result });
  } catch (err) {
    console.error("[/api/workouts] DB error:", err);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
