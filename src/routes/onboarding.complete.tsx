import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
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
    <div className="mx-auto flex min-h-screen max-w-[640px] flex-col items-center justify-center bg-paper px-6 text-center">
      <div
        aria-hidden
        className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-plum-500 bg-paper"
      >
        <Check className="h-9 w-9 text-plum-500" strokeWidth={2.25} />
      </div>
      <h1 className="mt-8 text-display-xxl text-ink">
        You're in,
        <br />
        Mira.
      </h1>
      <p className="mt-4 max-w-sm text-body-lg text-slate">
        Photos are being checked now. You'll have full access in a couple of minutes. Take a breath.
      </p>
      <Link
        to="/home"
        className="mt-8 inline-flex h-12 w-full max-w-xs items-center justify-center rounded-[12px] bg-plum-500 px-6 text-body-md font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
      >
        Take me to Home
      </Link>
      <Link
        to="/onboarding/photo-review"
        className="mt-3 text-label-mono"
      >
        Check progress
      </Link>
      <p className="mt-6 max-w-[28rem] text-center text-body-sm italic text-stone">
        We use automation for everything other apps do by hand. Faster. More private. No team scrolling through your data, ever.
      </p>
    </div>
  );
}
