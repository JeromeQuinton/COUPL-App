import { useEffect, useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { getConnection } from "@/data/connections_sample";

/**
 * /connections/$id/notes — private connection notes.
 *
 * Plain textarea, visible only to the user. Phase 1 autosaves to
 * localStorage keyed per connection. Phase 4 will persist via a
 * private `connection_notes` table (RLS owner-only).
 */
export const Route = createFileRoute("/_main/connections/$id_/notes")({
  head: () => ({
    meta: [
      { title: "Notes — COUPL" },
      {
        name: "description",
        content: "Private notes about this connection. Only you can see them.",
      },
    ],
  }),
  component: NotesScreen,
});

const STORAGE_PREFIX = "coupl.connection.notes.";
const SAVE_DEBOUNCE_MS = 600;

function NotesScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/notes" });
  const c = getConnection(id);
  const name = c?.name ?? "them";
  const storageKey = `${STORAGE_PREFIX}${id}`;

  const [text, setText] = useState("");
  const [savedAt, setSavedAt] = useState<Date | null>(null);

  // Load on mount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) setText(stored);
    } catch {
      // localStorage may be unavailable; fail quiet.
    }
  }, [storageKey]);

  // Debounced autosave.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const handle = window.setTimeout(() => {
      try {
        window.localStorage.setItem(storageKey, text);
        setSavedAt(new Date());
      } catch {
        // Quota or privacy mode — nothing to do.
      }
    }, SAVE_DEBOUNCE_MS);
    return () => window.clearTimeout(handle);
  }, [text, storageKey]);

  const savedLabel = savedAt
    ? `Saved · ${savedAt.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}`
    : "Autosaves as you write";

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
            aria-label="Back to conversation"
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Notes · private
          </p>
        </header>

        <div className="mt-6">
          <h1 className="font-display text-[26px] leading-[1.15] text-ink">
            What you'd want to remember.
          </h1>
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">
            A quiet place for the small things about {name} — only you can see
            this. No one is notified. Nothing is shared.
          </p>
        </div>

        <div className="mt-6 flex-1 rounded-[18px] border border-plum-300/25 bg-paper/70 backdrop-blur-sm">
          <label htmlFor="connection-notes" className="sr-only">
            Private notes
          </label>
          <textarea
            id="connection-notes"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Their dad's name. The book they mentioned. The way they laugh."
            className="h-full min-h-[260px] w-full resize-none rounded-[18px] bg-transparent px-4 py-4 font-body text-[15px] leading-relaxed text-ink placeholder:text-plum-400 focus:outline-none"
          />
        </div>

        <p className="mt-3 text-[11.5px] text-slate">{savedLabel}</p>
      </div>
    </PageBackdrop>
  );
}
