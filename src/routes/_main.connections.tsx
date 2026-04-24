import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/connections")({
  head: () => ({
    meta: [
      { title: "Connections — COUPL" },
      { name: "description", content: "Your connections and conversations." },
    ],
  }),
  component: ConnectionsScreen,
});

function ConnectionsScreen() {
  return (
    <div className="px-4 pt-6">
      <ScreenHeader eyebrow="Connections" title="People you've met" />
      <p className="mt-3 text-body-md text-slate">
        Phase 1 placeholder — connections list and chat threads live here.
      </p>
    </div>
  );
}