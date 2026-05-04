import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute(
  "/_main/profile/account/delete/scheduled",
)({
  head: () => ({ meta: [{ title: "Deletion scheduled — COUPL" }] }),
  component: ScheduledScreen,
});

// Phase 1 fixture: 30 days from build date. Phase 4 reads
// account_state.deletionScheduledAt (set by the R2-24 confirm action).
function fixtureScheduledAt() {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d;
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function ScheduledScreen() {
  const scheduled = fixtureScheduledAt();
  const [expanded, setExpanded] = useState(false);

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile/account"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader eyebrow="Account · deletion scheduled" title="You're scheduled to leave." />
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="font-body text-[14px] leading-relaxed text-ink">
            Your account will be deleted on{" "}
            <span className="font-display font-medium">{formatDate(scheduled)}</span>.
          </p>
          <p className="mt-2 font-body text-[12.5px] italic text-stone">
            That's 30 days from today.
          </p>
        </article>
      </section>

      <section className="px-5 pt-7">
        <p className="text-label-mono">What happens between now and then</p>
        <ul className="mt-3 space-y-2 font-body text-[13.5px] leading-relaxed text-ink">
          <li>You can sign in and use COUPL normally.</li>
          <li>We pause Discover.</li>
          <li>We'll keep your messages until then.</li>
        </ul>
      </section>

      <div className="px-5 pt-8 space-y-3">
        <Link
          to="/profile/account/delete/cancel"
          className="block w-full rounded-full bg-plum-700 px-5 py-3.5 text-center font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Cancel deletion
        </Link>
      </div>

      <section className="px-5 pt-8 pb-12">
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="flex w-full items-center justify-between rounded-[14px] border border-line bg-paper px-4 py-3 text-left hover:bg-lavender-50"
        >
          <span className="font-body text-[13px] text-slate">
            Why we wait 30 days
          </span>
          {expanded ? (
            <ChevronUp size={16} className="text-stone" />
          ) : (
            <ChevronDown size={16} className="text-stone" />
          )}
        </button>
        {expanded && (
          <div className="mt-3 rounded-[14px] bg-paper px-4 py-4 shadow-elev-1">
            <p className="font-body text-[13.5px] leading-relaxed text-ink">
              People sometimes change their minds. The 30-day window gives you
              room to come back without having to start over. It also gives us
              time to honour data-protection requirements properly — anything
              we hold can be removed in full once the window closes.
            </p>
          </div>
        )}
      </section>
    </YouBackdrop>
  );
}
