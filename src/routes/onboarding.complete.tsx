import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import { clearDraft } from "@/lib/onboarding_store";

export const Route = createFileRoute("/onboarding/complete")({
  head: () => ({
    meta: [
      { title: "Welcome — COUPL" },
      { name: "description", content: "Your profile is ready." },
    ],
  }),
  component: CompleteScreen,
});

/**
 * SUCCESS state. Wipes the draft on mount so a returning user lands on
 * the empty intro instead of a stale "Continue" prompt.
 */
function CompleteScreen() {
  useEffect(() => {
    clearDraft();
  }, []);

  return (
    <div className="mx-auto flex min-h-screen max-w-[640px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lavender-100">
        <CheckCircle2 className="h-8 w-8 text-plum-500" aria-hidden />
      </div>
      <h1 className="mt-6 text-display-xl text-ink">You're set up.</h1>
      <p className="mt-3 max-w-md text-body-lg text-slate">
        We'll use what you shared to surface considered, well-aligned
        recommendations. Take your time — there's no rush here.
      </p>
      <Link
        to="/discover"
        className="mt-8 inline-flex h-12 items-center justify-center rounded-[12px] bg-ink px-6 text-body-md font-medium text-blush shadow-elev-1 transition-colors hover:opacity-90"
      >
        See your recommendations
      </Link>
    </div>
  );
}
