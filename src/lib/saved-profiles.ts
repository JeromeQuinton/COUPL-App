// TODO: migrate to Supabase saved_profiles table

const KEY = "coupl.discover.saved.v1";

function readAll(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeAll(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* noop */
  }
}

export function getSavedProfiles(): string[] {
  return readAll();
}

export function saveProfile(id: string) {
  const all = readAll();
  if (!all.includes(id)) writeAll([...all, id]);
}

export function unsaveProfile(id: string) {
  const all = readAll();
  writeAll(all.filter((x) => x !== id));
}

export function isSaved(id: string): boolean {
  return readAll().includes(id);
}
