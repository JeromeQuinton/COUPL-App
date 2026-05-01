/**
 * EndingTemplateCard — radio-style row with a pre-written closure note.
 * Selected state gets a plum tint + filled bullet. Editable preview is
 * shown inline (italic) so the user can read what would actually send.
 */
type Props = {
  title: string;
  template: string;
  selected: boolean;
  onSelect: () => void;
};

export function EndingTemplateCard({
  title,
  template,
  selected,
  onSelect,
}: Props) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={
        "w-full rounded-2xl border px-4 py-3 text-left transition-colors " +
        (selected
          ? "border-plum-500/70 bg-plum-300/10 shadow-[0_1px_2px_rgba(61,26,71,0.08)]"
          : "border-plum-300/30 bg-paper/85 hover:border-plum-300/55 hover:bg-paper")
      }
    >
      <p className="font-display text-[15px] font-medium text-ink">{title}</p>
      <p className="mt-1.5 text-[13px] italic leading-snug text-plum-700">
        → {template}
      </p>
    </button>
  );
}