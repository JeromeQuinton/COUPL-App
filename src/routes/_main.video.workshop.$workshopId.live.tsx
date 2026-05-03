import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";
import { Hand } from "lucide-react";
import { CallSurface } from "@/components/video/CallSurface";
import { CallControls } from "@/components/video/CallControls";
import { VideoTile } from "@/components/video/VideoTile";
import { AttendeeTile } from "@/components/video/AttendeeTile";

export const Route = createFileRoute("/_main/video/workshop/$workshopId/live")({
  head: () => ({ meta: [{ title: "Workshop live — COUPL" }] }),
  component: WorkshopLive,
});

const PROMPTS = [
  "Notice your shoulders. Are they up?",
  "If you want to speak, raise your hand.",
  "If something lands, write it down.",
];

const ATTENDEES = [
  { name: "You", initial: "Y" },
  { name: "Aisha", initial: "A" },
  { name: "Theo", initial: "T" },
  { name: "Sara", initial: "S" },
  { name: "Marcus", initial: "M" },
  { name: "Petra", initial: "P" },
  { name: "Devon", initial: "D" },
];

function WorkshopLive() {
  const { workshopId } = useParams({ from: "/_main/video/workshop/$workshopId/live" });
  const navigate = useNavigate();
  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [handRaised, setHandRaised] = useState(false);
  const [promptIdx, setPromptIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPromptIdx((i) => (i + 1) % PROMPTS.length), 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <CallSurface
      remote={
        <div className="flex h-full w-full flex-col">
          <div className="flex-1 px-4 pt-4">
            <div className="h-full">
              <VideoTile name="Lena" initial="L" size="full" />
            </div>
          </div>
          <div className="px-4 pb-32 pt-3">
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {ATTENDEES.map((a) => (
                <li key={a.name}>
                  <AttendeeTile
                    name={a.name}
                    initial={a.initial}
                    handRaised={a.name === "You" && handRaised}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
      selfTile={null}
      controls={
        <CallControls
          muted={muted}
          cameraOff={cameraOff}
          onMute={() => setMuted((m) => !m)}
          onToggleCamera={() => setCameraOff((c) => !c)}
          onEnd={() =>
            navigate({
              to: "/video/workshop/$workshopId/ended",
              params: { workshopId },
            })
          }
          endLabel="Leave"
          extraControls={
            <button
              type="button"
              onClick={() => setHandRaised((h) => !h)}
              aria-label={handRaised ? "Lower hand" : "Raise hand"}
              aria-pressed={handRaised}
              className={`grid h-14 w-14 place-items-center rounded-full backdrop-blur transition-colors ${
                handRaised ? "bg-lavender-100 text-plum-700" : "bg-paper/15 text-paper hover:bg-paper/25"
              }`}
            >
              <Hand size={22} strokeWidth={2} />
            </button>
          }
        />
      }
      topBar={
        <div className="flex items-center gap-3">
          <p className="rounded-full bg-paper/10 px-3 py-1 text-label-mono text-paper backdrop-blur">
            LIVE · SESSION 2 OF 4
          </p>
          <p className="rounded-full bg-paper/10 px-3 py-1 text-label-mono text-paper/90 backdrop-blur">
            {PROMPTS[promptIdx]}
          </p>
        </div>
      }
    />
  );
}
