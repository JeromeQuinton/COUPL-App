type Props = {
  error?: unknown;
  reset?: () => void;
};

export function ErrorBoundary({ reset }: Props) {
  const onTryAgain = () => {
    if (reset) {
      reset();
      return;
    }
    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center">
      <p className="text-label-mono text-stone">Something happened</p>
      <h1 className="mt-3 max-w-[420px] font-display text-[24px] leading-tight text-ink">
        Something went sideways.
      </h1>
      <p className="mt-3 font-body text-[14px] text-slate">
        The internet wobbled.
      </p>
      <button
        type="button"
        onClick={onTryAgain}
        className="mt-8 rounded-full bg-plum-700 px-6 py-3 font-display text-[14.5px] font-medium text-paper shadow-elev-1 hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
