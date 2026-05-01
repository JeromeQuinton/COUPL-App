import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { getProfileDetail } from "@/data/discover_profile_detail_sample";

/**
 * /discover/$id/attuned — Mutual Attunement Toast (DR-023, DR-030, DR-033).
 *
 * Triggered when both viewer and target reciprocate Attune. Premium,
 * intentional connection moment — replaces shallow recommendation-acceptance mechanics
 * with a psychology-informed celebration. Phase 1 is local state only;
 * Phase 4 will gate by `connections.state === 'mutual'` and source
 * `sharedLanguage` from the alignment summary.
 *
 * Vocab: Attune / Connected / Open conversation. Canonical only (DR-023).
 */
export const Route = createFileRoute("/_main/discover/$id_/attuned")({
  head: ({ params }) => ({
    meta: [
      { title: `Connected — COUPL` },
      {
        name: "description",
        content: `You attuned to each other. Open the conversation when you're ready.`,
      },
    ],
  }),
  component: AttunedToastScreen,
});

function AttunedToastScreen() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const profile = getProfileDetail(id);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Viewer fixture — Phase 4 will source from authenticated user.
  const viewerInitial = "M";
  const otherName = profile?.name ?? "them";
  const otherInitial = otherName[0]?.toUpperCase() ?? "·";

  // Phase 1 stub — Phase 4 will compose this from alignment summary.
  const sharedLanguage =
    "You both lead with words of attention and slow time.";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Connected with ${otherName}`}
      className="fixed inset-0 z-50 overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 35%, #2a1530 0%, #1a0d20 45%, #0c0612 100%)",
      }}
    >
      {/* Warm gold radial bloom */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[36%] h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212, 169, 102, 0.28) 0%, rgba(143, 94, 156, 0.18) 35%, transparent 70%)",
          filter: "blur(8px)",
        }}
      />
      {/* Soft ambient particles */}
      <Particles />

      <div
        className="relative mx-auto flex h-full w-full max-w-[440px] flex-col items-center px-6"
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 4rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
        }}
      >
        {/* Eyebrow */}
        <p
          className="text-[11px] font-medium uppercase tracking-[0.32em] text-[#d4a966] transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(-6px)",
          }}
        >
          Connected
        </p>

        {/* Headline */}
        <h1
          className="mt-5 text-center font-display text-[30px] leading-[1.15] text-white transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(8px)",
            transitionDelay: "120ms",
          }}
        >
          You and {otherName}
          <br />
          attuned to each other.
        </h1>

        {/* Avatars + ampersand */}
        <div
          className="relative mt-12 flex items-center justify-center gap-4 transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "scale(1)" : "scale(0.92)",
            transitionDelay: "260ms",
          }}
        >
          {/* Orbit ring */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4a966]/15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#d4a966]/25"
          />

          <Avatar initial={viewerInitial} variant="lavender" />
          <span
            className="font-display text-[28px] italic text-[#d4a966]"
            style={{ textShadow: "0 0 24px rgba(212, 169, 102, 0.55)" }}
            aria-hidden
          >
            &amp;
          </span>
          <Avatar initial={otherInitial} variant="gold" />
        </div>

        {/* Shared language card */}
        <div
          className="mt-12 w-full rounded-2xl border border-white/8 px-5 py-5 backdrop-blur-md transition-all duration-700"
          style={{
            background:
              "linear-gradient(160deg, rgba(255,255,255,0.04) 0%, rgba(212,169,102,0.06) 100%)",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "440ms",
          }}
        >
          <p className="text-center text-[10.5px] font-medium uppercase tracking-[0.28em] text-[#d4a966]">
            Shared Language
          </p>
          <p
            className="mt-3 text-center font-display text-[17px] leading-snug text-white"
            dangerouslySetInnerHTML={{ __html: italicize(sharedLanguage) }}
          />
        </div>

        {/* CTAs */}
        <div
          className="mt-8 flex w-full flex-col gap-3 transition-all duration-700"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transitionDelay: "620ms",
          }}
        >
          <Link
            to="/connections"
            className="flex items-center justify-center rounded-full bg-white px-6 py-3.5 font-display text-[16px] font-medium text-[#1a0d20] shadow-[0_8px_30px_rgba(212,169,102,0.25)] transition-transform hover:scale-[1.01] active:scale-[0.99]"
          >
            Open conversation
          </Link>
          <button
            type="button"
            onClick={() => navigate({ to: "/discover" })}
            className="rounded-full border border-[#d4a966]/40 bg-transparent px-6 py-3 font-display text-[15px] text-[#d4a966] transition-colors hover:bg-[#d4a966]/10"
          >
            I'll come back later
          </button>
        </div>
      </div>
    </div>
  );
}

function Avatar({
  initial,
  variant,
}: {
  initial: string;
  variant: "lavender" | "gold";
}) {
  const bg =
    variant === "lavender"
      ? "linear-gradient(145deg, #c9a9d6 0%, #8f5e9c 100%)"
      : "linear-gradient(145deg, #e8c896 0%, #b88a4a 100%)";
  const glow =
    variant === "lavender"
      ? "0 0 40px rgba(143, 94, 156, 0.45)"
      : "0 0 40px rgba(212, 169, 102, 0.45)";
  return (
    <div
      className="relative flex h-20 w-20 items-center justify-center rounded-full"
      style={{ background: bg, boxShadow: glow }}
    >
      <span className="font-display text-[28px] font-semibold text-white">
        {initial}
      </span>
    </div>
  );
}

/** Decorative ambient sparkles. Pure CSS — no canvas. */
function Particles() {
  const dots = Array.from({ length: 14 }, (_, i) => i);
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {dots.map((i) => {
        const top = (i * 53) % 100;
        const left = (i * 71) % 100;
        const size = 2 + (i % 3);
        const delay = (i * 0.3) % 4;
        return (
          <span
            key={i}
            className="absolute rounded-full bg-[#d4a966]"
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: size,
              height: size,
              opacity: 0.25,
              boxShadow: "0 0 6px rgba(212, 169, 102, 0.6)",
              animation: `pulse 4s ${delay}s ease-in-out infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

/** Wraps the example phrases " words of attention" / "slow time" in <em>. */
function italicize(s: string) {
  return s
    .replace(/words of attention/gi, "<em>words of attention</em>")
    .replace(/slow time/gi, "<em>slow time</em>");
}