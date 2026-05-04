import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Check, Calendar } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { PolarisHeader } from "@/components/shell/PolarisHeader";
import { getConnection } from "@/data/connections_sample";

export const Route = createFileRoute(
  "/_main/connections/$id_/date-plan/reservation/success",
)({
  head: () => ({ meta: [{ title: "You're booked — COUPL" }] }),
  component: ReservationSuccessScreen,
});

const SAMPLE = {
  venue: "Sessions Arts Club",
  address: "Clerkenwell, London",
  date: "Saturday 15 May",
  time: "7.30pm",
  party: 2,
};

function ReservationSuccessScreen() {
  const { id } = useParams({
    from: "/_main/connections/$id_/date-plan/reservation/success",
  });
  const c = getConnection(id);
  const otherName = c?.name ?? "your match";

  return (
    <PageBackdrop>
      <div
        className="mx-auto flex w-full max-w-[480px] flex-col px-6"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 3rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
        }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender-100 text-plum-700">
          <Check className="h-6 w-6" />
        </div>

        <div className="mt-6">
          <PolarisHeader
            eyebrow="Plan · reservation confirmed"
            title="You're booked."
            eyebrowTone="plum-700"
          />
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
          <p className="mt-1 font-body text-[13.5px] text-slate">
            {SAMPLE.address}
          </p>
          <p className="mt-3 font-body text-[14px] text-ink">
            {SAMPLE.date} · {SAMPLE.time} · party of {SAMPLE.party}
          </p>
          <p className="mt-3 font-body text-[12.5px] italic text-stone">
            Both of you have been notified.
          </p>
        </article>

        <Link
          to="/connections/$id/add-to-calendar"
          params={{ id }}
          className="mt-5 flex w-full items-center justify-between rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1 hover:bg-lavender-50"
        >
          <span className="font-display text-[14px] text-ink">Add to calendar</span>
          <Calendar className="h-4 w-4 text-plum-500" aria-hidden />
        </Link>

        <div className="mt-auto space-y-3 pt-10">
          <Link
            to="/connections/$id/date-plan"
            params={{ id }}
            className="block w-full rounded-full bg-plum-700 px-5 py-3.5 text-center font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Back to plan
          </Link>
          <Link
            to="/connections/$id"
            params={{ id }}
            className="block w-full rounded-full border border-line bg-paper px-5 py-3 text-center font-display text-[13.5px] text-ink hover:bg-lavender-50"
          >
            Open chat with {otherName}
          </Link>
        </div>
      </div>
    </PageBackdrop>
  );
}
