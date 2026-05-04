import { FileText } from "lucide-react";
import type { RedactedField } from "@/data/verification_sample";

/**
 * RedactionPreview — shared primitive for R3-34 (passport review),
 * R3-36 (licence review), and R3-37 (redaction-review toggle).
 *
 * Renders a placeholder document image with a highlighted-fields overlay
 * showing which fields will be sent vs blurred, plus a fields-shared /
 * fields-blurred summary box. Reads from `verification_sample.REDACTED_FIELDS`.
 *
 * DR refs: DR-096 (per-field redaction toggle, locked).
 */
export function RedactionPreview({
  fields,
  side = "front",
}: {
  fields: RedactedField[];
  side?: "front" | "back";
}) {
  const shared = fields.filter((f) => f.defaultOn);
  const blurred = fields.filter((f) => !f.defaultOn);

  return (
    <div className="space-y-4">
      <article
        className="overflow-hidden rounded-[18px] border border-line bg-paper"
        style={{
          background:
            "linear-gradient(150deg, color-mix(in oklab, var(--blush) 35%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 12%, var(--paper)) 100%)",
        }}
      >
        <div className="aspect-[3/2] w-full p-5">
          <div className="grid h-full grid-cols-3 grid-rows-3 gap-2">
            {/* Photo cell */}
            <div className="col-span-1 row-span-3 grid place-items-center rounded-[8px] border border-plum-500 bg-plum-700/10">
              <span className="text-label-mono text-plum-700">Photo</span>
            </div>
            {/* Top right: name */}
            <div className="col-span-2 grid place-items-center rounded-[8px] border border-plum-500 bg-plum-700/10">
              <span className="text-label-mono text-plum-700">Name</span>
            </div>
            {/* Middle right: dob */}
            <div className="col-span-2 grid place-items-center rounded-[8px] border border-plum-500 bg-plum-700/10">
              <span className="text-label-mono text-plum-700">DOB</span>
            </div>
            {/* Bottom right: blurred remainder */}
            <div className="col-span-2 grid place-items-center rounded-[8px] border border-dashed border-stone bg-stone/10 backdrop-blur-sm">
              <span className="flex items-center gap-1.5 text-label-mono text-stone">
                <FileText size={12} strokeWidth={1.75} />
                Blurred
              </span>
            </div>
          </div>
        </div>
        {side === "back" && (
          <p className="border-t border-line bg-paper/70 px-3 py-1 text-center text-label-mono text-stone">
            Back of document
          </p>
        )}
      </article>

      <article className="rounded-[14px] border border-line bg-paper px-4 py-4">
        <p className="text-label-mono">For this step, COUPL will share</p>
        <ul className="mt-2 space-y-1.5">
          {shared.map((f) => (
            <li
              key={f.id}
              className="flex items-start gap-2 font-body text-[13px] text-ink"
            >
              <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-plum-500" />
              {f.label}
            </li>
          ))}
        </ul>
        {blurred.length > 0 && (
          <>
            <p className="mt-4 text-label-mono">Blurred before it leaves your phone</p>
            <ul className="mt-2 space-y-1.5">
              {blurred.map((f) => (
                <li
                  key={f.id}
                  className="flex items-start gap-2 font-body text-[13px] text-stone"
                >
                  <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-stone" />
                  {f.label}
                </li>
              ))}
            </ul>
          </>
        )}
      </article>
    </div>
  );
}
