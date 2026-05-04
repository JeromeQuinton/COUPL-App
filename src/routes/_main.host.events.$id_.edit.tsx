import { useState } from "react";
import { createFileRoute, Link, useParams, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { ScreenHeader } from "@/components/shell/ScreenHeader";

/**
 * /host/events/$id/edit — edit an existing hosted event.
 *
 * Phase 1 visual + local state. Phase 4 wires `events` table + Stripe
 * Connect refunds for cancellation. Cancel-event is destructive and
 * confirms via inline two-step.
 */
export const Route = createFileRoute("/_main/host/events/$id_/edit")({
  head: () => ({
    meta: [{ title: "Edit room — COUPL Host" }],
  }),
  component: EditEvent,
});

type EventDraft = {
  title: string;
  date: string;
  time: string;
  description: string;
  capacity: number;
};

const SAMPLE: Record<string, EventDraft> = {
  "tea-honesty": {
    title: "Tea & Honesty",
    date: "2026-10-30",
    time: "19:00",
    description:
      "An hour of slow conversation on what we hide and why. Six people, one room, no advice.",
    capacity: 12,
  },
};

function EditEvent() {
  const { id } = useParams({ from: "/_main/host/events/$id_/edit" });
  const navigate = useNavigate();
  const initial = SAMPLE[id] ?? {
    title: "Untitled room",
    date: "2026-11-01",
    time: "19:00",
    description: "",
    capacity: 12,
  };

  const [draft, setDraft] = useState<EventDraft>(initial);
  const [saved, setSaved] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const dirty =
    draft.title !== initial.title ||
    draft.date !== initial.date ||
    draft.time !== initial.time ||
    draft.description !== initial.description ||
    draft.capacity !== initial.capacity;

  const onSave = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1800);
  };

  const onCancelEvent = () => {
    setConfirmCancel(false);
    setCancelled(true);
  };

  if (cancelled) {
    return (
      <EventsBackdrop>
        <StatusBar
          leading={
            <Link
              to="/host"
              aria-label="Back to host dashboard"
              className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
            >
              <ChevronLeft size={18} />
            </Link>
          }
        />
        <div className="mx-auto flex w-full max-w-[480px] flex-col px-5 pt-10">
          <ScreenHeader
            eyebrow="Room cancelled"
            title={`${draft.title} won't run.`}
          />
          <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
            Attendees have been notified. Refunds are queued and will appear in
            their accounts within five working days.
          </p>
          <Link
            to="/host"
            className="mt-7 inline-flex w-fit items-center justify-center rounded-full bg-plum-500 px-5 py-2.5 font-body text-[14px] font-medium text-paper"
          >
            Back to your rooms
          </Link>
        </div>
      </EventsBackdrop>
    );
  }

  return (
    <EventsBackdrop>
      <StatusBar
        leading={
          <Link
            to="/host"
            aria-label="Back to host dashboard"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />
      <header className="px-5 pt-2 pb-4">
        <ScreenHeader
          eyebrow={`Editing · ${initial.title}`}
          title="Edit your room."
        />
        <p className="mt-2 font-body text-[12.5px] text-stone">
          Changes save when you tap Save. Cancelling the room refunds attendees.
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
        className="px-5 flex flex-col gap-4 pb-8"
      >
        <Field label="Title">
          <input
            type="text"
            value={draft.title}
            onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            className="w-full rounded-[12px] border border-line bg-paper px-3.5 py-2.5 font-body text-[14.5px] text-ink focus:border-plum-500 focus:outline-none"
          />
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Date">
            <input
              type="date"
              value={draft.date}
              onChange={(e) => setDraft({ ...draft, date: e.target.value })}
              className="w-full rounded-[12px] border border-line bg-paper px-3.5 py-2.5 font-body text-[14.5px] text-ink focus:border-plum-500 focus:outline-none"
            />
          </Field>
          <Field label="Time">
            <input
              type="time"
              value={draft.time}
              onChange={(e) => setDraft({ ...draft, time: e.target.value })}
              className="w-full rounded-[12px] border border-line bg-paper px-3.5 py-2.5 font-body text-[14.5px] text-ink focus:border-plum-500 focus:outline-none"
            />
          </Field>
        </div>
        <Field label="Description">
          <textarea
            rows={5}
            value={draft.description}
            onChange={(e) =>
              setDraft({ ...draft, description: e.target.value })
            }
            className="w-full resize-none rounded-[12px] border border-line bg-paper px-3.5 py-2.5 font-body text-[14px] leading-relaxed text-ink focus:border-plum-500 focus:outline-none"
          />
        </Field>
        <Field label={`Capacity · ${draft.capacity}`}>
          <input
            type="range"
            min={2}
            max={40}
            value={draft.capacity}
            onChange={(e) =>
              setDraft({ ...draft, capacity: Number(e.target.value) })
            }
            className="w-full accent-plum-500"
          />
        </Field>

        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate({ to: "/host" })}
            className="flex-1 rounded-full border border-plum-300 bg-paper px-4 py-2.5 font-body text-[13.5px] font-medium text-plum-700 hover:bg-lavender-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!dirty}
            className="flex-[1.4] rounded-full bg-plum-500 px-4 py-2.5 font-display text-[14px] font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700 disabled:bg-plum-300"
          >
            Save changes
          </button>
        </div>
        {saved && (
          <p className="text-center font-body text-[12px] text-success">
            Saved.
          </p>
        )}
      </form>

      <section className="border-t border-line px-5 pt-5 pb-12">
        <p className="text-label-mono text-stone">Destructive</p>
        <h2 className="mt-2 font-display text-[16px] font-semibold text-ink">
          Cancel this room
        </h2>
        <p className="mt-2 font-body text-[12.5px] leading-relaxed text-slate">
          Cancelling notifies every attendee and queues full refunds. This
          can't be undone.
        </p>
        {!confirmCancel ? (
          <button
            type="button"
            onClick={() => setConfirmCancel(true)}
            className="mt-3 rounded-full border border-line bg-paper px-4 py-2 font-body text-[13px] font-medium text-ink hover:bg-cloud"
          >
            Cancel this room
          </button>
        ) : (
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setConfirmCancel(false)}
              className="flex-1 rounded-full border border-plum-300 bg-paper px-4 py-2 font-body text-[13px] font-medium text-plum-700"
            >
              Keep the room
            </button>
            <button
              type="button"
              onClick={onCancelEvent}
              className="flex-1 rounded-full bg-ink px-4 py-2 font-body text-[13px] font-medium text-paper"
            >
              Confirm cancel
            </button>
          </div>
        )}
      </section>
    </EventsBackdrop>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-label-mono">{label}</span>
      {children}
    </label>
  );
}
