import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/polaris/preferences")({
  head: () => ({ meta: [{ title: "Polaris preferences — COUPL" }] }),
  component: PreferencesScreen,
});

type Frequency = "rare" | "weekly" | "daily";
type Tone = "soft" | "direct";

const FREQUENCY_LABEL: Record<Frequency, string> = {
  rare: "Rarely",
  weekly: "Weekly",
  daily: "Daily",
};

const TONE_LABEL: Record<Tone, string> = {
  soft: "Soft",
  direct: "Direct",
};

const SURFACES: { id: string; label: string; helper: string }[] = [
  { id: "discover", label: "Discover", helper: "Reading the signal in profiles." },
  { id: "chat", label: "Chat", helper: "Noticing the rhythm in your conversations." },
  { id: "coach", label: "Coach", helper: "Long-form reflections + signals." },
  { id: "date-plans", label: "Date plans", helper: "Pacing around plan-making." },
];

function PreferencesScreen() {
  const [frequency, setFrequency] = useState<Frequency>("weekly");
  const [tone, setTone] = useState<Tone>("soft");
  const [surfaces, setSurfaces] = useState<Set<string>>(
    new Set(["discover", "chat", "coach"]),
  );
  const [muted, setMuted] = useState(false);

  const toggleSurface = (id: string) =>
    setSurfaces((p) => {
      const next = new Set(p);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/polaris/chat"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Polaris · preferences</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          How Polaris talks to you.
        </h1>
      </header>

      <section className="px-5">
        <p className="text-label-mono">Frequency</p>
        <div className="mt-3 flex gap-1.5" role="radiogroup">
          {(Object.keys(FREQUENCY_LABEL) as Frequency[]).map((f) => {
            const active = frequency === f;
            return (
              <button
                key={f}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setFrequency(f)}
                className={
                  active
                    ? "flex-1 rounded-full bg-plum-700 px-3 py-1.5 text-label-mono text-paper"
                    : "flex-1 rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-slate hover:bg-lavender-50"
                }
              >
                {FREQUENCY_LABEL[f]}
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-5 pt-6">
        <p className="text-label-mono">Tone</p>
        <div className="mt-3 flex gap-1.5" role="radiogroup">
          {(Object.keys(TONE_LABEL) as Tone[]).map((t) => {
            const active = tone === t;
            return (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setTone(t)}
                className={
                  active
                    ? "flex-1 rounded-full bg-plum-700 px-3 py-1.5 text-label-mono text-paper"
                    : "flex-1 rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-slate hover:bg-lavender-50"
                }
              >
                {TONE_LABEL[t]}
              </button>
            );
          })}
        </div>
      </section>

      <section className="px-5 pt-6">
        <p className="text-label-mono">Where Polaris notices</p>
        <ul className="mt-3 space-y-2">
          {SURFACES.map((s) => {
            const on = surfaces.has(s.id);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => toggleSurface(s.id)}
                  aria-pressed={on}
                  className={
                    on
                      ? "flex w-full items-center justify-between gap-3 rounded-[14px] border-2 border-plum-500 bg-paper px-4 py-3.5 text-left"
                      : "flex w-full items-center justify-between gap-3 rounded-[14px] border border-line bg-paper px-4 py-3.5 text-left hover:bg-lavender-50"
                  }
                >
                  <div>
                    <p className="font-display text-[14px] text-ink">{s.label}</p>
                    <p className="mt-0.5 font-body text-[12px] text-stone">
                      {s.helper}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className={
                      on
                        ? "text-label-mono text-plum-700"
                        : "text-label-mono text-stone"
                    }
                  >
                    {on ? "On" : "Off"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="px-5 pt-7">
        <article className="rounded-[14px] bg-paper px-4 py-4 shadow-elev-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-[14px] text-ink">
                Pause Polaris for 7 days
              </p>
              <p className="mt-1 font-body text-[12.5px] italic text-stone">
                Sometimes you need to think without the noticing.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setMuted((m) => !m)}
              aria-pressed={muted}
              className={
                muted
                  ? "rounded-full bg-plum-700 px-3 py-1.5 text-label-mono text-paper"
                  : "rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-slate hover:bg-lavender-50"
              }
            >
              {muted ? "Paused" : "Off"}
            </button>
          </div>
        </article>
      </section>

      <div className="px-5 pt-8 pb-12">
        <Link
          to="/profile/coach-settings"
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          More controls
        </Link>
      </div>
    </YouBackdrop>
  );
}
