import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/membership/subscription/pause")({
  head: () => ({ meta: [{ title: "Pause — COUPL" }] }),
  component: PauseScreen,
});

const DURATIONS = [
  { id: "1m", label: "1 month" },
  { id: "3m", label: "3 months" },
  { id: "6m", label: "6 months" },
];

function PauseScreen() {
  const [pick, setPick] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (done) {
    const label = DURATIONS.find((d) => d.id === pick)?.label ?? "your chosen window";
    return (
      <YouBackdrop>
        <StatusBar />
        <main className="px-5 py-12 text-center max-w-md mx-auto">
          <ScreenHeader
            eyebrow="Paused"
            title={`Paused for ${label}.`}
          />
          <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
            We'll be here.
          </p>
          <Link
            to="/membership/subscription"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-plum-700 px-6 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Back to membership
          </Link>
        </main>
      </YouBackdrop>
    );
  }

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link to="/membership/subscription" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader
          eyebrow="Pause"
          title="How long do you need?"
          titleItalic
        />
      </header>

      <section className="px-5">
        <fieldset>
          <legend className="sr-only">Pause duration</legend>
          <ul className="grid grid-cols-3 gap-2">
            {DURATIONS.map((d) => {
              const active = pick === d.id;
              return (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => setPick(d.id)}
                    className={`w-full rounded-[14px] border px-3 py-4 text-center transition-colors ${
                      active ? "border-plum-500 bg-lavender-100" : "border-line bg-paper hover:bg-lavender-50"
                    }`}
                  >
                    <p className={`font-display text-[14px] ${active ? "text-plum-700 font-semibold" : "text-ink"}`}>
                      {d.label}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
      </section>

      <article className="mx-5 mt-6 rounded-[18px] bg-paper px-5 py-5 shadow-elev-1">
        <p className="text-label-mono">While you're paused</p>
        <p className="mt-2 font-body text-[13.5px] leading-relaxed text-ink">
          Your profile is hidden, your matches and reflections stay, billing stops. We don't delete anything.
        </p>
      </article>

      <div className="px-5 pt-8 pb-12">
        <button
          type="button"
          onClick={() => setDone(true)}
          disabled={!pick}
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Pause membership
        </button>
      </div>
    </YouBackdrop>
  );
}
