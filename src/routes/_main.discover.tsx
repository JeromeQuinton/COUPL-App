import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { FeedHeader, type FeedFilter } from "@/components/discover/FeedHeader";
import { FeedSearchRow } from "@/components/discover/FeedSearchRow";
import { UpdatingPanel } from "@/components/discover/UpdatingPanel";
import { ProfileCard } from "@/components/discover/ProfileCard";
import {
  DAILY_QUEUE_SIZE,
  SAMPLE_FEED,
} from "@/data/discover_feed_sample";

export const Route = createFileRoute("/_main/discover")({
  head: () => ({
    meta: [
      { title: "Discover — COUPL" },
      {
        name: "description",
        content: "Your curated daily profiles. Eight people, chosen with care.",
      },
    ],
  }),
  component: DiscoverScreen,
});

function DiscoverScreen() {
  const [activeFilter, setActiveFilter] = useState<FeedFilter>("Intent");
  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(true);

  // Phase 1: filters/search are visually toggleable but don't filter data (DR-019).
  const profiles = SAMPLE_FEED.slice(0, DAILY_QUEUE_SIZE);

  // Stub — Phase 4 wires real refresh.
  const handleRefresh = () => {
    setRefreshing((r) => !r);
  };

  // Tap is a no-op until Prompt 3 builds /discover/[id] (DR-020).
  const handleOpen = (id: string) => {
    // eslint-disable-next-line no-console
    console.log(`profile card tapped: ${id}`);
  };

  return (
    <div
      className="flex flex-col px-4 pt-5"
      style={{
        minHeight: "100dvh",
        paddingTop: "calc(env(safe-area-inset-top) + 1.25rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 120px)",
        background:
          "linear-gradient(180deg, #FCEEF0 0%, #F6E7F2 35%, #EFE2F4 100%)",
      }}
    >
      <div className="flex flex-col gap-5">
        <FeedHeader activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <FeedSearchRow
          query={query}
          onQueryChange={setQuery}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />

        <UpdatingPanel />

        <section aria-labelledby="aligned-profiles-heading" className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Users
                aria-hidden
                width={18}
                height={18}
                strokeWidth={1.75}
                className="text-plum-700"
              />
              <h2
                id="aligned-profiles-heading"
                className="font-display text-[17px] font-semibold text-plum-700"
              >
                New Aligned Profiles · {activeFilter}
              </h2>
            </div>
            <span className="rounded-full bg-lavender-100 px-3 py-1 font-body text-[12px] font-medium text-plum-700">
              {profiles.length} updated
            </span>
          </div>

          <ul className="flex flex-col gap-3">
            {profiles.map((p) => (
              <li key={p.id}>
                <ProfileCard profile={p} onOpen={handleOpen} />
              </li>
            ))}
          </ul>
        </section>

        <p className="rounded-[16px] bg-paper/60 px-4 py-3 text-center font-body text-[13px] text-slate">
          You've met today's {DAILY_QUEUE_SIZE}. Come back tomorrow for a fresh curation.
        </p>

        {/* Curated progress footer */}
        <div className="flex items-center gap-3 pt-1">
          <span className="font-body text-[12px] text-slate">Curated</span>
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-lavender-100"
            role="progressbar"
            aria-valuenow={profiles.length}
            aria-valuemin={0}
            aria-valuemax={DAILY_QUEUE_SIZE}
            aria-label="Today's curation progress"
          >
            <div
              className="h-full rounded-full bg-plum-300"
              style={{ width: `${(profiles.length / DAILY_QUEUE_SIZE) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
