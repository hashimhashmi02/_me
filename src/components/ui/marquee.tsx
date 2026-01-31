"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MarqueeProps {
    children: ReactNode;
    className?: string;
    reverse?: boolean;
    pauseOnHover?: boolean;
    speed?: "slow" | "normal" | "fast";
}

export function Marquee({
    children,
    className,
    reverse = false,
    pauseOnHover = true,
    speed = "normal",
}: MarqueeProps) {
    const speedClasses = {
        slow: "animate-[marquee_60s_linear_infinite]",
        normal: "animate-[marquee_40s_linear_infinite]",
        fast: "animate-[marquee_20s_linear_infinite]",
    };

    return (
        <div
            className={cn(
                "relative overflow-hidden",
                pauseOnHover && "[&:hover_.marquee-content]:pause",
                className
            )}
        >
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-background to-transparent pointer-events-none" />

            {/* Marquee content */}
            <div
                className={cn(
                    "marquee-content flex gap-8 whitespace-nowrap",
                    speedClasses[speed],
                    reverse && "[animation-direction:reverse]"
                )}
                style={{
                    animationPlayState: "running",
                }}
            >
                {/* Duplicate content for seamless loop */}
                {children}
                {children}
            </div>
        </div>
    );
}

// Individual marquee item for tech stack
interface MarqueeItemProps {
    icon: string;
    name: string;
}

export function MarqueeItem({ icon, name }: MarqueeItemProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            className={cn(
                "flex items-center gap-3 px-6 py-3",
                "rounded-full border border-white/10",
                "bg-surface/50 backdrop-blur-sm",
                "hover:border-white/20 hover:bg-surface",
                "transition-all duration-300 cursor-default"
            )}
        >
            <span className="text-2xl">{icon}</span>
            <span className="text-sm font-medium text-foreground/80">{name}</span>
        </motion.div>
    );
}
