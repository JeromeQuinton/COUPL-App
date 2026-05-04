import { useEffect, useRef, useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, Info, RotateCcw, X } from "lucide-react";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";
import { StepEyebrow } from "@/components/onboarding/StepEyebrow";

/**
 * Screen 06 of 9 — Photos. Stream 7 leftover.
 *
 * Real picker → preview/crop → reorder. Phase 1 uses a hidden
 * `<input type="file">` and FileReader → object URLs for previews.
 * Crop is visual (4:5 aspect ratio, object-cover) — full transform
 * UI lands in Phase 4 with a canvas-based editor.
 */
export const Route = createFileRoute("/onboarding/photos")({
  head: () => ({
    meta: [
      { title: "Three photos. No filters. — coupl" },
      {
        name: "description",
        content:
          "One face-clear. One you in motion. One that means something.",
      },
    ],
  }),
  component: PhotosScreen,
});

type Slot = {
  id: string;
  tag: string; // "Face", "Motion", "Meaning"
  required: boolean;
  url: string | null; // object URL
  fileName: string | null;
};

const INITIAL_SLOTS: Slot[] = [
  { id: "face", tag: "Face", required: true, url: null, fileName: null },
  { id: "motion", tag: "Motion", required: true, url: null, fileName: null },
  { id: "meaning", tag: "Meaning", required: true, url: null, fileName: null },
  { id: "opt-1", tag: "Optional", required: false, url: null, fileName: null },
  { id: "opt-2", tag: "Optional", required: false, url: null, fileName: null },
  { id: "opt-3", tag: "Optional", required: false, url: null, fileName: null },
];

