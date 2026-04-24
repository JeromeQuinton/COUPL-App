import { createFileRoute, redirect } from "@tanstack/react-router";

// Phase 1: index simply hands off to /home inside the (main) shell.
// Phase 2 will route unauthenticated users to /signin instead.
export const Route = createFileRoute("/")({
  beforeLoad: () => {
    throw redirect({ to: "/home" });
  },
});
