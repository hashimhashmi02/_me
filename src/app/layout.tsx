import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const viewport: Viewport = {
  themeColor: "#08080c",
};

export const metadata: Metadata = {
  title: "Hashim — Full-stack engineer",
  description:
    "Full-stack engineer building AI-integrated tools that ship — LLM workflow automation, browser IDEs, real-time trading platforms, and production APIs. Open to full-time roles.",
  authors: [{ name: "Hashim" }],
  keywords: [
    "full-stack engineer",
    "AI tools",
    "Next.js",
    "TypeScript",
    "tRPC",
    "real-time",
    "Three.js",
  ],
  openGraph: {
    title: "Hashim — Full-stack engineer",
    description:
      "Full-stack engineer building AI-integrated tools that ship — LLM workflow automation, browser IDEs, real-time platforms.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hashim — Full-stack engineer",
    description:
      "Full-stack engineer building AI-integrated tools that ship.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      >
        <a
          href="#main"
          className="eyebrow sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-cyan focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
