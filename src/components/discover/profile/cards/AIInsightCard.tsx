import { Sparkles } from "lucide-react";
import { SectionCard } from "./SectionCard";

/**
 * Card 5 — Personalised AI Insight (DR-017).
 * Phase 1: rendered from sample data (cached-per-pair pattern). No
 * runtime LLM call. Phase 4 hydrates from `pair_compatibility.insight`.
 */
export function AIInsightCard({ insight }: { insight: string }) {
  return (
    <SectionCard
      title={
        <span className="inline-flex items-center gap-1.5">
          Personalised AI Insight
          <Sparkles
            aria-hidden
            width={14}
            height={14}
            strokeWidth={1.75}
            className="text-plum-500"
          />
        </span>
      }
    >
      <p className="font-body text-[14px] leading-relaxed text-ink">{insight}</p>
    </SectionCard>
  );
}