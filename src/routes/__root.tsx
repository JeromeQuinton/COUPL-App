import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

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
  notFoundComponent: NotFoundComponent,
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
