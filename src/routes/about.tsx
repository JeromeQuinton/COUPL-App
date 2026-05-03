import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — COUPL" }] }),
  component: About,
});

function About() {
  return (
    <div className="min-h-[100dvh] bg-paper px-5 py-12">
      <article className="mx-auto max-w-[640px]">
        <p className="text-label-mono text-stone">ABOUT COUPL</p>
        <h1 className="mt-4 font-display text-[36px] leading-[1.1] text-ink">
          What if dating could be <em className="font-display italic">considered?</em>
        </h1>

        <section className="mt-24">
          <p className="text-label-mono text-stone">WHAT COUPL IS</p>
          <p className="mt-3 font-body text-[15.5px] leading-relaxed text-ink">
            A dating app for people who want to do this carefully. We move slower. We ask better
            questions. We surface fewer matches but pay closer attention to the ones we do.
          </p>
        </section>

        <section className="mt-24">
          <p className="text-label-mono text-stone">WHAT COUPL ISN'T</p>
          <p className="mt-3 font-body text-[15.5px] leading-relaxed text-ink">
            It isn't a swipe deck. It isn't a numbers game. It isn't a place to perform. There's no
            streak. No score. No ranking.
          </p>
        </section>

        <section className="mt-24">
          <p className="text-label-mono text-stone">WHY WE BUILT IT THIS WAY</p>
          <p className="mt-3 font-body text-[15.5px] leading-relaxed text-ink">
            Dating online has flattened into something it didn't have to become. We think people
            deserve a tool that respects how <em className="font-display italic">connection</em>{" "}
            actually works — slowly, with attention, with the option to pause.
          </p>
        </section>

        <div className="mt-24 flex justify-center">
          <Link
            to="/auth/sign-up"
            className="rounded-full bg-plum-700 px-7 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Get started
          </Link>
        </div>

        <footer className="mt-20 flex justify-center gap-6 border-t border-line/40 pt-6 font-body text-[12px] text-stone">
          <Link to="/press" className="hover:text-plum-700">Press</Link>
          <a href="mailto:hello@coupl.app" className="hover:text-plum-700">Contact</a>
        </footer>
      </article>
    </div>
  );
}
