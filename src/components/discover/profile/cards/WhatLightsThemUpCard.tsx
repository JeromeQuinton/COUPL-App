import { Heart, MessageCircle, Leaf, MapPin } from "lucide-react";
import { SectionCard } from "./SectionCard";

/**
 * Card 9 — What lights them up. Interests + conversation starters.
 */
export function WhatLightsThemUpCard({
  interests,
  starters,
}: {
  interests: { label: string; favorite?: boolean }[];
  starters: string[];
}) {
  const starterIcons = [MessageCircle, Leaf, MapPin];

  return (
    <SectionCard title={<span>What lights them up ✨</span>}>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-display text-[13px] font-semibold text-plum-700">
            Interests &amp; Conversation
          </h3>
          <div className="mt-2 h-px w-full bg-line/60" />
          <div className="mt-3 grid grid-cols-2 gap-2">
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
        </div>

        <div className="flex flex-col gap-2">
          {starters.map((s, idx) => {
            const Icon = starterIcons[idx % starterIcons.length];
            return (
              <div
                key={s}
                className="flex items-center gap-2 rounded-full bg-lavender-50 px-4 py-2.5"
              >
                <Icon
                  aria-hidden
                  width={14}
                  height={14}
                  strokeWidth={1.75}
                  className="flex-shrink-0 text-plum-500"
                />
                <span className="font-body text-[13px] italic text-ink">
                  &ldquo;{s}&rdquo;
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}