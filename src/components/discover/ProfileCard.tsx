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
 * no separate "View" button.
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
      className={`group flex w-full items-stretch overflow-hidden rounded-[4px] border border-ink bg-cream text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
        isDismissed ? "opacity-50 grayscale" : "hover:bg-ink/[0.02]"
      }`}
      style={{ minHeight: "160px" }}
    >
      {/* Left: square photo, full card height. */}
      <div
        className="relative h-[144px] w-[144px] flex-shrink-0 self-center overflow-hidden bg-cream"
        style={{ boxShadow: "inset 0 0 0 1px rgba(26,26,26,0.08)" }}
      >
        {showPhoto ? (
          <img
            src={profile.photoUrl}
            alt={profile.name}
            loading="lazy"
            onError={() => setImgErrored(true)}
            className="h-full w-full object-cover"
            style={{ filter: "grayscale(0.85) contrast(1.18) brightness(0.92)" }}
          />
        ) : null}
        <span
          className="absolute left-2 top-2 rounded-[2px] font-mono text-[11px] font-medium uppercase leading-none text-blush"
          style={{
            background: "rgba(26,26,26,0.92)",
            padding: "4px 8px",
            letterSpacing: "0.08em",
          }}
          aria-hidden
        >
          {positionLabel}
        </span>
      </div>

      {/* Right: editorial body. */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-2 py-4 pl-4 pr-4">
        <h3 className="font-display text-[18px] font-semibold leading-tight text-ink">
          {profile.name}, {profile.age}
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate">
          {profile.city.toUpperCase()} · {profile.distanceKm} KM
        </p>

        <p
          className="font-display italic text-ink line-clamp-2"
          style={{
            fontSize: "15px",
            lineHeight: 1.4,
            letterSpacing: "-0.005em",
            marginTop: "8px",
          }}
        >
          “{profile.observation}”
        </p>

        <div className="flex items-center justify-between gap-2" style={{ marginTop: "8px" }}>
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
