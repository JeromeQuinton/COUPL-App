import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Copy, Download } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

export const Route = createFileRoute(
  "/_main/profile/account/2fa/recovery-codes",
)({
  head: () => ({ meta: [{ title: "Backup codes — COUPL" }] }),
  component: RecoveryCodesScreen,
});

function generateCodes(): string[] {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: 8 }, () =>
    Array.from({ length: 10 }, () =>
      alphabet.charAt(Math.floor(Math.random() * alphabet.length)),
    ).join(""),
  );
}

function RecoveryCodesScreen() {
  const navigate = useNavigate();
  const codes = useMemo(generateCodes, []);
  const [acknowledged, setAcknowledged] = useState(false);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(codes.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be blocked; ignore
    }
  };

  const onDownload = () => {
    const blob = new Blob([codes.join("\n") + "\n"], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "coupl-backup-codes.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link
            to="/profile/account/2fa"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Account · backup codes</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Backup codes.
        </h1>
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          Save these somewhere only you can find. Each works once. We can't
          show them again.
        </p>
      </header>

      <section className="px-5">
        <ul className="grid grid-cols-2 gap-2 rounded-[14px] border border-line bg-paper px-4 py-4">
          {codes.map((c) => (
            <li
              key={c}
              className="text-center font-mono text-[13.5px] tracking-[0.12em] text-ink"
            >
              {c}
            </li>
          ))}
        </ul>
      </section>

      <div className="px-5 pt-6 space-y-3">
        <button
          type="button"
          onClick={onDownload}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-plum-700 px-5 py-3 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          <Download size={14} strokeWidth={2} />
          Download .txt
        </button>
        <button
          type="button"
          onClick={onCopy}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-line bg-paper px-5 py-3 font-body text-[13.5px] text-ink hover:bg-lavender-50"
        >
          <Copy size={13} strokeWidth={2} />
          {copied ? "Copied" : "Copy all"}
        </button>
      </div>

      <section className="px-5 pt-6">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
            className="mt-1"
          />
          <span className="font-body text-[13.5px] text-ink">
            I've saved these somewhere safe.
          </span>
        </label>
      </section>

      <div className="px-5 pt-6 pb-12">
        <button
          type="button"
          disabled={!acknowledged}
          onClick={() => navigate({ to: "/profile/account/2fa" })}
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Done
        </button>
      </div>
    </YouBackdrop>
  );
}
