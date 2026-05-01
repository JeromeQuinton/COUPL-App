import { Outlet, createFileRoute } from "@tanstack/react-router";

/**
 * /profile layout. Pure outlet — dashboard lives in the index child;
 * edit, audit, safety and pause flows are flat sibling routes.
 */
export const Route = createFileRoute("/_main/profile")({
  component: ProfileLayout,
});

function ProfileLayout() {
  return <Outlet />;
}