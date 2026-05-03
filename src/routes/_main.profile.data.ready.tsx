import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Download, ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/profile/data/ready")({
  head: () => ({
    meta: [{ title: "Your export is ready — COUPL" }],
  }),
  component: DataReadyScreen,
});

function DataReadyScreen() {
  const navigate = useNavigate();

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link to="/profile" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Archive ready</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Your record is ready.
        </h1>
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          One ZIP. One link. Available for the next 7 days, then it expires.
        </p>
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="text-label-mono">coupl-archive · Sam · 2026-05-03.zip</p>
          <p className="mt-2 font-display text-[18px] text-ink">
            38.4 MB
          </p>
          <p className="mt-1 font-body text-[12.5px] text-stone">
            Includes 142 reflections · 18 connections · 4 events · 1 membership record
          </p>
        </article>
      </section>

      <div className="px-5 pt-8 pb-12 space-y-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/profile/data/done" })}
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90 inline-flex items-center justify-center gap-2"
        >
          <Download size={16} strokeWidth={2.25} />
          Download ZIP
        </button>
        <p className="text-center font-body text-[12px] italic text-stone">
          Link expires Sunday 10 May.
        </p>
      </div>
    </YouBackdrop>
  );
}
