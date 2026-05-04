import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PolarisHeader } from "@/components/shell/PolarisHeader";
import { getProfileDetail } from "@/data/discover_profile_detail_sample";

/**
 * /discover/$id/language/$lensId — connection-language contextual deep-dive.
 *
 * Per-pair explanation of a single connection-language lens. Reuses
 * the field-guide tone but layers in specifics from this match. Phase 4
 * sources the pairing detail from `pair_compatibility`.
 */
export const Route = createFileRoute(
  "/_main/discover/$id_/language/$lensId",
)({
  head: ({ params }) => ({
    meta: [
      { title: `Connection language — COUPL` },
      {
        name: "description",
        content: `How ${params.lensId} shows up between you.`,
      },
    ],
  }),
  component: LanguageDeepDiveScreen,
});

type Lens = {
  label: string;
  hue: string;
  field: string; // generic field-guide line
  pairing: string; // per-pair contextualisation
  yours: string;
  theirs: string;
  practice: string;
};

const LENSES: Record<string, Lens> = {
  "quality-time": {
    label: "Quality time",
    hue: "from-plum-300/40 to-lavender-50",
    field:
      "Presence over performance. Hours together that don't have to produce anything.",
    pairing:
      "Both of you weight quality time highly, but you express it differently. You lean towards single, longer windows. They lean towards smaller, repeated rituals.",
    yours: "You said long Sundays. Phones away. Slow.",
    theirs:
      "They said weekday evenings — small, regular, with room for nothing-in-particular.",
    practice:
      "When you plan, ask whether this is a 'long Sunday' or a 'Tuesday evening' kind of meeting. Different shape, same language.",
  },
  "acts-of-care": {
    label: "Acts of care",
    hue: "from-blush-300/40 to-blush-100",
    field:
      "The small noticing. Coffee made, the right book ordered, the lift offered.",
    pairing:
      "You both speak this fluently — but you tend to *give* it more readily than receive it. They'll need to be told it's landed.",
    yours: "You give freely; you flinch slightly when it comes back.",
    theirs:
      "They notice quickly and act without ceremony. A small thing, often.",
    practice:
      "Practise saying 'thank you, that landed' when they do something kind. Don't deflect.",
  },
  "pace-and-presence": {
    label: "Pace + presence",
    hue: "from-lavender-300/40 to-paper",
    field: "How quickly the rhythm is set. Whether silence feels safe.",
    pairing:
      "Your pace is patient; theirs is patient too — but they read silence as care, while you sometimes read it as distance.",
    yours: "You wait until you have something true to say.",
    theirs: "They sit easily in pauses. They don't fill.",
    practice:
      "If a quiet stretch worries you, name it: 'just letting this breathe a moment.' Both of you will recognise the move.",
  },
};

function lensFor(lensId: string): Lens {
  return (
    LENSES[lensId] ?? {
      label: lensId.replace(/-/g, " "),
      hue: "from-plum-300/40 to-lavender-50",
      field: "A lens for noticing how connection shows up.",
      pairing:
        "Per-pair detail isn't available yet — it arrives when you've exchanged a few more messages.",
      yours: "—",
      theirs: "—",
      practice: "Notice it as you write. The pattern names itself.",
    }
  );
}

function LanguageDeepDiveScreen() {
  const { id, lensId } = useParams({
    from: "/_main/discover/$id_/language/$lensId",
  });
  const profile = getProfileDetail(id);
  const name = profile?.name ?? "them";
  const lens = lensFor(lensId);

  return (
    <div className="relative min-h-[100dvh] bg-paper">
      <div
        className={`absolute inset-x-0 top-0 h-[280px] bg-gradient-to-b ${lens.hue}`}
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
            Connection language
          </p>
        </header>

        <div className="mt-10">
          <PolarisHeader
            eyebrow={`With ${name}`}
            title={lens.label}
            eyebrowTone="plum-700"
          />
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">
            {lens.field}
          </p>
        </div>

        <section className="mt-8 rounded-[18px] border border-plum-300/25 bg-paper/85 p-5 backdrop-blur-sm">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Between you
          </p>
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-ink">
            {lens.pairing}
          </p>
        </section>

        <section className="mt-4 grid grid-cols-1 gap-3">
          <div className="rounded-[16px] border border-plum-300/25 bg-paper/70 p-4">
            <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
              You
            </p>
            <p className="mt-2 font-body text-[14px] leading-relaxed text-ink">
              {lens.yours}
            </p>
          </div>
          <div className="rounded-[16px] border border-plum-300/25 bg-paper/70 p-4">
            <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
              {name}
            </p>
            <p className="mt-2 font-body text-[14px] leading-relaxed text-ink">
              {lens.theirs}
            </p>
          </div>
        </section>

        <section className="mt-4 rounded-[18px] border border-plum-300/25 bg-lavender-50/50 p-5 backdrop-blur-sm">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Polaris · in practice
          </p>
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-ink">
            {lens.practice}
          </p>
        </section>

        <p className="mt-6 text-[11.5px] text-slate">
          Reading is descriptive, not prescriptive. The way it lands between
          you matters more than the lens.
        </p>
      </div>
    </div>
  );
}
