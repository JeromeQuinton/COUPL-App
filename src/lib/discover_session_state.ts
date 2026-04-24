/**
 * Discover session state — Phase 1 stub (DR-020).
 *
 * Module-level Sets track per-session "Not Today" dismissals and
 * "Invite to Chat" sends. Resets on full reload — Phase 4 wires to
 * persisted user actions in `pair_compatibility` / interaction tables
 * (DR-017).
 *
 * Subscribers (the feed) re-render on change via a tiny pub/sub so the
 * detail screen can mutate state and the feed reflects it on return,
 * without lifting state into a context just for one screen.
 */

const dismissed = new Set<string>();
const invited = new Set<string>();
const listeners = new Set<() => void>();

const notify = () => {
  for (const l of listeners) l();
};

export const discoverSessionState = {
  isDismissed: (id: string) => dismissed.has(id),
  isInvited: (id: string) => invited.has(id),
  markDismissed(id: string) {
    if (dismissed.has(id)) return;
    dismissed.add(id);
    invited.delete(id);
    notify();
  },
  markInvited(id: string) {
    if (invited.has(id)) return;
    invited.add(id);
    dismissed.delete(id);
    notify();
  },
  reset() {
    dismissed.clear();
    invited.clear();
    notify();
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => {
      listeners.delete(fn);
    };
  },
  /** Snapshot for useSyncExternalStore — returns a tuple of sizes (cheap identity). */
  getSnapshot: () => `${dismissed.size}:${invited.size}`,
};

export type DiscoverCardStatus = "active" | "dismissed" | "invited";

export const statusFor = (id: string): DiscoverCardStatus => {
  if (discoverSessionState.isInvited(id)) return "invited";
  if (discoverSessionState.isDismissed(id)) return "dismissed";
  return "active";
};
