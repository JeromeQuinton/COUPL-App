import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /profile/account/linked — manage external sign-in providers.
 *
 * Closes the disabled "Linked accounts" row on /profile/account.
 *
 * Stream-19 SCREEN-36.
 */
export const Route = createFileRoute("/_main/profile/account/linked")({
  head: () => ({ meta: [{ title: "Linked accounts — COUPL" }] }),
  component: LinkedScreen,
});

type Provider = { id: "apple" | "google" | "email"; label: string; status: "connected" | "available" };

const SEED: Provider[] = [
  { id: "apple", label: "Apple", status: "connected" },
  { id: "google", label: "Google", status: "available" },
  { id: "email", label: "Email + password", status: "connected" },
];

function LinkedScreen() {
  const [providers, setProviders] = useState<Provider[]>(SEED);
  const [confirming, setConfirming] = useState<Provider | null>(null);

  const toggle = (p: Provider) => {
    if (p.status === "connected") setConfirming(p);
    else
      setProviders((cur) =>
        cur.map((x) => (x.id === p.id ? { ...x, status: "connected" } : x)),
      );
  };

  const confirmDisconnect = () => {
    if (!confirming) return;
    setProviders((cur) =>
      cur.map((x) => (x.id === confirming.id ? { ...x, status: "available" } : x)),
    );
    setConfirming(null);
  };

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link to="/profile/account" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Account · linked</p>
        <h1 className="mt-2 font-display text-[28px] italic leading-tight text-ink">
          Where you sign in from.
        </h1>
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          Keep at least one connected. Disconnecting the last one signs
          you out for good.
        </p>
      </header>

      <ul className="px-5 pb-12 space-y-2.5">
        {providers.map((p) => (
          <li
            key={p.id}
            className="flex items-center gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1"
          >
            <div className="min-w-0 flex-1">
              <p className="font-display text-[15px] text-ink">{p.label}</p>
              <p className="mt-0.5 font-body text-[12px] text-stone">
                {p.status === "connected" ? "Connected" : "Not connected"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => toggle(p)}
              className={
                p.status === "connected"
                  ? "rounded-full border border-plum-700 px-3.5 py-1.5 font-body text-[12.5px] text-plum-700 hover:bg-lavender-50"
                  : "rounded-full bg-plum-700 px-3.5 py-1.5 font-body text-[12.5px] text-paper hover:bg-plum-500"
              }
            >
              {p.status === "connected" ? "Disconnect" : "Connect"}
            </button>
          </li>
        ))}
      </ul>

      {confirming && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4"
          onClick={() => setConfirming(null)}
        >
          <div
            className="w-full max-w-[440px] rounded-[20px] bg-paper p-5 shadow-elev-1"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-label-mono">Disconnect</p>
            <p className="mt-2 font-display text-[18px] italic leading-snug text-ink">
              Disconnect {confirming.label}?
            </p>
            <p className="mt-3 font-body text-[13px] leading-relaxed text-slate">
              You won't be able to sign in via {confirming.label} after this.
              Make sure you can still get in another way.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirming(null)}
                className="flex-1 rounded-full border border-line bg-paper px-4 py-2.5 font-body text-[13.5px] text-ink"
              >
                Keep it
              </button>
              <button
                type="button"
                onClick={confirmDisconnect}
                className="flex-1 rounded-full bg-plum-700 px-4 py-2.5 font-body text-[13.5px] font-medium text-paper"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </YouBackdrop>
  );
}
