/**
 * Verification fixtures — used by R3-34 (passport review), R3-36
 * (licence review), R3-37 (per-field redaction toggle, DR-096).
 *
 * Phase 4 wires to whichever vendor lands (Onfido / Persona / Stripe
 * Identity / Yoti / Veriff / Sumsub). Retention copy is gated on
 * DR-097 (vendor integration privacy) and uses the conservative
 * placeholder until the architecture review confirms it.
 */

export type DocumentType = "passport" | "licence" | "national-id";

export type FieldRequirement = "required" | "optional";

export type RedactedField = {
  id: string;
  label: string;
  requirement: FieldRequirement;
  explainer: string;
  defaultOn: boolean;
};

// DR-096: Required fields are locked on. Optional fields are toggleable.
export const REDACTED_FIELDS: Record<DocumentType, RedactedField[]> = {
  passport: [
    {
      id: "name",
      label: "Name",
      requirement: "required",
      explainer: "Shared with our verification provider to confirm who you are.",
      defaultOn: true,
    },
    {
      id: "photo",
      label: "Photo",
      requirement: "required",
      explainer: "Used to match against your liveness selfie.",
      defaultOn: true,
    },
    {
      id: "date-of-birth",
      label: "Date of birth",
      requirement: "optional",
      explainer:
        "Optional — used only to confirm you're 18 or over. If off, we'll ask you to confirm separately.",
      defaultOn: true,
    },
    {
      id: "document-number",
      label: "Document number",
      requirement: "optional",
      explainer:
        "Optional — helps the provider check the document is genuine. If off, the provider may take longer to decide.",
      defaultOn: false,
    },
    {
      id: "expiry-date",
      label: "Expiry date",
      requirement: "optional",
      explainer: "Optional — to confirm the document hasn't expired.",
      defaultOn: true,
    },
  ],
  licence: [
    {
      id: "name",
      label: "Name",
      requirement: "required",
      explainer: "Shared with our verification provider to confirm who you are.",
      defaultOn: true,
    },
    {
      id: "photo",
      label: "Photo",
      requirement: "required",
      explainer: "Used to match against your liveness selfie.",
      defaultOn: true,
    },
    {
      id: "date-of-birth",
      label: "Date of birth",
      requirement: "optional",
      explainer:
        "Optional — used only to confirm you're 18 or over. If off, we'll ask you to confirm separately.",
      defaultOn: true,
    },
    {
      id: "address",
      label: "Address",
      requirement: "optional",
      explainer:
        "Optional — used only if the provider needs an address check. If off, address stays blurred on the image we send.",
      defaultOn: false,
    },
    {
      id: "document-number",
      label: "Licence number",
      requirement: "optional",
      explainer: "Optional — helps the provider check the document is genuine.",
      defaultOn: false,
    },
    {
      id: "expiry-date",
      label: "Expiry date",
      requirement: "optional",
      explainer: "Optional — to confirm the document hasn't expired.",
      defaultOn: true,
    },
  ],
  "national-id": [
    {
      id: "name",
      label: "Name",
      requirement: "required",
      explainer: "Shared with our verification provider to confirm who you are.",
      defaultOn: true,
    },
    {
      id: "photo",
      label: "Photo",
      requirement: "required",
      explainer: "Used to match against your liveness selfie.",
      defaultOn: true,
    },
    {
      id: "date-of-birth",
      label: "Date of birth",
      requirement: "optional",
      explainer: "Optional — used only to confirm you're 18 or over.",
      defaultOn: true,
    },
    {
      id: "document-number",
      label: "Document number",
      requirement: "optional",
      explainer: "Optional — helps the provider check the document is genuine.",
      defaultOn: false,
    },
  ],
};

// Conservative placeholder until DR-097 (vendor integration privacy) locks.
export const RETENTION_COPY_PLACEHOLDER =
  "Retention details are pending vendor confirmation. We'll show the exact policy here once it's signed off.";
