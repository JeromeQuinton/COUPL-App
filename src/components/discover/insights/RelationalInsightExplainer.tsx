import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

type Props = {
  /** Eyebrow label, e.g. "CONNECTION LANGUAGES". Auto-uppercased by token. */
  eyebrow: string;
  title: string;
  intro: string;
  /** Back link node — caller owns routing so params stay type-safe. */
  backLink: ReactNode;
  children: ReactNode;
};

/**
 * Layout shell for any Relational Insight explainer (Connection Languages,
 * Attachment Style, Values, Empathy, Communication). Premium psychology
 * surface — soft lavender/blush wash, editorial serif title, calm tone.
 * Children compose the chart + pattern cards.
 */
export function RelationalInsightExplainer({
  eyebrow,
  title,
  intro,
  backLink,
  children,
}: Props) {
  return (
    <div
      className="relative px-5"
      style={{
        minHeight: "100dvh",
        paddingTop: "calc(env(safe-area-inset-top) + 1rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 120px)",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--lavender-100) 55%, var(--blush)) 0%, color-mix(in oklab, var(--blush) 65%, var(--lavender-50)) 55%, color-mix(in oklab, var(--lavender-50) 80%, var(--paper)) 100%)",
      }}
    >
      {/* Ambient blooms */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
        style={{
          background:
            "radial-gradient(120% 80% at 90% 0%, color-mix(in oklab, var(--lavender-100) 85%, transparent) 0%, color-mix(in oklab, var(--lavender-50) 35%, transparent) 40%, transparent 75%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[420px]"
        style={{
          background:
            "radial-gradient(110% 70% at 10% 100%, color-mix(in oklab, var(--blush) 75%, transparent) 0%, color-mix(in oklab, var(--plum-300) 20%, transparent) 35%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[440px]">
        {backLink}

        <header className="mt-4">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.18em] text-plum-500">
            {eyebrow}
          </p>
          <h1 className="mt-2 text-display-lg leading-[1.05] text-ink">
            {title}
          </h1>
          <p className="mt-2.5 max-w-[360px] text-body-sm leading-relaxed text-slate">
            {intro}
          </p>
        </header>

        <div className="mt-5 space-y-3 pb-4">{children}</div>
      </div>
    </div>
  );
}

/**
 * Convenience helper — pre-styled back link in the explainer's
 * idiom. Caller provides the `to`/`params`/`label`.
 */
export function ExplainerBackLink({
  to,
  params,
  label = "Profile",
}: {
  // Loosely typed so the helper is reusable across explainer routes.
  // Type-safety lives at the call site via the consuming `<Link>`.
  to: string;
  params?: Record<string, string>;
  label?: string;
}) {
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params={params as any}
      className="-ml-2 inline-flex items-center gap-1 rounded-md px-2 py-1 text-body-md text-ink hover:bg-paper/60"
      aria-label={`Back to ${label}`}
    >
      <ChevronLeft className="h-4 w-4" aria-hidden />
      <span>{label}</span>
    </Link>
  );
}