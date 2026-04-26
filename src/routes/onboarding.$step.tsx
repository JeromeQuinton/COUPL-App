import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  createFileRoute,
  notFound,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { z } from "zod";
import { toast } from "sonner";
import {
  ORDERED_STEPS,
  loadDraft,
  nextStep,
  prevStep,
  saveDraft,
  type OnboardingDraft,
  type OnboardingStep,
} from "@/lib/onboarding_store";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const STEP_SET = new Set<OnboardingStep>(ORDERED_STEPS);

export const Route = createFileRoute("/onboarding/$step")({
  // INVALID DATA defence: any URL like /onboarding/garbage triggers
  // notFound, which renders a typed error screen instead of crashing
  // the chrome.
  beforeLoad: ({ params }) => {
    if (!STEP_SET.has(params.step as OnboardingStep)) {
      throw notFound();
    }
  },
  notFoundComponent: InvalidStep,
  component: StepScreen,
});

function InvalidStep() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[640px] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-display-xl text-ink">That step doesn't exist.</h1>
      <p className="mt-3 text-body-lg text-slate">
        The link may be out of date.
      </p>
      <a
        href="/onboarding"
        className="mt-6 inline-flex h-12 items-center justify-center rounded-[12px] bg-plum-500 px-5 text-body-md font-medium text-paper"
      >
        Restart onboarding
      </a>
    </div>
  );
}

/* ---------- Per-step validation (INVALID DATA) ---------- */

const startSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Use at least 2 characters.")
    .max(40, "Keep it under 40 characters.")
    .regex(/^[a-zA-Z0-9 '\-]+$/, "Letters, numbers, spaces, ' and - only."),
});

const intentSchema = z.object({
  intent: z.enum(["long_term", "exploring", "friendship"], {
    required_error: "Pick one to continue.",
  }),
});

const pacingSchema = z.object({
  pacing: z.enum(["slow", "steady", "open"], {
    required_error: "Pick one to continue.",
  }),
});

const valuesSchema = z.object({
  values: z
    .array(z.string())
    .min(1, "Pick at least one.")
    .max(5, "Pick up to five."),
});

/* ---------- Step screen ---------- */

