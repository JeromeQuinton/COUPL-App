import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { EmptyStateNudge } from "@/components/common/EmptyStateNudge";

export type TimeWindow =
  | "this_week"
  | "this_weekend"
  | "next_week"
  | "next_weekend";

export type DateType =
  | "first_meeting"
  | "real_conversation"
  | "doing_something_together";

const TIME_OPTIONS: { value: TimeWindow; label: string }[] = [
  { value: "this_week", label: "this week" },
  { value: "this_weekend", label: "this weekend" },
  { value: "next_week", label: "next week" },
  { value: "next_weekend", label: "next weekend" },
];

const DATE_TYPE_OPTIONS: { value: DateType; label: string }[] = [
  { value: "first_meeting", label: "a first meeting" },
  { value: "real_conversation", label: "a real conversation" },
  { value: "doing_something_together", label: "doing something together" },
];

/**
 * AttuneDateCard — sits directly under the action buttons on
 * /discover/[id]. Lets the user compose a soft date suggestion
 * (time window + date type + optional comment) prior to the Attune
 * action itself. Submission/sending mechanics belong to the Attune
 * action and are NOT wired here — this card is display + selection
 * only.
 *
 * Pills use Popover (anchored, content-hugging) rather than a
 * full bottom Sheet, matching the lavender/plum chip treatment of
 * the Introduction Card (Long-term, Relationship, Open to depth).
 */
