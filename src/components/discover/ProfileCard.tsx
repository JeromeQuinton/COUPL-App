import { AlignmentPill } from "@/components/discover/AlignmentPill";
import type { FeedProfile } from "@/data/discover_feed_sample";

type Props = {
  profile: FeedProfile;
  onOpen: (id: string) => void;
};

/**
 * ProfileCard — single row in the curated feed (DR-019).
 * Tap (card or "View") routes to /discover/[id] in Phase 4. For now
 * it logs and no-ops (route doesn't exist yet — scoped for next prompt).
 */
export function ProfileCard({ profile, onOpen }: Props) {
  const handle = () => onOpen(profile.id);

  return (
    <button
      type="button"
      onClick={handle}
      className="w-full rounded-[20px] bg-paper p-3 text-left shadow-elev-1 transition-colors hover:bg-lavender-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-500"
    >
      <div className="flex gap-3">
        {/* Photo placeholder */}
        <div
          aria-hidden
          className="h-[72px] w-[72px] flex-shrink-0 rounded-[14px]"
          style={{
            background: `linear-gradient(150deg, ${profile.hue} 0%, var(--lavender-100) 60%, #E8D5EC 100%)`,
          }}
        />

        {/* Body */}
        <div className="flex flex-1 flex-col gap-1.5 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-[17px] font-semibold leading-tight text-plum-700">
              {profile.name}, {profile.age}
            </h3>
            <AlignmentPill band={profile.band} />
          </div>
          <p className="font-body text-[13px] text-stone">
            {profile.city} · {profile.distanceKm} km away
          </p>
          <p className="font-body text-[13px] leading-snug text-slate">
            {profile.observation}
          </p>
          <div className="mt-1 flex justify-end">
            <span
              className="rounded-full border border-plum-300 px-3 py-1 font-body text-[12px] font-medium text-plum-500"
              aria-hidden
            >
              View
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
