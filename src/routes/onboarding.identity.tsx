import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

export const Route = createFileRoute("/onboarding/identity")({
  head: () => ({
    meta: [{ title: "Identity preferences — coupl" }],
  }),
  component: IdentityScreen,
});

const GENDER_OPTIONS = [
  "Woman",
  "Man",
  "Non-binary",
  "Genderfluid",
  "Genderqueer",
  "Agender",
  "Bigender",
  "Demigirl",
  "Demiboy",
  "Two-spirit",
  "Questioning",
  "Prefer not to say",
];

const ORIENTATION_OPTIONS = [
  "Straight",
  "Lesbian",
  "Gay",
  "Bisexual",
  "Pansexual",
  "Asexual",
  "Queer",
  "Questioning",
];

const PRONOUN_OPTIONS = [
  "she/her",
  "he/him",
  "they/them",
  "she/they",
  "he/they",
  "ze/zir",
];

function IdentityScreen() {
  const navigate = useNavigate();
  const [gender, setGender] = useState<string | null>(null);
  const [genderSelfDescribe, setGenderSelfDescribe] = useState("");
  const [orientation, setOrientation] = useState<string | null>(null);
  const [orientationSelfDescribe, setOrientationSelfDescribe] = useState("");
  const [pronouns, setPronouns] = useState<Set<string>>(new Set());
  const [pronounsCustom, setPronounsCustom] = useState("");
  // DR-085: profile visibility default OFF.
  const [showOnProfile, setShowOnProfile] = useState(false);

  const togglePronoun = (p: string) =>
    setPronouns((prev) => {
      const next = new Set(prev);
      if (next.has(p)) next.delete(p);
      else next.add(p);
      return next;
    });

  return (
    <OnboardingFrame backTo="/onboarding/checks">
      <div>
        <ScreenHeader
          eyebrow="Onboarding · identity"
          title="A few optional details."
          titleSize="display-xl"
        />
        <p className="mt-2 text-body-md text-slate">
          Anything you share here is yours. We don't use it to filter the
          people you see — that's a separate setting.
        </p>
      </div>

      <section className="mt-7">
        <p className="text-label-mono">Gender</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {GENDER_OPTIONS.map((g) => {
            const active = gender === g;
            return (
              <li key={g}>
                <button
                  type="button"
                  onClick={() => setGender(active ? null : g)}
                  aria-pressed={active}
                  className={
                    active
                      ? "rounded-full bg-plum-700 px-3 py-1.5 text-label-mono text-paper"
                      : "rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-slate hover:bg-lavender-50"
                  }
                >
                  {g}
                </button>
              </li>
            );
          })}
        </ul>
        <input
          type="text"
          value={genderSelfDescribe}
          onChange={(e) => setGenderSelfDescribe(e.target.value)}
          placeholder="Self-describe (optional)"
          className="mt-3 w-full rounded-[12px] border border-line bg-paper px-3.5 py-2.5 font-body text-[13.5px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
        />
      </section>

      <section className="mt-6">
        <p className="text-label-mono">Orientation</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {ORIENTATION_OPTIONS.map((o) => {
            const active = orientation === o;
            return (
              <li key={o}>
                <button
                  type="button"
                  onClick={() => setOrientation(active ? null : o)}
                  aria-pressed={active}
                  className={
                    active
                      ? "rounded-full bg-plum-700 px-3 py-1.5 text-label-mono text-paper"
                      : "rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-slate hover:bg-lavender-50"
                  }
                >
                  {o}
                </button>
              </li>
            );
          })}
        </ul>
        <input
          type="text"
          value={orientationSelfDescribe}
          onChange={(e) => setOrientationSelfDescribe(e.target.value)}
          placeholder="Self-describe (optional)"
          className="mt-3 w-full rounded-[12px] border border-line bg-paper px-3.5 py-2.5 font-body text-[13.5px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
        />
      </section>

      <section className="mt-6">
        <p className="text-label-mono">Pronouns</p>
        <p className="mt-1 font-body text-[12px] text-stone">Pick one or several.</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {PRONOUN_OPTIONS.map((p) => {
            const active = pronouns.has(p);
            return (
              <li key={p}>
                <button
                  type="button"
                  onClick={() => togglePronoun(p)}
                  aria-pressed={active}
                  className={
                    active
                      ? "rounded-full bg-plum-700 px-3 py-1.5 text-label-mono text-paper"
                      : "rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-slate hover:bg-lavender-50"
                  }
                >
                  {p}
                </button>
              </li>
            );
          })}
        </ul>
        <input
          type="text"
          value={pronounsCustom}
          onChange={(e) => setPronounsCustom(e.target.value)}
          placeholder="Other (optional)"
          className="mt-3 w-full rounded-[12px] border border-line bg-paper px-3.5 py-2.5 font-body text-[13.5px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
        />
      </section>

      <section className="mt-7">
        <article className="rounded-[14px] bg-paper px-4 py-4 shadow-elev-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-display text-[14px] text-ink">
                Show on my profile
              </p>
              <p className="mt-1 font-body text-[12.5px] italic text-stone">
                Off by default. You can change this any time from Profile.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowOnProfile((v) => !v)}
              aria-pressed={showOnProfile}
              className={
                showOnProfile
                  ? "rounded-full bg-plum-700 px-3 py-1.5 text-label-mono text-paper"
                  : "rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-slate hover:bg-lavender-50"
              }
            >
              {showOnProfile ? "On" : "Off"}
            </button>
          </div>
        </article>
      </section>

      <div className="mt-8">
        <OnboardingButton
          type="button"
          variant="primary"
          onClick={() => navigate({ to: "/onboarding/review" })}
        >
          Continue
        </OnboardingButton>
        <button
          type="button"
          onClick={() => navigate({ to: "/onboarding/review" })}
          className="mt-3 w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Skip for now
        </button>
      </div>
    </OnboardingFrame>
  );
}
