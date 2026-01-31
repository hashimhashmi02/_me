"use client";

import { motion } from "framer-motion";
import { Globe, Github, ArrowUpRight } from "lucide-react";
import { PROJECTS } from "@/lib/constants";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SectionCanvas, type ShapeConfig } from "../canvas/section-canvas";

const PROJECT_SHAPES: ShapeConfig[] = [
    { type: "box", position: [9, 0, -5], color: "#ec4899", scale: 0.8 },
    { type: "dodecahedron", position: [-9, 3, -4], color: "#eab308", scale: 0.6 },
    { type: "cone", position: [-8, -4, -3], color: "#f97316", scale: 0.6 },
];

export function Projects() {
    return (
        <section id="projects" className="py-24 px-6 relative overflow-hidden">
            {/* 3D Background */}
            <SectionCanvas
                shapes={PROJECT_SHAPES}
                lightColor="#ec4899"
                intensity={0.4}
            />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-12 flex items-center gap-4"
                >
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm text-muted-foreground">MY PROJECTS</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        Selected <span className="italic-gradient">Work</span>
                    </h2>
                </motion.div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

interface ProjectCardProps {
    project: (typeof PROJECTS)[number];
    index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
                "group rounded-2xl p-6",
                "bg-surface/90 border border-white/5",
                "hover:border-white/10 transition-all duration-300"
            )}
        >
            {/* Laptop Mockup on Pedestal */}
            <div className="relative mb-6">
                {/* Laptop Frame */}
                <div className="relative mx-auto w-full max-w-[280px] aspect-[16/10]">
                    {/* Screen */}
                    <div className="relative rounded-t-lg bg-zinc-800 border border-zinc-700 overflow-hidden shadow-2xl">
                        {/* Screen Content - Gradient placeholder */}
                        <div className="aspect-[16/10] bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex items-center justify-center">
                            {/* Project preview placeholder */}
                            <div className="w-full h-full bg-gradient-to-b from-white/5 to-transparent flex items-center justify-center">
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-bold">
                                        {project.title.charAt(0)}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Screen bezel bottom */}
                        <div className="h-2 bg-zinc-700 rounded-b-sm" />
                    </div>

                    {/* Laptop Base */}
                    <div className="relative h-2 bg-gradient-to-b from-zinc-600 to-zinc-700 rounded-b-lg mx-4" />
                    <div className="relative h-1 bg-zinc-800 rounded-b-lg mx-8" />
                </div>

                {/* Pedestal / Platform */}
                <div className="mt-4 mx-auto w-[200px]">
                    {/* Top surface */}
                    <div className="h-3 bg-gradient-to-b from-zinc-600 to-zinc-700 rounded-t-full" />
                    {/* Side */}
                    <div className="h-8 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-900 rounded-b-lg" />
                </div>
            </div>

            {/* Project Info */}
            <div>
                {/* Title with links */}
                <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold group-hover:text-white transition-colors">
                        {project.title}
                    </h3>
                    <div className="flex items-center gap-2">
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-all"
                        >
                            <Globe className="w-4 h-4" />
                        </a>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 transition-all"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                        <span
                            key={tech}
                            className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-muted-foreground"
                        >
                            <span className={cn(
                                "w-1.5 h-1.5 rounded-full",
                                getTechColor(tech)
                            )} />
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// Helper function for tech badge colors
function getTechColor(tech: string): string {
    const colors: Record<string, string> = {
        "Next.js": "bg-white",
        "TypeScript": "bg-blue-500",
        "React": "bg-cyan-400",
        "Node.js": "bg-green-500",
        "PostgreSQL": "bg-blue-400",
        "MongoDB": "bg-green-400",
        "Prisma": "bg-purple-500",
        "JavaScript": "bg-yellow-400",
        "Rust": "bg-orange-500",
        "Redis": "bg-red-500",
        "Tailwind CSS": "bg-cyan-500",
        "Socket.io": "bg-gray-400",
        "Stripe": "bg-purple-400",
    };
    return colors[tech] || "bg-gray-400";
}
