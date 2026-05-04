import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/profile/safety/reports")({
  head: () => ({ meta: [{ title: "Your reports — COUPL" }] }),
  component: ReportsListScreen,
});

type Status = "received" | "reviewing" | "closed";

const STATUS_LABEL: Record<Status, string> = {
  received: "Received",
  reviewing: "Reviewing",
  closed: "Closed",
};

const SAMPLE_REPORTS: { id: string; date: string; category: string; status: Status }[] = [
  { id: "r1", date: "28 Apr", category: "Harassment", status: "reviewing" },
  { id: "r2", date: "12 Apr", category: "Spam", status: "closed" },
  { id: "r3", date: "2 Mar", category: "Impersonation", status: "closed" },
];

function ReportsListScreen() {
  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link to="/profile/safety" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader eyebrow="Reports" title="What's been escalated?" titleItalic />
      </header>

      {SAMPLE_REPORTS.length === 0 ? (
        <article className="mx-5 rounded-[18px] border border-dashed border-line bg-paper px-5 py-8 text-center">
          <p className="font-display text-[15px] text-ink">No reports yet.</p>
          <p className="mt-2 font-display text-[13px] italic text-stone">
            If something feels off, you can report it from any profile.
          </p>
        </article>
      ) : (
        <ul className="px-5 pb-12 space-y-2.5">
          {SAMPLE_REPORTS.map((r) => (
            <li key={r.id} className="flex items-start justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1">
              <div>
                <p className="text-label-mono">{r.date.toUpperCase()}</p>
                <p className="mt-1 font-display text-[14.5px] text-ink">{r.category}</p>
              </div>
              <span
                className="rounded-full px-3 py-1 text-label-mono"
                style={{
                  background: r.status === "closed" ? "color-mix(in oklab, var(--success) 15%, var(--paper))" : "color-mix(in oklab, var(--caution) 15%, var(--paper))",
                  color: r.status === "closed" ? "var(--success)" : "var(--caution)",
                }}
              >
                {STATUS_LABEL[r.status]}
              </span>
            </li>
          ))}
        </ul>
      )}
    </YouBackdrop>
  );
}
