import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/host/new_/community")({
  head: () => ({
    meta: [{ title: "New community room — COUPL" }],
  }),
  component: CommunityComposer,
});

function CommunityComposer() {
  const navigate = useNavigate();
  const [shape, setShape] = useState("Walk");
  const [where, setWhere] = useState("");
  const [costMode, setCostMode] = useState<"free" | "pwyc" | "cover">("free");

  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link to="/host/new" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Community · 1 / 3</p>
        <h1 className="mt-2 font-display text-[26px] leading-tight text-ink">
          What will people do?
        </h1>
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          Belonging requires boundaries too.
        </p>
      </header>

      <form className="px-5 pb-32 space-y-5">
        <div>
          <p className="text-label-mono">Shape</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Walk", "Cinema", "Meal", "Reading", "Park sit", "Other"].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setShape(s)}
                className={`rounded-full border px-4 py-2 text-body-sm transition-colors ${
                  shape === s
                    ? "border-plum-500 bg-lavender-100 text-plum-700 font-semibold"
                    : "border-line bg-paper text-ink hover:bg-lavender-50"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-label-mono" htmlFor="cm-where">Where</label>
          <input
            id="cm-where"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            placeholder="Hampstead Heath · meet at Parliament Hill"
            className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-display text-[15px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
          />
        </div>

        <div>
          <p className="text-label-mono">Cost</p>
          <div className="mt-3 inline-flex rounded-full border border-line bg-paper p-0.5">
            {([
              { id: "free", label: "Free" },
              { id: "pwyc", label: "Pay what you can" },
              { id: "cover", label: "Cover only · £5" },
            ] as const).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCostMode(c.id)}
                className={`rounded-full px-3 py-1.5 text-label-mono transition-colors ${
                  costMode === c.id ? "bg-plum-700 text-paper" : "text-slate"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <p className="mt-3 font-body text-[12.5px] italic text-stone">
            "No platform cut on Community rooms — they keep COUPL grounded."
          </p>
        </div>
      </form>

      <div className="sticky bottom-24 z-30 px-5 pb-6 space-y-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/host/new/community-detail" })}
          className="flex w-full items-center justify-center rounded-full bg-ink py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Continue · 2 / 3
        </button>
      </div>
    </EventsBackdrop>
  );
}
