# Workout Logging Schema Design

**Date:** 2026-04-13
**Status:** Approved

## Context

This document defines the normalized PostgreSQL database schema for a workout logging app (liftingdairycourse). The app uses Drizzle ORM with a Neon serverless Postgres database. Authentication is handled by Clerk — no `users` table is needed; all tables reference Clerk's user ID as a `text` column.

The schema must support:
- A global + user-created exercise library
- Multi-week training programs with scheduled sessions
- Ad hoc and program-driven workout logging
- Rich per-set data (weight, reps, duration, RPE, RIR, rest, notes)

---

## Schema: Exercise Library

```ts
// exercises — global (created_by IS NULL) or user-created (created_by = clerk_id)
exercises {
  id           uuid PK defaultRandom
  name         text NOT NULL
  category     enum('strength','cardio','bodyweight','olympic','stretching') NOT NULL
  muscle_group enum('chest','back','shoulders','biceps','triceps',
                    'legs','glutes','core','full_body','other') NOT NULL
  created_by   text NULL   // Clerk user ID; NULL = system/global exercise
  created_at   timestamp NOT NULL defaultNow
}
```

**Visibility rule:** A user sees all exercises where `created_by IS NULL OR created_by = :userId`.

---

## Schema: Programs & Templates

```ts
// programs — a named multi-week training program owned by a user
programs {
  id           uuid PK defaultRandom
  user_id      text NOT NULL   // Clerk user ID
  name         text NOT NULL
  description  text NULL
  total_weeks  integer NOT NULL
  created_at   timestamp NOT NULL defaultNow
}

// program_workouts — a scheduled session slot (week N, day N)
program_workouts {
  id          uuid PK defaultRandom
  program_id  uuid FK → programs.id ON DELETE CASCADE
  week_number integer NOT NULL
  day_number  integer NOT NULL   // 1–7
  name        text NOT NULL      // e.g. "Push Day A"
  notes       text NULL
}

// program_workout_exercises — planned exercises for a session slot
program_workout_exercises {
  id                  uuid PK defaultRandom
  program_workout_id  uuid FK → program_workouts.id ON DELETE CASCADE
  exercise_id         uuid FK → exercises.id
  order_index         integer NOT NULL
  target_sets         integer NULL
  target_reps         integer NULL
  target_weight       numeric NULL   // kg
  notes               text NULL
}
```

---

## Schema: Workout Logging

```ts
// workouts — a single logged training session
workouts {
  id                  uuid PK defaultRandom
  user_id             text NOT NULL   // Clerk user ID
  program_workout_id  uuid NULL FK → program_workouts.id
  // NULL = ad hoc session; set = following a program slot
  name                text NOT NULL
  started_at          timestamp NOT NULL
  ended_at            timestamp NULL   // set when session is finished
  notes               text NULL
}

// workout_exercises — exercises performed in a session, in order
workout_exercises {
  id           uuid PK defaultRandom
  workout_id   uuid FK → workouts.id ON DELETE CASCADE
  exercise_id  uuid FK → exercises.id
  order_index  integer NOT NULL
  notes        text NULL
}

// workout_sets — individual sets, one row each
workout_sets {
  id                   uuid PK defaultRandom
  workout_exercise_id  uuid FK → workout_exercises.id ON DELETE CASCADE
  set_number           integer NOT NULL
  weight_kg            numeric NULL
  reps                 integer NULL
  duration_seconds     integer NULL
  rpe                  numeric NULL   // 1.0–10.0
  rir                  integer NULL   // reps in reserve
  rest_seconds         integer NULL   // rest taken after this set
  notes                text NULL
  logged_at            timestamp NOT NULL defaultNow
}
```

---

## Entity Relationship

```
Clerk User
    │
    ├── exercises (created_by) ─────────────────────────────┐
    │                                                        │
    ├── programs                                             │
    │       └── program_workouts                            │
    │                   └── program_workout_exercises ──────┤
    │                                                        │
    └── workouts (optionally → program_workouts)            │
                └── workout_exercises ──────────────────────┘
                            └── workout_sets
```

---

## Key Design Decisions

| Decision | Rationale |
|---|---|
| No `users` table | Identity fully delegated to Clerk |
| UUIDs for all PKs | `uuid().defaultRandom().primaryKey()` — Drizzle built-in |
| `program_workout_id` nullable on `workouts` | Supports both ad hoc and program-driven sessions |
| All set fields nullable | Any combination of weight/reps/duration is valid |
| Cascading deletes | program → program_workouts → program_workout_exercises; workout → workout_exercises → workout_sets |
| `order_index` on exercises | Preserves user-defined exercise ordering within a session |
| `created_by NULL` = global exercise | Single `exercises` table; no separate global/user split |

---

## Implementation Files

| File | Purpose |
|---|---|
| `src/db/schema.ts` | All Drizzle table definitions (currently empty) |
| `src/db/index.ts` | Drizzle client (already configured with Neon) |
| `drizzle.config.ts` | Drizzle Kit config (already configured) |

---

## Enums

```ts
// categoryEnum
'strength' | 'cardio' | 'bodyweight' | 'olympic' | 'stretching'

// muscleGroupEnum
'chest' | 'back' | 'shoulders' | 'biceps' | 'triceps' |
'legs' | 'glutes' | 'core' | 'full_body' | 'other'
```

Defined as Drizzle `pgEnum` so they exist in the database as Postgres enum types.

---

## Verification

After implementing the schema:

1. Run `npx drizzle-kit generate` to generate migration SQL
2. Run `npx drizzle-kit migrate` to apply to Neon
3. Verify tables exist in Neon console
4. Confirm foreign key constraints and cascade rules via `\d+ workout_sets` in psql
5. Insert a test exercise, program, workout, and set via Drizzle client to confirm the full chain works
