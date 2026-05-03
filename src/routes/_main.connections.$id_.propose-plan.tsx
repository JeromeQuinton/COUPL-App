import { useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";

export const Route = createFileRoute("/_main/connections/$id_/propose-plan")({
  head: () => ({ meta: [{ title: "Propose a plan — COUPL" }] }),
  component: ProposePlanScreen,
});

function ProposePlanScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/propose-plan" });
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [where, setWhere] = useState("");
  const [notes, setNotes] = useState("");

  const submit = () => {
    if (!date || !time || !where.trim()) return;
    // Phase 1 stub: in a real build this would push a plan_invite into the
    // thread state. For now route back to the thread.
    navigate({ to: "/connections/$id", params: { id } });
  };

  return (
    <PageBackdrop>
      <div
        className="mx-auto w-full max-w-[460px] px-5"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
        }}
      >
        <header className="flex items-center justify-between">
          <Link
            to="/connections/$id"
            params={{ id }}
            aria-label="Back"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-label-mono">Propose a plan</p>
          <span aria-hidden className="w-8" />
        </header>

        <div className="mt-8">
          <h1 className="font-display text-[28px] leading-tight text-ink">
            When and where works for you?
          </h1>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-label-mono" htmlFor="pp-date">When · date</label>
                <input
                  id="pp-date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-display text-[14px] text-ink focus:border-plum-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-label-mono" htmlFor="pp-time">Time</label>
                <input
                  id="pp-time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-display text-[14px] text-ink focus:border-plum-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-label-mono" htmlFor="pp-where">Where</label>
              <input
                id="pp-where"
                value={where}
                onChange={(e) => setWhere(e.target.value)}
                placeholder="Sessions Arts Club, Clerkenwell"
                className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
              />
              <Link
                to="/date-plans"
                className="mt-2 inline-block text-label-mono text-plum-500 hover:text-plum-700"
              >
                Browse date plans →
              </Link>
            </div>

            <div>
              <label className="text-label-mono" htmlFor="pp-notes">Notes (optional)</label>
              <textarea
                id="pp-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                maxLength={140}
                placeholder="Drinks first, dinner if it feels right."
                className="mt-2 w-full resize-none rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[13.5px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
              />
              <p className="mt-1 text-right text-label-mono text-stone">{notes.length} / 140</p>
            </div>

            <p className="font-display text-[13px] italic text-stone">
              Easy to say yes or no — or to suggest something else.
            </p>
          </form>
        </div>

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={submit}
            disabled={!date || !time || !where.trim()}
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send invite
          </button>
          <Link
            to="/connections/$id"
            params={{ id }}
            className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
          >
            Cancel
          </Link>
        </div>
      </div>
    </PageBackdrop>
  );
}
