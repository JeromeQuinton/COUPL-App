import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import {
  CATEGORY_LABEL,
  getCityDatePlan,
} from "@/data/cityDatePlans";

export const Route = createFileRoute("/_main/date-plans/$id")({
  head: ({ params }) => ({
    meta: [{ title: `${params.id} — COUPL` }],
  }),
  component: DatePlanDetail,
  loader: ({ params }) => {
    if (!getCityDatePlan(params.id)) throw notFound();
    return null;
  },
});

function DatePlanDetail() {
  const { id } = useParams({ from: "/_main/date-plans/$id" });
  const plan = getCityDatePlan(id)!;

  return (
    <div
      className="min-h-[100dvh] px-5 bg-paper"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)", paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
    >
      <div className="mx-auto max-w-[560px]">
        <Link
          to="/date-plans"
          aria-label="Back to date plans"
          className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft size={18} />
        </Link>

        <p className="mt-4 text-label-mono">{CATEGORY_LABEL[plan.category].toUpperCase()}</p>
        <h1 className="mt-3 font-display text-[28px] leading-tight text-ink">
          {plan.title}
        </h1>
        <p className="mt-2 font-body text-[13.5px] text-slate">
          {plan.venue} · {plan.area} · {plan.durationMin} min
        </p>

        <p className="mt-6 font-body text-[15px] leading-relaxed text-ink">
          {plan.whyItWorks}
        </p>

        {plan.notes && (
          <article className="mt-5 rounded-[14px] bg-lavender-100 px-4 py-3.5">
            <p className="text-label-mono text-plum-700">A note</p>
            <p className="mt-1 font-body text-[13px] text-ink">{plan.notes}</p>
          </article>
        )}

        <div className="mt-12">
          <button
            type="button"
            // TODO: read connectionId from search params and route to propose-plan
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Use this for a plan
          </button>
          <p className="mt-3 text-center font-body text-[12px] italic text-stone">
            Pick a connection on the next step.
          </p>
        </div>
      </div>
    </div>
  );
}
