// src/types/domain.ts
//
// COUPL — canonical entity model.
// Single source of truth. Phase 4 Supabase migrations derive from this.
//
// Last reconciled: 2026-05-04.
// Reviewer: Jerome (do not merge until reviewed).
//
// Conventions:
// - IDs use the `ID` brand-friendly alias (string today, brandable later).
// - Dates use `ISODate` (YYYY-MM-DD) or `ISODateTime` (RFC 3339 / toISOString()).
// - Where the codebase has used divergent names for the same field, the
//   canonical choice + rationale is noted inline as `// Reconciled: ...`.
// - Where a type is `// INFERRED — source incomplete`, the existing route
//   was scaffolded ahead of full data; revisit when the surface lands real.
//
// What this file is NOT:
// - SQL / Supabase schema (Phase 4 work — derived from this).
// - Code refactor — this is a contract, the existing sample data still
//   lives in `src/data/*`. Migration to match this contract is a separate pass.
// - DR records or audit log records — those live in `src/types/meta.ts`
//   if/when needed (kept out of `domain.ts` to avoid mixing project-management
//   artefacts with app entities).

// =============================================================================
// PRIMITIVES
// =============================================================================

/** Stable identifier. Brandable later (`type ID = string & { __id: true }`). */
export type ID = string;

/** Calendar date with no time component. Format: `YYYY-MM-DD`. */
export type ISODate = string;

/** Date + time with timezone. Format: RFC 3339 (`new Date().toISOString()`). */
export type ISODateTime = string;

/** A `from` direction in any conversational artefact. */
export type FromDirection = "me" | "them";

/** Avatar tint — drives the linear-gradient colour ramp. */
export type Hue = "lavender" | "blush" | "beeswax" | "plum";

// =============================================================================
// USER + PROFILE
// =============================================================================

/**
 * A registered COUPL user. One row per signed-up human. Created at sign-up,
 * before onboarding completes.
 */
export type User = {
  id: ID;
  /** Auth identifier — email or phone, whichever the user signed up with. */
  authIdentifier: string;
  authChannel: "email" | "phone";
  createdAt: ISODateTime;
  /** True once the multi-step onboarding wizard completes. */
  onboardingCompleteAt?: ISODateTime;
  /** Membership tier — Phase 4 reads from `subscriptions` table. */
  membershipTier: "free" | "premium";
};

/**
 * The visible-to-others profile. Created during onboarding, edited via
 * `/profile/edit`. Distinct from `User` because a user may exist before
 * the profile is complete enough to surface in Discover.
 */
export type Profile = {
  id: ID;
  userId: ID;
  name: string;
  age: number;
  city: string;
  region: string;
  /** First letter of name — drives avatar fallback. */
  initial: string;
  hue: Hue;
  verified: boolean;
  /** Pacing preference (DR-023 v2). */
  pacing: PacingValue;
  intent: { primary: string; relationshipStyle: string };
  /** About paragraph displayed on `/discover/$id`. */
  about?: string;
  /** Free-form prompts answered during onboarding. */
  prompts: { id: ID; question: string; answer: string }[];
  photos: Photo[];
  connectionLanguages: ConnectionLanguageReading[];
  trustScore: number; // 0–100, identity + integrity composite.
  // Reconciled: `name` (not `firstName`) — used consistently across `FeedProfile`,
  // `ProfileDetail`, and `ConnectionSummary`.
};

/** Source: `discover_profile_detail_sample.PACING_VALUES`. */
export type PacingValue = "fast" | "considered" | "slow" | "let-it-unfold" | "decisive";

export type Photo = {
  id: ID;
  /** Storage URL. Phase 1 uses placeholder strings; Phase 4 → Supabase Storage. */
  src: string;
  /** 1-based slot ordering. */
  slot: number;
  /** Hue tint used when no real image (Phase 1 placeholder). */
  hue?: Hue;
  alt?: string;
};

/** Tagged "connection language" surfaced on a profile (e.g. "Anchored attention"). */
export type ConnectionLanguageReading = {
  lensId: ID;
  label: string;
  alignment: "Strongly Aligned" | "Well Aligned" | "Aligned" | "Early Signal";
};

