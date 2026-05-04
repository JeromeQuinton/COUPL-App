import { createFileRoute, redirect } from "@tanstack/react-router";

// DR-110: 6-month redirect alias. Drop after 2026-11-04.
export const Route = createFileRoute("/_main/coach/monthly-summary/")({
  beforeLoad: () => {
    throw redirect({ to: "/polaris/monthly-summary", replace: true });
  },
});
