import { useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";

export const Route = createFileRoute("/_main/connections/$id_/plan-update")({
  head: () => ({ meta: [{ title: "Send an update — COUPL" }] }),
  component: PlanUpdateScreen,
});

const STATUSES = [
  { id: "late", label: "Running late" },
  { id: "venue", label: "Venue change" },
  { id: "cancel", label: "Cancelling" },
];

function PlanUpdateScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/plan-update" });
  const navigate = useNavigate();
  const [status, setStatus] = useState<string | null>(null);
  const [msg, setMsg] = useState("");

  const submit = () => {
    if (!status || !msg.trim()) return;
    // TODO Phase 4: dispatch to safety contact stream { status, message, planId }
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
          <Link to="/connections/$id" params={{ id }} aria-label="Back" className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-label-mono">Send an update</p>
          <span aria-hidden className="w-8" />
        </header>

        <div className="mt-8">
          <h1 className="font-display text-[28px] leading-tight text-ink">
            What's changed?
          </h1>

          <fieldset className="mt-8">
            <legend className="text-label-mono">Status</legend>
            <ul className="mt-3 space-y-2">
              {STATUSES.map((s) => {
                const active = status === s.id;
                return (
                  <li key={s.id}>
                    <label className={`block cursor-pointer rounded-[14px] border px-4 py-3.5 transition-colors ${
                      active ? "border-plum-500 bg-lavender-100" : "border-line bg-paper hover:bg-lavender-50"
                    }`}>
                      <input type="radio" name="status" checked={active} onChange={() => setStatus(s.id)} className="sr-only" />
                      <p className={`font-display text-[14.5px] ${active ? "text-plum-700 font-semibold" : "text-ink"}`}>
                        {s.label}
                      </p>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          <div className="mt-5">
            <label className="text-label-mono" htmlFor="pu-msg">Message</label>
            <textarea
              id="pu-msg"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              rows={3}
              maxLength={200}
              placeholder="Tube held up, ten minutes behind."
              className="mt-2 w-full resize-none rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[13.5px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
            />
            <p className="mt-1 text-right text-label-mono text-stone">{msg.length} / 200</p>
          </div>

          <p className="mt-5 font-body text-[13px] italic text-stone">
            They'll get this straight away. Your safety contact too, if you've added one.
          </p>
        </div>

        <div className="mt-8">
          <button type="button" onClick={submit} disabled={!status || !msg.trim()} className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40">
            Send update
          </button>
        </div>
      </div>
    </PageBackdrop>
  );
}
