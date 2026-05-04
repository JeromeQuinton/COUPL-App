import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/membership/subscription/cancel")({
  head: () => ({ meta: [{ title: "Cancel — COUPL" }] }),
  component: CancelScreen,
});

const REASONS = [
  { id: "met", label: "Met someone" },
  { id: "break", label: "Taking a break from dating" },
  { id: "cost", label: "Cost" },
  { id: "expectations", label: "Didn't get what I expected" },
  { id: "other", label: "Something else" },
];

function CancelScreen() {
  const [reason, setReason] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [stage, setStage] = useState<"form" | "confirm" | "done">("form");

  if (stage === "done") {
    return (
      <YouBackdrop>
        <StatusBar />
        <main className="px-5 py-12 text-center max-w-md mx-auto">
          <ScreenHeader
            eyebrow="Cancelled"
            title="Endings get the same care as beginnings."
          />
          <p className="mt-4 font-body text-[14px] leading-relaxed text-slate">
            You'll keep access until 3 June 2026. We don't delete anything — you can resume any time.
          </p>
          <Link
            to="/membership/subscription"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-plum-700 px-6 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Back to membership
          </Link>
        </main>
      </YouBackdrop>
    );
  }

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link to="/membership/subscription" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader
          eyebrow="Cancel"
          title="Before you go — what shifted?"
          titleItalic
        />
      </header>

      <section className="px-5">
        <fieldset>
          <legend className="text-label-mono">Reason</legend>
          <ul className="mt-3 space-y-2">
            {REASONS.map((r) => {
              const active = reason === r.id;
              return (
                <li key={r.id}>
                  <label className={`block cursor-pointer rounded-[14px] border px-4 py-3.5 transition-colors ${
                    active ? "border-plum-500 bg-lavender-100" : "border-line bg-paper hover:bg-lavender-50"
                  }`}>
                    <input
                      type="radio"
                      name="reason"
                      checked={active}
                      onChange={() => setReason(r.id)}
                      className="sr-only"
                    />
                    <p className={`font-display text-[14.5px] ${active ? "text-plum-700 font-semibold" : "text-ink"}`}>
                      {r.label}
                    </p>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>
      </section>

      <section className="px-5 pt-5">
        <label className="text-label-mono" htmlFor="cancel-note">Anything you'd want us to know?</label>
        <textarea
          id="cancel-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
          placeholder="Honest feedback helps us pace the product."
          className="mt-2 w-full resize-none rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[13.5px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
        />
      </section>

      <section className="px-5 pt-5">
        <article className="rounded-[18px] bg-lavender-100 px-5 py-5">
          <p className="text-label-mono text-plum-700">Want to pause instead?</p>
          <p className="mt-2 font-body text-[13px] text-ink">
            You'll keep your matches and reflections. Pick this up when you're ready.
          </p>
          <Link
            to="/membership/subscription/pause"
            className="mt-3 inline-flex items-center justify-center rounded-full bg-plum-700 px-5 py-2.5 font-display text-[13.5px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Pause membership
          </Link>
        </article>
      </section>

      <section className="px-5 pt-8 pb-12">
        {stage === "form" ? (
          <button
            type="button"
            onClick={() => setStage("confirm")}
            disabled={!reason}
            className="w-full rounded-full px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            style={{ background: "var(--danger)" }}
          >
            Cancel membership
          </button>
        ) : (
          <article className="rounded-[18px] border border-line bg-paper px-5 py-5">
            <p className="text-label-mono">Confirm</p>
            <p className="mt-2 font-body text-[14px] leading-relaxed text-ink">
              You'll keep access until 3 June 2026. After that, your profile becomes invisible and matches are paused. We don't delete anything — you can resume any time.
            </p>
            <div className="mt-4 space-y-3">
              <button
                type="button"
                onClick={() => setStage("done")}
                className="w-full rounded-full px-5 py-3.5 font-display text-[15px] font-medium text-paper hover:opacity-90"
                style={{ background: "var(--danger)" }}
              >
                Confirm cancellation
              </button>
              <button
                type="button"
                onClick={() => setStage("form")}
                className="w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
              >
                Keep membership
              </button>
            </div>
          </article>
        )}
      </section>
    </YouBackdrop>
  );
}
