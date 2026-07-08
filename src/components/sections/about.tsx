import { Reveal } from "@/components/ui/reveal";

const FACTS = [
  { k: "now", v: "AI HR hiring dashboard @ Zuvomo" },
  { k: "edu", v: "MCA · Manipal · 2026" },
  { k: "proof", v: "side projects with paying users" },
  { k: "else", v: "cricket video editor, off hours" },
] as const;

export default function About() {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40"
    >
      <Reveal kind="mask">
        <p className="eyebrow text-cyan">01 · about</p>
      </Reveal>

      <div className="mt-6 grid gap-12 md:grid-cols-[1.5fr_1fr] md:gap-16">
        <div>
          <Reveal kind="mask" delay={0.08}>
            <h2 className="display-section max-w-xl">
              I build products end to end — and I like them{" "}
              <span className="text-signal">typed, real-time, and shipped</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-8 max-w-xl leading-relaxed text-muted">
              Full-stack engineer with a systems bias: Next.js and TypeScript
              on the surface, PostgreSQL, Redis, and WebSockets underneath.
              Right now I&apos;m building an AI hiring dashboard at Zuvomo and
              finishing my MCA at Manipal. My side projects have paying users
              — which taught me more about software than any course did.
            </p>
          </Reveal>
          <Reveal delay={0.34}>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">
              Off hours I edit cricket videos. Different craft, same instinct:
              cut everything that doesn&apos;t earn its frame.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <dl className="panel space-y-5 rounded-2xl p-7">
            {FACTS.map((f) => (
              <div
                key={f.k}
                className="flex items-baseline justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0"
              >
                <dt className="eyebrow shrink-0 text-muted/70">{f.k}</dt>
                <dd className="eyebrow text-right text-ink/90">{f.v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
