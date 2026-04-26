/**
 * Module Attune registry — ordered list of attune-able modules in the
 * /discover/[id] detail view. The wrapper <AttuneTarget/> uses these
 * keys as stable identifiers when sending an attune action.
 *
 * DR-061 (amends DR-058): Module Attune surface count is 14
 * (9 modules + 5 photos). Per DR-057, About me is not an attune-able
 * surface — editorial cards housing personal narrative are excluded.
 * DR-060 added Photo 6 (skydiving) between Differences and Date Card.
 * The former `introduction_card` entry was retired when the IntroductionCard
 * was deleted (DR-047) and identity moved to the Photo 1 hero overlay (DR-046).
 */
export type AttuneModule = { key: string; title: string };

export const ATTUNE_MODULES: AttuneModule[] = [
  { key: "relational_snapshot", title: "Relational Snapshot" },
  { key: "compatibility_overview", title: "Compatibility Overview" },
  { key: "ai_insight", title: "AI Insight" },
  { key: "differences_card", title: "Worth being curious about" },
  { key: "how_i_show_up", title: "How they show up in relationships" },
  { key: "relational_insights", title: "Relational Insights" },
  { key: "what_lights_them_up", title: "What lights them up" },
  { key: "conversation_starters", title: "Conversation Starters" },
  { key: "lifestyle_details", title: "Lifestyle & Details" },
];

export const getModuleTitle = (key: string): string =>
  ATTUNE_MODULES.find((m) => m.key === key)?.title ?? key;