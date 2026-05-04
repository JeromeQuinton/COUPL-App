import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Download } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/profile/data/export")({
  head: () => ({
    meta: [{ title: "Data export — COUPL" }],
  }),
  component: DataExportScreen,
});

const INCLUDED = [
  "Profile, prompts, photos",
  "Connection history (titles only)",
  "Reflections and journal entries",
  "Coach interventions and your responses",
  "Decision audit log entries",
  "Membership and event records",
];

function DataExportScreen() {
  const navigate = useNavigate();

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link to="/profile" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader eyebrow="Data export" title="Take your record with you." />
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          Access your relational history without friction. Standard formats, no obscurity.
        </p>
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          Informed users make stronger choices.
        </p>
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="text-label-mono">Included in your archive</p>
          <ul className="mt-3 space-y-2">
            {INCLUDED.map((line) => (
              <li key={line} className="flex items-start gap-2 font-body text-[13px] text-ink">
                <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-plum-500" />
                {line}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-body text-[12.5px] italic text-stone">
            Other people's messages and photos are excluded — their data isn't yours to export.
          </p>
        </article>
      </section>

      <section className="px-5 pt-5">
        <p className="font-body text-[12.5px] text-slate">
          Format: ZIP containing JSON + media folders. Most archives prepare in 2–5 minutes.
        </p>
      </section>

      <div className="px-5 pt-8 pb-12 space-y-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/profile/data/export/preparing" })}
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90 inline-flex items-center justify-center gap-2"
        >
          <Download size={16} strokeWidth={2.25} />
          Begin export
        </button>
        <Link
          to="/profile"
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Cancel
        </Link>
      </div>
    </YouBackdrop>
  );
}
