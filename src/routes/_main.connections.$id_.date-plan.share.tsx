import { useState } from "react";
import { createFileRoute, Link, useNavigate, useParams } from "@tanstack/react-router";
import { ChevronLeft, MessageSquare, Calendar, Link as LinkIcon } from "lucide-react";
import { PageBackdrop } from "@/components/connections/PageBackdrop";
import { PolarisHeader } from "@/components/shell/PolarisHeader";
import { getConnection } from "@/data/connections_sample";

export const Route = createFileRoute("/_main/connections/$id_/date-plan/share")({
  head: () => ({ meta: [{ title: "Share the plan — COUPL" }] }),
  component: SharePlanScreen,
});

function SharePlanScreen() {
  const { id } = useParams({ from: "/_main/connections/$id_/date-plan/share" });
  const navigate = useNavigate();
  const c = getConnection(id);
  const otherName = c?.name ?? "them";
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(`https://coupl.app/plan/${id}`);
      setCopied(true);
    } catch {
      setCopied(true);
    }
  };

  return (
    <PageBackdrop>
      <div
        className="mx-auto flex w-full max-w-[480px] flex-col px-6"
        style={{
          minHeight: "100dvh",
          paddingTop: "calc(env(safe-area-inset-top) + 0.75rem)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 2rem)",
        }}
      >
        <header className="flex items-center py-2">
          <Link
            to="/connections/$id/date-plan"
            params={{ id }}
            aria-label="Back"
            className="-ml-1 inline-flex h-8 w-8 items-center justify-center rounded-full text-plum-700 hover:bg-lavender-50"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </header>

        <div className="mt-4">
          <PolarisHeader
            eyebrow="Plan · share"
            title="Share the plan."
            eyebrowTone="plum-700"
          />
        </div>

        <ul className="mt-7 space-y-2">
          <li>
            <Link
              to="/connections/$id"
              params={{ id }}
              className="flex w-full items-center gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1 hover:bg-lavender-50"
            >
              <MessageSquare className="h-5 w-5 shrink-0 text-plum-700" aria-hidden />
              <span className="font-body text-[14.5px] text-ink">
                Send to {otherName} via chat
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/connections/$id/add-to-calendar"
              params={{ id }}
              className="flex w-full items-center gap-3 rounded-[14px] bg-paper px-4 py-3.5 shadow-elev-1 hover:bg-lavender-50"
            >
              <Calendar className="h-5 w-5 shrink-0 text-plum-700" aria-hidden />
              <span className="font-body text-[14.5px] text-ink">
                Add to your calendar
              </span>
            </Link>
          </li>
          <li>
            <button
              type="button"
              onClick={onCopy}
              className="flex w-full items-center gap-3 rounded-[14px] bg-paper px-4 py-3.5 text-left shadow-elev-1 hover:bg-lavender-50"
            >
              <LinkIcon className="h-5 w-5 shrink-0 text-plum-700" aria-hidden />
              <span className="font-body text-[14.5px] text-ink">
                {copied ? "Link copied" : "Copy link"}
              </span>
            </button>
          </li>
        </ul>

        <p className="mt-5 font-body text-[12.5px] italic leading-relaxed text-stone">
          Sharing in chat lets them see venue, time, and your safety contact
          (if set).
        </p>

        <div className="mt-auto pt-10">
          <button
            type="button"
            onClick={() =>
              navigate({
                to: "/connections/$id/date-plan",
                params: { id },
              })
            }
            className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Done
          </button>
        </div>
      </div>
    </PageBackdrop>
  );
}
