/**
 * Connection avatar — circular initial chip with a hue-driven gradient.
 * Used in thread headers, connection list cards, and ending flow.
 */
type Props = {
  initial: string;
  hue: "lavender" | "blush" | "beeswax" | "plum";
  size?: number;
};

const HUE_BG: Record<Props["hue"], string> = {
  lavender:
    "linear-gradient(145deg, var(--lavender-100) 0%, var(--plum-300) 100%)",
  blush:
    "linear-gradient(145deg, color-mix(in oklab, var(--blush) 80%, var(--paper)) 0%, var(--plum-300) 100%)",
  beeswax:
    "linear-gradient(145deg, var(--beeswax-100) 0%, var(--beeswax-300) 100%)",
  plum: "linear-gradient(145deg, var(--plum-300) 0%, var(--plum-700) 100%)",
};

const HUE_TEXT: Record<Props["hue"], string> = {
  lavender: "text-white",
  blush: "text-white",
  beeswax: "text-plum-700",
  plum: "text-white",
};

export function ConnectionAvatar({ initial, hue, size = 40 }: Props) {
  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold ${HUE_TEXT[hue]}`}
      style={{
        width: size,
        height: size,
        background: HUE_BG[hue],
        fontSize: Math.round(size * 0.4),
      }}
    >
      {initial}
    </span>
  );
}