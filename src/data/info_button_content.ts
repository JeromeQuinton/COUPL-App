/**
 * InfoButton content registry.
 *
 * Single source of truth for "what this means" + "what it means for you"
 * copy surfaced via <InfoButton termKey="..." />. All entries currently
 * carry V0 PLACEHOLDER copy pending psych advisor sign-off (DR-015).
 * Do not surface any of these strings as canonical product copy yet.
 */

export interface InfoContent {
  termName: string;
  whatThisMeans: string;
  /** v0 placeholder; needs psych advisor sign-off before launch. */
  whatItMeansForYou: string;
  ctaLabel?: string;
  ctaDestination?: string;
}

export const INFO_CONTENT: Record<string, InfoContent> = {
  // V0 PLACEHOLDER — needs psych advisor sign-off
  trust_score: {
    termName: "Trust Score",
    whatThisMeans:
      "A composite signal of identity verification, community standing, and conduct on COUPL. Higher means safer to engage with.",
    whatItMeansForYou:
      "A score above 90% means this profile has cleared identity checks and has a clean conduct record. You can reach out without the usual safety friction.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  attuned_percentage: {
    termName: "Attuned",
    whatThisMeans:
      "How aligned you and this person are across core psychological dimensions — values, communication style, attachment, and life pacing.",
    whatItMeansForYou:
      "68% means meaningful alignment across most dimensions. Likely strong conversation, comfortable pacing, and shared values. Some differences worth being curious about, not worried about.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  intent: {
    termName: "Intent",
    whatThisMeans:
      "What this person is on COUPL for. Not a promise — a current orientation.",
    whatItMeansForYou:
      "Long-term and Relationship signals someone seeking depth over volume. If you're aligned, you'll likely move at compatible speeds. If not, the mismatch shows up early.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  pacing: {
    termName: "Pacing",
    whatThisMeans:
      "How this person likes to move through early connection — from first message to first meeting.",
    whatItMeansForYou:
      "Open to depth means they let the connection set its own pace. Comfortable with both spontaneity and patience. Most secure attachment styles sit here.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  empathy: {
    termName: "Empathy",
    whatThisMeans:
      "How readily someone feels and responds to others' emotions. High empathy correlates with attentive listening and emotional repair after conflict.",
    whatItMeansForYou:
      "68% is moderate-high. Expect attuned conversations, willingness to acknowledge feelings, and interest in your inner world.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  communication: {
    termName: "Communication",
    whatThisMeans:
      "Tendency toward clear, direct expression of thoughts, needs, and boundaries — and willingness to hear the same in return.",
    whatItMeansForYou:
      "54% is mid-range. Likely a thoughtful communicator who may need explicit invitation to share harder things. Asking direct questions tends to work.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  attachment_style: {
    termName: "Attachment Style",
    whatThisMeans:
      "The pattern of how someone forms emotional bonds, drawn from attachment theory. Four styles: secure, anxious, avoidant, and disorganized — most people sit between two.",
    whatItMeansForYou:
      "Mostly Secure with Secure Leaning means this person feels safe in connection and tolerates closeness and independence well. The most resilient pairing across all attachment styles.",
    ctaLabel: "Take the Attachment assessment to see your own",
    ctaDestination: "/growth/assessments/attachment",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  connection_language: {
    termName: "Connection Language",
    whatThisMeans:
      "How someone primarily gives and receives emotional connection — informed by Chapman's Five Love Languages but extended to early connection, not just partnership.",
    whatItMeansForYou:
      "Quality Time as primary means presence matters more than performance. Phones away, real attention. Words as secondary means thoughtful messages also land.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  compatibility_overview: {
    termName: "Compatibility Overview",
    whatThisMeans:
      "How aligned the two of you are across the Big Five personality traits and shared intent. Not a prediction — a snapshot of where your styles likely meet or differ.",
    whatItMeansForYou:
      "High alignment usually means easier early conversations and fewer surface-level frictions. Lower alignment isn't a problem — it just means more to be curious about together.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  openness: {
    termName: "Openness",
    whatThisMeans:
      "How drawn someone is to new ideas, experiences, and unconventional thinking. High openness means imaginative and curious; lower means practical and grounded.",
    whatItMeansForYou:
      "Strong alignment here means similar appetites for novelty and creativity. A gap can mean one of you stretches the other into new territory — which can be a good thing or a friction point.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  conscientiousness: {
    termName: "Conscientiousness",
    whatThisMeans:
      "How organized, reliable, and goal-oriented someone is. High conscientiousness = planners and finishers; lower = flexible and spontaneous.",
    whatItMeansForYou:
      "Aligned here means matched expectations around plans, follow-through, and how structured daily life feels. Mismatched here is one of the most common sources of low-grade relationship friction.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  extraversion: {
    termName: "Extraversion",
    whatThisMeans:
      "How energized someone is by social situations versus solitude. High = recharges around people; low = recharges alone.",
    whatItMeansForYou:
      "Closely aligned scores tend to mean compatible social rhythms — same comfort level with parties, same hunger for quiet time. Big gaps require explicit negotiation about social pace.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  agreeableness: {
    termName: "Agreeableness",
    whatThisMeans:
      "How cooperative, warm, and conflict-averse someone tends to be. High = harmony-focused; lower = direct and challenging.",
    whatItMeansForYou:
      "Strong alignment here makes day-to-day interaction easier. A gap can mean one of you ends up carrying more emotional accommodation, which builds up over time if not named.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  emotional_balance: {
    termName: "Emotional Balance",
    whatThisMeans:
      "How steady someone tends to feel under stress. The inverse of trait neuroticism — higher means calmer baseline, lower means more emotionally responsive.",
    whatItMeansForYou:
      "Aligned scores tend to mean matched capacity for handling each other's harder moments. A gap means one of you may end up doing more emotional regulation work — worth knowing early.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  shared_intent: {
    termName: "Shared Intent",
    whatThisMeans:
      "How aligned the two of you are on what you're looking for from a relationship — short-term fun, partnership, casual depth, etc.",
    whatItMeansForYou:
      "Highest-impact dimension. People with aligned intent often work even when other dimensions differ. People with misaligned intent rarely work even when other dimensions match.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  differences_card: {
    termName: "Worth being curious about",
    whatThisMeans:
      "The two traits where your styles run most differently. Differences aren't problems — they're often where the most interesting parts of a relationship live.",
    whatItMeansForYou:
      "These are the dimensions where you and this person will need to be a little more intentional. They're also the dimensions where you might learn the most from each other.",
  },
};