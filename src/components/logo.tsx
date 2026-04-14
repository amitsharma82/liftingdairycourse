/**
 * LogoMark — front-view weight plate with concentric rings and a barbell bar,
 * used as the primary brand icon across the app.
 *
 * Animated variant: applies the `logo-mark` CSS class which runs the
 * `logo-pulse` keyframe (soft glow oscillation defined in globals.css).
 */
export function LogoMark({
  size      = 40,
  color     = "#a3e635",
  animated  = false,
  className = "",
}: {
  size?:      number;
  color?:     string;
  /** Apply the continuous glow-pulse animation */
  animated?:  boolean;
  className?: string;
}) {
  // viewBox: 80 × 28 — two circular plates + connecting bar
  const h = Math.round(size * (28 / 80));

  return (
    <svg
      width={size}
      height={h}
      viewBox="0 0 80 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lifting Diary logo"
      className={`${animated ? "logo-mark" : ""} ${className}`.trim()}
    >
      {/* ── Bar ─────────────────────────────────────── */}
      <rect x="16" y="12" width="48" height="4" fill={color} />

      {/* ── Left plate ─────────────────────────────── */}
      {/* Outer ring */}
      <circle cx="14" cy="14" r="14" fill={color} />
      {/* Mid ring (dark cutout) */}
      <circle cx="14" cy="14" r="8.5" fill="#0d0d0d" />
      {/* Inner ring accent */}
      <circle cx="14" cy="14" r="5.5" fill={color} opacity="0.35" />
      {/* Centre hole */}
      <circle cx="14" cy="14" r="2.8" fill="#0d0d0d" />
      {/* Centre pin */}
      <circle cx="14" cy="14" r="1.4" fill={color} />

      {/* ── Right plate ────────────────────────────── */}
      <circle cx="66" cy="14" r="14" fill={color} />
      <circle cx="66" cy="14" r="8.5" fill="#0d0d0d" />
      <circle cx="66" cy="14" r="5.5" fill={color} opacity="0.35" />
      <circle cx="66" cy="14" r="2.8" fill="#0d0d0d" />
      <circle cx="66" cy="14" r="1.4" fill={color} />
    </svg>
  );
}
