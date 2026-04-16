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
  { name: 'Bench Press',                        category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Incline Bench Press',                category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Decline Bench Press',                category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Dumbbell Bench Press',               category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Incline Dumbbell Press',             category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Dumbbell Fly',                       category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Incline Dumbbell Fly',               category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Decline Dumbbell Fly',               category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Cable Fly',                          category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Low Cable Fly',                      category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'High Cable Fly',                     category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Machine Chest Press',                category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Smith Machine Bench Press',          category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Pec Deck',                           category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Push-Ups',                           category: 'bodyweight' as const, muscleGroup: 'chest'     as const },
  { name: 'Floor Press',                        category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Landmine Press',                     category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Dumbbell Pullover',                  category: 'strength'   as const, muscleGroup: 'chest'     as const },
  { name: 'Svend Press',                        category: 'strength'   as const, muscleGroup: 'chest'     as const },

  // ── Push: Shoulders ──────────────────────────────────────────────────────
  { name: 'Overhead Press',                     category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Dumbbell Shoulder Press',            category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Machine Shoulder Press',             category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Arnold Press',                       category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Push Press',                         category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Behind The Neck Press',              category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Z Press',                            category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Bradford Press',                     category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Lateral Raises',                     category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Cable Lateral Raises',               category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Landmine Lateral Raise',             category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Front Raises',                       category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Cable Front Raise',                  category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Upright Row',                        category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Cable Upright Row',                  category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Rear Delt Fly',                      category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Reverse Fly',                        category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Bent Over Lateral Raise',            category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Cable Face Pull',                    category: 'strength'   as const, muscleGroup: 'shoulders' as const },
  { name: 'Cable Rear Delt Fly',                category: 'strength'   as const, muscleGroup: 'shoulders' as const },

  // ── Push: Triceps ────────────────────────────────────────────────────────
  { name: 'Tricep Pushdown',                    category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Rope Tricep Pushdown',               category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Reverse Grip Tricep Pushdown',       category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Single Arm Tricep Pushdown',         category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Skull Crushers',                     category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Close Grip Bench Press',             category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Overhead Tricep Extension',          category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Cable Overhead Tricep Extension',    category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Dumbbell Overhead Tricep Extension', category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Tricep Dips',                        category: 'bodyweight' as const, muscleGroup: 'triceps'   as const },
  { name: 'Bench Dips',                         category: 'bodyweight' as const, muscleGroup: 'triceps'   as const },
  { name: 'Diamond Push-Ups',                   category: 'bodyweight' as const, muscleGroup: 'triceps'   as const },
  { name: 'Tricep Kickback',                    category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'JM Press',                           category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Tate Press',                         category: 'strength'   as const, muscleGroup: 'triceps'   as const },
  { name: 'Machine Tricep Extension',           category: 'strength'   as const, muscleGroup: 'triceps'   as const },

  // ── Pull: Back ───────────────────────────────────────────────────────────
  { name: 'Deadlift',                           category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Rack Pull',                          category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Barbell Row',                        category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Pendlay Row',                        category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Meadows Row',                        category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Seal Row',                           category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Kroc Row',                           category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Incline Dumbbell Row',               category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Single Arm Dumbbell Row',            category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Renegade Row',                       category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'T-Bar Row',                          category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Chest Supported Row',                category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Machine Row',                        category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Pull-Ups',                           category: 'bodyweight' as const, muscleGroup: 'back'      as const },
  { name: 'Chin-Ups',                           category: 'bodyweight' as const, muscleGroup: 'back'      as const },
  { name: 'Weighted Pull-Ups',                  category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Lat Pulldown',                       category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Underhand Lat Pulldown',             category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Seated Cable Row',                   category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Wide Grip Cable Row',                category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Straight Arm Pulldown',              category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Cable Pullover',                     category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Face Pulls',                         category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Good Mornings',                      category: 'strength'   as const, muscleGroup: 'back'      as const },
  { name: 'Back Extension',                     category: 'strength'   as const, muscleGroup: 'back'      as const },

  // ── Pull: Biceps ─────────────────────────────────────────────────────────
  { name: 'Barbell Curl',                       category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'EZ Bar Curl',                        category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: '21s Barbell Curl',                   category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Dumbbell Curl',                      category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Incline Dumbbell Curl',              category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Concentration Curl',                 category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Spider Curl',                        category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Drag Curl',                          category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Hammer Curl',                        category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Cross Body Hammer Curl',             category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Zottman Curl',                       category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Reverse Curl',                       category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Preacher Curl',                      category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Machine Curl',                       category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Cable Curl',                         category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Bayesian Cable Curl',                category: 'strength'   as const, muscleGroup: 'biceps'    as const },
  { name: 'Cable Hammer Curl',                  category: 'strength'   as const, muscleGroup: 'biceps'    as const },

  // ── Legs: Quads / Hamstrings ─────────────────────────────────────────────
  { name: 'Barbell Squat',                      category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Front Squat',                        category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Box Squat',                          category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Pause Squat',                        category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Tempo Squat',                        category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Overhead Squat',                     category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Zercher Squat',                      category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Jefferson Squat',                    category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Safety Bar Squat',                   category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Smith Machine Squat',                category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Goblet Squat',                       category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Sumo Squat',                         category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Hack Squat',                         category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Leg Press',                          category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Leg Extension',                      category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Leg Curl',                           category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Seated Leg Curl',                    category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Standing Leg Curl',                  category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Nordic Hamstring Curl',              category: 'bodyweight' as const, muscleGroup: 'legs'      as const },
  { name: 'Romanian Deadlift',                  category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Stiff Leg Deadlift',                 category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Single Leg Romanian Deadlift',       category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Bulgarian Split Squat',              category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Split Squat',                        category: 'bodyweight' as const, muscleGroup: 'legs'      as const },
  { name: 'Walking Lunges',                     category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Dumbbell Lunges',                    category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Reverse Lunges',                     category: 'bodyweight' as const, muscleGroup: 'legs'      as const },
  { name: 'Lateral Lunges',                     category: 'bodyweight' as const, muscleGroup: 'legs'      as const },
  { name: 'Step-Ups',                           category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Dumbbell Step-Ups',                  category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Sissy Squat',                        category: 'bodyweight' as const, muscleGroup: 'legs'      as const },
  { name: 'Calf Raises',                        category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Seated Calf Raise',                  category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Single Leg Calf Raise',              category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Leg Press Calf Raise',               category: 'strength'   as const, muscleGroup: 'legs'      as const },
  { name: 'Cable Pull-Through',                 category: 'strength'   as const, muscleGroup: 'legs'      as const },

  // ── Legs: Glutes ─────────────────────────────────────────────────────────
  { name: 'Hip Thrust',                         category: 'strength'   as const, muscleGroup: 'glutes'    as const },
  { name: 'Banded Hip Thrust',                  category: 'strength'   as const, muscleGroup: 'glutes'    as const },
  { name: 'Single Leg Hip Thrust',              category: 'strength'   as const, muscleGroup: 'glutes'    as const },
  { name: 'Deficit Hip Thrust',                 category: 'strength'   as const, muscleGroup: 'glutes'    as const },
  { name: 'Smith Machine Hip Thrust',           category: 'strength'   as const, muscleGroup: 'glutes'    as const },
  { name: 'Sumo Deadlift',                      category: 'strength'   as const, muscleGroup: 'glutes'    as const },
  { name: 'Cable Kickback',                     category: 'strength'   as const, muscleGroup: 'glutes'    as const },
  { name: 'Glute Bridge',                       category: 'bodyweight' as const, muscleGroup: 'glutes'    as const },
  { name: 'Banded Glute Bridge',                category: 'strength'   as const, muscleGroup: 'glutes'    as const },
  { name: 'Single Leg Glute Bridge',            category: 'bodyweight' as const, muscleGroup: 'glutes'    as const },
  { name: 'Donkey Kicks',                       category: 'bodyweight' as const, muscleGroup: 'glutes'    as const },
  { name: 'Fire Hydrants',                      category: 'bodyweight' as const, muscleGroup: 'glutes'    as const },
  { name: 'Side-Lying Clamshell',               category: 'bodyweight' as const, muscleGroup: 'glutes'    as const },
  { name: 'Reverse Hyperextension',             category: 'strength'   as const, muscleGroup: 'glutes'    as const },
  { name: 'Frog Pumps',                         category: 'bodyweight' as const, muscleGroup: 'glutes'    as const },

  // ── Core ─────────────────────────────────────────────────────────────────
  { name: 'Plank',                              category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Side Plank',                         category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Hollow Body Hold',                   category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Dead Bug',                           category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Ab Crunch',                          category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Decline Crunch',                     category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Reverse Crunch',                     category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Bicycle Crunch',                     category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Weighted Crunch',                    category: 'strength'   as const, muscleGroup: 'core'      as const },
  { name: 'Cable Crunch',                       category: 'strength'   as const, muscleGroup: 'core'      as const },
  { name: 'Decline Weighted Crunch',            category: 'strength'   as const, muscleGroup: 'core'      as const },
  { name: 'Leg Raises',                         category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Hanging Leg Raises',                 category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Toes To Bar',                        category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'L-Sit',                              category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Dragon Flag',                        category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Ab Rollout',                         category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Russian Twist',                      category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'V-Ups',                              category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Flutter Kicks',                      category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Mountain Climbers',                  category: 'bodyweight' as const, muscleGroup: 'core'      as const },
  { name: 'Pallof Press',                       category: 'strength'   as const, muscleGroup: 'core'      as const },
  { name: 'Woodchop',                           category: 'strength'   as const, muscleGroup: 'core'      as const },
  { name: 'Landmine Rotation',                  category: 'strength'   as const, muscleGroup: 'core'      as const },
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
