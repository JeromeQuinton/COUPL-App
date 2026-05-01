import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { hasDraft, loadDraft, clearDraft } from "@/lib/onboarding_store";
import { Skeleton } from "@/components/ui/skeleton";
import { OfflineBanner } from "@/components/onboarding/OfflineBanner";

export const Route = createFileRoute("/onboarding/")({
  head: () => ({
    meta: [
      { title: "Begin — COUPL" },
      {
        name: "description",
        content:
          "A different kind of start. One question at a time. No rush, no scoring.",
      },
    ],
  }),
  component: OnboardingLanding,
});

/**
 * Landing screen for /onboarding.
 *
 * States handled here:
 *   - LOADING: skeleton while we read the localStorage draft (SSR returns
 *     null; client effect populates it — skeleton avoids flicker).
 *   - EMPTY:   no draft → intro copy + Begin CTA.
 *   - RESUME:  draft present → Continue / Start over.
 */
function OnboardingLanding() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [draftExists, setDraftExists] = useState(false);
  const [lastStep, setLastStep] = useState<string>("start");

  useEffect(() => {
    setDraftExists(hasDraft());
    setLastStep(loadDraft()?.lastStep ?? "start");
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="mx-auto flex min-h-screen max-w-[640px] flex-col px-6 pb-10 pt-16">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-4 h-10 w-3/4" />
        <Skeleton className="mt-3 h-6 w-full" />
        <Skeleton className="mt-3 h-6 w-5/6" />
        <div className="flex-1" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="mt-3 h-12 w-full" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-[640px] flex-col">
      <OfflineBanner />
      <div className="flex flex-1 flex-col px-6 pb-10 pt-16">
        <div className="flex-1">
          <p className="text-body-sm uppercase tracking-[0.18em] text-plum-500">
            COUPL
          </p>
          <h1 className="mt-3 text-display-xl text-ink">
            A different kind of start.
          </h1>
          <p className="mt-3 text-body-lg text-slate">
            One question at a time. No rush, no scoring.
          </p>

          {draftExists ? (
            <div className="mt-8 rounded-[16px] border border-line bg-lavender-50 p-4">
              <p className="text-h2 text-plum-700">
                Pick up where you left off
              </p>
              <p className="mt-1 text-body-md text-slate">
                We saved your answers on this device. Continue or start fresh.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  to="/onboarding/$step"
                  params={{ step: lastStep }}
                  className="inline-flex h-10 items-center justify-center rounded-[12px] bg-plum-500 px-4 text-body-md font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
                >
                  Continue
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    clearDraft();
                    setDraftExists(false);
                    navigate({
                      to: "/onboarding/$step",
                      params: { step: "start" },
                    });
                  }}
                  className="inline-flex h-10 items-center justify-center rounded-[12px] border border-line bg-paper px-4 text-body-md font-medium text-ink transition-colors hover:bg-cloud"
                >
                  Start over
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-3">
          {!draftExists ? (
            <Link
              to="/onboarding/$step"
              params={{ step: "start" }}
              className="flex h-12 w-full items-center justify-center rounded-[12px] bg-plum-500 text-body-md font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
            >
              Begin
            </Link>
          ) : null}
          <Link
            to="/signin"
            className="flex h-12 w-full items-center justify-center rounded-[12px] border border-line bg-paper text-body-md font-medium text-ink transition-colors hover:bg-cloud"
          >
            I already have an account
          </Link>
        </div>
      </div>
    </div>
  );
}
