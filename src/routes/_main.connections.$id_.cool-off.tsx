import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { COOL_OFF_OPTIONS, getConnection, SAMPLE_COOL_OFF } from "@/data/connections_sample";

/**
 * /connections/$id/cool-off — Cool-off State (Screen 16).
 *
 * 24-hour deliberate distance after a block. Calm beeswax timer card,
 * four ordered options. The other person is not told. No urgency
 * theatre — the timer is informational, not pressuring.
 */
export const Route = createFileRoute("/_main/connections/$id_/cool-off")({
  head: () => ({
    meta: [
      { title: "Cool-off — COUPL" },
      {
        name: "description",
        content: "A 24-hour pause to decide properly. They have not been told.",
      },
    ],
  }),
  component: CoolOffScreen,
});

function CoolOffScreen() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "them";

  return (
    <PageBackdrop>
      <div
        className="mx-auto w-full max-w-[460px] px-5"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
        }}
      >
        {/* Header row */}
        <header className="flex items-center justify-between">
          <Link
            to="/connections/$id"
            params={{ id }}
            aria-label="Back to thread"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-display text-[16.5px] font-semibold text-ink">
            Cool-off · {name}
          </h1>
          <span aria-hidden className="w-8" />
        </header>

        {/* State eyebrow */}
        <p className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-plum-500">
          <span className="opacity-60">UI-CoolOff · </span>Cool-off state
        </p>

        {/* Timer card */}
        <article
          className="mt-3 rounded-[18px] border border-plum-300/25 px-5 py-5 shadow-[0_1px_2px_rgba(61,26,71,0.06)]"
          style={{
            background:
              "linear-gradient(150deg, color-mix(in oklab, var(--blush) 70%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 35%, var(--paper)) 100%)",
          }}
        >
          <p className="font-display text-[12px] font-semibold uppercase tracking-[0.18em] text-plum-700">
            {SAMPLE_COOL_OFF.hoursLeft}H {SAMPLE_COOL_OFF.minutesLeft}M LEFT
          </p>
          <p className="mt-2 font-display text-[18.5px] leading-snug text-ink">
            You blocked {name}. You have 24h to decide properly.
          </p>
          <p className="mt-2 text-[12.5px] text-stone">
            They have not been told.
          </p>
        </article>

        {/* Options */}
        <ul className="mt-5 flex flex-col gap-2.5">
          {COOL_OFF_OPTIONS.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                onClick={() => navigate({ to: "/connections" })}
                className="block w-full rounded-[16px] border border-line bg-paper px-4 py-3.5 text-left shadow-elev-1 transition-colors hover:bg-lavender-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-500"
              >
                <p className="font-display text-[15px] font-semibold text-ink">
                  {o.title}
                </p>
                <p className="mt-0.5 font-body text-[12.5px] text-slate">
                  {o.sub}
                </p>
              </button>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-center text-[11.5px] italic text-stone">
          A held breath is also a choice.
        </p>
      </div>
    </PageBackdrop>
  );
}