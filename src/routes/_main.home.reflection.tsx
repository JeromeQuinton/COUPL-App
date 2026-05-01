import { useState, useMemo, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { X } from "lucide-react";

export const Route = createFileRoute("/_main/home/reflection")({
  head: () => ({
    meta: [
      { title: "Reflection — COUPL" },
      {
        name: "description",
        content: "A private journal prompt. Two minutes is enough.",
      },
    ],
  }),
  component: ReflectionScreen,
});

const SEED_TEXT = `She offered me her 14-year-old self. The one who went looking for a book her mom told her about. That's not a story about books — it's a story about wanting to know her mom better. And she gave it to me before I'd earned it.

What I want to do tomorrow: say back to her that I noticed she gave me something fragile. And then offer something fragile of my own. Not the polished version.`;

function ReflectionScreen() {
  const navigate = useNavigate();
  const [text, setText] = useState(SEED_TEXT);

  const wordCount = useMemo(
    () => text.trim().split(/\s+/).filter(Boolean).length,
    [text],
  );
  const minutes = Math.max(1, Math.round(wordCount / 80));

  const onDone = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({ to: "/home" });
  };

  return (
    <form onSubmit={onDone} className="px-5 pb-12 pt-4">
      <div className="flex items-center justify-between">
        <Link
          to="/home"
          aria-label="Close"
          className="-ml-2 inline-flex h-9 w-9 items-center justify-center rounded-md text-ink hover:bg-cloud"
        >
          <X className="h-5 w-5" aria-hidden />
        </Link>
        <span className="text-label-mono">Reflection · Private</span>
        <span className="text-body-sm text-slate">· Saving</span>
      </div>

      <header className="mt-4">
        <p className="text-body-sm text-slate">Tuesday · Day 2 with Asha</p>
        <h1 className="mt-2 text-display-xl text-ink">
          What did Asha actually offer when she shared the bookstore story?
        </h1>
      </header>

      <div className="mt-5 rounded-[16px] border border-ink bg-paper p-4">
        <textarea
          aria-label="Your reflection"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          className="w-full resize-none bg-transparent font-display italic text-body-lg leading-relaxed text-ink outline-none placeholder:text-stone"
          placeholder="Start writing — there's no wrong answer here."
        />
        <div className="mt-3 flex items-center justify-between text-body-sm text-slate">
          <span>{wordCount} words · {minutes} min</span>
          <span>Auto-saves locally · never shown</span>
        </div>
      </div>

      <aside className="mt-5 rounded-[16px] bg-beeswax-100 p-4">
        <p className="text-body-md text-ink">
          <span className="font-medium">Reni:</span> "Before I'd earned it"
          — that's worth sitting with. What does it mean to earn someone's
          offering?
        </p>
      </aside>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link
          to="/home"
          className="flex h-12 items-center justify-center rounded-[12px] border border-ink bg-paper text-body-md font-medium text-ink transition-colors hover:bg-cloud"
        >
          Write more later
        </Link>
        <button
          type="submit"
          className="flex h-12 items-center justify-center rounded-[12px] bg-ink px-6 text-body-md font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
        >
          Done for today
        </button>
      </div>
    </form>
  );
}