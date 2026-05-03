import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/video/coach/$bookingId/ended")({
  head: () => ({ meta: [{ title: "After Liora — COUPL" }] }),
  component: CoachEnded,
});

const STATES = [
  { id: "settled", label: "Steady" },
  { id: "warm", label: "Warm" },
  { id: "activated", label: "Activated" },
  { id: "depleted", label: "Depleted" },
];

function CoachEnded() {
  const navigate = useNavigate();
  const [body, setBody] = useState<string | null>(null);
  const [text, setText] = useState("");

  return (
    <div
      className="min-h-[100dvh] px-5 bg-paper"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)", paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
    >
      <div className="mx-auto max-w-[460px]">
        <p className="text-label-mono">After the call</p>
        <h1 className="mt-3 font-display text-[28px] leading-tight text-ink">
          Sit with it for a minute.
        </h1>
        <p className="mt-3 font-display text-[14px] italic text-stone">
          Don't write yet if you don't want to.
        </p>

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

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="If anything's surfacing, put it here."
          className="mt-6 w-full resize-none rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
        />

        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="mt-6 w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Save reflection
        </button>

        <article className="mt-6 rounded-[16px] bg-lavender-100 px-5 py-4">
          <p className="text-label-mono text-plum-700">What happens next</p>
          <p className="mt-2 font-body text-[13.5px] text-ink">
            Liora's note arrives by tomorrow. It'll land in your inbox and in the app.
          </p>
        </article>

        <button
          type="button"
          onClick={() => navigate({ to: "/" })}
          className="mt-3 w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
