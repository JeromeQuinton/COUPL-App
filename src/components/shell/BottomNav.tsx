import { Link, useLocation } from "@tanstack/react-router";
import { House, Compass, BookOpen, Mail, CircleUser, type LucideIcon } from "lucide-react";

type Tab = {
  to: "/home" | "/discover" | "/growth" | "/connections" | "/profile";
  label: string;
  Icon: LucideIcon;
};

const TABS: Tab[] = [
  { to: "/home", label: "HOME", Icon: House },
  { to: "/discover", label: "DISCOVER", Icon: Compass },
  { to: "/growth", label: "GROWTH", Icon: BookOpen },
  { to: "/connections", label: "MSGS", Icon: Mail },
  { to: "/profile", label: "YOU", Icon: CircleUser },
];

/**
 * BottomNav — editorial typographic nav (DR-BRAND-V2-A/D).
 *
 * Mono uppercase labels, no icons. Active tab gets a 1.5px ink underline
 * 12px below baseline.
 */
export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav
      aria-label="Primary"
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[640px] -translate-x-1/2 border-t border-ink/15 bg-blush"
      style={{
        height: "calc(64px + env(safe-area-inset-bottom))",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <ul className="flex h-[64px] items-center justify-around px-2">
        {TABS.map(({ to, label, Icon }) => {
          const isActive = pathname === to || pathname.startsWith(`${to}/`);
          const tone = isActive ? "text-ink" : "text-stone";
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                aria-current={isActive ? "page" : undefined}
                className="group relative flex h-full flex-col items-center justify-center"
              >
                <Icon
                  aria-hidden
                  width={18}
                  height={18}
                  strokeWidth={1.5}
                  className={tone}
                />
                <span
                  className={`font-mono uppercase ${tone}`}
                  style={{
                    marginTop: "4px",
                    fontSize: "9px",
                    letterSpacing: "0.10em",
                    lineHeight: 1,
                  }}
                >
                  {label}
                </span>
                {isActive ? (
                  <span
                    aria-hidden
                    className="absolute left-1/2 -translate-x-1/2 bg-ink"
                    style={{
                      width: "24px",
                      height: "1.5px",
                      // 6px below the 9px label baseline
                      bottom: "8px",
                    }}
                  />
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
