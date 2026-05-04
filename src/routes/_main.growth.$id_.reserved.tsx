import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { GrowthBackdrop } from "@/components/growth/GrowthBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import { getWorkshop, WORKSHOPS } from "@/data/growth_sample";

export const Route = createFileRoute("/_main/growth/$id_/reserved")({
  head: () => ({ meta: [{ title: "You're in — COUPL" }] }),
  component: WorkshopReservedScreen,
});

function WorkshopReservedScreen() {
  const { id } = useParams({ from: "/_main/growth/$id_/reserved" });
  const w = getWorkshop(id) ?? WORKSHOPS[0];

  return (
    <GrowthBackdrop tone="editorial">
      <StatusBar />

      <main className="flex flex-col items-center px-5 pt-12 text-center">
        <span aria-hidden className="grid h-14 w-14 place-items-center rounded-full border border-plum-500 text-plum-700">
          <Check size={24} strokeWidth={2.25} />
        </span>
        <div className="mt-6">
          <ScreenHeader eyebrow="Reserved" title="You're in." />
        </div>
        <p className="mt-3 max-w-[300px] font-body text-[13.5px] leading-relaxed text-slate">
          We'll email the joining link the morning of each session. {w.title} starts {w.startsLabel}.
        </p>

        <article className="mt-8 w-full rounded-[18px] bg-paper px-5 py-4 text-left shadow-elev-1">
          <p className="text-label-mono">Up next</p>
          <p className="mt-2 font-display text-[15px] text-ink">{w.title}</p>
          <p className="mt-1 font-body text-[12.5px] text-slate">
            {w.startsLabel} · led by {w.practitioner}
          </p>
        </article>

        <Link
          to="/growth"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-plum-700 px-6 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Back to Growth
        </Link>

        <p className="mt-4 font-body text-[12px] italic text-stone">
          You'll get a calm reminder the day before.
        </p>
      </main>
    </GrowthBackdrop>
  );
}
