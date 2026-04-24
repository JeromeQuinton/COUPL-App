import { SectionCard } from "./SectionCard";

/**
 * Card 3 — About Me. Bio + what they're seeking, both prose.
 */
export function AboutMeCard({
  bio,
  seeking,
}: {
  bio: string;
  seeking: string;
}) {
  return (
    <SectionCard title="About Me">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="font-display text-[13px] font-semibold text-plum-700">Bio</h3>
          <p className="mt-1 font-body text-[14px] leading-relaxed text-ink">{bio}</p>
        </div>
        <div>
          <h3 className="font-display text-[13px] font-semibold text-plum-700">
            What they're seeking in a partner
          </h3>
          <p className="mt-1 font-body text-[14px] leading-relaxed text-ink">{seeking}</p>
        </div>
      </div>
    </SectionCard>
  );
}