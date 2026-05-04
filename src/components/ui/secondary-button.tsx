import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";

export const SecondaryButton = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "variant">
>((props, ref) => <Button ref={ref} variant="secondary-cta" {...props} />);
SecondaryButton.displayName = "SecondaryButton";
