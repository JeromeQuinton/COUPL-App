import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { ConnectionAvatar } from "@/components/connections/Avatar";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/connected — Match Connected (UI-0044).
 *
 * Editorial pause between mutual Attune and the first message. Calm,
 * non-celebratory, Polaris-toned. Two-avatar gradient hero, italic
 * intent-overlap line, three plain CTAs. Phase 1 is state-free; Phase
 * 4 will gate by `connections.state === 'mutual'` (DR-023, DR-030).
 *
 * Voice: no "congratulations", no "matched!". Plain noticing.
 *
 * DR refs: DR-MATCH-MOMENT (Stream 14).
 */
export const Route = createFileRoute("/_main/connections/$id_/connected")({
  head: () => ({
    meta: [
      { title: "You're connected — COUPL" },
      {
        name: "description",
        content:
          "Mutual interest, clearly stated. A beginning with more honesty than guessing.",
      },
    ],
  }),
  component: ConnectedScreen,
});

/**
 * Phase-1 intent-overlap line. In Phase 4 this comes from
 * `getIntentOverlap(pairId)` and reflects actual stated-intent
 * intersection from both profiles. For now: a calm editorial sentence
 * keyed off name to feel pair-specific without overclaiming.
 */
function intentOverlapFor(name: string): string {
  return `You both said you wanted presence over performance — that's where this can start, ${name}.`;
}

/** "Connected 2 days ago" → "two days ago"; falls back to "today". */
function connectedOnFrom(label: string | undefined): string {
  if (!label) return "today";
  const m = label.match(/Connected\s+(.+)/i);
  return m ? m[1] : label;
}

function ConnectedScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/connected" });
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "them";
  const initial = c?.initial ?? "?";
  const hue = c?.hue ?? "lavender";
  const connectedOn = connectedOnFrom(c?.daysAgoLabel);

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
        <header className="flex items-center gap-2 py-2">
          <Link
            to="/connections"
            aria-label="Back to Connections"
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Match · connected
          </p>
        </header>

        <div className="mt-8">
          <h1 className="font-display text-[28px] leading-[1.15] text-ink">
            You're connected.
          </h1>
        </div>

        <div
          className="mt-8 rounded-[24px] px-6 py-8"
          style={{
            background:
              "linear-gradient(160deg, rgba(244, 225, 204, 0.55) 0%, rgba(231, 213, 240, 0.55) 55%, rgba(255, 255, 255, 0.4) 100%)",
          }}
        >
          <div className="flex animate-in fade-in zoom-in-95 items-center justify-center gap-5 duration-500 motion-reduce:animate-none">
            <div className="flex flex-col items-center gap-2">
              <ConnectionAvatar initial="Y" hue="plum" size={64} />
              <span className="text-label-mono text-stone">You</span>
            </div>
            <span
              aria-hidden
              className="font-display text-[22px] italic text-plum-500"
            >
              ·
            </span>
            <div className="flex flex-col items-center gap-2">
              <ConnectionAvatar initial={initial} hue={hue} size={64} />
              <span className="text-label-mono text-stone">{name}</span>
            </div>
          </div>
          <p className="mt-6 text-center text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Connected {connectedOn}
          </p>
        </div>

        <p className="mt-8 max-w-[360px] font-display text-[15px] italic leading-relaxed text-plum-700">
          {intentOverlapFor(name)}
        </p>

        <div className="mt-auto space-y-3 pt-10">
          <button
            type="button"
            onClick={() =>
              navigate({ to: "/connections/$id", params: { id } })
            }
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 transition-colors hover:opacity-90"
          >
            Open chat
          </button>
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/connections/$id/before-meeting",
                params: { id },
              })
            }
            className="w-full rounded-full border border-plum-300/50 bg-paper px-5 py-3 text-center font-body text-[14px] text-plum-700 transition-colors hover:bg-lavender-50"
          >
            Read a short note before you reply
          </button>
          <Link
            to="/connections"
            className="block w-full rounded-full px-5 py-2 text-center font-body text-[13px] text-slate hover:text-plum-500"
          >
            Maybe later
          </Link>
        </div>
      </div>
    </PageBackdrop>
  );
}
