import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_main/dev-routes")({
  head: () => ({ meta: [{ title: "All routes — COUPL (dev)" }] }),
  component: DevRoutesIndex,
});

const SECTIONS: { title: string; rows: { label: string; to: string; params?: Record<string, string> }[] }[] = [
  {
    title: "Connection thread (Ava)",
    rows: [
      { label: "Thread", to: "/connections/$id", params: { id: "ava" } },
      { label: "Insights archive", to: "/connections/$id/insights", params: { id: "ava" } },
      { label: "Propose plan", to: "/connections/$id/propose-plan", params: { id: "ava" } },
      { label: "Counter-propose", to: "/connections/$id/counter-plan", params: { id: "ava" } },
      { label: "Plan update", to: "/connections/$id/plan-update", params: { id: "ava" } },
      { label: "Date quiz", to: "/connections/$id/date-quiz", params: { id: "ava" } },
      { label: "Date plan detail", to: "/connections/$id/date-plan", params: { id: "ava" } },
      { label: "Coach insight", to: "/connections/$id/coach-insight", params: { id: "ava" } },
      { label: "Green flag", to: "/connections/$id/green-flag", params: { id: "ava" } },
      { label: "Red flag", to: "/connections/$id/red-flag", params: { id: "ava" } },
      { label: "Connected (match moment)", to: "/connections/$id/connected", params: { id: "ava" } },
      { label: "First hello", to: "/connections/$id/first-hello", params: { id: "ava" } },
      { label: "Cool-off", to: "/connections/$id/cool-off", params: { id: "ava" } },
      { label: "Clean ending", to: "/connections/$id/clean-ending", params: { id: "ava" } },
      { label: "Reflection", to: "/connections/$id/reflection", params: { id: "ava" } },
      { label: "Draft pause", to: "/connections/$id/draft-pause", params: { id: "ava" } },
    ],
  },
  {
    title: "Video — Pre-meet",
    rows: [
      { label: "Outgoing call", to: "/video/pre-meet/$connectionId", params: { connectionId: "ava" } },
      { label: "Incoming call", to: "/video/pre-meet/$connectionId/incoming", params: { connectionId: "ava" } },
      { label: "Active call", to: "/video/pre-meet/$connectionId/active", params: { connectionId: "ava" } },
      { label: "Ended call", to: "/video/pre-meet/$connectionId/ended", params: { connectionId: "ava" } },
    ],
  },
  {
    title: "Video — Workshop (live session)",
    rows: [
      { label: "Lobby", to: "/video/workshop/$workshopId", params: { workshopId: "demo" } },
      { label: "Live session", to: "/video/workshop/$workshopId/live", params: { workshopId: "demo" } },
      { label: "Ended", to: "/video/workshop/$workshopId/ended", params: { workshopId: "demo" } },
    ],
  },
  {
    title: "Video — Coach (Liora)",
    rows: [
      { label: "Booking", to: "/video/coach/booking" },
      { label: "Lobby", to: "/video/coach/$bookingId/lobby", params: { bookingId: "demo" } },
      { label: "Active", to: "/video/coach/$bookingId/active", params: { bookingId: "demo" } },
      { label: "Ended", to: "/video/coach/$bookingId/ended", params: { bookingId: "demo" } },
    ],
  },
  {
    title: "Video — Permissions",
    rows: [{ label: "Permissions primer", to: "/video/permissions" }],
  },
  {
    title: "Discover follow-ons",
    rows: [
      { label: "Profile detail (Maya)", to: "/discover/$id", params: { id: "maya" } },
      { label: "About expand", to: "/discover/$id/about", params: { id: "maya" } },
      { label: "Saved profiles", to: "/discover/saved" },
      { label: "Quiet day", to: "/discover/quiet-day" },
      { label: "Connection languages", to: "/discover/$id/insights/connection-languages", params: { id: "maya" } },
    ],
  },
  {
    title: "Date plans",
    rows: [
      { label: "City date plans library", to: "/date-plans" },
      { label: "Hampstead Heath walk", to: "/date-plans/$id", params: { id: "london-hampstead-heath" } },
    ],
  },
  {
    title: "Membership",
    rows: [
      { label: "Ladder", to: "/membership" },
      { label: "Plans + currency picker", to: "/membership/plans" },
      { label: "Subscription detail", to: "/membership/subscription" },
      { label: "Cancel flow", to: "/membership/subscription/cancel" },
      { label: "Pause flow", to: "/membership/subscription/pause" },
    ],
  },
  {
    title: "Safety",
    rows: [
      { label: "Safety hub", to: "/profile/safety" },
      { label: "Report start", to: "/profile/safety/report" },
      { label: "Report submit form", to: "/profile/safety/report/submit" },
      { label: "Reports history", to: "/profile/safety/reports" },
      { label: "Block list", to: "/profile/safety/blocked" },
    ],
  },
  {
    title: "Settings + account",
    rows: [
      { label: "Account", to: "/profile/account" },
      { label: "Notifications", to: "/profile/notifications" },
      { label: "Help", to: "/profile/help" },
      { label: "Coach settings", to: "/profile/coach-settings" },
      { label: "Visibility audit", to: "/profile/visibility" },
      { label: "Decision audit log", to: "/profile/audit-log" },
      { label: "Data export", to: "/profile/data/export" },
    ],
  },
  {
    title: "Host mode",
    rows: [
      { label: "Dashboard", to: "/host" },
      { label: "New room (type picker)", to: "/host/new" },
      { label: "Workshop step 1", to: "/host/new/workshop" },
      { label: "Workshop step 3 (detail)", to: "/host/new/workshop-detail" },
      { label: "Workshop step 4 (review)", to: "/host/new/workshop-review" },
      { label: "Community step 1", to: "/host/new/community" },
      { label: "Community step 2 (detail)", to: "/host/new/community-detail" },
      { label: "Community step 3 (review)", to: "/host/new/community-review" },
      { label: "Pre-event attendees", to: "/host/attendees" },
    ],
  },
  {
    title: "Onboarding edge states",
    rows: [
      { label: "Resume", to: "/onboarding/resume" },
      { label: "Paused", to: "/onboarding/paused" },
      { label: "Offline", to: "/system/offline" },
      { label: "Verification failed", to: "/system/verification-failed" },
    ],
  },
];

function DevRoutesIndex() {
  return (
    <div
      className="min-h-[100dvh] px-5 bg-paper"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)", paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
    >
      <div className="mx-auto max-w-[640px]">
        <Link to="/profile" aria-label="Back" className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50">
          <ChevronLeft size={18} />
        </Link>

        <p className="mt-4 text-label-mono">Dev navigation</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          All routes — for testing
        </h1>
        <p className="mt-3 font-body text-[13px] italic text-stone">
          Phase 1 surface inventory. Use direct URL or tap rows below. Remove this route before launch.
        </p>

        {SECTIONS.map((section) => (
          <section key={section.title} className="mt-8">
            <h2 className="text-label-mono">{section.title.toUpperCase()}</h2>
            <ul className="mt-3 space-y-1.5">
              {section.rows.map((r) => (
                <li key={r.to + JSON.stringify(r.params ?? {})}>
                  <Link
                    /* eslint-disable @typescript-eslint/no-explicit-any */
                    to={r.to as any}
                    params={r.params as any}
                    /* eslint-enable @typescript-eslint/no-explicit-any */
                    className="block rounded-[10px] border border-line bg-paper px-4 py-2.5 font-body text-[13.5px] text-ink hover:bg-lavender-50"
                  >
                    {r.label}
                    <span className="ml-2 text-label-mono text-stone">{r.to}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
