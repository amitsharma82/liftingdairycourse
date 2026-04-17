"use client";

import { useState } from "react";
import Link         from "next/link";

export default function ProfileBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div
      className="relative mb-8 rounded-sm border px-5 py-4 flex items-center justify-between gap-4 animate-rise-in"
      style={{
        borderColor:      "rgba(163,230,53,0.3)",
        background:       "rgba(163,230,53,0.05)",
        animationDelay:   "120ms",
      }}
    >
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-2xl shrink-0">🦁</span>
        <div className="min-w-0">
          <p
            className="text-sm font-display tracking-[0.15em] uppercase"
            style={{ color: "#a3e635" }}
          >
            Set up your profile
          </p>
          <p className="text-xs text-zinc-500 tracking-wide mt-0.5">
            Add your avatar, body stats &amp; goals to personalise your experience.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <Link
          href="/dashboard/profile"
          className="text-xs font-display tracking-[0.2em] uppercase px-4 py-1.5 rounded-sm border transition-all hover:scale-105"
          style={{
            color:        "#a3e635",
            borderColor:  "rgba(163,230,53,0.4)",
            background:   "rgba(163,230,53,0.08)",
          }}
        >
          Go&nbsp;→
        </Link>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="text-zinc-600 hover:text-zinc-400 text-lg leading-none transition-colors"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
