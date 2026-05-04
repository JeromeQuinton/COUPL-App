import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Camera, BadgeCheck, ScanFace, Globe } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

/**
 * /profile/verification/refresh — re-run a verification check.
 *
 * Stream-9 implied a Refresh affordance per row. This is the flow
 * underneath. Pick a check, see what's about to happen, run it.
 * Phase 1 simulates a 2s pass.
 *
 * Stream-19 SCREEN-13.
 */
export const Route = createFileRoute("/_main/profile/verification/refresh")({
  head: () => ({ meta: [{ title: "Refresh verification — COUPL" }] }),
  component: RefreshScreen,
});

type Check = "photo" | "id" | "selfie" | "social";

const ROWS: { id: Check; icon: typeof Camera; label: string; helper: string }[] = [
  { id: "photo", icon: Camera, label: "Photo check", helper: "Confirms your photos still match." },
  { id: "id", icon: BadgeCheck, label: "Government ID", helper: "Re-reads your document. Held privately." },
  { id: "selfie", icon: ScanFace, label: "Liveness selfie", helper: "Quick three-frame check." },
  { id: "social", icon: Globe, label: "Social link", helper: "Re-confirms your linked profile." },
];

function RefreshScreen() {
  const [active, setActive] = useState<Check | null>(null);
  const [done, setDone] = useState<Check | null>(null);

  const run = (c: Check) => {
    setActive(c);
    setDone(null);
    window.setTimeout(() => {
      setActive(null);
      setDone(c);
    }, 2000);
  };

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link to="/profile/verification" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader
          eyebrow="Verification · refresh"
          title="Quiet credibility."
          titleItalic
        />
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          Pick a check to re-run. Other people see what we've checked, never the
          details.
        </p>
      </header>

      <ul className="px-5 pb-12 space-y-2.5">
        {ROWS.map((r) => {
          const Icon = r.icon;
          const isActive = active === r.id;
          const isDone = done === r.id;
          return (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => run(r.id)}
                disabled={isActive}
                className="flex w-full items-start gap-3 rounded-[14px] bg-paper px-4 py-3.5 text-left shadow-elev-1 transition-colors hover:bg-lavender-50 disabled:opacity-60"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-lavender-100 text-plum-700">
                  <Icon size={16} strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[15px] text-ink">{r.label}</p>
                  <p className="mt-0.5 font-body text-[12px] text-stone">{r.helper}</p>
                  {isActive && (
                    <p className="mt-2 font-body text-[12px] italic text-plum-500">Running check…</p>
                  )}
                  {isDone && (
                    <p className="mt-2 font-body text-[12px] italic text-success">Re-checked just now.</p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </YouBackdrop>
  );
}
