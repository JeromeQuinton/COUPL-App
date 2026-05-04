import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type TitleSize = "26" | "28";
type EyebrowTone = "plum-500" | "plum-700";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  titleSize?: TitleSize;
  eyebrowTone?: EyebrowTone;
};

const EYEBROW_TYPOGRAPHY =
  "text-[10.5px] font-medium uppercase tracking-[0.28em]";

const EYEBROW_TONE: Record<EyebrowTone, string> = {
  "plum-500": "text-plum-500",
  "plum-700": "text-plum-700",
};

const TITLE_SIZE: Record<TitleSize, string> = {
  "26": "text-[26px]",
  "28": "text-[28px]",
};

export function PolarisHeader({
  eyebrow,
  title,
  titleSize = "28",
  eyebrowTone = "plum-500",
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
          "font-display leading-[1.15] text-ink",
          TITLE_SIZE[titleSize],
        )}
      >
        {title}
      </h1>
    </>
  );
}
