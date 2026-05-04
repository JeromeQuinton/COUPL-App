import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { GrowthBackdrop } from "@/components/growth/GrowthBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ARTICLES } from "./_main.growth.library";

/**
 * /growth/library/$articleId — article reader.
 *
 * Phase 1 ships seeded long-form for one canonical entry; the rest
 * fall back to a graceful placeholder. Phase 4 pulls body from CMS.
 */
export const Route = createFileRoute("/_main/growth/library/$articleId")({
  head: () => ({
    meta: [{ title: "Reading — COUPL Growth" }],
  }),
  component: ArticleReader,
});

const BODIES: Record<string, string[]> = {
  "the-comfort-of-pace": [
    "Most of us have been taught to read pace as interest. Quick replies mean keenness; slow replies mean drift. It's a tidy story, and it's wrong often enough to be worth questioning.",
    "Pace is a temperament before it's a signal. Some of us reply quickly because we're anxious to keep the line warm. Others reply slowly because they want to give your message its due — to read it twice, to think.",
    "When two people are reading each other's pace as a verdict, things get strange. The slow one feels rushed; the quick one feels held off. Neither is being unkind.",
    "What helps: telling each other how you tend to write. Not as a defence, but as a small offering. 'I take a while in the day. Doesn't mean I'm not here.' That one sentence does a lot of work.",
    "The deeper move is to stop treating speed as evidence at all. Watch the substance instead — what's in the message, not when it arrived. Most of what you need to know is in the words.",
  ],
  "noticing-not-fixing": [
    "A short practice. Read it once. Try it tomorrow. You don't need to remember it perfectly.",
    "When something difficult comes up in a conversation — your own discomfort, theirs, a mismatch you can't yet name — pause. Three breaths. Don't reach for the repair.",
    "Notice what's there. The tightness in your chest. The wish for the conversation to go a different way. The story you're already telling about what they meant.",
    "Now do nothing. The discomfort doesn't have to mean a problem. It often means you've touched something real.",
    "If a response is needed, it will arrive. If it doesn't, you've still done something — you've sat with the thing without trying to make it tidy.",
  ],
};

function ArticleReader() {
  const { articleId } = useParams({
    from: "/_main/growth/library/$articleId",
  });
  const article = ARTICLES.find((a) => a.id === articleId);
  const body = BODIES[articleId];

  if (!article) {
    return (
      <GrowthBackdrop>
        <StatusBar
          leading={
            <Link
              to="/growth/library"
              aria-label="Back to Library"
              className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
            >
              <ChevronLeft size={18} />
            </Link>
          }
        />
        <div className="mx-auto flex w-full max-w-[480px] flex-col px-5 pt-10">
          <p className="text-label-mono">Not found</p>
          <h1 className="mt-3 font-display text-[24px] leading-tight text-ink">
            We've moved this one.
          </h1>
          <p className="mt-3 font-body text-[14px] text-slate">
            Browse the rest of the library.
          </p>
          <Link
            to="/growth/library"
            className="mt-6 inline-flex w-fit rounded-full bg-plum-500 px-5 py-2.5 font-body text-[14px] font-medium text-paper"
          >
            Back to Library
          </Link>
        </div>
      </GrowthBackdrop>
    );
  }

  return (
    <GrowthBackdrop>
      <StatusBar
        leading={
          <Link
            to="/growth/library"
            aria-label="Back to Library"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <article className="mx-auto w-full max-w-[480px] px-5 pt-2 pb-16">
        <p className="text-label-mono text-plum-700">
          {article.kind === "essay"
            ? "Essay"
            : article.kind === "practice"
            ? "Practice"
            : "Research"}
          {" · "}
          {article.readTime} min read
        </p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          {article.title}
        </h1>
        <p className="mt-3 font-body italic text-[14.5px] leading-relaxed text-slate">
          {article.excerpt}
        </p>

        <div className="mt-7 flex flex-col gap-4">
          {body ? (
            body.map((p, i) => (
              <p
                key={i}
                className="font-body text-[15.5px] leading-[1.7] text-ink"
              >
                {p}
              </p>
            ))
          ) : (
            <>
              <p className="font-body text-[15.5px] leading-[1.7] text-ink">
                The full text of this piece is being edited. It will land in
                the next reading drop.
              </p>
              <p className="font-body text-[15.5px] leading-[1.7] text-ink">
                In the meantime, the excerpt above carries the gist. We'd
                rather wait until it's right than ship it half-edited.
              </p>
            </>
          )}
        </div>

        <div className="mt-10 border-t border-line pt-5">
          <p className="text-label-mono text-stone">Next</p>
          <Link
            to="/growth/library"
            className="mt-2 inline-flex items-center gap-1 font-body text-[14px] font-medium text-plum-700 hover:underline"
          >
            More from the library →
          </Link>
        </div>
      </article>
    </GrowthBackdrop>
  );
}
