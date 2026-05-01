import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Plus, Pencil } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { EDIT_PHOTOS, EDIT_PROMPTS, EDIT_THINGS_TO_KNOW } from "@/data/you_sample";

export const Route = createFileRoute("/_main/profile/edit")({
  head: () => ({ meta: [{ title: "Edit profile · COUPL" }] }),
  component: EditProfilePage,
});

function EditProfilePage() {
  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile"
            aria-label="Back to You"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
        trailing={
          <button
            type="button"
            className="font-body text-[12.5px] font-semibold text-plum-700 hover:opacity-80"
          >
            Save changes
          </button>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <h1 className="font-display text-[26px] font-semibold leading-tight text-ink">
          Edit your profile
        </h1>
        <p className="mt-1.5 font-body text-[13px] text-slate">
          Edits to photos and prompts go through review again.
        </p>
      </header>

      {/* Photos */}
      <section className="px-5">
        <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          Photos · {EDIT_PHOTOS.length} of 6
        </h2>
        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {EDIT_PHOTOS.map((p) => (
            <div key={p.id} className="relative aspect-[3/4] overflow-hidden rounded-[14px]" style={{ background: p.swatch }}>
              {p.main && (
                <span className="absolute left-2 top-2 rounded-full bg-paper/90 px-2 py-0.5 font-body text-[10px] font-semibold uppercase tracking-wider text-ink">
                  Main
                </span>
              )}
            </div>
          ))}
          {Array.from({ length: 6 - EDIT_PHOTOS.length }).map((_, i) => (
            <button
              key={`empty-${i}`}
              type="button"
              className="flex aspect-[3/4] items-center justify-center rounded-[14px] border border-dashed border-plum-300/60 bg-paper/40 text-plum-500 transition-colors hover:bg-lavender-50"
              aria-label="Add photo"
            >
              <Plus size={20} strokeWidth={1.75} />
            </button>
          ))}
        </div>
      </section>

      {/* Prompts */}
      <section className="px-5 pt-7">
        <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          Prompts
        </h2>
        <ul className="mt-3 flex flex-col gap-3">
          {EDIT_PROMPTS.map((p) => (
            <li key={p.id} className="rounded-[14px] bg-paper p-4 shadow-elev-1">
              <div className="flex items-start justify-between gap-3">
                <p className="font-body text-[12.5px] text-stone">{p.setup}</p>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 font-body text-[12px] font-semibold text-plum-700 hover:opacity-80"
                >
                  <Pencil size={11} /> Edit
                </button>
              </div>
              <p className="mt-2 font-display text-[15px] leading-snug text-plum-700">
                {p.answer}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Things to know */}
      <section className="px-5 pt-7 pb-12">
        <h2 className="font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-slate">
          Things to know
        </h2>
        <ul className="mt-3 flex flex-col gap-2 rounded-[14px] bg-paper p-4 shadow-elev-1">
          {EDIT_THINGS_TO_KNOW.map((t) => (
            <li key={t} className="flex items-start gap-2 font-body text-[13.5px] text-ink/85">
              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-plum-500" />
              {t}
            </li>
          ))}
        </ul>
      </section>
    </YouBackdrop>
  );
}