import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { ConnectionAvatar } from "@/components/connections/Avatar";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/connected — the dual-attune Connection Moment.
 *
 * Editorial pause between mutual Attune and the first message. Calm,
 * non-celebratory, Polaris-toned. Phase 1: state-free; Phase 4 will
 * gate by `connections.state === 'mutual'` (DR-023, DR-030).
 */
export const Route = createFileRoute("/_main/connections/$id_/connected")({
  head: () => ({
    meta: [
      { title: "You both chose each other — COUPL" },
      {
        name: "description",
        content:
          "Mutual attunement. A beginning with more honesty than guessing.",
      },
    ],
  }),
  component: ConnectedScreen,
});

function ConnectedScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/connected" });
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "them";
  const initial = c?.initial ?? "?";
  const hue = c?.hue ?? "lavender";

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
            Connection
          </p>
        </header>

        <div className="mt-10 flex flex-col items-center text-center">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            A quiet moment
          </p>
          <h1 className="mt-4 font-display text-[28px] leading-[1.15] text-ink">
            You both chose each other.
          </h1>
          <p className="mt-4 max-w-[340px] font-body text-[14.5px] leading-relaxed text-slate">
            Mutual interest. Clear signal. A beginning with more honesty than
            guessing.
          </p>

          <div className="mt-10 flex animate-in fade-in zoom-in-95 items-center justify-center gap-5 duration-500 motion-reduce:animate-none">
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

          <p className="mt-10 max-w-[320px] font-display text-[15px] italic leading-relaxed text-plum-700">
            Start gently. Momentum does not require chaos.
          </p>
        </div>

        <div className="mt-auto space-y-3 pt-10">
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/connections/$id/first-hello",
                params: { id },
              })
            }
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 transition-colors hover:opacity-90"
          >
            Say hello
          </button>
          <Link
            to="/connections"
            className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
          >
            Save for later
          </Link>
          <Link
            to="/discover/$id"
            params={{ id }}
            className="block w-full rounded-full px-5 py-2 text-center font-body text-[13px] text-plum-700 hover:underline"
          >
            See their profile →
          </Link>
        </div>
      </div>
    </PageBackdrop>
  );
}