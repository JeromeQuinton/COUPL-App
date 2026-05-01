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
      className="group block rounded-[20px] border border-ink bg-paper p-5 transition-colors hover:bg-cloud"
    >
      <span className="text-label-mono">Today's reflection</span>
      <p className="mt-3 text-body-lg text-ink">{prompt}</p>
      <p className="mt-4 text-body-sm text-stone">
        {done ? "Saved earlier — tap to add more." : "Tap to write…"}
      </p>
    </Link>
  );
}