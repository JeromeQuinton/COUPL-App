import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { GrowthBackdrop } from "@/components/growth/GrowthBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import { WORKSHOPS } from "@/data/growth_sample";

export const Route = createFileRoute("/_main/growth/workshops")({
  head: () => ({
    meta: [
      { title: "Workshops — COUPL" },
      {
        name: "description",
        content:
          "Sessions led by practitioners. Small groups. No theory without practice.",
      },
    ],
  }),
  component: WorkshopsListScreen,
});

function WorkshopsListScreen() {
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

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader eyebrow="Workshops" title="Workshops." />
        <p className="mt-2 font-body text-[14px] leading-relaxed text-slate">
          Sessions led by practitioners. Small groups. No theory without practice.
        </p>
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          Insight is preventative care.
        </p>
      </header>

      <ul className="px-5 pb-12 flex flex-col gap-3">
        {WORKSHOPS.map((w) => (
          <li key={w.id}>
            <Link
              to="/growth/$id"
              params={{ id: w.id }}
              className="block rounded-[16px] bg-paper p-4 shadow-elev-1 transition-colors hover:bg-lavender-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-500"
            >
              <div className="flex items-stretch gap-3">
                <div
                  aria-hidden
                  className="h-[64px] w-[64px] flex-shrink-0 rounded-[12px]"
                  style={{ background: w.swatch }}
                />
                <div className="flex flex-1 flex-col justify-center">
                  <p className="font-display text-[15px] font-semibold leading-tight text-ink">
                    {w.title}
                  </p>
                  <p className="mt-1 font-body text-[12.5px] text-slate">
                    {w.sessionCount} sessions · {w.startsLabel}
                  </p>
                  <p className="mt-0.5 font-body text-[12px] text-stone">
                    Led by {w.practitioner}, {w.practitionerCredential}
                  </p>
                </div>
                <ArrowRight
                  size={16}
                  strokeWidth={2}
                  className="self-center text-stone"
                />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </GrowthBackdrop>
  );
}
