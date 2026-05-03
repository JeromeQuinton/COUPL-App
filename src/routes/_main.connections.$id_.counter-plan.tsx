import { useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";

export const Route = createFileRoute("/_main/connections/$id_/counter-plan")({
  head: () => ({ meta: [{ title: "Counter-propose — COUPL" }] }),
  component: CounterPlanScreen,
  validateSearch: (search: Record<string, unknown>): { inviteId?: string } => ({
    inviteId: typeof search.inviteId === "string" ? search.inviteId : undefined,
  }),
});

function CounterPlanScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/counter-plan" });
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [where, setWhere] = useState("");
  const [notes, setNotes] = useState("");

  const submit = () => {
    if (!date || !time || !where.trim()) return;
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
          <p className="text-label-mono">Counter-propose</p>
          <span aria-hidden className="w-8" />
        </header>

        <div className="mt-8">
          <h1 className="font-display text-[28px] leading-tight text-ink">
            What would work better?
          </h1>
          <p className="mt-3 font-display text-[13.5px] italic text-stone">
            Change as much or as little as you like.
          </p>

          <form className="mt-8 space-y-5" onSubmit={(e) => { e.preventDefault(); submit(); }}>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-label-mono" htmlFor="cp-date">When · date</label>
                <input id="cp-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-display text-[14px] text-ink focus:border-plum-500 focus:outline-none" />
              </div>
              <div>
                <label className="text-label-mono" htmlFor="cp-time">Time</label>
                <input id="cp-time" type="time" value={time} onChange={(e) => setTime(e.target.value)} className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-display text-[14px] text-ink focus:border-plum-500 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="text-label-mono" htmlFor="cp-where">Where</label>
              <input id="cp-where" value={where} onChange={(e) => setWhere(e.target.value)} placeholder="A different venue" className="mt-2 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none" />
            </div>
            <div>
              <label className="text-label-mono" htmlFor="cp-notes">Notes</label>
              <textarea id="cp-notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} maxLength={140} className="mt-2 w-full resize-none rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[13.5px] text-ink focus:border-plum-500 focus:outline-none" />
            </div>
          </form>
        </div>

        <div className="mt-8 space-y-3">
          <button type="button" onClick={submit} disabled={!date || !time || !where.trim()} className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
            Send counter-proposal
          </button>
        </div>
      </div>
    </PageBackdrop>
  );
}
