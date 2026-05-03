import { createFileRoute, useNavigate, useParams, useRouter } from "@tanstack/react-router";
import { PhoneOff, Phone } from "lucide-react";
import { VideoTile } from "@/components/video/VideoTile";

export const Route = createFileRoute("/_main/video/pre-meet/$connectionId/incoming")({
  head: () => ({ meta: [{ title: "Incoming call — COUPL" }] }),
  component: IncomingCallScreen,
});

function IncomingCallScreen() {
  const { connectionId } = useParams({ from: "/_main/video/pre-meet/$connectionId/incoming" });
  const navigate = useNavigate();
  const router = useRouter();
  const name = "Maya";

  return (
    <div className="fixed inset-0 grid place-items-center bg-ink text-paper">
      <div className="flex flex-col items-center px-5 text-center">
        <div className="relative">
          <span
            aria-hidden
            className="absolute inset-0 -z-0 animate-ping rounded-full bg-paper/20"
            style={{ animationDuration: "1.2s" }}
          />
          <div className="relative h-[180px] w-[180px]">
            <VideoTile name={name} initial="M" size="full" />
          </div>
        </div>
        <p className="mt-8 text-label-mono text-paper/70">Incoming</p>
        <h1 className="mt-3 font-display text-[28px] leading-tight">
          {name} is calling.
        </h1>
        <p className="mt-3 max-w-[280px] font-display text-[16px] italic text-paper/80">
          No pressure to answer.
        </p>
      </div>

      <div className="absolute bottom-12 left-0 right-0 flex items-center justify-center gap-10">
        <button
          type="button"
          onClick={() => router.history.back()}
          aria-label="Decline"
          className="grid h-16 w-16 place-items-center rounded-full text-paper hover:opacity-90"
          style={{ background: "var(--danger)" }}
        >
          <PhoneOff size={26} strokeWidth={2.25} />
        </button>
        <button
          type="button"
          onClick={() =>
            navigate({
              to: "/video/pre-meet/$connectionId/active",
              params: { connectionId },
            })
          }
          aria-label="Accept"
          className="grid h-16 w-16 place-items-center rounded-full bg-lavender-100 text-plum-700 hover:opacity-90"
        >
          <Phone size={26} strokeWidth={2.25} />
        </button>
      </div>
    </div>
  );
}
