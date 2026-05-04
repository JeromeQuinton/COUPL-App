import type {
  BoundariesAnswer,
  BoundariesQuestion as Q,
} from "@/data/connections_sample";

/**
 * BoundariesQuestion — single question card for R3-28 boundaries-alignment.
 * Renders chip-select for options (when present) and an "if you want to add"
 * free-text input. Pure controlled component.
 */
export function BoundariesQuestion({
  question,
  answer,
  onChange,
}: {
  question: Q;
  answer: BoundariesAnswer | undefined;
  onChange: (next: BoundariesAnswer) => void;
}) {
  const choice = answer?.choice;
  const freeText = answer?.freeText ?? "";

  const isFreeTextOnly = question.options.length === 0;

  return (
    <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
      <p className="font-display text-[14.5px] leading-snug text-ink">
        {question.prompt}
        {question.optional && (
          <span className="ml-2 text-label-mono text-stone">optional</span>
        )}
      </p>

      {!isFreeTextOnly && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {question.options.map((opt) => {
            const active = choice === opt;
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() =>
                    onChange({ questionId: question.id, choice: opt, freeText })
                  }
                  className={
                    active
                      ? "rounded-full bg-plum-700 px-3 py-1.5 text-label-mono text-paper"
                      : "rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-slate hover:bg-lavender-50"
                  }
                >
                  {opt}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <label className="mt-4 block">
        <span className="text-label-mono">
          {isFreeTextOnly ? "Your words" : "If you want to add"}
        </span>
        <textarea
          value={freeText}
          onChange={(e) =>
            onChange({
              questionId: question.id,
              choice,
              freeText: e.target.value,
            })
          }
          rows={isFreeTextOnly ? 3 : 2}
          placeholder={
            question.optional
              ? "Skip if it doesn't feel relevant."
              : "A line or two."
          }
          className="mt-2 w-full resize-none rounded-[12px] border border-line bg-paper p-3 font-body text-[13.5px] leading-relaxed text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
        />
      </label>
    </article>
  );
}
