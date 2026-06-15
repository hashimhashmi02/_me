import { Reveal } from "@/components/ui/reveal";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-28 sm:px-8"
    >
      <div className="max-w-2xl">
        <Reveal>
          <p className="machine mb-3 text-amber">02 — about</p>
          <h2 id="about-heading" className="display-section text-4xl sm:text-5xl">
            Tools for people
            <br />
            who build tools.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-7 space-y-5 text-[17px] leading-relaxed text-body">
            <p>
              I gravitate toward tools other developers use — IDEs, automation
              builders, real-time dashboards. Products where a sloppy interface
              and a sloppy backend both show up immediately.
            </p>
            <p>
              I care about how the front end and the system underneath stay in
              sync: the WebSocket feed and the chart it drives, the workflow
              graph and the runtime that walks it.
            </p>
            <p className="text-ink">
              Currently looking for a full-time role on a team that ships.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
