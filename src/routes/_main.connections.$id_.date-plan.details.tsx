import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, MapPin, Clock, Shield } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection } from "@/data/connections_sample";

export const Route = createFileRoute("/_main/connections/$id_/date-plan/details")({
  head: () => ({ meta: [{ title: "The plan — COUPL" }] }),
  component: PlanDetailsScreen,
});

const SAMPLE = {
  venue: "Sessions Arts Club",
  address: "24 Clerkenwell Close, London EC1R 0AG",
  date: "Saturday 15 May",
  time: "7.30pm",
  status: "booked" as "booked" | "pending" | "self-organised",
  safetyShareEnabled: true,
};

const STATUS_COPY: Record<typeof SAMPLE.status, { label: string; tone: string }> = {
  booked: { label: "Booked", tone: "bg-lavender-100 text-plum-700" },
  pending: { label: "Pending", tone: "bg-beeswax-100 text-caution" },
  "self-organised": { label: "Self-organised", tone: "bg-paper text-slate" },
};

function PlanDetailsScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/date-plan/details" });
  const c = getConnection(id);
  const otherName = c?.name ?? "your match";
  const status = STATUS_COPY[SAMPLE.status];

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
        <header className="flex items-center justify-between py-2">
          <Link
            to="/connections/$id"
            params={{ id }}
            aria-label="Back to chat"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-plum-700">
            Plan · details
          </p>
          <span aria-hidden className="w-8" />
        </header>

        <div className="mt-4">
          <h1 className="font-display text-[28px] leading-[1.15] text-ink">
            The plan.
          </h1>
        </div>

        <article
          className="mt-6 rounded-[18px] border border-plum-300/25 px-5 py-5"
          style={{
            background:
              "linear-gradient(150deg, color-mix(in oklab, var(--blush) 70%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 35%, var(--paper)) 100%)",
          }}
        >
          <p className="font-display text-[20px] leading-snug text-ink">
            {SAMPLE.venue}
          </p>
          <p className="mt-1 flex items-center gap-1.5 font-body text-[13px] text-slate">
            <MapPin size={13} className="text-plum-500" aria-hidden />
            {SAMPLE.address}
          </p>
          <p className="mt-2 flex items-center gap-1.5 font-body text-[13.5px] text-ink">
            <Clock size={13} className="text-plum-500" aria-hidden />
            {SAMPLE.date} · {SAMPLE.time}
          </p>
          <p className="mt-3 font-body text-[12.5px] text-stone">
            With {otherName}
          </p>
        </article>

        <div className="mt-4 flex items-center gap-2">
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 font-body text-[12px] font-medium ${status.tone}`}
          >
            {status.label}
          </span>
        </div>

        <div className="mt-6">
          {SAMPLE.safetyShareEnabled ? (
            <p className="flex items-start gap-2 rounded-[12px] bg-lavender-50 px-4 py-3 font-body text-[12.5px] italic leading-snug text-plum-700">
              <Shield size={14} className="mt-0.5 shrink-0" aria-hidden />
              <span>Safety share is on — your trusted contact will be pinged at start.</span>
            </p>
          ) : (
            <Link
              to="/connections/$id/safety-share"
              params={{ id }}
              className="inline-flex items-center gap-1 font-body text-[13px] text-plum-700 hover:underline"
            >
              Set up safety share →
            </Link>
          )}
        </div>

        <div className="mt-auto space-y-3 pt-10">
          <Link
            to="/connections/$id/date-plan/update"
            params={{ id }}
            className="block w-full rounded-full bg-plum-700 px-5 py-3.5 text-center font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Update plan
          </Link>
          <Link
            to="/connections/$id_/cancel-plan"
            params={{ id }}
            className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-danger"
          >
            Cancel plan
          </Link>
        </div>
      </div>
    </PageBackdrop>
  );
}
