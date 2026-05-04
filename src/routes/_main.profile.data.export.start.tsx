import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Download } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/profile/data/export/start")({
  head: () => ({
    meta: [{ title: "Request a data export — COUPL" }],
  }),
  component: ExportStartScreen,
});

function ExportStartScreen() {
  const navigate = useNavigate();

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader eyebrow="Data · request export" title="Request a copy of your data." />
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="font-body text-[14px] leading-relaxed text-ink">
            You can request a full export of everything COUPL holds about you.
            We package it and email you a download link.
          </p>
        </article>
      </section>

      <div className="px-5 pt-8 pb-4 space-y-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/profile/data/export/preparing" })}
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90 inline-flex items-center justify-center gap-2"
        >
          <Download size={16} strokeWidth={2.25} />
          Request export
        </button>
      </div>

      <p className="px-5 pb-12 text-center font-body text-[12.5px] italic text-stone">
        We rate-limit to once every 7 days.
      </p>
    </YouBackdrop>
  );
}
