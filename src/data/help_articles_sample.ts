export type HelpArticle = {
  id: string;
  title: string;
  /** ISO 8601 */
  lastUpdated: string;
  body: string;
  relatedIds: string[];
};

export const HELP_ARTICLES: HelpArticle[] = [
  {
    id: "getting-started",
    title: "Getting started",
    lastUpdated: "2026-04-12",
    body: `COUPL is built for slower dating. The product is small on purpose.\n\nYou'll see three new profiles a day on Discover. Five if you're a member. There's no swipe deck and no infinite scroll. The point is depth over volume.\n\nWhen you attune to someone and they attune back, you'll get a quiet match moment. From there, the connection is yours to shape. Take the first message slowly. The pace you set early tends to stick.\n\nIf you want help thinking about a connection, open Polaris from the thread header or from the Growth chapter. Polaris reads attunement, not achievement. It's there when you want it and silent when you don't.`,
    relatedIds: ["how-attune-works", "verifying-your-photos", "pause-vs-cancel"],
  },
  {
    id: "pause-vs-cancel",
    title: "Pause vs cancel",
    lastUpdated: "2026-04-19",
    body: `If you need a break, pause. Don't cancel.\n\nA pause keeps your profile, your connections, your reflections, and your Polaris readings. It hides you from Discover and stops new attunes from reaching you. Existing connections are told you're paused, not that you've left.\n\nA cancel is final after seven days. Inside that window you can resume and nothing's lost. After seven days the data is removed in line with our deletion policy.\n\nMost people who think they want to cancel actually want a pause. We make pause the default for that reason.`,
    relatedIds: ["getting-started", "what-we-do-with-reports"],
  },
  {
    id: "how-attune-works",
    title: "How Attune works",
    lastUpdated: "2026-03-30",
    body: `Attune is COUPL's signal of mutual interest. It's not a swipe.\n\nYou attune by reading a profile, noticing something specific, and tapping Attune. We ask for a one-line note — what you noticed. The note is part of the signal.\n\nThe other person sees nothing until they attune back. There are no read-receipts on profiles, no view counts, no ranking. We don't tell anyone they've been attuned to unless the feeling is mutual.\n\nWhen both people attune, you land on a calm match moment together. That's the only time we celebrate anything in the product.`,
    relatedIds: ["getting-started", "what-we-do-with-reports"],
  },
  {
    id: "what-we-do-with-reports",
    title: "What we do with reports",
    lastUpdated: "2026-04-25",
    body: `When you submit a report, we assess every one. The assessment usually takes minutes, not hours.\n\nThe other person is never told you reported. They don't see who raised what. If we take action on an account, we don't share that action publicly.\n\nReports stay confidential to you. You can see your reports and their status in Safety → My reports.\n\nIf something feels urgent and you're worried about your safety on a date, use Safety share to bring a trusted contact into the loop in real time. That's a separate path from reporting.`,
    relatedIds: ["pause-vs-cancel", "verifying-your-photos"],
  },
  {
    id: "verifying-your-photos",
    title: "Verifying your photos",
    lastUpdated: "2026-04-08",
    body: `We check photos automatically. The check usually completes in minutes.\n\nWhen you upload a photo, we run an automated pass to confirm it's a real face, that it matches your selfie, and that it isn't reused from somewhere else. The check is quiet — we don't review the image manually.\n\nIf something doesn't match, we'll tell you what to try next without exposing the specifics of how the check works. That keeps verification useful against people who'd otherwise game it.\n\nVerified profiles get a quiet credibility marker. Other people see that you've been checked. They don't see the photo's metadata, the verification log, or anything else.`,
    relatedIds: ["getting-started", "what-we-do-with-reports"],
  },
];

export function getArticle(id: string): HelpArticle | undefined {
  return HELP_ARTICLES.find((a) => a.id === id);
}

export function getRelated(ids: string[]): HelpArticle[] {
  return ids
    .map((id) => HELP_ARTICLES.find((a) => a.id === id))
    .filter((a): a is HelpArticle => Boolean(a));
}
