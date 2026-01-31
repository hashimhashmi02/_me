"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { Github, Twitter, Linkedin, ChevronDown, ArrowRight, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

// Dynamic import for 3D canvas to avoid SSR issues
const HeroCanvas = dynamic(
    () => import("@/components/canvas/hero-canvas").then((mod) => mod.HeroCanvas),
    { ssr: false }
);

const socialIconMap = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
};

export function Hero() {
    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* 3D Canvas Background */}
            <HeroCanvas />

            {/* Content Overlay */}
            <div className="relative z-10 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    {/* Profile Photo with Status Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="flex items-center gap-4 mb-8"
                    >
                        {/* Avatar */}
                        <div className="relative">
                            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 overflow-hidden flex items-center justify-center">
                                <img
                                    src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=hiro&hairColor=000000&mouth=happy10`}
                                    alt="Profile Avatar"
                                    width={80}
                                    height={80}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Online indicator */}
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-background" />
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-sm text-green-400 font-medium uppercase tracking-wide">
                                {PERSONAL_INFO.status}
                            </span>
                        </div>
                    </motion.div>

                    {/* Name with dash */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-2"
                    >
                        {PERSONAL_INFO.name}{" "}
                        <span className="text-muted-foreground">—</span>
                    </motion.h1>

                    {/* Title */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl sm:text-2xl text-muted-foreground mb-6"
                    >
                        {PERSONAL_INFO.title}
                    </motion.p>

                    {/* Tagline with tech badges */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <p className="text-muted-foreground/80 mb-4 max-w-xl">
                            I craft minimalist and{" "}
                            <span className="text-foreground font-medium underline decoration-green-500/50 underline-offset-4">
                                performant
                            </span>{" "}
                            web experiences. Building interactive, modern applications with
                        </p>
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/80 border border-white/10 text-sm">
                                ⚡ Next.js
                            </span>
                            <span className="text-muted-foreground">,</span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/80 border border-white/10 text-sm">
                                🔷 TypeScript
                            </span>
                            <span className="text-muted-foreground">and</span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface/80 border border-white/10 text-sm">
                                ⚛️ React
                            </span>
                        </div>
                    </motion.div>

                    {/* CTA Buttons + Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        {/* Get in touch button */}
                        <a
                            href="#contact"
                            className={cn(
                                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full",
                                "bg-white text-black font-medium",
                                "hover:bg-gray-100 transition-colors"
                            )}
                        >
                            Get in touch
                            <ArrowRight className="w-4 h-4" />
                        </a>

                        {/* Resume button */}
                        <a
                            href="/resume.pdf"
                            target="_blank"
                            className={cn(
                                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full",
                                "bg-transparent border border-white/20 text-foreground font-medium",
                                "hover:border-white/40 hover:bg-white/5 transition-all"
                            )}
                        >
                            Resume
                            <FileText className="w-4 h-4" />
                        </a>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2 ml-2">
                            {SOCIAL_LINKS.map((link) => {
                                const Icon = socialIconMap[link.icon as keyof typeof socialIconMap];
                                return (
                                    <motion.a
                                        key={link.name}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="flex items-center justify-center w-10 h-10 rounded-full bg-surface/50 border border-white/10 text-muted-foreground hover:text-foreground hover:border-white/20 transition-colors"
                                    >
                                        <Icon className="w-4 h-4" />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.a
                    href="#about"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors"
                >
                    <span className="text-xs mb-2">Scroll</span>
                    <ChevronDown className="w-5 h-5" />
                </motion.a>
            </motion.div>

            {/* Gradient overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </section>
    );
}
