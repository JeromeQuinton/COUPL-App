import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/profile/safety/moderation")({
  head: () => ({
    meta: [{ title: "Moderation — COUPL" }],
  }),
  component: ModerationScreen,
});

function ModerationScreen() {
  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile/safety"
            aria-label="Back to Safety"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader eyebrow="Safety · moderation" title="What happens when you report." />
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1 space-y-3">
          <p className="font-body text-[14px] leading-relaxed text-ink">
            A human moderator reads every report. We aim to review reports
            within a few days. We don't auto-action — a person reads context
            before deciding.
          </p>
          <p className="font-body text-[14px] leading-relaxed text-ink">
            Outcomes range from a written warning to a permanent removal,
            depending on what the moderator finds. You'll get a short reply
            telling you what we did, without naming the other person.
          </p>
        </article>
      </section>

      <section className="px-5 pt-7">
        <Link
          to="/profile/safety/transparency"
          className="flex items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-4 shadow-elev-1 hover:bg-lavender-50"
        >
          <div className="flex flex-1 flex-col">
            <span className="font-display text-[14.5px] font-medium text-ink">
              Transparency report
            </span>
            <span className="mt-0.5 font-body text-[12px] text-stone">
              What we did this quarter — accounts removed, reports reviewed
            </span>
          </div>
          <ChevronRight size={16} className="text-stone" />
        </Link>
      </section>

      <div className="px-5 pt-6 pb-12">
        <Link
          to="/community-guidelines"
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Read our community guidelines
        </Link>
      </div>
    </YouBackdrop>
  );
}
