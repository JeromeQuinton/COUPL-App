import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";

/**
 * /profile/help/contact — contact us.
 *
 * Closes the TODO on /profile/help. Two-field form (subject + message)
 * with topic dropdown. Phase 1 routes to local state; Phase 4 sends to
 * a real support inbox.
 *
 * Stream-19 SCREEN-12.
 */
export const Route = createFileRoute("/_main/profile/help/contact")({
  head: () => ({ meta: [{ title: "Contact us — COUPL" }] }),
  component: ContactScreen,
});

const TOPICS = [
  { value: "account", label: "Account" },
  { value: "safety", label: "Safety" },
  { value: "billing", label: "Billing" },
  { value: "other", label: "Something else" },
];

function ContactScreen() {
  const [topic, setTopic] = useState("account");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <YouBackdrop>
        <StatusBar />
        <div className="px-5 pt-12 text-center">
          <p className="text-label-mono">Sent</p>
          <h1 className="mt-3 font-display text-[26px] italic leading-tight text-ink">
            We've got it.
          </h1>
          <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
            We reply within two working days. Sometimes faster.
          </p>
          <Link
            to="/profile/help"
            className="mt-8 inline-flex rounded-full bg-plum-700 px-6 py-3 font-body text-[14px] font-medium text-paper hover:bg-plum-500"
          >
            Back to Help
          </Link>
        </div>
      </YouBackdrop>
    );
  }

  return (
    <YouBackdrop>
      <StatusBar
        leading={
          <Link to="/profile/help" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Help · contact</p>
        <h1 className="mt-2 font-display text-[28px] italic leading-tight text-ink">
          What needs a person?
        </h1>
        <p className="mt-3 font-body text-[13.5px] leading-relaxed text-slate">
          We read every message. The more specific you are, the better we can help.
        </p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="px-5 pb-12 space-y-4"
      >
        <label className="block">
          <span className="text-label-mono">Topic</span>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-2 w-full rounded-[12px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink"
          >
            {TOPICS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-label-mono">Subject</span>
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="A short line about the issue"
            className="mt-2 w-full rounded-[12px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder:text-stone"
          />
        </label>

        <label className="block">
          <span className="text-label-mono">Message</span>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            placeholder="What's happening, and what you've tried."
            className="mt-2 w-full rounded-[12px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder:text-stone"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:bg-plum-500"
        >
          Send
        </button>
      </form>
    </YouBackdrop>
  );
}
