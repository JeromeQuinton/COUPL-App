import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /profile/account/delete — permanent account deletion.
 *
 * Distinct from /profile/pause. Type-to-confirm. GDPR-aligned.
 *
 * Stream-19 SCREEN-24.
 */
export const Route = createFileRoute("/_main/profile/account/delete")({
  head: () => ({ meta: [{ title: "Delete account — COUPL" }] }),
  component: DeleteScreen,
});

const REQUIRED = "delete my account";

function DeleteScreen() {
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
          <Link to="/profile/account" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Account · delete</p>
        <h1 className="mt-2 font-display text-[28px] italic leading-tight text-ink">
          Pause is reversible.
          <br />
          This isn't.
        </h1>
      </header>

      <section className="px-5 space-y-4">
        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="text-label-mono">What gets deleted</p>
          <p className="mt-2 font-body text-[13.5px] leading-relaxed text-slate">
            Your profile, photos, conversations, voice memos, journal,
            Polaris history. Anything you've created in the app.
          </p>
        </article>

        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="text-label-mono">What stays for 30 days</p>
          <p className="mt-2 font-body text-[13.5px] leading-relaxed text-slate">
            A minimal signed-out shell of your account so you can change
            your mind. Sign back in within 30 days and everything returns.
          </p>
        </article>

        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="text-label-mono">What we keep, and why</p>
          <p className="mt-2 font-body text-[13.5px] leading-relaxed text-slate">
            Safety reports involving you (legal obligation, anonymised).
            Anonymous billing records (UK tax law). Nothing else.
          </p>
        </article>
      </section>

      <div className="px-5 pt-8 pb-12 space-y-4">
        <label className="block">
          <span className="text-label-mono">
            Type "{REQUIRED}" to confirm
          </span>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
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
          to="/profile/pause"
          className="block text-center font-body text-[13px] text-plum-700 hover:underline"
        >
          Pause instead →
        </Link>
      </div>
    </YouBackdrop>
  );
}
