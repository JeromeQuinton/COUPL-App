import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { GrowthBackdrop } from "@/components/growth/GrowthBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

/**
 * /growth/path — personalised growth path.
 *
 * Sequenced workshops + readings derived from user signals (Polaris
 * readings, completed workshops). Editorial framing — 'Things people
 * in your pace tend to find useful next', NOT 'your prescribed
 * journey'.
 */
export const Route = createFileRoute("/_main/growth/path")({
  head: () => ({
    meta: [{ title: "Path — COUPL Growth" }],
  }),
  component: GrowthPath,
});

type Step = {
  kind: "workshop" | "reading" | "practice";
  title: string;
  body: string;
  to: string;
  params?: Record<string, string>;
  meta: string;
};

const STEPS: Step[] = [
  {
    kind: "reading",
    title: "The comfort of pace",
    body: "On reading speed as temperament rather than verdict.",
    to: "/growth/library/$articleId",
    params: { articleId: "the-comfort-of-pace" },
    meta: "6 min read · Essay",
  },
  {
    kind: "practice",
    title: "Two minutes of listening",
    body: "A small practice for the days you feel rushed.",
    to: "/growth/library/$articleId",
    params: { articleId: "two-minutes-of-listening" },
    meta: "3 min read · Practice",
  },
  {
    kind: "workshop",
    title: "Tea & Honesty",
    body: "A live workshop on the things we don't usually say.",
    to: "/growth/$id",
    params: { id: "tea-honesty" },
    meta: "58 min · Live · Lena Park",
  },
  {
    kind: "reading",
    title: "Letting someone be known",
    body: "On the difference between being seen and being seen accurately.",
    to: "/growth/library/$articleId",
    params: { articleId: "letting-someone-be-known" },
    meta: "7 min read · Essay",
  },
  {
    kind: "workshop",
    title: "Slow listening",
    body: "Practising the version where you stop planning your reply.",
    to: "/growth/$id",
    params: { id: "slow-listening" },
    meta: "45 min · Live · Idris Mensah",
  },
];

function KindLabel({ kind }: { kind: Step["kind"] }) {
  const map = {
    workshop: { label: "Workshop", color: "text-plum-700" },
    reading: { label: "Reading", color: "text-plum-700" },
    practice: { label: "Practice", color: "text-plum-700" },
  } as const;
  return <span className={`text-label-mono ${map[kind].color}`}>{map[kind].label}</span>;
}

function GrowthPath() {
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

      <header className="px-5 pt-2 pb-4">
        <ScreenHeader eyebrow="Path" title="Where to look next." />
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          Things people in your pace tend to find useful. Not a programme.
          Pick the one that interests you; skip the rest.
        </p>
      </header>

      <ol className="px-5 pb-12 flex flex-col gap-3">
        {STEPS.map((s, i) => (
          <li key={i}>
            <Link
              to={s.to}
              params={s.params as never}
              className="block rounded-[16px] bg-paper p-5 shadow-elev-1 hover:bg-lavender-50"
            >
              <div className="flex items-center justify-between">
                <KindLabel kind={s.kind} />
                <span className="text-label-mono text-stone">
                  Step {i + 1}
                </span>
              </div>
              <p className="mt-2 font-display text-[18px] font-semibold leading-snug text-ink">
                {s.title}
              </p>
              <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
                {s.body}
              </p>
              <p className="mt-3 text-label-mono text-stone">{s.meta}</p>
            </Link>
          </li>
        ))}
      </ol>

      <p className="px-5 pb-16 text-center font-body text-[12px] italic text-stone">
        The path is descriptive, not prescriptive. Skip what you skip.
      </p>
    </GrowthBackdrop>
  );
}
