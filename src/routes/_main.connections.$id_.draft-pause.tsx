import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection, SAMPLE_DRAFT } from "@/data/connections_sample";

/**
 * /connections/$id/draft-pause — Draft Intercept (Screen 15).
 *
 * Modal-style overlay over a dimmed thread background. "A small pause"
 * eyebrow, draft preview, four equal-weight exits. No shaming, no
 * forced friction. Sovereignty preserved: "Send anyway" has zero
 * friction.
 */
export const Route = createFileRoute("/_main/connections/$id_/draft-pause")({
  head: () => ({
    meta: [
      { title: "A small pause — COUPL" },
      {
        name: "description",
        content: "A short pause before sending. Your nervous system, quietly helping.",
      },
    ],
  }),
  component: DraftPauseScreen,
});

function DraftPauseScreen() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "them";
  const [draft] = useState(SAMPLE_DRAFT.text);

  const back = () => navigate({ to: "/connections/$id", params: { id } });

  return (
    <PageBackdrop tone="deep">
      {/* Dimmed scrim over the implied thread */}
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
        {/* Spacer pushes the modal toward the bottom-third per wireframe */}
        <div className="flex-1" />

        <article
          className="rounded-[24px] border border-plum-300/30 bg-paper p-5 shadow-[0_24px_60px_-20px_rgba(28,15,40,0.45)]"
          aria-modal="true"
          role="dialog"
          aria-labelledby="draft-pause-title"
        >
          {/* Eyebrow row */}
          <div className="flex items-center justify-between gap-3">
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-plum-500">
              <span className="opacity-60">UI-DraftSurge · </span>Draft intercept (NSE)
            </p>
            <span className="rounded-full border border-plum-300/50 bg-lavender-50 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-plum-700">
              New
            </span>
          </div>

          <p className="mt-4 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-plum-500">
            A small pause
          </p>
          <h1
            id="draft-pause-title"
            className="mt-1.5 font-display text-[22px] leading-tight text-ink"
          >
            This message reads activated.
            <br />
            Want a moment with it?
          </h1>

          {/* Draft preview */}
          <div
            className="mt-4 rounded-[14px] border border-line bg-paper/70 px-4 py-3"
          >
            <p className="text-[13px] italic leading-relaxed text-ink/85">
              "{draft.length > 110 ? draft.slice(0, 108).trim() + "…" : draft}"
            </p>
          </div>

          {/* Four equal exits */}
          <div className="mt-5 grid grid-cols-2 gap-2.5">
            <PauseButton label="Rewrite softer" onClick={back} variant="ghost" />
            <PauseButton label="Hold for 24h" onClick={back} variant="ghost" />
            <PauseButton label="Reset draft" onClick={back} variant="ghost" />
            <PauseButton label="Send anyway" onClick={back} variant="primary" />
          </div>

          <p className="mt-4 text-center text-[11.5px] italic text-stone">
            All four are equal. No friction on Send Anyway.
          </p>

          <p className="sr-only">Drafting to {name}.</p>
        </article>
      </div>
    </PageBackdrop>
  );
}

function PauseButton({
  label,
  onClick,
  variant,
}: {
  label: string;
  onClick: () => void;
  variant: "ghost" | "primary";
}) {
  const cls =
    variant === "primary"
      ? "rounded-full bg-plum-700 px-4 py-2.5 text-paper hover:opacity-90"
      : "rounded-full border border-line bg-paper px-4 py-2.5 text-ink hover:bg-lavender-50";
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${cls} font-display text-[13.5px] font-medium transition-colors`}
    >
      {label}
    </button>
  );
}