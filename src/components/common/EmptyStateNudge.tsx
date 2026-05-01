import { useState } from "react";
import { X } from "lucide-react";

/**
 * EmptyStateNudge — reusable lavender-tinted nudge with a "Try it"
 * pill and a one-line pitch. Placement and parent layout are the
 * consumer's responsibility (no implicit margins).
 *
 * Cross-session dismissal persistence is intentionally out of scope —
 * this prompt only wires in-memory dismissal for the current mount.
 */
export function EmptyStateNudge({
  ctaLabel = "Try it",
  ctaDestination,
  microcopy,
  dismissible = false,
}: {
  ctaLabel?: string;
  ctaDestination: string;
  microcopy: string;
  dismissible?: boolean;
}) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative flex items-center gap-3 rounded-[16px] bg-blush/70 p-4">
      <a
        href={ctaDestination}
        className="flex-shrink-0 rounded-full bg-blush px-4 py-2 font-body text-[13px] font-medium text-ink shadow-elev-1 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
      >
        {ctaLabel}
      </a>
      <p className="flex-1 font-body text-[13px] leading-snug text-ink">
        {microcopy}
      </p>
      {dismissible ? (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss"
          className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-stone transition-colors hover:text-plum-500"
        >
          <X aria-hidden width={14} height={14} strokeWidth={2} />
        </button>
      ) : null}
    </div>
  );
}