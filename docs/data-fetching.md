# Data Fetching

## The Rule

**ALL data fetching must be done in Server Components. No exceptions.**

Do not fetch data in:
- Route handlers (`src/app/api/*/route.ts`)
- Client Components (`"use client"`)
- Server Actions
- Any other mechanism

If you find yourself reaching for `fetch()`, `useEffect`, `useQuery`, `useSWR`, or any client-side data fetching library — stop. That is the wrong pattern for this app.

## How to Fetch Data

### 1. Write a helper function in `/data`

All database queries live in `src/data/`. Each file groups queries by domain (e.g. `src/data/workouts.ts`, `src/data/exercises.ts`).

Helper functions must:
- Use **Drizzle ORM** to build queries — never raw SQL strings
- Accept `userId: string` as a parameter and **always** filter by it
- Be plain `async` functions (not hooks, not React components)

```ts
// src/data/workouts.ts
import { db } from '@/db';
import { workouts, workoutExercises, workoutSets } from '@/db/schema';
import { eq, and } from 'drizzle-orm';

export async function getWorkoutsByDate(userId: string, date: string) {
  return db.query.workouts.findMany({
    where: and(
      eq(workouts.userId, userId),
      // ... date filter
    ),
    with: {
      workoutExercises: {
        with: { workoutSets: true },
      },
    },
  });
}
```

### 2. Call it from a Server Component

Get the authenticated user's ID from Clerk, pass it to the helper, render the result.

```tsx
// src/app/dashboard/page.tsx
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { getWorkoutsByDate } from '@/data/workouts';

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect('/sign-in');

  const workouts = await getWorkoutsByDate(userId, '2026-04-15');

  return <WorkoutList workouts={workouts} />;
}
```

`WorkoutList` is a Client Component only if it needs interactivity (state, event handlers). It receives data as props — it does not fetch anything itself.

## Data Isolation: Users Can Only See Their Own Data

Every query that touches user-owned data **must** include a `userId` filter. This is non-negotiable.

**Correct:**
```ts
db.query.workouts.findMany({
  where: and(eq(workouts.userId, userId), eq(workouts.id, workoutId)),
});
```

**Wrong — never do this:**
```ts
db.query.workouts.findMany({
  where: eq(workouts.id, workoutId), // ❌ missing userId filter — any user's data is exposed
});
```

The `userId` always comes from `auth()` on the server. It must **never** come from a URL parameter, query string, request body, or any client-supplied value.

```ts
// ✅ Correct — userId is authoritative, sourced from the session
const { userId } = await auth();
if (!userId) redirect('/sign-in');
const workout = await getWorkout(userId, params.workoutId);

// ❌ Wrong — userId is attacker-controlled
const workout = await getWorkout(req.body.userId, params.workoutId);
```

## Rules Summary

| Rule | Detail |
|------|--------|
| Fetch only in Server Components | No API routes, no client fetching |
| Queries only via `/data` helpers | No inline `db.query` calls in components |
| Drizzle ORM only | No raw SQL (`db.execute(sql\`...\``) |
| Always filter by `userId` | Every query on user-owned tables |
| `userId` from `auth()` only | Never trust client-supplied IDs |

## Directory Layout

```
src/
  data/             ← all database query helpers live here
    workouts.ts
    exercises.ts
    programs.ts
    ...
  db/
    index.ts        ← Drizzle client
    schema.ts       ← table definitions
  app/
    dashboard/
      page.tsx      ← Server Component: calls auth() + /data helpers, passes props down
      workout-list.tsx  ← Client Component if interactive, otherwise Server Component too
```
