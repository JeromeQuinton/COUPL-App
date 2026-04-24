/**
 * Full-bleed photo placeholder (lavender/blush gradient).
 * Phase 1 only — Phase 4 swaps `hue` for real uploads.
 */
export function ProfilePhoto({
  hue,
  alt,
  trustScore,
}: {
  hue: string;
  alt: string;
  /** Optional Trust Score overlay pill (top-right). Only on the primary photo. */
  trustScore?: number;
}) {
  return (
    <div className="relative -mx-4 overflow-hidden">
      <div
        role="img"
        aria-label={alt}
        className="aspect-[4/5] w-full"
        style={{
          background: `linear-gradient(150deg, ${hue} 0%, var(--lavender-100) 55%, #E8D5EC 100%)`,
        }}
      />
      {typeof trustScore === "number" ? (
        <span
          className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-paper/90 px-3 py-1 font-body text-[11px] font-medium text-plum-700 shadow-elev-1 backdrop-blur"
          aria-label={`Trust Score ${trustScore}%`}
        >
          <span className="font-display text-[12px] font-semibold">Trust Score {trustScore}%</span>
        </span>
      ) : null}
    </div>
  );
}
