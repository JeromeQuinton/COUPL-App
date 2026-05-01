import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export type ReviewStage = "auto_check" | "first_reviewer" | "second_reviewer" | "released";

type Stage = { id: ReviewStage; label: string };

const STAGES: Stage[] = [
  { id: "auto_check", label: "Auto-check" },
  { id: "first_reviewer", label: "First reviewer" },
  { id: "second_reviewer", label: "Second reviewer" },
  { id: "released", label: "Released" },
];

type Props = {
  /** Index of the currently active stage (0–3). Earlier stages render as complete. */
  currentIndex: number;
};

/**
 * Four-step horizontal tracker for the human photo review pipeline.
 * Editorial palette: completed dots use plum, active uses plum-300,
 * pending uses lavender-100. No animation — calm progress, not a
 * loading bar.
 */
export function ReviewProgressTracker({ currentIndex }: Props) {
  return (
    <ol className="flex items-start justify-between gap-2">
      {STAGES.map((s, i) => {
        const done = i < currentIndex;
        const active = i === currentIndex;
        return (
          <li
            key={s.id}
            className="flex flex-1 flex-col items-center text-center"
          >
            <span
              aria-hidden
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-full border-2",
                done && "border-plum-500 bg-plum-500 text-paper",
                active && "border-plum-500 bg-paper text-plum-500",
                !done && !active && "border-lavender-100 bg-lavender-50 text-stone",
              )}
            >
              {done ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              )}
            </span>
            <span className="mt-2 text-body-sm leading-tight text-slate">
              {s.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}