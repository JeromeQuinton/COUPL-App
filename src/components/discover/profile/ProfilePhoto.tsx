/**
 * Full-bleed photo placeholder (lavender/blush gradient).
 * Phase 1 only — Phase 4 swaps `hue` for real uploads.
 */
import { useState } from "react";
import { Heart, BadgeCheck } from "lucide-react";
import { PhotoCaption } from "@/components/discover/PhotoCaption";
import { InfoButton } from "@/components/discover/InfoButton";

/**
 * Hero overlay (DR-047) — Photo 1 only. Four-corner identity overlay
 * replacing the deleted IntroductionCard. Renders Attuned % (top-left),
 * Trust Score (top-right), name+age+location (bottom-left), Verified
 * pill (bottom-right). A radial-darkened gradient improves legibility.
 */
export type HeroOverlay = {
  name: string;
  age: number;
  region: string;
  verified: boolean;
  attunedValue: number;
  trustScore: number;
};

export function ProfilePhoto({
  hue,
  alt,
  trustScore,
  src,
  caption,
  hero,
  variant = "hero",
}: {
  hue: string;
  alt: string;
  /** Optional Trust Score overlay pill (top-right). Legacy — superseded by `hero` on Photo 1. */
  trustScore?: number;
  /** Optional image URL/path. When omitted, the lavender gradient is used as a fallback. */
  src?: string;
  /** Optional user-authored caption rendered over a soft bottom gradient. */
  caption?: string;
  /** When provided, renders the four-corner hero overlay (Photo 1 only). */
  hero?: HeroOverlay;
  /**
   * DR-056: layout variant.
   * - "hero" (default): full-bleed (negative horizontal margin), no border-radius.
   * - "inset": matches surrounding card width, 20px border-radius. Used for Photos 2–5.
   */
  variant?: "hero" | "inset";
}) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;
  const isInset = variant === "inset";
  const containerClass = isInset
    ? "relative overflow-hidden rounded-[20px] shadow-elev-1"
    : "relative -mx-4 overflow-hidden";
  return (
    <div className={containerClass}>
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setErrored(true)}
          className="aspect-[4/5] w-full object-cover"
          style={{
            background: `var(--blush)`,
          }}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="aspect-[4/5] w-full"
          style={{
            background: `var(--blush)`,
          }}
        />
      )}
      {hero ? (
        <HeroOverlayLayer hero={hero} />
      ) : typeof trustScore === "number" ? (
        <span
          className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-blush/90 px-3 py-1 font-body text-[11px] font-medium text-ink shadow-elev-1 backdrop-blur"
          aria-label={`Trust Score ${trustScore}%`}
        >
          <span className="font-display text-[12px] font-semibold">Trust Score {trustScore}%</span>
          <InfoButton termKey="trust_score" />
        </span>
      ) : null}
      {hero ? null : <PhotoCaption caption={caption} photoAlt={alt} />}
    </div>
  );
}

function HeroOverlayLayer({ hero }: { hero: HeroOverlay }) {
  return (
    <>
      {/* Legibility: top + bottom gradient bands. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Top-left — Attuned % */}
      <span
        className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-blush/90 px-3 py-1 font-body text-[11px] font-medium text-ink shadow-elev-1 backdrop-blur"
        aria-label={`${hero.attunedValue}% Attuned`}
      >
        <Heart
          aria-hidden
          width={12}
          height={12}
          strokeWidth={2}
          className="text-ink"
          fill="currentColor"
        />
        <span className="font-display text-[12px] font-semibold">
          {hero.attunedValue}% Attuned
        </span>
        <InfoButton termKey="attuned_percentage" />
      </span>

      {/* Top-right — Trust Score */}
      <span
        className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-blush/90 px-3 py-1 font-body text-[11px] font-medium text-ink shadow-elev-1 backdrop-blur"
        aria-label={`Trust Score ${hero.trustScore}%`}
      >
        <span className="font-display text-[12px] font-semibold">
          Trust Score {hero.trustScore}%
        </span>
        <InfoButton termKey="trust_score" />
      </span>

      {/* Bottom-left — Name+age + location */}
      <div
        className="absolute bottom-4 left-4 flex flex-col"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.45)" }}
      >
        <span className="font-display text-[24px] font-medium leading-tight text-white">
          {hero.name} · {hero.age}
        </span>
        <span className="font-body text-[13px] font-normal leading-tight text-white">
          {hero.region}
        </span>
      </div>

      {/* Bottom-right — Verified */}
      {hero.verified ? (
        <span
          className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-blush/90 px-2.5 py-1 font-body text-[11px] font-medium text-ink shadow-elev-1 backdrop-blur"
          aria-label="Verified profile"
        >
          <BadgeCheck aria-hidden width={12} height={12} strokeWidth={2} />
          Verified
        </span>
      ) : null}
    </>
  );
}
