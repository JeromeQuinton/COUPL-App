/**
 * Safety surface fixtures — used by R3-01 (evidence), R3-02 (cases),
 * R3-03 (case detail), R3-08 (transparency report).
 *
 * Phase 1 fixtures only. Phase 4 reads `safety_cases`, `report_evidence`,
 * and `safety_transparency_quarterly` from Supabase.
 */

export type EvidenceKind = "screenshot" | "excerpt" | "voice";

export type ReportEvidence = {
  id: string;
  kind: EvidenceKind;
  label: string;
  capturedAt: string;
};

export const SAMPLE_REPORT_EVIDENCE: ReportEvidence[] = [];

export type CaseStatus = "raised" | "reviewing" | "decided";

export type SafetyCase = {
  id: string;
  pseudonym: string;
  raisedRelative: string;
  status: CaseStatus;
  category: string;
};

export const SAMPLE_USER_CASES: SafetyCase[] = [
  {
    id: "c-2024-04-12",
    pseudonym: "Sam",
    raisedRelative: "about 2 days ago",
    status: "reviewing",
    category: "Repeated unwanted messages",
  },
  {
    id: "c-2024-03-30",
    pseudonym: "River",
    raisedRelative: "last week",
    status: "decided",
    category: "Profile impersonation",
  },
  {
    id: "c-2024-02-18",
    pseudonym: "Alex",
    raisedRelative: "about 6 weeks ago",
    status: "decided",
    category: "Aggressive language after a date",
  },
];

export type CaseTimelineEvent = {
  id: string;
  label: string;
  detail: string;
  timestamp: string;
};

export type CaseDecision =
  | { kind: "action"; copy: string }
  | { kind: "no-action"; copy: string }
  | { kind: "constrained"; copy: string };

export type CaseDetail = {
  id: string;
  pseudonym: string;
  category: string;
  status: CaseStatus;
  timeline: CaseTimelineEvent[];
  decision?: CaseDecision;
};

export const SAMPLE_CASE_DETAILS: Record<string, CaseDetail> = {
  "c-2024-04-12": {
    id: "c-2024-04-12",
    pseudonym: "Sam",
    category: "Repeated unwanted messages",
    status: "reviewing",
    timeline: [
      {
        id: "received",
        label: "Report received",
        detail: "Your report came through to us at 14:08 on 12 April.",
        timestamp: "12 April · 14:08",
      },
      {
        id: "review-started",
        label: "Initial review started",
        detail:
          "A member of the safety team has read your report and the messages you shared.",
        timestamp: "13 April · 09:12",
      },
    ],
  },
  "c-2024-03-30": {
    id: "c-2024-03-30",
    pseudonym: "River",
    category: "Profile impersonation",
    status: "decided",
    timeline: [
      {
        id: "received",
        label: "Report received",
        detail: "Your report came through to us at 21:40 on 30 March.",
        timestamp: "30 March · 21:40",
      },
      {
        id: "review-started",
        label: "Initial review started",
        detail:
          "A member of the safety team has read your report and the messages you shared.",
        timestamp: "31 March · 08:55",
      },
      {
        id: "decided",
        label: "Decision made",
        detail:
          "We removed this account for breaking our rules on profile impersonation.",
        timestamp: "2 April · 16:22",
      },
    ],
    decision: {
      kind: "action",
      copy: "We removed this account for breaking our rules on profile impersonation.",
    },
  },
  "c-2024-02-18": {
    id: "c-2024-02-18",
    pseudonym: "Alex",
    category: "Aggressive language after a date",
    status: "decided",
    timeline: [
      {
        id: "received",
        label: "Report received",
        detail: "Your report came through to us at 19:14 on 18 February.",
        timestamp: "18 February · 19:14",
      },
      {
        id: "review-started",
        label: "Initial review started",
        detail:
          "A member of the safety team has read your report and the messages you shared.",
        timestamp: "19 February · 10:02",
      },
      {
        id: "decided",
        label: "Decision made",
        detail:
          "We did not find enough evidence to act on this report. If you continue to feel uncomfortable, you can block this member at any time.",
        timestamp: "21 February · 15:48",
      },
    ],
    decision: {
      kind: "no-action",
      copy: "We did not find enough evidence to act on this report. If you continue to feel uncomfortable, you can block this member at any time.",
    },
  },
};

export type TransparencyQuarter = {
  period: string;
  overview: string[];
  numbers: { value: string; label: string }[];
  whatThisMeans: string;
  appeals?: { reviewed: number; reversed: number };
};

export const SAMPLE_TRANSPARENCY_QUARTER: TransparencyQuarter = {
  period: "January–March 2026",
  overview: [
    "From January to March 2026, we removed 142 accounts for breaking our rules on abuse and harassment. Most of these removals started from reports sent by members; some came from automated checks.",
    "Compared with the previous quarter, the volume of reports reviewed rose by about a fifth, while the share that resulted in account removal stayed roughly steady.",
  ],
  numbers: [
    { value: "142", label: "accounts removed" },
    { value: "318", label: "reports reviewed" },
    { value: "39 hours", label: "average time to a decision" },
  ],
  whatThisMeans:
    "If you've reported someone, your case sits inside this number. If you've been on COUPL through this quarter, the work shown here is the day-to-day attention the safety team has been paying.",
  appeals: { reviewed: 27, reversed: 4 },
};
