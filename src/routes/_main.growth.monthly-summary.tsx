import { createFileRoute, redirect } from "@tanstack/react-router";

// DR-110: reflection surfaces moved into /polaris. 6-month redirect alias.
export const Route = createFileRoute("/_main/growth/monthly-summary")({
  beforeLoad: () => {
    throw redirect({ to: "/polaris/monthly-summary", replace: true });
  },
});
