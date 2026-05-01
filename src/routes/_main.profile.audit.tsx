import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Eye, Heart, MessageCircle, Sparkles, ShieldCheck, Lock } from "lucide-react";
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { AUDIT_ENTRIES, VISIBILITY_STATS } from "@/data/you_sample";

export const Route = createFileRoute("/_main/profile/audit")({
  head: () => ({ meta: [{ title: "Visibility audit · COUPL" }] }),
  component: AuditPage,
});

const TYPE_ICON: Record<string, ComponentType<LucideProps>> = {
  view: Eye,
  attune: Heart,
  coach: Sparkles,
  prompt: Lock,
  moderation: ShieldCheck,
  trust: ShieldCheck,
};

function AuditPage() {
  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile"
            aria-label="Back to You"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
        trailing={<span className="font-body text-[12.5px] font-medium text-stone">Settings</span>}
      />

      <header className="px-5 pt-2 pb-5">
        <p className="font-body text-[11px] font-semibold uppercase tracking-[0.16em] text-plum-500">
          {VISIBILITY_STATS.windowLabel}
        </p>
        <h1 className="mt-2 font-display text-[26px] font-semibold leading-tight text-ink">
          Who saw you, and when.
        </h1>
        <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
          Every profile view, every photo unlock, every coach prompt that
          mentioned you. You see all of it.
        </p>
      </header>

      {/* Stats strip */}
      <section className="px-5">
        <div className="flex items-stretch justify-between gap-3 rounded-[16px] bg-paper p-4 shadow-elev-1">
          <Stat n={VISIBILITY_STATS.profileViews} label="profile views" />
          <span aria-hidden className="w-px bg-line" />
          <Stat n={VISIBILITY_STATS.attunesReceived} label="attunes received" />
          <span aria-hidden className="w-px bg-line" />
          <Stat n={VISIBILITY_STATS.conversations} label="conversations" />
        </div>
      </section>

      {/* Timeline */}
      <section className="px-5 pt-6 pb-12">
        <ul className="flex flex-col">
          {AUDIT_ENTRIES.map((e, i) => {
            const Icon = TYPE_ICON[e.type] ?? MessageCircle;
            return (
              <li key={e.id} className="relative flex gap-3 py-3.5">
                {/* Rail */}
                <div className="flex flex-col items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lavender-100">
                    <Icon size={14} strokeWidth={1.75} className="text-plum-700" />
                  </span>
                  {i < AUDIT_ENTRIES.length - 1 && (
                    <span aria-hidden className="mt-1 w-px flex-1 bg-line" />
                  )}
                </div>
                <div className="flex-1 pb-1">
                  <p className="font-display text-[14.5px] font-medium leading-snug text-ink">
                    {e.title}
                    {e.detail ? (
                      <span className="font-body text-[13px] font-normal text-slate"> {e.detail}</span>
                    ) : null}
                  </p>
                  <p className="mt-1 font-body text-[11.5px] text-stone">
                    {e.timeLabel}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-center font-body text-[11.5px] italic text-stone">
          Older than 30 days is summarised, never erased.
        </p>
      </section>
    </YouBackdrop>
  );
}

function Stat({ n, label }: { n: number; label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <span className="font-display text-[24px] font-semibold tabular-nums text-ink">
        {n}
      </span>
      <span className="mt-0.5 text-center font-body text-[11px] text-stone">
        {label}
      </span>
    </div>
  );
}