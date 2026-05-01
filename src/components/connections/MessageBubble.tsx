import type { ThreadMessage } from "@/data/connections_sample";

type Props = { message: Extract<ThreadMessage, { kind: "msg" }> };

/**
 * Message bubble — paper for `them`, plum for `me`. Calm radii, no
 * tails. Long-form copy stays readable at 15px.
 */
export function MessageBubble({ message }: Props) {
  const isMe = message.from === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={
          isMe
            ? "max-w-[78%] rounded-[20px] rounded-br-[6px] bg-plum-500 px-4 py-2.5 text-[14.5px] leading-relaxed text-paper shadow-[0_1px_2px_rgba(61,26,71,0.12)]"
            : "max-w-[82%] rounded-[20px] rounded-bl-[6px] border border-plum-300/15 bg-paper px-4 py-2.5 text-[14.5px] leading-relaxed text-ink shadow-[0_1px_2px_rgba(61,26,71,0.06)]"
        }
      >
        {message.text}
      </div>
    </div>
  );
}