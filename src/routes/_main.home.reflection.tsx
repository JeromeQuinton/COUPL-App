import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { ReflectionEditor } from "@/components/home/ReflectionEditor";

export const Route = createFileRoute("/_main/home/reflection")({
  head: () => ({
    meta: [
      { title: "Reflection — COUPL" },
      {
        name: "description",
        content:
          "A private journal prompt. Two minutes is enough.",
      },
    ],
  }),
  component: ReflectionScreen,
});

function ReflectionScreen() {
  const navigate = useNavigate();
  const [text, setText] = useState("");

  const onDone = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate({ to: "/home" });
  };

  return (
    <form onSubmit={onDone} className="px-5 pb-12 pt-6">
      <div className="flex items-center justify-between">
        <Link
          to="/home"
          className="-ml-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-body-md text-ink hover:bg-cloud"
          aria-label="Back to home"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          <span>Home</span>
        </Link>
        <span className="text-label-mono">Private · only you</span>
      </div>

      <header className="mt-6">
        <p className="text-label-mono">Tonight</p>
        <h1 className="mt-2 text-display-xl text-ink">
          A quiet moment with yourself.
        </h1>
      </header>

      <div className="mt-6">
        <ReflectionEditor
          prompt="What did you notice about your own calm today?"
          helper="Saved on this device. Coach never reads this."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <aside className="mt-6 rounded-[16px] bg-lavender-50 p-4">
        <p className="text-label-mono">Coach noticed</p>
        <p className="mt-2 text-body-md text-ink">
          When you wrote about feeling stretched last week, the next day
          you slowed your replies. That's a real signal — keep listening
          to it.
        </p>
      </aside>

      <div className="mt-8 space-y-3">
        <button
          type="submit"
          className="flex h-12 w-full items-center justify-center rounded-[12px] bg-plum-500 px-6 text-body-md font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
        >
          Done for today
        </button>
        <Link
          to="/home"
          className="flex h-12 w-full items-center justify-center rounded-[12px] border border-line bg-paper text-body-md font-medium text-ink transition-colors hover:bg-cloud"
        >
          Write more later
        </Link>
      </div>
    </form>
  );
}