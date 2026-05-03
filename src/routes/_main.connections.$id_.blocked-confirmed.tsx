import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_main/connections/$id_/blocked-confirmed")({
  head: () => ({ meta: [{ title: "Blocked — COUPL" }] }),
  component: BlockedConfirmed,
});

function BlockedConfirmed() {
  const { id } = useParams({ from: "/_main/connections/$id_/blocked-confirmed" });

  return (
    <div className="relative px-5 pb-16 pt-6">
      <header className="flex items-center gap-3">
        <Link
          to="/connections"
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="text-label-mono">Connection</p>
      </header>

      <div className="mx-auto mt-12 max-w-[420px]">
        <h1 className="font-display text-[24px] leading-tight text-ink">Blocked.</h1>
        <div className="mt-6 space-y-2 font-body text-[14px] leading-[1.7] text-slate">
          <p>They can't reach you.</p>
          <p>They won't know why.</p>
          <p>You can undo this in 7 days. After that it's permanent.</p>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          <Link
            to="/connections/$id"
            params={{ id }}
            className="block text-center font-body text-[13.5px] text-plum-700 hover:underline"
          >
            Undo block
          </Link>
          <Link
            to="/connections"
            className="rounded-full bg-plum-700 px-5 py-3.5 text-center font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Done
          </Link>
        </div>
      </div>
    </div>
  );
}
