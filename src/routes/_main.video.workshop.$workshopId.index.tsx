import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/video/workshop/$workshopId/")({
  head: () => ({ meta: [{ title: "Workshop lobby — COUPL" }] }),
  component: WorkshopLobby,
});

function WorkshopLobby() {
  const { workshopId } = useParams({ from: "/_main/video/workshop/$workshopId/" });
  const navigate = useNavigate();
  const [secs, setSecs] = useState(240);

  useEffect(() => {
    if (secs <= 0) return;
    const id = setInterval(() => setSecs((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [secs]);

  const minutes = Math.ceil(secs / 60);
  const ready = secs <= 0;

  return (
    <div
      className="min-h-[100dvh] px-5 bg-paper"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)", paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
    >
      <div className="mx-auto max-w-[460px]">
        <p className="text-label-mono">Session 2 of 4</p>
        <h1 className="mt-3 font-display text-[28px] leading-tight text-ink">
          The repair conversation
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

        <p className="mt-8 font-display text-[20px] leading-snug text-ink">
          {ready ? "Ready when you are." : `Your session begins in ${minutes} minute${minutes === 1 ? "" : "s"}.`}
        </p>
        <p className="mt-3 font-display text-[14px] italic text-stone">
          Take a breath. Get a glass of water. Close other tabs.
        </p>

        <section className="mt-8">
          <p className="text-label-mono">What to expect</p>
          <ul className="mt-3 space-y-2 font-body text-[13.5px] text-ink">
            <li>· 75 minutes.</li>
            <li>· Liora will speak; you'll listen and be invited in.</li>
            <li>· Camera optional. Presence required.</li>
          </ul>
        </section>

        {ready && (
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/video/workshop/$workshopId/live",
                params: { workshopId },
              })
            }
            className="mt-10 w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Join session
          </button>
        )}
      </div>
    </div>
  );
}
