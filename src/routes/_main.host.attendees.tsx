import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Check, ChevronRight, X } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /host/attendees — attendee management with depth.
 *
 * Stream 13-3 additions: filter pills (paid / refunded / pending),
 * bulk message bar, expandable single-attendee detail panel with
 * remove + refund actions. Phase 1 visual + local state.
 */
export const Route = createFileRoute("/_main/host/attendees")({
  head: () => ({
    meta: [{ title: "Attendees — COUPL Host" }],
  }),
  component: HostAttendees,
});

type AttendeeStatus = "paid" | "pending" | "refunded";

type Attendee = {
  id: string;
  initial: string;
  name: string;
  note: string;
  status: AttendeeStatus;
  first: boolean;
  signedUpAt: string;
  paidAt?: string;
  amount?: number;
};

const ATTENDEES: Attendee[] = [
  {
    id: "maya",
    initial: "M",
    name: "Maya R.",
    note: "Verified · referred by Polaris",
    status: "paid",
    first: true,
    signedUpAt: "Wed 22 Oct, 21:14",
    paidAt: "Wed 22 Oct, 21:15",
    amount: 18,
  },
  {
    id: "sam",
    initial: "S",
    name: "Sam P.",
    note: "Verified · 3rd workshop",
    status: "paid",
    first: false,
    signedUpAt: "Sun 26 Oct, 08:02",
    paidAt: "Sun 26 Oct, 08:03",
    amount: 18,
  },
  {
    id: "iris",
    initial: "I",
    name: "Iris B.",
    note: "Pending verification",
    status: "pending",
    first: false,
    signedUpAt: "Mon 27 Oct, 18:50",
  },
  {
    id: "theo",
    initial: "T",
    name: "Theo M.",
    note: "Verified · first time",
    status: "paid",
    first: true,
    signedUpAt: "Tue 28 Oct, 12:11",
    paidAt: "Tue 28 Oct, 12:12",
    amount: 18,
  },
  {
    id: "ana",
    initial: "A",
    name: "Ana D.",
    note: "Refunded · couldn't make it",
    status: "refunded",
    first: false,
    signedUpAt: "Sun 19 Oct, 17:32",
    paidAt: "Sun 19 Oct, 17:33",
    amount: 18,
  },
];

type Filter = "all" | AttendeeStatus;

