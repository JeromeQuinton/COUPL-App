import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Plus } from "lucide-react";
import { GrowthBackdrop } from "@/components/growth/GrowthBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import { REFLECTIONS } from "@/data/growth_sample";

export const Route = createFileRoute("/_main/growth/journal")({
  head: () => ({
    meta: [
      { title: "Journal — COUPL" },
      {
        name: "description",
        content: "Your written record. Private to you.",
      },
    ],
  }),
  component: JournalScreen,
});

function JournalScreen() {
  return (
    <GrowthBackdrop>
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
        <ScreenHeader eyebrow="Journal" title="Your written record." />
        <p className="mt-2 font-body text-[14px] leading-relaxed text-slate">
          Private to you. We never read these.
        </p>
      </header>

      <section className="px-5">
        <Link
          to="/home/reflection"
          className="flex items-center gap-3 rounded-[16px] bg-plum-700 px-5 py-4 font-display text-[15px] font-medium text-paper shadow-elev-1 transition-colors hover:opacity-90"
        >
          <Plus size={18} strokeWidth={2.25} />
          Write today's reflection
        </Link>
      </section>

      <section className="px-5 pt-6 pb-12">
        <p className="text-label-mono">Past entries</p>
        <ul className="mt-3 flex flex-col gap-2.5">
          {REFLECTIONS.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                className="block w-full rounded-[16px] bg-paper p-4 text-left shadow-elev-1 transition-colors hover:bg-lavender-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-500"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-body text-[12px] text-stone">
                    {r.dateLabel}
                  </span>
                  <span
                    className={`font-body text-[11px] ${
                      r.wordCount === undefined ? "text-plum-500" : "text-stone"
                    }`}
                  >
                    {r.wordCount === undefined
                      ? "· unanswered"
                      : `· ${r.wordCount} words`}
                  </span>
                </div>
                <p className="mt-2 font-display text-[15px] font-medium leading-snug text-ink">
                  {r.prompt}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </section>
    </GrowthBackdrop>
  );
}
