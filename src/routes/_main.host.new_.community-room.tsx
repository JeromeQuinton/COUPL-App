import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { EventsBackdrop } from "@/components/events/EventsBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /host/new/community-room — community room creation.
 *
 * Lighter than workshop creation: name, description, schedule, capacity,
 * joining policy. A community room is for repeated meeting, not a
 * single workshop.
 */
export const Route = createFileRoute("/_main/host/new_/community-room")({
  head: () => ({
    meta: [{ title: "New community room — COUPL Host" }],
  }),
  component: NewCommunityRoom,
});

type Schedule = "one-off" | "weekly";
type Policy = "open" | "invite";

function NewCommunityRoom() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [schedule, setSchedule] = useState<Schedule>("weekly");
  const [capacity, setCapacity] = useState(12);
  const [policy, setPolicy] = useState<Policy>("open");
  const [created, setCreated] = useState(false);

  const canSubmit = name.trim().length > 2 && description.trim().length > 8;

  if (created) {
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
          <p className="text-label-mono">Room created</p>
          <h1 className="mt-3 font-display text-[26px] leading-tight text-ink">
            {name} is live.
          </h1>
          <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
            Your room is open to the people you've chosen. You'll see signups
            in your host dashboard.
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
            to="/host/new"
            aria-label="Back to room types"
            className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5"
          >
            <ChevronLeft size={18} />
          </Link>
        }
      />
      <header className="px-5 pt-2 pb-4">
        <p className="text-label-mono">Hosting · community</p>
        <h1 className="mt-2 font-display text-[26px] leading-tight text-ink">
          A community room.
        </h1>
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          For people who want to keep meeting, not just attend once. Smaller,
          slower, and yours.
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (canSubmit) setCreated(true);
        }}
        className="px-5 flex flex-col gap-4 pb-12"
      >
        <Field label="Room name">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Slow Coffee, Sundays"
            className="w-full rounded-[12px] border border-line bg-paper px-3.5 py-2.5 font-body text-[14.5px] text-ink focus:border-plum-500 focus:outline-none"
          />
        </Field>
        <Field label="Description">
          <textarea
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What this room is, what it's not, who it's for."
            className="w-full resize-none rounded-[12px] border border-line bg-paper px-3.5 py-2.5 font-body text-[14px] leading-relaxed text-ink focus:border-plum-500 focus:outline-none"
          />
        </Field>

        <Field label="Schedule">
          <div className="flex gap-2">
            <Pill
              active={schedule === "one-off"}
              onClick={() => setSchedule("one-off")}
              label="One-off"
            />
            <Pill
              active={schedule === "weekly"}
              onClick={() => setSchedule("weekly")}
              label="Weekly"
            />
          </div>
        </Field>

        <Field label={`Capacity · ${capacity}`}>
          <input
            type="range"
            min={3}
            max={30}
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
            className="w-full accent-plum-500"
          />
        </Field>

        <Field label="Joining policy">
          <div className="flex gap-2">
            <Pill
              active={policy === "open"}
              onClick={() => setPolicy("open")}
              label="Open"
            />
            <Pill
              active={policy === "invite"}
              onClick={() => setPolicy("invite")}
              label="Invite-only"
            />
          </div>
          <p className="mt-1.5 font-body text-[12px] text-stone">
            {policy === "open"
              ? "Anyone on COUPL can request to join. You approve each request."
              : "Only people you invite can join. No public listing."}
          </p>
        </Field>

        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate({ to: "/host/new" })}
            className="flex-1 rounded-full border border-plum-300 bg-paper px-4 py-2.5 font-body text-[13.5px] font-medium text-plum-700 hover:bg-lavender-50"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!canSubmit}
            className="flex-[1.4] rounded-full bg-plum-500 px-4 py-2.5 font-display text-[14px] font-medium text-paper shadow-elev-1 transition-colors hover:bg-plum-700 disabled:bg-plum-300"
          >
            Create room
          </button>
        </div>
      </form>
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

function Pill({
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
          ? "rounded-full border border-plum-500 bg-plum-500 px-3.5 py-1.5 font-body text-[13px] font-medium text-paper"
          : "rounded-full border border-plum-300 bg-paper px-3.5 py-1.5 font-body text-[13px] font-medium text-plum-700"
      }
    >
      {label}
    </button>
  );
}
