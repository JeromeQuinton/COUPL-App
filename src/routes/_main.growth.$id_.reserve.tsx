import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, X } from "lucide-react";
import { GrowthBackdrop } from "@/components/growth/GrowthBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { getWorkshop, WORKSHOPS } from "@/data/growth_sample";

export const Route = createFileRoute("/_main/growth/$id_/reserve")({
  head: () => ({ meta: [{ title: "Reserve workshop — COUPL" }] }),
  component: WorkshopReserveScreen,
});

function WorkshopReserveScreen() {
  const { id } = useParams({ from: "/_main/growth/$id_/reserve" });
  const navigate = useNavigate();
  const w = getWorkshop(id) ?? WORKSHOPS[0];

  return (
    <GrowthBackdrop tone="editorial">
      <StatusBar
        leading={
          <Link
            to="/growth/$id"
            params={{ id }}
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <X size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Reservation</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Hold your place in the room.
        </h1>
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          A small, hosted group. We'll send the joining link the morning of each session.
        </p>
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper px-5 py-5 shadow-elev-1">
          <p className="font-display text-[17px] font-semibold leading-tight text-ink">
            {w.title}
          </p>
          <p className="mt-1 font-body text-[12.5px] text-slate">
            {w.sessionCount} sessions · {w.startsLabel}
          </p>
          <p className="mt-2 font-body text-[12px] text-stone">
            Led by {w.practitioner}, {w.practitionerCredential}
          </p>
        </article>
      </section>

      <section className="px-5 pt-5">
        <ul className="rounded-[18px] bg-paper px-5 shadow-elev-1">
          <li className="flex items-center justify-between border-b border-line py-3.5">
            <span className="text-label-mono">Reservation</span>
            <span className="font-display text-[15px] text-ink">£42 · whole arc</span>
          </li>
          <li className="flex items-center justify-between border-b border-line py-3.5">
            <span className="text-label-mono">Refundable until</span>
            <span className="font-display text-[14px] text-ink">7 days before</span>
          </li>
          <li className="flex items-center justify-between py-3.5">
            <span className="text-label-mono">Pay with</span>
            <span className="font-display text-[14px] text-ink">···· 4218</span>
          </li>
        </ul>
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          Missing a session is okay. Recordings stay private to the group for 14 days.
        </p>
      </section>

      <div className="sticky bottom-24 z-30 mt-8 px-5 pb-6">
        <button
          type="button"
          onClick={() => navigate({ to: "/growth/$id/reserved", params: { id } })}
          className="flex w-full items-center justify-center rounded-full bg-plum-700 py-4 font-display text-[15px] font-medium text-paper shadow-[0_8px_24px_rgba(61,26,71,0.28)] hover:bg-plum-500"
        >
          Confirm · £42
        </button>
      </div>
    </GrowthBackdrop>
  );
}
