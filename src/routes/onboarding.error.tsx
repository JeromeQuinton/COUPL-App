import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, Lock, WifiOff } from "lucide-react";
import { z } from "zod";
import { loadDraft } from "@/lib/onboarding_store";

const reasonSchema = z
  .enum(["unknown", "offline", "permission_denied"])
  .catch("unknown");
type ErrorReason = z.infer<typeof reasonSchema>;

export const Route = createFileRoute("/onboarding/error")({
  validateSearch: (search: Record<string, unknown>): { reason: ErrorReason } => ({
    reason: reasonSchema.parse(search.reason),
  }),
  head: () => ({
    meta: [
      { title: "Something went wrong — COUPL" },
      {
        name: "description",
        content: "We couldn't finish setting things up.",
      },
    ],
  }),
  component: OnboardingError,
});

/**
 * ERROR / OFFLINE / PERMISSION DENIED state.
 *
 * The reason is read from a search param so the URL is the single source
 * of truth — bookmarkable, refreshable, deep-linkable from logs.
 * Unknown values fall back to "unknown" via z.catch (INVALID DATA defence).
 */
function OnboardingError() {
  const { reason } = Route.useSearch();
  const navigate = useNavigate();
  const draft = typeof window !== "undefined" ? loadDraft() : null;
  const lastStep = draft?.lastStep ?? "review";

  const config = REASON_CONFIG[reason];
  const Icon = config.icon;

  return (
    <div className="mx-auto flex min-h-screen max-w-[640px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cloud">
        <Icon className="h-8 w-8 text-danger" aria-hidden />
      </div>
      <h1 className="mt-6 text-display-xl text-ink">{config.title}</h1>
      <p className="mt-3 max-w-md text-body-lg text-slate">{config.body}</p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {config.canRetry ? (
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/onboarding/$step",
                params: { step: lastStep },
              })
            }
            className="inline-flex h-12 items-center justify-center rounded-[12px] bg-plum-500 px-5 text-body-md font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
          >
            Try again
          </button>
        ) : null}
        <Link
          to="/onboarding"
          className="inline-flex h-12 items-center justify-center rounded-[12px] border border-line bg-paper px-5 text-body-md font-medium text-ink transition-colors hover:bg-cloud"
        >
          Back to start
        </Link>
      </div>
    </div>
  );
}

const REASON_CONFIG: Record<
  ErrorReason,
  {
    icon: typeof AlertTriangle;
    title: string;
    body: string;
    canRetry: boolean;
  }
> = {
  unknown: {
    icon: AlertTriangle,
    title: "Something went wrong.",
    body: "We couldn't finish setting things up. Your answers are still saved — try again in a moment.",
    canRetry: true,
  },
  offline: {
    icon: WifiOff,
    title: "You're offline.",
    body: "We couldn't reach our servers. Your answers are saved on this device. Try again once you're back online.",
    canRetry: true,
  },
  permission_denied: {
    icon: Lock,
    title: "We can't continue.",
    body: "This account doesn't have permission to finish onboarding. If this seems wrong, please contact support.",
    canRetry: false,
  },
};
