import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * /coach/history — past Polaris coach exchanges.
 *
 * Coach AI thread is otherwise ephemeral. This is the archive.
 * Grouped by week.
 *
 * Stream-19 SCREEN-31.
 */
export const Route = createFileRoute("/_main/polaris/history")({
  head: () => ({ meta: [{ title: "Past reflections — COUPL" }] }),
  component: HistoryScreen,
});

type Entry = { id: string; title: string; preview: string; date: string };

const WEEKS: { label: string; entries: Entry[] }[] = [
  {
    label: "This week",
    entries: [
      { id: "w1-1", title: "Why did Maya go quiet?", preview: "Quiet often arrives when a topic gets close to something specific. Worth attunement, not a flag.", date: "Mon" },
      { id: "w1-2", title: "What did you notice with Ava?", preview: "Pace shifted on Tuesday. The reply gap stretched, then sentences got shorter.", date: "Tue" },
    ],
  },
  {
    label: "Last week",
    entries: [
      { id: "w2-1", title: "Is Sam pulling back, or am I reading wrong?", preview: "Two messages in a row landed shorter. Could be capacity. Worth a soft check rather than a hard one.", date: "Thu" },
      { id: "w2-2", title: "Should I propose a plan?", preview: "Their last few messages had the texture of openness. Not a demand for it.", date: "Fri" },
    ],
  },
  {
    label: "Earlier",
    entries: [
      { id: "w3-1", title: "Why is dating exhausting this month?", preview: "Capacity reading suggests less bandwidth. The exhaustion isn't the dating itself.", date: "21 Apr" },
    ],
  },
];

function HistoryScreen() {
  return (
    <div className="relative px-5 pb-16 pt-6">
      <header className="flex items-center gap-3">
        <Link to="/polaris/chat" aria-label="Back" className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="text-label-mono">Polaris · past reflections</p>
      </header>

      <h1 className="mt-3 font-display text-[28px] leading-[1.1] text-ink">
        What you've <em className="font-display italic">already noticed.</em>
      </h1>
      <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
        Held quietly. Open one to read the full thread.
      </p>

      <div className="mt-8 space-y-8">
        {WEEKS.map((w) => (
          <section key={w.label}>
            <p className="text-label-mono">{w.label}</p>
            <ul className="mt-3 space-y-2.5">
              {w.entries.map((e) => (
                <li key={e.id}>
                  <button
                    type="button"
                    className="flex w-full items-start gap-3 rounded-[14px] bg-paper px-4 py-3.5 text-left shadow-elev-1 hover:bg-lavender-50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[15px] text-ink">{e.title}</p>
                      <p className="mt-1 font-body text-[12.5px] leading-snug text-slate line-clamp-2">{e.preview}</p>
                      <p className="mt-1.5 text-label-mono">{e.date}</p>
                    </div>
                    <ChevronRight size={16} className="mt-1 text-stone" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
