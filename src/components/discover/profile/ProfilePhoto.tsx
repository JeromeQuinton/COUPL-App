/**
 * Full-bleed photo placeholder (lavender/blush gradient).
 * Phase 1 only — Phase 4 swaps `hue` for real uploads.
 */
import { useState } from "react";
import { PhotoCaption } from "@/components/discover/PhotoCaption";
import { InfoButton } from "@/components/discover/InfoButton";

export function ProfilePhoto({
  hue,
  alt,
  trustScore,
  src,
  caption,
}: {
  hue: string;
  alt: string;
  /** Optional Trust Score overlay pill (top-right). Only on the primary photo. */
  trustScore?: number;
  /** Optional image URL/path. When omitted, the lavender gradient is used as a fallback. */
  src?: string;
  /** Optional user-authored caption rendered over a soft bottom gradient. */
  caption?: string;
}) {
  const [errored, setErrored] = useState(false);
  const showImage = src && !errored;
  return (
    <div className="relative -mx-4 overflow-hidden">
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
      {typeof trustScore === "number" ? (
        <span
          className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-paper/90 px-3 py-1 font-body text-[11px] font-medium text-plum-700 shadow-elev-1 backdrop-blur"
          aria-label={`Trust Score ${trustScore}%`}
        >
          <span className="font-display text-[12px] font-semibold">Trust Score {trustScore}%</span>
          <InfoButton termKey="trust_score" />
        </span>
      ) : null}
      <PhotoCaption caption={caption} photoAlt={alt} />
    </div>
  );
}
