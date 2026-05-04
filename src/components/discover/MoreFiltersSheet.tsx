import { useState } from "react";
import { Lock } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { UserTier } from "@/lib/user_tier";

/**
 * "More filters" bottom sheet — DR-025.
 * Sections: Psychological filters, Modes, Depth Unlocks required.
 * All paid-only. Free users see lock icons and an "Upgrade to apply" CTA.
 */

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tier: UserTier;
  onUpgrade: () => void;
};

const PSYCH_FILTERS = [
  "Big Five — Openness",
  "Big Five — Conscientiousness",
  "Big Five — Extraversion",
  "Big Five — Agreeableness",
  "Emotional Balance",
  "Attachment style",
  "Connection Languages",
];

const MODES = [
  "Show me people who feel ready",
  "…who'd challenge me",
  "…who feel easy",
  "…I haven't seen",
  "…nearby",
];

// Stream 15-1: basic preference filters. Free + paid.
const INTENT_OPTIONS = [
  "Long-term partnership",
  "Open to either",
  "Something serious, slowly",
  "Friendship first",
];

const PACE_OPTIONS = [
  "Slow",
  "Considered",
  "Steady",
  "Quick to meet",
  "Match my lead",
];

const LIFESTYLE_CHIPS = [
  "Sober-curious",
  "Active",
  "Pet at home",
  "Wants children",
  "Has children",
  "Vegetarian / vegan",
  "Religious / faith-led",
  "Quiet weekends",
];

const AGE_MIN = 18;
const AGE_MAX = 65;
const DISTANCE_MIN = 1;
const DISTANCE_MAX = 100; // km

type BasicFilters = {
  intent: string | null;
  pace: string | null;
  lifestyle: string[];
  ageMin: number;
  ageMax: number;
  distanceKm: number;
};

const DEFAULT_BASICS: BasicFilters = {
  intent: null,
  pace: null,
  lifestyle: [],
  ageMin: 26,
  ageMax: 42,
  distanceKm: 25,
};

