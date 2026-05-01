import { useMemo, useState, useSyncExternalStore } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { FeedHeader } from "@/components/discover/FeedHeader";
import {
  FeedFilterRow,
  type LockedFilter,
  type ToggleFilter,
} from "@/components/discover/FeedFilterRow";
import { FeedSubhead } from "@/components/discover/FeedSubhead";
import { MoreFiltersSheet } from "@/components/discover/MoreFiltersSheet";
import { EmptyStateFooter } from "@/components/discover/EmptyStateFooter";
import { ProfileCard } from "@/components/discover/ProfileCard";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { SAMPLE_FEED } from "@/data/discover_feed_sample";
import { capForTier, useUserTier } from "@/lib/user_tier";
import { useUserPreferences } from "@/lib/user_preferences";
import { discoverSessionState, statusFor } from "@/lib/discover_session_state";
import { useFeedExclusions } from "@/hooks/use-feed-exclusions";

export const Route = createFileRoute("/_main/discover/")({
  head: () => ({
    meta: [
      { title: "Discover — COUPL" },
      {
        name: "description",
        content: "Your ongoing feed of aligned profiles, refreshed daily.",
      },
    ],
  }),
  component: DiscoverScreen,
});

function DiscoverScreen() {
  const tier = useUserTier();
  const cap = capForTier(tier);
  const prefs = useUserPreferences();
  const navigate = useNavigate();
  const { excludedProfileIds, clearExclusions } = useFeedExclusions();

  // Subscribe so cards re-render when detail screen mutates session state.
  useSyncExternalStore(
    discoverSessionState.subscribe,
    discoverSessionState.getSnapshot,
    discoverSessionState.getSnapshot,
  );

  const [activeToggles, setActiveToggles] = useState<Set<ToggleFilter>>(new Set());
  const [moreOpen, setMoreOpen] = useState(false);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [lockedTapped, setLockedTapped] = useState<LockedFilter | null>(null);

  const profiles = useMemo(
    () =>
      SAMPLE_FEED.filter((p) => !excludedProfileIds.has(p.id)).slice(0, cap),
    [cap, excludedProfileIds],
  );

  const handleToggle = (f: ToggleFilter) => {
    setActiveToggles((prev) => {
      const next = new Set(prev);
      if (next.has(f)) {
        next.delete(f);
        return next;
      }
      // Free tier — single-select. Paid — stackable.
      if (tier === "free") {
        next.clear();
      }
      next.add(f);
      return next;
    });
  };

  const handleLockedTap = (f: LockedFilter) => {
    if (tier === "free") {
      setLockedTapped(f);
      setUpgradeOpen(true);
      return;
    }
    // Paid tier — Phase 4 picker. Stub no-op.
    // eslint-disable-next-line no-console
    console.log(`open picker for: ${f}`);
  };

  const handleUpgrade = () => {
    setMoreOpen(false);
    setLockedTapped(null);
    setUpgradeOpen(true);
  };

  const handleOpen = (id: string) => {
    navigate({ to: "/discover/$id", params: { id } });
  };

  return (
    <div
      className="mx-auto flex w-full max-w-[420px] flex-col px-4 pt-5"
      style={{
        minHeight: "100dvh",
        paddingTop: "calc(env(safe-area-inset-top) + 1.25rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 120px)",
        background: "var(--blush)",
      }}
    >
      <div className="flex flex-col gap-5">
        <FeedHeader tier={tier} />

        <FeedFilterRow
          tier={tier}
          intentLabel={prefs.intent}
          distanceLabel={`${prefs.distanceKm}km`}
          intentActive={Boolean(prefs.intent)}
          distanceActive={typeof prefs.distanceKm === "number"}
          activeToggles={activeToggles}
          onToggle={handleToggle}
          onLockedTap={handleLockedTap}
          onMoreFilters={() => setMoreOpen(true)}
        />

        <FeedSubhead tier={tier} shown={profiles.length} />

        <ul className="flex flex-col gap-3">
          {profiles.map((p, i) => (
            <li key={p.id}>
              <ProfileCard
                profile={p}
                position={i + 1}
                onOpen={handleOpen}
                status={statusFor(p.id)}
              />
            </li>
          ))}
        </ul>

        <EmptyStateFooter tier={tier} onUpgrade={() => setUpgradeOpen(true)} />

        <div className="pt-4 pb-2 text-center">
          <button
            type="button"
            onClick={() => {
              clearExclusions();
              discoverSessionState.reset();
            }}
            className="font-body text-[12px] text-stone underline-offset-2 transition-colors hover:text-rust hover:underline"
          >
            Dev: Reset feed
          </button>
        </div>
      </div>

      <MoreFiltersSheet
        open={moreOpen}
        onOpenChange={setMoreOpen}
        tier={tier}
        onUpgrade={handleUpgrade}
      />

      <Sheet
        open={upgradeOpen}
        onOpenChange={(o) => {
          setUpgradeOpen(o);
          if (!o) setLockedTapped(null);
        }}
      >
        <SheetContent
          side="bottom"
          className="rounded-t-[24px] border-t border-ink bg-blush px-5 pb-8 pt-6"
        >
          <SheetHeader className="text-left">
            <SheetTitle className="font-display text-[20px] font-semibold text-ink">
              {lockedTapped
                ? `Editing ${lockedTapped} is part of paid`
                : "Unlock deeper alignment"}
            </SheetTitle>
            <SheetDescription className="font-body text-[13px] text-slate">
              Paid tier lets you adjust Intent and Distance, stack filters, see up
              to 40 aligned profiles a day, and apply depth filters and Modes.
            </SheetDescription>
          </SheetHeader>

          <button
            type="button"
            onClick={() => setUpgradeOpen(false)}
            className="mt-5 w-full rounded-full bg-ink px-5 py-3 font-display text-[15px] font-medium text-blush shadow-elev-1 transition-colors hover:opacity-90"
          >
            See paid plans
          </button>
          <p className="pt-3 text-center font-body text-[12px] text-slate">
            Billing wires up in a later phase.
          </p>
        </SheetContent>
      </Sheet>
    </div>
  );
}
