import { useState } from "react";
import { ArrowRight } from "lucide-react";
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
      className={`group relative flex w-full items-stretch rounded-[4px] border border-ink bg-cream text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink ${
        isDismissed ? "opacity-50 grayscale" : "hover:bg-ink/[0.02]"
      }`}
      style={{ minHeight: "120px", marginBottom: "10px" }}
    >
      {/* Left: portrait photo, full card height. */}
      <div
        className="relative h-[112px] w-[96px] flex-shrink-0 self-center overflow-hidden bg-cream"
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
      </div>
      {/* Numeric tag — breaks the frame at top-left of photo. */}
      <span
        className="absolute left-0 top-0 z-10 rounded-[2px] font-mono text-[11px] font-medium uppercase leading-none text-blush"
        style={{
          background: "rgba(26,26,26,0.92)",
          padding: "4px 8px",
          letterSpacing: "0.08em",
          transform: "translate(-4px, -4px)",
        }}
        aria-hidden
      >
        {positionLabel}
      </span>

      {/* Right: editorial body. */}
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-1.5 py-3" style={{ paddingLeft: "14px", paddingRight: "14px" }}>
        <h3 className="font-display text-[18px] font-semibold leading-tight text-ink">
          {profile.name}, {profile.age}
        </h3>
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-slate">
          {profile.city.toUpperCase()} · {profile.distanceKm} KM
        </p>

        <p
          className="font-display italic text-ink"
          style={{
            fontSize: "14px",
            lineHeight: 1.4,
            letterSpacing: "-0.005em",
            marginTop: "4px",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          “{profile.observation}”
        </p>

        <div className="flex items-center justify-between gap-2" style={{ marginTop: "6px" }}>
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
            <span
              aria-hidden
              className="-mr-3 flex items-center justify-center"
              style={{ minWidth: "44px", minHeight: "44px" }}
            >
              <ArrowRight
                width={16}
                height={16}
                strokeWidth={1.5}
                className="text-ink"
              />
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
