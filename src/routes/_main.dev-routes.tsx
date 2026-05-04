import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { DEV_ROUTE_SECTIONS } from "@/data/dev-routes.generated";

export const Route = createFileRoute("/_main/dev-routes")({
  head: () => ({ meta: [{ title: "All routes — COUPL (dev)" }] }),
  component: DevRoutesIndex,
});

function DevRoutesIndex() {
  return (
    <div
      className="min-h-[100dvh] px-5 bg-paper"
      style={{
        paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
      }}
    >
      <div className="mx-auto max-w-[640px]">
        <Link
          to="/profile"
          aria-label="Back"
          className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft size={18} />
        </Link>

        <p className="mt-4 text-label-mono">Dev navigation</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          All routes — for testing
        </h1>
        <p className="mt-3 font-body text-[13px] italic text-stone">
          Generated from <code>src/routes/</code> on every build. Override a label with{" "}
          <code>// @dev-label: …</code>; exclude with <code>// @dev-skip</code>. Remove this
          route before launch.
        </p>

        {DEV_ROUTE_SECTIONS.map((section) => (
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
