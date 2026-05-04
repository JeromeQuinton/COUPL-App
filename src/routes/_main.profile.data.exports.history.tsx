import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Download } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/profile/data/exports/history")({
  head: () => ({ meta: [{ title: "Past exports — COUPL" }] }),
  component: ExportsHistoryScreen,
});

type ExportRow = {
  id: string;
  requestedOn: string;
  size: string;
  state: "available" | "expired";
};

// Phase 1 fixture — Phase 4 reads `profile_sample.exportHistory`.
const SAMPLE_EXPORT_HISTORY: ExportRow[] = [
  { id: "e-2026-04-28", requestedOn: "28 April 2026", size: "38.4 MB", state: "available" },
  { id: "e-2026-02-12", requestedOn: "12 February 2026", size: "31.1 MB", state: "expired" },
  { id: "e-2025-11-04", requestedOn: "4 November 2025", size: "27.8 MB", state: "expired" },
];

function ExportsHistoryScreen() {
  const rows = SAMPLE_EXPORT_HISTORY;

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader eyebrow="Data · history" title="Past exports." />
      </header>

      {rows.length === 0 ? (
        <article className="mx-5 rounded-[18px] border border-dashed border-line bg-paper px-5 py-8 text-center">
          <p className="font-display text-[15px] text-ink">
            You haven't requested an export yet.
          </p>
        </article>
      ) : (
        <ul className="px-5 space-y-2.5">
          {rows.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1"
            >
              <div>
                <p className="font-display text-[14px] text-ink">{r.requestedOn}</p>
                <p className="mt-0.5 font-body text-[12px] text-stone">{r.size}</p>
              </div>
              {r.state === "available" ? (
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-plum-700 hover:bg-lavender-50"
                >
                  <Download size={13} strokeWidth={2} />
                  Re-download
                </button>
              ) : (
                <span className="rounded-full bg-lavender-50 px-3 py-1 text-label-mono text-stone">
                  Expired
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      <p className="px-5 pt-6 pb-12 text-center font-body text-[12.5px] italic text-stone">
        We keep export records for one year. The download links expire after 24 hours.
      </p>
    </YouBackdrop>
  );
}
