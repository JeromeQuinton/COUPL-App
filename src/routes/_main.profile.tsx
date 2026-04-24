import { createFileRoute } from "@tanstack/react-router";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/profile")({
  head: () => ({
    meta: [
      { title: "Profile — COUPL" },
      { name: "description", content: "Your profile, settings, and safety hub." },
    ],
  }),
  component: ProfileScreen,
});

function ProfileScreen() {
  return (
    <div className="px-4 pt-6">
      <ScreenHeader eyebrow="You" title="Profile" />
      <p className="mt-3 text-body-md text-slate">
        Phase 1 placeholder — own profile, settings and safety hub live here.
      </p>
    </div>
  );
}