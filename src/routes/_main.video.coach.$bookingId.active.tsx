import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { CallSurface } from "@/components/video/CallSurface";
import { CallControls } from "@/components/video/CallControls";
import { VideoTile } from "@/components/video/VideoTile";

export const Route = createFileRoute("/_main/video/coach/$bookingId/active")({
  head: () => ({ meta: [{ title: "With Polaris — COUPL" }] }),
  component: CoachActive,
});

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function CoachActive() {
  const { bookingId } = useParams({ from: "/_main/video/coach/$bookingId/active" });
  const navigate = useNavigate();
  const [elapsed, setElapsed] = useState(0);
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <CallSurface
      remote={<VideoTile name="Polaris" initial="L" size="full" />}
      selfTile={<VideoTile name="You" initial="Y" size="thumb" muted={muted} cameraOff={cameraOff} />}
      controls={
        <CallControls
          muted={muted}
          cameraOff={cameraOff}
          onMute={() => setMuted((m) => !m)}
          onToggleCamera={() => setCameraOff((c) => !c)}
          onEnd={() =>
            navigate({
              to: "/video/coach/$bookingId/ended",
              params: { bookingId },
            })
          }
        />
      }
      topBar={
        <div className="flex items-center gap-3">
          <p className="font-display text-[18px] tabular-nums text-paper">
            {formatTime(elapsed)}
          </p>
          <p className="rounded-full bg-paper/10 px-3 py-1 text-label-mono text-paper backdrop-blur">
            LIORA · PRACTITIONER
          </p>
        </div>
      }
    />
  );
}
