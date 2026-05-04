import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/profile/data/export/complete")({
  head: () => ({
    meta: [{ title: "Export downloaded — COUPL" }],
  }),
  component: ExportCompleteScreen,
});

function ExportCompleteScreen() {
  return (
    <YouBackdrop>
      <StatusBar />

      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <span
          aria-hidden
          className="grid h-14 w-14 place-items-center rounded-full border border-plum-500 text-plum-700"
        >
          <Check size={24} strokeWidth={2.25} />
        </span>
        <p className="mt-6 text-label-mono">Data · downloaded</p>
        <h1 className="mt-3 font-display text-[28px] leading-tight text-ink">
          Got it.
        </h1>
        <p className="mt-4 max-w-[300px] font-body text-[13.5px] italic leading-relaxed text-slate">
          Your export was downloaded. You can request another in 7 days.
        </p>

        <Link
          to="/profile"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-plum-700 px-6 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Back to settings
        </Link>
      </div>
    </YouBackdrop>
  );
}
