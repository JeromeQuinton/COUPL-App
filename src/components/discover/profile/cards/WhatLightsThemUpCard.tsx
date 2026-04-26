import { Heart } from "lucide-react";
import { SectionCard } from "./SectionCard";

/**
 * What lights them up — interest chips only. Conversation starters
 * have moved to <ConversationStartersCard/> for semantic separation
 * of self-description (interests) vs. invitations to talk (prompts).
 */
export function WhatLightsThemUpCard({
  interests,
}: {
  interests: { label: string; favorite?: boolean }[];
}) {
  return (
    <SectionCard title={<span>What lights them up ✨</span>}>
      <div className="grid grid-cols-2 gap-2">
        {interests.map((i) => (
          <span
            key={i.label}
            className="inline-flex items-center gap-1.5 rounded-full bg-lavender-100 px-3 py-1.5 font-body text-[12px] font-medium text-plum-700"
          >
            {i.favorite ? (
              <Heart
                aria-hidden
                width={12}
                height={12}
                strokeWidth={2}
                className="text-plum-500"
                fill="currentColor"
              />
            ) : null}
            {i.favorite ? `Favorite: ${i.label}` : i.label}
          </span>
        ))}
      </div>
    </SectionCard>
  );
}