import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

import { cn } from "@/lib/utils";

type TitleSize = "24" | "26" | "28";
type TitleWeight = "normal" | "semibold";

type StaticBackLink = {
  to:
    | "/connections"
    | "/discover"
    | "/polaris"
    | "/polaris/chat"
    | "/profile"
    | "/profile/help"
    | "/profile/safety";
  label?: string;
};

type IdBackLink = {
  to: "/connections/$id" | "/connections/$id/date-plan" | "/discover/$id";
  params: { id: string };
  label?: string;
};

type Props = {
  backLink: StaticBackLink | IdBackLink;
  eyebrow: string;
  title: ReactNode;
  titleSize?: TitleSize;
  titleWeight?: TitleWeight;
};

const TITLE_SIZE: Record<TitleSize, string> = {
  "24": "text-[24px]",
  "26": "text-[26px]",
  "28": "text-[28px]",
};

const TITLE_WEIGHT: Record<TitleWeight, string> = {
  normal: "",
  semibold: "font-semibold",
};

export function ProfileScreenHeader({
  backLink,
  eyebrow,
  title,
  titleSize = "24",
  titleWeight = "semibold",
}: Props) {
  return (
    <>
      <header className="flex items-center gap-3">
        {"params" in backLink ? (
          <Link
            to={backLink.to}
            params={backLink.params}
            aria-label={backLink.label ?? "Back"}
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        ) : (
          <Link
            to={backLink.to}
            aria-label={backLink.label ?? "Back"}
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        )}
        <p className="text-label-mono">{eyebrow}</p>
      </header>
      <h1
        className={cn(
          "mt-3 font-display leading-tight text-ink",
          TITLE_SIZE[titleSize],
          TITLE_WEIGHT[titleWeight],
        )}
      >
        {title}
      </h1>
    </>
  );
}
