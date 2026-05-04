import { useState } from "react";
import { X } from "lucide-react";
import type { ValuesCard } from "@/data/connections_sample";

/**
 * ValueCard — three-state conversation card for R3-31 values-overlap.
 * Close = soft gradient blend; Different = two side-by-side colour fields;
 * Not yet = muted single colour with dotted border. Tertiary "What would I
 * want to ask?" opens a journal-prompt modal sheet (no new route).
 */
export function ValueCard({ card }: { card: ValuesCard }) {
  const [promptOpen, setPromptOpen] = useState(false);

  return (
    <article
      className={
        card.state === "not-yet"
          ? "rounded-[18px] border border-dashed border-line bg-paper p-5"
          : "rounded-[18px] bg-paper p-5 shadow-elev-1"
      }
    >
      <div
        aria-hidden
        className="h-12 w-full rounded-[10px]"
        style={{ background: backgroundFor(card.state) }}
      />
      <p className="mt-4 text-label-mono">
        {card.label}
        <span className="ml-2 normal-case text-stone">·</span>{" "}
        <span
          className={
            card.state === "close"
              ? "text-plum-700"
              : card.state === "different"
                ? "text-caution"
                : "text-stone"
          }
        >
          {STATE_LABEL[card.state]}
        </span>
      </p>
      <p className="mt-2 font-body text-[13.5px] leading-relaxed text-ink">
        {card.copy}
      </p>
      <button
        type="button"
        onClick={() => setPromptOpen(true)}
        className="mt-3 text-label-mono text-plum-700 hover:text-plum-500"
      >
        What would I want to ask about this? →
      </button>

      {promptOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40"
          onClick={() => setPromptOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-md rounded-t-3xl bg-paper px-6 pb-8 pt-4"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`prompt-${card.area}`}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-label-mono text-stone">JOURNAL PROMPT</span>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setPromptOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-slate hover:bg-lavender-100"
              >
                <X size={16} />
              </button>
            </div>
            <h2
              id={`prompt-${card.area}`}
              className="font-display text-[20px] leading-tight text-ink"
            >
              {card.prompt}
            </h2>
            <p className="mt-3 font-body text-[13px] italic text-stone">
              No need to write anything down. Reading it through is enough.
            </p>
          </div>
        </div>
      )}
    </article>
  );
}

const STATE_LABEL: Record<ValuesCard["state"], string> = {
  close: "Close",
  different: "Different",
  "not-yet": "Not yet",
};

function backgroundFor(state: ValuesCard["state"]): string {
  if (state === "close") {
    return "linear-gradient(110deg, color-mix(in oklab, var(--plum-300) 45%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 65%, var(--paper)) 60%, color-mix(in oklab, var(--plum-300) 45%, var(--paper)) 100%)";
  }
  if (state === "different") {
    return "linear-gradient(90deg, color-mix(in oklab, var(--plum-300) 55%, var(--paper)) 0%, color-mix(in oklab, var(--plum-300) 55%, var(--paper)) 49%, var(--paper) 49%, var(--paper) 51%, color-mix(in oklab, var(--blush) 75%, var(--paper)) 51%, color-mix(in oklab, var(--blush) 75%, var(--paper)) 100%)";
  }
  return "color-mix(in oklab, var(--lavender-100) 35%, var(--paper))";
}
