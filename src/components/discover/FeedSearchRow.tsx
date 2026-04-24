import { Search, RefreshCw } from "lucide-react";

type Props = {
  query: string;
  onQueryChange: (q: string) => void;
  refreshing?: boolean;
  onRefresh: () => void;
};

export function FeedSearchRow({ query, onQueryChange, refreshing, onRefresh }: Props) {
  return (
    <div className="flex items-stretch gap-2">
      <div className="flex flex-1 items-center gap-2 rounded-full border border-plum-300/40 bg-paper px-4 py-2.5 shadow-elev-1">
        <Search aria-hidden width={16} height={16} className="text-stone" strokeWidth={1.75} />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Filter by tag or intent…"
          className="w-full bg-transparent font-body text-[14px] text-ink placeholder:text-stone focus:outline-none"
          aria-label="Filter by tag or intent"
        />
      </div>
      <button
        type="button"
        onClick={onRefresh}
        disabled={refreshing}
        className="inline-flex items-center gap-2 rounded-full border border-plum-300/40 bg-lavender-50 px-4 py-2.5 font-body text-[13px] font-medium text-plum-700 shadow-elev-1 transition-colors hover:bg-lavender-100 disabled:opacity-70"
      >
        <RefreshCw
          aria-hidden
          width={14}
          height={14}
          strokeWidth={2}
          className={refreshing ? "animate-spin" : ""}
        />
        {refreshing ? "Refreshing…" : "Refresh"}
      </button>
    </div>
  );
}
