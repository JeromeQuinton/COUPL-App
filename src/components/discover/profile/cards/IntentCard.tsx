import { Heart, Info, BadgeCheck } from "lucide-react";

/**
 * Introduction Card (DR-023 v2).
 * Combines identity, location, intent, pacing, and the brand-glow
 * Attuned pill into a single card sitting between the sticky header
 * and the hero photo. Replaces the previous Intent-only card and
 * absorbs identity chrome formerly held by the sticky header.
 */
export function IntentCard({
  name,
  age,
  region,
  verified,
  primary,
  relationshipStyle,
  pacing,
  attunedValue,
  onInfo,
}: {
  name: string;
  age: number;
  region: string;
  verified: boolean;
  primary: string;
  relationshipStyle: string;
  pacing: string;
  attunedValue: number;
  onInfo: () => void;
}) {
  return (
    <section className="rounded-[20px] bg-paper p-5 shadow-elev-1">
      {/* Row 1 — Identity */}
      <div className="flex items-start justify-between gap-3">
        <h1 className="font-display text-[20px] font-semibold leading-tight text-ink">
          {name} · {age}
        </h1>
        {verified ? (
          <span
            className="inline-flex flex-shrink-0 items-center gap-1 rounded-full border border-line bg-paper px-2.5 py-1 font-body text-[11px] font-medium text-plum-700"
            aria-label="Verified profile"
          >
            <BadgeCheck aria-hidden width={12} height={12} strokeWidth={2} />
            Verified
          </span>
        ) : null}
      </div>

      {/* Row 2 — Location + Attuned */}
      <div className="mt-1.5 flex items-center justify-between gap-3">
        <p className="truncate font-body text-[13px] text-slate">{region}</p>
        <AttunedPill value={attunedValue} onInfo={onInfo} />
      </div>

      <div className="my-4 h-px bg-line/60" />

      {/* Row 3 — Intent */}
      <LabelValueRow label="Intent">
        <Chip>{primary}</Chip>
        <Chip>{relationshipStyle}</Chip>
      </LabelValueRow>

      {/* Row 4 — Pacing */}
      <div className="mt-3">
        <LabelValueRow label="Pacing">
          <Chip>{pacing}</Chip>
        </LabelValueRow>
      </div>

      {/* Row 5 — Quote */}
      <p className="mt-4 font-body text-[12px] italic text-stone">
        Every connection begins with self-understanding.
      </p>
    </section>
  );
}

function LabelValueRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-stone">
        {label}
      </span>
      <div className="flex flex-1 flex-wrap justify-end gap-2">{children}</div>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-lavender-100 px-3 py-1.5 font-body text-[12px] font-medium text-plum-700">
      {children}
    </span>
  );
}

function AttunedPill({ value, onInfo }: { value: number; onInfo: () => void }) {
  return (
    <div className="attuned-glow inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-paper px-3 py-1.5">
      <Heart
        aria-hidden
        width={14}
        height={14}
        strokeWidth={2}
        className="text-plum-500"
        fill="currentColor"
      />
      <span className="font-display text-[13px] font-semibold leading-none text-plum-700">
        {value}% Attuned
      </span>
      <button
        type="button"
        onClick={onInfo}
        aria-label="About attunement"
        className="inline-flex h-4 w-4 items-center justify-center text-stone transition-colors hover:text-plum-500"
      >
        <Info aria-hidden width={12} height={12} strokeWidth={1.75} />
      </button>
    </div>
  );
}