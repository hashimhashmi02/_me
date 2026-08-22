import { BUILD_LOG } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";

const TAG_COLOR = {
  ship: "text-lime",
  wip: "text-cyan",
  fix: "text-magenta",
} as const;

export default function BuildLog() {
  return (
    <section id="log" className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-40">
      <Reveal kind="mask">
        <p className="eyebrow text-lime">04 · build log</p>
      </Reveal>
      <Reveal kind="mask" delay={0.08}>
        <h2 className="display-section mt-4">Recently shipped.</h2>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="panel mt-12 max-w-3xl overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 border-b border-line px-5 py-3.5">
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-magenta/60" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-lime/50" />
            <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-cyan/50" />
            <span className="eyebrow ml-3 text-muted/70">
              hashim@dev · build.log
            </span>
          </div>
          <ol className="divide-y divide-line px-5 py-2 md:px-6">
            {BUILD_LOG.map((entry, i) => (
              <li
                key={`${entry.date}-${i}`}
                className="grid gap-1 py-4 font-mono text-sm sm:grid-cols-[6rem_3.5rem_1fr] sm:gap-4"
              >
                <span className="eyebrow pt-0.5 text-muted/60">
                  {entry.date}
                </span>
                <span className={`eyebrow pt-0.5 ${TAG_COLOR[entry.tag]}`}>
                  [{entry.tag}]
                </span>
                <span className="leading-relaxed text-muted">{entry.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
