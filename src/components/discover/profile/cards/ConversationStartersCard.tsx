import { MessageCircle, Leaf, MapPin } from "lucide-react";
import { SectionCard } from "./SectionCard";

/**
 * Conversation starters — three text prompts authored by the profile
 * owner. Each prompt sits in its own lavender card for visual
 * separation. 56px right padding is reserved on each card to leave
 * room for the future Module Attune infinity button (Prompt E).
 */
export function ConversationStartersCard({ starters }: { starters: string[] }) {
  const icons = [MessageCircle, Leaf, MapPin];
  return (
    <SectionCard title="Conversation starters">
      <ul className="flex flex-col gap-2">
        {starters.map((s, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <li
              key={s}
              className="relative flex items-start gap-2 rounded-2xl bg-lavender-50 py-3 pl-4"
              style={{ paddingRight: 56 }}
            >
              <Icon
                aria-hidden
                width={14}
                height={14}
                strokeWidth={1.75}
                className="mt-1 flex-shrink-0 text-plum-500"
              />
              <span className="font-body text-[13px] italic text-ink">
                &ldquo;{s}&rdquo;
              </span>
            </li>
          );
        })}
      </ul>
    </SectionCard>
  );
}
