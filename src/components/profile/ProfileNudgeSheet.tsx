import { Link } from "@tanstack/react-router";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

/**
 * <ProfileNudgeSheet/> — Stream 7 leftover.
 *
 * Reusable sheet shown when a user with an under-70%-complete profile
 * tries to attune or send a first hello. Single CTA back to the
 * profile editor; not blocking — the user can dismiss and proceed.
 */

export type ProfileNudgeContext = "attune" | "first-hello" | "generic";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 0–100 — used in copy to nudge specifically. */
  completeness: number;
  /** Context drives the headline + body line. */
  context?: ProfileNudgeContext;
  /** Called when user taps 'Continue anyway' instead of going to /profile/edit. */
  onContinue?: () => void;
};

const COPY: Record<
  ProfileNudgeContext,
  { eyebrow: string; title: string; body: string }
> = {
  attune: {
    eyebrow: "Before you attune",
    title: "Worth letting them see you first.",
    body: "Profiles that are mostly filled in get warmer replies. A few minutes now saves the awkward 'tell me more about you' later.",
  },
  "first-hello": {
    eyebrow: "Before you send",
    title: "Let them know who you are.",
    body: "First-hellos land better when there's something to read on your side too. A quick pass over the empty bits and you're good.",
  },
  generic: {
    eyebrow: "A small nudge",
    title: "Your profile is most of the way there.",
    body: "A few empty sections left. Worth a couple of minutes — readers spend less time guessing.",
  },
};

export function ProfileNudgeSheet({
  open,
  onOpenChange,
  completeness,
  context = "generic",
  onContinue,
}: Props) {
  const c = COPY[context];
  const pct = Math.max(0, Math.min(100, Math.round(completeness)));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-[24px] border-t border-line bg-paper px-5 pb-8 pt-6"
      >
        <SheetHeader className="text-left">
          <p className="text-label-mono text-plum-700">{c.eyebrow}</p>
          <SheetTitle className="mt-2 font-display text-[20px] font-semibold text-ink">
            {c.title}
          </SheetTitle>
          <SheetDescription className="mt-2 font-body text-[13.5px] leading-relaxed text-slate">
            {c.body}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-5">
          <div
            className="h-1.5 w-full rounded-full bg-plum-300/30"
            aria-hidden="true"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-plum-500 to-blush"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="mt-2 font-body text-[12px] text-stone">
            {pct}% complete
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-2.5">
          <Link
            to="/profile/edit"
            onClick={() => onOpenChange(false)}
            className="inline-flex w-full items-center justify-center rounded-full bg-plum-500 px-5 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:bg-plum-700"
          >
            Finish profile
          </Link>
          {onContinue && (
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                onContinue();
              }}
              className="inline-flex w-full items-center justify-center rounded-full border border-line bg-paper px-5 py-2.5 font-body text-[13.5px] font-medium text-ink hover:bg-lavender-50"
            >
              Continue anyway
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