function PhotosScreen() {
  const navigate = useNavigate();
  const [slots, setSlots] = useState<Slot[]>(INITIAL_SLOTS);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [cropping, setCropping] = useState<{ index: number; url: string } | null>(
    null,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Revoke blob URLs on unmount so they don't leak.
  useEffect(() => {
    return () => {
      slots.forEach((s) => s.url && URL.revokeObjectURL(s.url));
      if (cropping) URL.revokeObjectURL(cropping.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requiredFilled = slots
    .filter((s) => s.required)
    .every((s) => s.url !== null);

  const onPick = (index: number) => {
    setActiveIndex(index);
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || activeIndex === null) {
      e.target.value = "";
      return;
    }
    const url = URL.createObjectURL(file);
    setCropping({ index: activeIndex, url });
    // reset so picking the same file again still fires onChange
    e.target.value = "";
  };

  const onUseCrop = (fileName?: string) => {
    if (!cropping) return;
    setSlots((prev) => {
      const next = [...prev];
      const old = next[cropping.index];
      if (old.url) URL.revokeObjectURL(old.url);
      next[cropping.index] = {
        ...old,
        url: cropping.url,
        fileName: fileName ?? old.fileName ?? "Selected photo",
      };
      return next;
    });
    setCropping(null);
    setActiveIndex(null);
  };

  const onRetake = () => {
    if (cropping) URL.revokeObjectURL(cropping.url);
    setCropping(null);
    fileInputRef.current?.click();
  };

  const onRemove = (index: number) => {
    setSlots((prev) => {
      const next = [...prev];
      const slot = next[index];
      if (slot.url) URL.revokeObjectURL(slot.url);
      next[index] = { ...slot, url: null, fileName: null };
      return next;
    });
  };

  const swap = (a: number, b: number) => {
    if (a < 0 || b < 0 || a >= slots.length || b >= slots.length) return;
    setSlots((prev) => {
      const next = [...prev];
      [next[a], next[b]] = [next[b], next[a]];
      return next;
    });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!requiredFilled) return;
    navigate({ to: "/onboarding/capacity" });
  };

  const filledCount = slots.filter((s) => s.url).length;

  return (
    <OnboardingFrame backTo="/onboarding/values">
      <form id="photos-form" onSubmit={onSubmit}>
        <StepEyebrow step={8} />
        <h1 className="mt-3 text-display-xl text-ink">
          Three photos. No filters.
        </h1>
        <p className="mt-2 text-body-md text-slate">
          One face-clear. One you in motion. One that means something.
        </p>

        <p className="mt-4 font-body text-[12px] uppercase tracking-[0.18em] text-plum-500">
          {filledCount} of 6 added · {3 - slots.filter((s) => s.required && s.url).length} required left
        </p>

        <ul className="mt-4 flex flex-col gap-3">
          {slots.map((slot, i) => (
            <li
              key={slot.id}
              className="flex items-center gap-3 rounded-[16px] border border-line bg-paper p-3"
            >
              {/* Thumbnail */}
              <button
                type="button"
                onClick={() => onPick(i)}
                aria-label={
                  slot.url ? `Replace ${slot.tag} photo` : `Add ${slot.tag} photo`
                }
                className={
                  slot.url
                    ? "relative h-[72px] w-[58px] flex-shrink-0 overflow-hidden rounded-[12px] bg-lavender-50"
                    : "relative h-[72px] w-[58px] flex-shrink-0 overflow-hidden rounded-[12px] border border-dashed border-plum-300/50 bg-lavender-50/40 hover:bg-lavender-50"
                }
              >
                {slot.url ? (
                  <img
                    src={slot.url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="grid h-full w-full place-items-center font-body text-[10.5px] uppercase tracking-[0.18em] text-plum-700">
                    Add
                  </span>
                )}
              </button>

              <div className="min-w-0 flex-1">
                <p className="font-display text-[14px] font-semibold text-ink">
                  {slot.tag}
                  {slot.required && (
                    <span className="ml-1.5 text-label-mono text-plum-500">
                      Required
                    </span>
                  )}
                </p>
                <p className="mt-0.5 font-body text-[11.5px] text-stone truncate">
                  {slot.url
                    ? slot.fileName
                    : slot.required
                    ? "Tap to add"
                    : "Optional · tap to add"}
                </p>
              </div>

              {slot.url && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => swap(i, i - 1)}
                    disabled={i === 0}
                    aria-label="Move photo up"
                    className="grid h-8 w-8 place-items-center rounded-full text-stone hover:bg-lavender-50 disabled:opacity-40"
                  >
                    <ArrowUp size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => swap(i, i + 1)}
                    disabled={i === slots.length - 1}
                    aria-label="Move photo down"
                    className="grid h-8 w-8 place-items-center rounded-full text-stone hover:bg-lavender-50 disabled:opacity-40"
                  >
                    <ArrowDown size={14} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemove(i)}
                    aria-label="Remove photo"
                    className="grid h-8 w-8 place-items-center rounded-full text-stone hover:bg-lavender-50"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={onFileChange}
        />

        <div className="mt-6 flex gap-3 rounded-[14px] bg-beeswax-100 p-4 text-body-sm text-ink">
          <Info
            className="mt-0.5 h-4 w-4 shrink-0 text-caution"
            aria-hidden
          />
          <p>
            Heads up: we check photos automatically — usually within minutes.
            We block heavy filters and group photos where you're not centred.
          </p>
        </div>
      </form>

      {/* Crop / preview step */}
      {cropping && (
        <CropOverlay
          url={cropping.url}
          tag={slots[cropping.index]?.tag ?? "Photo"}
          onUse={() => onUseCrop()}
          onRetake={onRetake}
          onCancel={() => {
            URL.revokeObjectURL(cropping.url);
            setCropping(null);
            setActiveIndex(null);
          }}
        />
      )}

      <div className="mt-8">
        <OnboardingButton
          type="submit"
          form="photos-form"
          disabled={!requiredFilled}
        >
          Continue
        </OnboardingButton>
      </div>
    </OnboardingFrame>
  );
}

function CropOverlay({
  url,
  tag,
  onUse,
  onRetake,
  onCancel,
}: {
  url: string;
  tag: string;
  onUse: () => void;
  onRetake: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-ink/95 backdrop-blur-sm">
      <header className="flex items-center justify-between px-5 pt-12 pb-3 text-paper">
        <button
          type="button"
          onClick={onCancel}
          aria-label="Cancel"
          className="grid h-9 w-9 place-items-center rounded-full hover:bg-paper/10"
        >
          <X size={18} />
        </button>
        <p className="font-body text-[12px] uppercase tracking-[0.2em]">
          {tag} · check it
        </p>
        <span className="w-9" aria-hidden />
      </header>

      <div className="flex flex-1 items-center justify-center px-5">
        <div className="relative w-full max-w-[360px] aspect-[4/5] overflow-hidden rounded-[20px] bg-paper">
          <img
            src={url}
            alt="Photo preview"
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      <p className="px-6 pt-3 text-center font-body text-[13px] leading-relaxed text-paper/80">
        Looks good? You can swap it later from your profile.
      </p>

      <div className="flex items-center gap-3 px-5 pb-12 pt-4">
        <button
          type="button"
          onClick={onRetake}
          className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border border-paper/30 bg-transparent px-5 py-3 font-body text-[14px] font-medium text-paper hover:bg-paper/10"
        >
          <RotateCcw size={14} />
          Pick another
        </button>
        <button
          type="button"
          onClick={onUse}
          className="flex-[1.4] rounded-full bg-paper px-5 py-3 font-display text-[15px] font-medium text-ink hover:bg-paper/90"
        >
          Use this
        </button>
      </div>
    </div>
  );
}
