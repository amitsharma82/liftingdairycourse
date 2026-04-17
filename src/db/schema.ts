import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  numeric,
  timestamp,
  date,
} from 'drizzle-orm/pg-core';

// ─── Enums ────────────────────────────────────────────────────────────────────

export const categoryEnum = pgEnum('category', [
  'strength',
  'cardio',
  'bodyweight',
  'olympic',
  'stretching',
]);

export const muscleGroupEnum = pgEnum('muscle_group', [
  'chest',
  'back',
  'shoulders',
  'biceps',
  'triceps',
  'legs',
  'glutes',
  'core',
  'full_body',
  'other',
]);

export const genderEnum = pgEnum('gender', [
  'male', 'female', 'other', 'prefer_not_to_say',
]);

export const fitnessGoalEnum = pgEnum('fitness_goal', [
  'lose_weight', 'build_muscle', 'maintain', 'improve_fitness',
]);

export const activityLevelEnum = pgEnum('activity_level', [
  'sedentary', 'light', 'moderate', 'active', 'very_active',
]);

// ─── User Profiles ────────────────────────────────────────────────────────────

export const userProfiles = pgTable('user_profiles', {
  userId:        text('user_id').primaryKey(),
  displayName:   text('display_name'),
  avatarEmoji:   text('avatar_emoji'),
  gender:        genderEnum('gender'),
  dateOfBirth:   date('date_of_birth'),
  heightCm:      numeric('height_cm'),
  weightKg:      numeric('weight_kg'),
  fitnessGoal:   fitnessGoalEnum('fitness_goal'),
  activityLevel: activityLevelEnum('activity_level'),
  createdAt:     timestamp('created_at').notNull().defaultNow(),
  updatedAt:     timestamp('updated_at').notNull().defaultNow(),
});

// ─── Exercise Library ─────────────────────────────────────────────────────────

export const exercises = pgTable('exercises', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  category: categoryEnum('category').notNull(),
  muscleGroup: muscleGroupEnum('muscle_group').notNull(),
  // NULL = global/system exercise; Clerk user ID = user-created
  createdBy: text('created_by'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ─── Programs & Templates ─────────────────────────────────────────────────────

export const programs = pgTable('programs', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(), // Clerk user ID
  name: text('name').notNull(),
  description: text('description'),
  totalWeeks: integer('total_weeks').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const programWorkouts = pgTable('program_workouts', {
  id: uuid('id').defaultRandom().primaryKey(),
  programId: uuid('program_id')
    .notNull()
    .references(() => programs.id, { onDelete: 'cascade' }),
  weekNumber: integer('week_number').notNull(),
  dayNumber: integer('day_number').notNull(), // 1–7
  name: text('name').notNull(),
  notes: text('notes'),
});

export const programWorkoutExercises = pgTable('program_workout_exercises', {
  id: uuid('id').defaultRandom().primaryKey(),
  programWorkoutId: uuid('program_workout_id')
    .notNull()
    .references(() => programWorkouts.id, { onDelete: 'cascade' }),
  exerciseId: uuid('exercise_id')
    .notNull()
    .references(() => exercises.id),
  orderIndex: integer('order_index').notNull(),
  targetSets: integer('target_sets'),
  targetReps: integer('target_reps'),
  targetWeight: numeric('target_weight'), // kg
  notes: text('notes'),
});

// ─── Workout Logging ──────────────────────────────────────────────────────────

export const workouts = pgTable('workouts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(), // Clerk user ID
  // NULL = ad hoc session; set = following a program slot
  programWorkoutId: uuid('program_workout_id').references(
    () => programWorkouts.id,
  ),
  name: text('name').notNull(),
  startedAt: timestamp('started_at').notNull(),
  endedAt: timestamp('ended_at'),
  notes: text('notes'),
});

export const workoutExercises = pgTable('workout_exercises', {
  id: uuid('id').defaultRandom().primaryKey(),
  workoutId: uuid('workout_id')
    .notNull()
    .references(() => workouts.id, { onDelete: 'cascade' }),
  exerciseId: uuid('exercise_id')
    .notNull()
    .references(() => exercises.id),
  orderIndex: integer('order_index').notNull(),
  notes: text('notes'),
});

export const workoutSets = pgTable('workout_sets', {
  id: uuid('id').defaultRandom().primaryKey(),
  workoutExerciseId: uuid('workout_exercise_id')
    .notNull()
    .references(() => workoutExercises.id, { onDelete: 'cascade' }),
  setNumber: integer('set_number').notNull(),
  weightKg: numeric('weight_kg'),
  reps: integer('reps'),
  durationSeconds: integer('duration_seconds'),
  rpe: numeric('rpe'),   // 1.0–10.0
  rir: integer('rir'),   // reps in reserve
  restSeconds: integer('rest_seconds'),
  notes: text('notes'),
  loggedAt: timestamp('logged_at').notNull().defaultNow(),
});
