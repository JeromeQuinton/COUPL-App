import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /profile/completeness — full-page completeness view.
 *
 * Sister surface to ProfileNudgeSheet. For users who want to work
 * through everything in one sitting.
 *
 * Stream-19 SCREEN-29.
 */
export const Route = createFileRoute("/_main/profile/completeness")({
  head: () => ({ meta: [{ title: "What's still to come — COUPL" }] }),
  component: CompletenessScreen,
});

const COMPLETION = 65;

const GAPS = [
  { id: "photo", label: "One more photo", helper: "Aim for six. The third onward changes who notices you.", to: "/profile/edit" },
  { id: "about", label: "Write your About paragraph", helper: "Two or three lines. Specific, not curated.", to: "/profile/edit" },
  { id: "languages", label: "Pick three connection languages", helper: "Helps Discover surface the right people.", to: "/profile/edit" },
  { id: "verify", label: "Verify your photos", helper: "Quiet credibility. Takes thirty seconds.", to: "/profile/verification" },
];

function CompletenessScreen() {
  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link to="/profile" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Profile · what's still to come</p>
        <h1 className="mt-2 font-display text-[28px] italic leading-tight text-ink">
          You're {COMPLETION}% there.
        </h1>
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          Not a leaderboard. Just the things others might want to know
          before saying yes.
        </p>
      </header>

      <section className="px-5">
        <div className="rounded-[14px] bg-paper p-4 shadow-elev-1">
          <div className="h-2 w-full rounded-full bg-lavender-100">
            <div
              className="h-full rounded-full bg-plum-500"
              style={{ width: `${COMPLETION}%` }}
            />
          </div>
        </div>
      </section>

      <ul className="px-5 pt-6 pb-12 space-y-2.5">
        {GAPS.map((g) => (
          <li key={g.id}>
            <Link
              to={g.to}
              className="flex w-full items-start gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1 hover:bg-lavender-50"
            >
              <div className="min-w-0 flex-1">
                <p className="font-display text-[15px] text-ink">{g.label}</p>
                <p className="mt-0.5 font-body text-[12px] text-stone">{g.helper}</p>
              </div>
              <ChevronRight size={16} className="self-center text-stone" />
            </Link>
          </li>
        ))}
      </ul>
    </YouBackdrop>
  );
}
