import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { X, AlertCircle } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";

export const Route = createFileRoute("/_main/connections/$id_/red-flag")({
  head: () => ({
    meta: [{ title: "A quiet check — COUPL" }],
  }),
  component: RedFlagScreen,
});

function RedFlagScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/red-flag" });
  const navigate = useNavigate();

  return (
    <PageBackdrop tone="deep">
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
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-plum-700" aria-hidden />
            <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-700">
              Caution · pattern noticed
            </p>
          </div>
          <h1 className="mt-3 font-display text-[26px] leading-[1.15] text-ink">
            Your nervous system may already know.
          </h1>
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">
            Inconsistency, pressure, or boundary-testing has shown up more
            than once in this thread.
          </p>

          <div className="mt-8 space-y-6">
            <section>
              <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
                What we noticed
              </p>
              <p className="mt-2 font-body text-[14.5px] leading-relaxed text-ink">
                Three messages in two minutes after a longer silence on
                their end. Then a hedging line. Then a push to meet sooner
                than agreed.
              </p>
            </section>
            <section>
              <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
                Worth noticing
              </p>
              <p className="mt-2 font-body text-[14.5px] leading-relaxed text-ink">
                Certain dynamics feel intense precisely because they're
                dysregulating. You don't owe speed to uncertainty.
              </p>
            </section>
          </div>

          <p className="mt-8 font-body text-[13px] italic text-stone">
            Your call. We'll never close a thread for you.
          </p>
        </div>

        <div className="mt-auto space-y-3 pt-10">
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/connections/$id/cool-off",
                params: { id },
              })
            }
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Slow this down
          </button>
          <button
            type="button"
            onClick={() =>
              navigate({ to: "/connections/$id", params: { id } })
            }
            className="w-full rounded-full border border-line bg-paper px-5 py-3 text-center font-display text-[13.5px] text-ink hover:bg-lavender-50"
          >
            Continue thread
          </button>
        </div>
      </div>
    </PageBackdrop>
  );
}