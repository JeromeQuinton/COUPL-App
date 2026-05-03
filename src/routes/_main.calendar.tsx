import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Calendar, Users, Sparkles, MapPin } from "lucide-react";
import { CALENDAR_ITEMS, type CalendarItem } from "@/data/calendar_sample";

export const Route = createFileRoute("/_main/calendar")({
  head: () => ({ meta: [{ title: "Calendar — COUPL" }] }),
  component: CalendarScreen,
});

type Window = "this-week" | "next-week" | "month";

const TABS: { id: Window; label: string }[] = [
  { id: "this-week", label: "This week" },
  { id: "next-week", label: "Next week" },
  { id: "month", label: "Month" },
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function startOfWeek(d: Date): Date {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  c.setDate(c.getDate() - c.getDay());
  return c;
}

function addDays(d: Date, n: number): Date {
  const c = new Date(d);
  c.setDate(c.getDate() + n);
  return c;
}

function sameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function fmtTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function fmtDayHeader(d: Date): string {
  return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

function CalendarScreen() {
  const [tab, setTab] = useState<Window>("this-week");
  const [activeDayIso, setActiveDayIso] = useState<string | null>(null);

  const now = new Date();
  const currentSunday = startOfWeek(now);

  const window = useMemo(() => {
    if (tab === "this-week") {
      return Array.from({ length: 7 }, (_, i) => addDays(currentSunday, i));
    }
    if (tab === "next-week") {
      const next = addDays(currentSunday, 7);
      return Array.from({ length: 7 }, (_, i) => addDays(next, i));
    }
    return Array.from({ length: 28 }, (_, i) => addDays(currentSunday, i));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const items = useMemo(() => {
    return CALENDAR_ITEMS.filter((it) => {
      const d = new Date(it.start);
      return window.some((w) => sameDay(w, d));
    }).sort((a, b) => a.start.localeCompare(b.start));
  }, [window]);

  const groupedByDay = useMemo(() => {
    return window.map((day) => ({
      day,
      items: items.filter((it) => sameDay(new Date(it.start), day)),
    }));
  }, [window, items]);

  return (
    <div className="relative px-5 pb-20 pt-6">
      <header className="flex items-center gap-3">
        <Link
          to="/home"
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="text-label-mono">Calendar</p>
      </header>

      <h1 className="mt-3 font-display text-[28px] leading-tight text-ink">
        What you've held space for.
      </h1>

      <div className="mt-5 flex gap-1.5 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-3.5 py-1.5 font-body text-[12.5px] transition-colors ${
              tab === t.id
                ? "bg-plum-700 text-paper"
                : "bg-paper text-slate ring-1 ring-line hover:bg-lavender-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab !== "month" ? (
        <div className="mt-5 flex justify-between gap-1">
          {window.slice(0, 7).map((d) => {
            const isToday = sameDay(d, now);
            const isActive = activeDayIso === d.toISOString();
            return (
              <button
                key={d.toISOString()}
                type="button"
                onClick={() =>
                  setActiveDayIso((prev) =>
                    prev === d.toISOString() ? null : d.toISOString(),
                  )
                }
                className={`flex flex-1 flex-col items-center gap-1 rounded-[12px] py-2 transition-colors ${
                  isActive
                    ? "bg-plum-700 text-paper"
                    : isToday
                      ? "bg-lavender-100 text-plum-700"
                      : "text-slate hover:bg-lavender-50"
                }`}
              >
                <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em]">
                  {DAY_NAMES[d.getDay()]}
                </span>
                <span className="font-display text-[15px] font-medium">
                  {d.getDate()}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="mt-7 flex flex-col gap-6">
        {groupedByDay.map(({ day, items }) => (
          <DayGroup
            key={day.toISOString()}
            day={day}
            items={items}
            highlight={activeDayIso === day.toISOString()}
          />
        ))}
      </div>
    </div>
  );
}

function DayGroup({
  day,
  items,
  highlight,
}: {
  day: Date;
  items: CalendarItem[];
  highlight: boolean;
}) {
  return (
    <section
      id={`day-${day.toISOString()}`}
      className={highlight ? "scroll-mt-4 rounded-[14px] bg-lavender-50/60 p-2" : ""}
    >
      <h2 className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
        {fmtDayHeader(day)}
      </h2>
      <ul className="mt-2 flex flex-col gap-2">
        {items.length === 0 ? (
          <li className="rounded-[12px] bg-paper px-4 py-3 font-display text-[13px] italic text-stone shadow-elev-1">
            Nothing held this day. Steady is good.
          </li>
        ) : (
          items.map((it) => <ItemRow key={it.id} item={it} />)
        )}
      </ul>
    </section>
  );
}

function ItemRow({ item }: { item: CalendarItem }) {
  const Icon =
    item.type === "workshop" ? Sparkles : item.type === "event" ? Users : Calendar;

  const linkProps = (() => {
    switch (item.href.route) {
      case "/connections/$id/date-plan":
        return {
          to: "/connections/$id/date-plan",
          params: { id: item.href.id },
        } as const;
      case "/growth/$id":
        return { to: "/growth/$id", params: { id: item.href.id } } as const;
      case "/events/$id":
        return { to: "/events/$id", params: { id: item.href.id } } as const;
    }
  })();

  return (
    <li>
      <Link
        {...linkProps}
        className="flex items-start gap-3 rounded-[14px] bg-paper p-3.5 shadow-elev-1 transition-colors hover:bg-lavender-50"
      >
        <span
          aria-hidden
          className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-lavender-100 text-plum-700"
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-[14.5px] font-medium leading-snug text-ink">
            {item.title}
          </p>
          <p className="mt-0.5 font-body text-[12px] text-slate">
            <span className="font-semibold uppercase tracking-[0.1em] text-stone">
              {fmtTime(item.start)}
            </span>
            {"  ·  "}
            <span>{item.whereLabel}</span>
          </p>
          <p className="mt-0.5 font-body text-[11.5px] italic text-stone">
            {item.withWhom}
          </p>
        </div>
        <MapPin className="mt-1 h-3.5 w-3.5 flex-shrink-0 text-stone" />
      </Link>
    </li>
  );
}
