import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { X } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection } from "@/data/connections_sample";

export const Route = createFileRoute("/_main/connections/$id_/green-flag")({
  head: () => ({
    meta: [{ title: "Something steady — COUPL" }],
  }),
  component: GreenFlagScreen,
});

function GreenFlagScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/green-flag" });
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "them";

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
            Green flag · noticed
          </p>
          <h1 className="mt-3 font-display text-[26px] leading-[1.15] text-ink">
            {name} just named a boundary.
          </h1>
          <p className="mt-4 rounded-[16px] border border-plum-300/25 bg-paper/70 px-4 py-3 font-display text-[15px] italic leading-relaxed text-plum-700">
            "I'm slow at evenings — Tuesdays and Thursdays I'll go quiet."
          </p>

          <section className="mt-8">
            <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
              Why this counts
            </p>
            <p className="mt-2 font-body text-[14.5px] leading-relaxed text-ink">
              People who name their pace early are easier to be with. Honour
              it; they'll do the same for yours.
            </p>
          </section>

          <p className="mt-8 font-body text-[13px] italic text-stone">
            Peace can feel quieter than chaos. Notice it.
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
            Got it
          </button>
        </div>
      </div>
    </PageBackdrop>
  );
}