import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { YouBackdrop } from "@/components/you/YouBackdrop";
import { StatusBar } from "@/components/events/StatusBar";
import { EvidenceUpload } from "@/components/safety/EvidenceUpload";

export const Route = createFileRoute("/_main/profile/safety/report/submit")({
  head: () => ({ meta: [{ title: "Submit a report — COUPL" }] }),
  component: ReportSubmitScreen,
});

const CATEGORIES = [
  { id: "harassment", label: "Harassment" },
  { id: "spam", label: "Spam" },
  { id: "impersonation", label: "Impersonation" },
  { id: "unsafe", label: "Unsafe behaviour" },
  { id: "other", label: "Something else" },
];

function ReportSubmitScreen() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [evidence, setEvidence] = useState<{ id: string; preview: string }[]>([]);
  const [anonymous, setAnonymous] = useState(false);

  const canSubmit = !!category && description.trim().length >= 20;

  const submit = () => {
    if (!canSubmit) return;
    console.log("[stub report]", { category, description, evidenceCount: evidence.length, anonymous });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <YouBackdrop tone="serious">
        <StatusBar
          leading={
            <Link to="/profile/safety" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
              <ChevronLeft size={18} />
            </Link>
          }
        />
        <main className="px-5 py-12 text-center max-w-md mx-auto">
          <p className="text-label-mono">Received</p>
          <h1 className="mt-3 font-display text-[26px] leading-tight text-ink">
            Report received.
          </h1>
          <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
            We assess every report — usually within 48 hours. You'll see updates in your reports.
          </p>
          <div className="mt-8 space-y-3">
            <Link
              to="/profile/safety/reports"
              className="block w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
            >
              View my reports
            </Link>
            <Link
              to="/profile/safety"
              className="block w-full rounded-full px-5 py-3 text-center font-body text-[13.5px] text-slate hover:text-plum-500"
            >
              Back to safety hub
            </Link>
          </div>
        </main>
      </YouBackdrop>
    );
  }

  return (
    <YouBackdrop tone="serious">
      <StatusBar
        leading={
          <Link to="/profile/safety/report" aria-label="Back" className="ml-1 inline-flex h-7 w-7 items-center justify-center rounded-full text-ink/70 hover:bg-ink/5">
            <ChevronLeft size={18} />
          </Link>
        }
      />

      <header className="px-5 pt-2 pb-5">
        <p className="text-label-mono">Report</p>
        <h1 className="mt-2 font-display text-[28px] leading-tight text-ink">
          What happened?
        </h1>
        <p className="mt-3 font-body text-[14px] leading-relaxed text-slate">
          We assess every report. The more specific you can be, the more useful this becomes.
        </p>
      </header>

      <form className="px-5 pb-32 space-y-6" onSubmit={(e) => { e.preventDefault(); submit(); }}>
        <fieldset>
          <legend className="text-label-mono">Category</legend>
          <ul className="mt-3 space-y-2">
            {CATEGORIES.map((c) => {
              const active = category === c.id;
              return (
                <li key={c.id}>
                  <label className={`block cursor-pointer rounded-[14px] border px-4 py-3.5 transition-colors ${
                    active ? "border-plum-500 bg-lavender-100" : "border-line bg-paper hover:bg-lavender-50"
                  }`}>
                    <input
                      type="radio"
                      name="category"
                      value={c.id}
                      checked={active}
                      onChange={() => setCategory(c.id)}
                      className="sr-only"
                    />
                    <p className={`font-display text-[14.5px] ${active ? "text-plum-700 font-semibold" : "text-ink"}`}>
                      {c.label}
                    </p>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <div>
          <label className="text-label-mono" htmlFor="rep-desc">Describe what happened</label>
          <textarea
            id="rep-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            maxLength={1500}
            placeholder="Describe what you saw or experienced. Specific is helpful."
            className="mt-2 w-full resize-none rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[13.5px] text-ink placeholder:text-stone focus:border-plum-500 focus:outline-none"
          />
          <p className="mt-1 text-right text-label-mono text-stone">{description.length} / 1500</p>
        </div>

        <div>
          <p className="text-label-mono">Evidence (optional)</p>
          <p className="mt-1 mb-3 font-body text-[12.5px] text-slate">
            Screenshots help us assess context. We obscure sensitive details before review.
          </p>
          <EvidenceUpload value={evidence} onChange={setEvidence} />
        </div>

        <label className="flex items-start gap-3 rounded-[14px] border border-line bg-paper px-4 py-3.5">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            className="mt-1 h-4 w-4 accent-plum-500"
          />
          <div>
            <p className="font-display text-[14.5px] font-medium text-ink">Submit anonymously</p>
            <p className="mt-1 font-body text-[12.5px] text-slate">
              We won't share your name with the reported person. Either way, we never tell them who reported.
            </p>
          </div>
        </label>
      </form>

      <div className="sticky bottom-24 z-30 px-5 pb-6">
        <button
          type="button"
          onClick={submit}
          disabled={!canSubmit}
          className="w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit report
        </button>
      </div>
    </YouBackdrop>
  );
}
