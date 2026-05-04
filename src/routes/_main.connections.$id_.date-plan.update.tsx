import { useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection } from "@/data/connections_sample";

export const Route = createFileRoute(
  "/_main/connections/$id_/date-plan/update",
)({
  head: () => ({
    meta: [{ title: "Add an update — COUPL" }],
  }),
  component: PlanUpdateScreen,
});

function PlanUpdateScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/date-plan/update" });
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "them";

  const [what, setWhat] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newPlace, setNewPlace] = useState("");

  const ready = what.trim().length > 0;

  const submit = () => {
    if (!ready) return;
    navigate({
      to: "/connections/$id/date-plan/update/submitted",
      params: { id },
    });
  };

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
        <header className="flex items-center py-2">
          <Link
            to="/connections/$id/date-plan"
            params={{ id }}
            aria-label="Back to plan"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </header>

        <div className="mt-4">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-700">
            Plan · add an update
          </p>
          <h1 className="mt-3 font-display text-[28px] leading-[1.15] text-ink">
            Tell {name} what changed.
          </h1>
        </div>

        <div className="mt-7 space-y-5">
          <label className="block">
            <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-stone">
              What changed
            </span>
            <textarea
              value={what}
              onChange={(e) => setWhat(e.target.value.slice(0, 200))}
              rows={4}
              placeholder="Plain words. Specific is kinder."
              className="mt-2 w-full rounded-[12px] border border-line bg-paper px-3 py-2.5 font-body text-[14px] text-ink placeholder:text-stone focus:outline-none"
            />
            <p className="mt-1 text-right font-body text-[11px] text-stone">
              {what.length}/200
            </p>
          </label>

          <label className="block">
            <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-stone">
              New time (if different)
            </span>
            <input
              type="text"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              placeholder="e.g. Sat 16 May, 8pm"
              className="mt-2 w-full rounded-[12px] border border-line bg-paper px-3 py-2.5 font-body text-[14px] text-ink placeholder:text-stone focus:outline-none"
            />
          </label>

          <label className="block">
            <span className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-stone">
              New place (if different)
            </span>
            <input
              type="text"
              value={newPlace}
              onChange={(e) => setNewPlace(e.target.value)}
              placeholder="e.g. Lyle's, Shoreditch"
              className="mt-2 w-full rounded-[12px] border border-line bg-paper px-3 py-2.5 font-body text-[14px] text-ink placeholder:text-stone focus:outline-none"
            />
          </label>
        </div>

        <p className="mt-5 font-body text-[12.5px] italic text-stone">
          Specific is kinder than vague.
        </p>

        <div className="mt-auto pt-10">
          <button
            type="button"
            disabled={!ready}
            onClick={submit}
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 disabled:opacity-40 hover:opacity-90"
          >
            Send update
          </button>
        </div>
      </div>
    </PageBackdrop>
  );
}
