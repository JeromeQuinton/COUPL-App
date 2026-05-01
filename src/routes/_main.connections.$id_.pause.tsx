import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection, SAMPLE_DRAFT } from "@/data/connections_sample";

/**
 * /connections/$id/pause — Draft Intercept.
 *
 * Surfaced when the AI classifier flags the user's draft as anxious,
 * over-pursuing, hedging, or otherwise low-quality. Tone: empowering,
 * never shaming. Three exits: rewrite, send anyway, save for tomorrow.
 */
export const Route = createFileRoute("/_main/connections/$id_/pause")({
  head: () => ({
    meta: [
      { title: "Pause before sending — COUPL" },
      {
        name: "description",
        content:
          "A short pause before sending. We noticed a few patterns worth a second look.",
      },
    ],
  }),
  component: DraftInterceptScreen,
});

function DraftInterceptScreen() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "them";
  const [draft] = useState(SAMPLE_DRAFT.text);

  return (
    <PageBackdrop tone="deep">
      <div
        className="mx-auto w-full max-w-[440px] px-5"
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 1rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
        }}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/connections/$id"
            params={{ id }}
            aria-label="Close"
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <X className="h-5 w-5" />
          </Link>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Pause · Before sending
          </p>
          <span aria-hidden className="w-7" />
        </div>

        <header className="mt-5">
          <h1 className="font-display text-[28px] leading-tight text-ink">
            Take a breath.
          </h1>
          <p className="mt-2 text-[13.5px] leading-relaxed text-slate">
            Your draft has some patterns we'd like you to see before sending.
          </p>
        </header>

        <article
          className="mt-5 rounded-2xl border border-plum-300/35 px-4 py-3.5"
          style={{
            background:
              "linear-gradient(150deg, color-mix(in oklab, var(--blush) 55%, var(--paper)) 0%, color-mix(in oklab, var(--lavender-50) 70%, var(--paper)) 100%)",
          }}
        >
          <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-plum-700">
            Your draft to {name}
          </p>
          <p className="mt-2 text-[13.5px] italic leading-relaxed text-ink">
            “{draft}”
          </p>
        </article>

        <section className="mt-5" aria-label="What we noticed">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-plum-500">
            What we noticed
          </p>
          <ul className="mt-2.5 space-y-2.5">
            {SAMPLE_DRAFT.patterns.map((p) => (
              <li
                key={p.title}
                className="rounded-2xl border border-plum-300/30 bg-paper/85 px-4 py-3 shadow-[0_1px_2px_rgba(61,26,71,0.05)] backdrop-blur-sm"
              >
                <p className="font-display text-[14.5px] font-medium text-ink">
                  {p.title}
                </p>
                <p className="mt-1 text-[12.5px] leading-snug text-slate">
                  {p.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-6 space-y-2.5">
          <button
            type="button"
            onClick={() => navigate({ to: "/connections/$id", params: { id } })}
            className="w-full rounded-full bg-plum-500 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
          >
            Try again with this in mind
          </button>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => navigate({ to: "/connections/$id", params: { id } })}
              className="rounded-full border border-plum-300/45 bg-paper/80 px-4 py-2.5 text-[13.5px] font-medium text-plum-700 transition-colors hover:bg-paper"
            >
              Send anyway
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/connections" })}
              className="rounded-full border border-plum-300/45 bg-paper/80 px-4 py-2.5 text-[13.5px] font-medium text-plum-700 transition-colors hover:bg-paper"
            >
              Save for tomorrow
            </button>
          </div>
        </div>
      </div>
    </PageBackdrop>
  );
}