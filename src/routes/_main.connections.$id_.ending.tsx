import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { EndingTemplateCard } from "@/components/connections/EndingTemplateCard";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { ENDING_TEMPLATES, getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/ending — Clean Ending flow.
 *
 * Pre-written, psychologically sound closure templates. Recipient gets
 * 24h to read/respond before the thread closes naturally. Goal:
 * normalize emotionally mature endings, reduce ghosting (DR-034 spirit).
 */
export const Route = createFileRoute("/_main/connections/$id_/ending")({
  head: () => ({
    meta: [
      { title: "Ending well — COUPL" },
      {
        name: "description",
        content:
          "A short, gentle closure note. A clean ending is a kindness.",
      },
    ],
  }),
  component: EndingFlowScreen,
});

function EndingFlowScreen() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "them";
  const [selected, setSelected] = useState<string>(ENDING_TEMPLATES[0].id);

  return (
    <PageBackdrop>
      <div
        className="mx-auto w-full max-w-[460px] px-5"
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 1rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
        }}
      >
        <div className="flex items-center gap-2">
          <Link
            to="/connections/$id"
            params={{ id }}
            aria-label={`Back to ${name}`}
            className="-ml-1 inline-flex items-center gap-1 rounded-md px-1.5 py-1 text-[13.5px] text-ink hover:bg-paper/60"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Conversation with {name}</span>
          </Link>
        </div>

        <header className="mt-5">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Ending well
          </p>
          <h1 className="mt-2 font-display text-[26px] leading-tight text-ink">
            A clean ending is a kindness.
          </h1>
          <p className="mt-2 text-[13.5px] leading-relaxed text-slate">
            Pick the truest reason. We send a short, gentle note to {name} —
            never your exact words.
          </p>
        </header>

        <section className="mt-5 space-y-2.5" aria-label="Closure templates">
          {ENDING_TEMPLATES.map((t) => (
            <EndingTemplateCard
              key={t.id}
              title={t.title}
              template={t.template}
              selected={selected === t.id}
              onSelect={() => setSelected(t.id)}
            />
          ))}
        </section>

        <p className="mt-5 px-1 text-[12.5px] leading-relaxed text-slate">
          You'll both have 24 hours to read and respond once. Then the thread
          closes.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => navigate({ to: "/connections/$id", params: { id } })}
            className="rounded-full border border-plum-300/45 bg-paper/85 px-5 py-3 font-display text-[14.5px] font-medium text-plum-700 transition-colors hover:bg-paper"
          >
            Not yet
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/connections" })}
            className="rounded-full bg-plum-500 px-5 py-3 font-display text-[14.5px] font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
          >
            Send the note
          </button>
        </div>
      </div>
    </PageBackdrop>
  );
}