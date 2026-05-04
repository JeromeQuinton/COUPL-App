import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import {
  LoveLanguagePicker,
  type LoveLanguage,
} from "@/components/assessments/LoveLanguagePicker";

/**
 * /_main/polaris/love-language — Polaris mirror of UI-0233.
 *
 * R2-07 (Polaris side) — DR-DRAFT-ASSESSMENT-PLACEMENT-PATTERN.
 * Reachable from /_main/polaris home for users who skipped during
 * onboarding or who want to revise. Saves to profiles.love_language_primary
 * + profiles.love_language_secondary in Phase 4.
 */

// Phase 4 reads existing values from profiles. Phase 1 placeholder.
const SAVED_PRIMARY: LoveLanguage | null = null;
const SAVED_SECONDARY: LoveLanguage | null = null;

export const Route = createFileRoute("/_main/polaris/love-language")({
  head: () => ({ meta: [{ title: "Love language · Polaris" }] }),
  component: PolarisLoveLanguageScreen,
});

function PolarisLoveLanguageScreen() {
  const navigate = useNavigate();
  const [primary, setPrimary] = useState<LoveLanguage | null>(SAVED_PRIMARY);
  const [secondary, setSecondary] = useState<LoveLanguage | null>(SAVED_SECONDARY);

  const onSave = () => {
    if (!primary) return;
    toast("Love language saved.");
    navigate({ to: "/polaris" });
  };

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/polaris"
            aria-label="Back to Polaris"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Polaris · love language</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Update your love language.
        </h1>
        <p className="mt-2 font-body text-[13.5px] text-stone">
          Tap one to mark it primary. Tap another for an optional secondary.
        </p>
      </header>

      <div className="px-5">
        <LoveLanguagePicker
          primary={primary}
          secondary={secondary}
          onPrimaryChange={setPrimary}
          onSecondaryChange={setSecondary}
          footer={
            <button
              type="button"
              onClick={onSave}
              disabled={!primary}
              className="flex h-12 w-full items-center justify-center rounded-[12px] bg-plum-500 font-body text-[14.5px] font-semibold text-paper shadow-elev-1 transition-colors hover:bg-plum-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Save
            </button>
          }
        />
      </div>

      <div className="h-12" />
    </YouBackdrop>
  );
}
