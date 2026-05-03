import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/video/workshop/$workshopId/ended")({
  head: () => ({ meta: [{ title: "After the session — COUPL" }] }),
  component: WorkshopEnded,
});

function WorkshopEnded() {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  return (
    <div
      className="min-h-[100dvh] px-5 bg-paper"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)", paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
    >
      <div className="mx-auto max-w-[460px]">
        <p className="text-label-mono">After the session</p>
        <h1 className="mt-3 font-display text-[28px] leading-tight text-ink">
          What landed?
        </h1>
        <p className="mt-3 font-display text-[14px] italic text-stone">
          One thing. The first thing. Don't edit.
        </p>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Write what you noticed."
          className="mt-6 w-full resize-none rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
        />

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Save to my journal
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
          >
            Skip — I'll come back to this
          </button>
        </div>
      </div>
    </div>
  );
}
