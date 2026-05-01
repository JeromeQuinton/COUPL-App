import { type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

/**
 * Onboarding CTA button. Two flavours, both 48px tall, 12px radius,
 * matching the visual reference for the splash and step footers.
 *
 * The reference predates DR-BRAND-V2-B's ink-CTA reskin — onboarding
 * chapter retains plum to anchor the brand identity introduction.
 */
export const OnboardingButton = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", className, children, ...rest }, ref) => {
    const base =
      "flex h-12 w-full items-center justify-center rounded-[12px] text-body-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-300 disabled:cursor-not-allowed disabled:opacity-60";
    const styles =
      variant === "primary"
        ? "bg-plum-500 text-paper shadow-elev-1 hover:bg-plum-700"
        : "border border-line bg-paper text-ink hover:bg-cloud";
    return (
      <button ref={ref} className={cn(base, styles, className)} {...rest}>
        {children}
      </button>
    );
  },
);
OnboardingButton.displayName = "OnboardingButton";