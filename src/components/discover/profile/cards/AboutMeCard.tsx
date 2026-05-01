import type { PacingValue } from "@/data/discover_profile_detail_sample";
import { InfoButton } from "@/components/discover/InfoButton";

/**
 * About Me card (DR-042). No header. First sentence of bio renders as
 * a Fraunces italic pull-quote; the remainder renders as Inter body.
 * "What they're seeking" continues to render below as a labelled
 * sub-section. Bio source data is never mutated — parsing happens
 * in render only.
 *
 * DR-055: chip pair header (intent + pacing) lives at the top of this
 * card, replacing the deleted StandfirstStrip. Pacing chip wraps an
 * <InfoButton termKey="pacing"/> per DR-052; intent is non-tappable.
 * Lavender chip class string lifted verbatim per R1; dot glyph spec
 * preserved per DR-043 with sr-only a11y parity per R2.
 */

const PACING_DOTS: Record<PacingValue, number> = {
  "Slow & deliberate": 1,
  "Open to depth": 2,
  "In the moment": 3,
};

const DOT_WORDS = ["one-dot", "two-dot", "three-dot"] as const;

function splitFirstSentence(text: string): { lead: string; rest: string } {
  const trimmed = text.trim();
  // First period followed by whitespace OR end-of-string.
  const match = trimmed.match(/^(.+?[.!?])(\s+|$)/);
  if (!match) return { lead: trimmed, rest: "" };
  const lead = match[1];
  const rest = trimmed.slice(match[0].length).trim();
  return { lead, rest };
}

export function AboutMeCard({
  bio,
  seeking,
  intent,
  pacing,
}: {
  bio: string;
  seeking: string;
  intent: string;
  pacing: PacingValue;
}) {
  const { lead, rest } = splitFirstSentence(bio);
  const dots = PACING_DOTS[pacing] ?? 2;
  const rhythmWord = DOT_WORDS[dots - 1];
  return (
    <section className="rounded-[20px] bg-blush p-5 shadow-elev-1">
      <div className="flex flex-col" style={{ gap: "14px" }}>
        <div className="flex items-center justify-between" style={{ gap: "8px", marginBottom: "2px" }}>
          <span className="bg-blush px-3 py-1.5 text-[12px] font-medium text-ink rounded-full">
            {intent}
          </span>
          <span className="bg-blush px-3 py-1.5 text-[12px] font-medium text-ink rounded-full inline-flex items-center gap-1.5">
            <span>{pacing}</span>
            <span
              aria-hidden
              className="inline-flex items-center"
              style={{ gap: "3px" }}
            >
              {Array.from({ length: dots }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    width: "4px",
                    height: "4px",
                    borderRadius: "9999px",
                    background: "#6B21A8",
                  }}
                />
              ))}
            </span>
            <span className="sr-only">{`Pacing: ${pacing} (${rhythmWord} rhythm)`}</span>
            <InfoButton termKey="pacing" />
          </span>
        </div>
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "22px",
            lineHeight: 1.3,
            letterSpacing: "-0.01em",
            color: "#0D0020",
          }}
        >
          {lead}
        </p>
        {rest ? (
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "#0D0020",
            }}
          >
            {rest}
          </p>
        ) : null}
        <div className="mt-2">
          <h3 className="font-display text-[13px] font-semibold text-ink">
            What they're seeking in a partner
          </h3>
          <p className="mt-1 font-body text-[14px] leading-relaxed text-ink">
            {seeking}
          </p>
        </div>
      </div>
    </section>
  );
}