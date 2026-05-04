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

const PROFILE_COMPLETION = 65;

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

      {/* Completeness — appears when <100% */}
      {PROFILE_COMPLETION < 100 && (
        <section className="px-5 pb-3">
          <Link
            to="/profile/completeness"
            className="flex items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-3 shadow-elev-1 transition-colors hover:bg-lavender-50"
          >
            <div className="min-w-0 flex-1">
              <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-plum-700/80">
                Profile · what's still to come
              </p>
              <p className="mt-1 font-display text-[14px] italic text-ink">
                You're {PROFILE_COMPLETION}% there.
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-lavender-50">
                <div
                  aria-hidden
                  className="h-full rounded-full bg-plum-500"
                  style={{ width: `${PROFILE_COMPLETION}%` }}
                />
              </div>
            </div>
            <ChevronRight size={16} className="shrink-0 text-stone" />
          </Link>
        </section>
      )}

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
            to="/dev-routes"
            title="🧪 Dev routes (all surfaces)"
            sub="Every shipped route, for testing. Remove before launch."
          />
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
            to="/profile/visibility"
            title="Visibility audit"
            sub="Who saw you, and when"
          />
          <ProfileLinkRow
            to="/profile/coach-settings"
            title="Polaris settings"
            sub="How Polaris shows up"
          />
          <ProfileLinkRow
            to="/profile/account"
            title="Account"
            sub="Email, phone, password, 2FA"
          />
          <ProfileLinkRow
            to="/profile/notifications"
            title="Notifications"
            sub="What gets your attention"
          />
          <ProfileLinkRow
            to="/profile/help"
            title="Help"
            sub="Topics + contact"
          />
          <ProfileLinkRow
            to="/date-plans"
            title="Date ideas"
            sub="Curated places that make a first meet easier"
          />
          <ProfileLinkRow
            to="/calendar"
            title="Calendar"
            sub="Plans, workshops, events in one view"
          />
          <ProfileLinkRow
            to="/polaris"
            title="Polaris"
            sub="Your attachment-health view"
          />
          <ProfileLinkRow
            to="/membership"
            title="Membership"
            sub="Free · upgrade for depth"
          />
          <ProfileLinkRow
            to="/host"
            title="Host mode"
            sub="Workshops · community rooms"
          />
          <ProfileLinkRow
            to="/profile/safety"
            title="Safety hub"
            sub="Pause, share, verification, privacy"
          />
          <ProfileLinkRow
            to="/profile/data/export/start"
            title="Data export"
            sub="Take your record with you"
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
  to:
    | "/profile/edit"
    | "/profile/audit-log"
    | "/profile/visibility"
    | "/profile/safety"
    | "/profile/coach-settings"
    | "/membership"
    | "/host"
    | "/profile/data/export/start"
    | "/profile/account"
    | "/profile/notifications"
    | "/profile/help"
    | "/date-plans"
    | "/polaris"
    | "/calendar"
    | "/dev-routes";
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
