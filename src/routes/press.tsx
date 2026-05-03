import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/press")({
  head: () => ({ meta: [{ title: "Press — COUPL" }] }),
  component: Press,
});

// Brand palette tokens — referenced via CSS vars at render time.
const SWATCHES = [
  { label: "Deep Indigo", token: "var(--plum-700)" },
  { label: "Brand Violet", token: "var(--plum-500)" },
  { label: "Brand Pink", token: "var(--blush)" },
  { label: "Soft Blush", token: "var(--pink-100)" },
];

function Press() {
  return (
    <div className="min-h-[100dvh] bg-paper px-5 py-12">
      <article className="mx-auto max-w-[720px]">
        <p className="text-label-mono text-stone">PRESS &amp; BRAND</p>
        <h1 className="mt-4 font-display text-[34px] leading-tight text-ink">For media.</h1>

        <section className="mt-16">
          <p className="text-label-mono text-stone">LOGO</p>
          <div className="mt-3 flex gap-4 font-body text-[14px]">
            <a href="/assets/coupl-logo.png" className="text-plum-700 hover:underline">Logo · PNG</a>
            <a href="/assets/coupl-logo.svg" className="text-plum-700 hover:underline">Logo · SVG</a>
          </div>
          <p className="mt-2 font-body text-[12.5px] text-stone">
            Use on light backgrounds. Maintain clearspace equal to the height of the C.
          </p>
        </section>

        <section className="mt-16">
          <p className="text-label-mono text-stone">PALETTE</p>
          <div
            aria-hidden
            className="mt-4 h-20 w-full rounded-[16px]"
            style={{
              background:
                "linear-gradient(90deg, var(--plum-700) 0%, var(--plum-500) 35%, var(--blush) 70%, var(--pink-100) 100%)",
            }}
          />
          <ul className="mt-4 grid grid-cols-4 gap-3">
            {SWATCHES.map((s) => (
              <li key={s.label} className="flex flex-col items-center gap-2">
                <span
                  aria-hidden
                  className="h-12 w-12 rounded-full ring-1 ring-line"
                  style={{ background: s.token }}
                />
                <span className="text-center font-body text-[11px] text-stone">{s.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <p className="text-label-mono text-stone">QUOTE</p>
          <blockquote className="mt-4 font-display text-[22px] italic leading-relaxed text-ink">
            "We're not optimising for engagement. We're optimising for the kind of attention real
            connection asks for."
          </blockquote>
          <p className="mt-3 text-label-mono text-stone">— JEROME QUINTON, FOUNDER</p>
        </section>

        <section className="mt-16">
          <p className="text-label-mono text-stone">PRODUCT</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                aria-label={`COUPL product shot ${n}`}
                className="aspect-[9/16] rounded-[14px] ring-1 ring-line"
                style={{
                  background:
                    "linear-gradient(160deg, color-mix(in oklab, var(--lavender-100) 60%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 50%, var(--paper)) 100%)",
                }}
              />
            ))}
          </div>
          <p className="mt-3 font-body text-[12.5px] text-stone">
            High-res shots available on request.
          </p>
        </section>

        <section className="mt-16">
          <p className="text-label-mono text-stone">CONTACT</p>
          <p className="mt-3 font-body text-[14px] text-ink">
            Media enquiries:{" "}
            <a href="mailto:press@coupl.app" className="text-plum-700 hover:underline">
              press@coupl.app
            </a>
          </p>
        </section>

        <footer className="mt-20 flex justify-center gap-6 border-t border-line/40 pt-6 font-body text-[12px] text-stone">
          <Link to="/about" className="hover:text-plum-700">About</Link>
          <Link to="/founder" className="hover:text-plum-700">Founder</Link>
        </footer>
      </article>
    </div>
  );
}
