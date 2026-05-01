import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Check } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { PAUSE_DURATIONS, PAUSE_PROMISES } from "@/data/you_sample";

export const Route = createFileRoute("/_main/profile/pause")({
  head: () => ({ meta: [{ title: "Pause your account · COUPL" }] }),
  component: PauseAccountPage,
});

function PauseAccountPage() {
  const [days, setDays] = useState<number>(14);
  const [why, setWhy] = useState("");

  const returnDate = new Date();
  returnDate.setDate(returnDate.getDate() + days);
  const returnLabel = returnDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile"
            aria-label="Back to You"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
        trailing={<span className="font-body text-[12.5px] font-medium text-stone">Settings</span>}
      />

      <header className="px-5 pt-2 pb-5">
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-plum-500">
          Pause my account
        </p>
        <h1 className="mt-2 font-display text-[26px] font-semibold leading-tight text-ink">
          Step out, hold your place.
        </h1>
        <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
          No one will see you. Conversations stay open. Come back when you're
          ready.
        </p>
      </header>

      {/* Duration */}
      <section className="px-5">
        <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          How long?
        </h2>
        <div className="mt-3 grid grid-cols-4 gap-2.5">
          {PAUSE_DURATIONS.map((d) => {
            const active = d.days === days;
            return (
              <button
                key={d.days}
                type="button"
                onClick={() => setDays(d.days)}
                className={`flex flex-col items-center rounded-[14px] border px-2 py-3 transition-colors ${
                  active
                    ? "border-plum-700 bg-plum-700/[0.06]"
                    : "border-line bg-paper hover:bg-lavender-50"
                }`}
              >
                <span
                  className={`font-display text-[20px] font-semibold tabular-nums ${
                    active ? "text-plum-700" : "text-ink"
                  }`}
                >
                  {d.days}
                </span>
                <span className="font-body text-[10.5px] text-stone">days</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 font-body text-[12.5px] text-slate">
          Back on <span className="font-medium text-ink">{returnLabel}</span>.
        </p>
      </section>

      {/* While paused */}
      <section className="px-5 pt-7">
        <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          While you're paused
        </h2>
        <ul className="mt-3 flex flex-col gap-2.5">
          {PAUSE_PROMISES.map((p) => (
            <li
              key={p}
              className="flex items-start gap-2.5 font-body text-[13.5px] leading-relaxed text-ink/85"
            >
              <Check size={14} className="mt-1 flex-shrink-0 text-plum-700" strokeWidth={2} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* One ask */}
      <section className="px-5 pt-6">
        <div
          className="rounded-[14px] border p-4"
          style={{
            borderColor: "color-mix(in oklab, var(--blush) 80%, transparent)",
            background: "color-mix(in oklab, var(--blush) 35%, var(--paper))",
          }}
        >
          <p className="font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-plum-700">
            One ask
          </p>
          <p className="mt-1.5 font-body text-[13px] leading-relaxed text-ink/85">
            Tell us why. Two words is plenty. We use it to make the app better.
          </p>
          <input
            type="text"
            value={why}
            onChange={(e) => setWhy(e.target.value)}
            placeholder='"Brain is full of work right now."'
            className="mt-3 w-full rounded-[10px] border border-line/70 bg-paper px-3 py-2.5 font-body text-[13px] italic text-ink placeholder:text-stone focus:border-plum-700 focus:outline-none"
          />
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 mt-8 border-t border-line/70 bg-paper/85 px-5 pt-3 pb-6 backdrop-blur-md">
        <button
          type="button"
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 transition-colors hover:opacity-90"
        >
          Pause for {days} days
        </button>
        <Link
          to="/profile"
          className="mt-2 block text-center font-body text-[12.5px] text-slate transition-colors hover:text-plum-500"
        >
          Not now
        </Link>
      </div>
    </YouBackdrop>
  );
}