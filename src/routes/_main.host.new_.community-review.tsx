import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Check } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/host/new_/community-review")({
  head: () => ({ meta: [{ title: "Review and publish — COUPL" }] }),
  component: CommunityReviewScreen,
});

const SUMMARY = [
  { label: "Shape", value: "Walk" },
  { label: "Where", value: "Hampstead Heath · Parliament Hill" },
  { label: "Cost", value: "Free" },
  { label: "Date", value: "Sun 17 May · 10:00" },
  { label: "Capacity", value: "12" },
];

function CommunityReviewScreen() {
  const navigate = useNavigate();

  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link to="/host/new/community-detail" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader eyebrow="Community · 3 / 3" title="Read it back." />
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          Make sure it still feels like the gathering you want to host.
        </p>
      </header>

      <ul className="px-5 flex flex-col gap-2.5">
        {SUMMARY.map((row) => (
          <li
            key={row.label}
            className="flex items-start justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1"
          >
            <div className="min-w-0 flex-1">
              <p className="text-label-mono">{row.label}</p>
              <p className="mt-1 font-display text-[14.5px] italic leading-snug text-ink">
                {row.value}
              </p>
            </div>
            <Link to="/host/new/community" className="ml-4 shrink-0 text-label-mono text-plum-500 hover:text-plum-700">
              Edit
            </Link>
          </li>
        ))}
      </ul>

      <p className="px-5 pt-5 font-body text-[12.5px] italic text-stone">
        No platform cut on Community rooms — they keep COUPL grounded.
      </p>

      <div className="sticky bottom-24 z-30 px-5 pt-6 pb-6 space-y-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/host" })}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-plum-700 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          <Check size={16} strokeWidth={2.25} />
          Publish room
        </button>
        <button
          type="button"
          onClick={() => navigate({ to: "/host" })}
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Save as draft
        </button>
      </div>
    </EventsBackdrop>
  );
}
