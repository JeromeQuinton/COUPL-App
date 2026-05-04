import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, Calendar } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/add-to-calendar — calendar add affordance.
 *
 * Three CTAs: Apple, Google, .ics download. Editorial framing.
 *
 * Stream-19 SCREEN-28.
 */
export const Route = createFileRoute("/_main/connections/$id_/add-to-calendar")({
  head: () => ({ meta: [{ title: "Add to calendar — COUPL" }] }),
  component: AddToCalendarScreen,
});

function AddToCalendarScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/add-to-calendar" });
  const c = getConnection(id);
  const name = c?.name ?? "them";

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
          <p className="text-label-mono">Add to calendar</p>
          <span aria-hidden className="w-8" />
        </header>

        <h1 className="mt-8 font-display text-[26px] leading-tight text-ink">
          Hold the time. <em className="font-display italic">Yours to keep.</em>
        </h1>
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          Adds an event for Saturday with {name}. Plans shift; the calendar
          entry stays unless you remove it yourself.
        </p>

        <section className="mt-8 space-y-3">
          <button
            type="button"
            className="w-full flex items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1 hover:bg-lavender-50"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-lavender-100 text-plum-700">
                <Calendar size={16} />
              </span>
              <span className="font-display text-[15px] text-ink">Apple Calendar</span>
            </div>
            <span className="text-label-mono text-stone">Open</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1 hover:bg-lavender-50"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-lavender-100 text-plum-700">
                <Calendar size={16} />
              </span>
              <span className="font-display text-[15px] text-ink">Google Calendar</span>
            </div>
            <span className="text-label-mono text-stone">Open</span>
          </button>

          <button
            type="button"
            className="w-full flex items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1 hover:bg-lavender-50"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-lavender-100 text-plum-700">
                <Calendar size={16} />
              </span>
              <span className="font-display text-[15px] text-ink">Download .ics</span>
            </div>
            <span className="text-label-mono text-stone">File</span>
          </button>
        </section>

        <p className="mt-8 text-center font-body text-[12px] italic text-stone">
          We don't share what's in the entry — title, place, who's coming.
          That stays between you and your calendar.
        </p>
      </div>
    </PageBackdrop>
  );
}
