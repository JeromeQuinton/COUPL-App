import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

type CoachIntensity = "gentle" | "steady" | "sharper";
type CoachFrequency = "low" | "medium" | "high";

export const Route = createFileRoute("/_main/profile/coach-settings")({
  head: () => ({
    meta: [{ title: "Coach settings — COUPL" }],
  }),
  component: CoachSettingsScreen,
});

function CoachSettingsScreen() {
  const [intensity, setIntensity] = useState<CoachIntensity>("steady");
  const [frequency, setFrequency] = useState<CoachFrequency>("medium");
  const [allowInterventions, setAllowInterventions] = useState(true);
  const [saved, setSaved] = useState(false);

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile"
            aria-label="Back to Profile"
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-paper/80 text-plum-700 shadow-elev-1 backdrop-blur-sm hover:bg-paper"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-1 pb-5 text-center">
        <h1 className="font-display text-[26px] font-semibold text-ink">
          Coach settings
        </h1>
      </header>

      <section className="px-5">
        <article className="rounded-[20px] bg-paper p-5 shadow-elev-1">
          <h2 className="font-display text-[17px] font-semibold text-ink">
            How much challenge feels useful?
          </h2>
          <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
            Some people want gentle noticing. Others want sharper pattern
            interruption. Adjust your coach to match your readiness.
          </p>

          <fieldset className="mt-6">
            <legend className="text-mono-sm uppercase tracking-[0.14em] text-slate">
              Intensity
            </legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(["gentle", "steady", "sharper"] as CoachIntensity[]).map(
                (opt) => {
                  const active = intensity === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setIntensity(opt);
                        setSaved(false);
                      }}
                      className={`rounded-[12px] border px-3 py-3 text-center transition-colors ${
                        active
                          ? "border-plum-500 bg-lavender-100"
                          : "border-line bg-paper hover:bg-lavender-50"
                      }`}
                    >
                      <span className="font-display text-[14px] capitalize text-ink">
                        {opt}
                      </span>
                    </button>
                  );
                },
              )}
            </div>
          </fieldset>

          <fieldset className="mt-6">
            <legend className="text-mono-sm uppercase tracking-[0.14em] text-slate">
              Frequency of prompts
            </legend>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {(["low", "medium", "high"] as CoachFrequency[]).map((opt) => {
                const active = frequency === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setFrequency(opt);
                      setSaved(false);
                    }}
                    className={`rounded-[12px] border px-3 py-3 text-center transition-colors ${
                      active
                        ? "border-plum-500 bg-lavender-100"
                        : "border-line bg-paper hover:bg-lavender-50"
                    }`}
                  >
                    <span className="font-display text-[14px] capitalize text-ink">
                      {opt}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <label className="mt-6 flex items-start gap-3 rounded-[12px] border border-line bg-paper p-3 cursor-pointer">
            <input
              type="checkbox"
              checked={allowInterventions}
              onChange={(e) => {
                setAllowInterventions(e.target.checked);
                setSaved(false);
              }}
              className="mt-1 h-4 w-4 accent-plum-500"
            />
            <span className="flex-1">
              <span className="block font-display text-[14px] font-medium text-ink">
                Allow real-time interventions
              </span>
              <span className="mt-1 block font-body text-[12.5px] leading-relaxed text-slate">
                Draft intercepts, red-flag pauses, and pattern noticing in
                the moment. You can always send anyway.
              </span>
            </span>
          </label>

          <p className="mt-6 font-body text-[12.5px] italic text-stone">
            Your coach adapts to you, not the reverse.
          </p>
        </article>
      </section>

      <section className="px-5 pt-5 pb-12">
        <button
          type="button"
          onClick={() => setSaved(true)}
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          {saved ? "Saved" : "Save preferences"}
        </button>
      </section>
    </YouBackdrop>
  );
}