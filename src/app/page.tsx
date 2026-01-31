import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { GitHubActivity } from "@/components/sections/github-activity";
import { Projects } from "@/components/sections/projects";
import { TechStack } from "@/components/sections/tech-stack";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <main className="relative">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Sections */}
      <Hero />
      <About />
      <GitHubActivity />
      <Projects />
      <TechStack />
      <Contact />
    </main>
  );
}

