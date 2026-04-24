import type { ReactNode } from "react";

/**
 * Shared card shell for /discover/[id] sections.
 * Provides consistent rounding, padding, paper background and elevation
 * so each card body can focus on its own content.
 */
export function SectionCard({
  title,
  subtitle,
  trailing,
  children,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  trailing?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-[20px] bg-paper p-5 shadow-elev-1">
      <header className="mb-3 flex items-start justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="font-display text-[16px] font-semibold leading-tight text-ink">
            {title}
          </h2>
          {subtitle ? (
            <p className="font-body text-[12px] text-slate">{subtitle}</p>
          ) : null}
        </div>
        {trailing ?? null}
      </header>
      {children}
    </section>
  );
}