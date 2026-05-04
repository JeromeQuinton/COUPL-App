import { useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, X } from "lucide-react";

export const Route = createFileRoute("/_main/connections/$id_/availability")({
  head: () => ({ meta: [{ title: "Suggest times — COUPL" }] }),
  component: AvailabilityScreen,
});

const QUICK_SLOTS = [
  "This Saturday afternoon",
  "Tuesday evening",
  "Sunday morning",
  "Friday after work",
];

function AvailabilityScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/availability" });
  const navigate = useNavigate();
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [customDateTime, setCustomDateTime] = useState("");

  const togglePick = (slot: string) =>
    setPicked((p) => {
      const next = new Set(p);
      if (next.has(slot)) next.delete(slot);
      else next.add(slot);
      return next;
    });

  const addCustom = () => {
    if (!customDateTime) return;
    const formatted = new Date(customDateTime).toLocaleString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
    setPicked((p) => new Set([...p, formatted]));
    setCustomDateTime("");
  };

  const canSend = picked.size > 0;

  return (
    <div className="relative min-h-[100dvh] bg-paper">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-plum-300/15 bg-paper/85 px-4 py-3 backdrop-blur-md">
        <Link
          to="/connections/$id"
          params={{ id: id_ }}
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="font-display text-[15px] font-semibold text-ink">Suggest times</p>
      </header>

      <div className="px-5 pt-5 pb-12">
        <p className="text-label-mono">Plan · when</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Suggest some times.
        </h1>

        <section className="mt-6">
          <p className="text-label-mono">Quick picks</p>
          <ul className="mt-3 grid grid-cols-2 gap-2.5">
            {QUICK_SLOTS.map((slot) => {
              const on = picked.has(slot);
              return (
                <li key={slot}>
                  <button
                    type="button"
                    onClick={() => togglePick(slot)}
                    aria-pressed={on}
                    className={
                      on
                        ? "w-full rounded-[14px] border-2 border-plum-500 bg-paper px-3 py-3 text-left"
                        : "w-full rounded-[14px] border border-line bg-paper px-3 py-3 text-left hover:bg-lavender-50"
                    }
                  >
                    <p className="font-display text-[13.5px] text-ink">{slot}</p>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-6">
          <p className="text-label-mono">Add another time</p>
          <div className="mt-3 flex gap-2">
            <input
              type="datetime-local"
              value={customDateTime}
              onChange={(e) => setCustomDateTime(e.target.value)}
              className="flex-1 rounded-[12px] border border-line bg-paper px-3 py-2 font-body text-[13.5px] text-ink"
            />
            <button
              type="button"
              onClick={addCustom}
              disabled={!customDateTime}
              className="rounded-full bg-plum-700 px-4 py-2 text-label-mono text-paper hover:opacity-90 disabled:opacity-40"
            >
              Add
            </button>
          </div>
        </section>

        {picked.size > 0 && (
          <section className="mt-7">
            <p className="text-label-mono">Suggesting</p>
            <ul className="mt-3 space-y-2">
              {Array.from(picked).map((slot) => (
                <li
                  key={slot}
                  className="flex items-center justify-between gap-3 rounded-[12px] bg-paper px-3 py-2.5 shadow-elev-1"
                >
                  <p className="font-body text-[13.5px] text-ink">{slot}</p>
                  <button
                    type="button"
                    onClick={() => togglePick(slot)}
                    aria-label={`Remove ${slot}`}
                    className="grid h-7 w-7 place-items-center rounded-full text-stone hover:bg-lavender-50"
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <button
          type="button"
          disabled={!canSend}
          onClick={() => navigate({ to: "/connections/$id", params: { id: id_ } })}
          className="mt-8 w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Send to them
        </button>
      </div>
    </div>
  );
}
