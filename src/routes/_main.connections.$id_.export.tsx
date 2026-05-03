import { useMemo, useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, Download } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import {
  getConnection,
  THREADS,
  type ThreadMessage,
} from "@/data/connections_sample";

/**
 * /connections/$id/export — privacy-aligned thread export.
 *
 * Phase 1: generate a plain-text blob from the thread messages and
 * trigger a client-side download. Phase 4 will include media
 * attachments and a JSON option for portability.
 */
export const Route = createFileRoute("/_main/connections/$id_/export")({
  head: () => ({
    meta: [
      { title: "Export — COUPL" },
      {
        name: "description",
        content: "Download this conversation. Yours to keep.",
      },
    ],
  }),
  component: ExportScreen,
});

function buildText(name: string, messages: ThreadMessage[]): string {
  const header = [
    `Conversation with ${name}`,
    `Exported from COUPL — ${new Date().toLocaleString("en-GB", {
      dateStyle: "long",
      timeStyle: "short",
    })}`,
    "",
    "—",
    "",
  ];
  const body = messages.map((m) => {
    if (m.kind === "time") return `\n[${m.label}]\n`;
    if (m.kind === "coach") return `(Coach · ${m.title}) ${m.body}`;
    if (m.kind === "msg") {
      const who = m.from === "me" ? "You" : name;
      return `${who}: ${m.text}`;
    }
    return "";
  });
  const footer = ["", "—", "", "Yours to keep, even if the connection ends."];
  return [...header, ...body, ...footer].join("\n");
}

function ExportScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/export" });
  const c = getConnection(id);
  const name = c?.name ?? "them";
  const messages = THREADS[id] ?? [];
  const [downloaded, setDownloaded] = useState(false);

  const text = useMemo(() => buildText(name, messages), [name, messages]);
  const messageCount = messages.filter((m) => m.kind === "msg").length;

  const onDownload = () => {
    if (typeof window === "undefined") return;
    try {
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safeName = name.replace(/[^a-z0-9]+/gi, "-").toLowerCase();
      const stamp = new Date().toISOString().slice(0, 10);
      a.download = `coupl-conversation-${safeName}-${stamp}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloaded(true);
    } catch {
      // Fail quiet; user can retry.
    }
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
            aria-label="Back to conversation"
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Export
          </p>
        </header>

        <div className="mt-6">
          <h1 className="font-display text-[26px] leading-[1.15] text-ink">
            Yours to keep.
          </h1>
          <p className="mt-3 font-body text-[14.5px] leading-relaxed text-slate">
            Download your conversation with {name} as a plain text file.
            Yours to keep, even if the connection ends.
          </p>
        </div>

        <section className="mt-7 rounded-[18px] border border-plum-300/25 bg-paper/70 p-5 backdrop-blur-sm">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            What you'll get
          </p>
          <ul className="mt-3 space-y-2 font-body text-[14px] text-ink">
            <li>· Every message between you, in order.</li>
            <li>· Day markers and coach notes alongside.</li>
            <li>· A plain `.txt` file. Open it anywhere.</li>
          </ul>
          <p className="mt-4 text-[12.5px] text-slate">
            Voice memos and photos arrive in a later release.
          </p>
        </section>

        <section className="mt-4 rounded-[18px] border border-plum-300/25 bg-paper/70 p-5 backdrop-blur-sm">
          <p className="text-[10.5px] font-medium uppercase tracking-[0.28em] text-plum-500">
            Preview
          </p>
          <div className="mt-3 max-h-[180px] overflow-auto rounded-[12px] bg-lavender-50/40 p-3 font-mono text-[12px] leading-relaxed text-ink">
            <pre className="whitespace-pre-wrap break-words">
              {text.split("\n").slice(0, 16).join("\n")}
              {text.split("\n").length > 16 ? "\n…" : ""}
            </pre>
          </div>
          <p className="mt-3 text-[12.5px] text-slate">
            {messageCount} {messageCount === 1 ? "message" : "messages"} in this
            export.
          </p>
        </section>

        <button
          type="button"
          onClick={onDownload}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-plum-600 to-plum-500 px-5 py-3 font-display text-[15px] font-medium text-paper shadow-sm transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-500"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Download as text
        </button>

        {downloaded && (
          <p className="mt-3 text-[12.5px] text-slate">
            Saved to your downloads. Yours.
          </p>
        )}
      </div>
    </PageBackdrop>
  );
}