// =============================================================================
// CONNECTION LAYER
// =============================================================================

/**
 * A bidirectional relationship between two users. Created on mutual attune.
 * Source: `connections_sample.ConnectionSummary`.
 */
export type Connection = {
  id: ID;
  userId: ID;
  otherUserId: ID;
  state: ConnectionState;
  createdAt: ISODateTime;
  /** Day-counter label rendered on connection cards (e.g. "Day 6 of 14"). */
  dayLabel: string;
  /** "Connected 2 days ago" / "Attuned a week ago". Editorial, not numeric. */
  daysAgoLabel: string;
  /** Last interaction relative label ("now", "2h", "yesterday"). */
  lastTouch: string;
  /** Most recent message preview shown in the connections list. */
  preview: string;
  meta?: string; // optional secondary line, e.g. "IRL planned"
  cooloffNote?: string;
  // Reconciled: `lastTouch` (not `lastInteraction` or `lastSeen`) — matches
  // existing `ConnectionSummary`. Most-recently-modified file: connections_sample.ts.
};

export type ConnectionState = "active" | "cool-off" | "closed";

/** Discriminated union — every variant of in-thread content. */
export type ThreadMessage =
  | { kind: "msg"; from: FromDirection; text: string; time?: string; read?: boolean }
  | { kind: "photo"; from: FromDirection; src: string; caption?: string; time?: string; read?: boolean }
  | { kind: "voice"; from: FromDirection; durationSeconds: number; time?: string; read?: boolean }
  | { kind: "time"; label: string }
  | { kind: "coach"; title: string; body: string }
  | { kind: "plan_invite"; id: ID; from: FromDirection; when: string; where: string; notes?: string;
      status: "proposed" | "accepted" | "declined" | "countered";
      planSourceId?: ID; replacesInviteId?: ID };

/** In-thread coach insight card from Polaris. */
export type CoachInsight = {
  id: ID;
  connectionId: ID;
  title: string;
  body: string;
  surfacedAt: ISODateTime;
  dismissedAt?: ISODateTime;
};

/** Plan proposed inside a thread. Resolves to a `DateBooking` once accepted. */
export type PlanInvite = {
  id: ID;
  connectionId: ID;
  proposedBy: ID; // userId
  when: string; // human-readable, e.g. "Saturday 16 May, 7pm"
  where: string;
  notes?: string;
  status: "proposed" | "accepted" | "declined" | "countered";
  /** Optional FK to a `CityDatePlan` template. */
  planSourceId?: ID;
  /** When countering, the original invite's id. */
  replacesInviteId?: ID;
};

/** Private post-date reflection. Visible only to the author. */
export type Reflection = {
  id: ID;
  userId: ID;
  connectionId?: ID;
  /** ISO date of the experience being reflected on. */
  forDate: ISODate;
  bodyState?: "steady" | "warm" | "activated" | "depleted";
  whatShifted?: string;
  oneThingToNotice?: string;
  createdAt: ISODateTime;
};

// =============================================================================
// DISCOVER
// =============================================================================

/**
 * One profile presented in the daily Discover feed. Materialised per-day
 * per-user (3/day free, 5/day premium). Source: `discover_feed_sample.FeedProfile`.
 */
export type DiscoverIssue = {
  id: ID;
  userId: ID;
  profileId: ID;
  surfacedOn: ISODate;
  /** Editorial alignment band (NEVER rendered as a number). */
  alignment: "Strongly Aligned" | "Well Aligned" | "Aligned" | "Early Signal";
  /** One-line "what we noticed" copy. */
  observation: string;
  /** Internal 0–100 score — never rendered. */
  bandValue: number;
};

/**
 * The action of attuning to a profile, plus the noticing note. Mutual attunes
 * promote to a `Connection`.
 */
export type AttuneSignal = {
  id: ID;
  fromUserId: ID;
  toProfileId: ID;
  note: string; // "what you noticed"
  createdAt: ISODateTime;
  /** Set when the other party also attunes. */
  mutualAt?: ISODateTime;
};

