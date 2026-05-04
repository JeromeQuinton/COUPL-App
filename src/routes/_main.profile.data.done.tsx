import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/profile/data/done")({
  head: () => ({
    meta: [{ title: "Export complete — COUPL" }],
  }),
  component: DataDoneScreen,
});

function DataDoneScreen() {
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
        <div className="mt-6">
          <ScreenHeader eyebrow="Done" title="Saved to your device." />
        </div>
        <p className="mt-3 max-w-[280px] font-body text-[13.5px] leading-relaxed text-slate">
          You'll find the ZIP in Downloads. Keep it somewhere private — it contains your full record.
        </p>

        <Link
          to="/profile"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-plum-700 px-6 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Back to profile
        </Link>
      </div>
    </YouBackdrop>
  );
}
