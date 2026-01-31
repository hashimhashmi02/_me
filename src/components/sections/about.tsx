"use client";

import { motion } from "framer-motion";
import { BentoCard, BentoGrid } from "@/components/ui/bento-card";
import { PERSONAL_INFO } from "@/lib/constants";
import { MapPin, Briefcase, Code, Coffee } from "lucide-react";

export function About() {
    return (
        <section id="about" className="py-24 px-6 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="max-w-6xl mx-auto"
            >
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        About <span className="italic-gradient">Me</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl">
                        Get to know more about who I am and what drives me.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <BentoGrid>
                    {/* Main Bio Card */}
                    <BentoCard colSpan={2} rowSpan={2} glow>
                        <div className="h-full flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="relative">
                                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 overflow-hidden flex items-center justify-center">
                                            <img
                                                src={`https://api.dicebear.com/9.x/pixel-art/svg?seed=hiro&hairColor=000000&mouth=happy10`}
                                                alt="Profile Avatar"
                                                width={64}
                                                height={64}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">{PERSONAL_INFO.name}</h3>
                                        <p className="text-muted-foreground">{PERSONAL_INFO.title}</p>
                                    </div>
                                </div>
                                <p className="text-muted-foreground leading-relaxed">
                                    {PERSONAL_INFO.bio}
                                </p>
                            </div>

                            {/* Status Indicator */}
                            <div className="mt-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm text-green-400">{PERSONAL_INFO.status}</span>
                            </div>
                        </div>
                    </BentoCard>

                    {/* Location Card */}
                    <BentoCard>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-blue-400" />
                            </div>
                            <span className="text-sm text-muted-foreground">Location</span>
                        </div>
                        <p className="text-xl font-semibold">{PERSONAL_INFO.location}</p>
                    </BentoCard>

                    {/* Experience Card */}
                    <BentoCard>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                <Briefcase className="w-5 h-5 text-purple-400" />
                            </div>
                            <span className="text-sm text-muted-foreground">Experience</span>
                        </div>
                        <p className="text-xl font-semibold">2+ Years</p>
                    </BentoCard>

                    {/* Projects Card */}
                    <BentoCard>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                                <Code className="w-5 h-5 text-green-400" />
                            </div>
                            <span className="text-sm text-muted-foreground">Projects Built</span>
                        </div>
                        <p className="text-xl font-semibold">20+</p>
                    </BentoCard>

                    {/* Coffee Card (Fun Stat) */}
                    <BentoCard>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                <Coffee className="w-5 h-5 text-amber-400" />
                            </div>
                            <span className="text-sm text-muted-foreground">Cups of Coffee</span>
                        </div>
                        <p className="text-xl font-semibold">∞</p>
                    </BentoCard>
                </BentoGrid>
            </motion.div>
        </section>
    );
}
