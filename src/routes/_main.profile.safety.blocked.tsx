import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, EyeOff, Eye } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { BlockConfirmModal } from "@/components/safety/BlockConfirmModal";

export const Route = createFileRoute("/_main/profile/safety/blocked")({
  head: () => ({ meta: [{ title: "Blocked — COUPL" }] }),
  component: BlockedListScreen,
});

const SAMPLE_BLOCKED = [
  { id: "u1", name: "James", age: 38, blockedOn: "12 Apr" },
  { id: "u2", name: "Iris", age: 32, blockedOn: "3 Apr" },
  { id: "u3", name: "Sasha", age: 29, blockedOn: "21 Mar" },
  { id: "u4", name: "Niko", age: 35, blockedOn: "10 Feb" },
];

function BlockedListScreen() {
  const [list, setList] = useState(SAMPLE_BLOCKED);
  const [pending, setPending] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [unblockedToast, setUnblockedToast] = useState<string | null>(null);

  const target = list.find((u) => u.id === pending) ?? null;

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link
            to="/profile/safety"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
        trailing={
          <button
            type="button"
            onClick={() => setHidden((h) => !h)}
            className="mr-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-label-mono text-plum-700 hover:bg-lavender-50"
          >
            {hidden ? <Eye size={13} /> : <EyeOff size={13} />}
            {hidden ? "Show your blocked list" : "Hide your blocked list"}
          </button>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Block list</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          People you've blocked.
        </h1>
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          They won't be able to message you or see your profile. You can keep
          someone blocked for as long as you like — there's no expectation to
          unblock anyone.
        </p>
      </header>

      {hidden ? (
        <article className="mx-5 rounded-[18px] border border-dashed border-line bg-paper px-5 py-8 text-center">
          <p className="font-display text-[15px] text-ink">
            Your blocked list is hidden.
          </p>
          <button
            type="button"
            onClick={() => setHidden(false)}
            className="mt-4 inline-flex rounded-full border border-line bg-paper px-5 py-2 font-body text-[13px] text-ink hover:bg-lavender-50"
          >
            Show list
          </button>
        </article>
      ) : list.length === 0 ? (
        <article className="mx-5 rounded-[18px] border border-dashed border-line bg-paper px-5 py-8 text-center">
          <p className="font-display text-[15px] text-ink">No one is blocked.</p>
          <p className="mt-2 font-body text-[13px] italic text-stone">
            If someone crosses a line, you can block them from their profile or any message.
          </p>
        </article>
      ) : (
        <ul className="px-5 pb-12 space-y-2.5">
          {list.map((u) => (
            <li
              key={u.id}
              className="flex items-center justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="grid h-10 w-10 place-items-center rounded-full font-display text-[14px] font-semibold text-paper"
                  style={{ background: "var(--stone)" }}
                >
                  {u.name.charAt(0)}
                </span>
                <div>
                  <p className="font-display text-[14.5px] text-ink">{u.name}</p>
                  <p className="mt-0.5 font-body text-[12px] text-stone">
                    Blocked on {u.blockedOn}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setPending(u.id)}
                className="rounded-full border border-line bg-paper px-3 py-1.5 text-label-mono text-plum-700 hover:bg-lavender-50"
              >
                Unblock
              </button>
            </li>
          ))}
        </ul>
      )}

      {unblockedToast && (
        <div className="fixed inset-x-0 bottom-6 z-40 mx-auto w-fit rounded-full bg-ink px-5 py-2.5 font-body text-[12.5px] text-paper shadow-elev-1">
          {unblockedToast} is no longer blocked
        </div>
      )}

      <BlockConfirmModal
        open={!!target}
        mode="unblock"
        userName={target?.name ?? ""}
        onConfirm={() => {
          if (target) {
            setList((l) => l.filter((u) => u.id !== target.id));
            setUnblockedToast(target.name);
            setTimeout(() => setUnblockedToast(null), 2400);
          }
          setPending(null);
        }}
        onCancel={() => setPending(null)}
      />
    </YouBackdrop>
  );
}
