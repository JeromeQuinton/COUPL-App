import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { ScreenHeader } from "@/components/shell/ScreenHeader";
import { getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/before-meeting — pre-date primer.
 *
 * Optional, opt-in surface that surfaces *once a plan is confirmed*.
 * NOT a checklist. Editorial. Three short sections that callback to
 * what already exists in the conversation: their connection-language,
 * their About paragraph, and the safety-share path if something feels
 * off. Single CTA "Got it" returns to the thread.
 *
 * Stream-19 SCREEN-01 — closes the deferred Stream 8-5 surface.
 */
export const Route = createFileRoute("/_main/connections/$id_/before-meeting")({
  head: () => ({
    meta: [
      { title: "Before you meet — COUPL" },
      {
        name: "description",
        content: "A short, calm read before you meet in person.",
      },
    ],
  }),
  component: BeforeMeetingScreen,
});

function BeforeMeetingScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/before-meeting" });
  const c = getConnection(id);
  const name = c?.name ?? "them";

  return (
    <PageBackdrop>
      <div
        className="mx-auto w-full max-w-[460px] px-5"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
        }}
      >
        <header className="flex items-center justify-between">
          <Link
            to="/connections/$id"
            params={{ id }}
            aria-label="Back to thread"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-label-mono">Before you meet</p>
          <span aria-hidden className="w-8" />
        </header>

        <div className="mt-8">
          <ScreenHeader
            eyebrow={`For Saturday · with ${name}`}
            title={
              <>
                A short read before{" "}
                <em className="font-display italic">you go.</em>
              </>
            }
          />
          <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
            Not a checklist. Just three things worth holding lightly as you head out.
          </p>
        </div>

        <section className="mt-8 space-y-4">
          <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
            <p className="text-label-mono">What you both said matters</p>
            <p className="mt-2 font-display text-[18px] italic leading-snug text-ink">
              Pace. Steadiness. Honest noticing.
            </p>
            <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
              The two of you keep returning to slow over fast. That's worth
              keeping in your body tonight — there's no rush to land
              everything in one evening.
            </p>
          </article>

          <article className="rounded-[18px] bg-paper p-5 shadow-elev-1">
            <p className="text-label-mono">How {name} shows up</p>
            <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
              Warm but considered. Reads the room before they speak. If a
              question feels too quick, expect a pause — that's presence,
              not hesitation.
            </p>
          </article>

          <article
            className="rounded-[18px] border border-plum-300/25 px-5 py-5"
            style={{
              background:
                "linear-gradient(150deg, color-mix(in oklab, var(--blush) 50%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 20%, var(--paper)) 100%)",
            }}
          >
            <p className="text-label-mono">If something feels off</p>
            <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
              Trust the body before the story. It's always okay to leave
              early. We've got a quiet way to tell a friend where you are.
            </p>
            <Link
              to="/connections/$id/safety-share"
              params={{ id }}
              className="mt-4 inline-flex items-center gap-1 font-body text-[13px] font-medium text-plum-700 hover:underline"
            >
              Set up safety share →
            </Link>
          </article>
        </section>

        <div className="mt-10 flex justify-center pb-6">
          <Link
            to="/connections/$id"
            params={{ id }}
            className="rounded-full bg-plum-700 px-8 py-3 font-body text-[14px] font-medium text-paper hover:bg-plum-500"
          >
            Got it
          </Link>
        </div>
      </div>
    </PageBackdrop>
  );
}
