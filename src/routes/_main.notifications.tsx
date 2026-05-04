import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/_main/notifications")({
  head: () => ({
    meta: [{ title: "Activity — COUPL" }],
  }),
  component: NotificationsScreen,
});

type Item = {
  id: string;
  initial: string;
  hue: "lavender" | "blush" | "plum";
  message: string;
  detail?: string;
  when: string;
  group: "today" | "week" | "earlier";
  to:
    | { route: "/connections/$id"; id: string }
    | { route: "/connections/$id/connected"; id: string }
    | { route: "/connections/$id/date-plan"; id: string }
    | { route: "/home/coach" }
    | { route: "/growth/$id"; id: string };
};

const ITEMS: Item[] = [
  {
    id: "n1",
    initial: "A",
    hue: "lavender",
    message: "Ava attuned to you.",
    detail: "You both said yes.",
    when: "12 min ago",
    group: "today",
    to: { route: "/connections/$id/connected", id: "ava" },
  },
  {
    id: "n2",
    initial: "P",
    hue: "blush",
    message: "Polaris noticed something.",
    detail: "Open the coach.",
    when: "2h ago",
    group: "today",
    to: { route: "/home/coach" },
  },
  {
    id: "n3",
    initial: "M",
    hue: "lavender",
    message: "Maya proposed a plan.",
    detail: "Saturday · Hampstead Heath walk",
    when: "yesterday",
    group: "week",
    to: { route: "/connections/$id/date-plan", id: "maya" },
  },
  {
    id: "n4",
    initial: "W",
    hue: "plum",
    message: "Workshop tomorrow at 7pm.",
    detail: "The repair conversation · Session 2 of 4",
    when: "2d ago",
    group: "week",
    to: { route: "/growth/$id", id: "demo" },
  },
];

const GROUPS: { id: Item["group"]; label: string }[] = [
  { id: "today", label: "Today" },
  { id: "week", label: "This week" },
  { id: "earlier", label: "Earlier" },
];

function NotificationsScreen() {
  const grouped = GROUPS.map((g) => ({
    ...g,
    items: ITEMS.filter((i) => i.group === g.id),
  }));
  const isEmpty = ITEMS.length === 0;

  return (
    <div className="relative px-5 pb-16 pt-6">
      <header className="flex items-center gap-3">
        <Link
          to="/home"
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="text-label-mono">Activity</p>
      </header>

      <h1 className="mt-3 font-display text-[28px] leading-tight text-ink">
        What landed.
      </h1>
      <p className="mt-2 font-body text-[13.5px] text-slate">
        Quiet by default. We only nudge when it matters.
      </p>

      {isEmpty ? (
        <section className="mt-12 text-center">
          <p className="font-display text-[20px] italic text-ink">Quiet today.</p>
          <p className="mt-2 font-body text-[13px] text-stone">Steady is good.</p>
        </section>
      ) : (
        <div className="mt-8 space-y-8">
          {grouped.map((g) =>
            g.items.length === 0 ? null : (
              <section key={g.id}>
                <h2 className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
                  {g.label}
                </h2>
                <ul className="mt-3 flex flex-col gap-2">
                  {g.items.map((it) => (
                    <li key={it.id}>
                      <ActivityRow item={it} />
                    </li>
                  ))}
                </ul>
              </section>
            ),
          )}
        </div>
      )}
    </div>
  );
}

function ActivityRow({ item }: { item: Item }) {
  const hueBg =
    item.hue === "blush"
      ? "bg-pink-100"
      : item.hue === "plum"
        ? "bg-plum-300"
        : "bg-lavender-100";

  const linkProps = (() => {
    switch (item.to.route) {
      case "/connections/$id":
        return { to: "/connections/$id", params: { id: item.to.id } } as const;
      case "/connections/$id/connected":
        return {
          to: "/connections/$id/connected",
          params: { id: item.to.id },
        } as const;
      case "/connections/$id/date-plan":
        return {
          to: "/connections/$id/date-plan",
          params: { id: item.to.id },
        } as const;
      case "/home/coach":
        return { to: "/home/coach" } as const;
      case "/growth/$id":
        return { to: "/growth/$id", params: { id: item.to.id } } as const;
    }
  })();

  return (
    <Link
      {...linkProps}
      className="flex items-start gap-3 rounded-[14px] bg-paper p-3.5 shadow-elev-1 transition-colors hover:bg-lavender-50"
    >
      <span
        aria-hidden
        className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full font-display text-[15px] font-semibold text-plum-700 ${hueBg}`}
      >
        {item.initial}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-display text-[14.5px] font-medium text-ink">{item.message}</p>
        {item.detail ? (
          <p className="mt-0.5 truncate font-body text-[12.5px] text-slate">{item.detail}</p>
        ) : null}
      </div>
      <span className="flex-shrink-0 text-[11px] font-medium uppercase tracking-[0.12em] text-stone">
        {item.when}
      </span>
    </Link>
  );
}
