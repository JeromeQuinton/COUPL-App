import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/video/pre-meet/$connectionId/ended")({
  head: () => ({ meta: [{ title: "After the call — COUPL" }] }),
  component: EndedCallScreen,
});

const STATES = [
  { id: "settled", label: "Steady" },
  { id: "warm", label: "Warm" },
  { id: "activated", label: "Activated" },
  { id: "depleted", label: "Depleted" },
];

function EndedCallScreen() {
  const navigate = useNavigate();
  const [body, setBody] = useState<string | null>(null);
  const [note, setNote] = useState("");

  return (
    <div
      className="min-h-[100dvh] px-5"
      style={{
        background: "var(--paper)",
        paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
      }}
    >
      <div className="mx-auto max-w-[460px]">
        <p className="text-label-mono">After the call</p>
        <h1 className="mt-3 font-display text-[28px] leading-tight text-ink">
          How was being there?
        </h1>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {STATES.map((s) => {
            const active = body === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setBody(s.id)}
                className={`rounded-[14px] border px-4 py-4 text-center transition-colors ${
                  active ? "border-plum-500 bg-lavender-100" : "border-line bg-paper hover:bg-lavender-50"
                }`}
              >
                <p className={`font-display text-[15px] ${active ? "text-plum-700 font-semibold" : "text-ink"}`}>
                  {s.label}
                </p>
              </button>
            );
          })}
        </div>

        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="One sentence. What did you notice?"
          className="mt-6 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
        />

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Save reflection
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
