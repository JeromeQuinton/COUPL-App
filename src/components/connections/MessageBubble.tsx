import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import type { ThreadMessage } from "@/data/connections_sample";

type Bubble = Extract<ThreadMessage, { kind: "msg" | "photo" | "voice" }>;
type Props = { message: Bubble };

function formatDuration(s: number) {
  const m = Math.floor(s / 60);
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

const ME_SHELL =
  "max-w-[78%] rounded-[20px] rounded-br-[6px] bg-plum-500 px-4 py-2.5 text-[14.5px] leading-relaxed text-paper shadow-[0_1px_2px_rgba(61,26,71,0.12)]";
const THEM_SHELL =
  "max-w-[82%] rounded-[20px] rounded-bl-[6px] border border-plum-300/15 bg-paper px-4 py-2.5 text-[14.5px] leading-relaxed text-ink shadow-[0_1px_2px_rgba(61,26,71,0.06)]";

export function MessageBubble({ message }: Props) {
  const isMe = message.from === "me";
  const shell = isMe ? ME_SHELL : THEM_SHELL;
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
      <div className={shell}>
        {message.kind === "msg" && message.text}
        {message.kind === "photo" && (
          <>
            <button
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label="Open photo"
              className="block w-full"
            >
              <img
                src={message.src}
                alt={message.caption ?? ""}
                className="block w-full rounded-xl object-cover max-h-80"
              />
            </button>
            {message.caption && (
              <p className="mt-2 text-sm">{message.caption}</p>
            )}
          </>
        )}
        {message.kind === "voice" && (
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Play voice note"
              className="flex size-8 items-center justify-center rounded-full bg-paper text-ink"
            >
              <Play className="size-4" strokeWidth={2.25} />
            </button>
            <svg
              aria-hidden
              width="120"
              height="22"
              viewBox="0 0 120 22"
              className="opacity-70"
              fill="currentColor"
            >
              {[8, 14, 6, 18, 10, 16, 12, 8, 14, 6, 18, 10].map((h, i) => (
                <rect
                  key={i}
                  x={i * 10}
                  y={(22 - h) / 2}
                  width="3"
                  height={h}
                  rx="1.5"
                />
              ))}
            </svg>
            <span className="text-label-mono opacity-90">
              {formatDuration(message.durationSeconds)}
            </span>
          </div>
        )}
      </div>

      {isMe && message.read === true && (
        <span className="mt-1 block text-right text-label-mono text-stone">
          READ{message.time ? ` · ${message.time}` : ""}
        </span>
      )}

      {lightboxOpen && message.kind === "photo" && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-6"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            aria-label="Close photo"
            className="absolute right-5 top-5 grid h-10 w-10 place-items-center rounded-full bg-paper/15 text-paper backdrop-blur"
          >
            <X size={18} strokeWidth={2} />
          </button>
          <img
            src={message.src}
            alt={message.caption ?? ""}
            className="max-h-full max-w-full rounded-2xl object-contain"
          />
        </div>
      )}
    </div>
  );
}
