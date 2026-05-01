import { Heart } from "lucide-react";
import { SectionCard } from "./SectionCard";

/**
 * Card 6 — How I show up in relationships.
 */
export function HowIShowUpCard({ text }: { text: string }) {
  return (
    <SectionCard
      title={
        <span className="inline-flex items-center gap-1.5">
          How I show up in relationships
          <Heart
            aria-hidden
            width={14}
            height={14}
            strokeWidth={2}
            className="text-plum-500"
            fill="currentColor"
          />
        </span>
      }
    >
      <p className="font-body text-[14px] leading-relaxed text-ink">{text}</p>
    </SectionCard>
  );
}