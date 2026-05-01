import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { ENDING_TEMPLATES, getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/clean-ending — Clean Ending (Screen 17).
 *
 * Three relationally mature templates with editable draft. No ghosting
 * encouragement. Cancel + Send. Therapy-informed, premium.
 */
export const Route = createFileRoute("/_main/connections/$id_/clean-ending")({
  head: () => ({
    meta: [
      { title: "A clean ending — COUPL" },
      {
        name: "description",
        content:
          "Three honest templates. Edit fully. No dark patterns on cancel.",
      },
    ],
  }),
  component: CleanEndingScreen,
});

function CleanEndingScreen() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "them";

  const [selectedId, setSelectedId] = useState<string>(ENDING_TEMPLATES[0].id);
  const selected = useMemo(
    () => ENDING_TEMPLATES.find((t) => t.id === selectedId) ?? ENDING_TEMPLATES[0],
    [selectedId],
  );
  const initialDraft = selected.template.replaceAll("{name}", name);
  const [draft, setDraft] = useState<string>(initialDraft);

  // When template changes, reseed the draft.
  const handleSelect = (tid: string) => {
    const t = ENDING_TEMPLATES.find((x) => x.id === tid);
    if (!t) return;
    setSelectedId(tid);
    setDraft(t.template.replaceAll("{name}", name));
  };

  return (
    <PageBackdrop>
      <div
        className="mx-auto w-full max-w-[460px] px-5"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 1.5rem)",
        }}
      >
        {/* Header */}
        <header className="flex items-center justify-between">
          <Link
            to="/connections/$id"
            params={{ id }}
            aria-label="Back to thread"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="font-display text-[17px] font-semibold italic text-ink">
            A clean ending
          </h1>
          <span aria-hidden className="w-8" />
        </header>

        {/* Eyebrow + intro */}
        <p className="mt-5 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-plum-500">
          <span className="opacity-60">UI-CleanEnd · </span>Clean ending protocol
        </p>
        <p className="mt-2 text-[13px] leading-relaxed text-slate">
          Three honest templates. Edit fully. No dark patterns on cancel.
        </p>

        {/* Templates */}
        <ul className="mt-5 flex flex-col gap-2.5" aria-label="Closure templates">
          {ENDING_TEMPLATES.map((t) => {
            const active = t.id === selectedId;
            return (
              <li key={t.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(t.id)}
                  aria-pressed={active}
                  className={`block w-full rounded-[16px] border px-4 py-3.5 text-left transition-colors ${
                    active
                      ? "border-plum-500 bg-lavender-100"
                      : "border-line bg-paper hover:bg-lavender-50"
                  }`}
                >
                  <p
                    className={`font-display text-[15px] font-semibold ${
                      active ? "text-plum-700" : "text-ink"
                    }`}
                  >
                    {t.title}
                  </p>
                  <p className="mt-0.5 font-body text-[12.5px] italic text-slate">
                    {t.blurb}
                  </p>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Editable draft */}
        <section className="mt-5">
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-plum-500">
            Draft
          </p>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
            className="mt-2 w-full resize-none rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[13.5px] italic leading-relaxed text-ink focus:border-plum-500 focus:outline-none"
            aria-label="Editable closure note"
          />
        </section>

        {/* Cancel + Send */}
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => navigate({ to: "/connections/$id", params: { id } })}
            className="rounded-full border border-line bg-paper px-5 py-3 font-display text-[14.5px] font-medium text-ink transition-colors hover:bg-lavender-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => navigate({ to: "/connections" })}
            className="rounded-full bg-plum-700 px-5 py-3 font-display text-[14.5px] font-medium text-paper shadow-elev-1 transition-colors hover:opacity-90"
          >
            Send
          </button>
        </div>

        <p className="mt-4 text-center text-[11.5px] italic text-stone">
          {name} can read once. The thread closes after.
        </p>
      </div>
    </PageBackdrop>
  );
}