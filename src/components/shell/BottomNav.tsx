import { Link, useLocation } from "@tanstack/react-router";
import { Home, Compass, CalendarHeart, Users, User } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type Tab = {
  to: "/home" | "/discover" | "/events" | "/connections" | "/profile";
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const TABS: Tab[] = [
  { to: "/home", label: "Home", Icon: Home },
  { to: "/discover", label: "Discover", Icon: Compass },
  { to: "/events", label: "Events", Icon: CalendarHeart },
  { to: "/connections", label: "Connections", Icon: Users },
  { to: "/profile", label: "Profile", Icon: User },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[640px] -translate-x-1/2 border-t border-plum-300/25 backdrop-blur-xl"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        background:
          "linear-gradient(180deg, color-mix(in oklab, var(--paper) 88%, transparent) 0%, color-mix(in oklab, var(--paper) 96%, transparent) 100%)",
      }}
    >
      <ul className="flex items-stretch justify-between px-2">
        {TABS.map(({ to, label, Icon }) => {
          const isActive = pathname === to || pathname.startsWith(`${to}/`);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                aria-current={isActive ? "page" : undefined}
                className="group relative flex flex-col items-center gap-1 py-3"
              >
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute left-1/2 top-0 h-0.5 w-8 -translate-x-1/2 rounded-full bg-plum-500"
                  />
                ) : null}
                <Icon
                  aria-hidden
                  width={22}
                  height={22}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={
                    isActive
                      ? "text-plum-500 transition-transform"
                      : "text-stone/80 transition-colors group-hover:text-plum-300"
                  }
                />
                <span
                  className={
                    isActive
                      ? "text-body-sm font-medium text-plum-500"
                      : "text-body-sm text-stone/80 transition-colors group-hover:text-plum-300"
                  }
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}