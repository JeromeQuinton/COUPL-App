import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/profile/account/delete/cancel")({
  head: () => ({ meta: [{ title: "Deletion cancelled — COUPL" }] }),
  component: CancelScreen,
});

// Phase 1 fixture: same +30d as the scheduled screen. Phase 4 reads
// account_state.deletionScheduledAt, then clears it on this surface.
function fixtureScheduledAt() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function CancelScreen() {
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
        <p className="mt-6 text-label-mono">Account · cancel deletion</p>
        <h1 className="mt-3 font-display text-[28px] leading-tight text-ink">
          You're staying.
        </h1>
        <p className="mt-4 max-w-[300px] font-body text-[14px] leading-relaxed text-ink">
          We've cancelled your deletion. Welcome back.
        </p>
        <p className="mt-3 max-w-[300px] font-body text-[12.5px] italic text-stone">
          Your scheduled date was {fixtureScheduledAt()} — that's gone now.
        </p>

        <Link
          to="/profile/account"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-plum-700 px-6 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Back to settings
        </Link>
      </div>
    </YouBackdrop>
  );
}
