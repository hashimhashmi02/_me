import { SITE } from "@/lib/data";
import { Reveal } from "@/components/ui/reveal";
import { SocialLinks } from "@/components/ui/social-links";

export function Hero() {
  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-svh items-center"
    >
      <div className="mx-auto w-full max-w-6xl px-5 pb-20 pt-28 sm:px-8">
        <div className="max-w-3xl">
          <Reveal>
            <p className="machine mb-6 text-faint">
              {SITE.name} — {SITE.role} · {SITE.location}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="display-hero text-[clamp(2.6rem,8vw,5.4rem)] text-ink">
              Developer tools &amp;
              <br />
              real-time web apps<span className="text-amber">.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 max-w-xl text-[17px] leading-relaxed text-body">
              Trading platforms, agentic coding environments, AI app builders,
              node-based automation engines — work where a responsive interface
              and a system doing real work underneath have to move together.
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SITE.email}`}
                className="machine rounded-md bg-amber px-5 py-3 text-bg transition-opacity hover:opacity-85"
              >
                Email me
              </a>
              <a
                href={SITE.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="machine rounded-md border border-line-strong px-5 py-3 text-ink transition-colors hover:border-amber hover:text-amber"
              >
                Resume
              </a>
              <SocialLinks className="ml-1" />
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="machine mt-10 flex items-center gap-2.5 text-body">
              <span className="pulse-dot" aria-hidden />
              {SITE.status}
            </p>
          </Reveal>
        </div>
      </div>

      <a
        href="#work"
        aria-label="Scroll to selected work"
        className="machine absolute bottom-7 left-1/2 -translate-x-1/2 text-faint transition-colors hover:text-amber"
      >
        ↓ selected work
      </a>
    </section>
  );
}
