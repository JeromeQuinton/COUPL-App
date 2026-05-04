import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/_main/discover/membership-prompt")({
  head: () => ({ meta: [{ title: "Membership — COUPL" }] }),
  component: MembershipPrompt,
});

const ROWS: { label: string; body: string }[] = [
  {
    label: "More daily issues",
    body: "See more profiles each day, paced for attention not volume.",
  },
  {
    label: "Polaris · without limits",
    body:
      "Deeper conversations with the AI coach any time, not just on prompts.",
  },
  {
    label: "Polaris view",
    body: "Your attachment-health snapshot, refreshed weekly.",
  },
];

function MembershipPrompt() {
  const router = useRouter();
  const onBack = () => {
    if (router.history.length > 1) router.history.back();
    else router.navigate({ to: "/discover" });
  };

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-paper px-6 pt-6 pb-12">
      <header className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="text-label-mono text-stone">Daily limit</p>
      </header>

      <div className="mx-auto mt-12 flex w-full max-w-[420px] flex-col items-center text-center">
        <ScreenHeader
          eyebrow="DAILY LIMIT"
          title="You've noticed three people today."
          titleItalic
        />
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          Free remains intentional. Membership expands.
        </p>

        <ul className="mt-10 flex w-full flex-col gap-3">
          {ROWS.map((r) => (
            <li
              key={r.label}
              className="rounded-[16px] bg-paper p-4 text-left shadow-elev-1"
            >
              <p className="font-display text-[14.5px] font-medium text-ink">
                {r.label}
              </p>
              <p className="mt-1 font-body text-[12.5px] leading-relaxed text-slate">
                {r.body}
              </p>
            </li>
          ))}
        </ul>

        <Link
          to="/membership/plans"
          className="mt-10 w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          See plans
        </Link>
        <button
          type="button"
          onClick={onBack}
          className="mt-3 font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Maybe later
        </button>
        <p className="mt-12 font-body text-[11.5px] italic text-stone">
          No dark patterns. No pressure.
        </p>
      </div>
    </div>
  );
}
