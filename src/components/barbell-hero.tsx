/**
 * BarbellHero — full side-view animated barbell.
 *
 * Layout (viewBox 580 × 150):
 *   [10kg][25kg][45kg][collar]══════════bar══════════[collar][45kg][25kg][10kg]
 *
 * Animations:
 *   - The whole barbell floats up/down (barbell-float keyframe)
 *   - Each plate colour group glows independently (plate-pulse-* keyframes)
 *   - Dashed speed lines march toward the plates (dash-march)
 *   - A soft ambient glow radiates behind the bar
 */
export function BarbellHero({ className = "" }: { className?: string }) {
  const CY = 75; // bar centre Y inside viewBox

  return (
    <div
      className={`relative select-none pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* ── Ambient radial glow behind entire barbell ────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 50%, " +
            "rgba(163,230,53,0.08) 0%, " +
            "rgba(34,211,238,0.05) 40%, " +
            "transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 580 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="barbell-float w-full relative z-10"
      >
        <defs>
          {/* Chrome bar gradient */}
          <linearGradient id="bh-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#3a3a3a" />
            <stop offset="20%"  stopColor="#aaaaaa" />
            <stop offset="50%"  stopColor="#e8e8e8" />
            <stop offset="80%"  stopColor="#aaaaaa" />
            <stop offset="100%" stopColor="#2a2a2a" />
          </linearGradient>

          {/* Collar gradient */}
          <linearGradient id="bh-collar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#4a4a4a" />
            <stop offset="50%"  stopColor="#999999" />
            <stop offset="100%" stopColor="#303030" />
          </linearGradient>

          {/* Subtle horizon glow line */}
          <linearGradient id="bh-horizon" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="transparent" />
            <stop offset="20%"  stopColor="rgba(163,230,53,0.25)" />
            <stop offset="50%"  stopColor="rgba(34,211,238,0.35)" />
            <stop offset="80%"  stopColor="rgba(163,230,53,0.25)" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>

          {/* Drop-shadow filters per plate colour */}
          <filter id="gf-lime" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="gf-cyan" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="gf-orange" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ── Horizon glow line (behind everything) ─────────────── */}
        <rect x="0" y={CY - 1} width="580" height="2" fill="url(#bh-horizon)" opacity="0.5" />

        {/* ══════════ SPEED LINES — LEFT ══════════════════════════ */}
        {[
          { y: CY,      w: 1.5, dash: "7 6",  color: "#a3e635" },
          { y: CY - 9,  w: 0.8, dash: "5 9",  color: "#a3e635" },
          { y: CY + 9,  w: 0.8, dash: "5 9",  color: "#a3e635" },
          { y: CY - 17, w: 0.6, dash: "4 12", color: "#22d3ee" },
          { y: CY + 17, w: 0.6, dash: "4 12", color: "#22d3ee" },
          { y: CY - 24, w: 0.4, dash: "3 14", color: "#fb923c" },
          { y: CY + 24, w: 0.4, dash: "3 14", color: "#fb923c" },
        ].map((l, i) => (
          <line
            key={`sl${i}`}
            x1="0" y1={l.y} x2="28" y2={l.y}
            stroke={l.color}
            strokeWidth={l.w}
            strokeDasharray={l.dash}
            opacity="0.55"
            className="speed-line"
            style={{ animationDelay: `${i * 0.07}s` }}
          />
        ))}

        {/* ══════════ SPEED LINES — RIGHT ═════════════════════════ */}
        {[
          { y: CY,      w: 1.5, dash: "7 6",  color: "#a3e635" },
          { y: CY - 9,  w: 0.8, dash: "5 9",  color: "#a3e635" },
          { y: CY + 9,  w: 0.8, dash: "5 9",  color: "#a3e635" },
          { y: CY - 17, w: 0.6, dash: "4 12", color: "#22d3ee" },
          { y: CY + 17, w: 0.6, dash: "4 12", color: "#22d3ee" },
          { y: CY - 24, w: 0.4, dash: "3 14", color: "#fb923c" },
          { y: CY + 24, w: 0.4, dash: "3 14", color: "#fb923c" },
        ].map((l, i) => (
          <line
            key={`sr${i}`}
            x1="552" y1={l.y} x2="580" y2={l.y}
            stroke={l.color}
            strokeWidth={l.w}
            strokeDasharray={l.dash}
            opacity="0.55"
            className="speed-line"
            style={{ animationDelay: `${i * 0.07 + 0.7}s` }}
          />
        ))}

        {/* ══════════ LEFT SIDE PLATES (outer → inner) ════════════ */}

        {/* 10 kg — orange */}
        <g
          filter="url(#gf-orange)"
          style={{ animation: "plate-pulse-orange 2.1s ease-in-out infinite 1.1s" }}
        >
          <rect x="28" y={CY - 27} width="19" height="54" rx="2" fill="#fb923c" />
          {/* highlight edge */}
          <rect x="28" y={CY - 27} width="2.5" height="54" fill="rgba(255,255,255,0.22)" rx="2" />
          {/* shadow edge */}
          <rect x="44.5" y={CY - 27} width="2.5" height="54" fill="rgba(0,0,0,0.35)" />
        </g>

        {/* 25 kg — cyan */}
        <g
          filter="url(#gf-cyan)"
          style={{ animation: "plate-pulse-cyan 2.5s ease-in-out infinite 0.5s" }}
        >
          <rect x="47" y={CY - 42} width="27" height="84" rx="2" fill="#22d3ee" />
          <rect x="47" y={CY - 42} width="2.5" height="84" fill="rgba(255,255,255,0.2)" rx="2" />
          <rect x="71.5" y={CY - 42} width="2.5" height="84" fill="rgba(0,0,0,0.3)" />
          <text
            x="60.5" y={CY + 4}
            textAnchor="middle"
            fill="rgba(0,0,0,0.5)"
            fontSize="8"
            fontWeight="bold"
            fontFamily="monospace"
          >25</text>
        </g>

        {/* 45 kg — lime */}
        <g
          filter="url(#gf-lime)"
          style={{ animation: "plate-pulse-lime 3s ease-in-out infinite" }}
        >
          <rect x="74" y={CY - 62} width="40" height="124" rx="2" fill="#a3e635" />
          <rect x="74" y={CY - 62} width="3"  height="124" fill="rgba(255,255,255,0.18)" rx="2" />
          <rect x="111" y={CY - 62} width="3" height="124" fill="rgba(0,0,0,0.32)" />
          <text
            x="94" y={CY - 6}
            textAnchor="middle"
            fill="rgba(0,0,0,0.52)"
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >45</text>
          <text
            x="94" y={CY + 5}
            textAnchor="middle"
            fill="rgba(0,0,0,0.38)"
            fontSize="7"
            fontFamily="monospace"
          >KG</text>
        </g>

        {/* Left collar */}
        <rect x="114" y={CY - 19} width="19" height="38" rx="2" fill="url(#bh-collar)" />
        <rect x="114" y={CY - 19} width="2"  height="38" fill="rgba(255,255,255,0.15)" />

        {/* ══════════ THE BAR ══════════════════════════════════════ */}
        <rect x="133" y={CY - 8} width="314" height="16" rx="3" fill="url(#bh-bar)" />

        {/* Knurling marks — left zone */}
        {[163, 171, 179, 187, 195, 203].map(x => (
          <line key={`kl${x}`}
            x1={x} y1={CY - 7} x2={x} y2={CY + 7}
            stroke="rgba(0,0,0,0.22)" strokeWidth="1.5"
          />
        ))}

        {/* Centre marks */}
        <line x1="286" y1={CY - 8} x2="286" y2={CY + 8} stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" />
        <line x1="294" y1={CY - 8} x2="294" y2={CY + 8} stroke="rgba(255,255,255,0.45)" strokeWidth="2.5" />

        {/* Knurling marks — right zone */}
        {[377, 385, 393, 401, 409, 417].map(x => (
          <line key={`kr${x}`}
            x1={x} y1={CY - 7} x2={x} y2={CY + 7}
            stroke="rgba(0,0,0,0.22)" strokeWidth="1.5"
          />
        ))}

        {/* ══════════ RIGHT SIDE PLATES (inner → outer) ═══════════ */}

        {/* Right collar */}
        <rect x="447" y={CY - 19} width="19" height="38" rx="2" fill="url(#bh-collar)" />
        <rect x="463" y={CY - 19} width="2"  height="38" fill="rgba(255,255,255,0.1)" />

        {/* 45 kg — lime */}
        <g
          filter="url(#gf-lime)"
          style={{ animation: "plate-pulse-lime 3s ease-in-out infinite 0.4s" }}
        >
          <rect x="466" y={CY - 62} width="40" height="124" rx="2" fill="#a3e635" />
          <rect x="466" y={CY - 62} width="3"  height="124" fill="rgba(255,255,255,0.18)" rx="2" />
          <rect x="503" y={CY - 62} width="3"  height="124" fill="rgba(0,0,0,0.32)" />
          <text
            x="486" y={CY - 6}
            textAnchor="middle"
            fill="rgba(0,0,0,0.52)"
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >45</text>
          <text
            x="486" y={CY + 5}
            textAnchor="middle"
            fill="rgba(0,0,0,0.38)"
            fontSize="7"
            fontFamily="monospace"
          >KG</text>
        </g>

        {/* 25 kg — cyan */}
        <g
          filter="url(#gf-cyan)"
          style={{ animation: "plate-pulse-cyan 2.5s ease-in-out infinite 0.9s" }}
        >
          <rect x="506" y={CY - 42} width="27" height="84" rx="2" fill="#22d3ee" />
          <rect x="506" y={CY - 42} width="2.5" height="84" fill="rgba(255,255,255,0.2)" rx="2" />
          <rect x="530.5" y={CY - 42} width="2.5" height="84" fill="rgba(0,0,0,0.3)" />
          <text
            x="519.5" y={CY + 4}
            textAnchor="middle"
            fill="rgba(0,0,0,0.5)"
            fontSize="8"
            fontWeight="bold"
            fontFamily="monospace"
          >25</text>
        </g>

        {/* 10 kg — orange */}
        <g
          filter="url(#gf-orange)"
          style={{ animation: "plate-pulse-orange 2.1s ease-in-out infinite 1.6s" }}
        >
          <rect x="533" y={CY - 27} width="19" height="54" rx="2" fill="#fb923c" />
          <rect x="533" y={CY - 27} width="2.5" height="54" fill="rgba(255,255,255,0.22)" rx="2" />
          <rect x="549.5" y={CY - 27} width="2.5" height="54" fill="rgba(0,0,0,0.35)" />
        </g>
      </svg>
    </div>
  );
}
