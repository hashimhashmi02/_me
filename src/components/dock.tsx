"use client";

import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "@/lib/constants";
import { motion } from "framer-motion";
import { Home, User, FolderOpen, Layers, Mail, Sun, Moon, Eye, EyeOff } from "lucide-react";
import { useTheme } from "next-themes";
import { useSettings } from "@/components/settings-provider";

const iconMap = {
    home: Home,
    user: User,
    folder: FolderOpen,
    layers: Layers,
    mail: Mail,
};

export function Dock() {
    const { theme, setTheme } = useTheme();
    const { showParticles, setShowParticles } = useSettings();

    return (
        <motion.nav
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
            className={cn(
                "fixed bottom-6 left-1/2 -translate-x-1/2 z-50",
                "flex items-center gap-2 p-2",
                "rounded-2xl",
                "bg-surface/80 backdrop-blur-xl",
                "border border-white/10",
                "shadow-2xl shadow-black/50"
            )}
        >
            {NAV_ITEMS.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap];
                return (
                    <DockItem key={item.name} href={item.href} name={item.name}>
                        <Icon className="w-5 h-5" />
                    </DockItem>
                );
            })}

            {/* Separator */}
            <div className="w-px h-8 bg-white/10 mx-1" />

            {/* Theme Toggle */}
            <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn(
                    "relative flex items-center justify-center",
                    "w-12 h-12 rounded-xl",
                    "bg-surface hover:bg-white/10",
                    "text-muted-foreground hover:text-foreground",
                    "transition-colors duration-200",
                    "group"
                )}
            >
                <div className="relative w-5 h-5">
                    <Sun className="absolute inset-0 w-full h-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute inset-0 w-full h-full rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </div>

                {/* Tooltip */}
                <span
                    className={cn(
                        "absolute -top-10 left-1/2 -translate-x-1/2",
                        "px-2 py-1 rounded-md",
                        "bg-surface/90 backdrop-blur-sm border border-white/10",
                        "text-xs font-medium text-foreground",
                        "opacity-0 group-hover:opacity-100",
                        "transition-opacity duration-200",
                        "whitespace-nowrap pointer-events-none"
                    )}
                >
                    Switch Theme
                </span>

            </button>

            {/* Particle Toggle */}
            <button
                onClick={() => setShowParticles(!showParticles)}
                className={cn(
                    "relative flex items-center justify-center",
                    "w-12 h-12 rounded-xl",
                    "bg-surface hover:bg-white/10",
                    "text-muted-foreground hover:text-foreground",
                    "transition-colors duration-200",
                    "group"
                )}
            >
                {showParticles ? (
                    <Eye className="w-5 h-5 transition-all" />
                ) : (
                    <EyeOff className="w-5 h-5 transition-all text-red-400" />
                )}

                {/* Tooltip */}
                <span
                    className={cn(
                        "absolute -top-10 left-1/2 -translate-x-1/2",
                        "px-2 py-1 rounded-md",
                        "bg-surface/90 backdrop-blur-sm border border-white/10",
                        "text-xs font-medium text-foreground",
                        "opacity-0 group-hover:opacity-100",
                        "transition-opacity duration-200",
                        "whitespace-nowrap pointer-events-none"
                    )}
                >
                    {showParticles ? "Hide Effects" : "Show Effects"}
                </span>
            </button>
        </motion.nav >
    );
}

interface DockItemProps {
    href: string;
    name: string;
    children: React.ReactNode;
}

function DockItem({ href, name, children }: DockItemProps) {
    return (
        <motion.a
            href={href}
            whileHover={{ scale: 1.2, y: -8 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "relative flex items-center justify-center",
                "w-12 h-12 rounded-xl",
                "bg-surface hover:bg-white/10",
                "text-muted-foreground hover:text-foreground",
                "transition-colors duration-200",
                "group"
            )}
        >
            {children}

            {/* Tooltip */}
            <span
                className={cn(
                    "absolute -top-10 left-1/2 -translate-x-1/2",
                    "px-2 py-1 rounded-md",
                    "bg-surface/90 backdrop-blur-sm border border-white/10",
                    "text-xs font-medium text-foreground",
                    "opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-200",
                    "whitespace-nowrap pointer-events-none"
                )}
            >
                {name}
            </span>
        </motion.a>
    );
}
