import { useEffect, useRef, useState } from "react";

type Props = {
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
  invalid?: boolean;
  /** When increments, clear inputs and refocus first box. */
  resetSignal?: number;
};

const LEN = 6;

export function CodeInput({ onChange, onComplete, invalid = false, resetSignal = 0 }: Props) {
  const [digits, setDigits] = useState<string[]>(Array(LEN).fill(""));
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    setDigits(Array(LEN).fill(""));
    refs.current[0]?.focus();
  }, [resetSignal]);

  const setAt = (i: number, v: string) => {
    const cleaned = v.replace(/\D/g, "").slice(0, 1);
    const next = [...digits];
    next[i] = cleaned;
    setDigits(next);
    const code = next.join("");
    onChange?.(code);
    if (cleaned && i < LEN - 1) refs.current[i + 1]?.focus();
    if (next.every((d) => d !== "")) onComplete?.(code);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]"
          maxLength={1}
          value={d}
          onChange={(e) => setAt(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          aria-label={`Digit ${i + 1} of ${LEN}`}
          className={`h-12 w-10 rounded-[10px] border bg-paper text-center font-display text-[18px] text-ink focus:outline-none ${
            invalid ? "border-plum-700/70" : "border-line focus:border-plum-500"
          }`}
        />
      ))}
    </div>
  );
}
