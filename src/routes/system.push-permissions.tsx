import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingFrame } from "@/components/onboarding/OnboardingFrame";
import { OnboardingButton } from "@/components/onboarding/OnboardingButton";

export const Route = createFileRoute("/system/push-permissions")({
  head: () => ({
    meta: [
      { title: "You'll see one pop-up next — coupl" },
      {
        name: "description",
        content:
          "Saying 'Allow' lets us tap your shoulder when a connection happens.",
      },
    ],
  }),
  component: PushPrimerScreen,
});

const EXPECTATIONS = [
  { count: "4–8", label: "connection-related pings" },
  { count: "1", label: "weekly check-in · Sunday morning" },
  { count: "1–2", label: "event reminders if you've booked" },
  { count: "0", label: "marketing, ever" },
];

function PushPrimerScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingFrame
      footer={
        <div>
          <OnboardingButton
            type="button"
            onClick={() => {
              // Phase 1 stub: skip the actual OS prompt, just continue.
              // Phase 4 will wire to Notification.requestPermission()
              navigate({ to: "/home" });
            }}
          >
            OK — ask the system
          </OnboardingButton>
          <button
            type="button"
            onClick={() => navigate({ to: "/home" })}
            className="mt-3 w-full rounded-full px-5 py-3 text-center text-body-sm text-slate transition-colors hover:text-plum-500"
          >
            Skip for now
          </button>
        </div>
      }
    >
      <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
        Before we ask the system
      </p>
      <h1 className="mt-3 text-display-xl text-ink">
        You'll see one pop-up next.
      </h1>
      <p className="mt-3 text-body-md text-slate">
        Saying "Allow" lets us tap your shoulder when a connection happens or
        something worth hearing arrives. Only what you'd want.
      </p>

      <section className="mt-8 rounded-[14px] border border-line bg-paper px-4 py-5">
        <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
          What to expect, monthly
        </p>
        <ul className="mt-4 space-y-3">
          {EXPECTATIONS.map((e) => (
            <li key={e.label} className="flex items-baseline gap-4">
              <span className="w-14 shrink-0 text-body-lg font-semibold text-plum-500">
                {e.count}
              </span>
              <span className="text-body-md text-ink">{e.label}</span>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-6 text-body-sm text-slate">
        You can change this anytime in Settings.
      </p>
    </OnboardingFrame>
  );
}
