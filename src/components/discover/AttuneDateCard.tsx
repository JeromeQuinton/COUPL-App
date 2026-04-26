import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
 * When the recommended profile has no date ideas configured, an
 * <EmptyStateNudge/> renders below the card pointing to the
 * date-preferences onboarding step.
 */
export function AttuneDateCard({
  timeWindow: initialTime,
  dateType: initialType,
  comment: initialComment,
  dateIdeas,
}: {
  timeWindow?: TimeWindow;
  dateType?: DateType;
  comment?: string;
  dateIdeas?: string[];
}) {
  const [time, setTime] = useState<TimeWindow | undefined>(initialTime);
  const [type, setType] = useState<DateType | undefined>(initialType);
  const [comment, setComment] = useState<string>(initialComment ?? "");
  const [openSheet, setOpenSheet] = useState<"time" | "type" | null>(null);

  const timeLabel =
    TIME_OPTIONS.find((o) => o.value === time)?.label ?? "Choose a time";
  const typeLabel =
    DATE_TYPE_OPTIONS.find((o) => o.value === type)?.label ?? "first meeting";

  const showNudge = !dateIdeas || dateIdeas.length === 0;

  return (
    <div className="flex flex-col gap-3">
      <section className="rounded-[20px] bg-paper p-5 shadow-elev-1">
        <h2 className="font-display text-[16px] font-semibold leading-tight text-ink">
          When we meet
        </h2>

        <div className="mt-4 flex flex-col gap-3">
          <ChipDropdown
            label={timeLabel}
            placeholder="Choose a time"
            selected={time !== undefined}
            onClick={() => setOpenSheet("time")}
          />

          <div className="flex items-center gap-2">
            <span className="font-body text-[13px] text-slate">for</span>
            <ChipDropdown
              label={typeLabel}
              placeholder="a first meeting"
              selected={type !== undefined}
              onClick={() => setOpenSheet("type")}
            />
          </div>

          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value.slice(0, 140))}
            maxLength={140}
            placeholder="Add a comment"
            className="mt-1 w-full rounded-full border border-line bg-paper px-4 py-3 font-body text-[13px] text-ink placeholder:text-stone focus:border-plum-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-300/40"
          />
        </div>
      </section>

      {showNudge ? (
        <EmptyStateNudge
          ctaLabel="Try it"
          ctaDestination="/onboarding/date-preferences"
          microcopy="Add date ideas. People remember those who show up specific."
        />
      ) : null}

      <Sheet
        open={openSheet !== null}
        onOpenChange={(o) => !o && setOpenSheet(null)}
      >
        <SheetContent
          side="bottom"
          className="rounded-t-[24px] border-t border-line bg-paper px-5 pb-8 pt-6"
        >
          <SheetHeader className="text-left">
            <SheetTitle className="font-display text-[18px] font-semibold text-ink">
              {openSheet === "time" ? "Choose a time" : "What kind of meet-up?"}
            </SheetTitle>
          </SheetHeader>

          <ul className="mt-4 flex flex-col gap-1">
            {(openSheet === "time" ? TIME_OPTIONS : DATE_TYPE_OPTIONS).map(
              (opt) => {
                const active =
                  openSheet === "time"
                    ? time === opt.value
                    : type === opt.value;
                return (
                  <li key={opt.value}>
                    <button
                      type="button"
                      onClick={() => {
                        if (openSheet === "time") {
                          setTime(opt.value as TimeWindow);
                        } else {
                          setType(opt.value as DateType);
                        }
                        setOpenSheet(null);
                      }}
                      className={
                        "w-full rounded-2xl px-4 py-3 text-left font-body text-[14px] transition-colors " +
                        (active
                          ? "bg-lavender-100 text-plum-700"
                          : "bg-paper text-ink hover:bg-lavender-50")
                      }
                    >
                      {opt.label}
                    </button>
                  </li>
                );
              },
            )}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function ChipDropdown({
  label,
  placeholder,
  selected,
  onClick,
}: {
  label: string;
  placeholder: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex w-fit max-w-full items-center gap-1.5 rounded-full border px-4 py-2 font-body text-[13px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-plum-300 " +
        (selected
          ? "border-plum-300 bg-lavender-100 text-plum-700"
          : "border-plum-300 bg-paper text-plum-700 hover:bg-lavender-50")
      }
      aria-label={selected ? label : placeholder}
    >
      <span className="truncate">{selected ? label : placeholder}</span>
      <ChevronDown aria-hidden width={14} height={14} strokeWidth={2} />
    </button>
  );
}