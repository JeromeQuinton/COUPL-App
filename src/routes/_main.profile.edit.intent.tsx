import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

/**
 * /_main/profile/edit/intent — quick-edit current intent.
 *
 * R2-06 — Banani UI-0231 "Intentquickedit". Mirrors the onboarding
 * intent options with a read-only "current" chip on top. Submit
 * routes to /profile/edit/intent/confirm (R2-02) with the pending
 * value as a search param.
 *
 * No "are you sure" theatre. DR-INTENT-MUTABILITY.
 */

type IntentValue = "long_term" | "exploring" | "honest_dating" | "friendship";

const OPTIONS: ReadonlyArray<{ value: IntentValue; label: string; hint: string }> = [
  {
    value: "long_term",
    label: "Long-term partnership",
    hint: "Building toward depth and commitment.",
  },
  {
    value: "exploring",
    label: "Relationship, exploring",
    hint: "Open to where it leads.",
  },
  {
    value: "honest_dating",
    label: "Honest dating",
    hint: "Meeting real people, no pretence.",
  },
  {
    value: "friendship",
    label: "Friendship first",
    hint: "Connection without pressure.",
  },
];

// Phase 4 sources this from profiles.intent. Phase 1 placeholder.
const CURRENT: IntentValue = "exploring";

export const Route = createFileRoute("/_main/profile/edit/intent")({
  head: () => ({ meta: [{ title: "Intent · COUPL" }] }),
  component: IntentEditScreen,
});

function IntentEditScreen() {
  const navigate = useNavigate();
  const [pending, setPending] = useState<IntentValue>(CURRENT);

  const currentLabel =
    OPTIONS.find((o) => o.value === CURRENT)?.label ?? "Not set";
  const dirty = pending !== CURRENT;

  const onSave = () => {
    if (!dirty) {
      navigate({ to: "/profile/edit" });
      return;
    }
    navigate({
      to: "/profile/edit/intent/confirm",
      search: { intent: pending },
    });
  };

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile/edit"
            aria-label="Back to edit profile"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader
          eyebrow="Profile · intent"
          title="What you're here for."
        />
        <p className="mt-2 font-body text-[13.5px] text-stone">
          Changing this reshapes who Discover surfaces. The change isn't shown to
          anyone you're already talking to.
        </p>
      </header>

      <section className="px-5">
        <p className="text-label-mono">Current</p>
        <span className="mt-2 inline-flex items-center rounded-full bg-lavender-50 px-3.5 py-1.5 font-body text-[13px] text-ink">
          {currentLabel}
        </span>
      </section>

      <fieldset className="px-5 pt-7">
        <legend className="text-label-mono">Change to</legend>
        <div className="mt-3 space-y-2.5">
          {OPTIONS.map((opt) => {
            const active = pending === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setPending(opt.value)}
                className={`flex w-full items-start justify-between gap-3 rounded-[14px] px-4 py-3.5 text-left shadow-elev-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-300 ${
                  active
                    ? "bg-plum-500 text-paper hover:bg-plum-700"
                    : "bg-paper text-ink hover:bg-lavender-50"
                }`}
              >
                <div className="min-w-0 flex-1">
                  <p
                    className={`font-display text-[15px] ${active ? "text-paper" : "text-ink"}`}
                  >
                    {opt.label}
                  </p>
                  <p
                    className={`mt-0.5 font-body text-[12.5px] ${active ? "text-paper/85" : "text-stone"}`}
                  >
                    {opt.hint}
                  </p>
                </div>
                <span
                  aria-hidden
                  className={`mt-1 inline-block h-3.5 w-3.5 flex-shrink-0 rounded-full border ${
                    active
                      ? "border-paper bg-paper"
                      : "border-line bg-paper"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="px-5 pt-7 pb-12">
        <button
          type="button"
          onClick={onSave}
          disabled={!dirty}
          className="flex h-12 w-full items-center justify-center rounded-[12px] bg-plum-500 font-body text-[14.5px] font-semibold text-paper shadow-elev-1 transition-colors hover:bg-plum-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save
        </button>
      </div>
    </YouBackdrop>
  );
}
