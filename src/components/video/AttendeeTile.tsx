type Props = {
  name: string;
  initial: string;
  muted?: boolean;
  handRaised?: boolean;
  isSpeaker?: boolean;
};

export function AttendeeTile({
  name,
  initial,
  muted,
  handRaised,
  isSpeaker,
}: Props) {
  return (
    <div
      role="img"
      aria-label={`${name} attendee tile`}
      className={`relative grid aspect-[3/4] place-items-center overflow-hidden rounded-[14px] ${
        isSpeaker ? "ring-2 ring-lavender-100" : ""
      }`}
      style={{
        background:
          "linear-gradient(150deg, color-mix(in oklab, var(--lavender-100) 70%, var(--paper)) 0%, color-mix(in oklab, var(--blush) 60%, var(--paper)) 100%)",
      }}
    >
      <span
        aria-hidden
        className="font-display text-[28px] font-semibold text-plum-700/80"
      >
        {initial}
      </span>
      <p className="absolute bottom-1.5 left-2 text-label-mono text-plum-700/80">
        {name}
      </p>
      {handRaised && (
        <span
          aria-label="Hand raised"
          className="absolute right-1.5 top-1.5 rounded-full bg-paper px-2 py-0.5 text-label-mono text-plum-700"
        >
          ✋
        </span>
      )}
    </div>
  );
}
