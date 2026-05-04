import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import { ValueCard } from "@/components/connections/ValueCard";
import { SAMPLE_VALUES_ALIGNMENT } from "@/data/connections_sample";

export const Route = createFileRoute("/_main/connections/$id_/values-overlap")({
  head: () => ({ meta: [{ title: "Values — COUPL" }] }),
  component: ValuesOverlapScreen,
});

const isMember = true;

function ValuesOverlapScreen() {
  const { id } = useParams({
    from: "/_main/connections/$id_/values-overlap",
  });
  const alignment = SAMPLE_VALUES_ALIGNMENT[id] ?? SAMPLE_VALUES_ALIGNMENT.ava;

  return (
    <div className="relative min-h-[100dvh] bg-paper">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-plum-300/15 bg-paper/85 px-4 py-3 backdrop-blur-md">
        <Link
          to="/connections/$id"
          params={{ id: id }}
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="font-display text-[15px] font-semibold text-ink">Values</p>
      </header>

      <div className="px-5 pt-5 pb-12">
        <ScreenHeader eyebrow="Connection · values" title="What you've both said matters." />

        <p className="mt-3 font-body text-[13.5px] italic leading-relaxed text-slate">
          These cards are conversation starters, not verdicts. Open them when
          you're curious.
        </p>

        {!isMember ? (
          <article className="mt-7 rounded-[18px] border border-line bg-paper p-6 text-center shadow-elev-1">
            <p className="text-label-mono text-stone">Member</p>
            <p className="mt-3 font-display text-[16px] italic leading-relaxed text-ink">
              The values surface is a member-tier piece of relational depth.
            </p>
            <Link
              to="/membership/plans"
              className="mt-6 inline-flex rounded-full bg-plum-700 px-5 py-2.5 font-display text-[13.5px] font-medium text-paper hover:opacity-90"
            >
              See member plans
            </Link>
          </article>
        ) : (
          <>
            <article className="mt-7 rounded-[18px] bg-paper p-5 shadow-elev-1">
              <p className="text-label-mono">Polaris noticed</p>
              <p className="mt-2 font-body text-[14px] leading-relaxed text-ink">
                {alignment.summary}
              </p>
            </article>

            <ul className="mt-5 space-y-3">
              {alignment.cards.map((c) => (
                <li key={c.area}>
                  <ValueCard card={c} />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
