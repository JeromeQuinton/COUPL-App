import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { GrowthBackdrop } from "@/components/growth/GrowthBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /growth/library — curated long-form reading library.
 *
 * Editorial, premium tone — School of Life adjacent. Each entry is
 * `/growth/library/$articleId`. Phase 4 pulls articles from a CMS.
 */
export const Route = createFileRoute("/_main/growth/library")({
  head: () => ({
    meta: [{ title: "Library — COUPL Growth" }],
  }),
  component: Library,
});

type Kind = "essay" | "practice" | "research";

export type Article = {
  id: string;
  kind: Kind;
  title: string;
  excerpt: string;
  readTime: number; // minutes
};

export const ARTICLES: Article[] = [
  {
    id: "the-comfort-of-pace",
    kind: "essay",
    title: "The comfort of pace",
    excerpt:
      "Slow connection is often misread as disinterest. It's usually the opposite.",
    readTime: 6,
  },
  {
    id: "noticing-not-fixing",
    kind: "practice",
    title: "Noticing, not fixing",
    excerpt:
      "A short practice for sitting with what's there before reaching for the repair.",
    readTime: 4,
  },
  {
    id: "attachment-without-the-jargon",
    kind: "essay",
    title: "Attachment without the jargon",
    excerpt:
      "What the four styles actually feel like in a Tuesday-night conversation.",
    readTime: 9,
  },
  {
    id: "the-research-on-repair",
    kind: "research",
    title: "What the research on repair tells us",
    excerpt:
      "Decades of conflict-and-repair work, summarised without the cliché.",
    readTime: 11,
  },
  {
    id: "letting-someone-be-known",
    kind: "essay",
    title: "Letting someone be known",
    excerpt:
      "On the difference between being seen and being seen accurately.",
    readTime: 7,
  },
  {
    id: "two-minutes-of-listening",
    kind: "practice",
    title: "Two minutes of listening",
    excerpt:
      "A practice you can do alone. Stops the auto-reply impulse before it starts.",
    readTime: 3,
  },
  {
    id: "what-asymmetry-means",
    kind: "research",
    title: "Reply-time asymmetry — what it means, what it doesn't",
    excerpt:
      "A short study tour. Not all asymmetry is a warning sign.",
    readTime: 8,
  },
];

const KINDS: { key: "all" | Kind; label: string }[] = [
  { key: "all", label: "All" },
  { key: "essay", label: "Essays" },
  { key: "practice", label: "Practices" },
  { key: "research", label: "Research" },
];

const KIND_LABEL: Record<Kind, string> = {
  essay: "Essay",
  practice: "Practice",
  research: "Research",
};

function Library() {
  const [filter, setFilter] = useState<"all" | Kind>("all");
  const filtered =
    filter === "all"
      ? ARTICLES
      : ARTICLES.filter((a) => a.kind === filter);

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
        <p className="text-label-mono text-plum-700">Library</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Slow reading.
        </h1>
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          Essays, practices, and research, hand-picked for the work you're
          already doing.
        </p>
      </header>

      <div className="px-5">
        <div className="flex flex-wrap gap-2">
          {KINDS.map((k) => (
            <button
              key={k.key}
              type="button"
              onClick={() => setFilter(k.key)}
              className={
                filter === k.key
                  ? "rounded-full bg-plum-500 px-3 py-1 text-label-mono text-paper"
                  : "rounded-full border border-line bg-paper px-3 py-1 text-label-mono text-slate"
              }
            >
              {k.label}
            </button>
          ))}
        </div>
      </div>

      <ul className="px-5 pt-4 flex flex-col gap-3 pb-12">
        {filtered.map((a) => (
          <li key={a.id}>
            <Link
              to="/growth/library/$articleId"
              params={{ articleId: a.id }}
              className="block rounded-[16px] bg-paper p-5 shadow-elev-1 hover:bg-lavender-50"
            >
              <div className="flex items-center justify-between text-label-mono">
                <span className="text-plum-700">{KIND_LABEL[a.kind]}</span>
                <span className="text-stone">{a.readTime} min read</span>
              </div>
              <p className="mt-2 font-display text-[18px] font-semibold leading-snug text-ink">
                {a.title}
              </p>
              <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
                {a.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </GrowthBackdrop>
  );
}
