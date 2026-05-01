import { type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  /** Short prompt label, e.g. "I get unreasonably excited about". */
  prompt: string;
  /** Whether the user has typed something. Drives the active border. */
  active: boolean;
};

/**
 * Editable prompt card used on /onboarding/prompts. The prompt itself
 * sits on top in plum (label-mono), with a roomy textarea beneath. The
 * card border pops to plum once the user has written anything — quiet
 * progress feedback without a counter.
 */
export function PromptCard({ prompt, active, className, ...rest }: Props) {
  return (
    <div
      className={cn(
        "rounded-[16px] border bg-paper p-4 transition-colors focus-within:border-plum-500",
        active ? "border-plum-500 bg-lavender-50" : "border-line",
        className,
      )}
    >
      <p className="text-label-mono">{prompt}</p>
      <textarea
        rows={2}
        className="mt-2 w-full resize-none bg-transparent text-body-md leading-snug text-ink outline-none placeholder:text-stone"
        placeholder="Type your answer…"
        {...rest}
      />
    </div>
  );
}