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

export function MoreFiltersSheet({ open, onOpenChange, tier, onUpgrade }: Props) {
  const isFree = tier === "free";

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
            Refine your feed by deeper alignment signals.
          </SheetDescription>
        </SheetHeader>

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

        <Section title="Depth Unlocks required" paid isFree={isFree}>
          <PaidPlaceholderRow
            label="Only show people with reciprocal Depth Unlocks"
            disabled={isFree}
          />
        </Section>

        {isFree && (
          <div className="sticky bottom-0 -mx-5 mt-4 border-t border-line bg-paper/95 px-5 pt-4 pb-1 backdrop-blur">
            <button
              type="button"
              onClick={onUpgrade}
              className="w-full rounded-full bg-plum-500 px-5 py-3 font-display text-[15px] font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
            >
              Upgrade to apply
            </button>
            <p className="pt-2 text-center font-body text-[12px] text-slate">
              Depth filters and Modes are part of paid.
            </p>
          </div>
        )}
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
