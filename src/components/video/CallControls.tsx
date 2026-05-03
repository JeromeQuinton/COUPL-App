import type { ReactNode } from "react";
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff } from "lucide-react";

type Props = {
  onMute: () => void;
  onToggleCamera: () => void;
  onEnd: () => void;
  muted: boolean;
  cameraOff: boolean;
  endLabel?: string;
  extraControls?: ReactNode;
};

export function CallControls({
  onMute,
  onToggleCamera,
  onEnd,
  muted,
  cameraOff,
  endLabel = "End",
  extraControls,
}: Props) {
  return (
    <div
      className="flex items-center justify-center gap-4"
      style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 1rem)" }}
    >
      <button
        type="button"
        onClick={onMute}
        aria-label={muted ? "Unmute" : "Mute"}
        aria-pressed={muted}
        className="grid h-14 w-14 place-items-center rounded-full bg-paper/15 backdrop-blur hover:bg-paper/25 transition-colors"
      >
        {muted ? (
          <MicOff size={22} className="text-paper" strokeWidth={2} />
        ) : (
          <Mic size={22} className="text-paper" strokeWidth={2} />
        )}
      </button>

      <button
        type="button"
        onClick={onToggleCamera}
        aria-label={cameraOff ? "Turn camera on" : "Turn camera off"}
        aria-pressed={cameraOff}
        className="grid h-14 w-14 place-items-center rounded-full bg-paper/15 backdrop-blur hover:bg-paper/25 transition-colors"
      >
        {cameraOff ? (
          <VideoOff size={22} className="text-paper" strokeWidth={2} />
        ) : (
          <VideoIcon size={22} className="text-paper" strokeWidth={2} />
        )}
      </button>

      {extraControls}

      <button
        type="button"
        onClick={onEnd}
        aria-label={endLabel}
        className="grid h-14 w-14 place-items-center rounded-full text-paper transition-colors hover:opacity-90"
        style={{ background: "var(--danger)" }}
      >
        <PhoneOff size={22} strokeWidth={2.25} />
      </button>
    </div>
  );
}
