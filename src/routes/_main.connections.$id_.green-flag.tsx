import { useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { Check, Copy, X } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { PolarisHeader } from "@/components/shell/PolarisHeader";
import { getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/green-flag — Chat Green Flag (UI-0662).
 *
 * Polaris-toned moment card. Italic prose, no scoring, no praise
 * language. Includes a copyable suggested reply. Member-gated.
 *
 * Phase 1 inlines the flag content. Phase 4 sources from
 * getCoachFlag(threadId, type=green).
 *
 * Voice: avoid "good job", "well done", "amazing". Plain naming.
 *
 * DR refs: DR-FLAG-VOCABULARY (Stream 1).
 */
export const Route = createFileRoute("/_main/connections/$id_/green-flag")({
  head: () => ({
    meta: [
      { title: "A thing worth noticing — COUPL" },
      {
        name: "description",
        content:
          "A short Polaris note on something worth noticing in this thread.",
      },
    ],
  }),
  component: GreenFlagScreen,
});

/** Phase-1 gate stub. Phase 4 reads from auth.user.tier. */
const IS_MEMBER = true;

function GreenFlagScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/green-flag" });
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "they";

  const flagLine = `${name} acknowledged a difference of opinion without escalating. That's capacity.`;
  const suggested = "Thanks for hearing me on that.";

  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(suggested);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard may be unavailable (e.g., insecure context). Silent.
    }
  };

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
        <header className="flex items-center justify-end py-2">
          <Link
            to="/connections/$id"
            params={{ id }}
            aria-label="Close"
            className="-mr-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <X className="h-5 w-5" />
          </Link>
        </header>

        <div className="mt-6">
          <PolarisHeader
            eyebrow="Noticing · green"
            title="A thing worth noticing."
          />
        </div>

        {IS_MEMBER ? (
          <>
            <section className="mt-6 rounded-[18px] border border-plum-300/30 bg-paper/70 p-5">
              <p className="font-display text-[15.5px] italic leading-relaxed text-plum-700">
                {flagLine}
              </p>
            </section>

            <section className="mt-4 rounded-[18px] border border-line bg-paper p-5">
              <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
                Suggested reply
              </p>
              <p className="mt-2 font-body text-[14.5px] leading-relaxed text-ink">
                {suggested}
              </p>
              <button
                type="button"
                onClick={onCopy}
                aria-live="polite"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-plum-300/40 bg-paper px-3 py-1.5 text-[12.5px] font-medium text-plum-700 transition-colors hover:bg-lavender-50"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" aria-hidden /> Copy
                  </>
                )}
              </button>
            </section>
          </>
        ) : (
          <section className="mt-6 rounded-[18px] border border-plum-300/40 bg-paper p-5">
            <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
              Member-only
            </p>
            <h2 className="mt-3 font-display text-[18px] leading-snug text-ink">
              Noticing notes are part of membership.
            </h2>
            <p className="mt-2 font-body text-[14px] leading-relaxed text-slate">
              Short Polaris notes on what's working in your conversations.
            </p>
            <button
              type="button"
              onClick={() => navigate({ to: "/profile" })}
              className="mt-4 inline-flex h-10 items-center rounded-full bg-plum-700 px-4 font-body text-[13.5px] text-paper hover:opacity-90"
            >
              See membership
            </button>
          </section>
        )}

        <div className="mt-auto space-y-3 pt-10">
          <button
            type="button"
            onClick={() =>
              navigate({ to: "/connections/$id", params: { id } })
            }
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 transition-colors hover:opacity-90"
          >
            Back to chat
          </button>
        </div>
      </div>
    </PageBackdrop>
  );
}
