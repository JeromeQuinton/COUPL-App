/**
 * Trait differences copy registry.
 *
 * Per-trait, directional explanation paragraphs surfaced in
 * <DifferencesCard/>. Keyed by the same trait keys used in the
 * Compatibility Overview (`openness`, `conscientiousness`,
 * `extraversion`, `agreeableness`, `emotionalBalance`, `sharedIntent`).
 *
 * `whenViewerHigher` — viewer's raw score > profile's raw score.
 * `whenProfileHigher` — profile's raw score >= viewer's raw score.
 *
 * All copy is V0 PLACEHOLDER pending psych advisor sign-off (DR-015).
 * Do not surface as canonical product copy yet.
 */
export interface TraitDifferenceCopy {
  whenViewerHigher: string;
  whenProfileHigher: string;
}

export const TRAIT_DIFFERENCES_COPY: Record<string, TraitDifferenceCopy> = {
  // V0 PLACEHOLDER — needs psych advisor sign-off
  openness: {
    whenViewerHigher:
      "You tend to reach for the new and unconventional more readily than they do. They may bring grounding to your ideas — worth seeing what shape that takes.",
    whenProfileHigher:
      "They tend to reach for the new and unconventional more readily than you. They may pull you somewhere unexpected — worth seeing where that goes.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  conscientiousness: {
    whenViewerHigher:
      "You're more drawn to plans and structure than they are. They may be more flexible with how things unfold — worth asking how they like to make plans.",
    whenProfileHigher:
      "They're more drawn to plans and structure than you are. They may want clearer commitments earlier — worth checking what feels right.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  extraversion: {
    whenViewerHigher:
      "You tend to recharge around people more than they do. They may need more solo time than your default — worth asking what their ideal week looks like.",
    whenProfileHigher:
      "They tend to recharge around people more than you do. They may want more shared social time than your default — worth being clear about your own pace.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  agreeableness: {
    whenViewerHigher:
      "You lean a bit more toward harmony in early conversation than they do. They may be more direct than you'd default to — that's data, not friction.",
    whenProfileHigher:
      "They lean a bit more toward harmony in early conversation than you do. Being a touch more gentle than usual may help them feel safe to be direct.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  emotionalBalance: {
    whenViewerHigher:
      "You tend to feel steadier under stress than they do. They may need more space to feel things out loud — worth knowing your own capacity to hold that.",
    whenProfileHigher:
      "They tend to feel steadier under stress than you do. They may be a calm presence when things get hard — worth letting them know what helps you most.",
  },
  // V0 PLACEHOLDER — needs psych advisor sign-off
  sharedIntent: {
    whenViewerHigher:
      "Your sense of what you're looking for is slightly firmer than theirs right now. Worth a real conversation about where you each are.",
    whenProfileHigher:
      "Their sense of what they're looking for is slightly firmer than yours right now. Worth a real conversation about where you each are.",
  },
};
