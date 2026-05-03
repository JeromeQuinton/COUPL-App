import { useEffect } from "react";
import { X } from "lucide-react";

type Props = {
  photos: string[];
  startIndex: number;
  onClose: () => void;
};

export function PhotoLightbox({ photos, startIndex, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close photo"
        className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-paper/15 text-lavender-100 backdrop-blur"
      >
        <X size={18} strokeWidth={2} />
      </button>

      <img
        src={photos[startIndex] ?? photos[0]}
        alt=""
        className="max-h-full max-w-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {photos.length > 1 && (
        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-paper/15 px-3 py-1 text-label-mono text-lavender-100 backdrop-blur">
          {startIndex + 1} / {photos.length}
        </p>
      )}
    </div>
  );
}
