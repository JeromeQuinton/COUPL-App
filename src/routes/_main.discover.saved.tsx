import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { X } from "lucide-react";
import { getSavedProfiles, unsaveProfile } from "@/lib/saved-profiles";

export const Route = createFileRoute("/_main/discover/saved")({
  head: () => ({ meta: [{ title: "Saved — COUPL" }] }),
  component: SavedList,
});

const SAMPLE_PROFILES: Record<string, { name: string; about: string }> = {
  "p-maya": { name: "Maya · 31", about: "Slow walks. Books that take you back to a self you'd forgotten." },
  "p-noah": { name: "Noah · 34", about: "Friday-night dinners that feel like a ritual rather than a meal." },
  "p-ava": { name: "Ava · 29", about: "Long voice notes. The kind of friend who remembers what you said in passing." },
};

function SavedList() {
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    setIds(getSavedProfiles());
  }, []);

  const remove = (id: string) => {
    unsaveProfile(id);
    setIds(getSavedProfiles());
  };

  return (
    <div
      className="min-h-[100dvh] px-5 bg-paper"
      style={{ paddingTop: "calc(env(safe-area-inset-top) + 1.5rem)", paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)" }}
    >
      <div className="mx-auto max-w-md">
        <p className="text-label-mono">Saved</p>
        <h1 className="mt-3 font-display text-[28px] italic leading-tight text-ink">
          Who's stayed with you?
        </h1>

        {ids.length === 0 ? (
          <article className="mt-10 rounded-[18px] border border-dashed border-line bg-paper px-5 py-8 text-center">
            <p className="font-display text-[16px] text-ink">Nothing saved yet.</p>
            <p className="mt-2 font-display text-[13.5px] italic text-stone">
              When a profile stays with you, save it here for later.
            </p>
          </article>
        ) : (
          <ul className="mt-8 space-y-3">
            {ids.map((id) => {
              const p = SAMPLE_PROFILES[id];
              const stale = !p;
              return (
                <li
                  key={id}
                  className={`flex items-start gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1 ${
                    stale ? "opacity-50" : ""
                  }`}
                >
                  <span
                    aria-hidden
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-lavender-100 font-display text-[18px] text-plum-700"
                  >
                    {(p?.name ?? id).charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-label-mono text-stone">SAVED</p>
                    <p className="mt-0.5 font-display text-[15px] text-ink">
                      {p?.name ?? id}
                    </p>
                    <p className="mt-0.5 font-display text-[12.5px] italic text-stone">
                      {stale ? "No longer in rotation" : p.about}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      to="/discover/$id"
                      params={{ id }}
                      className="rounded-full bg-lavender-100 px-3 py-1.5 text-label-mono text-plum-700 hover:opacity-90"
                    >
                      Open
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(id)}
                      aria-label="Unsave"
                      className="grid h-8 w-8 place-items-center rounded-full text-stone hover:bg-lavender-50"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
