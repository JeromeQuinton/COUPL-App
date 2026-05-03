import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Camera, Mic, Lock } from "lucide-react";

export const Route = createFileRoute("/_main/video/permissions")({
  head: () => ({ meta: [{ title: "Camera and mic — COUPL" }] }),
  component: PermissionsPrimer,
});

const ITEMS = [
  { icon: Camera, label: "CAMERA", body: "Only on during a call. Black square the rest of the time." },
  { icon: Mic, label: "MICROPHONE", body: "Same. We don't listen between calls." },
  { icon: Lock, label: "PRIVACY", body: "Calls aren't recorded. Ever. Not by us, not by anyone on the call." },
];

function PermissionsPrimer() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-[100dvh] px-5 bg-paper"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)", paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
    >
      <div className="mx-auto max-w-md">
        <p className="text-label-mono">One quick thing</p>
        <h1 className="mt-3 font-display text-[28px] leading-tight text-ink">
          Your camera and mic, only when you're on a call.
        </h1>
        <p className="mt-3 font-display text-[15px] italic text-stone">
          Off the rest of the time. Always.
        </p>

        <ul className="mt-10 space-y-5">
          {ITEMS.map((it) => {
            const Icon = it.icon;
            return (
              <li key={it.label} className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-lavender-100 text-plum-700">
                  <Icon size={18} strokeWidth={2} />
                </span>
                <div>
                  <p className="text-label-mono">{it.label}</p>
                  <p className="mt-1 font-body text-[14px] text-ink">{it.body}</p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-12 space-y-3">
          <button
            type="button"
            onClick={() => {
              // TODO Phase 4: navigator.mediaDevices.getUserMedia({ video: true, audio: true })
              navigate({ to: "/" });
            }}
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            OK — ask the system
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
          >
            Not now
          </button>
        </div>

        <p className="mt-6 text-center text-label-mono text-stone">
          YOU CAN CHANGE THIS LATER IN SETTINGS
        </p>
      </div>
    </div>
  );
}
