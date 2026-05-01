import { Link, useLocation } from "@tanstack/react-router";

type Tab = {
  to: "/home" | "/discover" | "/growth" | "/connections" | "/profile";
  label: string;
};

const TABS: Tab[] = [
  { to: "/home", label: "HOME" },
  { to: "/discover", label: "DISCOVER" },
  { to: "/growth", label: "GROWTH" },
  { to: "/connections", label: "MSGS" },
  { to: "/profile", label: "YOU" },
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
        height: "calc(56px + env(safe-area-inset-bottom))",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <ul className="flex h-[56px] items-center justify-between px-2">
        {TABS.map(({ to, label }) => {
          const isActive = pathname === to || pathname.startsWith(`${to}/`);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                aria-current={isActive ? "page" : undefined}
                className="group relative flex h-full items-center justify-center"
              >
                <span
                  className={`font-mono text-[11px] uppercase tracking-[0.12em] ${
                    isActive ? "text-ink" : "text-stone"
                  }`}
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
                      // 12px below baseline of an 11px line ≈ centre + ~18px
                      top: "calc(50% + 18px)",
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
