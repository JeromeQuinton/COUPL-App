import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/draft-surge — Draft Surge Protector (UI-NEW-002).
 *
 * R2-03 — surfaced when chat compose detects 4+ outbound messages
 * without an inbound reply. Sibling to draft-pause but different
 * trigger and softer voice: noticing, not stopping.
 *
 * "Send anyway" is a tertiary text link that appears after an 8s
 * reading delay — never blocks, never shames. DR-DRAFT-SURGE.
 *
 * Phase 1 ships the surface. Wiring chat compose to push users here
 * on the threshold lands in Phase 4 alongside the draft-state model.
 */

const READING_DELAY_MS = 8000;

export const Route = createFileRoute("/_main/connections/$id_/draft-surge")({
  head: () => ({
    meta: [
      { title: "Pause for a beat — COUPL" },
      {
        name: "description",
        content: "A small noticing before another message goes out.",
      },
    ],
  }),
  component: DraftSurgeScreen,
});

function DraftSurgeScreen() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "them";
  const [overrideVisible, setOverrideVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setOverrideVisible(true), READING_DELAY_MS);
    return () => window.clearTimeout(t);
  }, []);

  const back = () => navigate({ to: "/connections/$id", params: { id } });

  return (
    <PageBackdrop tone="deep">
      <div
        aria-hidden
        className="fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(28,15,40,0.55) 0%, rgba(28,15,40,0.40) 100%)",
        }}
      />

      <div
        className="relative z-10 mx-auto flex w-full max-w-[440px] flex-col px-4"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 1rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
        }}
      >
        <div className="flex-1" />

        <article
          className="rounded-[24px] border border-plum-300/30 bg-paper p-5 shadow-[0_24px_60px_-20px_rgba(28,15,40,0.45)]"
          aria-modal="true"
          role="dialog"
          aria-labelledby="draft-surge-title"
        >
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-plum-500">
            Pause for a beat
          </p>
          <h1
            id="draft-surge-title"
            className="mt-1.5 font-display text-[24px] leading-tight text-ink"
          >
            You've sent four in a row.
          </h1>

          <p className="mt-3 font-body text-[14px] leading-relaxed text-ink/85">
            You've sent four messages to {name} without a reply. Pause is a
            kindness — to them and to you.
          </p>

          <div className="mt-5 rounded-[14px] bg-lavender-50 px-4 py-3">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-plum-700">
              A few softer choices
            </p>
            <ul className="mt-2 space-y-1.5 font-body text-[13.5px] text-ink/85">
              <li className="flex items-start gap-2">
                <span aria-hidden className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-plum-500" />
                Take a walk.
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-plum-500" />
                Save the draft.
              </li>
              <li className="flex items-start gap-2">
                <span aria-hidden className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-plum-500" />
                Come back tomorrow.
              </li>
            </ul>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={back}
              className="flex h-12 w-full items-center justify-center rounded-[12px] bg-plum-500 font-body text-[14.5px] font-semibold text-paper shadow-elev-1 transition-colors hover:bg-plum-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-300"
            >
              Save the draft and step away
            </button>
            <Link
              to="/connections/$id"
              params={{ id }}
              className="flex h-12 w-full items-center justify-center rounded-[12px] border border-line bg-paper font-body text-[14.5px] font-semibold text-ink transition-colors hover:bg-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-300"
            >
              Back to the thread
            </Link>
            <p
              aria-live="polite"
              className="min-h-[20px] text-center"
            >
              {overrideVisible ? (
                <button
                  type="button"
                  onClick={back}
                  className="font-body text-[13px] text-stone underline-offset-4 hover:underline"
                >
                  Send anyway
                </button>
              ) : null}
            </p>
          </div>
        </article>
      </div>
    </PageBackdrop>
  );
}
