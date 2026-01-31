"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, ArrowUpRight, Github, Twitter, Linkedin, Copy, Check } from "lucide-react";
import { useState } from "react";
import { PERSONAL_INFO, SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { SectionCanvas, ShapeConfig } from "../canvas/section-canvas";

const socialIconMap = {
    github: Github,
    twitter: Twitter,
    linkedin: Linkedin,
};

const CONTACT_SHAPES: ShapeConfig[] = [
    { type: "torus", position: [-8, 2, -2], color: "#22c55e", scale: 0.8 }, // Green torus
    { type: "sphere", position: [8, -3, -4], color: "#8b5cf6", scale: 0.6 }, // Purple sphere
    { type: "icosahedron", position: [-6, -4, -2], color: "#6366f1", scale: 0.5 }, // Indigo icosa
    { type: "octahedron", position: [8, 4, -5], color: "#3b82f6", scale: 0.7 }, // Blue octa
];

export function Contact() {
    const [emailCopied, setEmailCopied] = useState(false);

    const copyEmail = () => {
        navigator.clipboard.writeText("hashim@example.com"); // This email should be updated to the actual email
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2000);
    };

    return (
        <section id="contact" className="py-24 px-6 relative pb-32 overflow-hidden">
            {/* 3D Background */}
            <SectionCanvas
                shapes={CONTACT_SHAPES}
                lightColor="#22c55e"
                intensity={0.3}
            />

            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-5xl mx-auto"
            >
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
                        <span className="text-sm text-muted-foreground">CONNECT</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        Get in <span className="italic-gradient">touch</span>
                    </h2>
                </motion.div>

                {/* Main Contact Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={cn(
                        "rounded-3xl p-8 md:p-12",
                        "bg-surface/90 border border-white/5",
                        "text-center"
                    )}
                >
                    {/* Headline */}
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Let&apos;s build something{" "}
                        <span className="italic-gradient">extraordinary.</span>
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                        I&apos;m currently open to new opportunities and interesting projects.
                        Whether you have a question or just want to say hi, I&apos;ll try my best
                        to get back to you!
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        <motion.a
                            href="mailto:hashim@example.com"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-full",
                                "bg-white text-black font-medium",
                                "hover:bg-gray-100 transition-colors"
                            )}
                        >
                            Send an Email
                            <ArrowUpRight className="w-4 h-4" />
                        </motion.a>

                        <motion.a
                            href="https://cal.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(
                                "flex items-center gap-2 px-6 py-3 rounded-full",
                                "bg-transparent border border-white/20 text-foreground font-medium",
                                "hover:border-white/40 hover:bg-white/5 transition-all"
                            )}
                        >
                            Schedule a Call
                            <ArrowUpRight className="w-4 h-4" />
                        </motion.a>
                    </div>


                </motion.div>

                {/* Social Buttons Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-8 flex items-center justify-center gap-3"
                >
                    {SOCIAL_LINKS.map((link) => {
                        const Icon = socialIconMap[link.icon as keyof typeof socialIconMap];
                        return (
                            <motion.a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2 rounded-full",
                                    "bg-surface/90 border border-white/10",
                                    "text-muted-foreground hover:text-foreground hover:border-white/20 transition-all"
                                )}
                            >
                                <Icon className="w-4 h-4" />
                                <span className="text-sm">{link.name}</span>
                            </motion.a>
                        );
                    })}
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center text-muted-foreground text-sm mt-16"
                >
                    Built with{" "}
                    <span className="text-red-500">🧠</span>
                    {" "}by{" "}
                    <span className="text-foreground font-medium">Hashim</span>
                    {" "}using{" "}
                    <span className="text-foreground">Next.js</span>,{" "}
                    <span className="text-foreground">Three.js</span> &{" "}
                    <span className="text-foreground">Framer Motion</span>
                </motion.p>
            </motion.div>
        </section>
    );
}
