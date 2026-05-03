import type { ReactNode } from "react";

/** Shared full-screen auth chrome — gradient background + centred card. */
export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div
      className="flex min-h-[100dvh] items-center justify-center px-5 py-10"
      style={{
        background:
          "linear-gradient(160deg, color-mix(in oklab, var(--lavender-100) 70%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 55%, var(--paper)) 100%)",
      }}
    >
      <div className="mx-auto w-full max-w-[420px] rounded-[24px] bg-paper p-8 shadow-elev-1">
        {children}
      </div>
    </div>
  );
}