/**
 * Per-pair compatibility breakdown across five lenses. Hand-shaped Phase 1;
 * Phase 4 derives from `compatibility_signals` table.
 */
export type CompatibilityReading = {
  forUserId: ID;
  otherProfileId: ID;
  lenses: { id: "pace" | "presence" | "values" | "lifestyle" | "communication";
            label: string; summary: string; expanded: string }[];
};

/** Bookmark. Source: `src/lib/saved-profiles.ts`. */
export type SavedProfile = {
  userId: ID;
  profileId: ID;
  savedAt: ISODateTime;
};

/** Daily attune throttle state. Source: `src/hooks/use-daily-attune-count.ts`. */
export type DailyAttuneCount = {
  userId: ID;
  date: ISODate;
  count: number;
};

// =============================================================================
// GROWTH
// =============================================================================

/** Practitioner-led group session. Source: `growth_sample.WorkshopSummary`. */
export type Workshop = {
  id: ID;
  title: string;
  blurb: string;
  topicSlug: string; // e.g. "conflict-repair", "attachment", "pace"
  sessionCount: number;
  startsLabel: string;
  startsAt: ISODateTime;
  endedAt?: ISODateTime;
  format: string;
  practitioner: string;
  practitionerCredential: string;
  practitionerInitial: string;
  practitionerBio: string;
  swatch: string; // CSS gradient
  sessions: { index: number; title: string }[];
  /** Phase 4 added — replay assets. */
  replayAudioUrl?: string;
  transcriptMd?: string;
  practitionerNotesMd?: string;
};

export type WorkshopBooking = {
  id: ID;
  userId: ID;
  workshopId: ID;
  bookedAt: ISODateTime;
  cancelledAt?: ISODateTime;
};

/**
 * Anything saved to the user's growth journal — workshop reflections,
 * weekly check-ins, free-form entries, saved readings.
 */
export type JournalEntry = {
  id: ID;
  userId: ID;
  entryType: "free" | "workshop_reflection" | "weekly_checkin" | "reading_save"
           | "workshop_replay_note";
  pinned?: boolean;
  /** FK to source — type depends on `entryType`. */
  workshopId?: ID;
  articleId?: ID;
  /** Ordered tags for filtering (topic slugs). */
  tags?: string[];
  bodyMd: string;
  createdAt: ISODateTime;
};

/** Three-question check-in. Source: `_main.growth.weekly.tsx`. */
export type WeeklyCheckIn = {
  id: ID;
  userId: ID;
  whenIso: ISODateTime;
  whatShifted?: string;
  bodyState?: "steady" | "warm" | "activated" | "depleted";
  oneThingToNotice?: string;
};

/**
 * Snapshot of attachment-health signals. Computed weekly. Source:
 * `_main.polaris.tsx`.
 */
export type PolarisReading = {
  userId: ID;
  forWeekStart: ISODate;
  pace30: number[]; // 30-day daily pace metric (internal scale)
  attunement: { lensId: ID; label: string; level: "low" | "steady" | "high" }[];
  capacity: { current: string; typical: string };
  repairLine: string;
  // INFERRED — surface scaffolded ahead of real signal pipeline.
};

/** Curated long-form. Source: new growth library work in Stream 16. */
export type GrowthArticle = {
  id: ID;
  slug: string;
  title: string;
  kind: "essay" | "practice" | "research";
  readingMinutes: number;
  excerpt: string;
  bodyMd: string;
  publishedAt: ISODateTime;
  tags: string[];
};

// =============================================================================
// EVENTS + HOSTING
// =============================================================================

/**
 * A hosted gathering — workshop external, hosted dinner, community room
 * meeting, COUPL-only Speed Dating. Source: `events_sample.EventSummary`.
 */
export type Event = {
  id: ID;
  type: "workshop" | "speed_dating" | "community_room" | "hosted_event";
  title: string;
  hostUserId: ID;
  hostBio: string;
  startsAt: ISODateTime;
  endedAt?: ISODateTime;
  timeRange: string;
  neighborhood: string;
  venue: string;
  address: string;
  walkNote: string;
  ageRange: string;
  /** Display string ("£48 / sliding"). */
  priceLabel: string;
  /** Numeric capacity for gating + payouts. */
  capacity: number;
  capacityLabel: string; // "2 of 6 left"
  // Reconciled: hosts are users (`hostUserId`), not free-text — practitioners
  // are real humans with profiles.
};

