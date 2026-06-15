import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Hashim — Developer tools & real-time web apps",
  description:
    "Full-stack engineer building developer tools and real-time web apps — trading platforms, agentic coding environments, AI app builders, and node-based automation engines. Open to full-time roles.",
  authors: [{ name: "Hashim" }],
  keywords: [
    "developer tools",
    "real-time",
    "WebSockets",
    "Next.js",
    "TypeScript",
    "full-stack engineer",
  ],
  openGraph: {
    title: "Hashim — Developer tools & real-time web apps",
    description:
      "Full-stack engineer building trading platforms, agentic IDEs, AI app builders, and workflow engines. Open to full-time roles.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Hashim — Developer tools & real-time web apps",
    description:
      "Full-stack engineer building trading platforms, agentic IDEs, AI app builders, and workflow engines.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${bricolage.variable} ${plexMono.variable}`}>
        <a
          href="#main"
          className="machine sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-amber focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
