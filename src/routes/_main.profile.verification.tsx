import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { ProfileScreenHeader } from "@/components/shell/ProfileScreenHeader";

export const Route = createFileRoute("/_main/profile/verification")({
  head: () => ({ meta: [{ title: "Verification — COUPL" }] }),
  component: VerificationScreen,
});

type Status = "verified" | "pending" | "failed" | "not-started";
type CheckId = "photo" | "id" | "selfie" | "social";
type Check = {
  id: CheckId;
  label: string;
  status: Status;
  verifiedDate?: string; // ISO
  failedCopy?: string;
};

const CHECKS: Check[] = [
  {
    id: "photo",
    label: "Photo",
    status: "verified",
    verifiedDate: "2026-03-12",
  },
  {
    id: "id",
    label: "ID",
    status: "verified",
    verifiedDate: "2026-01-03",
  },
  {
    id: "selfie",
    label: "Selfie",
    status: "pending",
  },
  {
    id: "social",
    label: "Social",
    status: "failed",
    failedCopy:
      "We couldn't confirm the link. Make sure the account is public for the check.",
  },
];

const FAILED_COPY: Record<CheckId, string> = {
  photo: "We couldn't match this clearly. Try a brighter, front-facing photo.",
  id: "We couldn't read this clearly. Try a clean, full-frame photo of the document.",
  selfie:
    "We couldn't match the selfie to your photo. Try again with even lighting.",
  social:
    "We couldn't confirm the link. Make sure the account is public for the check.",
};

function fmtDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function daysSince(iso: string): number {
  const ms = Date.now() - new Date(iso).getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

function VerificationScreen() {
  const [openId, setOpenId] = useState<CheckId | null>("social");
  const [refreshOpen, setRefreshOpen] = useState<CheckId | null>(null);

  return (
    <div className="relative px-5 pb-16 pt-6">
      <ProfileScreenHeader
        backLink={{ to: "/profile/safety" }}
        eyebrow="Safety"
        title="Verification"
      />
      <section className="mt-4 rounded-[16px] bg-paper p-4 shadow-elev-1">
        <p className="font-body text-[13px] leading-relaxed text-slate">
          Quiet credibility. Other people see what we've checked, not the
          details.
        </p>
      </section>

      <ul className="mt-6 flex flex-col gap-2">
        {CHECKS.map((c) => (
          <CheckRow
            key={c.id}
            check={c}
            open={openId === c.id}
            refreshOpen={refreshOpen === c.id}
            onToggle={() => setOpenId((p) => (p === c.id ? null : c.id))}
            onRefreshOpen={() => setRefreshOpen((p) => (p === c.id ? null : c.id))}
          />
        ))}
      </ul>
    </div>
  );
}

function CheckRow({
  check,
  open,
  refreshOpen,
  onToggle,
  onRefreshOpen,
}: {
  check: Check;
  open: boolean;
  refreshOpen: boolean;
  onToggle: () => void;
  onRefreshOpen: () => void;
}) {
  const isExpired =
    check.status === "verified" &&
    check.verifiedDate &&
    daysSince(check.verifiedDate) > 90;

  const pillBase =
    "rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.12em]";
  const pill = (() => {
    switch (check.status) {
      case "verified":
        return (
          <span className={`${pillBase} bg-lavender-100 text-plum-700`}>
            Verified
          </span>
        );
      case "pending":
        return (
          <span className={`${pillBase} bg-pink-100 text-plum-700`}>Pending</span>
        );
      case "failed":
        return (
          <span className={`${pillBase} bg-plum-300/30 text-plum-700`}>
            Failed
          </span>
        );
      case "not-started":
        return (
          <span className={`${pillBase} bg-paper text-stone ring-1 ring-line`}>
            Not started
          </span>
        );
    }
  })();

  const action = (() => {
    if (check.status === "failed") return "Try again";
    if (check.status === "not-started") return "Start";
    if (isExpired) return "Refresh";
    return null;
  })();

  return (
    <li>
      <button
        type="button"
        onClick={check.status === "failed" || isExpired ? onToggle : undefined}
        className={`block w-full rounded-[14px] bg-paper p-4 text-left shadow-elev-1 transition-colors ${
          check.status === "failed" || isExpired ? "hover:bg-lavender-50" : ""
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="font-display text-[14.5px] font-medium text-ink">
                {check.label}
              </p>
              {pill}
            </div>
            {check.status === "verified" && check.verifiedDate ? (
              <p className="mt-1 font-body text-[11.5px] text-stone">
                Verified {fmtDate(check.verifiedDate)}
                {isExpired ? " · over 90 days ago" : ""}
              </p>
            ) : null}
          </div>
          {action ? (
            <span className="text-label-mono text-plum-700">{action}</span>
          ) : null}
          {check.status === "failed" || isExpired ? (
            <ChevronDown
              className={`mt-1 h-4 w-4 flex-shrink-0 text-stone transition-transform ${
                open ? "rotate-180" : ""
              }`}
              strokeWidth={1.75}
            />
          ) : null}
        </div>

        {open && check.status === "failed" ? (
          <p className="mt-3 font-body text-[12.5px] leading-relaxed text-slate">
            {FAILED_COPY[check.id]}
          </p>
        ) : null}

        {open && isExpired ? (
          <div className="mt-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRefreshOpen();
              }}
              className="rounded-full bg-plum-700 px-4 py-1.5 font-display text-[12.5px] font-medium text-paper hover:opacity-90"
            >
              Refresh now
            </button>
            {refreshOpen ? (
              <p className="mt-2 font-body text-[12px] leading-relaxed text-slate">
                Refresh expires in 7 days. We'll re-run the check quietly.
              </p>
            ) : null}
          </div>
        ) : null}
      </button>
    </li>
  );
}
