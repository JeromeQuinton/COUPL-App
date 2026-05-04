import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type EyebrowToTitleSpacing = 1 | 2 | 3 | 4 | 5 | 6;

type Props = {
  eyebrow?: string;
  title: ReactNode;
  mt?: EyebrowToTitleSpacing;
};

const EYEBROW_TYPOGRAPHY =
  "font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-plum-500";

const TITLE_TYPOGRAPHY =
  "font-display text-[26px] font-semibold leading-tight text-ink";

const MT_CLASS: Record<EyebrowToTitleSpacing, string> = {
  1: "mt-1",
  2: "mt-2",
  3: "mt-3",
  4: "mt-4",
  5: "mt-5",
  6: "mt-6",
};

export function HubScreenHeader({ eyebrow, title, mt = 2 }: Props) {
  return (
    <>
      {eyebrow && <p className={EYEBROW_TYPOGRAPHY}>{eyebrow}</p>}
      <h1 className={cn(eyebrow && MT_CLASS[mt], TITLE_TYPOGRAPHY)}>{title}</h1>
    </>
  );
}
