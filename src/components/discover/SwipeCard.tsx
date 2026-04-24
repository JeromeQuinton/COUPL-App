import { SlidersHorizontal, BadgeCheck, Heart, Info } from "lucide-react";

type Props = {
  name: string;
  age: number;
  city: string;
  prompt: string;
  answer: string;
  compatibility: number;
  verified?: boolean;
  imageHue?: string;
};

/**
 * Full-bleed Discover card matching 411HomeSwipeDeck reference.
 * - Header strip: name/age/city + filter + Verified pill
 * - Compatibility pill below header
 * - Large photo area filling remaining height with lavender→plum placeholder gradient
 * - Name/prompt overlay sits on a bottom gradient over the photo for legibility
 */
export function SwipeCard({
  name,
  age,
  city,
  prompt,
  answer,
  compatibility,
  verified = true,
  imageHue = "#F3E8F5",
}: Props) {
  return (
    <article className="flex h-full flex-col gap-3">
      {/* Header card */}
      <div className="flex items-center justify-between rounded-[20px] bg-paper px-5 py-4 shadow-elev-1">
        <div>
          <h2 className="text-h1 text-plum-700">
            {name} <span className="text-plum-700">• {age}</span>
          </h2>
          <p className="mt-1 text-body-sm text-stone">{city}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Filters"
            className="flex h-9 w-9 items-center justify-center rounded-full text-plum-500 transition-colors hover:bg-lavender-50"
          >
            <SlidersHorizontal aria-hidden width={20} height={20} strokeWidth={1.5} />
          </button>
          {verified && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-plum-300 px-3 py-1.5 text-body-sm font-medium text-plum-500">
              <BadgeCheck aria-hidden width={16} height={16} strokeWidth={1.75} />
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Compatibility pill */}
      <div className="flex items-center justify-center gap-2 rounded-full bg-paper px-5 py-3 shadow-elev-1">
        <Heart aria-hidden width={18} height={18} strokeWidth={0} fill="var(--plum-500)" />
        <span className="text-h2 font-semibold text-plum-700">{compatibility}%</span>
        <span className="text-body-md text-slate">Compatibility</span>
        <Info aria-hidden width={14} height={14} strokeWidth={1.5} className="text-stone" />
      </div>

      {/* Photo area */}
      <div
        className="relative flex-1 overflow-hidden rounded-[24px] shadow-elev-2"
        style={{
          background: `linear-gradient(160deg, ${imageHue} 0%, var(--lavender-100) 55%, #E8D5EC 100%)`,
        }}
      >
        {/* Bottom gradient for legibility */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
          style={{
            background:
              "linear-gradient(to top, rgba(26,26,26,0.72) 0%, rgba(26,26,26,0.4) 40%, rgba(26,26,26,0) 100%)",
          }}
        />
        {/* Prompt overlay */}
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-body-sm uppercase tracking-[0.14em] text-paper/80">Prompt</p>
          <p className="mt-1 text-h1 text-paper">{prompt}</p>
          <p className="mt-2 text-body-md text-paper/90">{answer}</p>
        </div>
      </div>
    </article>
  );
}