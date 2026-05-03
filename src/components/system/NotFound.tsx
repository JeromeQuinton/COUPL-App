import { Link } from "@tanstack/react-router";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <p className="text-label-mono text-stone">404</p>
      <h1 className="mt-3 max-w-[420px] font-display text-[24px] leading-tight text-ink">
        This page doesn't exist any more, or never did.
      </h1>
      <p className="mt-3 font-body text-[14px] text-slate">
        Or you took a wrong turn.
      </p>
      <Link
        to="/home"
        className="mt-8 rounded-full bg-plum-700 px-6 py-3 font-display text-[14.5px] font-medium text-paper shadow-elev-1 hover:opacity-90"
      >
        Back to Home
      </Link>
    </div>
  );
}
