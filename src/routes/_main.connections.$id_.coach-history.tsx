import { useMemo, useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_main/connections/$id_/coach-history")({
  head: () => ({ meta: [{ title: "Polaris on this connection — COUPL" }] }),
  component: CoachHistoryScreen,
});

const isMember = true;

type Kind = "signal" | "repair" | "insight";

const KIND_LABEL: Record<Kind, string> = {
  signal: "Signal",
  repair: "Repair",
  insight: "Insight",
};

type Entry = { id: string; kind: Kind; date: string; surface: string; line: string };

// Phase 1 fixture per-connection. Phase 4 reads connections_sample[$id].polarisHistory.
const HISTORY: Entry[] = [
  {
    id: "h-1",
    kind: "signal",
    date: "2 days ago",
    surface: "Chat",
    line: "A long pause on Tuesday, and you both came back to it carefully.",
  },
  {
    id: "h-2",
    kind: "repair",
    date: "5 days ago",
    surface: "Chat",
    line: "A small repair offered for a brief delay — your attunement to time was specific.",
  },
  {
    id: "h-3",
    kind: "insight",
    date: "last week",
    surface: "Coach",
    line: "The 'I' has softened into 'we' across the last fortnight.",
  },
  {
    id: "h-4",
    kind: "signal",
    date: "2 weeks ago",
    surface: "Discover",
    line: "A heightened return to this profile — you came back to their words ten times in a day.",
  },
  {
    id: "h-5",
    kind: "repair",
    date: "3 weeks ago",
    surface: "Chat",
    line: "A point of friction — repair offered within thirty minutes.",
  },
  {
    id: "h-6",
    kind: "insight",
    date: "a month ago",
    surface: "Coach",
    line: "Symmetry in the exchange — meeting one another's depth with unusual precision.",
  },
];

function CoachHistoryScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/coach-history" });
  const [filter, setFilter] = useState<"all" | Kind>("all");

  const entries = useMemo(
    () => (filter === "all" ? HISTORY : HISTORY.filter((e) => e.kind === filter)),
    [filter],
  );

  return (
    <div className="relative min-h-[100dvh] bg-paper">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-plum-300/15 bg-paper/85 px-4 py-3 backdrop-blur-md">
        <Link
          to="/connections/$id"
          params={{ id: id_ }}
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="font-display text-[15px] font-semibold text-ink">Polaris on this</p>
      </header>

      <div className="px-5 pt-5 pb-12">
        <p className="text-label-mono">Polaris · this connection</p>
        <h1 className="mt-2 font-display text-[26px] leading-tight text-ink">
          Everything Polaris has noticed about this.
        </h1>

        {!isMember ? (
          <article className="mt-6 rounded-[18px] border border-line bg-paper p-6 text-center shadow-elev-1">
            <p className="text-label-mono text-stone">Member</p>
            <p className="mt-3 font-display text-[16px] italic leading-relaxed text-ink">
              See every signal, repair, and insight Polaris has gathered on
              this connection — in one place.
            </p>
            <Link
              to="/membership/plans"
              className="mt-6 inline-flex rounded-full bg-plum-700 px-5 py-2.5 font-display text-[13.5px] font-medium text-paper hover:opacity-90"
            >
              See member plans
            </Link>
          </article>
        ) : (
          <>
            <ul className="mt-5 flex gap-1.5 overflow-x-auto pb-1">
              {(["all", "signal", "repair", "insight"] as const).map((k) => {
                const active = filter === k;
                const label = k === "all" ? "All" : KIND_LABEL[k];
                return (
                  <li key={k}>
                    <button
                      type="button"
                      onClick={() => setFilter(k)}
                      className={
                        active
                          ? "rounded-full bg-plum-700 px-3 py-1 text-label-mono text-paper"
                          : "rounded-full border border-line bg-paper px-3 py-1 text-label-mono text-slate hover:bg-lavender-50"
                      }
                    >
                      {label}
                    </button>
                  </li>
                );
              })}
            </ul>

            <ul className="mt-4 space-y-2.5">
              {entries.map((e) => (
                <li
                  key={e.id}
                  className="rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-body text-[12px] uppercase tracking-[0.12em] text-stone">
                      {e.surface} · {e.date}
                    </p>
                    <span className="rounded-full bg-lavender-50 px-2.5 py-0.5 text-label-mono text-plum-700">
                      {KIND_LABEL[e.kind]}
                    </span>
                  </div>
                  <p className="mt-2 font-body text-[14px] leading-relaxed text-ink">
                    {e.line}
                  </p>
                </li>
              ))}
            </ul>

            <Link
              to="/polaris/audit-log"
              className="mt-7 flex items-center justify-between rounded-[14px] border border-line bg-paper px-4 py-3.5 hover:bg-lavender-50"
            >
              <div>
                <p className="font-display text-[14px] text-ink">
                  All Polaris signals (across connections)
                </p>
                <p className="mt-0.5 font-body text-[12px] text-stone">
                  The full audit log
                </p>
              </div>
              <ChevronRight size={16} className="text-stone" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
