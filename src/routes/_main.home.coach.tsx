import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_main/home/coach")({
  head: () => ({
    meta: [
      { title: "From Signal — COUPL" },
      {
        name: "description",
        content:
          "A short lesson from your coach on opening conversations with a noticing.",
      },
    ],
  }),
  component: CoachLessonScreen,
});

function CoachLessonScreen() {
  return (
    <article className="px-5 pb-16 pt-4">
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
            className="flex h-10 w-10 items-center justify-center rounded-full bg-beeswax-300 text-ink text-body-md font-semibold"
          >
            R
          </span>
          <div>
            <p className="text-label-mono">From Signal · Your coach</p>
            <p className="text-body-sm text-slate">Tuesday, 9:14am · 2 min</p>
          </div>
        </div>
        <h1 className="mt-6 text-display-xl text-ink">
          Open with a noticing,<br />not a question.
        </h1>
      </header>

      <div className="mt-6 space-y-5 text-body-lg leading-relaxed text-ink">
        <p>
          Last week you opened three conversations with questions. They're
          good questions. But they ask the other person to do work before
          they know what you bring.
        </p>
        <p>
          A <em>noticing</em> is different. It says: <em>I read what you
          wrote and this specific thing landed.</em> It offers something
          before it asks anything.
        </p>
        <blockquote className="rounded-[16px] border-l-2 border-ink bg-paper px-4 py-3 font-display italic text-ink">
          "The yellow paper detail is the part that got me. There's a used
          bookshop on Atlantic that smells exactly like that."
        </blockquote>
        <p>
          That's a noticing. It mirrors back something specific, then
          offers a piece of you. The question can come second.
        </p>
      </div>

      <aside className="mt-8 rounded-[16px] bg-beeswax-100 p-5">
        <p className="text-label-mono">Try this today</p>
        <p className="mt-2 text-body-md text-ink">
          Open Asha's profile. Find one specific detail. Write what landed
          in one sentence — no question yet.
        </p>
        <Link
          to="/discover"
          className="mt-4 flex h-11 w-full items-center justify-center rounded-[10px] bg-ink px-6 text-body-md font-medium text-paper transition-colors hover:bg-plum-700"
        >
          Open Asha's profile
        </Link>
      </aside>
    </article>
  );
}