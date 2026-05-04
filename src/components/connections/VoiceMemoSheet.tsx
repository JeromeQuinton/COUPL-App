import { useEffect, useState } from "react";
import { Mic, Send, Trash2, RotateCcw, Pause } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

type State = "idle" | "recording" | "preview";

type Props = {
  open: boolean;
  onClose: () => void;
  onSend: (durationSeconds: number) => void;
};

const MAX_SECONDS = 60;

export function VoiceMemoSheet({ open, onClose, onSend }: Props) {
  const [state, setState] = useState<State>("idle");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!open) {
      setState("idle");
      setSeconds(0);
    }
  }, [open]);

  useEffect(() => {
    if (state !== "recording") return;
    const t = setInterval(() => {
      setSeconds((s) => {
        if (s + 1 >= MAX_SECONDS) {
          setState("preview");
          return MAX_SECONDS;
        }
        return s + 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [state]);

  // Phase 1 mock: auto-advance to preview after 5s of "recording"
  // PHASE 4: replace with real MediaRecorder capture
  useEffect(() => {
    if (state !== "recording") return;
    const t = setTimeout(() => setState("preview"), 5000);
    return () => clearTimeout(t);
  }, [state]);

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="bottom"
        aria-label="Voice memo"
        className="rounded-t-[24px] border-t border-line bg-paper px-5 pb-8 pt-4"
      >
        <div className="mx-auto h-1 w-12 rounded-full bg-line" aria-hidden />
        <SheetHeader className="mt-4 text-left">
          <SheetTitle asChild>
            <p className="text-label-mono text-stone">Voice memo</p>
          </SheetTitle>
        </SheetHeader>

        {state === "idle" ? (
          <button
            type="button"
            onClick={() => {
              setSeconds(0);
              setState("recording");
            }}
            className="mt-6 flex w-full flex-col items-center gap-3 rounded-[16px] bg-lavender-50 py-10 transition-colors hover:bg-lavender-100"
          >
            <span
              aria-hidden
              className="flex h-14 w-14 items-center justify-center rounded-full bg-plum-700 text-paper shadow-elev-1"
            >
              <Mic className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <span className="font-display text-[15px] text-ink">Tap to record.</span>
          </button>
        ) : null}

        {state === "recording" ? (
          <div className="mt-6 flex flex-col items-center gap-5">
            <Waveform recording />
            <p className="font-display text-[28px] tabular-nums text-ink">
              {fmt(seconds)}
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setState("preview")}
                aria-label="Pause"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-slate hover:bg-lavender-50"
              >
                <Pause className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => setState("preview")}
                className="flex h-11 items-center gap-2 rounded-full bg-plum-700 px-5 font-display text-[14px] text-paper hover:opacity-90"
              >
                <Send className="h-4 w-4" strokeWidth={1.75} /> Send
              </button>
            </div>
          </div>
        ) : null}

        {state === "preview" ? (
          <div className="mt-6 flex flex-col items-center gap-5">
            <Waveform recording={false} />
            <p className="font-display text-[16px] text-ink">
              {fmt(seconds || 5)} memo ready.
            </p>
            <div className="grid w-full grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setSeconds(0);
                  setState("idle");
                }}
                className="flex flex-col items-center gap-1 rounded-[12px] border border-line bg-paper py-3 text-stone hover:bg-lavender-50"
              >
                <Trash2 className="h-4 w-4" strokeWidth={1.75} />
                <span className="font-body text-[11.5px]">Discard</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSeconds(0);
                  setState("recording");
                }}
                className="flex flex-col items-center gap-1 rounded-[12px] border border-line bg-paper py-3 text-stone hover:bg-lavender-50"
              >
                <RotateCcw className="h-4 w-4" strokeWidth={1.75} />
                <span className="font-body text-[11.5px]">Re-record</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onSend(seconds || 5);
                  onClose();
                }}
                className="flex flex-col items-center gap-1 rounded-[12px] bg-plum-700 py-3 text-paper hover:opacity-90"
              >
                <Send className="h-4 w-4" strokeWidth={1.75} />
                <span className="font-body text-[11.5px]">Send</span>
              </button>
            </div>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function Waveform({ recording }: { recording: boolean }) {
  const heights = [40, 65, 90, 55, 80, 35, 70];
  return (
    <div
      aria-hidden
      className="flex h-14 items-end justify-center gap-1.5"
    >
      {heights.map((h, i) => (
        <span
          key={i}
          className={`block w-1.5 rounded-full bg-plum-700 ${
            recording ? "animate-pulse" : "opacity-50"
          }`}
          style={{
            height: `${h}%`,
            animationDelay: `${i * 60}ms`,
          }}
        />
      ))}
    </div>
  );
}