export type EventReservation = {
  id: ID;
  eventId: ID;
  userId: ID;
  status: "pending" | "paid" | "refunded";
  reservedAt: ISODateTime;
  paidAmount?: number;
  refundedAt?: ISODateTime;
};

/** Anything a host has created — workshop, room, event, all under one umbrella. */
export type HostedItem = {
  id: ID;
  hostUserId: ID;
  kind: "workshop" | "community_room" | "hosted_event";
  /** FK to the underlying record. */
  refId: ID;
  status: "draft" | "published" | "completed" | "cancelled";
  createdAt: ISODateTime;
};

// =============================================================================
// SAFETY + TRUST
// =============================================================================

export type Report = {
  id: ID;
  fromUserId: ID;
  /** Who or what is being reported. */
  subject: { kind: "user" | "message"; id: ID };
  category: "harassment" | "spam" | "impersonation" | "unsafe_behaviour" | "other";
  description: string;
  /** URLs of uploaded screenshots; never displayed publicly. */
  evidence: string[];
  anonymous: boolean;
  status: "received" | "reviewing" | "actioned" | "closed";
  createdAt: ISODateTime;
};

export type BlockedAccount = {
  id: ID;
  byUserId: ID;
  blockedUserId: ID;
  blockedAt: ISODateTime;
  /** True after the 7-day reversal window expires. */
  permanent: boolean;
};

/** Safety contact who gets pinged on share. Source: `src/lib/trusted-contacts.ts`. */
export type TrustedContact = {
  id: ID;
  ownerUserId: ID;
  name: string;
  channel: "phone" | "email";
  contact: string; // raw value — masked at display time
  createdAt: ISODateTime;
};

/** Verification check status row. Source: `_main.profile.verification.tsx`. */
export type VerificationCheck = {
  userId: ID;
  kind: "photo" | "id" | "selfie" | "social";
  status: "verified" | "pending" | "failed" | "not-started";
  verifiedAt?: ISODateTime;
  /** User-facing failure message — never exposes detection method. */
  failedCopy?: string;
};

/** 24h cooling-off state. Source: `_main.connections.$id_.cool-off-active.tsx`. */
export type CoolOff = {
  id: ID;
  connectionId: ID;
  startedAt: ISODateTime;
  endsAt: ISODateTime;
  resolution?: "released" | "blocked" | "auto-ended" | "one-message-sent";
};

// =============================================================================
// MEMBERSHIP + COMMERCE
// =============================================================================

export type Membership = {
  userId: ID;
  tier: "free" | "premium";
  startedAt: ISODateTime;
};

/** Active paid subscription record. Phase 4 wires Stripe. */
export type Subscription = {
  id: ID;
  userId: ID;
  status: "active" | "paused" | "cancelled";
  cadence: "monthly" | "annual";
  currency: "GBP" | "USD" | "EUR";
  amountMinor: number; // pence/cents — never expose as float.
  nextBillAt?: ISODateTime;
  pausedUntil?: ISODateTime;
  cancelledAt?: ISODateTime;
};

// =============================================================================
// CALENDAR + PLANS
// =============================================================================

/** Unified calendar row — plans, workshops, events. Source: `calendar_sample.ts`. */
export type CalendarItem = {
  id: ID;
  userId: ID;
  type: "date-plan" | "workshop" | "event";
  start: ISODateTime;
  end?: ISODateTime;
  title: string;
  whereLabel: string;
  withWhom: string;
  /** Discriminated href so callers can route without a switch. */
  href:
    | { route: "/connections/$id/date-plan"; id: ID }
    | { route: "/growth/$id"; id: ID }
    | { route: "/events/$id"; id: ID };
};

