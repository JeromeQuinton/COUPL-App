import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { getProfileDetail } from "@/data/discover_profile_detail_sample";

/**
 * /discover/$id/why — transparency surface.
 *
 * Three short paragraphs: what they signalled, what you signalled, where
 * the alignment landed. Editorial framing, never algorithmic. No
 * percentages, no sorting weights, no "score". Phase 4 will derive the
 * pair-specifics from `pair_compatibility`.
 */
export const Route = createFileRoute("/_main/discover/$id_/why")({
  head: () => ({
    meta: [
      { title: "Why am I seeing this — COUPL" },
      {
        name: "description",
        content: "What lined up between the two of you. In plain prose.",
      },
    ],
  }),
  component: WhyScreen,
});

type Why = {
  theirSignal: string;
  yourSignal: string;
  alignment: string;
};

const WHYS: Record<string, Why> = {
  "p-maya-1": {
    theirSignal:
      "Maya wrote about Sunday mornings, the bookshop she keeps going back to, and a wish for someone who'd answer messages in their own time.",
    yourSignal:
      "You said you wanted slow weekends, that you read in the morning, and that you don't want to perform romance — you want it to settle.",
    alignment:
      "What lined up: pace, the morning rhythm, and a shared distrust of the constant. Not one big overlap; three small ones in the same direction.",
  },
};

function whyFor(id: string): Why {
  return (
    WHYS[id] ?? {
      theirSignal:
        "They named what they wanted from a connection — clearly, in their own words — and it pointed in a direction you tend to walk.",
      yourSignal:
        "You named yours too. Not the polished version. The actual one.",
      alignment:
        "What lined up wasn't a single shared trait. It was a handful of small ones, leaning the same way.",
    }
  );
}

function WhyScreen() {
  const { id } = useParams({ from: "/_main/discover/$id_/why" });
  const profile = getProfileDetail(id);
  const name = profile?.name ?? "them";
  const w = whyFor(id);

  return (
    <div className="relative min-h-[100dvh] bg-paper">
      <div
        className="absolute inset-x-0 top-0 h-[260px] bg-gradient-to-b from-lavender-300/30 to-paper"
        aria-hidden="true"
      />
      <div
        className="relative mx-auto flex w-full max-w-[480px] flex-col px-6"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
        }}
      >
        <header className="flex items-center gap-2 py-2">
          <Link
            to="/discover/$id"
            params={{ id }}
            aria-label={`Back to ${name}'s profile`}
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-paper/40"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-700">
            Why am I seeing this
          </p>
        </header>

        <div className="mt-10">
          <h1 className="font-display text-[28px] leading-[1.1] text-ink">
            What lined up between you.
          </h1>
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">
            Not a score. Not a sort. The reasons {name} surfaced today, in
            plain prose.
          </p>
        </div>

        <section className="mt-8 rounded-[18px] border border-plum-300/25 bg-paper/85 p-5 backdrop-blur-sm">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            What they signalled
          </p>
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-ink">
            {w.theirSignal}
          </p>
        </section>

        <section className="mt-4 rounded-[18px] border border-plum-300/25 bg-paper/85 p-5 backdrop-blur-sm">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            What you signalled
          </p>
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-ink">
            {w.yourSignal}
          </p>
        </section>

        <section className="mt-4 rounded-[18px] border border-plum-300/25 bg-lavender-50/50 p-5 backdrop-blur-sm">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Where it landed
          </p>
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-ink">
            {w.alignment}
          </p>
        </section>

        <p className="mt-7 text-[11.5px] leading-relaxed text-slate">
          We don't show people because of a percentage. We show people when
          enough small things lean the same way.
        </p>
      </div>
    </div>
  );
}
