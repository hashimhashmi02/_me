"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/lib/data";
import { useEffects } from "@/lib/effects";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { ready, reduced, toggle } = useEffects();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[border-color,background-color] duration-300 ${
        scrolled ? "nav-blur border-b border-line" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8"
      >
        <a
          href="#main"
          className="font-display text-[15px] font-semibold tracking-tight text-ink"
        >
          hashim<span className="text-amber">.</span>
        </a>

        <div className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="machine text-faint transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <span className="machine hidden items-center gap-2.5 text-body sm:flex">
            <span className="pulse-dot" aria-hidden />
            open to work
          </span>

          {ready && (
            <button
              type="button"
              onClick={toggle}
              aria-pressed={!reduced}
              title={reduced ? "Enable 3D effects" : "Reduce effects"}
              className="machine rounded-md border border-line px-2.5 py-1.5 text-faint transition-colors hover:border-line-strong hover:text-ink"
            >
              fx·{reduced ? "off" : "on"}
            </button>
          )}

          <a
            href={`mailto:${SITE.email}`}
            className="machine rounded-md bg-ink px-3.5 py-2 text-bg transition-colors hover:bg-amber"
          >
            Get in touch
          </a>
        </div>
      </nav>
    </header>
  );
}
