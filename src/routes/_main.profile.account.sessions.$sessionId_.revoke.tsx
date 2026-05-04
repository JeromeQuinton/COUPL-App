import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, Smartphone, Laptop, Monitor } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute(
  "/_main/profile/account/sessions/$sessionId_/revoke",
)({
  head: () => ({ meta: [{ title: "Sign device out — COUPL" }] }),
  component: RevokeScreen,
});

// Phase 1 fixture mirrors `INITIAL` in the sessions index. Phase 4 reads
// account_state.sessions[$sessionId] from the auth backend.
const SAMPLE_SESSIONS: Record<
  string,
  { device: string; os: string; area: string; lastSeen: string; Icon: typeof Smartphone }
> = {
  this: { device: "iPhone 15 Pro", os: "iOS 18.4", area: "London, UK", lastSeen: "Now", Icon: Smartphone },
  mb: { device: "MacBook Pro", os: "Safari", area: "London, UK", lastSeen: "2 hours ago", Icon: Laptop },
  tab: { device: "iPad Pro", os: "Safari", area: "London, UK", lastSeen: "Yesterday", Icon: Monitor },
};

function RevokeScreen() {
  const navigate = useNavigate();
  const { sessionId } = useParams({
    from: "/_main/profile/account/sessions/$sessionId_/revoke",
  });
  const session = SAMPLE_SESSIONS[sessionId];

  if (!session) {
    return (
      <YouBackdrop tone="serious">
        <StatusBar
          leading={
            <Link
              to="/profile/account/sessions"
              aria-label="Back"
              className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
            >
              <ChevronLeft size={18} />
            </Link>
          }
        />
        <div className="px-5 pt-12 text-center">
          <p className="text-label-mono">Not found</p>
          <h1 className="mt-3 font-display text-[22px] text-ink">
            That session is no longer signed in.
          </h1>
        </div>
      </YouBackdrop>
    );
  }

  const Icon = session.Icon;

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile/account/sessions"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Account · sign out a device</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Sign this device out?
        </h1>
      </header>

      <section className="px-5">
        <article className="flex items-start gap-3 rounded-[18px] bg-paper p-5 shadow-elev-1">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lavender-100 text-plum-700">
            <Icon size={18} strokeWidth={1.75} />
          </span>
          <div>
            <p className="font-display text-[15px] text-ink">{session.device}</p>
            <p className="mt-1 font-body text-[12.5px] text-stone">
              {session.os} · {session.area}
            </p>
            <p className="mt-0.5 font-body text-[12.5px] text-stone">
              Last seen {session.lastSeen}
            </p>
          </div>
        </article>
      </section>

      <section className="px-5 pt-5">
        <p className="font-body text-[13.5px] italic leading-relaxed text-slate">
          Whoever's on this device will need to sign in again. They won't be
          told who did it.
        </p>
      </section>

      <div className="px-5 pt-8 pb-12 space-y-3">
        <button
          type="button"
          onClick={() => navigate({ to: "/profile/account/sessions" })}
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Sign out
        </button>
        <Link
          to="/profile/account/sessions"
          className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Cancel
        </Link>
      </div>
    </YouBackdrop>
  );
}
