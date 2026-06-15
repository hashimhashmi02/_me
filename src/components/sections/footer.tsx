import { SITE } from "@/lib/data";
import { SocialLinks } from "@/components/ui/social-links";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-8">
        <p className="machine text-faint">
          © {new Date().getFullYear()} {SITE.name}
        </p>
        <p className="machine text-faint">
          Built with Next.js · React Three Fiber · Tailwind
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
