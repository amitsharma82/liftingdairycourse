import Link           from "next/link";
import { auth }      from "@clerk/nextjs/server";
import { redirect }  from "next/navigation";
import { getWorkoutsByDate, getWorkoutDates } from "@/data/workouts";
import { getProfile } from "@/data/profile";
import { buttonVariants } from "@/components/ui/button";
import DateNav        from "./date-nav";
import WorkoutFeed    from "./workout-feed";
import ProfileBanner  from "./profile-banner";

function parseDateParam(raw?: string): string {
  if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const n = new Date();
  return `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}-${String(n.getDate()).padStart(2, "0")}`;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const params = await searchParams;
  const date   = parseDateParam(params.date);

  const [workouts, workoutDates, profile] = await Promise.all([
    getWorkoutsByDate(userId, date),
    getWorkoutDates(userId),
    getProfile(userId),
  ]);

  return (
    <main
      className="min-h-[calc(100vh-73px)] grain"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(163,230,53,0.07) 0%, transparent 60%), oklch(0.08 0 0)",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12">

        {/* ── Header ──────────────────────────────────────────────────────────
             relative + z-10 keeps the calendar popup above workout cards
             (both use animate-rise-in transforms that create stacking contexts) */}
        <div className="relative z-10 mb-10 animate-rise-in" style={{ animationDelay: "0ms" }}>

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#a3e635", boxShadow: "0 0 10px rgba(163,230,53,0.8)" }}
            />
            <span className="text-xs text-zinc-400 tracking-[0.4em] uppercase font-medium">
              Training Journal
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-display tracking-[0.1em] mb-2 leading-none"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 7rem)",
              color: "#a3e635",
              textShadow: "0 0 40px rgba(163,230,53,0.25)",
            }}
          >
            DAILY LOG
          </h1>

          {/* Motivational tagline */}
          <p className="text-zinc-500 text-sm tracking-widest uppercase mb-8">
            Every rep recorded. Every session counts.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <DateNav date={date} workoutDates={workoutDates} />
            <Link
              href={`/dashboard/log?date=${date}`}
              className={buttonVariants({ variant: "default" }) +
                " tracking-[0.2em] uppercase font-display btn-shine"}
            >
              + LOG WORKOUT
            </Link>
          </div>
        </div>

        {/* ── Separator ────────────────────────────────────────────────────── */}
        <div className="relative mb-12">
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

        {/* ── First-visit profile prompt ───────────────────────────────────── */}
        {!profile && <ProfileBanner />}

        {/* ── Workout feed ─────────────────────────────────────────────────── */}
        <WorkoutFeed workouts={workouts} date={date} />

      </div>
    </main>
  );
}
