import { auth }            from "@clerk/nextjs/server";
import { redirect }        from "next/navigation";
import { getAllExercises, getRecentlyUsedExerciseIds, getLastSetsForExercises } from "@/data/exercises";
import { getProfile }      from "@/data/profile";
import LogWorkoutForm      from "./log-workout-form";

function parseDateParam(raw?: string): string {
  if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

export default async function LogWorkoutPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const params   = await searchParams;
  const date     = parseDateParam(params.date);

  // Fetch exercises first so we have IDs for the history query
  const exercises = await getAllExercises(userId);

  const [pushRecent, pullRecent, legsRecent, lastSessions, profile] = await Promise.all([
    getRecentlyUsedExerciseIds(userId, ["chest", "shoulders", "triceps"]),
    getRecentlyUsedExerciseIds(userId, ["back", "biceps"]),
    getRecentlyUsedExerciseIds(userId, ["legs", "glutes"]),
    getLastSetsForExercises(userId, exercises.map(e => e.id)),
    getProfile(userId),
  ]);

  const recentlyUsedIds = { push: pushRecent, pull: pullRecent, legs: legsRecent, custom: [] as string[] };

  return (
    <main
      className="min-h-[calc(100vh-73px)] grain"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(163,230,53,0.07) 0%, transparent 60%), oklch(0.08 0 0)",
      }}
    >
      <div className="max-w-3xl mx-auto px-6 md:px-12 py-12">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-10 animate-rise-in" style={{ animationDelay: "0ms" }}>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#a3e635", boxShadow: "0 0 10px rgba(163,230,53,0.8)" }}
            />
            <span className="text-xs text-zinc-400 tracking-[0.4em] uppercase font-medium">
              Training Journal
            </span>
          </div>
          <h1
            className="font-display tracking-[0.1em] mb-2 leading-none"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              color: "#a3e635",
              textShadow: "0 0 40px rgba(163,230,53,0.25)",
            }}
          >
            LOG WORKOUT
          </h1>
          <p className="text-zinc-500 text-sm tracking-widest uppercase">
            {new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
              weekday: "long",
              month:   "long",
              day:     "numeric",
              year:    "numeric",
            })}
          </p>
        </div>

        {/* ── Separator ───────────────────────────────────────────────────── */}
        <div className="relative mb-10">
          <div
            className="h-px"
            style={{
              background:
                "linear-gradient(90deg, #a3e635 0%, #22d3ee 40%, rgba(251,146,60,0.4) 70%, transparent 100%)",
            }}
          />
          <div
            className="absolute left-0 top-0 h-px w-24 blur-sm"
            style={{ background: "#a3e635" }}
          />
        </div>

        <LogWorkoutForm
          date={date}
          exercises={exercises}
          recentlyUsedIds={recentlyUsedIds}
          lastSessions={lastSessions}
          fitnessGoal={profile?.fitnessGoal ?? null}
        />
      </div>
    </main>
  );
}
