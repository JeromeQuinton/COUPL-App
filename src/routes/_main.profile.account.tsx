import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute("/_main/profile/account")({
  head: () => ({ meta: [{ title: "Account — COUPL" }] }),
  component: AccountHome,
});

const ROWS = [
  { label: "Email", value: "jerome@coupl.app" },
  { label: "Phone", value: "+44 ···· 0142" },
  { label: "Password", value: "Last changed 12 days ago" },
  { label: "Two-factor authentication", value: "Not set up" },
  { label: "Linked accounts", value: "Apple" },
  { label: "Sign out everywhere", value: "Sign out of all sessions" },
];

function AccountHome() {
  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link to="/profile" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Account</p>
        <h1 className="mt-2 font-display text-[28px] italic leading-tight text-ink">
          What sits underneath?
        </h1>
      </header>

      <ul className="px-5 pb-12 space-y-2.5">
        {ROWS.map((r) => (
          <li key={r.label}>
            <button
              type="button"
              // TODO: stream-5-next account sub-routes
              className="flex w-full items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 text-left shadow-elev-1 transition-colors hover:bg-lavender-50"
            >
              <div>
                <p className="font-display text-[15px] text-ink">{r.label}</p>
                <p className="mt-0.5 font-body text-[12px] text-stone">{r.value}</p>
              </div>
              <ChevronRight size={16} className="text-stone" />
            </button>
          </li>
        ))}
      </ul>
    </YouBackdrop>
  );
}
