import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

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
        <p className="text-label-mono">Safety · moderation</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          What happens when you report.
        </h1>
      </header>

      <section className="px-5">
        <article className="rounded-[18px] bg-paper p-5 shadow-elev-1 space-y-3">
          <p className="font-body text-[14px] leading-relaxed text-ink">
            A human moderator reviews every report within 24 hours. Most are
            resolved inside 72. We don't auto-action — a person reads context
            before deciding.
          </p>
          <p className="font-body text-[14px] leading-relaxed text-ink">
            Outcomes range from a written warning to a permanent removal,
            depending on what the moderator finds. You'll get a short reply
            telling you what we did, without naming the other person.
          </p>
        </article>
      </section>

      <div className="px-5 pt-8 pb-12">
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
