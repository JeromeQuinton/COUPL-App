import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { NotFound } from "@/components/system/NotFound";
import { ErrorBoundary } from "@/components/system/ErrorBoundary";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "COUPL — Mindful dating" },
      {
        name: "description",
        content:
          "COUPL is a calm, psychology-informed dating app. No urgency, no scoring — meet people thoughtfully.",
      },
      { name: "author", content: "COUPL" },
      { property: "og:title", content: "COUPL — Mindful dating" },
      {
        property: "og:description",
        content: "A calm, psychology-informed way to meet people.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@COUPL" },
      { name: "twitter:title", content: "COUPL — Mindful dating" },
      { name: "description", content: "A mindful dating app focused on psychology and user agency for meaningful connections." },
      { property: "og:description", content: "A mindful dating app focused on psychology and user agency for meaningful connections." },
      { name: "twitter:description", content: "A mindful dating app focused on psychology and user agency for meaningful connections." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5d408333-e558-40be-84d5-a132eba8e26f/id-preview-bba6c186--e37ce557-fa9e-4e0b-a56e-d6f74ef12e63.lovable.app-1777066947007.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/5d408333-e558-40be-84d5-a132eba8e26f/id-preview-bba6c186--e37ce557-fa9e-4e0b-a56e-d6f74ef12e63.lovable.app-1777066947007.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorBoundary,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
