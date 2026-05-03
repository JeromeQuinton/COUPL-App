import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, MapPin } from "lucide-react";
import { getConnection } from "@/data/connections_sample";
import { listContacts, type TrustedContact } from "@/lib/trusted-contacts";

export const Route = createFileRoute("/_main/connections/$id_/safety-share")({
  head: () => ({ meta: [{ title: "Safety share — COUPL" }] }),
  component: SafetyShareScreen,
});

const SHARE_DURATION_MIN = 240; // 4 hours

function SafetyShareScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/safety-share" });
  const navigate = useNavigate();
  const c = getConnection(id);
  const name = c?.name ?? "your date";

  const [contacts, setContacts] = useState<TrustedContact[]>([]);
  const [endsAt] = useState<number>(() => Date.now() + SHARE_DURATION_MIN * 60_000);
  const [now, setNow] = useState<number>(() => Date.now());
  const [stopConfirm, setStopConfirm] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    setContacts(listContacts());
  }, []);

  useEffect(() => {
    if (stopped) return;
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, [stopped]);

  const remaining = useMemo(() => {
    const ms = Math.max(0, endsAt - now);
    const totalMin = Math.floor(ms / 60_000);
    const h = Math.floor(totalMin / 60);
    const m = totalMin % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  }, [now, endsAt]);

  if (stopped) {
    return (
      <div className="relative px-5 pb-16 pt-6">
        <header className="flex items-center gap-3">
          <Link
            to="/connections/$id/date-plan"
            params={{ id }}
            aria-label="Back"
            className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <p className="text-label-mono">Safety share</p>
        </header>

        <div className="mt-12 text-center">
          <p className="text-label-mono text-stone">Sharing ended</p>
          <h1 className="mt-3 font-display text-[26px] italic leading-tight text-ink">
            Hope it went well.
          </h1>
          <Link
            to="/connections/$id/reflection"
            params={{ id }}
            className="mt-8 inline-flex rounded-full bg-plum-700 px-5 py-3 font-display text-[14.5px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Reflect on this date
          </Link>
        </div>
      </div>
    );
  }

  const noContacts = contacts.length === 0;

  return (
    <div className="relative px-5 pb-16 pt-6">
      <header className="flex items-center gap-3">
        <Link
          to="/connections/$id/date-plan"
          params={{ id }}
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="text-label-mono">Safety share</p>
      </header>

      <h1 className="mt-3 font-display text-[24px] font-semibold leading-tight text-ink">
        Safety share active
      </h1>
      <p className="mt-1 font-body text-[13px] text-slate">On your date with {name}</p>

      {noContacts ? (
        <section className="mt-8 rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="font-display text-[15px] text-ink">
            No trusted contacts yet.
          </p>
          <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
            Add a trusted contact first. They'll get a single ping when you start a safety share.
          </p>
          <Link
            to="/profile/safety/trusted-contact"
            className="mt-4 inline-flex rounded-full bg-plum-700 px-4 py-2 font-display text-[13.5px] font-medium text-paper hover:opacity-90"
          >
            Add a trusted contact
          </Link>
        </section>
      ) : (
        <>
          <section className="mt-6 rounded-[18px] bg-paper p-4 shadow-elev-1">
            <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
              Sharing with
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {contacts.map((c) => (
                <li key={c.id} className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-100 font-display text-[14px] font-semibold text-plum-700"
                  >
                    {c.name.slice(0, 1).toUpperCase()}
                  </span>
                  <p className="font-display text-[14px] text-ink">{c.name}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-3 rounded-[18px] bg-paper p-4 shadow-elev-1">
            <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
              What they can see
            </p>
            <ul className="mt-3 flex flex-col gap-2 font-body text-[13px] text-ink">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-plum-700" />
                Live location
              </li>
              <li className="ml-5">The meeting place</li>
              <li className="ml-5">Expected end time</li>
              <li className="ml-5">Who you're with (first name only)</li>
            </ul>
            <p className="mt-3 font-body text-[11.5px] italic text-stone">
              We never share your live location publicly. They see it. Nobody else.
            </p>
          </section>

          <section className="mt-3 rounded-[18px] border border-plum-300/50 bg-paper p-5 text-center shadow-elev-1">
            <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
              Auto-stops in
            </p>
            <p className="mt-2 font-display text-[40px] tabular-nums text-ink">
              {remaining}
            </p>
            <p className="mt-1 font-body text-[11.5px] text-stone">
              We end the share automatically. You can extend before it expires.
            </p>
          </section>

          <div className="mt-6 flex flex-col gap-2">
            <button
              type="button"
              className="rounded-full border border-line bg-paper px-5 py-3 font-display text-[14px] text-slate hover:bg-lavender-50"
            >
              Extend by 1 hour
            </button>
            {stopConfirm ? (
              <div className="rounded-[14px] bg-paper p-4 shadow-elev-1">
                <p className="font-body text-[13px] text-ink">Stop sharing now?</p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStopConfirm(false)}
                    className="flex-1 rounded-full border border-line bg-paper px-4 py-2 font-body text-[13px] text-slate hover:bg-lavender-50"
                  >
                    Keep sharing
                  </button>
                  <button
                    type="button"
                    onClick={() => setStopped(true)}
                    className="flex-1 rounded-full bg-plum-700 px-4 py-2 font-display text-[13px] font-medium text-paper hover:opacity-90"
                  >
                    Stop sharing
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setStopConfirm(true)}
                className="rounded-full bg-plum-700 px-5 py-3 font-display text-[14.5px] font-medium text-paper shadow-elev-1 hover:opacity-90"
              >
                Stop sharing
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
