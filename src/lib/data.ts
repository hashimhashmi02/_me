export const SITE = {
  name: "Hashim",
  role: "Full-stack engineer",
  positioning: "Full-stack engineer building AI-integrated tools that ship.",
  location: "India · remote-friendly",
  status: "Open to work · full-time",
  email: "hashimhashmi02@gmail.com",
  resume: "/resume.pdf",
  calLink: "https://cal.com/hashim-hashmi-pk5n0m",
  github: "https://github.com/hashimhashmi02",
  linkedin: "https://www.linkedin.com/in/hashim-hashmi",
  x: "https://x.com/Swakji",
} as const;

export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  /** the one metric / hard part that proves it's real */
  proof: string;
  stack: string[];
  /** extra engineering context, shown only in the expanded card */
  detail?: string;
  live?: string;
  source?: string;
  /** hue the card glow leans toward */
  accent: "cyan" | "violet" | "magenta";
};

export const PROJECTS: Project[] = [
  {
    slug: "axon",
    title: "Axon",
    category: "llm workflow automation",
    description:
      "Node-based LLM workflow automation. Wire models, services, and APIs into executable graphs.",
    proof: "Has paying users",
    stack: ["React Flow", "Node.js", "Real-time", "Integrations"],
    live: "https://axon-hazel.vercel.app/",
    source: "https://github.com/hashimhashmi02/axon",
    accent: "cyan",
  },
  {
    slug: "bug",
    title: "Bug",
    category: "browser ide",
    description:
      "Browser IDE with AI code suggestions served through a custom CodeMirror 6 plugin.",
    proof: "Sub-200ms AI suggestions",
    stack: ["Next.js", "CodeMirror 6", "WebContainers", "Convex"],
    live: "https://bug-opal.vercel.app/",
    source: "https://github.com/hashimhashmi02/bug",
    accent: "magenta",
  },
  {
    slug: "cityrun",
    title: "CityRun",
    category: "3d · endless runner",
    description:
      "Neon three-lane endless runner with every character, texture, and sound generated in code.",
    proof: "Zero asset files · ~15 draw calls",
    stack: ["React Three Fiber", "TypeScript", "Zustand", "WebAudio", "Vitest"],
    detail:
      "The simulation is pure TypeScript with no Three.js or React imports, so physics, collision, spawning, and chase AI all run headless under 25 Vitest tests. A fixed 120 Hz timestep keeps behavior identical across refresh rates, preallocated pools keep the render loop allocation-free, and everything repeated is instanced. Characters are procedurally rigged, textures are drawn to canvas at runtime, and sound is synthesized with WebAudio.",
    live: "https://city-run.vercel.app/",
    source: "https://github.com/hashimhashmi02/CityRun",
    accent: "cyan",
  },
  {
    slug: "doable",
    title: "Doable",
    category: "ai app builder",
    description:
      "Natural-language-to-React-app builder. Describe the app, get structured, runnable code.",
    proof: "Prompt → validated running app",
    stack: ["React", "OpenAI API", "TypeScript", "Tailwind"],
    live: "https://doablev2.vercel.app/",
    source: "https://github.com/hashimhashmi02/Doablev2",
    accent: "violet",
  },
  {
    slug: "exlite",
    title: "Exlite",
    category: "realtime trading",
    description:
      "Real-time crypto trading platform with streaming market data, live charts, and portfolio tracking.",
    proof: "Live order books over WebSockets",
    stack: ["Next.js", "TypeScript", "Node.js", "WebSockets"],
    live: "https://exlite-livid.vercel.app/",
    source: "https://github.com/hashimhashmi02/Exlite",
    accent: "cyan",
  },
  {
    slug: "dailywages",
    title: "DailyWages",
    category: "services marketplace",
    description:
      "Hyperlocal services marketplace connecting daily-wage workers with nearby jobs.",
    proof: "GPS + Aadhaar verification + UPI payments",
    stack: ["Next.js", "PostgreSQL", "Maps/GPS", "UPI"],
    // TODO(hashim): add live/source URLs
    accent: "violet",
  },
  {
    slug: "tryla",
    title: "Tryla",
    category: "production api",
    description:
      "Production REST API with dual payment gateways and Redis-backed caching.",
    proof: "Dual payment gateways + Redis caching",
    stack: ["Node.js", "Express", "Redis", "PostgreSQL"],
    // TODO(hashim): add live/source URLs
    accent: "magenta",
  },
];

export const STACK = [
  { name: "Next.js", note: "app router, RSC, the default" },
  { name: "TypeScript", note: "strict; types are the spec" },
  { name: "tRPC", note: "end-to-end typed APIs" },
  { name: "PostgreSQL / Prisma", note: "relational by default" },
  { name: "Node / NestJS", note: "services & realtime backends" },
  { name: "React Flow", note: "node editors & graph UIs" },
  { name: "Redis", note: "caching, queues, presence" },
  { name: "Three.js", note: "R3F, shaders, this site" },
] as const;

export type LogEntry = {
  date: string; // ISO-ish, editable
  tag: "ship" | "wip" | "fix";
  text: string;
};

/** Build log — placeholder entries, edit freely. */
export const BUILD_LOG: LogEntry[] = [
  {
    date: "2026-07",
    tag: "wip",
    text: "Building an AI HR hiring dashboard at Zuvomo: pipeline scoring + structured screening.",
  },
  {
    date: "2026-07",
    tag: "ship",
    text: "CityRun: 3D endless runner shipped, ~2,400 lines of TypeScript and zero asset files.",
  },
  {
    date: "2026-06",
    tag: "ship",
    text: "Axon: usage-based billing shipped; first paying users onboarded.",
  },
  {
    date: "2026-05",
    tag: "ship",
    text: "Bug: custom CodeMirror 6 suggestion plugin, p95 latency under 200ms.",
  },
  {
    date: "2026-04",
    tag: "fix",
    text: "Exlite: reconnect/backoff for WebSocket feeds; zero dropped candles on flaky networks.",
  },
];

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Log", href: "#log" },
  { label: "Contact", href: "#contact" },
] as const;
