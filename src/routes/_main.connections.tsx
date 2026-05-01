import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ConnectionCard } from "@/components/connections/ConnectionCard";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { CONNECTIONS, type ConnectionState } from "@/data/connections_sample";

/**
 * /connections — relationship portfolio hub. Filter chips by state.
 * Cool-off cards include the natural-close window note (DR-034 spirit:
 * reduce reactive ending; let things ebb gracefully).
 */
export const Route = createFileRoute("/_main/connections")({
  head: () => ({
    meta: [
      { title: "Connections — COUPL" },
      {
        name: "description",
        content:
          "Your open conversations, cool-offs, and recent endings.",
      },
    ],
  }),
  component: ConnectionsHubScreen,
});

type Filter = "active" | "cool-off" | "closed";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "active", label: "Active" },
  { id: "cool-off", label: "Cool-off" },
  { id: "closed", label: "Closed" },
];

function ConnectionsHubScreen() {
  const [filter, setFilter] = useState<Filter>("active");

  const counts = useMemo(() => {
    const c: Record<ConnectionState, number> = {
      active: 0,
      "cool-off": 0,
      closed: 0,
    };
    for (const x of CONNECTIONS) c[x.state]++;
    return c;
  }, []);

  const visible = CONNECTIONS.filter((c) => c.state === filter);

  return (
    <PageBackdrop>
      <div
        className="mx-auto w-full max-w-[480px] px-5"
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 1.25rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 100px)",
        }}
      >
        <header>
          <h1 className="font-display text-[26px] font-semibold text-ink">
            Connections
          </h1>
          <p className="mt-2 text-[13.5px] leading-relaxed text-slate">
            {counts.active} open. {counts["cool-off"]} in cool-off.{" "}
            {counts.closed === 0
              ? "One closed well last month."
              : `${counts.closed} closed well last month.`}
          </p>
        </header>

        {/* Filter chips */}
        <div className="mt-4 flex items-center gap-2" role="tablist">
          {FILTERS.map((f) => {
            const active = f.id === filter;
            const count = counts[f.id] || (f.id === "closed" ? 1 : 0);
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={
                  "rounded-full border px-3 py-1.5 text-[12.5px] font-medium transition-colors " +
                  (active
                    ? "border-plum-500/70 bg-plum-500 text-paper"
                    : "border-plum-300/35 bg-paper/70 text-plum-700 hover:border-plum-300/60")
                }
              >
                {f.label} {count > 0 ? count : ""}
              </button>
            );
          })}
        </div>

        {/* Active list */}
        <section className="mt-5 space-y-2.5" aria-label="Connections list">
          {visible.length > 0 ? (
            visible.map((c) => (
              <ConnectionCard key={c.id} connection={c} />
            ))
          ) : (
            <p className="rounded-2xl border border-dashed border-plum-300/40 bg-paper/40 px-4 py-6 text-center text-[13px] text-slate">
              {filter === "closed"
                ? "Closed conversations stay private. Nothing to show here right now."
                : "Nothing here yet."}
            </p>
          )}
        </section>

        {filter === "cool-off" && visible.length > 0 && (
          <p className="mt-4 px-1 text-center text-[11.5px] uppercase tracking-[0.16em] text-plum-500">
            · In cool-off ·
          </p>
        )}
      </div>
    </PageBackdrop>
  );
}