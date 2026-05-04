import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Image, MessageSquare, Mic, X } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { TraumaPause } from "@/components/safety/TraumaPause";
import type { EvidenceKind, ReportEvidence } from "@/data/safety_sample";

export const Route = createFileRoute(
  "/_main/profile/safety/report/$reportId_/evidence",
)({
  head: () => ({ meta: [{ title: "Add evidence — COUPL" }] }),
  component: EvidenceScreen,
});

const TILES: { kind: EvidenceKind; label: string; hint: string; Icon: typeof Image }[] = [
  { kind: "screenshot", label: "Screenshot", hint: "From your camera roll.", Icon: Image },
  { kind: "excerpt", label: "Message excerpt", hint: "Paste or quote a passage.", Icon: MessageSquare },
  { kind: "voice", label: "Voice memo", hint: "Up to two minutes.", Icon: Mic },
];

function EvidenceScreen() {
  const navigate = useNavigate();
  const [items, setItems] = useState<ReportEvidence[]>([]);

  const addStub = (kind: EvidenceKind, label: string) =>
    setItems((xs) => [
      ...xs,
      { id: `e-${Date.now()}`, kind, label, capturedAt: new Date().toISOString() },
    ]);

  const remove = (id: string) => setItems((xs) => xs.filter((x) => x.id !== id));

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile/safety/report"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Safety · evidence (optional)</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Add anything that might help us look into this.
        </h1>
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="font-body text-[14px] leading-relaxed text-ink">
            You can share screenshots, message excerpts, or a voice note. If
            that feels like too much right now, you can skip this step and
            come back later. What you've already told us is enough to start.
          </p>
        </article>
      </section>

      <section className="px-5 pt-5">
        <div className="rounded-[14px] border border-line bg-blush/40 px-4 py-3">
          <p className="font-body text-[13px] leading-relaxed text-ink">
            Please don't take extra risks to collect evidence. Your safety
            matters more than the report.
          </p>
        </div>
      </section>

      <section className="px-5 pt-7">
        <p className="text-label-mono">Add evidence</p>
        <ul className="mt-3 grid grid-cols-3 gap-2.5">
          {TILES.map(({ kind, label, hint, Icon }) => (
            <li key={kind}>
              <button
                type="button"
                onClick={() => addStub(kind, label)}
                className="flex w-full flex-col items-start gap-2 rounded-[14px] border border-line bg-paper px-3 py-3.5 text-left hover:bg-lavender-50"
              >
                <Icon size={18} strokeWidth={1.75} className="text-plum-500" />
                <span className="font-display text-[13.5px] font-medium text-ink">
                  {label}
                </span>
                <span className="font-body text-[11.5px] text-stone">
                  {hint}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {items.length > 0 && (
        <section className="px-5 pt-6">
          <p className="text-label-mono">Attached</p>
          <ul className="mt-3 space-y-2">
            {items.map((it) => (
              <li
                key={it.id}
                className="flex items-center justify-between gap-3 rounded-[12px] bg-paper px-3 py-2.5 shadow-elev-1"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid h-9 w-9 place-items-center rounded-[10px] bg-lavender-50 text-plum-700"
                  >
                    {it.kind === "screenshot" && <Image size={16} strokeWidth={1.75} />}
                    {it.kind === "excerpt" && <MessageSquare size={16} strokeWidth={1.75} />}
                    {it.kind === "voice" && <Mic size={16} strokeWidth={1.75} />}
                  </span>
                  <div>
                    <p className="font-display text-[13.5px] text-ink">{it.label}</p>
                    <p className="font-body text-[11.5px] text-stone">
                      Ready to send
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => remove(it.id)}
                  aria-label={`Remove ${it.label}`}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-stone hover:bg-lavender-50"
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="px-5 pt-8">
        <TraumaPause />
      </section>

      <div className="px-5 pt-8 pb-12 space-y-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/profile/safety/cases" })}
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Continue
        </button>
        <button
          type="button"
          onClick={() => navigate({ to: "/profile/safety/cases" })}
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Skip evidence — submit anyway
        </button>
      </div>
    </YouBackdrop>
  );
}
