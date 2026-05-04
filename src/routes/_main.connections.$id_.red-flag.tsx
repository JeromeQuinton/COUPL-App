import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { X } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";

export const Route = createFileRoute("/_main/connections/$id_/red-flag")({
  head: () => ({
    meta: [{ title: "Something to read carefully — COUPL" }],
  }),
  component: RedFlagScreen,
});

function RedFlagScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/red-flag" });
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
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-700">
            Noticing · pause
          </p>
          <h1 className="mt-3 font-display text-[26px] leading-[1.15] text-ink">
            Something to read carefully.
          </h1>
        </div>

        <article
          className="mt-7 rounded-[18px] border border-plum-300/25 px-5 py-5"
          style={{
            background:
              "linear-gradient(150deg, color-mix(in oklab, var(--blush) 70%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 35%, var(--paper)) 100%)",
          }}
        >
          <p className="font-body text-[14.5px] italic leading-relaxed text-ink">
            A pattern has shown up here more than once: messages timed to
            keep you on the back foot, then a softening, then a pull to
            agree faster than feels right. Polaris is not making a call on
            who they are. Just naming what the thread looks like, so you
            can choose with both eyes open.
          </p>
        </article>

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={() =>
              navigate({ to: "/connections/$id", params: { id } })
            }
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Take a beat before replying
          </button>
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/connections/$id/cool-off",
                params: { id },
              })
            }
            className="w-full rounded-full border border-line bg-paper px-5 py-3 text-center font-display text-[14px] text-ink hover:bg-lavender-50"
          >
            Pause this thread for a day
          </button>
          <button
            type="button"
            onClick={() =>
              navigate({ to: "/connections/$id", params: { id } })
            }
            className="w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
          >
            Continue with care
          </button>
        </div>

        <div className="mt-auto pt-10">
          <Link
            to="/connections/$id/safety-share"
            params={{ id }}
            className="block text-center font-body text-[12.5px] text-plum-700 hover:underline"
          >
            Set up safety share →
          </Link>
        </div>
      </div>
    </PageBackdrop>
  );
}
