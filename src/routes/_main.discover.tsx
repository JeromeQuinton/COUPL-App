import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_main/discover")({
  head: () => ({
    meta: [
      { title: "Discover — COUPL" },
      {
        name: "description",
        content: "Your curated daily profiles, arriving soon.",
      },
    ],
  }),
  component: DiscoverScreen,
});

function DiscoverScreen() {
  return (
    <div
      className="flex flex-col items-center justify-center px-6 text-center"
      style={{
        minHeight: "100dvh",
        paddingTop: "calc(env(safe-area-inset-top) + 2rem)",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 120px)",
        background:
          "linear-gradient(180deg, #FCEEF0 0%, #F6E7F2 35%, #EFE2F4 100%)",
      }}
    >
      <h1 className="font-display text-h1 text-plum-700">
        Feed rebuild in progress
      </h1>
      <p className="mt-3 max-w-xs font-body text-body-md text-slate">
        Your curated daily profiles will live here shortly.
      </p>
    </div>
  );
}
