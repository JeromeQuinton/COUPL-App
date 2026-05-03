import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import {
  addContact,
  listContacts,
  maskContact,
  MAX_CONTACTS,
  removeContact,
  updateContact,
  type TrustedContact,
} from "@/lib/trusted-contacts";

export const Route = createFileRoute("/_main/profile/safety/trusted-contact")({
  head: () => ({ meta: [{ title: "Trusted contact — COUPL" }] }),
  component: TrustedContactScreen,
});

type FormState = {
  mode: "add" | { id: string };
  name: string;
  channel: "phone" | "email";
  contact: string;
} | null;

function TrustedContactScreen() {
  const [contacts, setContacts] = useState<TrustedContact[]>([]);
  const [form, setForm] = useState<FormState>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setContacts(listContacts());
  }, []);

  const refresh = () => setContacts(listContacts());
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const atLimit = contacts.length >= MAX_CONTACTS;

  const onSave = () => {
    if (!form) return;
    const trimmedName = form.name.trim();
    const trimmedContact = form.contact.trim();
    if (!trimmedName || !trimmedContact) return;
    if (form.channel === "email" && !/.+@.+\..+/.test(trimmedContact)) return;
    if (form.channel === "phone" && trimmedContact.replace(/\D/g, "").length < 6) return;

    if (form.mode === "add") {
      addContact({ name: trimmedName, channel: form.channel, contact: trimmedContact });
      showToast("Trusted contact saved");
    } else {
      updateContact(form.mode.id, {
        name: trimmedName,
        channel: form.channel,
        contact: trimmedContact,
      });
      showToast("Trusted contact updated");
    }
    setForm(null);
    refresh();
  };

  const onRemove = (c: TrustedContact) => {
    if (!confirm(`Remove ${c.name}? You can add them back any time.`)) return;
    removeContact(c.id);
    refresh();
    showToast(`${c.name} removed`);
  };

  return (
    <div className="relative px-5 pb-16 pt-6">
      <header className="flex items-center gap-3">
        <Link
          to="/profile/safety"
          aria-label="Back"
          className="-ml-1 rounded-full p-1.5 text-plum-700 hover:bg-lavender-50"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <p className="text-label-mono">Safety</p>
      </header>

      <h1 className="mt-3 font-display text-[24px] font-semibold leading-tight text-ink">
        Trusted contact
      </h1>
      <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
        Up to two people who get a single ping when you start a safety share.
        That's it.
      </p>

      {contacts.length === 0 ? (
        <section className="mt-8 rounded-[18px] bg-paper p-5 shadow-elev-1">
          <p className="font-display text-[16px] font-medium text-ink">
            No trusted contacts yet.
          </p>
          <p className="mt-2 font-body text-[13px] leading-relaxed text-slate">
            They'd get a single ping when you start a safety share — that's it.
            They never see your full activity.
          </p>
        </section>
      ) : (
        <ul className="mt-6 flex flex-col gap-2">
          {contacts.map((c) => (
            <li
              key={c.id}
              className="flex items-center justify-between gap-3 rounded-[14px] bg-paper p-4 shadow-elev-1"
            >
              <div className="min-w-0">
                <p className="font-display text-[14.5px] font-medium text-ink">
                  {c.name}
                </p>
                <p className="mt-0.5 font-body text-[12.5px] text-stone">
                  {maskContact(c)}
                </p>
              </div>
              <div className="flex flex-shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      mode: { id: c.id },
                      name: c.name,
                      channel: c.channel,
                      contact: c.contact,
                    })
                  }
                  className="rounded-full px-3 py-1.5 text-label-mono text-plum-700 hover:bg-lavender-50"
                >
                  EDIT
                </button>
                <button
                  type="button"
                  onClick={() => onRemove(c)}
                  className="rounded-full px-3 py-1.5 text-label-mono text-stone hover:text-plum-700"
                >
                  REMOVE
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6">
        {atLimit ? (
          <p className="font-body text-[12.5px] italic text-stone">
            You've reached the limit of two. Remove one to add another.
          </p>
        ) : (
          <button
            type="button"
            onClick={() =>
              setForm({ mode: "add", name: "", channel: "email", contact: "" })
            }
            className="w-full rounded-full bg-plum-700 px-5 py-3 font-display text-[14.5px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Add trusted contact
          </button>
        )}
      </div>

      {form ? (
        <ContactForm
          form={form}
          onChange={setForm}
          onSave={onSave}
          onCancel={() => setForm(null)}
        />
      ) : null}

      {toast ? (
        <div
          role="status"
          className="fixed bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink px-4 py-2 text-[12.5px] font-medium text-paper shadow-elev-1"
        >
          {toast}
        </div>
      ) : null}
    </div>
  );
}

function ContactForm({
  form,
  onChange,
  onSave,
  onCancel,
}: {
  form: NonNullable<FormState>;
  onChange: (f: FormState) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <section className="mt-6 rounded-[18px] bg-paper p-5 shadow-elev-1">
      <p className="font-body text-[10.5px] font-semibold uppercase tracking-[0.16em] text-slate">
        {form.mode === "add" ? "New trusted contact" : "Edit trusted contact"}
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.12em] text-stone">
            Name
          </span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => onChange({ ...form, name: e.target.value })}
            className="rounded-[10px] border border-line bg-paper px-3 py-2.5 font-body text-[14px] text-ink focus:border-plum-500 focus:outline-none"
            placeholder="A friend's name"
            maxLength={60}
          />
        </label>

        <fieldset>
          <legend className="font-body text-[12px] font-semibold uppercase tracking-[0.12em] text-stone">
            How to reach them
          </legend>
          <div className="mt-1.5 flex gap-2">
            {(["email", "phone"] as const).map((ch) => (
              <label
                key={ch}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border px-3 py-2 font-body text-[13px] ${
                  form.channel === ch
                    ? "border-plum-500 bg-lavender-50 text-plum-700"
                    : "border-line text-stone"
                }`}
              >
                <input
                  type="radio"
                  className="sr-only"
                  name="channel"
                  checked={form.channel === ch}
                  onChange={() => onChange({ ...form, channel: ch, contact: "" })}
                />
                {ch === "email" ? "Email" : "Phone"}
              </label>
            ))}
          </div>
        </fieldset>

        <label className="flex flex-col gap-1.5">
          <span className="font-body text-[12px] font-semibold uppercase tracking-[0.12em] text-stone">
            {form.channel === "email" ? "Email address" : "Phone number"}
          </span>
          <input
            type={form.channel === "email" ? "email" : "tel"}
            value={form.contact}
            onChange={(e) => onChange({ ...form, contact: e.target.value })}
            className="rounded-[10px] border border-line bg-paper px-3 py-2.5 font-body text-[14px] text-ink focus:border-plum-500 focus:outline-none"
            placeholder={form.channel === "email" ? "name@example.com" : "+44 7…"}
            maxLength={120}
          />
        </label>

        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-line bg-paper px-4 py-2.5 font-body text-[13.5px] text-slate hover:bg-lavender-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="flex-1 rounded-full bg-plum-700 px-4 py-2.5 font-display text-[13.5px] font-medium text-paper shadow-elev-1 hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </section>
  );
}
