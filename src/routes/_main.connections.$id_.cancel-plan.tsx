import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/cancel-plan — cancel a confirmed plan.
 *
 * Optional message field. Two CTAs: tell them, or quietly.
 *
 * Stream-19 SCREEN-25.
 */
export const Route = createFileRoute("/_main/connections/$id_/cancel-plan")({
  head: () => ({ meta: [{ title: "Cancel plan — COUPL" }] }),
  component: CancelPlanScreen,
});

function CancelPlanScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/cancel-plan" });
  const c = getConnection(id);
  const name = c?.name ?? "them";
  const [message, setMessage] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <PageBackdrop>
        <main className="mx-auto max-w-[460px] px-6 pt-16 text-center">
          <p className="text-label-mono">Cancelled</p>
          <h1 className="mt-3 font-display text-[26px] italic leading-tight text-ink">
            Done. We've let {name} know.
          </h1>
          <Link
            to="/connections/$id"
            params={{ id }}
            className="mt-8 inline-flex rounded-full bg-plum-700 px-6 py-3 font-body text-[14px] font-medium text-paper hover:bg-plum-500"
          >
            Back to thread
          </Link>
        </main>
      </PageBackdrop>
    );
  }

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
            to="/connections/$id/date-plan"
            params={{ id }}
            aria-label="Back to plan"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-label-mono">Cancel plan</p>
          <span aria-hidden className="w-8" />
        </header>

        <h1 className="mt-8 font-display text-[26px] leading-tight text-ink">
          Plans shift. <em className="font-display italic">It's okay.</em>
        </h1>
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          You can send {name} a short note, or cancel quietly. Both are
          fine. Neither is a failing.
        </p>

        <label className="mt-8 block">
          <span className="text-label-mono">A short note (optional)</span>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            placeholder="Something honest. Not a full explanation — just enough."
            className="mt-2 w-full rounded-[12px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder:text-stone"
          />
        </label>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => setDone(true)}
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper hover:bg-plum-500"
          >
            Cancel and tell {name}
          </button>
          <button
            type="button"
            onClick={() => setDone(true)}
            className="w-full rounded-full border border-line bg-paper px-5 py-3 font-body text-[14px] text-ink hover:bg-lavender-50"
          >
            Cancel quietly
          </button>
          <Link
            to="/connections/$id/date-plan"
            params={{ id }}
            className="block text-center font-body text-[13px] text-stone hover:text-ink"
          >
            Keep the plan
          </Link>
        </div>
      </div>
    </PageBackdrop>
  );
}
