import { useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { PolarisHeader } from "@/components/shell/PolarisHeader";
import { getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/first-hello — first message composer.
 *
 * Polaris-toned: specificity > polish. Phase 1 sends locally and routes
 * to the open thread; Phase 4 will persist via `messages` and run the
 * draft-classifier server-side.
 */
export const Route = createFileRoute("/_main/connections/$id_/first-hello")({
  head: () => ({
    meta: [
      { title: "Open with one true thing — COUPL" },
      {
        name: "description",
        content:
          "Skip performance. Start with something specific, warm, and real.",
      },
    ],
  }),
  component: FirstHelloScreen,
});

function FirstHelloScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/first-hello" });
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "them";
  const [draft, setDraft] = useState("");

  const send = () => {
    if (!draft.trim()) return;
    navigate({ to: "/connections/$id", params: { id } });
  };

  return (
    <PageBackdrop>
      <div
        className="mx-auto flex w-full max-w-[480px] flex-col px-6"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
        }}
      >
        <header className="flex items-center gap-2 py-2">
          <Link
            to="/connections/$id/connected"
            params={{ id }}
            aria-label="Back"
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            First hello
          </p>
        </header>

        <div className="mt-8">
          <PolarisHeader
            eyebrow={`First words · to ${name}`}
            title="Open with one true thing."
            titleSize="26"
          />
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">
            Skip "hey." Try a small specific from their profile, or a real
            question you have.
          </p>

          <div className="mt-6 rounded-[18px] border border-plum-300/25 bg-paper/70 backdrop-blur-sm">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={6}
              maxLength={240}
              placeholder="Something specific. Something warm. Something real."
              aria-label={`Message to ${name}`}
              className="w-full resize-none rounded-[14px] bg-transparent px-4 py-3 font-display text-[16px] italic leading-relaxed text-ink placeholder:font-body placeholder:not-italic placeholder:text-stone focus:outline-none"
            />
            <div className="flex items-center justify-between border-t border-plum-300/20 px-4 py-2">
              <span className="text-label-mono text-stone">
                {draft.length} / 240 chars
              </span>
              <span className="text-label-mono text-plum-500">
                {draft.length > 30 ? "Specific · good" : "Try a touch more"}
              </span>
            </div>
          </div>

          <p className="mt-4 font-body text-[13.5px] italic text-stone">
            Specificity creates better conversation than polish.
          </p>
        </div>

        <div className="mt-auto space-y-3 pt-10">
          <button
            type="button"
            onClick={send}
            disabled={!draft.trim()}
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Send
          </button>
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/connections/$id/connected",
                params: { id },
              })
            }
            className="w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
          >
            Save draft
          </button>
        </div>
      </div>
    </PageBackdrop>
  );
}