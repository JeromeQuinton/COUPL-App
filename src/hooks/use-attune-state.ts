import { useSyncExternalStore, useCallback } from "react";

/**
 * useAttuneState — per-profile attune state. V0: in-memory singleton
 * store, no backend wiring. Phase 4 swaps this for a persisted
 * `attunes` table read.
 *
 * One Attune per profile (sender picks target). Once sent, all entry
 * points for that profile dim.
 */

export type AttuneTarget =
  | { type: "profile" }
  | { type: "module"; key: string }
  | { type: "photo"; index: number };

export type AttuneAction = {
  fromUserId: string;
  toProfileId: string;
  target: AttuneTarget;
  comment?: string;
  createdAt: string;
};

// V0 PLACEHOLDER — replace with authenticated viewer id in Phase 4.
const VIEWER_ID_V0 = "viewer-v0";

const store = new Map<string, AttuneAction>();
const listeners = new Set<() => void>();

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const notify = () => listeners.forEach((l) => l());

const getSnapshotFor = (profileId: string) => () =>
  store.get(profileId) ?? null;

export function useAttuneState(profileId: string): {
  attune: AttuneAction | null;
  sendAttune: (target: AttuneTarget, comment?: string) => void;
  clearAttune: () => void;
} {
  const attune = useSyncExternalStore(
    subscribe,
    getSnapshotFor(profileId),
    getSnapshotFor(profileId),
  );

  const sendAttune = useCallback(
    (target: AttuneTarget, comment?: string) => {
      store.set(profileId, {
        fromUserId: VIEWER_ID_V0,
        toProfileId: profileId,
        target,
        comment,
        createdAt: new Date().toISOString(),
      });
      notify();
    },
    [profileId],
  );

  const clearAttune = useCallback(() => {
    store.delete(profileId);
    notify();
  }, [profileId]);

  return { attune, sendAttune, clearAttune };
}