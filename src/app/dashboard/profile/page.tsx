import { auth }       from "@clerk/nextjs/server";
import { redirect }   from "next/navigation";
import { getProfile } from "@/data/profile";
import ProfileForm    from "./profile-form";

export const metadata = { title: "Profile — Lifting Diary" };

export default async function ProfilePage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const profile = await getProfile(userId);

  return (
    <main
      className="min-h-[calc(100vh-73px)] grain"
      style={{
        background:
          "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(163,230,53,0.07) 0%, transparent 60%), oklch(0.08 0 0)",
      }}
    >
      <div className="max-w-2xl mx-auto px-6 md:px-12 py-12">

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div className="mb-10 animate-rise-in" style={{ animationDelay: "0ms" }}>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "#a3e635", boxShadow: "0 0 10px rgba(163,230,53,0.8)" }}
            />
            <span className="text-xs text-zinc-400 tracking-[0.4em] uppercase font-medium">
              Settings
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
            MY PROFILE
          </h1>
          <p className="text-zinc-500 text-sm tracking-widest uppercase">
            Personalise your training identity
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

        <div className="animate-rise-in" style={{ animationDelay: "80ms" }}>
          <ProfileForm profile={profile} />
        </div>

      </div>
    </main>
  );
}
