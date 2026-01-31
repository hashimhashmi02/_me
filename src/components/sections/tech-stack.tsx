"use client";

import { motion } from "framer-motion";
import { Marquee, MarqueeItem } from "@/components/ui/marquee";
import { TECH_STACK } from "@/lib/constants";

export function TechStack() {
    // Split tech stack into two rows
    const firstRow = TECH_STACK.slice(0, Math.ceil(TECH_STACK.length / 2));
    const secondRow = TECH_STACK.slice(Math.ceil(TECH_STACK.length / 2));

    return (
        <section id="stack" className="py-24 overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="max-w-6xl mx-auto px-6 mb-12">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                            Tech <span className="italic-gradient">Stack</span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl">
                            Technologies I love working with to build amazing products.
                        </p>
                    </motion.div>
                </div>

                {/* Marquee Rows */}
                <div className="space-y-6">
                    <Marquee speed="normal">
                        {firstRow.map((tech) => (
                            <MarqueeItem key={tech.name} icon={tech.icon} name={tech.name} />
                        ))}
                    </Marquee>

                    <Marquee speed="normal" reverse>
                        {secondRow.map((tech) => (
                            <MarqueeItem key={tech.name} icon={tech.icon} name={tech.name} />
                        ))}
                    </Marquee>
                </div>
            </motion.div>
        </section>
    );
}

