// Personal Info
export const PERSONAL_INFO = {
  name: "Hashim",
  title: "Full-Stack Developer",
  tagline: "Building the future, one line of code at a time.",
  bio: "I'm a passionate developer who loves creating beautiful, performant web applications. I specialize in React, Next.js, and modern web technologies.",
  location: "India",
  status: "Open to work",
  email: "hashimhashmi86@gmail.com",
} as const;

export const SOCIAL_LINKS = [
    {
        name: "GitHub",
        url: "https://github.com/hashimhashmi02",
        icon: "github",
    },
  {
    name: "Twitter",
    url: "https://x.com/Swakji",
    icon: "twitter",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/hashim-hashmi",
    icon: "linkedin",
  },
] as const;

// Navigation Items
export const NAV_ITEMS = [
  { name: "Home", href: "#home", icon: "home" },
  { name: "About", href: "#about", icon: "user" },
  { name: "Projects", href: "#projects", icon: "folder" },
  { name: "Stack", href: "#stack", icon: "layers" },
  { name: "Contact", href: "#contact", icon: "mail" },
] as const;

// Projects
export const PROJECTS = [
  {
    id: 1,
    title: "Exlite",
    description: "A comprehensive cryptocurrency trading platform with real-time market data, interactive charts, and portfolio management.",
    image: "/projects/exlite.png",
    tech: ["Next.js", "TypeScript", "Node.js", "WebSockets"],
    github: "https://github.com/hashimhashmi02/Exlite",
    live: "https://exlite-livid.vercel.app/",
    featured: true,
  },
  {
    id: 2,
    title: "Doable",
    description: "An AI-powered app builder that creates full-stack applications and websites through conversational interfaces.",
    image: "/projects/doable.png",
    tech: ["React", "OpenAI API", "Tailwind CSS", "TypeScript"],
    github: "https://github.com/hashimhashmi02/Doablev2",
    live: "https://doablev2.vercel.app/",
    featured: true,
  },
  {
    id: 3,
    title: "Axon",
    description: "A visual workflow automation tool allowing users to connect various services and APIs using a node-based interface.",
    image: "/projects/axon.png",
    tech: ["React Flow", "Node.js", "Express", "Integrations"],
    github: "https://github.com/hashimhashmi02/axon",
    live:"https://axon-hazel.vercel.app/",
    featured: false,
  },
  {
    id: 4,
    title: "Bug",
    description: "An AI-powered, browser-based coding environment and agentic workspace built with Next.js, WebContainers, Convex, and Clerk.",
    image: "/projects/bug.png",
    tech: ["Next.js", "React", "Convex", "Clerk"],
    github: "https://github.com/hashimhashmi02/bug",
    live:"https://bug-opal.vercel.app/",
    featured: false,
  },
] as const;


export const TECH_STACK = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "🔷" },
  { name: "JavaScript", icon: "🟨" },
  { name: "Node.js", icon: "🟢" },
  { name: "Rust", icon: "🦀" },
  { name: "PostgreSQL", icon: "🐘" },
  { name: "Prisma", icon: "◮" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Redis", icon: "🔴" },
  { name: "Docker", icon: "🐳" },
  { name: "AWS", icon: "☁️" },
  { name: "Tailwind CSS", icon: "🎨" },
  { name: "Framer Motion", icon: "🎬" },
] as const;


export const SCENE_CONFIG = {
  cameraPosition: [0, 0, 8] as [number, number, number],
  ambientLightIntensity: 0.5,
  pointLightIntensity: 1,
  gravity: [0, 0, 0] as [number, number, number],
  repulsionForce: 5,
  driftSpeed: 0.01,
} as const;

// Floating Shapes Configuration
export const FLOATING_SHAPES = [
  { type: "sphere", position: [-3, 2, 0], color: "#6366f1", scale: 0.6 },
  { type: "torus", position: [3, -1, 1], color: "#8b5cf6", scale: 0.5 },
  { type: "box", position: [-2, -2, -1], color: "#a855f7", scale: 0.5 },
  { type: "icosahedron", position: [2, 2, -1], color: "#ec4899", scale: 0.4 },
  { type: "octahedron", position: [0, -3, 0], color: "#06b6d4", scale: 0.5 },
  { type: "dodecahedron", position: [-4, 0, 1], color: "#22c55e", scale: 0.4 },
  { type: "cone", position: [4, 1, -1], color: "#eab308", scale: 0.5 },
  { type: "torusKnot", position: [0, 3, 1], color: "#f97316", scale: 0.3 },
] as const;
