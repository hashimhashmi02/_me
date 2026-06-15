"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * "Reduce effects" preference as a tiny external store:
 * defaults from prefers-reduced-motion + a low-power heuristic, overridable
 * via the visible toggle, persisted to localStorage.
 */

const STORAGE_KEY = "fx-reduced";

let cached: boolean | null = null;
const listeners = new Set<() => void>();

function detectDefault(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  const nav = navigator as Navigator & { deviceMemory?: number };
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return true;
  if (nav.deviceMemory && nav.deviceMemory <= 4) return true;
  return false;
}

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): boolean {
  if (cached === null) {
    const stored = localStorage.getItem(STORAGE_KEY);
    cached = stored !== null ? stored === "1" : detectDefault();
  }
  return cached;
}

// Server (and first hydration pass) renders the safe, static variant.
const getServerSnapshot = () => true;
const getServerReady = () => false;
const getClientReady = () => true;

export function useEffects() {
  const reduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(subscribe, getClientReady, getServerReady);

  const toggle = useCallback(() => {
    cached = !getSnapshot();
    localStorage.setItem(STORAGE_KEY, cached ? "1" : "0");
    listeners.forEach((listener) => listener());
  }, []);

  return { ready, reduced, toggle };
}
