import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/profile/data/preparing")({
  head: () => ({
    meta: [{ title: "Preparing your export — COUPL" }],
  }),
  component: PreparingScreen,
});

function PreparingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Phase 1 stub: simulate prep time, advance after 4s
    const t = setTimeout(() => {
      navigate({ to: "/profile/data/ready" });
    }, 4000);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <YouBackdrop>
      <StatusBar />

      <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-plum-500" aria-hidden />
        <p className="mt-6 text-label-mono">Preparing your archive</p>
        <h1 className="mt-3 font-display text-[24px] leading-tight text-ink">
          Quietly assembling.
        </h1>
        <p className="mt-3 max-w-[280px] font-body text-[13.5px] leading-relaxed text-slate">
          Your record is being packaged. Usually 2–5 minutes. You can leave this screen — we'll let you know when it's ready.
        </p>
      </div>
    </YouBackdrop>
  );
}
