import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/video/coach/$bookingId/lobby")({
  head: () => ({ meta: [{ title: "Liora joins soon — COUPL" }] }),
  component: CoachLobby,
});

function CoachLobby() {
  const { bookingId } = useParams({ from: "/_main/video/coach/$bookingId/lobby" });
  const navigate = useNavigate();
  const [secs, setSecs] = useState(120);

  useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [secs]);

  const ready = secs <= 0;
  const minutes = Math.ceil(secs / 60);

  return (
    <div
      className="min-h-[100dvh] px-5 bg-paper"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)", paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
    >
      <div className="mx-auto max-w-md">
        <p className="text-label-mono">Your session</p>
        <h1 className="mt-3 font-display text-[26px] leading-tight text-ink">
          {ready ? "Liora is ready." : `Liora joins in ${minutes} minute${minutes === 1 ? "" : "s"}.`}
        </h1>

        <article className="mt-6 flex items-center gap-3 rounded-[16px] bg-paper p-4 shadow-elev-1">
          <span
            aria-hidden
            className="grid h-12 w-12 place-items-center rounded-full font-display text-[18px] text-paper"
            style={{ background: "var(--plum-700)" }}
          >
            L
          </span>
          <div>
            <p className="font-display text-[15px] font-semibold text-ink">Liora</p>
            <p className="text-label-mono">Practitioner</p>
          </div>
        </article>

        <p className="mt-8 font-display text-[14px] italic text-stone">
          Take a moment. You don't have to know what to say.
        </p>

        <section className="mt-8">
          <p className="text-label-mono">Before we start</p>
          <ul className="mt-3 space-y-2 font-body text-[13.5px] text-ink">
            <li>· Twenty minutes — she'll watch the time.</li>
            <li>· If you cry, that's fine. If you don't, that's also fine.</li>
            <li>· Calls aren't recorded. Ever.</li>
          </ul>
        </section>

        {ready && (
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/video/coach/$bookingId/active",
                params: { bookingId },
              })
            }
            className="mt-10 w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Join Liora
          </button>
        )}
      </div>
    </div>
  );
}
