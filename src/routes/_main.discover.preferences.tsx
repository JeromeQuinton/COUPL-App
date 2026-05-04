import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

/**
 * /discover/preferences — persistent Discover preferences.
 *
 * MoreFiltersSheet is per-session. This is for setting defaults.
 * Five sections: intent, pace, lifestyle, distance, age.
 *
 * Stream-19 SCREEN-14.
 */
export const Route = createFileRoute("/_main/discover/preferences")({
  head: () => ({ meta: [{ title: "Discover preferences — COUPL" }] }),
  component: PreferencesScreen,
});

const INTENTS = ["Long-term", "Open to long-term", "Curious", "Friendship first"];
const PACES = ["Slow", "Steady", "Active", "Whenever"];
const LIFESTYLE = ["Quiet", "Outdoorsy", "City", "Creative", "Sober", "Parent"];

function PreferencesScreen() {
  const [intent, setIntent] = useState("Long-term");
  const [pace, setPace] = useState("Steady");
  const [lifestyle, setLifestyle] = useState<string[]>(["Quiet", "Creative"]);
  const [distance, setDistance] = useState(15);
  const [ageMin, setAgeMin] = useState(28);
  const [ageMax, setAgeMax] = useState(40);
  const [saved, setSaved] = useState(false);

  const toggleLifestyle = (v: string) =>
    setLifestyle((cur) => (cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v]));

  return (
    <div className="relative px-5 pb-16 pt-6">
      <header className="flex items-center gap-3">
        <Link
          to="/discover"
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="text-label-mono">Discover · preferences</p>
      </header>

      <h1 className="mt-3 font-display text-[28px] leading-[1.1] text-ink">
        Set your <em className="font-display italic">defaults.</em>
      </h1>
      <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
        These shape tomorrow's issue. You can still tune any single day from
        the filter sheet.
      </p>

      <section className="mt-8">
        <p className="text-label-mono">Intent</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {INTENTS.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setIntent(v)}
              className={
                intent === v
                  ? "rounded-full bg-plum-700 px-3 py-1.5 font-body text-[12.5px] text-paper"
                  : "rounded-full border border-line bg-paper px-3 py-1.5 font-body text-[12.5px] text-ink hover:bg-lavender-50"
              }
            >
              {v}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <p className="text-label-mono">Pace</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {PACES.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setPace(v)}
              className={
                pace === v
                  ? "rounded-full bg-plum-700 px-3 py-1.5 font-body text-[12.5px] text-paper"
                  : "rounded-full border border-line bg-paper px-3 py-1.5 font-body text-[12.5px] text-ink hover:bg-lavender-50"
              }
            >
              {v}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <p className="text-label-mono">Lifestyle</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {LIFESTYLE.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => toggleLifestyle(v)}
              className={
                lifestyle.includes(v)
                  ? "rounded-full bg-plum-700 px-3 py-1.5 font-body text-[12.5px] text-paper"
                  : "rounded-full border border-line bg-paper px-3 py-1.5 font-body text-[12.5px] text-ink hover:bg-lavender-50"
              }
            >
              {v}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6 rounded-[16px] bg-paper p-4 shadow-elev-1">
        <div className="flex items-center justify-between">
          <p className="text-label-mono">Distance</p>
          <p className="font-body text-[13px] text-ink">Within {distance} miles</p>
        </div>
        <input
          type="range"
          min={1}
          max={50}
          value={distance}
          onChange={(e) => setDistance(Number(e.target.value))}
          className="mt-2 w-full accent-plum-500"
        />
      </section>

      <section className="mt-4 rounded-[16px] bg-paper p-4 shadow-elev-1">
        <div className="flex items-center justify-between">
          <p className="text-label-mono">Age</p>
          <p className="font-body text-[13px] text-ink">{ageMin} — {ageMax}</p>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <label className="text-label-mono">
            From
            <input
              type="number"
              min={18}
              max={ageMax}
              value={ageMin}
              onChange={(e) => setAgeMin(Number(e.target.value))}
              className="mt-1 w-full rounded-[10px] border border-line bg-paper px-3 py-2 font-body text-[14px] text-ink"
            />
          </label>
          <label className="text-label-mono">
            To
            <input
              type="number"
              min={ageMin}
              max={99}
              value={ageMax}
              onChange={(e) => setAgeMax(Number(e.target.value))}
              className="mt-1 w-full rounded-[10px] border border-line bg-paper px-3 py-2 font-body text-[14px] text-ink"
            />
          </label>
        </div>
      </section>

      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={() => {
            setIntent("Long-term");
            setPace("Steady");
            setLifestyle([]);
            setDistance(15);
            setAgeMin(28);
            setAgeMax(40);
            setSaved(false);
          }}
          className="flex-1 rounded-full border border-line bg-paper px-5 py-3 font-body text-[14px] text-ink hover:bg-lavender-50"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => setSaved(true)}
          className="flex-1 rounded-full bg-plum-700 px-5 py-3 font-body text-[14px] font-medium text-paper hover:bg-plum-500"
        >
          Save
        </button>
      </div>

      {saved && (
        <p className="mt-4 text-center font-body text-[12.5px] italic text-success">
          Preferences updated. Discover will reflect these from tomorrow's issue.
        </p>
      )}
    </div>
  );
}
