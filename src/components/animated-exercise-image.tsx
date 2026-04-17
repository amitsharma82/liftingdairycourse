"use client";

import { useState } from "react";

const FREE_DB = "yuhonas/free-exercise-db";

const CYCLE = 2.8; // seconds per full A→B→A cycle

function getFrames(src: string): [string, string | null] {
  if (!src.includes(FREE_DB)) return [src, null];
  const base = src.replace(/\/[01]\.jpg$/, "");
  return [`${base}/0.jpg`, `${base}/1.jpg`];
}

/**
 * CSS-keyframe animated exercise image.
 * Two-frame flip (start → end position) with per-frame Ken Burns zoom.
 * Falls back to initials placeholder on load error.
 *
 * Pass size/shape via `className` (e.g. "w-11 h-11 rounded-sm").
 */
export function AnimatedExerciseImage({
  src,
  alt,
  className    = "",
  accent       = "#a3e635",
  accentBg,
  accentBorder,
}: {
  src:           string;
  alt:           string;
  className?:    string;
  accent?:       string;
  accentBg?:     string;
  accentBorder?: string;
}) {
  const [f0, f1]          = getFrames(src);
  const [f1Ready,  setF1Ready]  = useState(false);
  const [failed,   setFailed]   = useState(false);

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
        role="img"
        aria-label={alt}
        className={`${className} flex items-center justify-center border overflow-hidden`}
        style={{ background: bg, borderColor: border }}
      >
        <span className="font-display text-xs font-bold select-none" style={{ color: accent }}>
          {initials}
        </span>
      </div>
    );
  }

  // Single static image (no second frame available)
  if (!f1) {
    return (
      <div 
        role="img" 
        aria-label={alt}
        className={`${className} relative overflow-hidden bg-muted`}
      >
        <img
          src={f0}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-contain"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  const animA = `exFrameA ${CYCLE}s ease-in-out infinite, exBurnsA ${CYCLE}s ease-in-out infinite`;
  const animB = `exFrameB ${CYCLE}s ease-in-out infinite, exBurnsB ${CYCLE}s ease-in-out infinite`;

  return (
    <div 
      role="img" 
      aria-label={`${alt} animation`}
      className={`${className} relative overflow-hidden bg-muted`}
    >
      {/* Frame 0 — start position */}
      <img
        src={f0}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain"
        style={{ animation: animA, willChange: "opacity, transform" }}
        onError={() => setFailed(true)}
      />

      {/* Frame 1 — end position; preloaded silently */}
      <img
        src={f1}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-contain"
        style={{
          animation: f1Ready ? animB : "none",
          opacity: f1Ready ? undefined : 0,
          willChange: "opacity, transform",
        }}
        onLoad={() => setF1Ready(true)}
        onError={() => { /* keep showing frame 0 only */ }}
      />

    </div>
  );
}
