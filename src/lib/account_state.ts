/**
 * Lightweight Phase 1 account-state helpers backed by localStorage.
 *
 * Phase 4: replace with auth-metadata reads. Calls are SSR-safe — every
 * helper guards `typeof window` so server render returns defaults.
 */

const KEY_2FA = "coupl.account.2fa";
const KEY_EMAIL = "coupl.account.email";
const KEY_PHONE = "coupl.account.phone";

export type TwoFactorMethod = "off" | "totp" | "sms";

export const DEFAULT_EMAIL = "jerome@coupl.app";
export const DEFAULT_PHONE = "+44 ···· 0142";

function read(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* no-op */
  }
}

export function getTwoFactorMethod(): TwoFactorMethod {
  const v = read(KEY_2FA);
  return v === "totp" || v === "sms" ? v : "off";
}

export function setTwoFactorMethod(method: TwoFactorMethod) {
  write(KEY_2FA, method);
}

export function getEmail(): string {
  return read(KEY_EMAIL) ?? DEFAULT_EMAIL;
}

export function setEmail(email: string) {
  write(KEY_EMAIL, email);
}

export function getPhone(): string {
  return read(KEY_PHONE) ?? DEFAULT_PHONE;
}

export function setPhone(phone: string) {
  write(KEY_PHONE, phone);
}

export function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!domain) return email;
  if (local.length <= 2) return `${local[0] ?? ""}•@${domain}`;
  return `${local[0]}${"•".repeat(Math.min(4, local.length - 2))}${
    local[local.length - 1]
  }@${domain}`;
}

export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return phone;
  return `+•• •••• •••${digits.slice(-3)}`;
}
