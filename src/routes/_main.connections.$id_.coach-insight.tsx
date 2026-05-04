import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { X, MoreHorizontal } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";

export const Route = createFileRoute("/_main/connections/$id_/coach-insight")({
  head: () => ({
    meta: [{ title: "A note from Polaris — COUPL" }],
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
        <header className="flex items-center justify-between py-2">
          <Link
            to="/connections/$id/coach-insight/feedback"
            params={{ id }}
            aria-label="Insight options"
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Link>
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
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-700">
            Polaris · insight
          </p>
          <h1 className="mt-3 font-display text-[28px] leading-[1.15] text-ink">
            A note from Polaris.
          </h1>
        </div>

        <article className="mt-7">
          <p className="font-body text-[15px] leading-relaxed text-ink">
            You're carrying most of the warmth in this thread. Their replies
            are kind but rarely the first move — questions, repair, the
            invitation to go deeper, all from your side. That can feel
            generous and it can also feel uneven, depending on the day.
            Worth holding both.
          </p>
        </article>

        <article className="mt-7 rounded-[14px] border border-line bg-paper px-4 py-3">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-stone">
            Anchored to · Wed 16:32
          </p>
          <p className="mt-2 font-body text-[13.5px] italic leading-relaxed text-slate">
            "Tell me about your week — properly, not the short version."
          </p>
        </article>

        <p className="mt-8 font-body text-[12.5px] italic text-stone">
          Polaris reflects your patterns, not theirs. No-one else sees this.
        </p>

        <div className="mt-auto pt-10">
          <button
            type="button"
            onClick={() =>
              navigate({ to: "/connections/$id", params: { id } })
            }
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Back to chat
          </button>
        </div>
      </div>
    </PageBackdrop>
  );
}
