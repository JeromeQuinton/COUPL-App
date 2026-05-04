import { useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { ProfileScreenHeader } from "@/components/shell/ProfileScreenHeader";
import {
  useCompatibilityDeepDive,
  type LensReading,
} from "@/hooks/use-compatibility-deep-dive";

export const Route = createFileRoute("/_main/discover/$id_/compatibility")({
  head: () => ({ meta: [{ title: "Compatibility — COUPL" }] }),
  component: CompatibilityDeepDive,
});

function CompatibilityDeepDive() {
  const { id } = useParams({ from: "/_main/discover/$id_/compatibility" });
  const lenses = useCompatibilityDeepDive(id);
  const [openId, setOpenId] = useState<string | null>(lenses[0]?.id ?? null);

  return (
    <div className="relative px-5 pb-16 pt-6">
      <ProfileScreenHeader
        backLink={{ to: "/discover/$id", params: { id } }}
        eyebrow="Compatibility"
        title={
          <>
            How you two read on each <em className="italic">lens.</em>
          </>
        }
        titleSize="26"
        titleWeight="normal"
      />
      <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
        Five lenses. Tap to expand each one.
      </p>

      <ul className="mt-7 flex flex-col gap-2">
        {lenses.map((lens) => (
          <LensRow
            key={lens.id}
            lens={lens}
            open={openId === lens.id}
            onToggle={() => setOpenId((prev) => (prev === lens.id ? null : lens.id))}
          />
        ))}
      </ul>
    </div>
  );
}

function LensRow({
  lens,
  open,
  onToggle,
}: {
  lens: LensReading;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={`w-full rounded-[16px] bg-paper p-4 text-left shadow-elev-1 transition-colors ${
          open ? "ring-1 ring-plum-300" : "hover:bg-lavender-50"
        }`}
      >
        <div className="flex items-start gap-3">
          <span
            aria-hidden
            className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${
              open ? "bg-plum-700" : "bg-stone"
            }`}
            style={
              open
                ? {
                    background:
                      "linear-gradient(135deg, var(--plum-500) 0%, var(--blush) 100%)",
                  }
                : undefined
            }
          />
          <div className="min-w-0 flex-1">
            <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
              {lens.label}
            </p>
            <p className="mt-1 font-display text-[14.5px] leading-snug text-ink">
              {lens.summary}
            </p>
            {open ? (
              <p className="mt-3 font-body text-[13px] leading-relaxed text-slate">
                {lens.expanded}
              </p>
            ) : null}
          </div>
          <ChevronDown
            className={`mt-1 h-4 w-4 flex-shrink-0 text-stone transition-transform ${
              open ? "rotate-180" : ""
            }`}
            strokeWidth={1.75}
          />
        </div>
      </button>
    </li>
  );
}
