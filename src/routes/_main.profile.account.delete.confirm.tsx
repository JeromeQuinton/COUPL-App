import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /profile/account/delete/confirm — final type-to-confirm gate.
 *
 * Two-step deletion: parent (/delete) lays out consequences, this screen
 * is the irreversible last check. Type-to-confirm via username/email,
 * destructive primary CTA, neutral secondary cancel. No retention play.
 *
 * Stream 26 SCREEN-R2-24.
 */
export const Route = createFileRoute("/_main/profile/account/delete/confirm")({
  head: () => ({ meta: [{ title: "Last check before deletion — COUPL" }] }),
  component: DeleteConfirmScreen,
});

const REQUIRED = "jerome.quinton";

function DeleteConfirmScreen() {
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const ready = text.trim().toLowerCase() === REQUIRED;

  if (submitted) {
    return (
      <YouBackdrop tone="serious">
        <StatusBar />
        <div className="px-5 pt-12 text-center">
          <p className="text-label-mono">Done</p>
          <h1 className="mt-3 font-display text-[26px] italic leading-tight text-ink">
            Your account is being closed.
          </h1>
          <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
            You can sign in for the next 30 days to undo this. After that,
            it's gone.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full border border-line bg-paper px-6 py-3 font-body text-[14px] text-ink hover:bg-lavender-50"
          >
            Sign out
          </Link>
        </div>
      </YouBackdrop>
    );
  }

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile/account/delete"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Account · delete · confirm</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Last check before deletion.
        </h1>
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="font-body text-[14px] leading-relaxed text-ink">
            Your profile, conversations, and matches will be permanently
            removed. We keep nothing recoverable after 30 days.
          </p>
        </article>
      </section>

      <div className="px-5 pt-8 pb-12 space-y-4">
        <label className="block">
          <span className="text-label-mono">
            Type your username "{REQUIRED}" to confirm
          </span>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            autoComplete="off"
            className="mt-2 w-full rounded-[12px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink"
          />
        </label>

        <button
          type="button"
          disabled={!ready}
          onClick={() => setSubmitted(true)}
          className="w-full rounded-full bg-danger px-5 py-3.5 font-display text-[15px] font-medium text-paper disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Delete my account
        </button>

        <Link
          to="/profile/account"
          className="block w-full rounded-full border border-line bg-paper px-5 py-3 text-center font-display text-[13.5px] text-ink hover:bg-lavender-50"
        >
          Cancel
        </Link>
      </div>
    </YouBackdrop>
  );
}
