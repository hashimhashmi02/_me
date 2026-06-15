import { SITE } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/ui/social-links";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative mx-auto max-w-6xl scroll-mt-20 px-5 py-28 sm:px-8"
    >
      <div className="panel rounded-2xl px-7 py-14 text-center sm:px-12 sm:py-20">
        <Reveal>
          <p className="machine mb-3 text-amber">04 — contact</p>
          <h2
            id="contact-heading"
            className="display-section mx-auto max-w-2xl text-4xl sm:text-5xl"
          >
            Hiring for real-time or developer-facing work?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-body">
            I&apos;m open to full-time roles, remote-friendly from India.
            Email me or grab a slot — I reply within a day.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${SITE.email}`}
              className="machine rounded-md bg-amber px-5 py-3 text-bg transition-opacity hover:opacity-85"
            >
              {SITE.email}
            </a>
            <a
              href={SITE.calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="machine rounded-md border border-line-strong px-5 py-3 text-ink transition-colors hover:border-amber hover:text-amber"
            >
              Book a call ↗
            </a>
          </div>
          <SocialLinks className="mt-7 justify-center" />
        </Reveal>
      </div>
    </section>
  );
}
