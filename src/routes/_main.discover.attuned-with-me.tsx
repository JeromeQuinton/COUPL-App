import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Lock } from "lucide-react";

/**
 * /discover/attuned-with-me — see who attuned to you.
 *
 * Premium-defining surface. Free-tier sees blurred preview + paywall.
 * Member sees full grid.
 *
 * Stream-19 SCREEN-20.
 */
export const Route = createFileRoute("/_main/discover/attuned-with-me")({
  head: () => ({ meta: [{ title: "Attuned with me — COUPL" }] }),
  component: AttunedWithMeScreen,
});

// V0 — flip to false to QA paywall.
const IS_PAID_USER_V0 = true;

const PEOPLE = [
  { id: "maya", name: "Maya", age: 31, swatch: "#E8C8D6", note: "2 days ago" },
  { id: "sam", name: "Sam", age: 34, swatch: "#C8D6E8", note: "3 days ago" },
  { id: "rae", name: "Rae", age: 29, swatch: "#D6E8C8", note: "4 days ago" },
  { id: "ava", name: "Ava", age: 32, swatch: "#E8D6C8", note: "this week" },
  { id: "noor", name: "Noor", age: 30, swatch: "#D6C8E8", note: "this week" },
  { id: "kit", name: "Kit", age: 33, swatch: "#C8E8D6", note: "last week" },
];

function AttunedWithMeScreen() {
  return (
    <div className="relative px-5 pb-16 pt-6">
      <header className="flex items-center gap-3">
        <Link to="/discover" aria-label="Back" className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="text-label-mono">Discover · attuned with me</p>
      </header>

      <h1 className="mt-3 font-display text-[28px] leading-[1.1] text-ink">
        People who <em className="font-display italic">noticed you.</em>
      </h1>
      <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
        These six attuned to you in the last fortnight. Open one when you're
        ready to look back.
      </p>

      {!IS_PAID_USER_V0 && (
        <article className="mt-6 rounded-[18px] border border-plum-300/40 bg-paper p-5 shadow-elev-1">
          <p className="text-label-mono">Membership</p>
          <p className="mt-2 font-display text-[18px] italic leading-snug text-ink">
            Seeing who's noticed you is part of Membership.
          </p>
          <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
            Free remains intentional. Membership expands.
          </p>
          <Link
            to="/membership/plans"
            className="mt-4 inline-flex rounded-full bg-plum-700 px-5 py-2.5 font-body text-[13.5px] font-medium text-paper hover:bg-plum-500"
          >
            See plans →
          </Link>
        </article>
      )}

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PEOPLE.map((p) => (
          <Link
            key={p.id}
            to={IS_PAID_USER_V0 ? "/discover/$id" : "/membership/plans"}
            params={IS_PAID_USER_V0 ? { id: p.id } : undefined}
            className="group block overflow-hidden rounded-[16px] bg-paper shadow-elev-1"
          >
            <div
              aria-hidden
              className="relative h-[140px] w-full"
              style={{ background: p.swatch }}
            >
              {!IS_PAID_USER_V0 && (
                <div
                  aria-hidden
                  className="absolute inset-0 grid place-items-center"
                  style={{ backdropFilter: "blur(14px)", background: "color-mix(in oklab, var(--paper) 30%, transparent)" }}
                >
                  <Lock size={18} className="text-plum-700" />
                </div>
              )}
            </div>
            <div className="px-3 py-2.5">
              <p className="font-display text-[14px] text-ink">
                {IS_PAID_USER_V0 ? `${p.name} · ${p.age}` : "—"}
              </p>
              <p className="mt-0.5 font-body text-[11.5px] text-stone">{p.note}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
