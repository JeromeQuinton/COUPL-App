import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { X } from "lucide-react";

export const Route = createFileRoute("/_main/discover/$id_/about")({
  head: () => ({ meta: [{ title: "About — COUPL" }] }),
  component: AboutExpand,
});

const SAMPLE_ABOUT = {
  quote:
    "I notice the small things first — the way someone holds a coffee, what they laugh at twice.",
  context: [
    "She mentioned reading the same book three times in different decades. That's a person who returns to things, not collects them.",
    "What stands out is the absence of performance. Most profiles work hard. This one doesn't.",
  ],
};

function AboutExpand() {
  const { id } = useParams({ from: "/_main/discover/$id_/about" });

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-ink/40">
      <Link
        to="/discover/$id"
        params={{ id }}
        aria-label="Close about"
        className="absolute inset-0"
      />
      <div
        className="relative z-10 w-full max-w-md rounded-t-3xl bg-paper px-6 pb-10 pt-3"
        style={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        <span aria-hidden className="mx-auto mb-3 block h-1 w-10 rounded-full bg-line" />

        <div className="flex items-center justify-between">
          <p className="text-label-mono text-stone">ABOUT</p>
          <Link
            to="/discover/$id"
            params={{ id }}
            aria-label="Close about"
            className="grid h-8 w-8 place-items-center rounded-full text-slate hover:bg-lavender-100"
          >
            <X size={16} />
          </Link>
        </div>

        <p className="mt-4 font-display text-[20px] italic leading-snug text-ink">
          "{SAMPLE_ABOUT.quote}"
        </p>

        <div className="mt-6 space-y-4">
          {SAMPLE_ABOUT.context.map((para, i) => (
            <p key={i} className="font-body text-[14px] leading-relaxed text-ink">
              {para}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
