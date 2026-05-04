/**
 * Full-bleed photo placeholder (lavender/blush gradient).
 * Phase 1 only — Phase 4 swaps `hue` for real uploads.
 */
import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { PhotoCaption } from "@/components/discover/PhotoCaption";

/**
 * Hero overlay (DR-047) — Photo 1 only. Four-corner identity overlay.
 *
 * R4 Stream 1.3 + DR-105: Trust Score numeric pill removed. Trust signal
 * is now language-only ("Verified · Neighbourhood-known") via a subtle
 * bottom-right BadgeCheck. The Attuned-percentage pill is removed in
 * favour of a descriptive band label rendered upstream.
 */
export type HeroOverlay = {
  name: string;
  age: number;
  region: string;
  verified: boolean;
  attunedLabel?: string;
};

export function ProfilePhoto({
  hue,
  alt,
  src,
  caption,
  hero,
  variant = "hero",
}: {
  hue: string;
  alt: string;
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
            background: `linear-gradient(150deg, ${hue} 0%, var(--lavender-100) 55%, #E8D5EC 100%)`,
          }}
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="aspect-[4/5] w-full"
          style={{
            background: `linear-gradient(150deg, ${hue} 0%, var(--lavender-100) 55%, #E8D5EC 100%)`,
          }}
        />
      )}
      {hero ? <HeroOverlayLayer hero={hero} /> : null}
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
            "linear-gradient(to bottom, var(--photo-overlay-medium) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to top, var(--photo-overlay-strong) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Top-left — descriptive Attuned label (no percentage). */}
      {hero.attunedLabel && (
        <span
          className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1 font-body text-[11px] font-medium text-plum-700 shadow-elev-1 backdrop-blur"
          aria-label={hero.attunedLabel}
        >
          <span className="font-display text-[12px] italic">
            {hero.attunedLabel}
          </span>
        </span>
      )}

      {/* Bottom-left — Name+age + location */}
      <div
        className="absolute bottom-4 left-4 flex flex-col"
        style={{ textShadow: "0 1px 3px var(--photo-overlay-light)" }}
      >
        <span className="font-display text-[24px] font-medium leading-tight text-white">
          {hero.name} · {hero.age}
        </span>
        <span className="font-body text-[13px] font-normal leading-tight text-white">
          {hero.region}
        </span>
      </div>

      {/* Bottom-right — subtle verified-mark icon (no text label by default).
          Tooltip on press: "Verified · Neighbourhood-known" per DR-105. */}
      {hero.verified && (
        <button
          type="button"
          aria-label="Verified profile"
          title="Verified · Neighbourhood-known"
          className="absolute bottom-4 right-4 grid h-7 w-7 place-items-center rounded-full bg-paper/90 text-plum-700 shadow-elev-1 backdrop-blur"
        >
          <BadgeCheck aria-hidden width={14} height={14} strokeWidth={2} />
        </button>
      )}
    </>
  );
}
