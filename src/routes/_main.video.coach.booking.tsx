import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/video/coach/booking")({
  head: () => ({ meta: [{ title: "Book Polaris — COUPL" }] }),
  component: CoachBooking,
});

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SLOTS = ["09:00", "11:30", "14:00", "17:30"];

function CoachBooking() {
  const navigate = useNavigate();
  const [day, setDay] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);

  const book = () => {
    if (!day || !slot) return;
    const bookingId = crypto.randomUUID();
    navigate({
      to: "/video/coach/$bookingId/lobby",
      params: { bookingId },
    });
  };

  return (
    <div
      className="min-h-[100dvh] px-5 bg-paper"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)", paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
    >
      <div className="mx-auto max-w-md">
        <p className="text-label-mono">Membership</p>
        <h1 className="mt-3 font-display text-[28px] leading-tight text-ink">
          Twenty minutes with Polaris.
        </h1>
        <p className="mt-3 font-display text-[14px] italic text-stone">
          She actually picks up.
        </p>

        <article className="mt-8 flex items-start gap-3 rounded-[16px] bg-paper p-4 shadow-elev-1">
          <span
            aria-hidden
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full font-display text-[18px] text-paper"
            style={{ background: "var(--plum-700)" }}
          >
            L
          </span>
          <div>
            <p className="font-display text-[15px] font-semibold text-ink">Polaris</p>
            <p className="text-label-mono">Practitioner — attachment + repair</p>
            <p className="mt-2 font-body text-[12.5px] text-slate">
              Twelve years in the room. Trained psychotherapist. UK-registered.
            </p>
          </div>
        </article>

        <section className="mt-8">
          <p className="text-label-mono">Available this week</p>
          <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {DAYS.map((d) => {
              const active = day === d;
              return (
                <li key={d} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setDay(d)}
                    className={`rounded-[14px] border px-5 py-3 transition-colors ${
                      active ? "border-plum-500 bg-lavender-100 text-plum-700 font-semibold" : "border-line bg-paper text-ink hover:bg-lavender-50"
                    }`}
                  >
                    {d}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {day && (
          <section className="mt-6">
            <p className="text-label-mono">Times on {day}</p>
            <ul className="mt-3 grid grid-cols-2 gap-2">
              {SLOTS.map((s) => {
                const active = slot === s;
                return (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`w-full rounded-[14px] border px-3 py-3 transition-colors ${
                        active ? "border-plum-500 bg-lavender-100 text-plum-700 font-semibold" : "border-line bg-paper text-ink hover:bg-lavender-50"
                      }`}
                    >
                      {s}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <button
          type="button"
          onClick={book}
          disabled={!day || !slot}
          className="mt-10 w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Book this time
        </button>

        <p className="mt-3 text-center text-label-mono text-stone">
          ONE BOOKING PER MONTH — INCLUDED IN MEMBERSHIP
        </p>
      </div>
    </div>
  );
}
