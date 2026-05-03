import { useRef } from "react";
import { Plus, X } from "lucide-react";

type Props = {
  value: { id: string; preview: string }[];
  onChange: (value: { id: string; preview: string }[]) => void;
  max?: number;
};

export function EvidenceUpload({ value, onChange, max = 4 }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const remaining = max - value.length;
    const next = [...value];
    for (let i = 0; i < Math.min(files.length, remaining); i++) {
      const f = files[i];
      const preview = URL.createObjectURL(f);
      next.push({ id: crypto.randomUUID(), preview });
    }
    onChange(next);
  };

  const remove = (id: string) => {
    onChange(value.filter((v) => v.id !== id));
  };

  return (
    <div>
      <ul className="grid grid-cols-4 gap-2">
        {value.map((v) => (
          <li key={v.id} className="relative aspect-square overflow-hidden rounded-[10px] border border-line">
            <img src={v.preview} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => remove(v.id)}
              aria-label="Remove"
              className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-paper/85 text-ink hover:bg-paper"
            >
              <X size={12} />
            </button>
          </li>
        ))}
        {value.length < max && (
          <li>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              aria-label="Add evidence"
              className="grid aspect-square w-full place-items-center rounded-[10px] border border-dashed border-plum-300/50 bg-paper text-stone hover:bg-lavender-50"
            >
              <Plus size={20} strokeWidth={2} />
            </button>
          </li>
        )}
      </ul>
      <p className="mt-2 font-body text-[11.5px] italic text-stone">
        Sensitive details obscured on review.
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        multiple
        className="sr-only"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
