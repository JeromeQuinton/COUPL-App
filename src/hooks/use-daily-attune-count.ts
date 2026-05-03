import { useEffect, useState } from "react";

// Phase 1: in-memory state, scoped to the page lifecycle. Phase 4 wires this
// to a per-user attune_log table with calendar-day reset. Returning a setter
// pattern keeps the gate logic simple to test until then.

const KEY = "coupl.discover.dailyAttune.v1";

type Stored = { date: string; count: number };

function todayKey(): string {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function read(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as Stored;
    if (parsed.date !== todayKey()) return 0;
    return typeof parsed.count === "number" ? parsed.count : 0;
  } catch {
    return 0;
  }
}

function write(count: number) {
  if (typeof window === "undefined") return;
  try {
    const stored: Stored = { date: todayKey(), count };
    window.localStorage.setItem(KEY, JSON.stringify(stored));
  } catch {
    /* noop */
  }
}

export function useDailyAttuneCount() {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setCount(read());
  }, []);

  const increment = () => {
    const next = read() + 1;
    write(next);
    setCount(next);
    return next;
  };

  return { count, increment };
}

// Stub. Phase 4: wire to membership table.
export function useIsFreeTier(): boolean {
  return true;
}

export const FREE_TIER_DAILY_ATTUNE_LIMIT = 3;
