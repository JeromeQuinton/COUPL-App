import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

/**
 * Offline state — surfaces a non-blocking banner when the browser reports
 * `navigator.onLine === false`. The flow itself stays usable (drafts save
 * to localStorage), but the user is told writes won't sync until they're
 * back online.
 */
export function OfflineBanner() {
  const [online, setOnline] = useState(true);

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener("online", sync);
    window.addEventListener("offline", sync);
    return () => {
      window.removeEventListener("online", sync);
      window.removeEventListener("offline", sync);
    };
  }, []);

  if (online) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-2 bg-beeswax-100 px-6 py-2 text-body-sm text-ink"
    >
      <WifiOff className="h-4 w-4 text-caution" aria-hidden />
      <span>
        You're offline. Your answers are saved on this device and will sync
        when you reconnect.
      </span>
    </div>
  );
}