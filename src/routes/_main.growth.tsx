import { Outlet, createFileRoute } from "@tanstack/react-router";

/**
 * /growth layout (DR-020 pattern). Pure outlet — dashboard lives in the
 * index child, workshop detail and post-date reflection live in flat
 * sibling routes.
 */
export const Route = createFileRoute("/_main/growth")({
  component: GrowthLayout,
});

function GrowthLayout() {
  return <Outlet />;
}