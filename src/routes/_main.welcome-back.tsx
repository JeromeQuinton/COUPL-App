import { createFileRoute, Link } from "@tanstack/react-router";

// TODO: trigger condition (e.g. >7 days inactive) is a follow-up.
// This route is reachable via direct URL only in Phase 1.

export const Route = createFileRoute("/_main/welcome-back")({
  head: () => ({ meta: [{ title: "Welcome back — COUPL" }] }),
  component: WelcomeBack,
});

function WelcomeBack() {
  // TODO: wire to useLatestReflection() when the data hook lands.
  const lastReflection = {
    forDate: "Last Tuesday",
    body:
      "Slower this week. The pause helped. I noticed I came back with more to say.",
  };

  // TODO: wire to a one-connection-update hook.
  const connectionUpdate = {
    name: "Sam",
    detail: "shared a reflection 3 days ago",
  };

  return (
    <div className="relative px-5 pb-16 pt-10">
      <p className="text-label-mono text-plum-500">WELCOME BACK</p>
      <h1 className="mt-4 font-display text-[34px] leading-[1.1] text-ink">
        <em className="font-display italic">Pace</em> stays where you left it.
      </h1>
      <p className="mt-3 font-body text-[14px] text-slate">We held your place.</p>

      <section className="mt-10">
        <p className="text-label-mono text-stone">YOUR LAST REFLECTION</p>
        <article className="mt-3 rounded-[16px] bg-paper p-5 shadow-elev-1">
          <p className="font-body text-[12px] uppercase tracking-[0.12em] text-stone">
            {lastReflection.forDate}
          </p>
          <p className="mt-2 font-display text-[15px] italic leading-relaxed text-ink">
            {lastReflection.body}
          </p>
        </article>
      </section>

      <section className="mt-8">
        <p className="text-label-mono text-stone">WHILE YOU WERE AWAY</p>
        {connectionUpdate ? (
          <article className="mt-3 rounded-[16px] bg-paper p-5 shadow-elev-1">
            <p className="font-display text-[14.5px] font-medium text-ink">
              {connectionUpdate.name} {connectionUpdate.detail}.
            </p>
          </article>
        ) : (
          <p className="mt-3 font-body text-[13px] italic text-stone">
            Nothing new. That's allowed.
          </p>
        )}
      </section>

      <div className="mt-12 flex flex-col gap-3">
        <Link
          to="/discover"
          className="block rounded-full bg-plum-700 px-5 py-3.5 text-center font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Resume Discover
        </Link>
        <Link
          to="/home"
          className="block px-5 py-2.5 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
        >
          Stay quiet for now
        </Link>
      </div>
    </div>
  );
}
