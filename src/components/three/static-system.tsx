/**
 * Static fallback for the 3D system — shown server-side, while the canvas
 * loads, and whenever effects are reduced. Same palette, zero motion.
 */
export function StaticSystem() {
  const clusters = [
    { cx: 460, cy: 270, r: 70, n: 9 },
    { cx: 660, cy: 160, r: 52, n: 7 },
    { cx: 640, cy: 400, r: 48, n: 6 },
    { cx: 280, cy: 170, r: 50, n: 7 },
    { cx: 260, cy: 390, r: 46, n: 6 },
  ];
  // Deterministic pseudo-random spokes so SSR and client markup match.
  const nodes = clusters.flatMap(({ cx, cy, r, n }, ci) =>
    Array.from({ length: n }, (_, i) => {
      const a = (i / n) * Math.PI * 2 + ci * 0.8;
      const rr = r * (0.45 + ((i * 37 + ci * 13) % 10) / 18);
      return {
        x: cx + Math.cos(a) * rr,
        y: cy + Math.sin(a) * rr,
        hub: i === 0,
        cx,
        cy,
      };
    })
  );

  return (
    <svg
      viewBox="0 0 920 540"
      className="h-full w-full"
      role="img"
      aria-label="Stylised network of connected nodes representing real-time systems"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="fieldGlow" cx="50%" cy="48%" r="60%">
          <stop offset="0%" stopColor="#13203a" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#05070d" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#9db4d8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#9db4d8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffb224" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#ffb224" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="920" height="540" fill="url(#fieldGlow)" />
      {/* spokes to cluster centers */}
      <g stroke="#6e84a8" strokeOpacity="0.18" strokeWidth="1">
        {nodes.map((n, i) => (
          <line key={i} x1={n.x} y1={n.y} x2={n.cx} y2={n.cy} />
        ))}
        {clusters.slice(1).map((c, i) => (
          <line
            key={`hub-${i}`}
            x1={c.cx}
            y1={c.cy}
            x2={clusters[0].cx}
            y2={clusters[0].cy}
            strokeOpacity="0.28"
          />
        ))}
      </g>
      {nodes.map((n, i) => (
        <g key={`n-${i}`}>
          <circle
            cx={n.x}
            cy={n.y}
            r={n.hub ? 14 : 8}
            fill={n.hub ? "url(#hubGlow)" : "url(#nodeGlow)"}
          />
          <circle
            cx={n.x}
            cy={n.y}
            r={n.hub ? 3 : 1.6}
            fill={n.hub ? "#ffb224" : "#aebfdc"}
          />
        </g>
      ))}
    </svg>
  );
}