export function MoreFiltersSheet({ open, onOpenChange, tier, onUpgrade }: Props) {
  const isFree = tier === "free";

  // Stream 15-1: local-state Basics filters. Phase 1 only persists in-sheet.
  const [basics, setBasics] = useState<BasicFilters>(DEFAULT_BASICS);
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  const toggleLifestyle = (chip: string) =>
    setBasics((b) => ({
      ...b,
      lifestyle: b.lifestyle.includes(chip)
        ? b.lifestyle.filter((c) => c !== chip)
        : [...b.lifestyle, chip],
    }));

  const onReset = () => {
    setBasics(DEFAULT_BASICS);
    setSavedAt(null);
  };
  const onSave = () => setSavedAt(new Date());
  const onApply = () => {
    onSave();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-[24px] border-t border-line bg-paper px-5 pb-8 pt-6 max-h-[85vh] overflow-y-auto"
      >
        <SheetHeader className="mb-4 text-left">
          <SheetTitle className="font-display text-[20px] font-semibold text-ink">
            More filters
          </SheetTitle>
          <SheetDescription className="font-body text-[13px] text-slate">
            Refine your feed by basic preferences and deeper alignment signals.
          </SheetDescription>
        </SheetHeader>

        {/* Stream 15-1: Basics section — open to all tiers. */}
        <Section title="Basics" isFree={isFree}>
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-2 font-body text-[12.5px] font-medium uppercase tracking-[0.18em] text-plum-500">
                Intent
              </p>
              <div className="flex flex-wrap gap-2">
                {INTENT_OPTIONS.map((opt) => {
                  const active = basics.intent === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setBasics((b) => ({
                          ...b,
                          intent: active ? null : opt,
                        }))
                      }
                      className={
                        active
                          ? "rounded-full border border-plum-500 bg-plum-500 px-3 py-1.5 font-body text-[12.5px] font-medium text-paper"
                          : "rounded-full border border-plum-300 bg-paper px-3 py-1.5 font-body text-[12.5px] font-medium text-plum-700"
                      }
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 font-body text-[12.5px] font-medium uppercase tracking-[0.18em] text-plum-500">
                Pace
              </p>
              <div className="flex flex-wrap gap-2">
                {PACE_OPTIONS.map((opt) => {
                  const active = basics.pace === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        setBasics((b) => ({
                          ...b,
                          pace: active ? null : opt,
                        }))
                      }
                      className={
                        active
                          ? "rounded-full border border-plum-500 bg-plum-500 px-3 py-1.5 font-body text-[12.5px] font-medium text-paper"
                          : "rounded-full border border-plum-300 bg-paper px-3 py-1.5 font-body text-[12.5px] font-medium text-plum-700"
                      }
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 font-body text-[12.5px] font-medium uppercase tracking-[0.18em] text-plum-500">
                Lifestyle
              </p>
              <div className="flex flex-wrap gap-2">
                {LIFESTYLE_CHIPS.map((chip) => {
                  const active = basics.lifestyle.includes(chip);
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => toggleLifestyle(chip)}
                      className={
                        active
                          ? "rounded-full border border-plum-500 bg-plum-500 px-3 py-1.5 font-body text-[12.5px] font-medium text-paper"
                          : "rounded-full border border-plum-300 bg-paper px-3 py-1.5 font-body text-[12.5px] font-medium text-plum-700"
                      }
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="mb-2 font-body text-[12.5px] font-medium uppercase tracking-[0.18em] text-plum-500">
                Age range · {basics.ageMin}–{basics.ageMax}
              </p>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex flex-col gap-1">
                  <span className="font-body text-[11.5px] text-slate">Min</span>
                  <input
                    type="number"
                    min={AGE_MIN}
                    max={basics.ageMax}
                    value={basics.ageMin}
                    onChange={(e) =>
                      setBasics((b) => ({
                        ...b,
                        ageMin: Math.max(
                          AGE_MIN,
                          Math.min(b.ageMax, Number(e.target.value) || AGE_MIN),
                        ),
                      }))
                    }
                    className="rounded-[10px] border border-plum-300 bg-paper px-3 py-2 font-body text-[14px] text-ink focus:border-plum-500 focus:outline-none"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-body text-[11.5px] text-slate">Max</span>
                  <input
                    type="number"
                    min={basics.ageMin}
                    max={AGE_MAX}
                    value={basics.ageMax}
                    onChange={(e) =>
                      setBasics((b) => ({
                        ...b,
                        ageMax: Math.min(
                          AGE_MAX,
                          Math.max(b.ageMin, Number(e.target.value) || AGE_MAX),
                        ),
                      }))
                    }
                    className="rounded-[10px] border border-plum-300 bg-paper px-3 py-2 font-body text-[14px] text-ink focus:border-plum-500 focus:outline-none"
                  />
                </label>
              </div>
            </div>

            <div>
              <p className="mb-2 font-body text-[12.5px] font-medium uppercase tracking-[0.18em] text-plum-500">
                Distance · {basics.distanceKm}km
              </p>
              <input
                type="range"
                min={DISTANCE_MIN}
                max={DISTANCE_MAX}
                value={basics.distanceKm}
                onChange={(e) =>
                  setBasics((b) => ({
                    ...b,
                    distanceKm: Number(e.target.value),
                  }))
                }
                className="w-full accent-plum-500"
                aria-label="Distance in kilometres"
              />
            </div>
          </div>
        </Section>

        <Section
          title="Psychologically aligned"
          paid
          isFree={isFree}
        >
          <div className="flex flex-wrap gap-2">
            {PSYCH_FILTERS.map((f) => (
              <PaidPlaceholderChip key={f} label={f} disabled={isFree} />
            ))}
          </div>
        </Section>

        <Section title="Modes" paid isFree={isFree}>
          <div className="flex flex-col gap-2">
            {MODES.map((m) => (
              <PaidPlaceholderRow key={m} label={m} disabled={isFree} />
            ))}
          </div>
        </Section>

        <Section title="Depth filters and Modes" paid isFree={isFree}>
          <PaidPlaceholderRow
            label="Members see this as part of a deeper view."
            disabled={isFree}
          />
        </Section>

        {/* Stream 15-1: persistent Apply / Reset / Save bar. */}
        <div className="sticky bottom-0 -mx-5 mt-4 border-t border-line bg-paper/95 px-5 pt-4 pb-1 backdrop-blur">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onReset}
              className="flex-1 rounded-full border border-plum-300 bg-paper px-4 py-2.5 font-body text-[13.5px] font-medium text-plum-700 hover:bg-lavender-50"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onSave}
              className="flex-1 rounded-full border border-plum-300 bg-paper px-4 py-2.5 font-body text-[13.5px] font-medium text-plum-700 hover:bg-lavender-50"
            >
              Save
            </button>
            <button
              type="button"
              onClick={onApply}
              className="flex-[1.4] rounded-full bg-plum-500 px-4 py-2.5 font-display text-[14px] font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
            >
              Apply
            </button>
          </div>
          {savedAt && (
            <p className="pt-2 text-center font-body text-[11.5px] text-slate">
              Saved · {savedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          )}
          {isFree && (
            <button
              type="button"
              onClick={onUpgrade}
              className="mt-2 w-full rounded-full border border-plum-300 bg-lavender-50 px-5 py-2 font-body text-[12.5px] font-medium text-plum-700 hover:bg-lavender-100"
            >
              See membership options
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Section({
  title,
  paid,
  isFree,
  children,
}: {
  title: string;
  paid?: boolean;
  isFree: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 border-t border-line py-4 first-of-type:border-t-0 first-of-type:pt-0">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-[15px] font-semibold text-plum-700">{title}</h3>
        {paid && (
          <span className="inline-flex items-center gap-1 rounded-full bg-lavender-100 px-2.5 py-1 font-body text-[11px] font-medium text-plum-700">
            {isFree && <Lock aria-hidden width={11} height={11} strokeWidth={2} />}
            Paid
          </span>
        )}
      </div>
      {children}
    </section>
  );
}

function PaidPlaceholderChip({ label, disabled }: { label: string; disabled: boolean }) {
  return (
    <span
      className={
        disabled
          ? "rounded-full border border-line bg-cloud px-3 py-1.5 font-body text-[12px] font-medium text-stone"
          : "rounded-full border border-plum-300 bg-paper px-3 py-1.5 font-body text-[12px] font-medium text-plum-700"
      }
    >
      {label}
    </span>
  );
}

function PaidPlaceholderRow({ label, disabled }: { label: string; disabled: boolean }) {
  return (
    <div
      className={
        disabled
          ? "flex items-center justify-between rounded-[14px] border border-line bg-cloud px-4 py-3 font-body text-[13px] text-stone"
          : "flex items-center justify-between rounded-[14px] border border-plum-300 bg-paper px-4 py-3 font-body text-[13px] text-plum-700"
      }
    >
      <span>{label}</span>
      <span
        aria-hidden
        className={
          disabled
            ? "h-5 w-9 rounded-full bg-line"
            : "h-5 w-9 rounded-full bg-lavender-100"
        }
      />
    </div>
  );
}
