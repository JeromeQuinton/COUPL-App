import { type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  prompt: string;
  helper?: string;
};

/**
 * Long-form textarea used by the reflection screen. Calm card with a
 * serif prompt above and a roomy editable area beneath. Border softens
 * to plum on focus, mirroring other onboarding inputs.
 */
export function ReflectionEditor({
  prompt,
  helper,
  className,
  ...rest
}: Props) {
  return (
    <div className="rounded-[20px] border border-line bg-paper p-5 focus-within:border-plum-500">
      <label htmlFor="reflection-text" className="block">
        <span className="text-label-mono">Tonight's prompt</span>
        <span className="mt-2 block text-display-xl text-ink">{prompt}</span>
      </label>
      <textarea
        id="reflection-text"
        rows={8}
        className={cn(
          "mt-4 w-full resize-none bg-transparent text-body-lg leading-relaxed text-ink outline-none placeholder:text-stone",
          className,
        )}
        placeholder="Start writing — there's no wrong answer here."
        {...rest}
      />
      {helper ? (
        <p className="mt-2 text-body-sm text-slate">{helper}</p>
      ) : null}
    </div>
  );
}