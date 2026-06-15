import { STACK_GROUPS } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";

export function Stack() {
  return (
    <section
      id="stack"
      aria-labelledby="stack-heading"
      className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-28 sm:px-8"
    >
      <Reveal>
        <p className="machine mb-3 text-amber">03 — stack</p>
        <h2 id="stack-heading" className="display-section text-4xl sm:text-5xl">
          Grouped by depth,
          <br />
          not by logo count.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {STACK_GROUPS.map((group, i) => (
          <Reveal key={group.label} delay={i * 0.08}>
            <div className="panel h-full rounded-xl p-7">
              <h3 className="machine text-ink">{group.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-faint">{group.note}</p>
              <ul className="mt-6 space-y-3">
                {group.items.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-body">
                    <span
                      className="h-1 w-1 rounded-full bg-amber"
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
