import { useEffect, useState } from "react";
import { ArrowLeft, Bookmark, SlidersHorizontal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { isSaved, saveProfile, unsaveProfile } from "@/lib/saved-profiles";

/**
 * Sticky header (DR-020, DR-023 v2 update). Minimal chrome — back,
 * bookmark (toggles saved-for-later), filter shortcut, and a quiet
 * link to /discover/saved.
 *
 * Prompt 5.1: when `revealName` is true (set by the detail route once
 * Photo 1 has scrolled past the header), cross-fade `Name · Age` into
 * the centre slot. Reduced-motion users get an instant snap.
 */
export function ProfileDetailHeader({
  onBack,
  revealName = false,
  name,
  age,
  profileId,
}: {
  onBack: () => void;
  revealName?: boolean;
  name?: string;
  age?: number;
  profileId?: string;
}) {
  const showLabel = Boolean(name) && typeof age === "number";
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (profileId) setSaved(isSaved(profileId));
  }, [profileId]);
  const toggleSave = () => {
    if (!profileId) return;
    if (saved) {
      unsaveProfile(profileId);
      setSaved(false);
    } else {
      saveProfile(profileId);
      setSaved(true);
    }
  };
  return (
    <header
      className="sticky top-0 z-30 -mx-4 border-b border-line/60 bg-paper/85 px-4 py-3 backdrop-blur-md"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 0.5rem)" }}
    >
      <div className="relative flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to discover"
          className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-lavender-100 text-plum-700 transition-colors hover:bg-lavender-100/70"
        >
          <ArrowLeft aria-hidden width={18} height={18} strokeWidth={1.75} />
        </button>

        {showLabel ? (
          <span
            aria-hidden={!revealName}
            className={`pointer-events-none absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-display text-[17px] font-medium leading-none tracking-[-0.005em] text-ink transition-opacity duration-200 ease-out motion-reduce:transition-none ${
              revealName ? "opacity-100" : "opacity-0"
            }`}
          >
            {name} · {age}
          </span>
        ) : null}

        <div className="flex items-center gap-1">
          {profileId ? (
            <button
              type="button"
              onClick={toggleSave}
              aria-label={saved ? "Remove from saved" : "Save for later"}
              aria-pressed={saved}
              className={`inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-colors ${
                saved ? "text-plum-700" : "text-slate hover:text-plum-700"
              }`}
            >
              <Bookmark
                aria-hidden
                width={18}
                height={18}
                strokeWidth={1.75}
                fill={saved ? "currentColor" : "none"}
              />
            </button>
          ) : null}
          <Link
            to="/discover/saved"
            aria-label="Saved profiles"
            className="hidden text-label-mono text-plum-700 hover:underline sm:inline"
          >
            SAVED
          </Link>
          <button
            type="button"
            aria-label="Filter options"
            className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-slate transition-colors hover:text-plum-700"
          >
            <SlidersHorizontal aria-hidden width={18} height={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </header>
  );
}
