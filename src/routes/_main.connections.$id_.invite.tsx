import { useState, type ChangeEvent, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/invite — Invite Composer (UI-0421).
 *
 * Free-form invite-to-plan composer. Three editorial suggestion chips
 * derived from per-pair connection-language. Soft 120-char limit;
 * Polaris-toned, no sales language. On send, returns to the thread —
 * Phase 1 is state-free (no actual invite card append; that's Phase 4).
 *
 * Voice: "Invite them to plan." not "shoot your shot". Calm naming.
 *
 * DR refs: DR-INVITE-COMPOSE (Stream 14 connection depth).
 */
export const Route = createFileRoute("/_main/connections/$id_/invite")({
  head: () => ({
    meta: [
      { title: "Invite them to plan — COUPL" },
      {
        name: "description",
        content:
          "A short message to open a plan. Editorial, plain, no sales.",
      },
    ],
  }),
  component: InviteComposerScreen,
});

const SOFT_LIMIT = 120;

/**
 * Phase-1 suggestion source. In Phase 4 these come from
 * `getConnectionLanguage(pairId)` and reflect actual conversation
 * patterns. For now: three calm, intent-aligned editorial fragments
 * keyed off the connection's name to feel pair-specific.
 */
function suggestionsFor(name: string): string[] {
  return [
    `Coffee somewhere quiet, ${name}? No agenda.`,
    `A short walk this weekend if you're free.`,
    `Dinner — a place I think you'd like.`,
  ];
}

function InviteComposerScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/invite" });
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "them";
  const [text, setText] = useState("");

  const overLimit = text.length > SOFT_LIMIT;
  const canSend = text.trim().length > 0;
  const suggestions = suggestionsFor(name);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onPick = (phrase: string) => {
    setText(phrase);
  };

  const onSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSend) return;
    // Phase 1: state-free. Phase 4 will append an invite card to the
    // thread via createInvite(pairId, text). For now, return to thread.
    navigate({ to: "/connections/$id", params: { id } });
  };

  return (
    <PageBackdrop>
      <div
        className="mx-auto flex w-full max-w-[480px] flex-col px-6"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
        }}
      >
        <header className="flex items-center gap-2 py-2">
          <Link
            to="/connections/$id"
            params={{ id }}
            aria-label="Back to thread"
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Invite · message
          </p>
        </header>

        <form id="invite-form" onSubmit={onSend} className="mt-4 flex-1">
          <h1 className="font-display text-[28px] leading-[1.15] text-ink">
            Invite them to plan.
          </h1>
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">
            A short message — they'll see it as the opener for a plan.
          </p>

          <label className="mt-8 block">
            <span className="sr-only">Your message</span>
            <textarea
              value={text}
              onChange={onChange}
              rows={5}
              placeholder="What do you have in mind?"
              className="w-full resize-none rounded-[16px] border border-plum-300/30 bg-paper/70 px-4 py-3 font-body text-[14.5px] leading-relaxed text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
            />
          </label>
          <p
            className={
              "mt-2 text-right font-body text-[12px] " +
              (overLimit ? "text-plum-700" : "text-stone")
            }
            aria-live="polite"
          >
            {text.length} / {SOFT_LIMIT}
          </p>

          <section className="mt-6">
            <p className="text-mono-sm uppercase tracking-[0.14em] text-slate">
              Or pick a starting phrase
            </p>
            <div className="mt-3 flex flex-col gap-2">
              {suggestions.map((phrase) => (
                <button
                  key={phrase}
                  type="button"
                  onClick={() => onPick(phrase)}
                  className="rounded-[14px] border border-plum-300/25 bg-paper/60 px-4 py-3 text-left font-display text-[14.5px] italic leading-relaxed text-plum-700 transition-colors hover:bg-lavender-50"
                >
                  {phrase}
                </button>
              ))}
            </div>
          </section>
        </form>

        <div className="mt-auto space-y-3 pt-10">
          <button
            type="submit"
            form="invite-form"
            disabled={!canSend}
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Send invite
          </button>
          <Link
            to="/connections/$id"
            params={{ id }}
            className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
          >
            Maybe later
          </Link>
        </div>
      </div>
    </PageBackdrop>
  );
}
