type Props = { name: string };

export function TypingIndicator({ name }: Props) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 text-label-mono text-stone">
      <span className="flex gap-1" aria-hidden>
        <span
          className="size-1.5 rounded-full bg-stone animate-bounce"
          style={{ animationDelay: "-0.3s" }}
        />
        <span
          className="size-1.5 rounded-full bg-stone animate-bounce"
          style={{ animationDelay: "-0.15s" }}
        />
        <span className="size-1.5 rounded-full bg-stone animate-bounce" />
      </span>
      <span>{name.toUpperCase()} IS WRITING</span>
    </div>
  );
}
