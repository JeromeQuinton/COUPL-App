import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_main/home/coach")({
  head: () => ({
    meta: [
      { title: "From Remi — COUPL" },
      {
        name: "description",
        content:
          "A short lesson from your coach on how slow attention shapes intimacy.",
      },
    ],
  }),
  component: CoachLessonScreen,
});

function CoachLessonScreen() {
  return (
    <article className="px-5 pb-16 pt-6">
      <Link
        to="/home"
        className="-ml-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-body-md text-ink hover:bg-cloud"
        aria-label="Back to home"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden />
        <span>Home</span>
      </Link>

      <header className="mt-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="flex h-10 w-10 items-center justify-center rounded-full bg-plum-500 text-paper text-body-md font-semibold"
          >
            R
          </span>
          <div>
            <p className="text-label-mono">From Remi, your coach</p>
            <p className="text-body-sm text-slate">4 min read · Lesson 03</p>
          </div>
        </div>
        <h1 className="mt-6 text-display-xxl text-ink">
          Why slow attention is the new intimacy.
        </h1>
      </header>

      <div className="prose mt-8 max-w-none space-y-5 text-body-lg leading-relaxed text-ink">
        <p>
          Most of what we call connection is performance under fluorescent
          lighting. The pace is too quick to notice anything real, so we
          settle for what's photogenic instead.
        </p>
        <p>
          The first quiet act of intimacy is paying attention without
          rushing toward an outcome. Not interrogating. Not solving.
          Witnessing.
        </p>
        <p className="border-l-2 border-plum-500 pl-4 italic text-slate">
          When someone slows down enough to notice you accurately, the
          nervous system reads it as safety. Everything that matters
          becomes possible from there.
        </p>
        <p>
          This week, try one thing: when you read a new message, wait two
          full breaths before replying. Notice what they actually said —
          not what you assumed they meant.
        </p>
        <p>
          That's the practice. It's quieter than you'd expect. It's also
          how trust gets built.
        </p>
      </div>

      <footer className="mt-10">
        <Link
          to="/connections"
          className="flex h-12 w-full items-center justify-center rounded-[12px] bg-plum-500 px-6 text-body-md font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
        >
          Open chat with Remi
        </Link>
        <p className="mt-3 text-center text-body-sm text-slate">
          Coach replies within a day. No rush.
        </p>
      </footer>
    </article>
  );
}