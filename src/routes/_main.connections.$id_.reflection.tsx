import { useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, Sparkles } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { HubScreenHeader } from "@/components/shell/HubScreenHeader";
import { BODY_STATES, SEE_AGAIN_OPTIONS } from "@/data/growth_sample";

export const Route = createFileRoute("/_main/connections/$id_/reflection")({
  head: () => ({
    meta: [
      { title: "After meeting · COUPL" },
      {
        name: "description",
        content:
          "A quiet post-date reflection. Your body is part of your dating data.",
      },
    ],
  }),
  component: PostDateReflectionPage,
});

function PostDateReflectionPage() {
  const { id } = useParams({ from: "/_main/connections/$id_/reflection" });
  const navigate = useNavigate();
  const [body, setBody] = useState<string | null>(null);
  const [feeling, setFeeling] = useState<string>("");
  const [reflection, setReflection] = useState<string>("");
  const [seeAgain, setSeeAgain] = useState<string | null>(null);

  const handleSave = () => {
    navigate({ to: "/connections/$id", params: { id } });
  };

  return (
    <PageBackdrop>
      <StatusBar
        leading={
          <Link
            to="/connections/$id"
            params={{ id }}
            aria-label="Back to thread"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      {/* Header */}
      <header className="px-5 pt-2 pb-5">
        <HubScreenHeader
          eyebrow="After meeting"
          title="Your body is part of your dating data."
        />
        <p className="mt-2 font-body text-[13.5px] leading-relaxed text-slate">
          A quick, kind read. Nothing here is shared. Two minutes, then closed.
        </p>
      </header>

      {/* Body state */}
      <section className="px-5 pt-2">
        <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          When you walked away, your body felt…
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {BODY_STATES.map((b) => {
            const active = body === b.id;
            return (
              <button
                key={b.id}
                type="button"
                onClick={() => setBody(b.id)}
                className={`rounded-[14px] border px-4 py-3 text-left transition-colors ${
                  active
                    ? "border-plum-500 bg-lavender-100"
                    : "border-line bg-paper hover:bg-lavender-50"
                }`}
              >
                <p className={`font-display text-[15px] font-medium ${active ? "text-plum-700" : "text-ink"}`}>
                  {b.label}
                </p>
                <p className="mt-0.5 font-body text-[11.5px] text-stone">
                  {b.hint}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Feeling word */}
      <section className="px-5 pt-7">
        <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          One word for the feeling that lingered
        </h2>
        <input
          type="text"
          value={feeling}
          onChange={(e) => setFeeling(e.target.value)}
          placeholder="curious · steady · pulled-in · unsure…"
          className="mt-3 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-display text-[15px] text-ink placeholder:font-body placeholder:text-[13px] placeholder:text-stone focus:border-plum-500 focus:outline-none"
        />
      </section>

      {/* One-sentence reflection */}
      <section className="px-5 pt-7">
        <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          One sentence about what actually happened
        </h2>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          rows={3}
          placeholder="Not the verdict. The moment you keep coming back to."
          className="mt-3 w-full resize-none rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[14px] leading-relaxed text-ink placeholder:text-[13px] placeholder:text-stone focus:border-plum-500 focus:outline-none"
        />
      </section>

      {/* See again */}
      <section className="px-5 pt-7">
        <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          Want to see them again?
        </h2>
        <div className="mt-3 flex flex-col gap-2">
          {SEE_AGAIN_OPTIONS.map((o) => {
            const active = seeAgain === o.id;
            return (
              <button
                key={o.id}
                type="button"
                onClick={() => setSeeAgain(o.id)}
                className={`flex items-center justify-between rounded-[14px] border px-4 py-3 text-left transition-colors ${
                  active
                    ? "border-plum-500 bg-lavender-100"
                    : "border-line bg-paper hover:bg-lavender-50"
                }`}
              >
                <div>
                  <p className={`font-display text-[14.5px] font-medium ${active ? "text-plum-700" : "text-ink"}`}>
                    {o.label}
                  </p>
                  <p className="mt-0.5 font-body text-[12px] text-stone">
                    {o.sub}
                  </p>
                </div>
                <span
                  aria-hidden
                  className={`h-4 w-4 rounded-full border ${
                    active ? "border-plum-500 bg-plum-500" : "border-stone/60"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </section>

      {/* Coach insight */}
      {body && (
        <section className="px-5 pt-7">
          <div
            className="rounded-[16px] border border-dashed p-4"
            style={{
              borderColor: "color-mix(in oklab, var(--plum-500, #8A4DA1) 35%, transparent)",
              background: "color-mix(in oklab, var(--blush) 32%, var(--paper))",
            }}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-plum-500" strokeWidth={1.75} />
              <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-plum-500">
                A note from your coach
              </p>
            </div>
            <p className="mt-2 font-body text-[13.5px] leading-relaxed text-ink/85">
              {coachLine(body)}
            </p>
          </div>
        </section>
      )}

      {/* Actions */}
      <section className="px-5 pt-7 pb-12">
        <button
          type="button"
          onClick={handleSave}
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 transition-colors hover:opacity-90"
        >
          Save to journal
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="mt-3 w-full rounded-full px-5 py-3 font-body text-[13.5px] text-slate transition-colors hover:text-plum-500"
        >
          Skip for now
        </button>
        <p className="mt-5 text-center font-body text-[11.5px] italic text-stone">
          Private to you. Used only to refine what we surface next.
        </p>
      </section>
    </PageBackdrop>
  );
}

function coachLine(state: string): string {
  switch (state) {
    case "settled":
      return "Settled is rare and worth marking. Notice what about the evening allowed your system to rest.";
    case "warm":
      return "Warmth in the chest after a meeting is a signal — not a verdict. Let it inform pace, not pressure.";
    case "neutral":
      return "Neutral is real data. Sometimes a second meeting reveals what a first one couldn't.";
    case "guarded":
      return "Guardedness deserves curiosity, not correction. What were your shoulders trying to protect?";
    case "depleted":
      return "Depletion is information about fit and effort, not a failure of openness.";
    case "activated":
      return "Activation isn't always attraction. Give your nervous system 24 hours before deciding what it meant.";
    default:
      return "";
  }
}