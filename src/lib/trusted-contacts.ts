// Phase 1: localStorage. Phase 4: Supabase trusted_contacts table with RLS.

const KEY = "coupl.safety.trusted-contacts.v1";

export type TrustedContact = {
  id: string;
  name: string;
  channel: "phone" | "email";
  contact: string;
};

export const MAX_CONTACTS = 2;

function read(): TrustedContact[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(items: TrustedContact[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  } catch {
    /* noop */
  }
}

export function listContacts(): TrustedContact[] {
  return read();
}

export function addContact(c: Omit<TrustedContact, "id">): TrustedContact | null {
  const all = read();
  if (all.length >= MAX_CONTACTS) return null;
  const next: TrustedContact = { id: crypto.randomUUID(), ...c };
  write([...all, next]);
  return next;
}

export function updateContact(id: string, patch: Partial<Omit<TrustedContact, "id">>) {
  write(read().map((c) => (c.id === id ? { ...c, ...patch } : c)));
}

export function removeContact(id: string) {
  write(read().filter((c) => c.id !== id));
}

export function maskContact(c: TrustedContact): string {
  if (c.channel === "phone") {
    const digits = c.contact.replace(/\D/g, "");
    return `••• ${digits.slice(-4)}`;
  }
  const [local, domain] = c.contact.split("@");
  const head = local?.slice(0, 1) ?? "•";
  return `${head}••@${domain ?? ""}`;
}
