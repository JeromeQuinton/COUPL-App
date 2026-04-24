import { Outlet, createFileRoute } from "@tanstack/react-router";
import { BottomNav } from "@/components/shell/BottomNav";

export const Route = createFileRoute("/_main")({
  component: MainLayout,
});

function MainLayout() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <main className="mx-auto max-w-[640px] pb-24">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}