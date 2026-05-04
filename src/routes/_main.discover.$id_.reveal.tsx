import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, ArrowRight } from "lucide-react";
import { getProfileDetail } from "@/data/discover_profile_detail_sample";

/**
 * /discover/$id/reveal — slow-reveal mode (premium).
 *
 * Progressive disclosure of a profile, paced by tap. Photos → about →
 * prompts → connection languages. A premium signal that profile-reading
 * is meant to be unhurried. Phase 4 gates by subscription; Phase 1
 * exposes a hard-coded `IS_PAID_USER_V0` aligned with the parent route.
 */
export const Route = createFileRoute("/_main/discover/$id_/reveal")({
  head: () => ({
    meta: [
      { title: "Slow reveal — COUPL" },
      {
        name: "description",
        content: "Read this profile slowly. One layer at a time.",
      },
    ],
  }),
  component: RevealScreen,
});

const IS_PAID_USER_V0 = true;

const STAGE_LABELS = ["Photos", "About", "Prompts", "Languages"] as const;
type Stage = 0 | 1 | 2 | 3;

function RevealScreen() {
  const { id } = useParams({ from: "/_main/discover/$id_/reveal" });
  const profile = getProfileDetail(id);
  const name = profile?.name ?? "them";
  const [stage, setStage] = useState<Stage>(0);

  if (!IS_PAID_USER_V0) {
    return (
      <div className="relative min-h-[100dvh] bg-paper">
        <div
          className="mx-auto flex w-full max-w-[480px] flex-col px-6"
          style={{
            minHeight: "100dvh",
            paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
            paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
          }}
        >
          <header className="flex items-center gap-2 py-2">
            <Link
              to="/discover/$id"
              params={{ id }}
              aria-label={`Back to ${name}'s profile`}
              className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Link>
            <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
              Slow reveal · Membership
            </p>
          </header>

          <div className="mt-16 rounded-[18px] border border-plum-300/25 bg-paper/70 p-6 backdrop-blur-sm">
            <h1 className="font-display text-[24px] leading-[1.15] text-ink">
              Read profiles in their own time.
            </h1>
            <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">
              Slow reveal is a Membership surface — photos, about, prompts,
              and languages, layered at your pace. Open with the next layer
              when you're ready, not when the feed wants you to be.
            </p>
            <Link
              to="/membership/plans"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-plum-600 to-plum-500 px-5 py-2.5 font-display text-[14px] font-medium text-paper"
            >
              See Membership
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const next = () =>
    setStage((s) => (s < 3 ? ((s + 1) as Stage) : s));

  const stageContent = (() => {
    if (!profile) return null;
    if (stage === 0) {
      const photo = profile.photos?.[0];
      return (
        <article>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            First — how they show up
          </p>
          <h2 className="mt-3 font-display text-[24px] leading-[1.15] text-ink">
            {profile.name}, {profile.age}
          </h2>
          <p className="mt-1 font-body text-[13.5px] text-slate">
            {profile.city}
          </p>
          <div className="mt-5 aspect-[3/4] w-full overflow-hidden rounded-[20px] border border-plum-300/25 bg-lavender-50/40">
            {photo?.src ? (
              <img
                src={photo.src}
                alt={photo.alt ?? `${profile.name}'s photo`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-body text-[13px] text-slate">
                Photo
              </div>
            )}
          </div>
        </article>
      );
    }
    if (stage === 1) {
      return (
        <article>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Second — what they wrote
          </p>
          <h2 className="mt-3 font-display text-[22px] leading-[1.2] text-ink">
            About {profile.name}
          </h2>
          <p className="mt-4 whitespace-pre-line font-body text-[14.5px] leading-relaxed text-ink">
            {profile.bio ?? "—"}
          </p>
        </article>
      );
    }
    if (stage === 2) {
      const starters = profile.conversationStarters ?? [];
      return (
        <article>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Third — small openings
          </p>
          <h2 className="mt-3 font-display text-[22px] leading-[1.2] text-ink">
            Where you might begin.
          </h2>
          <ul className="mt-4 space-y-4">
            {starters.length === 0 ? (
              <li className="font-body text-[14px] text-slate">
                No openings drawn yet for this profile.
              </li>
            ) : (
              starters.slice(0, 3).map((line, i) => (
                <li
                  key={i}
                  className="rounded-[14px] border border-plum-300/25 bg-paper/70 p-4"
                >
                  <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
                    Opening {i + 1}
                  </p>
                  <p className="mt-2 font-body text-[14.5px] leading-relaxed text-ink">
                    {line}
                  </p>
                </li>
              ))
            )}
          </ul>
        </article>
      );
    }
    return (
      <article>
        <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
          Last — how they connect
        </p>
        <h2 className="mt-3 font-display text-[22px] leading-[1.2] text-ink">
          The languages between you.
        </h2>
        <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">
          Tap a language to read what it means in this pairing.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            to="/discover/$id/language/$lensId"
            params={{ id, lensId: "quality-time" }}
            className="rounded-full border border-plum-300/40 bg-paper/80 px-3.5 py-1.5 font-body text-[13px] text-ink hover:bg-lavender-50"
          >
            Quality time
          </Link>
          <Link
            to="/discover/$id/language/$lensId"
            params={{ id, lensId: "acts-of-care" }}
            className="rounded-full border border-plum-300/40 bg-paper/80 px-3.5 py-1.5 font-body text-[13px] text-ink hover:bg-lavender-50"
          >
            Acts of care
          </Link>
          <Link
            to="/discover/$id/language/$lensId"
            params={{ id, lensId: "pace-and-presence" }}
            className="rounded-full border border-plum-300/40 bg-paper/80 px-3.5 py-1.5 font-body text-[13px] text-ink hover:bg-lavender-50"
          >
            Pace + presence
          </Link>
        </div>
      </article>
    );
  })();

  return (
    <div className="relative min-h-[100dvh] bg-paper">
      <div
        className="absolute inset-x-0 top-0 h-[260px] bg-gradient-to-b from-plum-300/30 to-paper"
        aria-hidden="true"
      />
      <div
        className="relative mx-auto flex w-full max-w-[480px] flex-col px-6"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
        }}
      >
        <header className="flex items-center gap-2 py-2">
          <Link
            to="/discover/$id"
            params={{ id }}
            aria-label={`Back to ${name}'s profile`}
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-paper/40"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-700">
            Slow reveal
          </p>
        </header>

        {/* Stage indicator */}
        <div
          className="mt-2 flex items-center gap-1.5"
          aria-label={`Layer ${stage + 1} of 4`}
        >
          {STAGE_LABELS.map((_, i) => (
            <span
              key={i}
              className={
                i <= stage
                  ? "h-1 flex-1 rounded-full bg-plum-500"
                  : "h-1 flex-1 rounded-full bg-plum-300/30"
              }
            />
          ))}
        </div>
        <p className="mt-2 text-[11.5px] uppercase tracking-[0.18em] text-plum-500">
          {STAGE_LABELS[stage]}
        </p>

        <div className="mt-6 flex-1">{stageContent}</div>

        <div className="mt-8">
          {stage < 3 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-plum-600 to-plum-500 px-5 py-3 font-display text-[15px] font-medium text-paper shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-500"
            >
              Open the next layer
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : (
            <Link
              to="/discover/$id"
              params={{ id }}
              className="inline-flex w-full items-center justify-center rounded-full border border-plum-300/40 bg-paper/80 px-5 py-3 font-display text-[15px] font-medium text-ink"
            >
              Read the full profile
            </Link>
          )}
          <p className="mt-3 text-[11.5px] text-slate">
            One layer at a time. There's no rush here.
          </p>
        </div>
      </div>
    </div>
  );
}
