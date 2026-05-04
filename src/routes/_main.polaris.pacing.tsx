import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, EyeOff } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import { BreathRhythm } from "@/components/polaris/BreathRhythm";
import { SAMPLE_PACING_THIS_WEEK } from "@/data/coach_sample";

export const Route = createFileRoute("/_main/polaris/pacing")({
  head: () => ({ meta: [{ title: "Pacing — COUPL" }] }),
  component: PacingScreen,
});

const isMember = true;

function PacingScreen() {
  const obs = SAMPLE_PACING_THIS_WEEK;
  const [muted7d, setMuted7d] = useState(false);
  const [hidden, setHidden] = useState(false);

  if (hidden) {
    return (
      <YouBackdrop>
        <StatusBar
          leading={
            <Link
              to="/polaris/chat"
              aria-label="Back"
              className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
            >
              <ChevronLeft size={18} />
            </Link>
          }
        />
        <div className="px-5 pt-12 text-center">
          <p className="text-label-mono">Pacing — paused by you</p>
          <button
            type="button"
            onClick={() => setHidden(false)}
            className="mt-5 inline-flex rounded-full border border-line bg-paper px-5 py-2.5 font-body text-[13.5px] text-ink hover:bg-lavender-50"
          >
            Re-enable
          </button>
        </div>
      </YouBackdrop>
    );
  }

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/polaris/chat"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
        trailing={
          <button
            type="button"
            onClick={() => setHidden(true)}
            className="mr-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-mono text-plum-700 hover:bg-lavender-50"
          >
            <EyeOff size={13} />
            Hide
          </button>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader
          eyebrow="Polaris · pace"
          title="How you're moving through this."
        />
      </header>

      <section className="px-5">
        <article className="rounded-[14px] border border-plum-300/40 bg-paper px-4 py-4">
          <p className="font-body text-[13.5px] leading-relaxed text-ink">
            This is one possible reading of your week.
          </p>
          <p className="mt-1 font-body text-[13.5px] leading-relaxed text-ink">
            Polaris is noticing, not judging.
          </p>
          <p className="mt-1 font-body text-[13.5px] leading-relaxed text-ink">
            Look at this when it helps. Skip when it doesn't.
          </p>
        </article>
      </section>

      {!isMember ? (
        <section className="px-5 pt-7">
          <article className="rounded-[18px] border border-line bg-paper p-6 text-center shadow-elev-1">
            <p className="text-label-mono text-stone">Member</p>
            <p className="mt-3 font-display text-[16px] italic leading-relaxed text-ink">
              The pacing surface is a member-tier piece of relational depth.
            </p>
            <Link
              to="/membership/plans"
              className="mt-6 inline-flex rounded-full bg-plum-700 px-5 py-2.5 font-display text-[13.5px] font-medium text-paper hover:opacity-90"
            >
              See member plans
            </Link>
          </article>
        </section>
      ) : (
        <>
          {muted7d ? (
            <section className="px-5 pt-7">
              <article className="rounded-[14px] bg-paper px-4 py-4 shadow-elev-1">
                <p className="font-display text-[14px] text-ink">
                  Pacing muted for seven days.
                </p>
                <p className="mt-1 font-body text-[12.5px] italic text-stone">
                  Polaris will come back to it then. You can re-enable any time.
                </p>
                <button
                  type="button"
                  onClick={() => setMuted7d(false)}
                  className="mt-3 inline-flex rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-plum-700 hover:bg-lavender-50"
                >
                  Re-enable now
                </button>
              </article>
            </section>
          ) : (
            <>
              <section className="px-5 pt-7">
                <p className="text-label-mono">{obs.weekLabel}</p>
                <div className="mt-3">
                  <BreathRhythm bands={obs.bands} />
                </div>
              </section>

              <section className="px-5 pt-7">
                <p className="text-label-mono">What Polaris noticed</p>
                <article className="mt-3 rounded-[18px] bg-paper p-5 shadow-elev-1">
                  <p className="font-body text-[14px] italic leading-relaxed text-ink">
                    {obs.caption}
                  </p>
                </article>
              </section>

              <section className="px-5 pt-7 pb-12">
                <button
                  type="button"
                  onClick={() => setMuted7d(true)}
                  className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
                >
                  Mute pacing for 7 days
                </button>
              </section>
            </>
          )}
        </>
      )}
    </YouBackdrop>
  );
}
