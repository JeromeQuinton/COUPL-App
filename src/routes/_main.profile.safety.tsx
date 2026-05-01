import { Outlet, createFileRoute, Link, useLocation } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { SAFETY_ROWS } from "@/data/wireframe_chap_extras";

/**
 * Screen 21 — Safety + Wellbeing hub.
 * Wireframe-anchored (UI-SafetyHub):
 *   back → header → principle card → list rows.
 * AD-YOU-WF1: route now serves as hub, replacing the prior single-purpose
 * report form. The report form fixtures (INCIDENT_CATEGORIES) remain
 * available for the next iteration's `/profile/safety/report` sub-route.
 */
export const Route = createFileRoute("/_main/profile/safety")({
  head: () => ({ meta: [{ title: "Safety + Wellbeing — COUPL" }] }),
  component: SafetyHubScreen,
});

function SafetyHubScreen() {
  const { pathname } = useLocation();
  // When a sub-route (e.g. /profile/safety/report) is matched, defer
  // rendering to the child via Outlet rather than showing the hub.
  if (pathname !== "/profile/safety") {
    return <Outlet />;
  }
  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile"
            aria-label="Back to Profile"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      {/* Header */}
      <header className="px-5 pt-1 pb-4 text-center">
        <h1 className="font-display text-[24px] font-semibold text-ink">
          Safety + Wellbeing
        </h1>
        <p className="mt-1 inline-flex items-center gap-1.5 font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-plum-700/80">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-plum-500" />
          UI-SafetyHub · Safety + wellbeing hub
        </p>
      </header>

      {/* Principle card */}
      <section className="px-5">
        <article
          className="rounded-[18px] border border-pink-100 p-4 shadow-elev-1"
          style={{
            background:
              "linear-gradient(160deg, color-mix(in oklab, var(--pink-100) 65%, var(--paper)) 0%, color-mix(in oklab, var(--pink-100) 28%, var(--paper)) 100%)",
          }}
        >
          <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-plum-700">
            For both parties
          </p>
          <p className="mt-2 font-display text-[15.5px] font-medium leading-snug text-ink">
            Dignity-preserving by default. No leaking of non-mutual signals.
          </p>
        </article>
      </section>

      {/* Rows */}
      <section className="px-5 pt-4 pb-12">
        <ul className="flex flex-col gap-2">
          {SAFETY_ROWS.map((row) => (
            <li key={row.id}>
              <Link
                to={row.to}
                className="flex items-center justify-between gap-3 rounded-[14px] bg-paper p-4 shadow-elev-1 transition-colors hover:bg-lavender-50"
              >
                <div className="flex flex-1 flex-col">
                  <span className="font-display text-[14.5px] font-medium text-ink">
                    {row.title}
                  </span>
                  <span className="mt-0.5 font-body text-[12px] text-stone">
                    {row.sub}
                  </span>
                </div>
                <ChevronRight size={16} className="text-stone" />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </YouBackdrop>
  );
}
