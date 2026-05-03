import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { CallSurface } from "@/components/video/CallSurface";
import { CallControls } from "@/components/video/CallControls";
import { VideoTile } from "@/components/video/VideoTile";

export const Route = createFileRoute("/_main/video/pre-meet/$connectionId/active")({
  head: () => ({ meta: [{ title: "On call — COUPL" }] }),
  component: ActiveCallScreen,
});

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function ActiveCallScreen() {
  const { connectionId } = useParams({ from: "/_main/video/pre-meet/$connectionId/active" });
  const navigate = useNavigate();
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const isRed = elapsed >= 270;
  const showCapNotice = elapsed >= 300;

  return (
    <CallSurface
      remote={<VideoTile name="Maya" initial="M" size="full" />}
      selfTile={<VideoTile name="You" initial="Y" size="thumb" muted={muted} cameraOff={cameraOff} />}
      controls={
        <CallControls
          muted={muted}
          cameraOff={cameraOff}
          onMute={() => setMuted((m) => !m)}
          onToggleCamera={() => setCameraOff((c) => !c)}
          onEnd={() =>
            navigate({
              to: "/video/pre-meet/$connectionId/ended",
              params: { connectionId },
            })
          }
        />
      }
      topBar={
        <div className="flex flex-col items-center gap-2">
          <p
            className="font-display text-[18px] tabular-nums text-paper transition-colors"
            style={{ color: isRed ? "var(--danger)" : undefined }}
          >
            {formatTime(elapsed)}
          </p>
          {showCapNotice && (
            <p
              className="rounded-full bg-paper/10 px-3 py-1 text-label-mono text-paper backdrop-blur opacity-0 animate-[fadeIn_400ms_ease-out_forwards]"
              style={{ animation: "fadeIn 400ms ease-out forwards" }}
            >
              Five-minute soft cap — stay if you're both in it
            </p>
          )}
        </div>
      }
    />
  );
}
