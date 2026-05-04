import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { GrowthBackdrop } from "@/components/growth/GrowthBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { getWorkshop, WORKSHOPS } from "@/data/growth_sample";

/**
 * /growth/$id/waitlist — held in the wings.
 *
 * Stream-20 SCREEN-38. Phase 1 mocks queue position. Phase 4 reads
 * position_in_queue from a real workshop_waitlist table.
 */

export const Route = createFileRoute("/_main/growth/$id_/waitlist")({
  head: () => ({ meta: [{ title: "Workshop · waitlist — COUPL" }] }),
  component: WorkshopWaitlistScreen,
});

function WorkshopWaitlistScreen() {
  const { id } = useParams({ from: "/_main/growth/$id_/waitlist" });
  const w = getWorkshop(id) ?? WORKSHOPS[0];
  const [notify, setNotify] = useState(true);
  const [cancelled, setCancelled] = useState(false);
  const position = 4;

  if (cancelled) {
    return (
      <GrowthBackdrop tone="editorial">
        <StatusBar
          leading={
            <Link
              to="/growth/$id"
              params={{ id: w.id }}
              aria-label="Back"
              className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
            >
              <ChevronLeft size={18} />
            </Link>
          }
        />
        <div className="px-5 pt-12 text-center">
          <p className="text-label-mono">Waitlist</p>
          <h1 className="mt-3 font-display text-[24px] italic leading-tight text-ink">
            Off the list. <em>No fuss.</em>
          </h1>
          <Link
            to="/growth/$id"
            params={{ id: w.id }}
            className="mt-8 inline-flex rounded-full bg-plum-700 px-6 py-3 font-body text-[14px] font-medium text-paper hover:opacity-90"
          >
            Back to workshop
          </Link>
        </div>
      </GrowthBackdrop>
    );
  }

  return (
    <GrowthBackdrop tone="editorial">
      <StatusBar
        leading={
          <Link
            to="/growth/$id"
            params={{ id: w.id }}
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Workshop · waitlist</p>
        <h1 className="mt-2 font-display text-[26px] leading-tight text-ink">
          Held in the wings.
        </h1>
      </header>

      {/* Workshop hero card */}
      <section className="px-5">
        <article
          className="overflow-hidden rounded-[18px] shadow-elev-1"
          style={{ background: w.swatch }}
        >
          <div className="bg-gradient-to-b from-transparent to-ink/55 px-5 py-5">
            <p className="font-body text-[11.5px] font-medium uppercase tracking-[0.14em] text-paper/80">
              {w.sessionCount} sessions · {w.startsLabel}
            </p>
            <h2 className="mt-2 font-display text-[20px] font-semibold leading-tight text-paper">
              {w.title}
            </h2>
            <p className="mt-1 font-body text-[12.5px] text-paper/85">
              with {w.practitioner}
            </p>
          </div>
        </article>
      </section>

      {/* Position */}
      <section className="px-5 pt-5">
        <article className="rounded-[18px] bg-paper px-5 py-5 shadow-elev-1">
          <p className="text-label-mono">Your position</p>
          <p className="mt-2 font-display text-[28px] italic text-ink">
            You're #{position} in line.
          </p>
          <p className="mt-2 font-body text-[13px] italic text-stone">
            We release seats as people drop. Most people in your position get in.
          </p>
        </article>
      </section>

      {/* Notify-me */}
      <section className="px-5 pt-3">
        <article className="rounded-[14px] bg-paper px-4 py-4 shadow-elev-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="font-display text-[14.5px] text-ink">
                Tell me if a seat opens.
              </p>
              <p className="mt-0.5 font-body text-[12.5px] text-stone">
                One quiet note. No pressure.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notify}
              onClick={() => setNotify((v) => !v)}
              className={`mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
                notify ? "bg-plum-700" : "bg-line"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-paper shadow transition ${
                  notify ? "translate-x-[22px]" : "translate-x-[2px]"
                }`}
              />
            </button>
          </div>
        </article>
      </section>

      {/* Cancel */}
      <section className="px-5 pt-6 text-center">
        <button
          type="button"
          onClick={() => setCancelled(true)}
          className="font-body text-[13px] italic text-stone hover:text-plum-500"
        >
          Cancel waitlist
        </button>
      </section>

      <p className="px-5 pt-8 pb-12 text-center font-body text-[12px] italic text-stone">
        Saved.
      </p>
    </GrowthBackdrop>
  );
}
