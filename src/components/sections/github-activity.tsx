"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface ContributionDay {
    date: string;
    count: number;
    level: number;
}

interface ApiResponse {
    total: Record<string, number>;
    contributions: ContributionDay[];
}

const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan"];

const getContributionColor = (level: number) => {
    switch (level) {
        case 0:
            return "bg-[#161b22]";
        case 1:
            return "bg-green-900/60";
        case 2:
            return "bg-green-700/80";
        case 3:
            return "bg-green-500";
        case 4:
            return "bg-green-400";
        default:
            return "bg-[#161b22]";
    }
};

export function GitHubActivity() {
    const [contributions, setContributions] = useState<number[][]>([]);
    const [loading, setLoading] = useState(true);
    const [totalContributionsLastYear, setTotalContributionsLastYear] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://github-contributions-api.jogruber.de/v4/hashimhashmi02?y=last");
                const data: ApiResponse = await response.json();

                // Take the last 364 days (52 weeks * 7 days)
                // ensure we have enough data, otherwise pad
                const relevantData = data.contributions.slice(-364);

                const weeks: number[][] = [];
                let currentWeek: number[] = [];

                relevantData.forEach((day, index) => {
                    currentWeek.push(day.level);
                    if (currentWeek.length === 7) {
                        weeks.push(currentWeek);
                        currentWeek = [];
                    }
                });
                ``
                if (currentWeek.length > 0) {
                    weeks.push(currentWeek);
                }

                setContributions(weeks);

                // Calculate total for the displayed period
                const total = relevantData.reduce((acc, curr) => acc + curr.count, 0);
                setTotalContributionsLastYear(total);
            } catch (error) {
                console.error("Failed to fetch GitHub contributions", error);
                // Fallback or empty state could be handled here
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <section className="py-24 px-6 overflow-hidden">
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
                    className="mb-8 flex items-center gap-4"
                >
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface border border-white/10">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm text-muted-foreground">OPEN SOURCE</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-bold">
                        GitHub <span className="italic-gradient">Activity</span>
                    </h2>
                </motion.div>

                {/* Contribution Graph Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={cn(
                        "rounded-2xl p-6 md:p-8",
                        "bg-surface/90 border border-white/5",
                        "min-h-[200px] flex flex-col justify-center"
                    )}
                >
                    {loading ? (
                        <div className="flex items-center justify-center h-40">
                            <Loader2 className="w-8 h-8 animate-spin text-green-500" />
                        </div>
                    ) : (
                        <>
                            {/* Months Header */}
                            <div className="flex mb-2 text-xs text-muted-foreground">
                                {/* Simplified months display - just spreading them out */}
                                <div className="flex-1 flex justify-between px-1">
                                    {months.map((month, i) => (
                                        <span key={i} className="w-8 text-center">{month}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Contribution Grid */}
                            <div className="flex gap-[3px] overflow-x-auto pb-4 scrollbar-hide">
                                {contributions.map((week, weekIndex) => (
                                    <div key={weekIndex} className="flex flex-col gap-[3px]">
                                        {week.map((level, dayIndex) => (
                                            <motion.div
                                                key={`${weekIndex}-${dayIndex}`}
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    delay: weekIndex * 0.005 + dayIndex * 0.005,
                                                    duration: 0.2,
                                                }}
                                                className={cn(
                                                    "w-[10px] h-[10px] rounded-sm",
                                                    getContributionColor(level)
                                                )}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="flex flex-wrap items-center justify-between mt-4 text-sm text-muted-foreground gap-4">
                                <span>{totalContributionsLastYear} contributions in the last year</span>

                                {/* Legend */}
                                <div className="flex items-center gap-2">
                                    <span>Less</span>
                                    <div className="flex gap-[2px]">
                                        {[0, 1, 2, 3, 4].map((level) => (
                                            <div
                                                key={level}
                                                className={cn(
                                                    "w-[10px] h-[10px] rounded-sm",
                                                    getContributionColor(level)
                                                )}
                                            />
                                        ))}
                                    </div>
                                    <span>More</span>
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>

                {/* GitHub Stats Cards (Static/Placeholder or fetched if API provides) */}
                {/* API response only gives contributions. We'll keep these static or update manually for now as requested 'fetch activity' usually implies the graph. */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6"
                >
                    <div className="p-4 rounded-xl bg-surface/90 border border-white/5 text-center transition-colors hover:bg-surface hover:border-white/10">
                        <p className="text-2xl font-bold text-green-400">20+</p>
                        <p className="text-sm text-muted-foreground">Repositories</p>
                    </div>
                    <div className="p-4 rounded-xl bg-surface/90 border border-white/5 text-center transition-colors hover:bg-surface hover:border-white/10">
                        <p className="text-2xl font-bold text-green-400">1.2k+</p>
                        <p className="text-sm text-muted-foreground">Commits</p>
                    </div>
                    <div className="p-4 rounded-xl bg-surface/90 border border-white/5 text-center transition-colors hover:bg-surface hover:border-white/10">
                        <p className="text-2xl font-bold text-green-400">150+</p>
                        <p className="text-sm text-muted-foreground">Pull Requests</p>
                    </div>
                    <div className="p-4 rounded-xl bg-surface/90 border border-white/5 text-center transition-colors hover:bg-surface hover:border-white/10">
                        <p className="text-2xl font-bold text-green-400">5+</p>
                        <p className="text-sm text-muted-foreground">Years Coding</p>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
