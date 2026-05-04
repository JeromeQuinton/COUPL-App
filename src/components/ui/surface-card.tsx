import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SurfaceCardProps extends React.HTMLAttributes<HTMLDivElement> {
  asArticle?: boolean;
}

const SURFACE_CARD_CLASSES =
  "rounded-[14px] border-line bg-paper shadow-elev-1";
const SURFACE_CARD_CONTENT_CLASSES = "px-4 py-3.5";

export function SurfaceCard({
  className,
  children,
  asArticle,
  ...props
}: SurfaceCardProps) {
  const cardClassName = cn(SURFACE_CARD_CLASSES, className);

  if (asArticle) {
    return (
      <Card asChild className={cardClassName} {...props}>
        <article>
          <CardContent className={SURFACE_CARD_CONTENT_CLASSES}>
            {children}
          </CardContent>
        </article>
      </Card>
    );
  }

  return (
    <Card className={cardClassName} {...props}>
      <CardContent className={SURFACE_CARD_CONTENT_CLASSES}>
        {children}
      </CardContent>
    </Card>
  );
}
