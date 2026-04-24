import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/home")({
  head: () => ({
    meta: [
      { title: "Home — COUPL" },
      { name: "description", content: "Your calm, grounded entry into COUPL." },
    ],
  }),
  component: HomeScreen,
});

function HomeScreen() {
  return (
    <div className="px-4 pt-6">
      <ScreenHeader eyebrow="Today" title="Welcome back" />
      <p className="mt-3 text-body-md text-slate">
        Phase 1 placeholder — Home feed renders here.
      </p>
    </div>
  );
}