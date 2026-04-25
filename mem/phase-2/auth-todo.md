---
name: Phase 2 auth implementation
description: When Phase 2 (auth) starts, implement route guard via TanStack beforeLoad on _main layout, not a ProtectedRoute wrapper
type: feature
---
Phase 2 — implement auth via `beforeLoad` guard on `src/routes/_main.tsx` layout route. Consider renaming `_main` → `_authenticated` to follow documented TanStack convention. Do NOT use a `ProtectedRoute` component wrapper — that is React Router DOM pattern and causes a flash of protected content before redirect (see tanstack-auth-guards guidance). The `_main` layout already groups all protected routes (/home, /discover, /connections, /profile, /growth), so a single guard covers all of them. Public routes (/, /signin, /onboarding) live outside `_main` and stay unguarded.

Redirect target: `/signin` already exists — no need to create `/login`.
