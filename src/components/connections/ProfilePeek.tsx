import { useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  name: string;
  about: string;
  languages: string[];
  topPrompt: { question: string; answer: string };
};

export function ProfilePeek({
  open,
  onClose,
  name,
  about,
  languages,
  topPrompt,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-md rounded-t-3xl bg-paper px-6 pb-8 pt-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`${name} profile preview`}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-label-mono text-stone">A QUICK LOOK</span>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full text-slate hover:bg-lavender-100"
          >
            <X className="size-4" />
          </button>
        </div>

        <h2 className="font-display text-3xl text-ink">{name}</h2>

        <p className="mt-4 font-display text-lg italic text-ink">"{about}"</p>

        <div className="mt-6">
          <span className="text-label-mono text-stone">LANGUAGES</span>
          <div className="mt-2 flex flex-wrap gap-2">
            {languages.map((l) => (
              <span
                key={l}
                className="rounded-full border border-line px-3 py-1 text-sm text-ink"
              >
                {l}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-lavender-100 p-4">
          <p className="text-label-mono text-plum-700">
            {topPrompt.question.toUpperCase()}
          </p>
          <p className="mt-2 text-ink">{topPrompt.answer}</p>
        </div>
      </div>
    </div>
  );
}
