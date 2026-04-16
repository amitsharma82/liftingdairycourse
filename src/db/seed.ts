import { config } from 'dotenv';
config({ path: '.env' });
config({ path: '.env.local', override: true });

import { neon }     from '@neondatabase/serverless';
import { drizzle }  from 'drizzle-orm/neon-http';
import { isNull }   from 'drizzle-orm';
import { exercises } from './schema';

const sql = neon(process.env.DATABASE_URL!);
const db  = drizzle(sql);

// ─── Exercise library ─────────────────────────────────────────────────────────
// Push = chest, shoulders, triceps
// Pull = back, biceps
// Legs = legs, glutes

const SEED_EXERCISES = [
  // ── Push: Chest ──────────────────────────────────────────────────────────
  { name: 'Bench Press',              category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Incline Bench Press',      category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Decline Bench Press',      category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Dumbbell Fly',             category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Cable Fly',                category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Dumbbell Bench Press',     category: 'strength'   as const, muscleGroup: 'chest'     as const },

  // ── Push: Shoulders ──────────────────────────────────────────────────────
  { name: 'Overhead Press',           category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Dumbbell Shoulder Press',  category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Arnold Press',             category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Lateral Raises',           category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Front Raises',             category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Cable Lateral Raises',     category: 'strength'   as const, muscleGroup: 'shoulders' as const },

  // ── Push: Triceps ────────────────────────────────────────────────────────
  { name: 'Tricep Pushdown',          category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Skull Crushers',           category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Close Grip Bench Press',   category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Overhead Tricep Extension',category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Tricep Dips',              category: 'bodyweight' as const, muscleGroup: 'triceps'   as const },

  // ── Pull: Back ───────────────────────────────────────────────────────────
  { name: 'Deadlift',                 category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Barbell Row',              category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Pull-Ups',                 category: 'bodyweight' as const, muscleGroup: 'back'      as const },
  { name: 'Lat Pulldown',             category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Seated Cable Row',         category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Single Arm Dumbbell Row',  category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'T-Bar Row',                category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Face Pulls',               category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Chest Supported Row',      category: 'strength'   as const, muscleGroup: 'back'      as const },

  // ── Pull: Biceps ─────────────────────────────────────────────────────────
  { name: 'Barbell Curl',             category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Dumbbell Curl',            category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Hammer Curl',              category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Preacher Curl',            category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Incline Dumbbell Curl',    category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Cable Curl',               category: 'strength'   as const, muscleGroup: 'biceps'    as const },

  // ── Legs: Quads / Hamstrings ─────────────────────────────────────────────
  { name: 'Barbell Squat',            category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Romanian Deadlift',        category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Leg Press',                category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Bulgarian Split Squat',    category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Hack Squat',               category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Leg Curl',                 category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Leg Extension',            category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Walking Lunges',           category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Calf Raises',              category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Goblet Squat',             category: 'strength'   as const, muscleGroup: 'legs'      as const },

  // ── Legs: Glutes ─────────────────────────────────────────────────────────
  { name: 'Hip Thrust',               category: 'strength'   as const, muscleGroup: 'glutes'    as const },
  { name: 'Sumo Deadlift',            category: 'strength'   as const, muscleGroup: 'glutes'    as const },
  { name: 'Cable Kickback',           category: 'strength'   as const, muscleGroup: 'glutes'    as const },
  { name: 'Glute Bridge',             category: 'bodyweight' as const, muscleGroup: 'glutes'    as const },
];

async function seed() {
  // Check if global exercises already exist — skip if already seeded
  const existing = await db
    .select({ id: exercises.id })
    .from(exercises)
    .where(isNull(exercises.createdBy));

  if (existing.length > 0) {
    console.log(`✓ Already seeded (${existing.length} exercises found). Nothing to do.`);
    process.exit(0);
  }

  console.log(`Seeding ${SEED_EXERCISES.length} exercises…`);

  await db.insert(exercises).values(
    SEED_EXERCISES.map((e) => ({ ...e, createdBy: null })),
  );

  console.log('✓ Done.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
