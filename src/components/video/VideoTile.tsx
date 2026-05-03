import { Mic, MicOff, Video as VideoIcon, VideoOff } from "lucide-react";

type Props = {
  name: string;
  initial: string;
  size: "full" | "thumb" | "attendee";
  muted?: boolean;
  cameraOff?: boolean;
};

const sizeClasses: Record<Props["size"], string> = {
  full: "w-full h-full text-[88px]",
  thumb: "w-[28%] sm:w-[240px] aspect-[3/4] text-[36px]",
  attendee: "w-full aspect-[3/4] text-[28px]",
};

export function VideoTile({ name, initial, size, muted, cameraOff }: Props) {
  return (
    <div
      role="img"
      aria-label={`${name} video tile`}
      className={`relative grid place-items-center overflow-hidden rounded-[18px] ${sizeClasses[size]}`}
      style={{
        background:
          "linear-gradient(150deg, color-mix(in oklab, var(--plum-700) 70%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 60%, var(--plum-300)) 100%)",
      }}
    >
      <span
        aria-hidden
        className="font-display font-semibold text-paper/90 select-none"
      >
        {initial}
      </span>
      {cameraOff && (
        <p className="absolute bottom-3 left-3 text-label-mono text-paper/80">
          Camera off
        </p>
      )}
      {muted && (
        <span
          aria-label="Muted"
          className="absolute bottom-3 left-3 grid h-7 w-7 place-items-center rounded-full bg-paper/15 backdrop-blur"
        >
          <MicOff size={14} className="text-paper" strokeWidth={2.25} />
        </span>
      )}
    </div>
  );
}
