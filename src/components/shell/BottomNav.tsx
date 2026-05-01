import { Link, useLocation } from "@tanstack/react-router";
import { Home, Compass, Sprout, Users, User } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

type Tab = {
  to: "/home" | "/discover" | "/growth" | "/connections" | "/profile";
  label: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
};

const TABS: Tab[] = [
  { to: "/home", label: "Home", Icon: Home },
  { to: "/discover", label: "Discover", Icon: Compass },
  { to: "/growth", label: "Growth", Icon: Sprout },
  { to: "/connections", label: "Connections", Icon: Users },
  { to: "/profile", label: "Profile", Icon: User },
];

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[640px] -translate-x-1/2 border-t border-ink bg-blush/95 backdrop-blur-md"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex items-stretch justify-between px-2">
        {TABS.map(({ to, label, Icon }) => {
          const isActive = pathname === to || pathname.startsWith(`${to}/`);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                aria-current={isActive ? "page" : undefined}
                className="group flex flex-col items-center gap-1 py-3"
              >
                <Icon
                  aria-hidden
                  width={22}
                  height={22}
                  strokeWidth={isActive ? 2 : 1.5}
                  className={
                    isActive
                      ? "text-plum-500"
                      : "text-stone transition-colors group-hover:text-ink"
                  }
                />
                <span
                  className={
                    isActive
                      ? "text-body-sm font-medium text-plum-500"
                      : "text-body-sm text-stone"
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