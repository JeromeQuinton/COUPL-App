import { cn } from "@/lib/utils";

type EyebrowTone = "plum" | "stone";
type TitleSize = "display" | "display-xl";

type Props = {
  eyebrow?: string;
  title: string;
  eyebrowTone?: EyebrowTone;
  titleSize?: TitleSize;
};

const EYEBROW_TYPOGRAPHY =
  "font-mono text-[11px] uppercase tracking-[0.12em] leading-[1.3]";

const EYEBROW_TONE: Record<EyebrowTone, string> = {
  plum: "text-plum-500",
  stone: "text-stone",
};

const TITLE_TYPOGRAPHY: Record<TitleSize, string> = {
  display: "font-display text-[28px] leading-tight",
  "display-xl": "text-display-xl",
};

export function ScreenHeader({
  eyebrow,
  title,
  eyebrowTone = "plum",
  titleSize = "display",
}: Props) {
  return (
    <>
      {eyebrow && (
        <p className={cn(EYEBROW_TYPOGRAPHY, EYEBROW_TONE[eyebrowTone])}>
          {eyebrow}
        </p>
      )}
      <h1
        className={cn(
          eyebrow && "mt-3",
          TITLE_TYPOGRAPHY[titleSize],
          "text-ink",
        )}
      >
        {title}
      </h1>
    </>
  );
}
