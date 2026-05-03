import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getArticle, getRelated } from "@/data/help_articles_sample";

export const Route = createFileRoute("/_main/profile/help/$topicId")({
  head: () => ({ meta: [{ title: "Help article — COUPL" }] }),
  component: HelpArticleScreen,
});

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function HelpArticleScreen() {
  const { topicId } = useParams({ from: "/_main/profile/help/$topicId" });
  const article = getArticle(topicId);

  if (!article) {
    return (
      <div className="px-5 pt-8 pb-12">
        <p className="font-display text-[16px] italic text-slate">
          We couldn't find that article.
        </p>
        <Link
          to="/profile/help"
          className="mt-4 inline-flex font-body text-[13px] text-plum-700 hover:underline"
        >
          ← Back to Help
        </Link>
      </div>
    );
  }

  const related = getRelated(article.relatedIds);

  return <HelpArticleBody article={article} related={related} />;
}

function HelpArticleBody({
  article,
  related,
}: {
  article: ReturnType<typeof getArticle> & {};
  related: ReturnType<typeof getRelated>;
}) {
  const [helpful, setHelpful] = useState<null | "yes" | "no">(null);

  return (
    <div className="relative px-5 pb-16 pt-6">
      <header className="flex items-center gap-3">
        <Link
          to="/profile/help"
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="text-label-mono">Help</p>
      </header>

      <h1 className="mt-3 font-display text-[26px] leading-tight text-ink">
        {article!.title}
      </h1>
      <p className="mt-1 font-body text-[11.5px] text-stone">
        Last updated {fmtDate(article!.lastUpdated)}
      </p>

      <article className="mt-6 flex flex-col gap-4">
        {article!.body.split("\n\n").map((para, i) => (
          <p
            key={i}
            className="font-body text-[14px] leading-relaxed text-ink"
          >
            {para}
          </p>
        ))}
      </article>

      {related.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
            Related
          </h2>
          <ul className="mt-3 flex flex-col gap-2">
            {related.map((r) => (
              <li key={r.id}>
                <Link
                  to="/profile/help/$topicId"
                  params={{ topicId: r.id }}
                  className="flex items-start gap-3 rounded-[14px] bg-paper p-3.5 shadow-elev-1 transition-colors hover:bg-lavender-50"
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[14px] font-medium text-ink">
                      {r.title}
                    </p>
                    <p className="mt-0.5 truncate font-body text-[12.5px] text-slate">
                      {r.body.split("\n\n")[0]}
                    </p>
                  </div>
                  <ChevronRight
                    className="mt-1 h-4 w-4 flex-shrink-0 text-stone"
                    strokeWidth={1.75}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-10 rounded-[14px] bg-paper p-4 shadow-elev-1">
        {helpful ? (
          <p className="font-body text-[13px] italic text-slate">
            Thanks — noted.
          </p>
        ) : (
          <div className="flex items-center justify-between gap-3">
            <p className="font-body text-[13px] text-ink">Was this helpful?</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setHelpful("yes")}
                className="rounded-full border border-line bg-paper px-3 py-1.5 font-body text-[12.5px] text-slate hover:bg-lavender-50"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setHelpful("no")}
                className="rounded-full border border-line bg-paper px-3 py-1.5 font-body text-[12.5px] text-slate hover:bg-lavender-50"
              >
                No
              </button>
            </div>
          </div>
        )}
      </section>

      <div className="mt-6 text-center">
        <Link
          to="/profile/help"
          className="inline-flex font-body text-[13px] text-plum-700 hover:underline"
        >
          Still stuck? Ask a question →
        </Link>
      </div>
    </div>
  );
}
