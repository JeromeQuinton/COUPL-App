import { useSyncExternalStore, useCallback } from "react";

/**
 * useFeedExclusions — session-only set of profile ids excluded from the
 * Discover feed. Singleton store so the Discover route and the detail
 * route share the same instance without prop drilling or context.
 *
 * V0 PLACEHOLDER — Phase 4 replaces this with:
 *   - persistent Attune storage (attuned profiles never re-emerge)
 *   - 7-day Not Today re-emergence window
 */

const excluded = new Set<string>();
const listeners = new Set<() => void>();

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

let cachedSnapshot: Set<string> = new Set(excluded);
const getSnapshot = () => cachedSnapshot;

const notify = () => {
  cachedSnapshot = new Set(excluded);
  listeners.forEach((l) => l());
};

export function useFeedExclusions(): {
  excludedProfileIds: Set<string>;
  excludeProfile: (id: string) => void;
  clearExclusions: () => void;
} {
  const excludedProfileIds = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getSnapshot,
  );

  const excludeProfile = useCallback((id: string) => {
    excluded.add(id);
    notify();
  }, []);

  const clearExclusions = useCallback(() => {
    excluded.clear();
    notify();
  }, []);

  return { excludedProfileIds, excludeProfile, clearExclusions };
}