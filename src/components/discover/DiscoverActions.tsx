import { X, Heart, MessageCircleHeart } from "lucide-react";

type Props = {
  onPass: () => void;
  onSaveForLater: () => void;
  onConnect: () => void;
};

export function DiscoverActions({ onPass, onSaveForLater, onConnect }: Props) {
  return (
    <div className="fixed inset-x-0 bottom-[88px] z-30 px-4">
      <div className="mx-auto flex max-w-[640px] items-center justify-center gap-4">
        <button
          type="button"
          onClick={onPass}
          aria-label="Pass — not for me"
          className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-paper text-slate shadow-elev-1 transition-colors hover:text-ink"
        >
          <X aria-hidden width={22} height={22} strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={onSaveForLater}
          aria-label="Save for later"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-paper text-stone shadow-elev-1 transition-colors hover:text-plum-500"
        >
          <MessageCircleHeart aria-hidden width={18} height={18} strokeWidth={1.5} />
        </button>

        <button
          type="button"
          onClick={onConnect}
          aria-label="Send a thoughtful hello"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-plum-500 text-paper shadow-elev-2 transition-colors hover:bg-plum-700"
        >
          <Heart aria-hidden width={22} height={22} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}