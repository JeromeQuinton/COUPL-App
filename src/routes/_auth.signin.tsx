import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — COUPL" },
      { name: "description", content: "Sign in to COUPL." },
    ],
  }),
  component: SignInScreen,
});

function SignInScreen() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[640px] flex-col px-6 pb-10 pt-16">
      <div className="flex-1">
        <p className="text-body-sm uppercase tracking-[0.18em] text-plum-500">
          COUPL
        </p>
        <h1 className="mt-3 text-display-xl text-ink">Welcome back.</h1>
        <p className="mt-3 text-body-lg text-slate">
          Sign in to continue. Phase 1 placeholder — auth wiring lands in Phase 2.
        </p>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          className="h-12 w-full rounded-[12px] bg-plum-500 text-body-md font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700"
        >
          Continue with email
        </button>
        <button
          type="button"
          className="h-12 w-full rounded-[12px] border border-line bg-paper text-body-md font-medium text-ink transition-colors hover:bg-cloud"
        >
          Continue with Google
        </button>
        <button
          type="button"
          className="h-12 w-full rounded-[12px] border border-line bg-paper text-body-md font-medium text-ink transition-colors hover:bg-cloud"
        >
          Continue with Apple
        </button>
        <p className="pt-3 text-center text-body-sm text-stone">
          New here?{" "}
          <Link to="/onboarding" className="text-plum-500 underline-offset-4 hover:underline">
            Begin onboarding
          </Link>
        </p>
      </div>
    </div>
  );
}