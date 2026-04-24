import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Begin — COUPL" },
      { name: "description", content: "A calm, considered start." },
    ],
  }),
  component: OnboardingScreen,
});

function OnboardingScreen() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[640px] flex-col px-6 pb-10 pt-16">
      <div className="flex-1">
        <p className="text-body-sm uppercase tracking-[0.18em] text-plum-500">
          COUPL
        </p>
        <h1 className="mt-3 text-display-xl text-ink">A different kind of start.</h1>
        <p className="mt-3 text-body-lg text-slate">
          One question at a time. No rush, no scoring. Phase 1 placeholder —
          full onboarding flow lands in a later prompt.
        </p>
      </div>

      <div className="space-y-3">
        <Link
          to="/home"
          className="flex h-12 w-full items-center justify-center rounded-[12px] bg-plum-500 text-body-md font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
        >
          Begin
        </Link>
        <Link
          to="/signin"
          className="flex h-12 w-full items-center justify-center rounded-[12px] border border-line bg-paper text-body-md font-medium text-ink transition-colors hover:bg-cloud"
        >
          I already have an account
        </Link>
      </div>
    </div>
  );
}