export function AttuneDateCard({
  timeWindow: initialTime,
  dateType: initialType,
  comment: initialComment,
  dateIdeas,
  onAttune,
  disabled = false,
}: {
  timeWindow?: TimeWindow;
  dateType?: DateType;
  comment?: string;
  dateIdeas?: string[];
  /**
   * Called when the user taps the inline Attune CTA. Receives the
   * composed proposal so the parent can fire the standard 800ms
   * confirmation overlay (DR-033).
   */
  onAttune?: (proposal: {
    timeWindow?: TimeWindow;
    dateType?: DateType;
    comment?: string;
  }) => void;
  /** When true (e.g. profile already attuned this session), CTA is inert. */
  disabled?: boolean;
}) {
  const [time, setTime] = useState<TimeWindow | undefined>(initialTime);
  const [type, setType] = useState<DateType | undefined>(initialType);
  const [comment, setComment] = useState<string>(initialComment ?? "");
  const [timeOpen, setTimeOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  /**
   * "Engagement" gate (per spec): the comment field + Attune CTA stay
   * hidden until the user opens either picker OR makes a selection.
   * Once true, sticky for the card session — clearing selections does
   * not re-hide the controls.
   */
  const [engaged, setEngaged] = useState<boolean>(
    Boolean(initialTime) || Boolean(initialType) || Boolean(initialComment),
  );
  const engage = () => setEngaged(true);

  const timeLabel =
    TIME_OPTIONS.find((o) => o.value === time)?.label ?? "Choose a time";
  const typeLabel =
    DATE_TYPE_OPTIONS.find((o) => o.value === type)?.label ?? "a first meeting";

  const showNudge = !dateIdeas || dateIdeas.length === 0;
  const canSend = Boolean(time) || Boolean(type);

  return (
    <div className="flex flex-col gap-3">
      <section className="rounded-[20px] bg-paper p-5 shadow-elev-1">
        <h2 className="font-display text-[16px] font-semibold leading-tight text-ink">
          When we meet
        </h2>

        <div className="mt-4 flex flex-col gap-3">
          <Popover
            open={timeOpen}
            onOpenChange={(o) => {
              setTimeOpen(o);
              if (o) engage();
            }}
          >
            <PopoverTrigger asChild>
              <button type="button" className={chipClass} aria-label={timeLabel}>
                <span className="truncate">{timeLabel}</span>
                <ChevronDown
                  aria-hidden
                  width={14}
                  height={14}
                  strokeWidth={2}
                  className="text-plum-700"
                />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              sideOffset={6}
              className="w-auto min-w-[180px] rounded-2xl border border-line bg-paper p-1.5 shadow-elev-1"
            >
              <p className="px-3 pb-1 pt-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-stone">
                Choose a time
              </p>
              <ul className="flex flex-col">
                {TIME_OPTIONS.map((opt) => {
                  const active = time === opt.value;
                  return (
                    <li key={opt.value}>
                      <button
                        type="button"
                        onClick={() => {
                          setTime(opt.value);
                          setTimeOpen(false);
                          engage();
                        }}
                        className={
                          "w-full rounded-xl px-3 py-2 text-left font-body text-[13px] transition-colors " +
                          (active
                            ? "bg-lavender-100 text-plum-700"
                            : "text-ink hover:bg-lavender-50")
                        }
                      >
                        {opt.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </PopoverContent>
          </Popover>

          <div className="flex items-center gap-2">
            <span className="font-body text-[13px] text-slate">for</span>
            <Popover
              open={typeOpen}
              onOpenChange={(o) => {
                setTypeOpen(o);
                if (o) engage();
              }}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={chipClass}
                  aria-label={typeLabel}
                >
                  <span className="truncate">{typeLabel}</span>
                  <ChevronDown
                    aria-hidden
                    width={14}
                    height={14}
                    strokeWidth={2}
                    className="text-plum-700"
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={6}
                className="w-auto min-w-[220px] rounded-2xl border border-line bg-paper p-1.5 shadow-elev-1"
              >
                <p className="px-3 pb-1 pt-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-stone">
                  What kind of meet-up?
                </p>
                <ul className="flex flex-col">
                  {DATE_TYPE_OPTIONS.map((opt) => {
                    const active = type === opt.value;
                    return (
                      <li key={opt.value}>
                        <button
                          type="button"
                          onClick={() => {
                            setType(opt.value);
                            setTypeOpen(false);
                            engage();
                          }}
                          className={
                            "w-full rounded-xl px-3 py-2 text-left font-body text-[13px] transition-colors " +
                            (active
                              ? "bg-lavender-100 text-plum-700"
                              : "text-ink hover:bg-lavender-50")
                          }
                        >
                          {opt.label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </PopoverContent>
            </Popover>
          </div>

          {/*
           * Comment + Attune CTA reveal as a unit once the user has
           * engaged with either picker (open OR selected). 200ms ease-out
           * fade; reduced-motion users get an instant snap. Once revealed,
           * stays revealed for the card session — clearing selections
           * does not re-hide.
           */}
          {engaged ? (
            <RevealGroup>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 140))}
                maxLength={140}
                placeholder="Add a comment"
                className="w-full rounded-full border border-line bg-paper px-4 py-3 font-body text-[13px] text-ink placeholder:text-stone focus:border-plum-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-300/40"
              />
              <button
                type="button"
                onClick={() => {
                  if (!canSend || disabled) return;
                  onAttune?.({
                    timeWindow: time,
                    dateType: type,
                    comment: comment.trim() ? comment.trim() : undefined,
                  });
                }}
                disabled={!canSend || disabled}
                aria-label="Attune with date proposal"
                className="w-full rounded-full bg-gradient-to-r from-plum-500 to-plum-700 px-4 py-3 font-body text-[14px] font-medium text-paper shadow-elev-1 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-300 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Attune
              </button>
            </RevealGroup>
          ) : null}
        </div>
      </section>

      {showNudge ? (
        <EmptyStateNudge
          ctaLabel="Try it"
          ctaDestination="/onboarding/date-preferences"
          microcopy="Add date ideas. People remember those who show up specific."
        />
      ) : null}
    </div>
  );
}

/**
 * 200ms ease-out fade-in wrapper for the comment + Attune CTA reveal.
 * Mounts at opacity-0 then flips to opacity-100 on the next frame so
 * the transition fires. `motion-reduce:transition-none` snaps for
 * reduced-motion users.
 */
function RevealGroup({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  return (
    <div
      className={`mt-1 flex flex-col gap-3 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
        mounted ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

// Matches Introduction Card Chip styling (Long-term / Relationship /
// Open to depth) with an added chevron for affordance.
const chipClass =
  "inline-flex w-fit max-w-full items-center gap-1.5 rounded-full bg-lavender-100 px-3 py-1.5 font-body text-[12px] font-medium text-plum-700 transition-colors hover:bg-lavender-200/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-300/40";
