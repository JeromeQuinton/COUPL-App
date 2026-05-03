import { createFileRoute, useParams, useRouter } from "@tanstack/react-router";
import { PhoneOff } from "lucide-react";
import { VideoTile } from "@/components/video/VideoTile";

export const Route = createFileRoute("/_main/video/pre-meet/$connectionId/")({
  head: () => ({ meta: [{ title: "Calling — COUPL" }] }),
  component: OutgoingCallScreen,
});

function OutgoingCallScreen() {
  const { connectionId } = useParams({ from: "/_main/video/pre-meet/$connectionId/" });
  const router = useRouter();
  const name = "Maya";

  return (
    <div className="fixed inset-0 grid place-items-center bg-ink text-paper">
      <div className="flex flex-col items-center px-5 text-center">
        <div className="relative">
          <span
            aria-hidden
            className="absolute inset-0 -z-0 animate-ping rounded-full bg-paper/15"
          />
          <div className="relative h-[180px] w-[180px]">
            <VideoTile name={name} initial="M" size="full" />
          </div>
        </div>
        <p className="mt-8 text-label-mono text-paper/70">Calling</p>
        <h1 className="mt-3 font-display text-[28px] leading-tight">
          Calling {name}…
        </h1>
        <p className="mt-3 max-w-[280px] font-body text-[14px] text-paper/80">
          She'll see you're calling now.
        </p>
      </div>

      <button
        type="button"
        onClick={() => router.history.back()}
        aria-label="Cancel"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 grid h-16 w-16 place-items-center rounded-full text-paper hover:opacity-90"
        style={{ background: "var(--danger)" }}
      >
        <PhoneOff size={26} strokeWidth={2.25} />
      </button>
    </div>
  );
}
