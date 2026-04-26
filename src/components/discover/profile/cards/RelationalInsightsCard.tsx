import { SectionCard } from "./SectionCard";
import { InfoButton } from "@/components/discover/InfoButton";

/**
 * Card 7 — Relational Insights. Composes two sub-cards:
 *   7a) Connection Language (DR-010 — never "Love Language")
 *   7b) Attachment Style
 */
export function RelationalInsightsCard({
  connectionLanguage,
  attachmentStyle,
}: {
  connectionLanguage: {
    primary: string;
    primaryValue: number;
    secondary: string;
    observation: string;
  };
  attachmentStyle: { label: string; leaning: string; chips: string[] };
}) {
  return (
    <SectionCard title="Relational Insights">
      <div className="flex flex-col gap-4">
        <ConnectionLanguageSubCard data={connectionLanguage} />
        <div className="h-px w-full bg-line/60" />
        <AttachmentStyleSubCard data={attachmentStyle} />
      </div>
    </SectionCard>
  );
}

// TODO: replace "Quality Time" and "Words" with Connection Language
// categories (Verbal Presence, Practical Care, Tokens & Gestures,
// Shared Attention, Physical Attunement, Emotional Co-regulation)
// post-DR-015 psych advisor sign-off.
function ConnectionLanguageSubCard({
  data,
}: {
  data: {
    primary: string;
    primaryValue: number;
    secondary: string;
    observation: string;
  };
}) {
  const v = Math.max(0, Math.min(100, data.primaryValue));
  return (
    <div className="flex flex-col gap-2">
      <h3 className="inline-flex items-center gap-1.5 font-display text-[14px] font-semibold text-plum-700">
        Connection Language
        <InfoButton termKey="connection_language" />
      </h3>
      <p className="font-body text-[13px] text-ink">
        Primary: <span className="font-medium">{data.primary}</span> — {v}%
      </p>
      <div
        className="relative h-2 w-full overflow-hidden rounded-full bg-lavender-100"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={v}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            width: `${v}%`,
            background:
              "linear-gradient(90deg, var(--plum-300) 0%, var(--plum-500) 100%)",
          }}
        />
      </div>
      <div className="mt-1 flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-plum-500" />
          <span className="font-body text-[12px] text-ink">{data.primary}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full border border-plum-500" />
          <span className="font-body text-[12px] text-ink">{data.secondary}</span>
        </div>
      </div>
      <p className="mt-1 font-body text-[12px] italic text-stone">{data.observation}</p>
    </div>
  );
}

function AttachmentStyleSubCard({
  data,
}: {
  data: { label: string; leaning: string; chips: string[] };
}) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="inline-flex items-center gap-1.5 font-display text-[14px] font-semibold text-plum-700">
        Attachment Style
        <InfoButton termKey="attachment_style" />
      </h3>
      <p className="font-body text-[13px] text-ink">
        <span className="font-medium">{data.label}</span> — {data.leaning}
      </p>
      <div className="flex flex-wrap gap-2">
        {data.chips.map((c) => (
          <span
            key={c}
            className="inline-flex items-center rounded-full bg-lavender-100 px-3 py-1 font-body text-[12px] font-medium text-plum-700"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}