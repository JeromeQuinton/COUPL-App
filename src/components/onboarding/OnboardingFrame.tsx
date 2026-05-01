import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

type Props = {
  /** Render a peach gradient wash in the top-left corner (splash only). */
  showBlush?: boolean;
  /** Back-link target. Omit to hide the back chrome (splash). */
  backTo?: string;
  /** Page body. */
  children: ReactNode;
  /** Sticky footer (CTA area). */
  footer?: ReactNode;
};

/**
 * Shared chrome for the new onboarding chapter (screens 1–9).
 *
 * Mobile-first frame, max-width 640px, white paper surface (the design
 * reference shows white screens with an optional peach corner wash on
 * the splash). The OnboardingShell that lives alongside this is the
 * older "$step" flow and is intentionally untouched.
 */
export function OnboardingFrame({
  showBlush = false,
  backTo,
  children,
  footer,
}: Props) {
  return (
    <div className="relative mx-auto flex min-h-screen max-w-[640px] flex-col bg-paper">
      {showBlush ? (
        <div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 h-72 w-72 -translate-x-1/4 -translate-y-1/4 rounded-full"
          style={{
            background:
              "radial-gradient(closest-side, rgba(244, 225, 204, 0.95), rgba(244, 225, 204, 0))",
          }}
        />
      ) : null}

      {backTo ? (
        <header className="relative z-10 px-6 pt-5">
          <Link
            to={backTo}
            className="-ml-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-body-md text-ink transition-colors hover:bg-cloud"
            aria-label="Go back"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden />
            <span>Back</span>
          </Link>
        </header>
      ) : null}

      <main
        className="relative z-10 flex-1 px-6 pb-10 pt-6"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)" }}
      >
        {children}
      </main>

      {footer ? (
        <footer
          className="relative z-10 px-6"
          style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)" }}
        >
          {footer}
        </footer>
      ) : null}
    </div>
  );
}