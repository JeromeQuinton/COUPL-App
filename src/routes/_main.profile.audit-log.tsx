import { createFileRoute, redirect } from "@tanstack/react-router";

// DR-110: /profile/audit-log renamed to /profile/account-history. 6-month redirect alias.
export const Route = createFileRoute("/_main/profile/audit-log")({
  beforeLoad: () => {
    throw redirect({ to: "/profile/account-history", replace: true });
  },
});
