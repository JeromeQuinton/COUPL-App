import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Check } from "lucide-react";
import { toast } from "sonner";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /_main/profile/edit/language — language picker (UI-0223).
 *
 * R2-01 — Banani UI-0223 "Language Sheet". Single-select, English (UK)
 * default. Local state only in Phase 1; Phase 4 wires Supabase user
 * metadata. On change, soft toast and return to /profile/edit.
 */

type LanguageCode =
  | "en-GB"
  | "en-US"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "pt"
  | "pl";

const LANGUAGES: ReadonlyArray<{ code: LanguageCode; label: string; subtitle: string }> = [
  { code: "en-GB", label: "English (UK)", subtitle: "Default." },
  { code: "en-US", label: "English (US)", subtitle: "American spelling." },
  { code: "es", label: "Español", subtitle: "Spanish." },
  { code: "fr", label: "Français", subtitle: "French." },
  { code: "de", label: "Deutsch", subtitle: "German." },
  { code: "it", label: "Italiano", subtitle: "Italian." },
  { code: "pt", label: "Português", subtitle: "Portuguese." },
  { code: "pl", label: "Polski", subtitle: "Polish." },
];

export const Route = createFileRoute("/_main/profile/edit/language")({
  head: () => ({ meta: [{ title: "Language · COUPL" }] }),
  component: LanguageScreen,
});

function LanguageScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<LanguageCode>("en-GB");

  const onChoose = (code: LanguageCode) => {
    if (code === selected) return;
    setSelected(code);
    toast("Language updated.");
    navigate({ to: "/profile/edit" });
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
        <p className="text-label-mono">Profile · language</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          The language you read in.
        </h1>
        <p className="mt-2 font-body text-[13.5px] text-stone">
          The interface adjusts. Your conversations stay as they are.
        </p>
      </header>

      <ul className="px-5 space-y-2" role="radiogroup" aria-label="Choose a language">
        {LANGUAGES.map((lang) => {
          const active = lang.code === selected;
          return (
            <li key={lang.code}>
              <button
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChoose(lang.code)}
                className="flex w-full items-center justify-between rounded-[14px] bg-paper px-4 py-3.5 text-left shadow-elev-1 transition-colors hover:bg-lavender-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-300"
              >
                <div className="min-w-0 flex-1 pr-3">
                  <p className="font-display text-[15px] text-ink">{lang.label}</p>
                  <p className="mt-0.5 font-body text-[12.5px] text-stone">
                    {lang.subtitle}
                  </p>
                </div>
                {active ? (
                  <span
                    aria-hidden
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-plum-500 text-paper"
                  >
                    <Check size={14} strokeWidth={2.25} />
                  </span>
                ) : (
                  <span
                    aria-hidden
                    className="inline-block h-6 w-6 rounded-full border border-line"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>

      <p className="px-5 pt-6 pb-12 text-center font-body text-[12.5px] italic text-stone">
        Translation will roll out over time. Some surfaces stay in English first.
      </p>
    </YouBackdrop>
  );
}
