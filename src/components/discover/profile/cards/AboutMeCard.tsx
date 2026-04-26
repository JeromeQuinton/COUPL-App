/**
 * About Me card (DR-042). No header. First sentence of bio renders as
 * a Fraunces italic pull-quote; the remainder renders as Inter body.
 * "What they're seeking" continues to render below as a labelled
 * sub-section. Bio source data is never mutated — parsing happens
 * in render only.
 */
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
}: {
  bio: string;
  seeking: string;
}) {
  const { lead, rest } = splitFirstSentence(bio);
  return (
    <section className="rounded-[20px] bg-paper p-5 shadow-elev-1">
      <div className="flex flex-col" style={{ gap: "14px" }}>
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
          <h3 className="font-display text-[13px] font-semibold text-plum-700">
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