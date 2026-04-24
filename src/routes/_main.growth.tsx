import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/growth")({
  head: () => ({
    meta: [
      { title: "Growth Hub — COUPL" },
      {
        name: "description",
        content: "Assessments, journal, insights, flag log, goals.",
      },
    ],
  }),
  component: GrowthScreen,
});

function GrowthScreen() {
  return (
    <div className="px-4 pt-6">
      <ScreenHeader eyebrow="Growth Hub" title="Quietly forward" />
      <p className="mt-3 text-body-md text-slate">
        Phase 1 placeholder — assessments, journal and insights live here.
      </p>
    </div>
  );
}