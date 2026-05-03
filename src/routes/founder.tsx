import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/founder")({
  head: () => ({ meta: [{ title: "Founder — COUPL" }] }),
  component: Founder,
});

function Founder() {
  return (
    <div className="min-h-[100dvh] bg-paper px-5 py-12">
      <article className="mx-auto max-w-[640px]">
        <div
          className="mx-auto h-[320px] w-[320px] rounded-[24px]"
          aria-label="Jerome — founder of COUPL"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--lavender-100) 60%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 70%, var(--paper)) 100%)",
          }}
        />
        <p className="mt-12 text-label-mono text-stone">A NOTE FROM THE FOUNDER</p>
        <h1 className="mt-4 font-display text-[34px] leading-[1.15] text-ink">
          Why am I building this?
        </h1>

        <div className="mt-10 space-y-5 font-body text-[15.5px] leading-relaxed text-ink">
          <p>
            I'm Jerome. I've been thinking about modern dating for years — what it asks of us, what
            it returns, where it quietly hurts.
          </p>
          <p>
            Most apps I tried were optimised for engagement. Mine isn't. COUPL is built around the
            idea that connection requires <em className="font-display italic">attention</em>, and
            attention requires <em className="font-display italic">time</em>. Neither of those
            things scales the way swipes do.
          </p>
          <p>
            What I noticed: people don't want more matches. They want fewer, better ones. They want
            to feel met, not measured. They want a place where slowness isn't a flaw.
          </p>
          <p>
            So this is what I'm building. Not a revolution. Just something more{" "}
            <em className="font-display italic">considered</em>.
          </p>
        </div>

        <p className="mt-12 text-label-mono text-stone">— JEROME, FOUNDER</p>

        <footer className="mt-20 flex justify-center gap-6 border-t border-line/40 pt-6 font-body text-[12px] text-stone">
          <Link to="/press" className="hover:text-plum-700">Press</Link>
          <a href="mailto:hello@coupl.app" className="hover:text-plum-700">Contact</a>
        </footer>
      </article>
    </div>
  );
}
