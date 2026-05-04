import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SECONDARY_BUTTON_CLASSES =
  "h-auto rounded-full bg-pink-50 px-5 py-3 font-display text-[14.5px] font-medium text-plum-700 shadow-none hover:bg-pink-100";

export const SecondaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      className={cn(SECONDARY_BUTTON_CLASSES, className)}
      {...props}
    />
  ),
);
SecondaryButton.displayName = "SecondaryButton";
