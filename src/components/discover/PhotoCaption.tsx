/**
 * PhotoCaption — reusable text-on-photo overlay (locked pattern).
 *
 * Renders a user-authored caption inside a soft bottom gradient
 * over any photo. Self-contained: assumes only that the parent
 * container is `position: relative`. If `caption` is missing,
 * empty, or whitespace-only, the component renders nothing — the
 * underlying photo stays clean (no overlay, no gradient).
 *
 * Right padding reserves space for the future Module Attune
 * infinity button (Prompt E) — keep that area clear even though
 * the button is not yet built.
 */
export function PhotoCaption({
  caption,
  photoAlt,
}: {
  caption: string | undefined;
  photoAlt?: string;
}) {
  if (!caption || caption.trim().length === 0) return null;

  const ariaLabel = photoAlt
    ? `${photoAlt}: ${caption}`
    : caption;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0"
      aria-hidden={false}
    >
      {/* Gradient zone — 30% of parent photo height, scales with width */}
      <div
        className="absolute inset-x-0 bottom-0 h-[30%]"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      {/* Caption text — anchored 16px from left & bottom, 56px right reserve */}
      <p
        aria-label={ariaLabel}
        className="relative overflow-hidden"
        style={{
          color: "var(--paper)",
          fontSize: "15px",
          fontWeight: 600,
          lineHeight: 1.3,
          padding: "0 56px 16px 16px",
          textShadow: "0 1px 2px var(--photo-overlay-soft)",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {caption}
      </p>
    </div>
  );
}