/** Curated date-idea template. Source: `cityDatePlans.ts`. */
export type CityDatePlan = {
  id: ID;
  city: "London";
  title: string;
  category: "walks" | "coffees" | "slow-lunches" | "evening-readings" | "galleries";
  venue: string;
  area: string;
  durationMin: number;
  whyItWorks: string;
  notes?: string;
};

// =============================================================================
// NOTIFICATIONS + ACTIVITY
// =============================================================================

export type NotificationItem = {
  id: ID;
  userId: ID;
  initial: string;
  hue: Hue;
  message: string;
  detail?: string;
  occurredAt: ISODateTime;
  /** Where tapping the row routes to. */
  to:
    | { route: "/connections/$id"; id: ID }
    | { route: "/connections/$id/connected"; id: ID }
    | { route: "/connections/$id/date-plan"; id: ID }
    | { route: "/coach" }
    | { route: "/growth/$id"; id: ID };
  readAt?: ISODateTime;
};

// =============================================================================
// HELP + META (kept here because user-facing; DR + AuditLog live in meta.ts)
// =============================================================================

/** Help article. Source: `help_articles_sample.ts`. */
export type HelpArticle = {
  id: ID;
  title: string;
  lastUpdated: ISODate;
  bodyMd: string;
  relatedIds: ID[];
};

// =============================================================================
// MIGRATION NOTES
// =============================================================================
//
// Where existing code DIVERGES from this contract and needs patching:
//
// 1. `ConnectionSummary` (connections_sample.ts) does not carry `userId` /
//    `otherUserId` — Phase 1 fixtures are single-tenant. When Supabase lands,
//    add both FK columns.
//
// 2. `FeedProfile` (discover_feed_sample.ts) carries `bandValue: number` and
//    `band: AlignmentBand`. Domain unifies under `DiscoverIssue.alignment` +
//    `bandValue`. The display layer must continue to NEVER render `bandValue`.
//
// 3. `ThreadMessage.time?: string` is an editorial label ("11:02AM"), not a
//    timestamp. Domain leaves this as `time?: string` for back-compat but
//    Phase 4 should add a separate `occurredAt: ISODateTime` and derive `time`
//    at render. Track as DR-NEXT.
//
// 4. `PlanInvite` exists in TWO shapes today:
//    a) inline as a `ThreadMessage` discriminant (rendering convenience), and
//    b) standalone (this contract).
//    Phase 4: keep both — the message variant is a render-time view; the
//    canonical record is the standalone PlanInvite. The thread message stores
//    only the planInviteId and de-references at render.
//
// 5. `Workshop` adds `replayAudioUrl`, `transcriptMd`, `practitionerNotesMd`
//    (Stream 16-3 spec). These are not yet on `WorkshopSummary` in
//    `growth_sample.ts` — Phase 4 migration adds the columns.
//
// 6. `JournalEntry.entryType` introduces three new enum values from Stream 16:
//    `workshop_reflection`, `reading_save`, `workshop_replay_note`. Existing
//    journal data only has `free` and `weekly_checkin`. Worth a DR after the
//    Stream 16 diffs land — meaningful expansion of how journal data accumulates.
//
// 7. `Event` reconciles `host` (string) and `hostInitial` (string) from
//    `EventSummary` into `hostUserId: ID` + a derived display layer. This is
//    a real refactor, not a rename — the display components currently consume
//    `host`/`hostInitial` directly.
//
// 8. `BlockedAccount.permanent` is a derived flag (true after 7 days). Phase 4
//    can compute on read; no separate write needed.
//
// 9. `Report.evidence` carries URLs that must be ACL-protected behind
//    Supabase Row-Level Security in Phase 4 — they should never be public.
//
// 10. `PolarisReading` is the most-INFERRED type in this file. Marked
//     accordingly. The signal pipeline behind it doesn't exist yet — Phase 4
//     work to derive from connections + reflections + thread metadata.
//
// 11. The Polaris persona has been collapsed (Liora + Signal → Polaris). All
//     coach surfaces use Polaris. Workshop practitioners (e.g. Lena Park) are
//     real humans, NOT Polaris. The contract reflects this — `Workshop.practitioner`
//     is a real person; `CoachInsight` is Polaris-authored.
//
// END.
