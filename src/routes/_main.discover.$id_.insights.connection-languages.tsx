import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { ConnectionLanguageRadar } from "@/components/discover/insights/ConnectionLanguageRadar";
import { InsightPatternCard } from "@/components/discover/insights/InsightPatternCard";
import { RelationalInsightExplainer } from "@/components/discover/insights/RelationalInsightExplainer";

/**
 * /discover/$id/insights/connection-languages
 *
 * Premium psychology explainer opened from the InfoButton beside
 * "Connection Language" in Relational Insights. Phase 1 uses local
 * fixture data; Phase 4 will pull from `assessments` via the detail
 * route's loader.
 *
 * Vocabulary: Connection Language (DR-010), Recommendation/Connection
 * (DR-023). No clinical or diagnostic claims.
 */
export const Route = createFileRoute(
  "/_main/discover/$id_/insights/connection-languages",
)({
  head: () => ({
    meta: [
      { title: "Connection Languages — COUPL" },
      {
        name: "description",
        content:
          "How this person shows up in connection — across five patterns we noticed in relationships that lasted.",
      },
    ],
  }),
  component: ConnectionLanguagesScreen,
});

import {
  CONNECTION_LANGUAGES_PATTERNS,
  CONNECTION_LANGUAGES_RADAR,
} from "@/data/insights_sample";

// Fixtures live in src/data/insights_sample.ts (R4 Stream 1.4).
const RADAR = CONNECTION_LANGUAGES_RADAR;
const PATTERNS = CONNECTION_LANGUAGES_PATTERNS;

function ConnectionLanguagesScreen() {
  const { id } = Route.useParams();

  return (
    <RelationalInsightExplainer
      eyebrow="Connection Languages"
      title="The five ways people show up."
      intro="Not love languages. Not personality types. Patterns we noticed across thousands of relationships that lasted."
      backLink={
        <Link
          to="/discover/$id"
          params={{ id }}
          className="-ml-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-body-md text-ink hover:bg-paper/60"
          aria-label="Back to profile"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden />
          <span>Profile</span>
        </Link>
      }
    >
      <ConnectionLanguageRadar points={RADAR} caption="Your pattern" />

      <section className="space-y-2.5 pt-1" aria-label="Pattern detail">
        {PATTERNS.map((p) => (
          <InsightPatternCard
            key={p.title}
            title={p.title}
            band={p.band}
            body={p.body}
          />
        ))}
      </section>

      <aside
        className="mt-4 rounded-[14px] border border-dashed border-plum-300/45 px-4 py-3 backdrop-blur-sm"
        style={{
          background:
            "linear-gradient(150deg, color-mix(in oklab, var(--paper) 85%, transparent) 0%, color-mix(in oklab, var(--lavender-50) 70%, transparent) 100%)",
        }}
      >
        <p className="text-center text-[12.5px] leading-relaxed text-slate">
          Patterns describe how someone gives and receives connection —{" "}
          <span className="text-plum-700">not who they are.</span>
        </p>
      </aside>
    </RelationalInsightExplainer>
  );
}