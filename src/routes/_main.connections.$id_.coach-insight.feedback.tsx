import { useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";

export const Route = createFileRoute(
  "/_main/connections/$id_/coach-insight/feedback",
)({
  head: () => ({
    meta: [{ title: "Was this useful? — COUPL" }],
  }),
  component: CoachFeedbackScreen,
});

const OPTIONS = ["Helpful", "Off-base", "Not for me right now"] as const;
type Option = (typeof OPTIONS)[number];

function CoachFeedbackScreen() {
  const { id } = useParams({
    from: "/_main/connections/$id_/coach-insight/feedback",
  });
  const navigate = useNavigate();
  const [choice, setChoice] = useState<Option | null>(null);
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <PageBackdrop>
        <div
          className="mx-auto flex w-full max-w-[480px] flex-col items-start px-6"
          style={{ minHeight: "100dvh", paddingTop: "calc(env(safe-area-inset-top) + 4rem)" }}
        >
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-700">
            Polaris · feedback
          </p>
          <h1 className="mt-3 font-display text-[26px] leading-[1.15] text-ink">
            Noted. Polaris will adjust.
          </h1>
          <Link
            to="/connections/$id"
            params={{ id }}
            className="mt-10 w-full rounded-full bg-plum-700 px-5 py-3.5 text-center font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Back to chat
          </Link>
        </div>
      </PageBackdrop>
    );
  }

  return (
    <PageBackdrop>
      <div
        className="mx-auto flex w-full max-w-[480px] flex-col px-6"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
        }}
      >
        <header className="flex items-center py-2">
          <Link
            to="/connections/$id/coach-insight"
            params={{ id }}
            aria-label="Back"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </header>

        <div className="mt-4">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-700">
            Polaris · feedback
          </p>
          <h1 className="mt-3 font-display text-[28px] leading-[1.15] text-ink">
            Was this useful?
          </h1>
        </div>

        <ul className="mt-7 space-y-2">
          {OPTIONS.map((opt) => {
            const active = choice === opt;
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => setChoice(opt)}
                  className={`w-full rounded-[14px] border px-4 py-3.5 text-left font-body text-[14px] transition-colors ${
                    active
                      ? "border-plum-700 bg-lavender-100 text-ink"
                      : "border-line bg-paper text-ink hover:bg-lavender-50"
                  }`}
                >
                  {opt}
                </button>
              </li>
            );
          })}
        </ul>

        <label className="mt-6 block">
          <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-stone">
            Anything more (optional)
          </span>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value.slice(0, 160))}
            rows={3}
            placeholder="Plain words are fine."
            className="mt-2 w-full rounded-[12px] border border-line bg-paper px-3 py-2.5 font-body text-[14px] text-ink placeholder:text-stone focus:outline-none"
          />
          <p className="mt-1 text-right font-body text-[11px] text-stone">
            {note.length}/160
          </p>
        </label>

        <div className="mt-auto pt-10">
          <button
            type="button"
            disabled={!choice}
            onClick={() => setSubmitted(true)}
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 disabled:opacity-40 hover:opacity-90"
          >
            Send
          </button>
        </div>
      </div>
    </PageBackdrop>
  );
}
