import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_main/connections/$id_/cool-off-active")({
  head: () => ({ meta: [{ title: "Cool-off active — COUPL" }] }),
  component: CoolOffActive,
});

const COOL_OFF_HOURS = 24;

function CoolOffActive() {
  const { id } = useParams({ from: "/_main/connections/$id_/cool-off-active" });

  const [endsAt] = useState<number>(() => Date.now() + COOL_OFF_HOURS * 3_600_000);
  const [now, setNow] = useState<number>(() => Date.now());
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);

  const remainingHHMM = useMemo(() => {
    const ms = Math.max(0, endsAt - now);
    const totalMin = Math.floor(ms / 60_000);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }, [now, endsAt]);

  const endsAtLabel = useMemo(() => {
    const d = new Date(endsAt);
    return d.toLocaleString("en-GB", {
      weekday: "long",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }, [endsAt]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <div className="relative px-5 pb-16 pt-6">
      <header className="flex items-center gap-3">
        <Link
          to="/connections/$id"
          params={{ id }}
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="text-label-mono">Cool-off</p>
      </header>

      <h1 className="mt-3 font-display text-[24px] font-semibold leading-tight text-ink">
        Cool-off active.
      </h1>
      <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
        24 hours of quiet. Nothing they send reaches you. Nothing you send reaches them.
      </p>

      <section className="mt-7 rounded-[18px] border border-plum-300/40 bg-paper p-5 text-center shadow-elev-1">
        <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
          Time remaining
        </p>
        <p className="mt-2 font-display text-[40px] tabular-nums text-ink">
          {remainingHHMM}
        </p>
        <p className="mt-1 font-body text-[11.5px] text-stone">
          Ends {endsAtLabel}
        </p>
      </section>

      <ul className="mt-6 flex flex-col gap-2">
        <Option
          label="Wait it out"
          helper="Do nothing. The cool-off ends on its own."
          onClick={() => showToast("Cool-off continues quietly")}
        />
        <Option
          label="Send one message"
          helper="One message gets through to them. They can reply once it ends."
          onClick={() => showToast("One message sent")}
        />
        <Option
          label="Block fully"
          helper="End this here. Routes you to the block confirmation."
          to={{ path: "/connections/$id/blocked-confirmed", params: { id } }}
        />
        <Option
          label="Release the cool-off"
          helper="Both of you can talk again now."
          onClick={() => showToast("Cool-off released")}
        />
      </ul>

      {toast ? (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-[12.5px] font-medium text-paper shadow-elev-1"
        >
          {toast}
        </div>
      ) : null}
    </div>
  );
}

function Option({
  label,
  helper,
  to,
  onClick,
}: {
  label: string;
  helper: string;
  to?: { path: "/connections/$id/blocked-confirmed"; params: { id: string } };
  onClick?: () => void;
}) {
  const inner = (
    <div className="flex items-start gap-3 rounded-[14px] bg-paper p-4 shadow-elev-1 transition-colors hover:bg-lavender-50">
      <div className="min-w-0 flex-1">
        <p className="font-display text-[14.5px] font-medium text-ink">{label}</p>
        <p className="mt-0.5 font-body text-[12px] text-slate">{helper}</p>
      </div>
    </div>
  );

  if (to) {
    return (
      <li>
        <Link to={to.path} params={to.params} className="block">
          {inner}
        </Link>
      </li>
    );
  }
  return (
    <li>
      <button type="button" onClick={onClick} className="block w-full text-left">
        {inner}
      </button>
    </li>
  );
}
