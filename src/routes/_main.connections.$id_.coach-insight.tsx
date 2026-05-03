import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { X } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";

export const Route = createFileRoute("/_main/connections/$id_/coach-insight")({
  head: () => ({
    meta: [
      { title: "A pattern noticed — COUPL" },
      {
        name: "description",
        content: "A reflective note from your coach. Private to you.",
      },
    ],
  }),
  component: CoachInsightScreen,
});

function CoachInsightScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/coach-insight" });
  const navigate = useNavigate();

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
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Coach · noticed
          </p>
          <h1 className="mt-3 font-display text-[26px] leading-[1.15] text-ink">
            You're doing more emotional labour here.
          </h1>

          <div className="mt-8 space-y-6">
            <section>
              <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
                Observation
              </p>
              <p className="mt-2 font-body text-[14.5px] leading-relaxed text-ink">
                Their replies are warm, but you're consistently carrying
                momentum, depth, and repair across this thread.
              </p>
            </section>

            <section>
              <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
                What to sit with
              </p>
              <p className="mt-2 font-body text-[14.5px] leading-relaxed text-ink">
                That may be fine. It may also be worth noticing whether you
                tend to do this in connections that matter to you.
              </p>
            </section>

            <section>
              <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
                A small try
              </p>
              <p className="mt-2 font-body text-[14.5px] leading-relaxed text-ink">
                Send your next message a beat later than you'd usually
                choose. See what arrives back.
              </p>
            </section>
          </div>

          <p className="mt-8 font-body text-[13px] italic text-stone">
            Coach reflects your patterns, not theirs. No-one else sees this.
          </p>
        </div>

        <div className="mt-auto space-y-3 pt-10">
          <button
            type="button"
            onClick={() =>
              navigate({ to: "/connections/$id", params: { id } })
            }
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Sit with this
          </button>
          <button
            type="button"
            onClick={() =>
              navigate({ to: "/connections/$id", params: { id } })
            }
            className="w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
          >
            Not now
          </button>
        </div>
      </div>
    </PageBackdrop>
  );
}