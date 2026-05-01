import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Shield, Pencil, Eye, AlertOctagon, PauseCircle } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import {
  PROFILE_SUMMARY,
  DISCOVERY_SETTINGS,
  CARE_SETTINGS,
} from "@/data/you_sample";

export const Route = createFileRoute("/_main/profile/")({
  head: () => ({
    meta: [
      { title: "You — COUPL" },
      {
        name: "description",
        content:
          "Your account, discovery and care settings, safety, and audit log.",
      },
    ],
  }),
  component: YouDashboard,
});

function YouDashboard() {
  return (
    <YouBackdrop>
      <StatusBar />

      {/* Header */}
      <header className="px-5 pt-2 pb-4">
        <h1 className="text-display-xl text-ink">You</h1>
      </header>

      {/* Identity card */}
      <section className="px-5">
        <Link
          to="/profile/edit"
          className="flex items-center gap-3 rounded-[18px] bg-paper p-4 shadow-elev-1 transition-colors hover:bg-lavender-50"
        >
          <div
            aria-hidden
            className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full font-display text-[18px] font-semibold text-paper"
            style={{ background: "var(--plum-700, #5A2A6E)" }}
          >
            {PROFILE_SUMMARY.initial}
          </div>
          <div className="flex flex-1 flex-col">
            <p className="font-display text-[16px] font-semibold text-ink">
              {PROFILE_SUMMARY.name}
            </p>
            <p className="font-body text-[12.5px] text-stone">
              Member since {PROFILE_SUMMARY.memberSince} · {PROFILE_SUMMARY.city}
            </p>
          </div>
          <ChevronRight size={18} className="text-stone" />
        </Link>
      </section>

      {/* Discovery */}
      <SettingsGroup label="Discovery" rows={DISCOVERY_SETTINGS} />

      {/* Care */}
      <SettingsGroup label="Care" rows={CARE_SETTINGS} />

      {/* Safety & Trust */}
      <section className="px-5 pt-7">
        <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          Safety & trust
        </h3>
        <ul className="mt-3 flex flex-col gap-2">
          <DashboardLink
            to="/profile/audit"
            Icon={Eye}
            title="Who saw you, and when"
            sub="Visibility audit · last 30 days"
          />
          <DashboardLink
            to="/profile/safety"
            Icon={AlertOctagon}
            title="Tell us what happened"
            sub="Safety report · human review within 4 hours"
          />
          <DashboardLink
            to="/profile/pause"
            Icon={PauseCircle}
            title="Step out, hold your place"
            sub="Pause your account, kindly"
          />
          <DashboardLink
            to="/profile/edit"
            Icon={Pencil}
            title="Edit your profile"
            sub="Photos, prompts, things to know"
          />
        </ul>
      </section>

      <section className="px-5 pt-7 pb-12">
        <div className="flex items-start gap-3 rounded-[16px] border border-line bg-paper/70 p-4">
          <Shield size={16} className="mt-0.5 text-plum-500" strokeWidth={1.75} />
          <p className="font-body text-[12.5px] leading-relaxed text-slate">
            COUPL is built around relational sovereignty. Nothing is shared
            without your consent. Anything you share can be undone here.
          </p>
        </div>
      </section>
    </YouBackdrop>
  );
}

function SettingsGroup({
  label,
  rows,
}: {
  label: string;
  rows: { key: string; label: string; value: string }[];
}) {
  return (
    <section className="px-5 pt-7">
      <h3 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
        {label}
      </h3>
      <ul className="mt-3 overflow-hidden rounded-[16px] bg-paper shadow-elev-1">
        {rows.map((r, i) => (
          <li
            key={r.key}
            className={`flex items-start justify-between gap-4 px-4 py-3.5 ${
              i > 0 ? "border-t border-line" : ""
            }`}
          >
            <span className="font-display text-[14px] font-medium text-ink">
              {r.label}
            </span>
            <span className="text-right font-body text-[13px] text-slate">
              {r.value}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

import type { ComponentType, SVGProps } from "react";

function DashboardLink({
  to,
  Icon,
  title,
  sub,
}: {
  to: "/profile/edit" | "/profile/audit" | "/profile/safety" | "/profile/pause";
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  sub: string;
}) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center gap-3 rounded-[14px] bg-paper p-3.5 shadow-elev-1 transition-colors hover:bg-lavender-50"
      >
        <span
          aria-hidden
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-lavender-100"
        >
          <Icon width={16} height={16} strokeWidth={1.75} className="text-plum-700" />
        </span>
        <div className="flex flex-1 flex-col">
          <span className="font-display text-[14.5px] font-medium text-ink">
            {title}
          </span>
          <span className="font-body text-[12px] text-stone">{sub}</span>
        </div>
        <ChevronRight size={16} className="text-stone" />
      </Link>
    </li>
  );
}