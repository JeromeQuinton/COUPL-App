import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";

export const PrimaryButton = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "variant">
>((props, ref) => <Button ref={ref} variant="commit" {...props} />);
PrimaryButton.displayName = "PrimaryButton";
