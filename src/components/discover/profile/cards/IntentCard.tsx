import { Heart, BadgeCheck } from "lucide-react";
import { InfoButton } from "@/components/discover/InfoButton";

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
  attunedValue,
}: {
  name: string;
  age: number;
  region: string;
  verified: boolean;
  attunedValue: number;
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
        <AttunedPill value={attunedValue} />
      </div>
    </section>
  );
}

function LabelValueRow({
  label,
  termKey,
  children,
}: {
  label: string;
  termKey?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="inline-flex items-center gap-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-stone">
        {label}
        {termKey ? <InfoButton termKey={termKey} /> : null}
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

function AttunedPill({ value }: { value: number }) {
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
      <InfoButton termKey="attuned_percentage" />
    </div>
  );
}