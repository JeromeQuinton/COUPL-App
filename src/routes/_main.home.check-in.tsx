import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { EmotionalChipSelector } from "@/components/home/EmotionalChipSelector";

export const Route = createFileRoute("/_main/home/check-in")({
  head: () => ({
    meta: [
      { title: "Weekly check-in — COUPL" },
      {
        name: "description",
        content:
          "Adjust how much bandwidth you have this week. Calm self-awareness, no pressure.",
      },
    ],
  }),
  component: CheckInScreen,
});

const FEELINGS = [
  "Steady",
  "Curious",
  "Tired",
  "Open",
  "Tender",
  "Restless",
  "Hopeful",
  "Quiet",
  "Stretched",
];

const BANDWIDTH_LABELS = ["Low", "Some", "Full"];

function CheckInScreen() {
  const navigate = useNavigate();
  const [bandwidth, setBandwidth] = useState(1); // 0..2
  const [feelings, setFeelings] = useState<string[]>([]);
  const [reflection, setReflection] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Phase 1: local state only. Persistence in Phase 4.
    navigate({ to: "/home" });
  };

  const toggleFeeling = (f: string) =>
    setFeelings((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f],
    );

  return (
    <form
      onSubmit={onSubmit}
      className="px-5 pb-12 pt-6"
    >
      <Link
        to="/home"
        className="-ml-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-body-md text-ink hover:bg-cloud"
        aria-label="Back to home"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        <span>Home</span>
      </Link>

      <header className="mt-6">
        <p className="text-label-mono">Weekly check-in</p>
        <h1 className="mt-2 text-display-xl text-ink">
          How much can you hold this week?
        </h1>
        <p className="mt-2 text-body-md text-slate">
          We use this to throttle who we surface — and who sees you.
        </p>
      </header>

      <section className="mt-8 rounded-[20px] bg-blush p-5">
        <p className="text-label-mono">Bandwidth</p>
        <p className="mt-2 text-display-xl text-ink">
          {BANDWIDTH_LABELS[bandwidth]} bandwidth
        </p>

        <input
          type="range"
          min={0}
          max={2}
          step={1}
          value={bandwidth}
          onChange={(e) => setBandwidth(Number(e.target.value))}
          aria-label="Bandwidth this week"
          className="mt-5 w-full accent-plum-500"
        />
        <div className="mt-2 flex justify-between text-body-sm text-slate">
          {BANDWIDTH_LABELS.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-h1 text-ink">How are you, actually?</h2>
        <p className="mt-1 text-body-md text-slate">
          Pick as many as feel true. No wrong answers.
        </p>
        <div className="mt-4">
          <EmotionalChipSelector
            options={FEELINGS}
            selected={feelings}
            onToggle={toggleFeeling}
            legend="How are you feeling this week"
          />
        </div>
      </section>

      <section className="mt-8">
        <label htmlFor="weekly-note" className="block">
          <span className="text-h1 text-ink">A quiet note for yourself</span>
          <span className="mt-1 block text-body-md text-slate">
            Optional. One sentence is plenty.
          </span>
        </label>
        <textarea
          id="weekly-note"
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={4}
          placeholder="What's on your mind this week?"
          className="mt-3 w-full resize-none rounded-[16px] border border-line bg-paper p-4 text-body-md text-ink outline-none placeholder:text-stone focus:border-plum-500"
        />
      </section>

      <button
        type="submit"
        className="mt-10 flex h-12 w-full items-center justify-center rounded-[12px] bg-plum-500 px-6 text-body-md font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
      >
        Set my capacity
      </button>
      <p className="mt-3 text-center text-body-sm text-slate">
        You can change this from Home, anytime.
      </p>
    </form>
  );
}