function StepScreen() {
  const { step } = Route.useParams() as { step: OnboardingStep };
  const router = useRouter();
  const navigate = useNavigate();

  const [draft, setDraft] = useState<OnboardingDraft>({});
  const [hydrated, setHydrated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmDiscard, setConfirmDiscard] = useState(false);

  // Hydrate the draft client-side. Reading localStorage during SSR would
  // throw — and we want server HTML and first client render to match.
  useEffect(() => {
    setDraft(loadDraft() ?? {});
    setHydrated(true);
  }, [step]);

  const isFirst = step === ORDERED_STEPS[0];

  const handleBack = () => {
    if (isFirst) {
      // CANCEL/BACK from the first step exits the flow — confirm so the
      // user doesn't lose their draft accidentally.
      setConfirmDiscard(true);
      return;
    }
    if (window.history.length > 1) router.history.back();
    else {
      const p = prevStep(step);
      if (p) navigate({ to: "/onboarding/$step", params: { step: p } });
      else navigate({ to: "/onboarding" });
    }
  };

  const goNext = (patch: Partial<OnboardingDraft>) => {
    const merged = saveDraft({ ...patch, lastStep: step });
    setDraft(merged);
    const n = nextStep(step);
    if (n) {
      navigate({ to: "/onboarding/$step", params: { step: n } });
    } else {
      navigate({ to: "/onboarding/complete" });
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);

    try {
      switch (step) {
        case "start": {
          const parsed = startSchema.safeParse({
            displayName: String(fd.get("displayName") ?? ""),
          });
          if (!parsed.success) {
            setErrors(flattenZod(parsed.error));
            return;
          }
          goNext({ displayName: parsed.data.displayName });
          return;
        }
        case "intent": {
          const parsed = intentSchema.safeParse({ intent: fd.get("intent") });
          if (!parsed.success) {
            setErrors(flattenZod(parsed.error));
            return;
          }
          goNext({ intent: parsed.data.intent });
          return;
        }
        case "pacing": {
          const parsed = pacingSchema.safeParse({ pacing: fd.get("pacing") });
          if (!parsed.success) {
            setErrors(flattenZod(parsed.error));
            return;
          }
          goNext({ pacing: parsed.data.pacing });
          return;
        }
        case "values": {
          const picked = (fd.getAll("values") as string[]) ?? [];
          const parsed = valuesSchema.safeParse({ values: picked });
          if (!parsed.success) {
            setErrors(flattenZod(parsed.error));
            return;
          }
          goNext({ values: parsed.data.values });
          return;
        }
        case "review": {
          // SUCCESS / ERROR / OFFLINE / PERMISSION DENIED branch — the
          // only step that simulates a server submit.
          setSubmitting(true);
          try {
            await submitOnboardingDraft(draft);
            navigate({ to: "/onboarding/complete" });
          } catch (err) {
            const message = err instanceof Error ? err.message : "";
            const reason: "offline" | "permission_denied" | "unknown" =
              message === "permission_denied"
                ? "permission_denied"
                : message === "offline"
                  ? "offline"
                  : "unknown";
            navigate({
              to: "/onboarding/error",
              search: { reason },
            });
          } finally {
            setSubmitting(false);
          }
          return;
        }
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // LOADING state — brief skeleton while we read the draft. Avoids the
  // "Continue" button flickering with a stale value when navigating
  // between steps.
  if (!hydrated) {
    return (
      <OnboardingShell step={step} title="Loading…">
        <div className="space-y-3">
          <div className="h-12 w-full animate-pulse rounded-[12px] bg-cloud" />
          <div className="h-12 w-3/4 animate-pulse rounded-[12px] bg-cloud" />
        </div>
      </OnboardingShell>
    );
  }

  const stepConfig = STEP_CONFIG[step];

  return (
    <>
      <OnboardingShell
        step={step}
        title={stepConfig.title}
        subtitle={stepConfig.subtitle}
        onBack={handleBack}
      >
        <form id="onboarding-form" onSubmit={onSubmit} noValidate>
          {step === "start" ? (
            <StartFields draft={draft} errors={errors} />
          ) : null}
          {step === "intent" ? (
            <IntentFields draft={draft} errors={errors} />
          ) : null}
          {step === "pacing" ? (
            <PacingFields draft={draft} errors={errors} />
          ) : null}
          {step === "values" ? (
            <ValuesFields draft={draft} errors={errors} />
          ) : null}
          {step === "review" ? <ReviewSummary draft={draft} /> : null}
        </form>
      </OnboardingShell>

      <footer
        className="fixed bottom-0 left-1/2 z-30 w-full max-w-[640px] -translate-x-1/2 border-t border-line bg-paper px-6 pt-4"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 16px)" }}
      >
        <button
          type="submit"
          form="onboarding-form"
          disabled={submitting}
          className="flex h-12 w-full items-center justify-center rounded-[12px] bg-plum-500 text-body-md font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting
            ? "Submitting…"
            : step === "review"
              ? "Finish"
              : "Continue"}
        </button>
      </footer>

      <AlertDialog open={confirmDiscard} onOpenChange={setConfirmDiscard}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave onboarding?</AlertDialogTitle>
            <AlertDialogDescription>
              Your answers stay saved on this device. You can come back
              anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Stay</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => navigate({ to: "/onboarding" })}
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

/* ---------- Step content ---------- */

const STEP_CONFIG: Record<
  OnboardingStep,
  { title: string; subtitle: string }
> = {
  start: {
    title: "What should we call you?",
    subtitle: "Your display name. You can change this later.",
  },
  intent: {
    title: "What are you here for?",
    subtitle: "There's no wrong answer.",
  },
  pacing: {
    title: "How do you like to move?",
    subtitle: "Pacing is how often you'd like to hear from someone new.",
  },
  values: {
    title: "What matters to you?",
    subtitle:
      "Pick up to five. We use this to find aligned recommendations.",
  },
  review: {
    title: "Looks good?",
    subtitle: "Review your answers before we set up your profile.",
  },
};

function StartFields({
  draft,
  errors,
}: {
  draft: OnboardingDraft;
  errors: Record<string, string>;
}) {
  return (
    <div>
      <label
        htmlFor="displayName"
        className="mb-2 block text-body-md font-medium text-ink"
      >
        Display name
      </label>
      <input
        id="displayName"
        name="displayName"
        type="text"
        defaultValue={draft.displayName ?? ""}
        autoComplete="given-name"
        autoFocus
        aria-invalid={!!errors.displayName}
        aria-describedby={errors.displayName ? "displayName-err" : undefined}
        className="h-12 w-full rounded-[12px] border border-line bg-paper px-4 text-body-md text-ink outline-none focus:border-plum-500 focus:ring-2 focus:ring-plum-300"
      />
      {errors.displayName ? (
        <p
          id="displayName-err"
          role="alert"
          className="mt-2 text-body-sm text-danger"
        >
          {errors.displayName}
        </p>
      ) : null}
    </div>
  );
}

const INTENT_OPTIONS: RadioOption[] = [
  {
    value: "long_term",
    label: "Something long-term",
    hint: "Building toward a partnership.",
  },
  {
    value: "exploring",
    label: "Exploring",
    hint: "Open to where it goes.",
  },
  {
    value: "friendship",
    label: "Friendship first",
    hint: "Starting as friends, see what unfolds.",
  },
];

function IntentFields({
  draft,
  errors,
}: {
  draft: OnboardingDraft;
  errors: Record<string, string>;
}) {
  return (
    <RadioGroup
      name="intent"
      options={INTENT_OPTIONS}
      defaultValue={draft.intent}
      error={errors.intent}
    />
  );
}

const PACING_OPTIONS: RadioOption[] = [
  {
    value: "slow",
    label: "Slow & considered",
    hint: "Fewer recommendations, more time.",
  },
  { value: "steady", label: "Steady", hint: "A balanced rhythm." },
  { value: "open", label: "Open", hint: "Show me more, more often." },
];

function PacingFields({
  draft,
  errors,
}: {
  draft: OnboardingDraft;
  errors: Record<string, string>;
}) {
  return (
    <RadioGroup
      name="pacing"
      options={PACING_OPTIONS}
      defaultValue={draft.pacing}
      error={errors.pacing}
    />
  );
}

const VALUE_CHIPS = [
  "Honesty",
  "Curiosity",
  "Family",
  "Adventure",
  "Calm",
  "Ambition",
  "Creativity",
  "Independence",
  "Care",
  "Humour",
  "Growth",
  "Spirituality",
];

function ValuesFields({
  draft,
  errors,
}: {
  draft: OnboardingDraft;
  errors: Record<string, string>;
}) {
  const initial = useMemo(() => new Set(draft.values ?? []), [draft.values]);
  const [picked, setPicked] = useState<Set<string>>(initial);

  useEffect(() => {
    setPicked(new Set(draft.values ?? []));
  }, [draft.values]);

  const toggle = (v: string) => {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else if (next.size < 5) next.add(v);
      return next;
    });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {VALUE_CHIPS.map((chip) => {
          const active = picked.has(chip);
          return (
            <label
              key={chip}
              className={`inline-flex cursor-pointer items-center rounded-full border px-4 py-2 text-body-md transition-colors ${
                active
                  ? "border-plum-500 bg-lavender-100 text-plum-700"
                  : "border-line bg-paper text-ink hover:bg-cloud"
              }`}
            >
              <input
                type="checkbox"
                name="values"
                value={chip}
                checked={active}
                onChange={() => toggle(chip)}
                className="sr-only"
              />
              {chip}
            </label>
          );
        })}
      </div>
      <p className="mt-3 text-body-sm text-slate">
        {picked.size} of 5 selected
      </p>
      {errors.values ? (
        <p role="alert" className="mt-2 text-body-sm text-danger">
          {errors.values}
        </p>
      ) : null}
    </div>
  );
}

