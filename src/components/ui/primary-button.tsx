import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PRIMARY_BUTTON_CLASSES =
  "h-auto rounded-full bg-plum-700 px-5 py-3 font-display text-[14.5px] font-medium text-paper shadow-elev-1 hover:bg-plum-700 hover:opacity-90";

export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      className={cn(PRIMARY_BUTTON_CLASSES, className)}
      {...props}
    />
  ),
);
PrimaryButton.displayName = "PrimaryButton";
