import { useState } from "react";
import { AlignmentPill } from "@/components/discover/AlignmentPill";
import type { FeedProfile } from "@/data/discover_feed_sample";
import type { DiscoverCardStatus } from "@/lib/discover_session_state";

type Props = {
  profile: FeedProfile;
  onOpen: (id: string) => void;
  status?: DiscoverCardStatus;
};

/**
 * ProfileCard — single row in the curated feed (DR-019).
 * Tap routes to /discover/[id] (DR-020). Cards reflect Phase-1 session
 * state — `dismissed` greys out, `invited` shows an "Invited" badge.
 */
export function ProfileCard({ profile, onOpen, status = "active" }: Props) {
  const handle = () => onOpen(profile.id);
  const isDismissed = status === "dismissed";
  const isInvited = status === "invited";
  const [imgErrored, setImgErrored] = useState(false);
  const showPhoto = Boolean(profile.photoUrl) && !imgErrored;

  return (
    <button
      type="button"
      onClick={handle}
      aria-disabled={isDismissed}
      className={`w-full rounded-[20px] bg-paper p-3 text-left shadow-elev-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-500 ${
        isDismissed ? "opacity-50 grayscale" : "hover:bg-lavender-50"
      }`}
    >
      <div className="flex gap-3">
        {/* Photo (with gradient fallback behind the <img>) */}
        <div
          className="relative h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-[14px]"
          style={{
            background: `linear-gradient(150deg, ${profile.hue} 0%, var(--lavender-100) 60%, #E8D5EC 100%)`,
          }}
        >
          {showPhoto ? (
            <img
              src={profile.photoUrl}
              alt={profile.name}
              loading="lazy"
              onError={() => setImgErrored(true)}
              className="h-full w-full object-cover"
            />
          ) : null}
        </div>

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
            {isInvited ? (
              <span className="rounded-full bg-plum-500 px-3 py-1 font-body text-[12px] font-medium text-paper">
                Invited
              </span>
            ) : isDismissed ? (
              <span className="rounded-full border border-line px-3 py-1 font-body text-[12px] font-medium text-stone">
                Not today
              </span>
            ) : (
              <span
                className="rounded-full border border-plum-300 px-3 py-1 font-body text-[12px] font-medium text-plum-500"
                aria-hidden
              >
                View
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
