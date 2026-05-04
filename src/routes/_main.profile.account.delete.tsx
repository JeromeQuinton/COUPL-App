import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
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

function DeleteScreen() {
  const navigate = useNavigate();

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
        <button
          type="button"
          onClick={() => navigate({ to: "/profile/account/delete/confirm" })}
          className="w-full rounded-full bg-danger px-5 py-3.5 font-display text-[15px] font-medium text-paper"
        >
          Continue to confirm
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
