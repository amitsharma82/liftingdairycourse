"use client";

import { useState, useEffect } from "react";

const FREE_DB = "yuhonas/free-exercise-db";

/**
 * Returns [frame0, frame1 | null].
 * Only free-exercise-db images have a reliable second frame.
 */
function getFrames(src: string): [string, string | null] {
  if (!src.includes(FREE_DB)) return [src, null];
  const base = src.replace(/\/[01]\.jpg$/, "");
  return [`${base}/0.jpg`, `${base}/1.jpg`];
}

/**
 * Shows a two-frame animation for free-exercise-db images (start → end position).
 * Falls back to a styled placeholder with initials on load error.
 *
 * `className` is applied to the outer wrapper — pass size / shape classes here
 * (e.g. "w-11 h-11 rounded-sm" or "w-full h-44 rounded-sm").
 */
export function AnimatedExerciseImage({
  src,
  alt,
  className    = "",
  accent       = "#a3e635",
  accentBg,
  accentBorder,
}: {
  src:          string;
  alt:          string;
  className?:   string;
  accent?:      string;
  accentBg?:    string;
  accentBorder?:string;
}) {
  const [f0, f1]     = getFrames(src);
  const [frame,    setFrame]    = useState(0);
  const [f1Ready,  setF1Ready]  = useState(false);
  const [failed,   setFailed]   = useState(false);

  // Start alternating once the second frame has loaded
  useEffect(() => {
    if (!f1 || !f1Ready) return;
    const id = setInterval(() => setFrame(f => 1 - f), 700);
    return () => clearInterval(id);
  }, [f1, f1Ready]);

  const initials = alt
    .split(" ")
    .slice(0, 2)
    .map(w => w[0] ?? "")
    .join("")
    .toUpperCase();

  const bg     = accentBg     ?? `${accent}12`;
  const border = accentBorder ?? `${accent}40`;

  if (failed) {
    return (
      <div
        className={`${className} flex items-center justify-center border overflow-hidden`}
        style={{ background: bg, borderColor: border }}
      >
        <span className="font-display text-xs font-bold select-none" style={{ color: accent }}>
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden bg-muted`}>
      {/* Frame 0 — always mounted, drives the onError fallback */}
      <img
        src={f0}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
        style={{ opacity: frame === 0 || !f1Ready ? 1 : 0 }}
        onError={() => setFailed(true)}
      />

      {/* Frame 1 — preloaded silently; shown when ready */}
      {f1 && (
        <img
          src={f1}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          style={{ opacity: frame === 1 && f1Ready ? 1 : 0 }}
          onLoad={() => setF1Ready(true)}
          onError={() => { /* keep showing frame 0 */ }}
        />
      )}

      {/* Tiny "animated" pip — shows once animation is running */}
      {f1Ready && (
        <span
          className="absolute bottom-1 right-1 w-1.5 h-1.5 rounded-full"
          style={{ background: accent, boxShadow: `0 0 4px ${accent}` }}
          aria-hidden
        />
      )}
    </div>
  );
}
