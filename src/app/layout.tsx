import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Dock } from "@/components/dock";
import { ThemeProvider } from "@/components/theme-provider";
import { SettingsProvider } from "@/components/settings-provider";
import { GlobalCanvas } from "@/components/canvas/global-canvas";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hashim | Full-Stack Developer",
  description: "Full-Stack Developer building the future, one line of code at a time. Specializing in React, Next.js, and modern web technologies.",
  keywords: ["developer", "portfolio", "react", "nextjs", "fullstack", "web development"],
  authors: [{ name: "Hashim" }],
  openGraph: {
    title: "Hashim | Full-Stack Developer",
    description: "Full-Stack Developer building the future, one line of code at a time.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hashim | Full-Stack Developer",
    description: "Full-Stack Developer building the future, one line of code at a time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground transition-colors duration-300`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SettingsProvider>
            <GlobalCanvas />
            {children}
            <Dock />
          </SettingsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
