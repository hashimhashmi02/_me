export const SITE = {
  name: "Hashim",
  role: "Full-stack engineer",
  positioning: "Developer tools & real-time web apps",
  location: "India · remote-friendly",
  status: "Open to work — full-time",
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
  hardPart: string;
  stack: string[];
  live: string;
  source: string;
  image: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "exlite",
    title: "Exlite",
    category: "crypto · realtime trading platform",
    description:
      "Live cryptocurrency trading platform with real-time market data, interactive price charts, and portfolio management.",
    hardPart:
      "Keeping a fast, responsive UI in sync with streaming market data over WebSockets.",
    stack: ["Next.js", "TypeScript", "Node.js", "WebSockets"],
    live: "https://exlite-livid.vercel.app/",
    source: "https://github.com/hashimhashmi02/Exlite",
    image: "/projects/exlite.png",
  },
  {
    slug: "bug",
    title: "Bug",
    category: "ai · agentic browser IDE",
    description:
      "AI-powered, browser-based coding environment and agentic workspace — write, run, and iterate on code entirely in the browser.",
    hardPart:
      "Running a real execution environment client-side with WebContainers, wired to live data via Convex and auth via Clerk.",
    stack: ["Next.js", "React", "WebContainers", "Convex", "Clerk"],
    live: "https://bug-opal.vercel.app/",
    source: "https://github.com/hashimhashmi02/bug",
    image: "/projects/bug.png",
  },
  {
    slug: "doable",
    title: "Doable",
    category: "ai · app builder",
    description:
      "AI app builder that generates full-stack applications and websites from a conversational prompt.",
    hardPart:
      "Turning open-ended chat into structured, runnable code — prompt design and output validation over the raw model call.",
    stack: ["React", "OpenAI API", "TypeScript", "Tailwind CSS"],
    live: "https://doablev2.vercel.app/",
    source: "https://github.com/hashimhashmi02/Doablev2",
    image: "/projects/doable.png",
  },
  {
    slug: "axon",
    title: "Axon",
    category: "automation · workflow engine",
    description:
      "Visual workflow automation tool — connect services and APIs through a node-based, drag-and-connect interface.",
    hardPart:
      "A runtime that walks the graph, executes each node, and passes data between integrations.",
    stack: ["React Flow", "Node.js", "Express", "Integrations"],
    live: "https://axon-hazel.vercel.app/",
    source: "https://github.com/hashimhashmi02/axon",
    image: "/projects/axon.png",
  },
];

export const STACK_GROUPS = [
  {
    label: "Daily drivers",
    note: "The tools every project here is built on.",
    items: ["TypeScript", "Next.js / React", "Node.js", "Tailwind"],
  },
  {
    label: "Data & backend",
    note: "Where the realtime and persistence work happens.",
    items: ["PostgreSQL", "Prisma", "WebSockets", "Convex"],
  },
  {
    label: "Also work with",
    note: "In service of shipping, not on the résumé for show.",
    items: ["Docker", "Redis", "AWS", "Framer Motion"],
  },
] as const;

export const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
] as const;
