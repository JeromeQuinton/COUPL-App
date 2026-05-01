import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { EmotionalChipSelector } from "@/components/home/EmotionalChipSelector";

export const Route = createFileRoute("/_main/home/check-in")({
  head: () => ({
    meta: [
      { title: "Weekly check-in — COUPL" },
      {
        name: "description",
        content:
          "A 30-second check that reshapes who we show you. Honest beats brave.",
      },
    ],
  }),
  component: CheckInScreen,
});

const FEELINGS = [
  "Work is heavy",
  "Grieving something",
  "Energized",
  "Lonely",
  "Recovering from a date",
  "Just curious",
];

function bandwidthLabel(v: number): { label: string; copy: string } {
  if (v < 25)
    return {
      label: "Low bandwidth.",
      copy: "We'll pause new conversations and surface only the strongest recommendations.",
    };
  if (v < 75)
    return {
      label: "Some bandwidth.",
      copy: "We'll show 2–3 strong recommendations and pause new conversations after 5pm.",
    };
  return {
    label: "Full bandwidth.",
    copy: "We'll surface a wider range, including newer recommendations.",
  };
}

function CheckInScreen() {
  const navigate = useNavigate();
  const [bandwidth, setBandwidth] = useState(55); // 0..100
  const [feelings, setFeelings] = useState<string[]>(["Work is heavy", "Lonely"]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({ to: "/home" });
  };

  const toggleFeeling = (f: string) =>
    setFeelings((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );

  const { label, copy } = bandwidthLabel(bandwidth);

  return (
    <form onSubmit={onSubmit} className="px-5 pb-12 pt-4">
      <div className="flex items-center justify-between">
        <Link
          to="/home"
          aria-label="Close"
          className="-ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-ink hover:bg-cloud"
        >
          <X className="h-5 w-5" aria-hidden />
        </Link>
        <span className="text-label-mono">Weekly check-in</span>
        <span className="h-9 w-9" aria-hidden />
      </div>

      <header className="mt-4">
        <h1 className="text-display-xl text-ink">
          How are you, this week?
        </h1>
        <p className="mt-2 text-body-md text-slate">
          A 30-second check that reshapes who we show you. Honest beats brave.
        </p>
      </header>

      <section className="mt-8">
        <p className="text-label-mono">Bandwidth</p>
        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={bandwidth}
          onChange={(e) => setBandwidth(Number(e.target.value))}
          aria-label="Bandwidth this week"
          className="mt-4 w-full accent-plum-500"
        />
        <div className="mt-1 flex justify-between text-body-sm text-slate">
          <span>Low</span>
          <span>Some</span>
          <span>Full</span>
        </div>
        <p className="mt-4 text-h1 text-ink">{label}</p>
        <p className="mt-1 text-body-md text-slate">{copy}</p>
      </section>

      <section className="mt-8">
        <p className="text-label-mono">What's true today?</p>
        <div className="mt-3">
          <EmotionalChipSelector
            options={FEELINGS}
            selected={feelings}
            onToggle={toggleFeeling}
            legend="What's true today"
          />
        </div>
      </section>

      <button
        type="submit"
        className="mt-10 flex h-12 w-full items-center justify-center rounded-[12px] bg-ink px-6 text-body-md font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
      >
        Update for the week
      </button>
      <p className="mt-3 text-center text-body-sm text-slate">
        We'll ask again next Tuesday.
      </p>
    </form>
  );
}