import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_main/growth/weekly")({
  head: () => ({ meta: [{ title: "Weekly check-in — COUPL" }] }),
  component: WeeklyCheckIn,
});

type Body = "steady" | "warm" | "activated" | "depleted";
const BODY_OPTIONS: { id: Body; label: string }[] = [
  { id: "steady", label: "Steady" },
  { id: "warm", label: "Warm" },
  { id: "activated", label: "Activated" },
  { id: "depleted", label: "Depleted" },
];

function WeeklyCheckIn() {
  const navigate = useNavigate();
  const [shifted, setShifted] = useState("");
  const [body, setBody] = useState<Body | null>(null);
  const [notice, setNotice] = useState("");

  const onSave = () => {
    // Phase 1: in-memory only. Phase 4: write to weekly_checkins table.
    // Stash a quick local marker so the journal can pin it.
    if (typeof window !== "undefined") {
      try {
        const entry = {
          id: crypto.randomUUID(),
          when: new Date().toISOString(),
          shifted: shifted.trim(),
          body,
          notice: notice.trim(),
        };
        window.localStorage.setItem(
          "coupl.growth.weekly.lastEntry",
          JSON.stringify(entry),
        );
      } catch {
        /* noop */
      }
    }
    navigate({ to: "/growth/journal" });
  };

  return (
    <div className="relative px-5 pb-16 pt-6">
      <header className="flex items-center gap-3">
        <Link
          to="/growth"
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="text-label-mono">Weekly check-in</p>
      </header>

      <h1 className="mt-4 font-display text-[26px] leading-tight text-ink">
        Three quiet questions.
      </h1>
      <p className="mt-2 font-body text-[13px] text-slate">
        Two minutes. No grade.
      </p>

      <form
        className="mt-8 flex flex-col gap-7"
        onSubmit={(e) => {
          e.preventDefault();
          onSave();
        }}
      >
        <section>
          <h2 className="font-display text-[18px] italic leading-snug text-ink">
            What shifted this week?
          </h2>
          <textarea
            value={shifted}
            onChange={(e) => setShifted(e.target.value.slice(0, 500))}
            rows={4}
            placeholder="Anything — small or large."
            className="mt-3 w-full resize-none rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder-stone focus:border-plum-500 focus:outline-none"
          />
          <p className="mt-1 text-right text-[11px] text-stone">
            {shifted.length}/500
          </p>
        </section>

        <section>
          <h2 className="font-display text-[18px] italic leading-snug text-ink">
            How was your body about it?
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {BODY_OPTIONS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBody(b.id)}
                className={`rounded-[14px] py-3 font-display text-[14px] transition-colors ${
                  body === b.id
                    ? "bg-plum-700 text-paper"
                    : "bg-paper text-ink ring-1 ring-line hover:bg-lavender-50"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display text-[18px] italic leading-snug text-ink">
            One thing to notice next week.
          </h2>
          <input
            value={notice}
            onChange={(e) => setNotice(e.target.value.slice(0, 140))}
            placeholder="Just a small thing."
            className="mt-3 w-full rounded-[14px] border border-line bg-paper px-4 py-3 font-body text-[14px] text-ink placeholder-stone focus:border-plum-500 focus:outline-none"
          />
          <p className="mt-1 text-right text-[11px] text-stone">
            {notice.length}/140
          </p>
        </section>

        <button
          type="submit"
          className="mt-2 w-full rounded-full bg-plum-700 px-5 py-3.5 font-display text-[15px] font-medium text-paper shadow-elev-1 hover:opacity-90"
        >
          Save this week
        </button>
      </form>
    </div>
  );
}
