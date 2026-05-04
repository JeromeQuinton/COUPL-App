import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Lock } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/host/new")({
  head: () => ({
    meta: [{ title: "New room — COUPL" }],
  }),
  component: TypePicker,
});

function TypePicker() {
  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link to="/host" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">New room</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Two shapes.
        </h1>
        <p className="mt-3 font-body text-[13.5px] italic text-stone">
          Different spaces create different behaviours.
        </p>
      </header>

      <ul className="px-5 pb-12 flex flex-col gap-3">
        <li>
          <Link
            to="/host/new/workshop"
            className="block rounded-[18px] bg-paper p-5 shadow-elev-1 hover:bg-lavender-50"
          >
            <p className="text-label-mono">Workshop</p>
            <p className="mt-2 font-display text-[20px] font-semibold leading-snug text-ink">
              You teach. People learn.
            </p>
            <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
              A room with a host's prompt — listening, attachment, repair, ritual. Ticketed. Capped 6–14 seats.
            </p>
            <p className="mt-3 text-label-mono text-plum-500">£12–£24 · ticketed</p>
          </Link>
        </li>
        <li>
          <Link
            to="/host/new/community-room"
            className="block rounded-[18px] bg-paper p-5 shadow-elev-1 hover:bg-lavender-50"
          >
            <p className="text-label-mono">Community</p>
            <p className="mt-2 font-display text-[20px] font-semibold leading-snug text-ink">
              People gather quietly.
            </p>
            <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
              A walk, a cinema, a long lunch — no curriculum. Capped 8–20 seats. Free or pay-what-you-can.
            </p>
            <p className="mt-3 text-label-mono text-plum-500">Free · pay-what-you-can</p>
          </Link>
        </li>
        <li>
          <article className="rounded-[18px] border border-dashed border-plum-300/40 bg-paper/60 p-5 opacity-90">
            <div className="flex items-center gap-2">
              <Lock size={14} className="text-plum-500" aria-hidden />
              <p className="text-label-mono">Speed dating · locked</p>
            </div>
            <p className="mt-2 font-display text-[18px] font-semibold leading-snug text-ink/70">
              Only created by COUPL · run quarterly
            </p>
            <p className="mt-2 font-body text-[12.5px] italic text-stone">
              We curate Speed Dating ourselves to protect quality and balance. Sign up to hear when the next one runs.
            </p>
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1 rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-plum-700 hover:bg-lavender-50"
            >
              Notify me when COUPL runs the next one
            </button>
          </article>
        </li>
      </ul>
    </EventsBackdrop>
  );
}
