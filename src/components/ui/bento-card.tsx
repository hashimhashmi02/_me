"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BentoCardProps {
    children: ReactNode;
    className?: string;
    colSpan?: 1 | 2 | 3 | 4;
    rowSpan?: 1 | 2 | 3;
    hover?: boolean;
    glow?: boolean;
}

export function BentoCard({
    children,
    className,
    colSpan = 1,
    rowSpan = 1,
    hover = true,
    glow = false,
}: BentoCardProps) {
    const colSpanClasses = {
        1: "col-span-1",
        2: "col-span-1 md:col-span-2",
        3: "col-span-1 md:col-span-2 lg:col-span-3",
        4: "col-span-1 md:col-span-2 lg:col-span-4",
    };

    const rowSpanClasses = {
        1: "row-span-1",
        2: "row-span-1 md:row-span-2",
        3: "row-span-1 md:row-span-2 lg:row-span-3",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            whileHover={hover ? { scale: 1.02, y: -5 } : undefined}
            className={cn(
                "relative rounded-2xl p-6",
                "bg-surface border border-white/10",
                "transition-all duration-300",
                hover && "hover:border-white/20 hover:bg-surface-hover",
                glow && "glow-subtle",
                colSpanClasses[colSpan],
                rowSpanClasses[rowSpan],
                className
            )}
        >
            {/* Gradient border on hover */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none gradient-border" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

export function BentoGrid({
    children,
    className,
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6",
                className
            )}
        >
            {children}
        </div>
    );
}
