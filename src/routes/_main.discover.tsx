import { Outlet, createFileRoute } from "@tanstack/react-router";

/**
 * /discover layout (DR-020). Pure outlet — feed lives in the index
 * child (`_main.discover.index.tsx`), detail in `_main.discover.$id.tsx`.
 * No shared chrome here: detail has its own sticky header.
 */
export const Route = createFileRoute("/_main/discover")({
  component: DiscoverLayout,
});

function DiscoverLayout() {
  return <Outlet />;
}