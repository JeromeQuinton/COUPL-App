import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
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

  const target = list.find((u) => u.id === pending) ?? null;

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link to="/profile/safety" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Block list</p>
        <h1 className="mt-2 font-display text-[28px] italic leading-tight text-ink">
          Who can't reach you?
        </h1>
      </header>

      {list.length === 0 ? (
        <article className="mx-5 rounded-[18px] border border-dashed border-line bg-paper px-5 py-8 text-center">
          <p className="font-display text-[15px] text-ink">No one is blocked.</p>
          <p className="mt-2 font-display text-[13px] italic text-stone">
            If someone crosses a line, you can block them from their profile or any message.
          </p>
        </article>
      ) : (
        <ul className="px-5 pb-12 space-y-2.5">
          {list.map((u) => (
            <li key={u.id} className="flex items-start justify-between gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1">
              <div>
                <p className="font-display text-[15px] text-ink">{u.name} · {u.age}</p>
                <p className="mt-0.5 font-body text-[12px] text-stone">Blocked on {u.blockedOn}</p>
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

      <BlockConfirmModal
        open={!!target}
        mode="unblock"
        userName={target?.name ?? ""}
        onConfirm={() => {
          if (target) setList((l) => l.filter((u) => u.id !== target.id));
          setPending(null);
        }}
        onCancel={() => setPending(null)}
      />
    </YouBackdrop>
  );
}
