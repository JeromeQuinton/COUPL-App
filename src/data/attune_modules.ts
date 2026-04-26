/**
 * Module Attune registry — ordered list of attune-able modules in the
 * /discover/[id] detail view. The wrapper <AttuneTarget/> uses these
 * keys as stable identifiers when sending an attune action.
 */
export type AttuneModule = { key: string; title: string };

export const ATTUNE_MODULES: AttuneModule[] = [
  { key: "introduction_card", title: "Introduction" },
  { key: "about_me", title: "About Me" },
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