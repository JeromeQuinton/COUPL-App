import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, Calendar, Users } from "lucide-react";
import { GrowthBackdrop } from "@/components/growth/GrowthBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { getWorkshop, WORKSHOPS } from "@/data/growth_sample";

export const Route = createFileRoute("/_main/growth/$id")({
  head: () => ({
    meta: [{ title: "Workshop · Growth — COUPL" }],
  }),
  component: WorkshopDetailPage,
});

function WorkshopDetailPage() {
  const { id } = useParams({ from: "/_main/growth/$id" });
  const w = getWorkshop(id) ?? WORKSHOPS[0];

  return (
    <GrowthBackdrop tone="editorial">
      <StatusBar
        leading={
          <Link
            to="/growth"
            aria-label="Back to Growth"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      {/* Hero */}
      <div className="px-5">
        <div
          className="relative h-[200px] w-full overflow-hidden rounded-[20px]"
          style={{ background: w.swatch }}
        >
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, transparent 35%, rgba(28,15,40,0.55) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 px-5 pb-5">
            <span className="inline-flex items-center rounded-full bg-paper/90 px-3 py-1 font-body text-[11.5px] font-medium text-ink/80">
              {w.sessionCount} sessions · {w.startsLabel}
            </span>
            <h1 className="mt-3 font-display text-[26px] font-semibold leading-tight text-paper">
              {w.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Blurb */}
      <section className="px-5 pt-5">
        <p className="font-body text-[14.5px] leading-relaxed text-ink/85">
          {w.blurb}
        </p>
      </section>

      {/* Practitioner */}
      <section className="px-5 pt-5">
        <div className="flex items-center gap-3 rounded-[16px] bg-paper p-4 shadow-elev-1">
          <div
            aria-hidden
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full font-display text-[18px] font-semibold text-paper"
            style={{ background: "var(--plum-700, #5A2A6E)" }}
          >
            {w.practitionerInitial}
          </div>
          <div className="flex flex-col">
            <span className="font-body text-[11px] uppercase tracking-[0.14em] text-stone">
              Led by
            </span>
            <span className="font-display text-[15px] font-semibold text-ink">
              {w.practitioner}, {w.practitionerCredential}
            </span>
          </div>
        </div>
        <p className="mt-3 px-1 font-body text-[12.5px] leading-relaxed text-slate">
          {w.practitionerBio}
        </p>
      </section>

      {/* Sessions */}
      <section className="px-5 pt-7">
        <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          What we'll cover
        </h3>
        <ol className="mt-3 flex flex-col gap-2.5">
          {w.sessions.map((s) => (
            <li
              key={s.index}
              className="rounded-[14px] bg-paper p-4 shadow-elev-1"
            >
              <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-plum-500">
                Session {s.index}
              </p>
              <p className="mt-1.5 font-display text-[15px] font-medium leading-snug text-ink">
                {s.title}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Format */}
      <section className="px-5 pt-7">
        <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          Format
        </h3>
        <div className="mt-3 flex flex-col gap-3 rounded-[16px] bg-paper p-4 shadow-elev-1">
          <div className="flex items-start gap-3">
            <Calendar size={16} className="mt-0.5 text-plum-700" strokeWidth={1.75} />
            <p className="font-body text-[13px] leading-relaxed text-ink/85">
              {w.format}
            </p>
          </div>
          <div className="flex items-start gap-3 border-t border-line pt-3">
            <Users size={16} className="mt-0.5 text-plum-700" strokeWidth={1.75} />
            <p className="font-body text-[13px] leading-relaxed text-ink/85">
              Small group. Cameras on. No recording — what's said in the room
              stays in the room.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky CTA */}
      <div className="sticky bottom-0 left-0 right-0 mt-8 border-t border-line/70 bg-paper/85 px-5 pt-3 pb-6 backdrop-blur-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="font-body text-[11px] uppercase tracking-[0.14em] text-stone">
              Tuition
            </span>
            <span className="font-display text-[15px] font-semibold text-ink">
              $180 · sliding to $90
            </span>
          </div>
          <button
            type="button"
            className="rounded-full bg-plum-700 px-6 py-3 font-display text-[14.5px] font-medium text-paper shadow-elev-1 transition-colors hover:opacity-90"
          >
            Hold a place
          </button>
        </div>
      </div>
    </GrowthBackdrop>
  );
}