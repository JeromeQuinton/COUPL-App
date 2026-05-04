import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

/**
 * /_main/profile/edit/intent/confirm — confirms a pending intent change.
 *
 * R2-02 — Banani UI-0232 "Intent Confirm". Reached from
 * /profile/edit/intent (R2-06). The pending intent is passed in as a
 * search param so the surface is independent of any session store.
 *
 * No urgency theatre. Plain mirror of the chosen intent + a soft
 * editorial note, primary confirm, secondary "go back".
 *
 * DR-INTENT-MUTABILITY — users can change intent at any time.
 */

type IntentValue = "long_term" | "exploring" | "honest_dating" | "friendship";

const INTENT_VALUES: ReadonlyArray<IntentValue> = [
  "long_term",
  "exploring",
  "honest_dating",
  "friendship",
];

const COPY: Record<IntentValue, { label: string; hint: string }> = {
  long_term: {
    label: "Long-term partnership",
    hint: "Building toward depth and commitment.",
  },
  exploring: {
    label: "Relationship, exploring",
    hint: "Open to where it leads.",
  },
  honest_dating: {
    label: "Honest dating",
    hint: "Meeting real people, no pretence.",
  },
  friendship: {
    label: "Friendship first",
    hint: "Connection without pressure.",
  },
};

function isIntentValue(v: unknown): v is IntentValue {
  return typeof v === "string" && (INTENT_VALUES as ReadonlyArray<string>).includes(v);
}

export const Route = createFileRoute("/_main/profile/edit/intent/confirm")({
  validateSearch: (search: Record<string, unknown>): { intent?: IntentValue } => ({
    intent: isIntentValue(search.intent) ? search.intent : undefined,
  }),
  head: () => ({ meta: [{ title: "Confirm intent · COUPL" }] }),
  component: IntentConfirmScreen,
});

function IntentConfirmScreen() {
  const navigate = useNavigate();
  const { intent } = Route.useSearch();
  const pending: IntentValue = intent ?? "exploring";
  const copy = COPY[pending];

  const onConfirm = () => {
    toast("Intent updated.");
    navigate({ to: "/profile/edit" });
  };

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile/edit/intent"
            aria-label="Back to intent"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <ScreenHeader
          eyebrow="Profile · intent"
          title="You've changed what you're here for."
        />
      </header>

      <section className="px-5">
        <div className="rounded-[16px] bg-paper p-5 shadow-elev-1">
          <p className="text-label-mono">Now</p>
          <p className="mt-2 font-display text-[20px] leading-tight text-ink">
            {copy.label}
          </p>
          <p className="mt-1.5 font-body text-[13px] text-stone">{copy.hint}</p>
          <p className="mt-5 font-body text-[13.5px] italic text-stone">
            This will reshape what you see in Discover from tomorrow.
          </p>
        </div>
      </section>

      <div className="px-5 pt-7 pb-12 space-y-3">
        <button
          type="button"
          onClick={onConfirm}
          className="flex h-12 w-full items-center justify-center rounded-[12px] bg-plum-500 font-body text-[14.5px] font-semibold text-paper shadow-elev-1 transition-colors hover:bg-plum-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-300"
        >
          Confirm change
        </button>
        <Link
          to="/profile/edit/intent"
          className="flex h-12 w-full items-center justify-center rounded-[12px] border border-line bg-paper font-body text-[14.5px] font-semibold text-ink transition-colors hover:bg-cloud focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum-300"
        >
          Go back
        </Link>
      </div>
    </YouBackdrop>
  );
}