function HostAttendees() {
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [composeOpen, setComposeOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [sentTo, setSentTo] = useState<number | null>(null);
  const [list, setList] = useState<Attendee[]>(ATTENDEES);

  const filtered = useMemo(
    () => (filter === "all" ? list : list.filter((a) => a.status === filter)),
    [filter, list],
  );

  const counts = useMemo(
    () => ({
      all: list.length,
      paid: list.filter((a) => a.status === "paid").length,
      pending: list.filter((a) => a.status === "pending").length,
      refunded: list.filter((a) => a.status === "refunded").length,
    }),
    [list],
  );

  const onSendBulk = () => {
    if (!message.trim()) return;
    setSentTo(filtered.length);
    setMessage("");
    setComposeOpen(false);
    window.setTimeout(() => setSentTo(null), 2000);
  };

  const onRefund = (id: string) =>
    setList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: "refunded" } : a)),
    );

  const onRemove = (id: string) =>
    setList((prev) => prev.filter((a) => a.id !== id));

  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link
            to="/host"
            aria-label="Back"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-4">
        <p className="text-label-mono">Tea & Honesty · Thu 30 Oct</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Your room.
        </h1>
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          Hosts curate chemistry through composition.
        </p>
      </header>

      {/* Filter pills */}
      <div className="px-5">
        <div className="flex flex-wrap gap-2">
          <FilterPill
            active={filter === "all"}
            onClick={() => setFilter("all")}
            label={`All · ${counts.all}`}
          />
          <FilterPill
            active={filter === "paid"}
            onClick={() => setFilter("paid")}
            label={`Paid · ${counts.paid}`}
          />
          <FilterPill
            active={filter === "pending"}
            onClick={() => setFilter("pending")}
            label={`Pending · ${counts.pending}`}
          />
          <FilterPill
            active={filter === "refunded"}
            onClick={() => setFilter("refunded")}
            label={`Refunded · ${counts.refunded}`}
          />
        </div>
        <button
          type="button"
          onClick={() => setComposeOpen((v) => !v)}
          className="mt-3 w-full rounded-full border border-plum-300 bg-paper px-4 py-2 font-body text-[13px] font-medium text-plum-700 hover:bg-lavender-50"
        >
          {composeOpen ? "Close composer" : "Message attendees"}
        </button>
        {composeOpen && (
          <div className="mt-2 rounded-[14px] border border-plum-300/50 bg-paper p-3">
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Write a short message to ${filtered.length} ${
                filtered.length === 1 ? "attendee" : "attendees"
              }.`}
              className="w-full resize-none rounded-[10px] border border-line bg-paper px-3 py-2 font-body text-[13.5px] text-ink focus:border-plum-500 focus:outline-none"
            />
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="font-body text-[11.5px] text-stone">
                Sends as a thread message + email.
              </p>
              <button
                type="button"
                onClick={onSendBulk}
                disabled={!message.trim() || filtered.length === 0}
                className="rounded-full bg-plum-500 px-4 py-1.5 font-body text-[13px] font-medium text-paper disabled:bg-plum-300"
              >
                Send to {filtered.length}
              </button>
            </div>
          </div>
        )}
        {sentTo !== null && (
          <p className="mt-2 text-center font-body text-[12px] text-success">
            Sent to {sentTo} {sentTo === 1 ? "attendee" : "attendees"}.
          </p>
        )}
      </div>

      <ul className="px-5 pt-4 flex flex-col gap-2.5">
        {filtered.map((a) => {
          const open = openId === a.id;
          return (
            <li
              key={a.id}
              className="rounded-[14px] bg-paper shadow-elev-1"
            >
              <button
                type="button"
                onClick={() => setOpenId(open ? null : a.id)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 place-items-center rounded-full bg-lavender-100 font-display text-[16px] font-semibold text-plum-700"
                  >
                    {a.initial}
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-display text-[15px] text-ink">
                        {a.name}
                      </p>
                      {a.status === "paid" && (
                        <Check
                          size={14}
                          style={{ color: "var(--success)" }}
                          aria-label="Paid"
                        />
                      )}
                    </div>
                    <p className="font-body text-[11.5px] text-stone">
                      {a.note}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusLabel status={a.status} />
                  <ChevronRight
                    size={16}
                    className={`text-stone transition-transform ${
                      open ? "rotate-90" : ""
                    }`}
                  />
                </div>
              </button>
              {open && (
                <div className="border-t border-line px-4 py-3">
                  <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-1.5 font-body text-[12.5px]">
                    <dt className="text-slate">Signed up</dt>
                    <dd className="text-ink">{a.signedUpAt}</dd>
                    {a.paidAt && (
                      <>
                        <dt className="text-slate">Paid</dt>
                        <dd className="text-ink">
                          {a.paidAt}
                          {a.amount ? ` · £${a.amount}` : ""}
                        </dd>
                      </>
                    )}
                    <dt className="text-slate">Status</dt>
                    <dd className="text-ink capitalize">{a.status}</dd>
                  </dl>
                  <div className="mt-3 flex items-center gap-2">
                    {a.status === "paid" && (
                      <button
                        type="button"
                        onClick={() => onRefund(a.id)}
                        className="flex-1 rounded-full border border-plum-300 bg-paper px-3 py-1.5 font-body text-[12.5px] font-medium text-plum-700 hover:bg-lavender-50"
                      >
                        Refund
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onRemove(a.id)}
                      className="flex-1 rounded-full border border-line bg-paper px-3 py-1.5 font-body text-[12.5px] font-medium text-ink hover:bg-cloud"
                    >
                      Remove from room
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
        {filtered.length === 0 && (
          <li className="rounded-[14px] border border-dashed border-line bg-paper/50 px-4 py-8 text-center">
            <p className="font-body text-[13px] text-slate">
              No attendees in this group yet.
            </p>
          </li>
        )}
      </ul>

      <p className="px-5 pt-5 pb-12 text-center font-body text-[12.5px] italic text-stone">
        {counts.paid} paid · {counts.pending} pending · {counts.refunded} refunded
      </p>
    </EventsBackdrop>
  );
}

function FilterPill({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? "rounded-full bg-plum-500 px-3 py-1 text-label-mono text-paper"
          : "rounded-full border border-line bg-paper px-3 py-1 text-label-mono text-slate"
      }
    >
      {label}
    </button>
  );
}

function StatusLabel({ status }: { status: AttendeeStatus }) {
  const map: Record<AttendeeStatus, { label: string; color: string }> = {
    paid: { label: "Paid", color: "text-success" },
    pending: { label: "Held", color: "text-caution" },
    refunded: { label: "Refunded", color: "text-slate" },
  };
  const m = map[status];
  return <span className={`text-label-mono ${m.color}`}>{m.label}</span>;
}
