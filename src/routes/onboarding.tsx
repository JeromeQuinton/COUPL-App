import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Onboarding layout route.
 *
 * Routing note: the user spec referenced `/app/onboarding/*`. The project's
 * existing flat-dot convention (DR-020) and the in-place /onboarding route
 * keep this under `/onboarding/*`. If we later introduce an `/app` segment
 * (e.g. for a marketing-site split), the children move with one rename.
 */
export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Begin — COUPL" },
      { name: "description", content: "A calm, considered start." },
    ],
  }),
  component: OnboardingLayout,
});

function OnboardingLayout() {
  return <Outlet />;
}