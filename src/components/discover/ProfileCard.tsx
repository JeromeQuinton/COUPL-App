import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { AlignmentPill } from "@/components/discover/AlignmentPill";
import type { FeedProfile } from "@/data/discover_feed_sample";
import type { DiscoverCardStatus } from "@/lib/discover_session_state";

type Props = {
  profile: FeedProfile;
  /** 1-based position in the feed; rendered as the "01" editorial tag. */
  position: number;
  onOpen: (id: string) => void;
  status?: DiscoverCardStatus;
};

/**
 * ProfileCard — editorial horizontal card (DR-019, DR-BRAND-V2-A/D).
 *
 * Layout: full-card-height square photo on the left, 16px-padded
 * editorial body on the right. The whole card is the tap target —
 * no separate "View" button. `profile.hue` is retained on FeedProfile
 * but ignored visually for now.
 */
export function ProfileCard({ profile, position, onOpen, status = "active" }: Props) {
  const handle = () => onOpen(profile.id);
  const isDismissed = status === "dismissed";
  const isInvited = status === "invited";
  const [imgErrored, setImgErrored] = useState(false);
  const showPhoto = Boolean(profile.photoUrl) && !imgErrored;

  const positionLabel = String(position).padStart(2, "0");

  return (
    <button
      type="button"
      onClick={handle}
      aria-disabled={isDismissed}
      className={`group flex w-full items-stretch overflow-hidden rounded-[4px] border border-ink bg-blush text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
        isDismissed ? "opacity-50 grayscale" : "hover:bg-ink/[0.02]"
      }`}
      style={{ minHeight: "136px" }}
    >
      {/* Left: square photo, full card height. */}
      <div
        className="relative aspect-square h-auto w-[136px] flex-shrink-0 overflow-hidden bg-blush"
      >
        {showPhoto ? (
          <img
            src={profile.photoUrl}
            alt={profile.name}
            loading="lazy"
            onError={() => setImgErrored(true)}
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(0.4) saturate(0.85)" }}
          />
        ) : null}
        <span
          className="absolute left-2 top-2 rounded-[2px] bg-ink px-2 py-[2px] font-mono text-[11px] uppercase tracking-[0.08em] text-blush"
          aria-hidden
        >
          {positionLabel}
        </span>
      </div>

      {/* Right: editorial body. */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-display text-[18px] font-semibold leading-tight text-ink">
            {profile.name}, {profile.age}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate">
            {profile.city.toUpperCase()} · {profile.distanceKm} KM
          </p>
        </div>

        <p className="font-display italic text-[13px] leading-snug text-ink line-clamp-2">
          “{profile.observation}”
        </p>

        <div className="flex items-center justify-between gap-2">
          <AlignmentPill band={profile.band} />
          {isInvited ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink">
              Invited
            </span>
          ) : isDismissed ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-stone">
              Not today
            </span>
          ) : (
            <ChevronRight
              aria-hidden
              width={18}
              height={18}
              strokeWidth={1.5}
              className="text-ink"
            />
          )}
        </div>
      </div>
    </button>
  );
}
