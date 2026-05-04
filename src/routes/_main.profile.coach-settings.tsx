import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

/**
 * /profile/coach-settings — Polaris user controls.
 *
 * DR-POLARIS-USER-CONTROLS (NEW — pending). Trust-critical: members
 * must be able to dial Polaris down or off without losing prior
 * insights. Frequency / tone / per-surface toggles. Member-gated.
 *
 * Stream 26 SCREEN-R2-30. Replaces prior Coach-persona stub.
 */
export const Route = createFileRoute("/_main/profile/coach-settings")({
  head: () => ({ meta: [{ title: "Polaris settings — COUPL" }] }),
  component: PolarisSettingsScreen,
});

const FREQUENCY = ["Often", "Sometimes", "Rarely", "Off"] as const;
const TONE = ["Direct", "Gentle", "Editorial"] as const;

type Frequency = (typeof FREQUENCY)[number];
type Tone = (typeof TONE)[number];

type Surfaces = {
  chatInsights: boolean;
  conversationFlags: boolean;
  preMeetingNotes: boolean;
  repairNoticing: boolean;
};

const DEFAULT_SURFACES: Surfaces = {
  chatInsights: true,
  conversationFlags: true,
  preMeetingNotes: true,
  repairNoticing: false,
};

function PillRow<T extends string>({
  label,
  options,
  value,
  onChange,
  disabled,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  disabled?: boolean;
}) {
  return (
    <section>
      <p className="text-label-mono">{label}</p>
      <ul className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <li key={opt}>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onChange(opt)}
                className={`rounded-full border px-4 py-1.5 font-body text-[13px] transition-colors disabled:opacity-40 ${
                  active
                    ? "border-plum-700 bg-plum-700 text-paper"
                    : "border-line bg-paper text-ink hover:bg-lavender-50"
                }`}
              >
                {opt}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function ToggleRow({
  label,
  sub,
  on,
  onChange,
  disabled,
}: {
  label: string;
  sub: string;
  on: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <li>
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!on)}
        className="flex w-full items-center justify-between gap-3 rounded-[14px] bg-paper p-4 text-left shadow-elev-1 transition-colors hover:bg-lavender-50 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <div className="min-w-0 flex-1">
          <p className="font-display text-[14.5px] font-medium text-ink">{label}</p>
          <p className="mt-0.5 font-body text-[12px] text-stone">{sub}</p>
        </div>
        <span
          aria-hidden
          className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
            on ? "bg-plum-700" : "bg-line"
          }`}
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-paper shadow-elev-1 transition-transform ${
              on ? "translate-x-[22px]" : "translate-x-0.5"
            }`}
          />
        </span>
      </button>
    </li>
  );
}

function PolarisSettingsScreen() {
  const [frequency, setFrequency] = useState<Frequency>("Sometimes");
  const [tone, setTone] = useState<Tone>("Editorial");
  const [surfaces, setSurfaces] = useState<Surfaces>(DEFAULT_SURFACES);

  const polarisOff = frequency === "Off";

  const setSurface = (key: keyof Surfaces) => (v: boolean) =>
    setSurfaces((s) => ({ ...s, [key]: v }));

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile"
            aria-label="Back to Profile"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader
          eyebrow="Polaris · settings"
          title="How Polaris shows up."
        />
      </header>

      <div className="space-y-7 px-5 pb-12">
        <PillRow
          label="Frequency"
          options={FREQUENCY}
          value={frequency}
          onChange={setFrequency}
        />

        <PillRow
          label="Tone"
          options={TONE}
          value={tone}
          onChange={setTone}
          disabled={polarisOff}
        />

        <section>
          <p className="text-label-mono">Surfaces</p>
          <ul className="mt-2 flex flex-col gap-2">
            <ToggleRow
              label="Chat insights"
              sub="Editorial notes on patterns Polaris notices"
              on={surfaces.chatInsights}
              onChange={setSurface("chatInsights")}
              disabled={polarisOff}
            />
            <ToggleRow
              label="Conversation flags"
              sub="Quiet pauses when something feels off"
              on={surfaces.conversationFlags}
              onChange={setSurface("conversationFlags")}
              disabled={polarisOff}
            />
            <ToggleRow
              label="Pre-meeting notes"
              sub="A short read before you meet in person"
              on={surfaces.preMeetingNotes}
              onChange={setSurface("preMeetingNotes")}
              disabled={polarisOff}
            />
            <ToggleRow
              label="Repair noticing"
              sub="A nudge after a missed beat or rupture"
              on={surfaces.repairNoticing}
              onChange={setSurface("repairNoticing")}
              disabled={polarisOff}
            />
          </ul>
        </section>

        {polarisOff && (
          <p className="font-body text-[13px] italic leading-relaxed text-stone">
            Off means Polaris stops generating new insights — your past
            ones stay readable.
          </p>
        )}
      </div>
    </YouBackdrop>
  );
}
