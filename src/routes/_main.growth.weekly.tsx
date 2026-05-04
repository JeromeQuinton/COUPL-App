import { createFileRoute, redirect } from "@tanstack/react-router";

// DR-110: reflection surfaces moved into /polaris. 6-month redirect alias.
// Note: /growth/weekly maps to /polaris/weekly-review (DR-110 vocabulary).
export const Route = createFileRoute("/_main/growth/weekly")({
  beforeLoad: () => {
    throw redirect({ to: "/polaris/weekly-review", replace: true });
  },
});
