import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

/**
 * /video/workshop/$workshopId/feedback — post-workshop reflective close.
 *
 * Sister to SCREEN-23 (coach feedback). Two slow questions, save to journal
 * with workshop tag. Skip option. Polaris vocab throughout — no rating, no
 * stars; the save itself is the value.
 *
 * Stream-20 SCREEN-26.
 */
export const Route = createFileRoute("/_main/video/workshop/$workshopId/feedback")({
  head: () => ({ meta: [{ title: "After the workshop — COUPL" }] }),
  component: WorkshopFeedbackScreen,
});

function WorkshopFeedbackScreen() {
  const { workshopId } = useParams({
    from: "/_main/video/workshop/$workshopId/feedback",
  });
  const [landed, setLanded] = useState("");
  const [next, setNext] = useState("");
  const [saved, setSaved] = useState(false);

  if (saved) {
    return (
      <main className="mx-auto max-w-[480px] px-6 pt-16 text-center">
        <p className="text-label-mono">Saved to journal</p>
        <h1 className="mt-3 font-display text-[26px] italic leading-tight text-ink">
          Held quietly. <em>For later.</em>
        </h1>
        <Link
          to="/growth"
          className="mt-8 inline-flex rounded-full bg-plum-700 px-6 py-3 font-body text-[14px] font-medium text-paper hover:bg-plum-500"
        >
          Back to Growth
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[480px] px-6 pt-8 pb-16">
      <Link
        to="/video/workshop/$workshopId/ended"
        params={{ workshopId }}
        aria-label="Back"
        className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
      >
        <ChevronLeft className="h-5 w-5" />
      </Link>

      <p className="mt-4 text-label-mono">After the workshop</p>
      <h1 className="mt-2 font-display text-[26px] italic leading-tight text-ink">
        Two slow questions.
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSaved(true);
        }}
        className="mt-8 space-y-5"
      >
        <label className="block">
          <span className="text-label-mono">What landed?</span>
          <textarea
            value={landed}
            onChange={(e) => setLanded(e.target.value)}
            rows={4}
            placeholder="A line, a sentence, an image. Whatever stayed."
            className="mt-2 w-full rounded-[12px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder:text-stone"
          />
        </label>

        <label className="block">
          <span className="text-label-mono">What to bring next time?</span>
          <textarea
            value={next}
            onChange={(e) => setNext(e.target.value)}
            rows={3}
            placeholder="The thing that's still loose."
            className="mt-2 w-full rounded-[12px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder:text-stone"
          />
        </label>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setSaved(true)}
            className="flex-1 rounded-full border border-line bg-paper px-5 py-3 font-body text-[14px] text-ink hover:bg-lavender-50"
          >
            Skip
          </button>
          <button
            type="submit"
            className="flex-1 rounded-full bg-plum-700 px-5 py-3 font-body text-[14px] font-medium text-paper hover:bg-plum-500"
          >
            Save to journal
          </button>
        </div>
      </form>
    </main>
  );
}
