import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_main/connections/$id_/insights")({
  head: () => ({ meta: [{ title: "Conversation insights — COUPL" }] }),
  component: InsightsArchive,
});

type Insight = {
  id: string;
  date: string;
  observation: string;
  sitWith: string;
  smallTry: string;
};

const SAMPLE_INSIGHTS: Insight[] = [
  {
    id: "i1",
    date: "26 April",
    observation:
      "You replied within a minute of every message Maya sent this week. Steady, but it might be running ahead of your own pace.",
    sitWith:
      "Notice the gap between her message landing and you wanting to answer. What's in that gap?",
    smallTry:
      "Wait one breath before replying. Just one. See what surfaces.",
  },
  {
    id: "i2",
    date: "1 May",
    observation:
      "You asked her three questions in a row without offering anything of your own. That's care, but it can read as distance.",
    sitWith: "Is it easier for you to ask than to be asked?",
    smallTry:
      "Next message, share one specific thing about your week before asking anything.",
  },
];

function InsightsArchive() {
  const { id } = useParams({ from: "/_main/connections/$id_/insights" });

  return (
    <div className="min-h-screen bg-paper">
      <header
        className="sticky top-0 z-10 flex items-center gap-3 border-b border-line bg-paper px-4 py-3"
        style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)" }}
      >
        <Link
          to="/connections/$id"
          params={{ id }}
          className="flex size-8 items-center justify-center rounded-full text-slate hover:bg-lavender-100"
          aria-label="Back to conversation"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div>
          <p className="text-label-mono text-stone">CONVERSATION INSIGHTS</p>
          <h1 className="font-display text-xl text-ink">
            What we've noticed together
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-md px-4 py-6">
        {SAMPLE_INSIGHTS.length === 0 ? (
          <p className="text-slate">
            No insights yet. They appear here as the conversation develops.
          </p>
        ) : (
          <ol className="space-y-6">
            {SAMPLE_INSIGHTS.map((ins) => (
              <li
                key={ins.id}
                className="rounded-2xl border border-line bg-paper p-5"
              >
                <p className="text-label-mono text-stone">
                  {ins.date.toUpperCase()}
                </p>

                <div className="mt-4">
                  <p className="text-label-mono text-plum-700">OBSERVATION</p>
                  <p className="mt-1 text-ink">{ins.observation}</p>
                </div>

                <div className="mt-4">
                  <p className="text-label-mono text-plum-700">
                    WHAT TO SIT WITH
                  </p>
                  <p className="mt-1 font-display italic text-ink">
                    {ins.sitWith}
                  </p>
                </div>

                <div className="mt-4 rounded-xl bg-lavender-100 p-4">
                  <p className="text-label-mono text-plum-700">A SMALL TRY</p>
                  <p className="mt-1 text-ink">{ins.smallTry}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </main>
    </div>
  );
}
