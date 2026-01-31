// Personal Info
export const PERSONAL_INFO = {
  name: "Hashim",
  title: "Full-Stack Developer",
  tagline: "Building the future, one line of code at a time.",
  bio: "I'm a passionate developer who loves creating beautiful, performant web applications. I specialize in React, Next.js, and modern web technologies.",
  location: "India",
  status: "Open to work",
  email: "hashim@example.com",
} as const;

// Social Links
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
    title: "Project Alpha",
    description: "A full-stack SaaS application with real-time features and AI integration.",
    image: "/projects/project1.jpg",
    tech: ["Next.js", "TypeScript", "Prisma", "OpenAI"],
    github: "https://github.com/hashimhashmi02",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 2,
    title: "Project Beta",
    description: "Modern e-commerce platform with seamless payment integration.",
    image: "/projects/project2.jpg",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/hashimhashmi02",
    live: "https://example.com",
    featured: true,
  },
  {
    id: 3,
    title: "Project Gamma",
    description: "Real-time collaboration tool for remote teams.",
    image: "/projects/project3.jpg",
    tech: ["Next.js", "Socket.io", "PostgreSQL", "Redis"],
    github: "https://github.com/hashimhashmi02",
    live: "https://example.com",
    featured: false,
  },
  {
    id: 4,
    title: "Project Delta",
    description: "AI-powered analytics dashboard with data visualization.",
    image: "/projects/project4.jpg",
    tech: ["React", "D3.js", "Python", "TensorFlow"],
    github: "https://github.com/hashimhashmi02",
    live: "https://example.com",
    featured: false,
  },
] as const;

// Tech Stack
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

// 3D Scene Configuration
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
