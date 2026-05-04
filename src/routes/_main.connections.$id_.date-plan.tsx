import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, MapPin, Clock, Shield, AlertCircle } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import { getConnection } from "@/data/connections_sample";

export const Route = createFileRoute("/_main/connections/$id_/date-plan")({
  head: () => ({
    meta: [
      { title: "Date plan — COUPL" },
      {
        name: "description",
        content: "When you're meeting in person. Held lightly, with a quiet safety net.",
      },
    ],
  }),
  component: DatePlanScreen,
});

const SAMPLE_PLAN = {
  status: "proposed" as "proposed" | "accepted" | "completed" | "cancelled",
  date: "Saturday 15 May",
  time: "7.30pm",
  place: "Sessions Arts Club, Clerkenwell",
  proposedBy: "you",
  notes: "Drinks first. Dinner if it feels right.",
};

function DatePlanScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/date-plan" });
  const c = getConnection(id);
  const name = c?.name ?? "them";

  const [safetyCheckin, setSafetyCheckin] = useState(true);
  const [shareLocation, setShareLocation] = useState(false);

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
            aria-label="Back to thread"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-label-mono">Date plan</p>
          <span aria-hidden className="w-8" />
        </header>

        <div className="mt-8">
          <ScreenHeader
            eyebrow={`Proposed · awaiting ${name}`}
            title="Held lightly. Easy to say yes or no."
          />

          <article
            className="mt-6 rounded-[18px] border border-plum-300/25 px-5 py-5"
            style={{
              background:
                "linear-gradient(150deg, color-mix(in oklab, var(--blush) 70%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 35%, var(--paper)) 100%)",
            }}
          >
            <p className="text-label-mono">Plan</p>
            <p className="mt-2 font-display text-[20px] leading-snug text-ink">
              {SAMPLE_PLAN.date} · {SAMPLE_PLAN.time}
            </p>
            <p className="mt-1 flex items-center gap-1.5 font-body text-[13.5px] text-slate">
              <MapPin size={13} className="text-plum-500" aria-hidden />
              {SAMPLE_PLAN.place}
            </p>
            {SAMPLE_PLAN.notes && (
              <p className="mt-3 font-body text-[13px] italic text-ink/80">
                "{SAMPLE_PLAN.notes}"
              </p>
            )}
          </article>

          <section className="mt-6">
            <p className="text-label-mono">Quiet safety net</p>
            <p className="mt-2 font-body text-[12.5px] italic text-stone">
              You decide what's on. Nothing is shared with {name}.
            </p>

            <ul className="mt-3 space-y-2.5">
              <li>
                <label className="flex cursor-pointer items-start gap-3 rounded-[14px] border border-line bg-paper px-4 py-3.5 hover:bg-lavender-50">
                  <input
                    type="checkbox"
                    checked={safetyCheckin}
                    onChange={(e) => setSafetyCheckin(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-plum-500"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-plum-500" aria-hidden />
                      <p className="font-display text-[14.5px] font-medium text-ink">
                        Send me a check-in 30 min in
                      </p>
                    </div>
                    <p className="mt-1 font-body text-[12.5px] text-slate">
                      One tap to mark "all good". No reply means we ask again.
                    </p>
                  </div>
                </label>
              </li>
              <li>
                <label className="flex cursor-pointer items-start gap-3 rounded-[14px] border border-line bg-paper px-4 py-3.5 hover:bg-lavender-50">
                  <input
                    type="checkbox"
                    checked={shareLocation}
                    onChange={(e) => setShareLocation(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-plum-500"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Shield size={14} className="text-plum-500" aria-hidden />
                      <p className="font-display text-[14.5px] font-medium text-ink">
                        Share live location with a trusted contact
                      </p>
                    </div>
                    <p className="mt-1 font-body text-[12.5px] text-slate">
                      Only for the night. Auto-stops at midnight.
                    </p>
                  </div>
                </label>
              </li>
            </ul>
          </section>

          <p className="mt-5 flex items-start gap-2 rounded-[12px] bg-beeswax-100 px-4 py-3 font-body text-[12.5px] leading-snug text-plum-700">
            <AlertCircle size={14} className="mt-0.5 shrink-0" aria-hidden />
            <span>
              Meeting somewhere public is the simplest safety. Trust your nervous system; it usually knows first.
            </span>
          </p>

          <Link
            to="/connections/$id/before-meeting"
            params={{ id }}
            className="mt-4 inline-flex items-center gap-1 font-body text-[13px] font-medium text-plum-700 hover:underline"
          >
            Read a short note before you go →
          </Link>
        </div>

        <div className="mt-8 space-y-3">
          <button
            type="button"
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Save plan
          </button>
          <button
            type="button"
            className="w-full rounded-full border border-line bg-paper px-5 py-3 text-center font-display text-[13.5px] text-ink hover:bg-lavender-50"
          >
            Reschedule
          </button>
          <Link
            to="/connections/$id/date-plan/update"
            params={{ id }}
            className="block w-full rounded-full border border-line bg-paper px-5 py-3 text-center font-display text-[13.5px] text-ink hover:bg-lavender-50"
          >
            Update plan
          </Link>
          <Link
            to="/connections/$id/date-plan/share"
            params={{ id }}
            className="block w-full rounded-full border border-line bg-paper px-5 py-3 text-center font-display text-[13.5px] text-ink hover:bg-lavender-50"
          >
            Share plan
          </Link>
          <Link
            to="/connections/$id/add-to-calendar"
            params={{ id }}
            className="block w-full rounded-full border border-line bg-paper px-5 py-3 text-center font-display text-[13.5px] text-ink hover:bg-lavender-50"
          >
            Add to calendar
          </Link>
          <Link
            to="/connections/$id/cancel-plan"
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
