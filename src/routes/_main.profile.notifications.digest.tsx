import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, X } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/profile/notifications/digest")({
  head: () => ({ meta: [{ title: "Daily digest — COUPL" }] }),
  component: DigestScreen,
});

type DigestState = "off" | "morning" | "evening";

const STATE_LABEL: Record<DigestState, string> = {
  off: "Off",
  morning: "Morning (08:00)",
  evening: "Evening (18:00)",
};

const CONTENTS = [
  "Connection moments — replies, repair, plan-making.",
  "Polaris signals — what's been worth noticing this day.",
  "Scheduled date plans — what's coming up.",
];

function DigestScreen() {
  const [state, setState] = useState<DigestState>("morning");
  const [previewOpen, setPreviewOpen] = useState(false);

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile/notifications/channels"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Notifications · digest</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          One email a day, instead of pings.
        </h1>
      </header>

      <section className="px-5">
        <div className="rounded-[14px] bg-paper px-4 py-4 shadow-elev-1">
          <p className="text-label-mono">When it lands</p>
          <div className="mt-3 flex gap-1.5" role="radiogroup" aria-label="Digest schedule">
            {(Object.keys(STATE_LABEL) as DigestState[]).map((s) => {
              const active = state === s;
              return (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setState(s)}
                  className={
                    active
                      ? "flex-1 rounded-full bg-plum-700 px-3 py-1.5 text-label-mono text-paper"
                      : "flex-1 rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-slate hover:bg-lavender-50"
                  }
                >
                  {STATE_LABEL[s]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-5 pt-7">
        <p className="text-label-mono">What goes in it</p>
        <ul className="mt-3 space-y-2 font-body text-[13.5px] leading-relaxed text-ink">
          {CONTENTS.map((line) => (
            <li key={line} className="flex items-start gap-2">
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-plum-500" />
              {line}
            </li>
          ))}
        </ul>
      </section>

      <div className="px-5 pt-7 pb-12">
        <button
          type="button"
          onClick={() => setPreviewOpen(true)}
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          See an example
        </button>
      </div>

      {previewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40"
          onClick={() => setPreviewOpen(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-md rounded-t-3xl bg-paper px-6 pb-8 pt-4"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="digest-preview-title"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-label-mono text-stone">PREVIEW</span>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setPreviewOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-full text-slate hover:bg-lavender-100"
              >
                <X size={16} />
              </button>
            </div>
            <p className="text-label-mono">From COUPL · Tuesday morning</p>
            <h2 id="digest-preview-title" className="mt-1 font-display text-[20px] leading-tight text-ink">
              A quiet morning round-up.
            </h2>
            <div className="mt-4 space-y-3 font-body text-[13.5px] leading-relaxed text-ink">
              <p>
                <span className="font-display">Connections —</span> Sam replied to your message from
                Monday evening. River and Alex are both on quiet days; nothing pressing.
              </p>
              <p>
                <span className="font-display">Polaris noticed —</span> a slow rhythm with River
                this week, and the repair you offered Sam after Sunday's mismatch.
              </p>
              <p>
                <span className="font-display">Coming up —</span> coffee with Sam, Thursday 18:30,
                Lantern Hill.
              </p>
            </div>
            <p className="mt-5 font-body text-[12px] italic text-stone">
              That's it for today. We'll send tomorrow's at 08:00.
            </p>
          </div>
        </div>
      )}
    </YouBackdrop>
  );
}
