# Workout Schema Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Define and migrate the fully normalized Drizzle ORM schema for workouts, exercises, programs, and sets into the existing empty `src/db/schema.ts`.

**Architecture:** Seven tables defined in `src/db/schema.ts` — two pgEnum types, an exercise library table, three program/template tables, and three logging tables. Tables are defined in dependency order so foreign key references resolve correctly. Migration is generated with drizzle-kit and applied to Neon.

**Tech Stack:** Drizzle ORM (`drizzle-orm/pg-core`), drizzle-kit, Neon serverless PostgreSQL, TypeScript, Next.js App Router.

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `src/db/schema.ts` | Modify | All Drizzle table + enum definitions |
| `drizzle/` | Created by drizzle-kit | Generated migration SQL files |

---

## Task 1: Write the schema

**Files:**
- Modify: `src/db/schema.ts`

- [ ] **Step 1: Replace the contents of `src/db/schema.ts` with the full schema**

```ts
import {
  pgTable,
  pgEnum,
  uuid,
  text,
  integer,
  numeric,
  timestamp,
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
```

- [ ] **Step 2: Verify TypeScript compiles cleanly**

Run:
```bash
npx tsc --noEmit
```
Expected: no errors. If you see "cannot find module 'drizzle-orm/pg-core'", check `node_modules/drizzle-orm` exists — it should, given the project already has Drizzle installed.

- [ ] **Step 3: Commit the schema**

```bash
git add src/db/schema.ts
git commit -m "feat: define workout logging schema with Drizzle ORM"
```

---

## Task 2: Generate the migration

**Files:**
- Created by drizzle-kit: `drizzle/` directory with SQL migration file

- [ ] **Step 1: Generate the migration SQL**

```bash
npx drizzle-kit generate
```

Expected output (approximate):
```
[✓] Your SQL migration file ➜ drizzle/0000_...sql
```

drizzle-kit reads `drizzle.config.ts` (already configured to use `src/db/schema.ts` and output to `./drizzle`).

- [ ] **Step 2: Inspect the generated SQL**

Open `drizzle/0000_*.sql`. Verify it contains:
- `CREATE TYPE "category" AS ENUM (...)` 
- `CREATE TYPE "muscle_group" AS ENUM (...)`
- `CREATE TABLE "exercises" (...)`
- `CREATE TABLE "programs" (...)`
- `CREATE TABLE "program_workouts" (...)`
- `CREATE TABLE "program_workout_exercises" (...)`
- `CREATE TABLE "workouts" (...)`
- `CREATE TABLE "workout_exercises" (...)`
- `CREATE TABLE "workout_sets" (...)`
- Foreign key constraints with `ON DELETE CASCADE` where expected

If anything is missing or wrong, fix the schema and re-run `npx drizzle-kit generate`.

- [ ] **Step 3: Commit the migration**

```bash
git add drizzle/
git commit -m "chore: add initial Drizzle migration for workout schema"
```

---

## Task 3: Apply the migration to Neon

**Files:** None changed — this applies the SQL to the live database.

- [ ] **Step 1: Ensure DATABASE_URL is set**

```bash
cat .env | grep DATABASE_URL
```
Expected: a non-empty Neon connection string. If missing, add it from the Neon console.

- [ ] **Step 2: Apply the migration**

```bash
npx drizzle-kit migrate
```

Expected output:
```
[✓] Migrations applied successfully
```

If you see a connection error, confirm the Neon project is active and DATABASE_URL is correct.

- [ ] **Step 3: Verify tables exist in Neon**

Open the [Neon console](https://console.neon.tech), navigate to your project's SQL editor, and run:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;
```

Expected — these 7 tables appear:
- `exercises`
- `program_workout_exercises`
- `program_workouts`
- `programs`
- `workout_exercises`
- `workout_sets`
- `workouts`

Also verify the enum types:
```sql
SELECT typname FROM pg_type WHERE typtype = 'e';
```

Expected: `category` and `muscle_group` in the results.

---

## Verification Summary

| Check | Command | Expected |
|---|---|---|
| TypeScript valid | `npx tsc --noEmit` | No errors |
| Migration generated | `npx drizzle-kit generate` | SQL file in `drizzle/` |
| Migration applied | `npx drizzle-kit migrate` | Success message |
| Tables exist | Neon SQL editor | 7 tables listed |
| Enums exist | Neon SQL editor | `category`, `muscle_group` listed |
