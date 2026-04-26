import { createFileRoute, Outlet } from "@tanstack/react-router";

/**
 * Onboarding layout route. Children: /onboarding (index), /onboarding/$step,
 * /onboarding/complete, /onboarding/error.
 *
 * Routing note: the spec referenced `/app/onboarding/*`. The project's
 * existing convention (DR-020) and the in-place `/onboarding` route keep
 * this at `/onboarding/*`. If an `/app` segment is added later, children
 * move with one rename.
 */
export const Route = createFileRoute("/onboarding")({
  component: () => <Outlet />,
});