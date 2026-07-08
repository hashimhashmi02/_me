/**
 * Zero-WebGL hero backdrop: layered radial glows on the palette.
 * Serves as the reduced-effects fallback, the SSR/loading state, and the
 * low-power mobile experience.
 */
export default function StaticHero() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden"
      style={{
        background: `
          radial-gradient(42% 55% at 68% 38%, rgba(139, 92, 246, 0.16), transparent 70%),
          radial-gradient(38% 48% at 30% 62%, rgba(34, 227, 255, 0.10), transparent 70%),
          radial-gradient(30% 38% at 55% 78%, rgba(255, 46, 151, 0.07), transparent 72%),
          var(--color-bg)
        `,
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 h-[46vmin] w-[46vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70"
        style={{
          background:
            "conic-gradient(from 210deg, rgba(34,227,255,0.18), rgba(139,92,246,0.22), rgba(255,46,151,0.16), rgba(34,227,255,0.18))",
          filter: "blur(42px)",
        }}
      />
    </div>
  );
}
