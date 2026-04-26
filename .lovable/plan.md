## Recommendation: replace the singletons with TanStack Query, not a server-mirroring singleton

Short answer to the three questions:

1. **No, the `useSyncExternalStore` + module-singleton + pub/sub pattern does not translate cleanly.** It works today only because it is a pure in-memory cache — there is no fetch, no staleness, no error state, no concurrent writer, no auth scoping. Once the server is the source of truth, every one of those concerns appears, and the singleton becomes a hand-rolled cache that has to be invalidated, refetched, hydrated for SSR, and reconciled with optimistic updates. That is exactly what TanStack Query already does, and the project already has it wired (TanStack Start docs in our context describe `QueryClientProvider` in `__root.tsx` and `queryClient` on router context).

2. **Server-as-source-of-truth pushes us to a different primitive: TanStack Query + server functions, with optimistic mutations.** Not "refetch on every navigation". The right shape is: queries own the read side, mutations own the write side, and `queryClient.setQueryData` + `invalidateQueries` is the equivalent of today's `notify()`.

3. **For the "Maya now excluded" cross-route propagation:** the feed subscribes to a `useQuery(["discover", "feed"])`. The Attune mutation on the detail route, on success, calls `queryClient.setQueryData(["discover","feed"], old => old.filter(p => p.id !== id))` (optimistic) and `invalidateQueries(["discover","feed"])` (authoritative refetch in the background). When the user navigates back, the feed already reflects the change from cache — no flash, no full network round-trip blocking the UI. This is structurally identical to today's pub/sub flow, just with the cache and the network both owned by Query.

## What changes shape, concretely

| Concern | Today | After |
|---|---|---|
| Feed read | `SAMPLE_FEED.filter(...)` against in-memory `Set` | `useQuery(["discover","feed",filters])` → server fn returning already-filtered list |
| Exclusions | `useFeedExclusions` singleton `Set<string>` | Server-side: rows in an `interactions` table (`not_today`, `attune`). No client store. |
| Dismissed/invited pill state | `discoverSessionState` singleton + pub/sub | Derived from the same server query (status comes back per profile) |
| Attune state per profile | `useAttuneState` singleton `Map` | `useQuery(["attune", profileId])` + `useMutation(sendAttune)` |
| Cross-route propagation | `notify()` → `useSyncExternalStore` rerender | `queryClient.setQueryData` (optimistic) + `invalidateQueries` |
| Dev Reset | `clearExclusions()` + `discoverSessionState.reset()` | Server fn that deletes the viewer's session-scoped interaction rows + `queryClient.invalidateQueries(["discover"])` |

## Three architectural decisions to ratify before any code

- **DR-NEW-A — TanStack Query becomes the canonical client cache for all server-backed Discover state.** The three module singletons (`use-feed-exclusions`, `discover_session_state`, `use-attune-state`) are deleted, not wrapped. Wrapping them would create two sources of truth and re-introduce the reset-by-clear-app-data hole.

- **DR-NEW-B — Mutations are optimistic by default on the Discover surface.** Not Today and Attune both feel instant today (singleton write is synchronous). To preserve that feel against a network call, every mutation uses `onMutate` to update the feed cache, `onError` to roll back, `onSettled` to invalidate. This is non-negotiable for the "silent transition" feel DR-033/DR-036 require.

- **DR-NEW-C — Server is the only authority for tier, quota, exclusions, and Attune history.** Client never decides "is this profile excluded" or "have I attuned" — it only renders what the server returns. This closes the revenue-gating hole you flagged. `CURRENT_TIER` and `CURRENT_USER_PREFERENCES` constants in `src/lib/` get deleted in the same pass; both become server-derived values returned by a `getViewerContext` server fn.

## What stays

- `useState` for ephemeral UI: `AttuneDateCard` form fields, popover open flags, `MoreFiltersSheet` open flag, `EmptyStateNudge` dismissal, `info` sheet state, `confirmation` visibility, `primaryDialogOpen`. None of these are revenue-gating; all are correctly client-local. No change.

- The `AttuneSentConfirmation` 800ms overlay timing, the navigate-back-to-feed flow, and the AttuneTarget wrapper API. The mutation slots into `completeAttune` with the same callback signature; only the body changes.

## What this does NOT cover (out of scope for this turn)

- The actual server fn implementations (`recordNotToday`, `sendAttune`, `getDiscoverFeed`, `getViewerContext`, `resetDevSession`).
- The Supabase schema for `interactions` / `attunes` / `viewer_session` (already sketched in project knowledge under "Detail-view assessment data architecture").
- 7-day Not Today re-emergence window (DR-territory, separate decision).
- Auth wiring — replacing `VIEWER_ID_V0` with `requireSupabaseAuth` middleware context.

Each of those is a follow-up prompt once you ratify DR-NEW-A/B/C.

## Bottom line

The current pattern is a fine Phase-1 stub but it is the wrong shape to extend. Don't preserve it. Replace the three singletons with TanStack Query + server functions + optimistic mutations. The cross-route "Maya is gone" behaviour is preserved through `setQueryData` in the mutation's `onMutate`, which is the direct equivalent of today's `notify()` — the difference is that the cache is now backed by an authoritative server query that survives reload, clear-app-data, and device switch.