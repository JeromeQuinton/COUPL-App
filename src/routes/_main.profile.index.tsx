import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Menu } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import {
  PROFILE_ABOUT_QUOTE,
  PROFILE_LANGUAGES,
} from "@/data/wireframe_chap_extras";

/**
 * Screen 20 — Profile.
 * Wireframe-anchored (UI-OwnProfile):
 *   header chip → identity → about → connection languages → links.
 */
export const Route = createFileRoute("/_main/profile/")({
  head: () => ({
    meta: [
      { title: "Profile — COUPL" },
      {
        name: "description",
        content: "Your own profile, languages, and audit access.",
      },
    ],
  }),
  component: ProfileScreen,
});

function ProfileScreen() {
  return (
    <YouBackdrop>
      <StatusBar
        trailing={
          <button
            type="button"
            aria-label="Profile menu"
            className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <Menu size={18} />
          </button>
        }
      />

      {/* Header */}
      <header className="px-5 pt-1 pb-4 text-center">
        <h1 className="font-display text-[26px] font-semibold text-ink">
          Profile
        </h1>
        <p className="mt-1 inline-flex items-center gap-1.5 font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-plum-700/80">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-plum-500" />
          UI-OwnProfile · Own profile
        </p>
      </header>

      {/* Identity */}
      <section className="px-5">
        <article className="flex items-center gap-4 rounded-[18px] bg-paper p-4 shadow-elev-1">
          <span
            aria-hidden
            className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full font-display text-[18px] font-semibold text-paper"
            style={{ background: "var(--plum-700)" }}
          >
            S
          </span>
          <div className="flex flex-1 flex-col">
            <p className="font-display text-[17px] font-semibold text-ink">
              Sam · 32
            </p>
            <p className="font-body text-[12px] text-stone">
              Verified · long-term
            </p>
          </div>
        </article>
      </section>

      {/* About */}
      <section className="px-5 pt-4">
        <article className="rounded-[18px] bg-paper p-4 shadow-elev-1">
          <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-plum-700/80">
            About
          </p>
          <p className="mt-2 font-display text-[14.5px] italic leading-relaxed text-ink">
            "{PROFILE_ABOUT_QUOTE}"
          </p>
        </article>
      </section>

      {/* Connection languages */}
      <section className="px-5 pt-4">
        <article className="rounded-[18px] bg-paper p-4 shadow-elev-1">
          <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-plum-700/80">
            Connection languages
          </p>
          <ul className="mt-3 flex flex-wrap items-center gap-2">
            {PROFILE_LANGUAGES.map((l) => (
              <li key={l}>
                <span className="inline-flex items-center rounded-full border border-plum-300/40 bg-lavender-100 px-3 py-1 font-body text-[12px] text-plum-700">
                  {l}
                </span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      {/* Links */}
      <section className="px-5 pt-4 pb-12">
        <ul className="flex flex-col gap-2">
          <ProfileLinkRow
            to="/profile/edit"
            title="Edit profile"
          />
          <ProfileLinkRow
            to="/profile/audit-log"
            title="Decision audit log"
            sub="Every AI nudge, transparent + reversible"
          />
          <ProfileLinkRow
            to="/profile/safety"
            title="Coach settings"
            sub="Tone, frequency, intercepts"
          />
        </ul>
      </section>
    </YouBackdrop>
  );
}

function ProfileLinkRow({
  to,
  title,
  sub,
}: {
  to: "/profile/edit" | "/profile/audit-log" | "/profile/safety";
  title: string;
  sub?: string;
}) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center justify-between gap-3 rounded-[14px] bg-paper p-4 shadow-elev-1 transition-colors hover:bg-lavender-50"
      >
        <div className="flex flex-1 flex-col">
          <span className="font-display text-[14.5px] font-medium text-ink">
            {title}
          </span>
          {sub && (
            <span className="mt-0.5 font-body text-[12px] text-stone">
              {sub}
            </span>
          )}
        </div>
        <ChevronRight size={16} className="text-stone" />
      </Link>
    </li>
  );
}
