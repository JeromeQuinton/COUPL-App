import { SectionCard } from "./SectionCard";
import { InfoButton } from "@/components/discover/InfoButton";
import { useParams } from "@tanstack/react-router";
import { bandLabelFor } from "@/components/discover/profile/RelationalBand";

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
    secondary?: string;
    primaryStrength: number;
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
    secondary?: string;
    primaryStrength: number;
  };
}) {
  const v = Math.max(0, Math.min(100, data.primaryStrength));
  // Read the profile id from the parent detail route. `strict: false`
  // so this card stays mountable in storybook / non-route contexts.
  const params = useParams({ strict: false });
  const profileId = (params as { id?: string }).id;
  const explainerPath = profileId
    ? `/discover/${profileId}/insights/connection-languages`
    : undefined;
  return (
    <div className="flex flex-col gap-2">
      <h3 className="inline-flex items-center gap-1.5 font-display text-[14px] font-semibold text-plum-700">
        Connection Language
        <InfoButton
          termKey="connection_language"
          navigateTo={explainerPath}
        />
      </h3>

      <div className="flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-lavender-100 px-3 py-1.5 font-body text-[12px] font-medium text-plum-700">
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full bg-plum-500"
          />
          {data.primary}
          <span className="sr-only"> (primary)</span>
        </span>
        {data.secondary ? (
          <span className="inline-flex items-center rounded-full bg-lavender-100 px-3 py-1.5 font-body text-[12px] font-medium text-plum-700">
            {data.secondary}
          </span>
        ) : null}
      </div>

      <div className="mt-2 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-stone">
            Primary signal
          </span>
          <span className="font-display text-[12.5px] italic text-plum-700">
            {bandLabelFor(v)}
          </span>
        </div>
      </div>
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