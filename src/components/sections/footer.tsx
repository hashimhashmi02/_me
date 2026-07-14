import { SITE } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-8 md:px-8">
        <p className="eyebrow text-muted/70">
          © {new Date().getFullYear()} {SITE.name} · built with Next.js + R3F
        </p>
        <p className="eyebrow text-muted/70">
          <a
            href={SITE.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-cyan"
          >
            github ↗
          </a>
        </p>
      </div>
    </footer>
  );
}