function ReviewSummary({ draft }: { draft: OnboardingDraft }) {
  const rows: Array<{ label: string; value: string }> = [
    { label: "Display name", value: draft.displayName ?? "—" },
    { label: "Intent", value: humanise(draft.intent) },
    { label: "Pacing", value: humanise(draft.pacing) },
    { label: "Values", value: draft.values?.join(", ") || "—" },
  ];
  return (
    <dl className="divide-y divide-line rounded-[16px] border border-line bg-paper">
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex items-start justify-between gap-4 px-4 py-3"
        >
          <dt className="text-body-sm text-slate">{r.label}</dt>
          <dd className="text-right text-body-md text-ink">{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- Shared bits ---------- */

type RadioOption = { value: string; label: string; hint: string };

function RadioGroup({
  name,
  options,
  defaultValue,
  error,
}: {
  name: string;
  options: RadioOption[];
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div>
      <div role="radiogroup" className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex cursor-pointer items-start gap-3 rounded-[12px] border border-line bg-paper p-4 transition-colors hover:bg-cloud has-[input:checked]:border-plum-500 has-[input:checked]:bg-lavender-50"
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              defaultChecked={defaultValue === opt.value}
              className="mt-1 h-4 w-4 accent-plum-500"
            />
            <span className="flex-1">
              <span className="block text-body-md font-medium text-ink">
                {opt.label}
              </span>
              <span className="mt-0.5 block text-body-sm text-slate">
                {opt.hint}
              </span>
            </span>
          </label>
        ))}
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-body-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function flattenZod(err: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of err.issues) {
    const key = String(issue.path[0] ?? "_");
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

function humanise(v: string | undefined): string {
  if (!v) return "—";
  return v.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/**
 * Phase 1 stub for the submit endpoint.
 *
 * Phase 4 swap: replace with a `createServerFn` that writes
 * onboarding_drafts then promotes to profiles. Keep the same thrown-error
 * contract ("offline" | "permission_denied" | other) so the error route's
 * reason mapping stays stable.
 *
 * QA affordance: a display name of "denied" forces the
 * permission_denied branch — useful until the real endpoint lands.
 */
async function submitOnboardingDraft(draft: OnboardingDraft): Promise<void> {
  await new Promise((r) => setTimeout(r, 500));
  if (typeof navigator !== "undefined" && !navigator.onLine) {
    throw new Error("offline");
  }
  if (draft.displayName?.toLowerCase() === "denied") {
    throw new Error("permission_denied");
  }
}
