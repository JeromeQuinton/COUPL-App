import { MoreHorizontal } from "lucide-react";
import type { ReactNode } from "react";

/**
 * StatusBar — the iOS-style 9:41 + ⋯ row that opens every screen in
 * Chapter 06 wireframes. `leading` lets the detail and round-up screens
 * insert a back chevron without re-implementing the row.
 */
export function StatusBar({
  leading,
  trailing,
  tone = "light",
}: {
  leading?: ReactNode;
  trailing?: ReactNode;
  tone?: "light" | "dark";
}) {
  const text = tone === "dark" ? "text-paper/85" : "text-ink/80";
  return (
    <div className={`flex items-center justify-between px-5 pt-3 pb-2 text-[12.5px] font-medium ${text}`}>
      <div className="flex items-center gap-2">
        <span className="tabular-nums">9:41</span>
        {leading}
      </div>
      <div className="flex items-center gap-2">
        {trailing}
        <MoreHorizontal aria-hidden size={18} className="opacity-70" />
      </div>
    </div>
  );
}