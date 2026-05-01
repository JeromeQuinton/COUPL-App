import { Link } from "@tanstack/react-router";
import { Feather } from "lucide-react";

type Props = {
  prompt: string;
  /** Whether the user has written for today already. */
  done?: boolean;
};

/**
 * Today's reflection card on /home. Routes to /home/reflection. When
 * `done` is true the card switches to a quiet "completed" state to
 * avoid nagging — calm self-awareness, not streak pressure.
 */
export function ReflectionCard({ prompt, done = false }: Props) {
  return (
    <Link
      to="/home/reflection"
      className="group block rounded-[20px] border border-line bg-paper p-5 transition-colors hover:bg-cloud"
    >
      <div className="flex items-center justify-between">
        <span className="text-label-mono">Today's reflection</span>
        <Feather className="h-4 w-4 text-plum-500" aria-hidden />
      </div>
      <p className="mt-3 text-h1 text-ink">{prompt}</p>
      <p className="mt-3 text-body-sm text-slate">
        {done ? "Saved earlier — open to add more." : "Two minutes is enough."}
      </p>
    </Link>
  );
}