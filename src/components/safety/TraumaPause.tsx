import { useNavigate } from "@tanstack/react-router";
import { Pause } from "lucide-react";

/**
 * TraumaPause — persistent "I need a break" exit on trauma-adjacent surfaces.
 * Returns the user to /home (neutral surface). Phase 1 fidelity: no draft
 * persistence yet. The brief intent is that the surface restores draft state
 * on return; that wiring is Phase 4.
 */
export function TraumaPause({ onPause }: { onPause?: () => void }) {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => {
        onPause?.();
        navigate({ to: "/home" });
      }}
      className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-4 py-2.5 font-body text-[13px] text-slate hover:bg-lavender-50"
    >
      <Pause size={14} strokeWidth={2} />
      I need a break — save and continue later
    </button>
  );
}
