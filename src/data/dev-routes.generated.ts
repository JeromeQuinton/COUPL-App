// THIS FILE IS GENERATED — DO NOT EDIT BY HAND.
// Source: scripts/gen-dev-routes.mjs (runs as prebuild).
// Override a label: add `// @dev-label: Custom Label` to the route file.
// Exclude a route from the dev surface: add `// @dev-skip`.

export type DevRouteRow = {
  label: string;
  to: string;
  params?: Record<string, string>;
};

export type DevRouteSection = {
  title: string;
  rows: DevRouteRow[];
};

export const DEV_ROUTE_SECTIONS: DevRouteSection[] = [
  {
    "title": "Home",
    "rows": [
      {
        "label": "Home",
        "to": "/home"
      },
      {
        "label": "Check in",
        "to": "/home/check-in"
      },
      {
        "label": "Coach",
        "to": "/home/coach"
      },
      {
        "label": "Reflection",
        "to": "/home/reflection"
      }
    ]
  },
  {
    "title": "Discover",
    "rows": [
      {
        "label": "Discover",
        "to": "/discover"
      },
      {
        "label": "Discover detail",
        "to": "/discover/$id",
        "params": {
          "id": "maya"
        }
      },
      {
        "label": "About",
        "to": "/discover/$id/about",
        "params": {
          "id": "maya"
        }
      },
      {
        "label": "Attuned",
        "to": "/discover/$id/attuned",
        "params": {
          "id": "maya"
        }
      },
      {
        "label": "Compatibility",
        "to": "/discover/$id/compatibility",
        "params": {
          "id": "maya"
        }
      },
      {
        "label": "Connection languages",
        "to": "/discover/$id/insights/connection-languages",
        "params": {
          "id": "maya"
        }
      },
      {
        "label": "Language detail",
        "to": "/discover/$id/language/$lensId",
        "params": {
          "id": "maya",
          "lensId": "quiet-presence"
        }
      },
      {
        "label": "Reveal",
        "to": "/discover/$id/reveal",
        "params": {
          "id": "maya"
        }
      },
      {
        "label": "Why",
        "to": "/discover/$id/why",
        "params": {
          "id": "maya"
        }
      },
      {
        "label": "Attuned with me",
        "to": "/discover/attuned-with-me"
      },
      {
        "label": "Membership prompt",
        "to": "/discover/membership-prompt"
      },
      {
        "label": "Preferences",
        "to": "/discover/preferences"
      },
      {
        "label": "Quiet day",
        "to": "/discover/quiet-day"
      },
      {
        "label": "Saved",
        "to": "/discover/saved"
      }
    ]
  },
  {
    "title": "Connections",
    "rows": [
      {
        "label": "Connections",
        "to": "/connections"
      },
      {
        "label": "Connections detail",
        "to": "/connections/$id",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Add to calendar",
        "to": "/connections/$id/add-to-calendar",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Availability",
        "to": "/connections/$id/availability",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Before meeting",
        "to": "/connections/$id/before-meeting",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Blocked confirmed",
        "to": "/connections/$id/blocked-confirmed",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Boundaries alignment",
        "to": "/connections/$id/boundaries-alignment",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Cancel plan",
        "to": "/connections/$id/cancel-plan",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Clean ending",
        "to": "/connections/$id/clean-ending",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Coach history",
        "to": "/connections/$id/coach-history",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Coach insight",
        "to": "/connections/$id/coach-insight",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Feedback",
        "to": "/connections/$id/coach-insight/feedback",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Coffee sheet",
        "to": "/connections/$id/coffee-sheet",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Connected",
        "to": "/connections/$id/connected",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Cool off",
        "to": "/connections/$id/cool-off",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Cool off active",
        "to": "/connections/$id/cool-off-active",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Counter plan",
        "to": "/connections/$id/counter-plan",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Date plan",
        "to": "/connections/$id/date-plan",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "City",
        "to": "/connections/$id/date-plan/city",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Details",
        "to": "/connections/$id/date-plan/details",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Quiz",
        "to": "/connections/$id/date-plan/quiz",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Success",
        "to": "/connections/$id/date-plan/reservation/success",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Share",
        "to": "/connections/$id/date-plan/share",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Update",
        "to": "/connections/$id/date-plan/update",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Submitted",
        "to": "/connections/$id/date-plan/update/submitted",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Date quiz",
        "to": "/connections/$id/date-quiz",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Draft pause",
        "to": "/connections/$id/draft-pause",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Draft surge",
        "to": "/connections/$id/draft-surge",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Export",
        "to": "/connections/$id/export",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "First hello",
        "to": "/connections/$id/first-hello",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Green flag",
        "to": "/connections/$id/green-flag",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Insights",
        "to": "/connections/$id/insights",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Invite",
        "to": "/connections/$id/invite",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Moments",
        "to": "/connections/$id/moments",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Notes",
        "to": "/connections/$id/notes",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Organiser",
        "to": "/connections/$id/organiser",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Plan quiz",
        "to": "/connections/$id/plan-quiz",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Plan share",
        "to": "/connections/$id/plan-share",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Plan update",
        "to": "/connections/$id/plan-update",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Propose plan",
        "to": "/connections/$id/propose-plan",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Red flag",
        "to": "/connections/$id/red-flag",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Reflection",
        "to": "/connections/$id/reflection",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Rhythm",
        "to": "/connections/$id/rhythm",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Safety share",
        "to": "/connections/$id/safety-share",
        "params": {
          "id": "ava"
        }
      },
      {
        "label": "Values overlap",
        "to": "/connections/$id/values-overlap",
        "params": {
          "id": "ava"
        }
      }
    ]
  },
  {
    "title": "Date plans",
    "rows": [
      {
        "label": "Date plans",
        "to": "/date-plans"
      },
      {
        "label": "Date plans detail",
        "to": "/date-plans/$id",
        "params": {
          "id": "london-hampstead-heath"
        }
      }
    ]
  },
  {
    "title": "Events",
    "rows": [
      {
        "label": "Events",
        "to": "/events"
      },
      {
        "label": "Events detail",
        "to": "/events/$id",
        "params": {
          "id": "demo"
        }
      },
      {
        "label": "Attendees",
        "to": "/events/$id/attendees",
        "params": {
          "id": "demo"
        }
      },
      {
        "label": "Booked",
        "to": "/events/$id/booked",
        "params": {
          "id": "demo"
        }
      },
      {
        "label": "Checkin",
        "to": "/events/$id/checkin",
        "params": {
          "id": "demo"
        }
      },
      {
        "label": "Reserve",
        "to": "/events/$id/reserve",
        "params": {
          "id": "demo"
        }
      },
      {
        "label": "Roundup",
        "to": "/events/$id/roundup",
        "params": {
          "id": "demo"
        }
      },
      {
        "label": "Waitlist",
        "to": "/events/$id/waitlist",
        "params": {
          "id": "demo"
        }
      },
      {
        "label": "Search",
        "to": "/events/search"
      }
    ]
  },
  {
    "title": "Growth",
    "rows": [
      {
        "label": "Growth",
        "to": "/growth"
      },
      {
        "label": "Growth detail",
        "to": "/growth/$id",
        "params": {
          "id": "demo"
        }
      },
      {
        "label": "Reflect",
        "to": "/growth/$id/reflect",
        "params": {
          "id": "demo"
        }
      },
      {
        "label": "Replay",
        "to": "/growth/$id/replay",
        "params": {
          "id": "demo"
        }
      },
      {
        "label": "Reserve",
        "to": "/growth/$id/reserve",
        "params": {
          "id": "demo"
        }
      },
      {
        "label": "Reserved",
        "to": "/growth/$id/reserved",
        "params": {
          "id": "demo"
        }
      },
      {
        "label": "Waitlist",
        "to": "/growth/$id/waitlist",
        "params": {
          "id": "demo"
        }
      },
      {
        "label": "Journal",
        "to": "/growth/journal"
      },
      {
        "label": "Library",
        "to": "/growth/library"
      },
      {
        "label": "Library detail",
        "to": "/growth/library/$articleId",
        "params": {
          "articleId": "presence"
        }
      },
      {
        "label": "Monthly summary",
        "to": "/growth/monthly-summary"
      },
      {
        "label": "Path",
        "to": "/growth/path"
      },
      {
        "label": "Weekly",
        "to": "/growth/weekly"
      },
      {
        "label": "Workshops",
        "to": "/growth/workshops"
      }
    ]
  },
  {
    "title": "Calendar",
    "rows": [
      {
        "label": "Calendar",
        "to": "/calendar"
      }
    ]
  },
  {
    "title": "Notifications",
    "rows": [
      {
        "label": "Notifications",
        "to": "/notifications"
      }
    ]
  },
  {
    "title": "Polaris",
    "rows": [
      {
        "label": "Polaris",
        "to": "/polaris"
      },
      {
        "label": "Polaris detail",
        "to": "/polaris/$lensId",
        "params": {
          "lensId": "quiet-presence"
        }
      },
      {
        "label": "About",
        "to": "/polaris/about"
      },
      {
        "label": "Love language",
        "to": "/polaris/love-language"
      },
      {
        "label": "Methodology",
        "to": "/polaris/methodology"
      }
    ]
  },
  {
    "title": "Coach",
    "rows": [
      {
        "label": "Coach",
        "to": "/coach"
      },
      {
        "label": "Audit log",
        "to": "/coach/audit-log"
      },
      {
        "label": "Audit log detail",
        "to": "/coach/audit-log/$entryId",
        "params": {
          "entryId": "demo"
        }
      },
      {
        "label": "History",
        "to": "/coach/history"
      },
      {
        "label": "Monthly summary",
        "to": "/coach/monthly-summary"
      },
      {
        "label": "Monthly summary detail",
        "to": "/coach/monthly-summary/$monthId",
        "params": {
          "monthId": "demo"
        }
      },
      {
        "label": "Pacing",
        "to": "/coach/pacing"
      },
      {
        "label": "Preferences",
        "to": "/coach/preferences"
      },
      {
        "label": "Weekly review",
        "to": "/coach/weekly-review"
      },
      {
        "label": "Weekly review detail",
        "to": "/coach/weekly-review/$weekId",
        "params": {
          "weekId": "demo"
        }
      }
    ]
  },
  {
    "title": "Membership",
    "rows": [
      {
        "label": "Membership",
        "to": "/membership"
      },
      {
        "label": "Plans",
        "to": "/membership/plans"
      },
      {
        "label": "Subscription",
        "to": "/membership/subscription"
      },
      {
        "label": "Cancel",
        "to": "/membership/subscription/cancel"
      },
      {
        "label": "Invoices",
        "to": "/membership/subscription/invoices"
      },
      {
        "label": "Pause",
        "to": "/membership/subscription/pause"
      },
      {
        "label": "Payment",
        "to": "/membership/subscription/payment"
      },
      {
        "label": "Upgraded",
        "to": "/membership/upgraded"
      }
    ]
  },
  {
    "title": "Profile",
    "rows": [
      {
        "label": "Profile",
        "to": "/profile"
      },
      {
        "label": "Account",
        "to": "/profile/account"
      },
      {
        "label": "2fa",
        "to": "/profile/account/2fa"
      },
      {
        "label": "Recovery codes",
        "to": "/profile/account/2fa/recovery-codes"
      },
      {
        "label": "Delete",
        "to": "/profile/account/delete"
      },
      {
        "label": "Cancel",
        "to": "/profile/account/delete/cancel"
      },
      {
        "label": "Confirm",
        "to": "/profile/account/delete/confirm"
      },
      {
        "label": "Scheduled",
        "to": "/profile/account/delete/scheduled"
      },
      {
        "label": "Email",
        "to": "/profile/account/email"
      },
      {
        "label": "Linked",
        "to": "/profile/account/linked"
      },
      {
        "label": "Password",
        "to": "/profile/account/password"
      },
      {
        "label": "Phone",
        "to": "/profile/account/phone"
      },
      {
        "label": "Sessions",
        "to": "/profile/account/sessions"
      },
      {
        "label": "Revoke",
        "to": "/profile/account/sessions/$sessionId/revoke",
        "params": {
          "sessionId": "demo"
        }
      },
      {
        "label": "Audit log",
        "to": "/profile/audit-log"
      },
      {
        "label": "Coach settings",
        "to": "/profile/coach-settings"
      },
      {
        "label": "Completeness",
        "to": "/profile/completeness"
      },
      {
        "label": "Done",
        "to": "/profile/data/done"
      },
      {
        "label": "Export",
        "to": "/profile/data/export"
      },
      {
        "label": "Complete",
        "to": "/profile/data/export/complete"
      },
      {
        "label": "Preparing",
        "to": "/profile/data/export/preparing"
      },
      {
        "label": "Start",
        "to": "/profile/data/export/start"
      },
      {
        "label": "History",
        "to": "/profile/data/exports/history"
      },
      {
        "label": "Ready",
        "to": "/profile/data/ready"
      },
      {
        "label": "Edit",
        "to": "/profile/edit"
      },
      {
        "label": "Intent",
        "to": "/profile/edit/intent"
      },
      {
        "label": "Confirm",
        "to": "/profile/edit/intent/confirm"
      },
      {
        "label": "Language",
        "to": "/profile/edit/language"
      },
      {
        "label": "Help",
        "to": "/profile/help"
      },
      {
        "label": "Help detail",
        "to": "/profile/help/$topicId",
        "params": {
          "topicId": "safety"
        }
      },
      {
        "label": "Contact",
        "to": "/profile/help/contact"
      },
      {
        "label": "Notifications",
        "to": "/profile/notifications"
      },
      {
        "label": "Notifications detail",
        "to": "/profile/notifications/$category",
        "params": {
          "category": "matches"
        }
      },
      {
        "label": "Channels",
        "to": "/profile/notifications/channels"
      },
      {
        "label": "Digest",
        "to": "/profile/notifications/digest"
      },
      {
        "label": "Pause",
        "to": "/profile/pause"
      },
      {
        "label": "Safety",
        "to": "/profile/safety"
      },
      {
        "label": "Blocked",
        "to": "/profile/safety/blocked"
      },
      {
        "label": "Cases",
        "to": "/profile/safety/cases"
      },
      {
        "label": "Cases detail",
        "to": "/profile/safety/cases/$caseId",
        "params": {
          "caseId": "demo"
        }
      },
      {
        "label": "Help",
        "to": "/profile/safety/help"
      },
      {
        "label": "Moderation",
        "to": "/profile/safety/moderation"
      },
      {
        "label": "Report",
        "to": "/profile/safety/report"
      },
      {
        "label": "Evidence",
        "to": "/profile/safety/report/$reportId/evidence",
        "params": {
          "reportId": "demo"
        }
      },
      {
        "label": "Submit",
        "to": "/profile/safety/report/submit"
      },
      {
        "label": "Reports",
        "to": "/profile/safety/reports"
      },
      {
        "label": "Transparency",
        "to": "/profile/safety/transparency"
      },
      {
        "label": "Trusted contact",
        "to": "/profile/safety/trusted-contact"
      },
      {
        "label": "Verification",
        "to": "/profile/verification"
      },
      {
        "label": "Refresh",
        "to": "/profile/verification/refresh"
      },
      {
        "label": "Visibility",
        "to": "/profile/visibility"
      }
    ]
  },
  {
    "title": "Host",
    "rows": [
      {
        "label": "Host",
        "to": "/host"
      },
      {
        "label": "Attendees",
        "to": "/host/attendees"
      },
      {
        "label": "Edit",
        "to": "/host/events/$id/edit",
        "params": {
          "id": "demo"
        }
      },
      {
        "label": "New",
        "to": "/host/new"
      },
      {
        "label": "Community",
        "to": "/host/new/community"
      },
      {
        "label": "Community detail",
        "to": "/host/new/community-detail"
      },
      {
        "label": "Community review",
        "to": "/host/new/community-review"
      },
      {
        "label": "Community room",
        "to": "/host/new/community-room"
      },
      {
        "label": "Workshop",
        "to": "/host/new/workshop"
      },
      {
        "label": "Workshop detail",
        "to": "/host/new/workshop-detail"
      },
      {
        "label": "Workshop review",
        "to": "/host/new/workshop-review"
      },
      {
        "label": "Payouts",
        "to": "/host/payouts"
      }
    ]
  },
  {
    "title": "Video",
    "rows": [
      {
        "label": "Permissions",
        "to": "/video/permissions"
      },
      {
        "label": "Pre meet detail",
        "to": "/video/pre-meet/$connectionId",
        "params": {
          "connectionId": "ava"
        }
      },
      {
        "label": "Active",
        "to": "/video/pre-meet/$connectionId/active",
        "params": {
          "connectionId": "ava"
        }
      },
      {
        "label": "Ended",
        "to": "/video/pre-meet/$connectionId/ended",
        "params": {
          "connectionId": "ava"
        }
      },
      {
        "label": "Incoming",
        "to": "/video/pre-meet/$connectionId/incoming",
        "params": {
          "connectionId": "ava"
        }
      },
      {
        "label": "Workshop detail",
        "to": "/video/workshop/$workshopId",
        "params": {
          "workshopId": "demo"
        }
      },
      {
        "label": "Ended",
        "to": "/video/workshop/$workshopId/ended",
        "params": {
          "workshopId": "demo"
        }
      },
      {
        "label": "Live",
        "to": "/video/workshop/$workshopId/live",
        "params": {
          "workshopId": "demo"
        }
      }
    ]
  },
  {
    "title": "Onboarding",
    "rows": [
      {
        "label": "Onboarding",
        "to": "/onboarding"
      },
      {
        "label": "Onboarding detail",
        "to": "/onboarding/$step",
        "params": {
          "step": "demo"
        }
      },
      {
        "label": "Capacity",
        "to": "/onboarding/capacity"
      },
      {
        "label": "Checks",
        "to": "/onboarding/checks"
      },
      {
        "label": "Id scan",
        "to": "/onboarding/checks/id-scan"
      },
      {
        "label": "Id select",
        "to": "/onboarding/checks/id-select"
      },
      {
        "label": "Review",
        "to": "/onboarding/checks/licence/review"
      },
      {
        "label": "Scan",
        "to": "/onboarding/checks/licence/scan"
      },
      {
        "label": "Liveness",
        "to": "/onboarding/checks/liveness"
      },
      {
        "label": "Help",
        "to": "/onboarding/checks/liveness/help"
      },
      {
        "label": "Review",
        "to": "/onboarding/checks/passport/review"
      },
      {
        "label": "Scan",
        "to": "/onboarding/checks/passport/scan"
      },
      {
        "label": "Redaction review",
        "to": "/onboarding/checks/redaction-review"
      },
      {
        "label": "Complete",
        "to": "/onboarding/complete"
      },
      {
        "label": "Discover lifestyle",
        "to": "/onboarding/discover-lifestyle"
      },
      {
        "label": "Discover refresh",
        "to": "/onboarding/discover-refresh"
      },
      {
        "label": "Error",
        "to": "/onboarding/error"
      },
      {
        "label": "Identity",
        "to": "/onboarding/identity"
      },
      {
        "label": "Intent",
        "to": "/onboarding/intent"
      },
      {
        "label": "Next",
        "to": "/onboarding/intent/next"
      },
      {
        "label": "Interests",
        "to": "/onboarding/interests"
      },
      {
        "label": "Refresh",
        "to": "/onboarding/interests/refresh"
      },
      {
        "label": "Lifestyle",
        "to": "/onboarding/lifestyle"
      },
      {
        "label": "Love language",
        "to": "/onboarding/love-language"
      },
      {
        "label": "Name",
        "to": "/onboarding/name"
      },
      {
        "label": "Pace",
        "to": "/onboarding/pace"
      },
      {
        "label": "Paused",
        "to": "/onboarding/paused"
      },
      {
        "label": "Photo review",
        "to": "/onboarding/photo-review"
      },
      {
        "label": "Photos",
        "to": "/onboarding/photos"
      },
      {
        "label": "Saved",
        "to": "/onboarding/photos/saved"
      },
      {
        "label": "Prompts",
        "to": "/onboarding/prompts"
      },
      {
        "label": "Resume",
        "to": "/onboarding/resume"
      },
      {
        "label": "Review",
        "to": "/onboarding/review"
      },
      {
        "label": "Values",
        "to": "/onboarding/values"
      },
      {
        "label": "Verify",
        "to": "/onboarding/verify"
      }
    ]
  },
  {
    "title": "Auth",
    "rows": [
      {
        "label": "Recover",
        "to": "/auth/recover"
      },
      {
        "label": "Sign in",
        "to": "/auth/sign-in"
      },
      {
        "label": "Sign up",
        "to": "/auth/sign-up"
      },
      {
        "label": "Verify email",
        "to": "/auth/verify-email"
      },
      {
        "label": "Verify phone",
        "to": "/auth/verify-phone"
      },
      {
        "label": "Signin",
        "to": "/signin"
      }
    ]
  },
  {
    "title": "System",
    "rows": [
      {
        "label": "Offline",
        "to": "/system/offline"
      },
      {
        "label": "Push permissions",
        "to": "/system/push-permissions"
      },
      {
        "label": "Verification failed",
        "to": "/system/verification-failed"
      }
    ]
  },
  {
    "title": "Marketing",
    "rows": [
      {
        "label": "Home",
        "to": "/"
      },
      {
        "label": "About",
        "to": "/about"
      },
      {
        "label": "Community guidelines",
        "to": "/community-guidelines"
      },
      {
        "label": "Founder",
        "to": "/founder"
      },
      {
        "label": "Press",
        "to": "/press"
      },
      {
        "label": "Privacy",
        "to": "/privacy"
      },
      {
        "label": "Terms",
        "to": "/terms"
      }
    ]
  },
  {
    "title": "Misc",
    "rows": [
      {
        "label": "Welcome back",
        "to": "/welcome-back"
      }
    ]
  }
];
