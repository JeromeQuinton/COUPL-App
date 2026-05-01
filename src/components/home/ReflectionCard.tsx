import { Link } from "@tanstack/react-router";

type Props = {
  prompt: string;
  /** Whether the user has written for today already. */
  done?: boolean;
};

/**
 * Today's reflection card on /home. Routes to /home/reflection. The
 * card mimics a tap-to-write input: serif prompt above, hint row
 * below. No icon — the prompt is the affordance.
 */
export function ReflectionCard({ prompt, done = false }: Props) {
  return (
    <Link
      to="/home/reflection"
      className="group relative block overflow-hidden rounded-[20px] border border-plum-300/30 p-5 shadow-elev-1 transition-shadow hover:shadow-elev-2"
      style={{
        background:
          "linear-gradient(170deg, var(--paper) 0%, color-mix(in oklab, var(--blush) 45%, var(--paper)) 100%)",
      }}
    >
      <div className="flex items-center justify-between">
        <span className="text-label-mono">Today's reflection</span>
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-plum-500 opacity-70"
        />
      </div>
      <p className="mt-3 text-body-lg text-ink">{prompt}</p>
      <p className="mt-4 text-body-sm text-stone italic">
        {done ? "Saved earlier — tap to add more." : "Tap to write…"}
      </p>
    </Link>
  );
}