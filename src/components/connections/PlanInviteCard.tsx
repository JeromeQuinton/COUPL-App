import { Link } from "@tanstack/react-router";
import { Calendar, MapPin } from "lucide-react";

type PlanInvite = {
  id: string;
  from: "them" | "me";
  when: string;
  where: string;
  notes?: string;
  status: "proposed" | "accepted" | "declined" | "countered";
};

type Props = {
  invite: PlanInvite;
  connectionId: string;
  viewerIsRecipient: boolean;
  onAccept?: () => void;
  onDecline?: () => void;
};

const STATUS_LABEL: Record<PlanInvite["status"], string> = {
  proposed: "Plan proposed",
  accepted: "Plan accepted",
  declined: "Plan declined",
  countered: "Counter-proposed",
};

export function PlanInviteCard({
  invite,
  connectionId,
  viewerIsRecipient,
  onAccept,
  onDecline,
}: Props) {
  return (
    <article
      className="rounded-[18px] bg-paper p-4 shadow-elev-1"
      style={{
        borderColor: "color-mix(in oklab, var(--blush) 60%, var(--paper))",
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      <p className="text-label-mono text-plum-700">{STATUS_LABEL[invite.status].toUpperCase()}</p>
      <p className="mt-2 font-display text-[18px] italic leading-snug text-ink">
        {invite.when}
      </p>
      <p className="mt-1 flex items-center gap-1.5 font-body text-[13px] text-slate">
        <MapPin size={13} className="text-plum-500" aria-hidden />
        {invite.where}
      </p>
      {invite.notes && (
        <p className="mt-3 font-display text-[13.5px] italic text-stone">
          "{invite.notes}"
        </p>
      )}

      {invite.status === "proposed" && viewerIsRecipient && (
        <div className="mt-4 space-y-2">
          <button
            type="button"
            onClick={onAccept}
            className="w-full rounded-full bg-plum-700 px-4 py-2.5 font-display text-[14px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Accept
          </button>
          <Link
            to="/connections/$id/counter-plan"
            params={{ id: connectionId }}
            search={{ inviteId: invite.id }}
            className="block w-full rounded-full border border-line bg-paper px-4 py-2.5 text-center font-display text-[13.5px] text-ink hover:bg-lavender-50"
          >
            Counter-propose
          </Link>
          <button
            type="button"
            onClick={onDecline}
            className="w-full rounded-full px-4 py-2 text-center font-body text-[12.5px] text-slate hover:text-plum-500"
          >
            Decline
          </button>
        </div>
      )}

      {invite.status === "proposed" && !viewerIsRecipient && (
        <p className="mt-4 font-body text-[12.5px] italic text-stone">
          Waiting on a reply.
        </p>
      )}

      {invite.status === "accepted" && (
        <Link
          to="/connections/$id/date-plan"
          params={{ id: connectionId }}
          className="mt-3 inline-flex items-center gap-1 text-label-mono text-plum-500 hover:text-plum-700"
        >
          <Calendar size={12} />
          View plan →
        </Link>
      )}

      {invite.status === "declined" && (
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          They said no — that's fine, you can suggest something else.
        </p>
      )}

      {invite.status === "countered" && (
        <p className="mt-3 font-body text-[12.5px] italic text-stone">
          They suggested a different time.
        </p>
      )}
    </article>
  );
}
