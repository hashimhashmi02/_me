"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface SettingsContextType {
    showParticles: boolean;
    setShowParticles: (show: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const [showParticles, setShowParticles] = useState(true);

    // Optional: Persist to localStorage
    useEffect(() => {
        const stored = localStorage.getItem("showParticles");
        if (stored !== null) {
            setShowParticles(stored === "true");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("showParticles", String(showParticles));
    }, [showParticles]);

    return (
        <SettingsContext.Provider value={{ showParticles, setShowParticles }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}
