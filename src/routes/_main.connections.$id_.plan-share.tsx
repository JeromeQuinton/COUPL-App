import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronLeft, Check, Copy, Link as LinkIcon, MessageCircle, Phone } from "lucide-react";

export const Route = createFileRoute("/_main/connections/$id_/plan-share")({
  head: () => ({ meta: [{ title: "Share plan — COUPL" }] }),
  component: PlanShareScreen,
});

function PlanShareScreen() {
  const { id_ } = useParams({ from: "/_main/connections/$id_/plan-share" });
  const [copied, setCopied] = useState(false);

  const planLink = `https://coupl.app/p/${id_}/plan`;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(planLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard may be unavailable
    }
  };

  return (
    <div className="relative min-h-[100dvh] bg-paper">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-plum-300/15 bg-paper/85 px-4 py-3 backdrop-blur-md">
        <Link
          to="/connections/$id/date-plan"
          params={{ id: id_ }}
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="font-display text-[15px] font-semibold text-ink">Share plan</p>
      </header>

      <div className="px-5 pt-5 pb-12">
        <p className="text-label-mono">Plan · share</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          Send this plan.
        </h1>

        <article className="mt-6 rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="text-label-mono">Plan</p>
          <p className="mt-2 font-display text-[16px] text-ink">
            Coffee at Lantern Hill
          </p>
          <p className="mt-1 font-body text-[13px] text-stone">
            Thursday 18:30 · 56 Main Road, London
          </p>
          <p className="mt-2 font-body text-[12.5px] italic text-stone">
            Casual — bring a book if you like.
          </p>
        </article>

        <section className="mt-7">
          <p className="text-label-mono">Send via</p>
          <ul className="mt-3 grid grid-cols-3 gap-2.5">
            <li>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(planLink)}`}
                target="_blank"
                rel="noreferrer"
                className="flex w-full flex-col items-start gap-2 rounded-[14px] border border-line bg-paper px-3 py-3.5 text-left hover:bg-lavender-50"
              >
                <MessageCircle size={18} strokeWidth={1.75} className="text-plum-500" />
                <span className="font-display text-[13.5px] font-medium text-ink">WhatsApp</span>
              </a>
            </li>
            <li>
              <a
                href={`sms:?body=${encodeURIComponent(planLink)}`}
                className="flex w-full flex-col items-start gap-2 rounded-[14px] border border-line bg-paper px-3 py-3.5 text-left hover:bg-lavender-50"
              >
                <Phone size={18} strokeWidth={1.75} className="text-plum-500" />
                <span className="font-display text-[13.5px] font-medium text-ink">Messages</span>
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={onCopy}
                className="flex w-full flex-col items-start gap-2 rounded-[14px] border border-line bg-paper px-3 py-3.5 text-left hover:bg-lavender-50"
              >
                {copied ? (
                  <Check size={18} strokeWidth={2} className="text-plum-700" />
                ) : (
                  <LinkIcon size={18} strokeWidth={1.75} className="text-plum-500" />
                )}
                <span className="font-display text-[13.5px] font-medium text-ink">
                  {copied ? "Copied" : "Copy link"}
                </span>
              </button>
            </li>
          </ul>
        </section>

        <p className="mt-7 text-center font-body text-[12.5px] italic text-stone">
          We send a public read-only link. The other person doesn't get notified.
        </p>
      </div>
    </div>
  );
}
