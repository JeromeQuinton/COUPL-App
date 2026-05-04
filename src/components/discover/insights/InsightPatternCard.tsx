import {
  RelationalBand,
  type RelationalBandLabel,
} from "@/components/discover/profile/RelationalBand";

type Props = {
  title: string;
  /** Descriptive band label — never a number. R4 Stream 1.4, DR-103. */
  band: RelationalBandLabel;
  body: string;
};

/**
 * Pattern card used inside any RelationalInsightExplainer.
 * Paper surface with plum-300 hairline. The right gutter now carries a
 * descriptive band label; the prior numeric score has been removed per
 * the charter (R4 Stream 1.4, DR-103).
 */
export function InsightPatternCard({ title, band, body }: Props) {
  return (
    <article
      className="rounded-[16px] border border-plum-300/35 px-4 py-3 shadow-elev-1 backdrop-blur-sm"
      style={{
        background:
          "linear-gradient(150deg, var(--paper) 0%, color-mix(in oklab, var(--lavender-50) 70%, var(--paper)) 100%)",
      }}
    >
      <header className="flex items-baseline justify-between gap-3">
        <h3 className="font-display text-[17px] leading-tight text-ink">
          {title}
        </h3>
      </header>
      <div className="mt-2">
        <RelationalBand label={band} />
      </div>
      <p className="mt-2 text-[13px] leading-snug text-slate">{body}</p>
    </article>
  );
}
