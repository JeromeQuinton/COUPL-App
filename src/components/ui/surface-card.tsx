import * as React from "react";

import { cn } from "@/lib/utils";

interface SurfaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  asArticle?: boolean;
}

const SURFACE_CARD_CLASSES =
  "rounded-[14px] border border-line bg-paper px-4 py-3.5";

export function SurfaceCard({
  className,
  children,
  asArticle,
  ...props
}: SurfaceCardProps) {
  const Tag = asArticle ? "article" : "div";
  return (
    <Tag className={cn(SURFACE_CARD_CLASSES, className)} {...props}>
      {children}
    </Tag>
  );
}
