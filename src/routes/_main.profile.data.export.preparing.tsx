import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Loader2 } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /profile/data/export/preparing — packaging state for data export.
 *
 * Lands here after request from /profile/data/export. Polls export
 * status (Phase 1 stub: simulated 5s prep, then transitions to
 * /profile/data/ready). Plain factual copy — no "we care" filler.
 *
 * Stream 26 SCREEN-R2-32.
 */
export const Route = createFileRoute(
  "/_main/profile/data/export/preparing",
)({
  head: () => ({ meta: [{ title: "Preparing your data — COUPL" }] }),
  component: ExportPreparingScreen,
});

function ExportPreparingScreen() {
  const navigate = useNavigate();
  const [elapsedSec, setElapsedSec] = useState(0);

  useEffect(() => {
    const tick = setInterval(() => setElapsedSec((s) => s + 1), 1000);
    const done = setTimeout(() => {
      navigate({ to: "/profile/data/ready" });
    }, 5000);
    return () => {
      clearInterval(tick);
      clearTimeout(done);
    };
  }, [navigate]);

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile/data/export"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Data · preparing</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Preparing your data.
        </h1>
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
          <div className="flex items-center gap-3">
            <Loader2
              className="h-5 w-5 shrink-0 animate-spin text-plum-500"
              aria-hidden
            />
            <p className="font-body text-[14px] italic leading-relaxed text-ink">
              We're packaging your profile, messages, and matches. This
              usually takes under five minutes.
            </p>
          </div>
          <p className="mt-3 text-label-mono text-stone">
            {elapsedSec}s elapsed
          </p>
        </article>
      </section>

      <section className="px-5 pt-5 pb-12">
        <p className="font-body text-[13px] italic leading-relaxed text-stone">
          We'll also email you a link when it's done.
        </p>
      </section>
    </YouBackdrop>
  );
}
