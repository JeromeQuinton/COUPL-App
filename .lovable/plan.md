## Lovable Prompt 5.1 — Sticky header reveal plan

Applies decisions: DR-047 (Photo 1 hero overlays unchanged), DR-054 (sticky bottom bar unchanged).

### Goal
When the user scrolls past Photo 1 on `/discover/$id`, cross-fade the profile's `Name · Age` into the sticky top header (centred between back arrow and filter icon). Snap instantly under `prefers-reduced-motion: reduce`. Photo 1's BL overlay is not moved.

### Files to edit
1. `src/routes/_main.discover.$id.tsx` — wire a ref to the Photo 1 wrapper, observe it, pass reveal state + name/age to header.
2. `src/components/discover/profile/ProfileDetailHeader.tsx` — accept `revealName`, `name`, `age` props; render centre slot with opacity transition.

No new files. No new tokens. Uses existing `src/hooks/use-in-view.ts` (already IntersectionObserver-based and SSR-safe).

### Implementation details

**1. Detail route (`_main.discover.$id.tsx`)**
- Import `useRef` and `useInView`.
- Create `const photo1Ref = useRef<HTMLDivElement>(null);`
- Wrap the existing first `<ProfilePhoto hero={...} />` in a `<div ref={photo1Ref}>` (since `ProfilePhoto` doesn't forward refs and we don't want to change its API).
- `const photo1InView = useInView(photo1Ref, { rootMargin: "-56px 0px 0px 0px" });`
- `const headerReveal = !photo1InView;`
- Pass `revealName={headerReveal}`, `name={profile.name}`, `age={profile.age}` to `<ProfileDetailHeader />`.

**2. `ProfileDetailHeader.tsx`**
- Extend props: `revealName?: boolean; name?: string; age?: number;`
- Layout stays `flex items-center justify-between`. Insert a centred absolute span (or restructure to a 3-column grid) so the back/filter buttons don't shift:
  - Use `relative` on the inner row; absolute-position the centre label with `left-1/2 -translate-x-1/2`, `pointer-events-none`.
- Treatment: `font-body text-[15px] font-medium text-ink` (project uses Inter as body — verify in `styles.css`; if a different token, swap to the equivalent existing token rather than introducing literals).
- Transition: `transition-opacity duration-200 ease-out` with `opacity-100` when `revealName` else `opacity-0`. Add `motion-reduce:transition-none` so reduced-motion users get an instant snap.
- `aria-hidden={!revealName}` on the label so SR doesn't announce it while invisible.
- Render the label only when `name && typeof age === "number"` to keep the existing call sites (if any) from breaking.

### Acceptance
- Scroll on `/discover/p-maya-1`: header label hidden at top; "Maya · 34" fades in once Photo 1's bottom passes the header; fades out on scroll back up.
- Back arrow + filter icon don't reflow when label appears.
- DevTools "Emulate prefers-reduced-motion: reduce" → label snaps with no transition.
- No new colour or font literals (uses `text-ink`, existing body font).
- Forbidden vocabulary (swipe/deck/match/etc.) not introduced.

### After diff
- Run typecheck.
- Screenshots: header at top (no label), header after scroll past Photo 1 (label centred), reduced-motion verification.
- No new architectural decisions expected — purely additive to existing header component; reuses existing `useInView` hook.

### Risks / notes
- `useInView` initial state is `true` (SSR-safe), so `headerReveal` starts `false` — correct first-paint behaviour (header chrome only).
- `rootMargin: "-56px 0px 0px 0px"` assumes ~56px header height; current header is `py-3` + safe-area, so 56px is a reasonable approximation for the trigger line. If visual feel is off, tune to `-64px` in a follow-up.
