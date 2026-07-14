"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/data";
import { useEffects } from "@/lib/effects";
import { scrollToTarget } from "@/components/providers/smooth-scroll";

export default function Nav() {
  const { ready, reduced, toggle } = useEffects();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background,border-color] duration-300 ${
        scrolled ? "nav-blur border-b border-line" : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-8"
      >
        <a
          href="#main"
          onClick={(e) => {
            e.preventDefault();
            scrollToTarget("#main");
          }}
          className="display-card text-base tracking-tight text-ink"
          data-cursor-label="top"
        >
          Hashim<span className="text-cyan">.</span>
        </a>

        <div className="flex items-center gap-1 md:gap-2">
          <ul className="flex items-center gap-0 sm:gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToTarget(link.href);
                  }}
                  className="eyebrow rounded px-1.5 py-2 text-muted transition-colors hover:text-cyan sm:px-3"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {ready && (
            <button
              type="button"
              onClick={toggle}
              aria-pressed={!reduced}
              title={reduced ? "Effects reduced — turn on" : "Effects on — reduce"}
              className="eyebrow rounded border border-line px-3 py-2 text-muted transition-colors hover:border-line-strong hover:text-ink"
            >
              fx<span className={reduced ? "text-muted" : "text-lime"}>·{reduced ? "off" : "on"}</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}
