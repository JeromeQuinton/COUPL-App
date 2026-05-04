import { createFileRoute, redirect } from "@tanstack/react-router";

// DR-110: 6-month redirect alias. Drop after 2026-11-04.
export const Route = createFileRoute("/_main/coach/monthly-summary/$monthId_")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/polaris/monthly-summary/$monthId",
      params: { monthId: params.monthId },
      replace: false,
    });
  },
});
