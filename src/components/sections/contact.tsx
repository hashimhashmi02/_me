import { SITE } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import Magnetic from "@/components/ui/magnetic";

const LINKS = [
  { label: "GitHub", href: SITE.github, cursor: "github" },
  { label: "X / Twitter", href: SITE.x, cursor: "x" },
  { label: "LinkedIn", href: SITE.linkedin, cursor: "linkedin" },
  { label: "Book a call", href: SITE.calLink, cursor: "cal" },
] as const;

export default function Contact() {
  return (
    <section
      id="contact"
      className="mx-auto max-w-6xl px-5 py-28 md:px-8 md:py-44"
    >
      <Reveal kind="mask">
        <p className="eyebrow flex items-center gap-3 text-cyan">
          <span className="pulse-dot" aria-hidden />
          05 · contact · open to full-time roles
        </p>
      </Reveal>

      <Reveal kind="mask" delay={0.1}>
        <h2 className="display-section mt-6 max-w-3xl">
          Let&apos;s build something that{" "}
          <span className="text-signal">ships</span>.
        </h2>
      </Reveal>

      <Reveal delay={0.25}>
        <div className="mt-12">
          <Magnetic strength={0.25} className="inline-block">
            <a
              href={`mailto:${SITE.email}`}
              data-cursor-label="say hi"
              className="border-signal group inline-flex items-center gap-4 rounded-full bg-surface px-8 py-5 text-lg font-medium text-ink transition-colors hover:text-cyan md:px-10 md:py-6 md:text-2xl"
            >
              {SITE.email}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5"
              >
                ↗
              </span>
            </a>
          </Magnetic>
        </div>
      </Reveal>

      <Reveal delay={0.4}>
        <ul className="mt-10 flex flex-wrap items-center gap-2">
          {LINKS.map((link) => (
            <li key={link.label}>
              <Magnetic strength={0.3}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-label={link.cursor}
                  className="eyebrow inline-block rounded-full border border-line px-5 py-3 text-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  {link.label} ↗
                </a>
              </Magnetic>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
