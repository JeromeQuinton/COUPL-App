import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, X } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { getEvent, FEATURED_EVENT } from "@/data/events_sample";

export const Route = createFileRoute("/_main/events/$id_/reserve")({
  head: () => ({
    meta: [
      { title: "Reserve — COUPL" },
      {
        name: "description",
        content: "Hold your place. A clear yes is enough.",
      },
    ],
  }),
  component: ReserveScreen,
});

function ReserveScreen() {
  const { id } = useParams({ from: "/_main/events/$id_/reserve" });
  const navigate = useNavigate();
  const e = getEvent(id) ?? FEATURED_EVENT;

  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link
            to="/events/$id"
            params={{ id }}
            aria-label="Back to event"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <X size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Reservation</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Hold your place.
        </h1>
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          A clear yes is enough. We'll handle the structure from here.
        </p>
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper px-5 py-5 shadow-elev-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-display text-[16px] font-semibold leading-tight text-ink">
                {e.title}
              </p>
              <p className="mt-1 font-body text-[12.5px] text-slate">
                {e.address}
              </p>
            </div>
            <p className="text-label-mono text-stone">{e.dateLabel}</p>
          </div>
        </article>
      </section>

      <section className="px-5 pt-5">
        <ul className="rounded-[18px] bg-paper px-5 shadow-elev-1">
          <li className="flex items-center justify-between border-b border-line py-3.5">
            <span className="text-label-mono">Reservation</span>
            <span className="font-display text-[15px] text-ink">{e.price}</span>
          </li>
          <li className="flex items-center justify-between border-b border-line py-3.5">
            <span className="text-label-mono">Refundable until</span>
            <span className="font-display text-[14px] text-ink">48h before</span>
          </li>
          <li className="flex items-center justify-between py-3.5">
            <span className="text-label-mono">Pay with</span>
            <span className="font-display text-[14px] text-ink">···· 4218</span>
          </li>
        </ul>
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          You can change or cancel from your events list, no questions.
        </p>
      </section>

      <div className="sticky bottom-24 z-30 mt-8 px-5 pb-6">
        <button
          type="button"
          onClick={() =>
            navigate({ to: "/events/$id/booked", params: { id } })
          }
          className="flex w-full items-center justify-center rounded-full bg-plum-700 py-4 font-display text-[15px] font-medium text-paper shadow-[0_8px_24px_rgba(61,26,71,0.28)] transition-colors hover:bg-plum-500"
        >
          Confirm · {e.price}
        </button>
      </div>
    </EventsBackdrop>
  );
}
